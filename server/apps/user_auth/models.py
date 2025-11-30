from django.db import models

# Create your models here.
from django.contrib.auth.models import (
    AbstractBaseUser,
    BaseUserManager,
)


class UserManager(BaseUserManager):
    def create_user(
        self, email, password=None, role="User", name=None, phone=None, **extra_fields
    ):
        if not email:
            raise ValueError("Users Must have an email address !!")
        email = self.normalize_email(email)

        extra_fields.setdefault("is_active", True)
        extra_fields.setdefault("is_staff", False)
        extra_fields.setdefault("is_superuser", False)

        user = self.model(
            email=email,
            name=name,
            phone=phone,
            role=role,
            **extra_fields,
        )
        user.set_password(password)
        user.save(using=self._db)
        return user

    def create_superuser(self, email, password=None, **extra_fields):
        extra_fields.setdefault("is_staff", True)
        extra_fields.setdefault("is_superuser", True)
        extra_fields.setdefault("role", "user")  # or "user" — up to your logic

        if extra_fields.get("is_staff") is not True:
            raise ValueError("Superuser must have is_staff=True.")
        if extra_fields.get("is_superuser") is not True:
            raise ValueError("Superuser must have is_superuser=True.")

        return self.create_user(email, password, **extra_fields)


class User(AbstractBaseUser):
    class ROLE_CHOICES(models.TextChoices):
        USER = "user", "User"
        DEALER = "dealer", "Dealer"
        AGENCY = "agency", "Agency"

    email = models.EmailField(max_length=255, unique=True)
    name = models.CharField(max_length=255, blank=False, null=False)
    phone = models.CharField(max_length=30, blank=False, unique=True, null=False)
    role = models.CharField(
        max_length=20, choices=ROLE_CHOICES.choices, default=ROLE_CHOICES.USER
    )

    is_active = models.BooleanField(default=True)
    is_staff = models.BooleanField(default=False)
    is_superuser = models.BooleanField(default=False)
    date_joined = models.DateTimeField(auto_now_add=True)

    objects = UserManager()

    USERNAME_FIELD = "email"
    REQUIRED_FIELDS = ["name", "phone"]

    def __str__(self):
        return f"{self.name} - {self.email} ({self.role}) - {self.phone}"
