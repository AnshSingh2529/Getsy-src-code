from django.db import models
from django.contrib.auth.models import AbstractUser


class User(AbstractUser):
    class RoleChoices(models.TextChoices):
        USER = "user", "User"
        Agency = "agency", "Agency"
        Dealer = "dealer", "Dealer"

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
    phone = models.IntegerField(blank=False, null=False)
    rera_cert_number = models.IntegerField(
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


class Dealer(models.Model):
    dealer = models.OneToOneField(User, on_delete=models.CASCADE, related_name="dealer")
    phone = models.IntegerField(blank=False, null=False)
    
    is_active = models.BooleanField(default=True)
