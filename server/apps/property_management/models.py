from django.db import models
from apps.user_auth.models import User

from django.core.validators import MinValueValidator, MaxValueValidator
from django.core.exceptions import ValidationError
from django.utils import timezone
from decimal import Decimal
from django.db.models import F, ExpressionWrapper, DecimalField


class Property(models.Model):
    title = models.CharField(max_length=50, blank=False, null=False)
    price = models.FloatField(blank=False, null=False)
    images = models.URLField(blank=False, null=False, default="")
    isAvailable = models.BooleanField(default=True)
    views = models.IntegerField(null=True, blank=True)
    location = models.CharField(max_length=512, null=False, blank=False)


class PropertyDealBase(models.Model):

    class DealStatus(models.TextChoices):
        CLOSED = "closed", "Closed"
        PENDING = "pending", "Pending"
        ZEROCLIENT = "zeroclient", "Zero Client"

    status = models.CharField(
        max_length=20,
        choices=DealStatus.choices,
        default=DealStatus.ZEROCLIENT,
        db_index=True,
    )

    commission_rate = models.DecimalField(
        max_digits=5,
        decimal_places=4,
        validators=[MinValueValidator(0), MaxValueValidator(1)],
        help_text="0.15 → means 15%",
    )

    commission_final = models.DecimalField(
        max_digits=12,
        decimal_places=2,
        null=True,
        blank=True,
        editable=False,
    )

    is_commission_paid = models.BooleanField(default=False)
    paid_at = models.DateTimeField(null=True, blank=True)

    notes = models.TextField(null=True, blank=True)

    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)
    closed_at = models.DateTimeField(null=True, blank=True)

    VALID_TRANSITIONS = {
        "zeroclient": ["pending"],
        "pending": ["closed", "zeroclient"],
        "closed": [],  # terminal state
    }

    class Meta:
        abstract = True  # prevents DB table creation
        indexes = [
            models.Index(fields=["status"]),
            models.Index(fields=["is_commission_paid"]),
        ]

    def calculate_commission(self):
        return Decimal(self.property.price) * Decimal(self.commission_rate)

    def clean(self):
        if not self.pk:
            return

        old_status = (
            type(self)
            .objects.filter(pk=self.pk)
            .values_list("status", flat=True)
            .first()
        )

        if old_status == self.status:
            return  # no change — no validation

        allowed = self.VALID_TRANSITIONS.get(old_status, [])

        if self.status not in allowed:
            raise ValidationError(
                f"Invalid transition: {old_status} → {self.status}. "
                f"Allowed: {', '.join(allowed) or 'None'}."
            )

        if self.status == self.DealStatus.CLOSED:
            self.closed_at = timezone.now()
            self.commission_final = self.calculate_commission()

    def save(self, *args, **kwargs):
        self.clean()
        super().save(*args, **kwargs)


class Dealer(models.Model):
    user = models.OneToOneField(
        User, on_delete=models.CASCADE, related_name="dealer_profile"
    )
    location = models.CharField(max_length=512)
    properties = models.ManyToManyField(Property, through="DealerProperty")
    rera_certificate = models.URLField(blank=True, null=True)

    @property
    def phone(self):
        return self.user.phone

    def clean(self):
        if self.user.role != "dealer":
            raise ValueError("User must have role=dealer")

    def __str__(self):
        return self.user.name


class DealerProperty(PropertyDealBase):
    dealer = models.ForeignKey(
        "Dealer", on_delete=models.CASCADE, related_name="property_deals"
    )
    property = models.ForeignKey(
        "Property", on_delete=models.CASCADE, related_name="dealer_assignments"
    )

    class Meta:
        unique_together = ("dealer", "property")
        verbose_name = "Dealer Deal"
        verbose_name_plural = "Dealer Deals"

    def __str__(self):
        return f"{self.dealer} ↔ {self.property}"


class Agency(models.Model):
    agency = models.OneToOneField(
        User, on_delete=models.CASCADE, related_name="agency_profile"
    )
    location = models.CharField(max_length=512, null=False, blank=False)
    property = models.ManyToManyField(Property, through="AgencyProperty")
    agents = models.ManyToManyField(Dealer, through="AgencyPropertyAgents")
    rera_certificate = models.URLField(
        max_length=200, blank=True, null=True, default="Not Varified"
    )

    @property
    def phone(self):
        return self.user.phone

    def clean(self):
        if self.user.role != "agency":
            raise ValueError("User must have role=agency")

    def __str__(self):
        return self.user.name


class AgencyProperty(PropertyDealBase):
    agency = models.ForeignKey(
        "Agency", on_delete=models.CASCADE, related_name="property_agency"
    )
    property = models.ForeignKey(
        "Property", on_delete=models.CASCADE, related_name="agency_assignments"
    )

    class Meta:
        unique_together = ("agency", "property")
        verbose_name = "Agency Deal"
        verbose_name_plural = "Agency Deals"

    def __str__(self):
        return f"{self.agency} ↔ {self.property}"


class AgencyAgentMembership(models.Model):
    dealer = models.ForeignKey(
        "Dealer", on_delete=models.CASCADE, related_name="agency_memberships"
    )
    agency = models.ForeignKey(
        "Agency", on_delete=models.CASCADE, related_name="agent_memberships"
    )

    start_date = models.DateField(default=timezone.now)
    end_date = models.DateField()

    is_active = models.BooleanField(default=True)

    MEMBERSHIP_TERM_CHOICES = [
        (365, "1 Year"),
        (730, "2 Years"),
    ]

    term_days = models.PositiveIntegerField(choices=MEMBERSHIP_TERM_CHOICES)

    created_at = models.DateTimeField(auto_now_add=True)

    class Meta:
        unique_together = ("dealer", "agency")

    def __str__(self):
        return f"{self.dealer} → {self.agency} ({'Active' if self.is_active else 'Expired'})"


class AgencyPropertyAccess(models.Model):
    membership = models.ForeignKey(
        AgencyAgentMembership, on_delete=models.CASCADE, related_name="property_access"
    )

    property = models.ForeignKey(
        "Property", on_delete=models.CASCADE, related_name="agent_access"
    )

    SUBSCRIPTION_CHOICES = [(10, "10 Days"), (20, "20 Days"), (30, "30 Days")]

    duration_days = models.PositiveIntegerField(choices=SUBSCRIPTION_CHOICES)
    start_date = models.DateField(default=timezone.now)
    end_date = models.DateField()
    is_active = models.BooleanField(default=True)

    class Meta:
        unique_together = ("membership", "property")

    def __str__(self):
        return f"{self.membership.dealer} → {self.property} ({self.duration_days} days)"


class AgencyBillingTransaction(models.Model):
    dealer = models.ForeignKey("Dealer", on_delete=models.CASCADE)
    agency = models.ForeignKey("Agency", on_delete=models.CASCADE)

    TRANSACTION_TYPE = [
        ("membership", "Membership Fee"),
        ("property_subscription", "Property Subscription"),
    ]

    type = models.CharField(max_length=50, choices=TRANSACTION_TYPE)
    amount = models.DecimalField(
        max_digits=12, decimal_places=2, validators=[MinValueValidator(0)]
    )
    currency = models.CharField(max_length=10, default="INR")

    created_at = models.DateTimeField(auto_now_add=True)
    paid_at = models.DateTimeField(null=True, blank=True)
    is_paid = models.BooleanField(default=False, db_index=True)

    invoice_id = models.CharField(max_length=100, unique=True)

    def __str__(self):
        return f"{self.invoice_id} | {self.type} | {self.amount}"


class AgencyPropertyAgents(models.Model):
    dealer = models.ForeignKey("Dealer", on_delete=models.CASCADE)
    agency = models.ForeignKey("Agency", on_delete=models.CASCADE)
    property = models.ForeignKey("Property", on_delete=models.CASCADE)

    membership = models.ForeignKey(
        AgencyAgentMembership,
        on_delete=models.CASCADE,
        related_name="agent_property_links",
    )

    access = models.ForeignKey(
        AgencyPropertyAccess, on_delete=models.CASCADE, related_name="assignment_links"
    )

    created_at = models.DateTimeField(auto_now_add=True)

    class Meta:
        unique_together = ("dealer", "agency", "property")

    def __str__(self):
        return f"{self.dealer} handling {self.property} for {self.agency}"
