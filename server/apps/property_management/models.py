from django.db import models
from django.contrib.postgres.fields import ArrayField
from django.core.validators import MinValueValidator
from apps.user_auth.models import Agency, Dealer


class BaseProperty(models.Model):
    """
    Fields common to both Rent & Sale
    """

    UNIT_TYPE_CHOICES = (
        ("for_rent", "For Rent"),
        ("for_sale", "For Sale"),
    )

    AREA_UNIT_CHOICES = (
        ("sq_ft", "Square Feet"),
        ("sq_yards", "Square Yards"),
        ("sq_m", "Square Meters"),
        ("acres", "Acres"),
        ("hectares", "Hectares"),
        ("bigha", "Bigha"),
        ("marla", "Marla"),
        ("kanal", "Kanal"),
        ("cents", "Cents"),
    )

    unit_name = models.CharField(max_length=255)
    unit_type = models.CharField(max_length=20, choices=UNIT_TYPE_CHOICES)

    # Location
    street_address = models.TextField()
    unit_number = models.CharField(max_length=50)
    zip_code = models.CharField(max_length=20)
    state = models.CharField(max_length=100)

    # Area
    area_value = models.DecimalField(
        max_digits=12, decimal_places=2, validators=[MinValueValidator(0)]
    )
    area_unit = models.CharField(max_length=20, choices=AREA_UNIT_CHOICES)

    is_active = models.BooleanField(default=True)
    created_at = models.DateTimeField(auto_now_add=True)

    class Meta:
        abstract = True


class PropertyForRent(BaseProperty):
    """
    Mirrors:
    - RentPriceAndCharges
    - RentAdditionalDetails
    """

    RENT_TIME_CHOICES = (
        ("per_month", "Per Month"),
        ("quarterly", "Quarterly"),
        ("half_yearly", "Half Yearly"),
        ("per_year", "Per Year"),
    )

    agencies = models.ManyToManyField(
        Agency,
        through="PropertyListing",
        related_name="rent_properties",
        blank=True,
    )

    dealers = models.ManyToManyField(
        Dealer,
        through="PropertyListing",
        related_name="rent_properties",
        blank=True,
    )

    # Pricing
    rent_amount = models.DecimalField(max_digits=12, decimal_places=2)
    rent_cycle = models.CharField(max_length=20, choices=RENT_TIME_CHOICES)

    late_charge_amount = models.DecimalField(max_digits=12, decimal_places=2, default=0)
    security_deposit = models.DecimalField(max_digits=12, decimal_places=2, default=0)
    electricity_charge = models.DecimalField(max_digits=12, decimal_places=2, default=0)

    contract_months = models.PositiveIntegerField(default=1)

    # Additional details
    kitchen_type = models.CharField(max_length=50)
    bath_type = models.CharField(max_length=50)
    number_of_baths = models.PositiveIntegerField()
    number_of_beds = models.PositiveIntegerField()

    available_from = models.DateField()

    preferred_tenants = ArrayField(
        models.CharField(max_length=50),
        blank=True,
        default=list,
    )

    other_details = models.TextField(blank=True)

    def __str__(self):
        return f"Rent | {self.unit_name}"


class PropertyForSale(BaseProperty):
    """
    Mirrors:
    - SalePriceAndCharges
    - SaleAdditionalDetails
    """

    BHK_CHOICES = (
        ("1bhk", "1 BHK"),
        ("2bhk", "2 BHK"),
        ("3bhk", "3 BHK"),
        ("4bhk", "4 BHK"),
        ("5bhk", "5+ BHK"),
        ("studio", "Studio"),
    )

    FURNISHING_CHOICES = (
        ("unfurnished", "Unfurnished"),
        ("semi_furnished", "Semi Furnished"),
        ("fully_furnished", "Fully Furnished"),
    )

    PARKING_CHOICES = (
        ("no_parking", "No Parking"),
        ("1_car", "1 Car"),
        ("2_car", "2 Car"),
        ("3_car", "3+ Car"),
        ("bike_only", "Bike Only"),
        ("both", "Car & Bike"),
    )

    FACING_CHOICES = (
        ("north", "North"),
        ("south", "South"),
        ("east", "East"),
        ("west", "West"),
        ("north_east", "North-East"),
        ("north_west", "North-West"),
        ("south_east", "South-East"),
        ("south_west", "South-West"),
    )

    agencies = models.ManyToManyField(
        Agency,
        through="PropertyListing",
        related_name="sale_properties",
        blank=True,
    )

    dealers = models.ManyToManyField(
        Dealer,
        through="PropertyListing",
        related_name="sale_properties",
        blank=True,
    )

    # Pricing
    selling_price = models.DecimalField(max_digits=14, decimal_places=2)
    extra_charges = models.DecimalField(max_digits=12, decimal_places=2, default=0)

    is_negotiable = models.BooleanField(default=False)
    down_payment_percent = models.DecimalField(
        max_digits=5, decimal_places=2, default=0
    )

    # Property details
    bhk = models.CharField(max_length=20, choices=BHK_CHOICES)
    property_type = models.CharField(max_length=50)
    facing = models.CharField(max_length=20, choices=FACING_CHOICES)
    floor = models.CharField(max_length=10)

    furnishing = models.CharField(max_length=20, choices=FURNISHING_CHOICES)
    parking = models.CharField(max_length=20, choices=PARKING_CHOICES)

    amenities = ArrayField(
        models.CharField(max_length=100),
        blank=True,
        default=list,
    )

    description = models.TextField(blank=True)

    def __str__(self):
        return f"Sale | {self.unit_name}"


class PropertyListing(models.Model):
    LISTED_BY_CHOICES = (
        ("agency", "Agency"),
        ("dealer", "Dealer"),
    )

    agency = models.ForeignKey(
        Agency,
        on_delete=models.CASCADE,
        null=True,
        blank=True,
        related_name="listings",
    )

    dealer = models.ForeignKey(
        Dealer,
        on_delete=models.CASCADE,
        null=True,
        blank=True,
        related_name="listings",
    )

    property_rent = models.ForeignKey(
        PropertyForRent,
        on_delete=models.CASCADE,
        null=True,
        blank=True,
        related_name="listings",
    )

    property_sale = models.ForeignKey(
        PropertyForSale,
        on_delete=models.CASCADE,
        null=True,
        blank=True,
        related_name="listings",
    )

    listed_by_type = models.CharField(max_length=20, choices=LISTED_BY_CHOICES)

    is_primary = models.BooleanField(default=False)
    commission_percent = models.DecimalField(max_digits=5, decimal_places=2, default=0)

    is_active = models.BooleanField(default=True)
    listed_at = models.DateTimeField(auto_now_add=True)
    expires_at = models.DateTimeField(null=True, blank=True)

    class Meta:
        constraints = [
            models.CheckConstraint(
                check=(
                    models.Q(property_rent__isnull=False)
                    | models.Q(property_sale__isnull=False)
                ),
                name="property_must_be_rent_or_sale",
            ),
            models.CheckConstraint(
                check=(models.Q(agency__isnull=False) | models.Q(dealer__isnull=False)),
                name="listing_must_have_agency_or_dealer",
            ),
        ]
