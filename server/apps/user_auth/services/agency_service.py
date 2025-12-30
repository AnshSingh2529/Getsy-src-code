from ..models import Agency, AgencyAddress, User
from django.db import transaction


@transaction.atomic
def create_agency_with_role_address(*, agency_data, address_data, user: User):
    """
    Single source of truth for Agency creation
    """
    if user.role != User.RoleChoices.USER:
        raise ValueError("User already has an assigned role")

    if hasattr(user, "agency"):
        raise ValueError("User already owns an agency")

    agency = Agency(
        owner=user,
        **agency_data,
    )
    agency.save()
    AgencyAddress.objects.create(
        agency=agency,
        **address_data,
    )

    user.role = User.RoleChoices.AGENCY
    user.save(update_fields=["role"])

    return agency
