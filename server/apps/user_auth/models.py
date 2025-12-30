from django.db import models
from django.contrib.auth.models import AbstractUser


class User(AbstractUser):
    class RoleChoices(models.TextChoices):
        USER = "user", "User"
        AGENCY = "agency", "Agency"
        DEALER = "dealer", "Dealer"

    email = models.EmailField(unique=True)
    role = models.CharField(
        max_length=20,
        choices=RoleChoices.choices,
        default=RoleChoices.USER,
    )
    USERNAME_FIELD = "email"
    REQUIRED_FIELDS = ["username"]

    def __str__(self):
        return f"{self.email} ({self.role})"


class Agency(models.Model):
    name = models.CharField(max_length=255, blank=False, null=True)
    owner = models.OneToOneField(User, on_delete=models.CASCADE, related_name="agency")
    email = models.EmailField(max_length=255, unique=True, blank=False, null=True)
    phone = models.CharField(max_length=12, blank=False, null=False)
    rera_cert_number = models.CharField(
        max_length=255, blank=False, null=False, unique=True
    )
    is_active = models.BooleanField(default=True)
    created_at = models.DateTimeField(auto_now_add=True)

    class Meta:
        constraints = [
            models.UniqueConstraint(
                fields=["name", "rera_cert_number"], name="unique_agency_fields"
            ),
        ]

    def __str__(self):
        return f"{self.name} - {self.rera_cert_number}: Certified"


class AgencyAddress(models.Model):
    agency = models.ForeignKey(
        Agency,
        related_name="addresses",
        on_delete=models.CASCADE,
    )
    pincode = models.IntegerField(blank=False, null=False)
    landmark = models.CharField(max_length=255, blank=False, null=True)
    city = models.CharField(max_length=50, blank=False, null=True)
    area = models.CharField(help_text="Your Society | Field working area")


class Dealer(models.Model):
    dlr_id = models.CharField(
        max_length=20,
        unique=True,
        db_index=True,
        editable=False,
        help_text="Public ID like DLR-0001",
    )
    dealer = models.OneToOneField(User, on_delete=models.CASCADE, related_name="dealer")
    phone = models.IntegerField(blank=False, null=False)
    is_active = models.BooleanField(default=True)
    created_at = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return f"{self.dealer_id} - {self.name}"


class DealerWorkingArea(models.Model):
    dealer = models.ForeignKey(
        Dealer,
        related_name="working_area",
        on_delete=models.CASCADE,
    )
    pincode = models.IntegerField(blank=False, null=False)
    city = models.CharField(max_length=50, blank=False, null=True)
    area = models.CharField(help_text="Your Society | Field working area")


# class AgencyDealerConnection(models.Model):
#     STATUS_CHOICES = (
#         ("pending", "Pending"),
#         ("approved", "Approved"),
#         ("declined", "Declined"),
#     )

#     REQUESTED_BY_CHOICES = (
#         ("agency", "Agency"),
#         ("dealer", "Dealer"),
#     )

#     agency = models.ForeignKey(
#         Agency,
#         on_delete=models.CASCADE,
#         related_name="dealer_connections",
#     )

#     dealer = models.ForeignKey(
#         Dealer,
#         on_delete=models.CASCADE,
#         related_name="agency_connections",
#     )

#     requested_by = models.CharField(
#         max_length=20,
#         choices=REQUESTED_BY_CHOICES,
#     )

#     status = models.CharField(
#         max_length=20,
#         choices=STATUS_CHOICES,
#         default="pending",
#     )

#     requested_at = models.DateTimeField(auto_now_add=True)
#     responded_at = models.DateTimeField(null=True, blank=True)

#     class Meta:
#         unique_together = ("agency", "dealer")
#         indexes = [
#             models.Index(fields=["status"]),
#             models.Index(fields=["requested_by"]),
#         ]

#     def __str__(self):
#         return f"{self.agency} ↔ {self.dealer} ({self.status})"
