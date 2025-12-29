from ..models import Dealer, DealerWorkingArea, User
from django.db import transaction


DEALER_PREFIX = "DLR"
DEALER_PAD = 4


def _parse_number_from_public_id(public_id: str) -> int:
    # Expect format DLR-0001
    try:
        return int(public_id.split("-")[1])
    except Exception:
        return 0


def _generate_dlr_id():
    last = Dealer.objects.select_for_update().order_by("-id").first()

    next_number = 1
    if last and last.dlr_id:
        next_number = _parse_number_from_public_id(last.dlr_id) + 1

    return f"{DEALER_PREFIX}-{str(next_number).zfill(DEALER_PAD)}"


@transaction.atomic
def create_dealer_with_working_area(*, dealer_data, working_area_data, user):
    """
    Single source of truth for Dealer creation
    """
    if user.role != User.RoleChoices.USER:
        raise ValueError("User already has an assigned role")
    dealer = Dealer(
        user=user,
        **dealer_data,
    )
    dealer.dlr_id = _generate_dlr_id()
    dealer.save()
    DealerWorkingArea.objects.create(dealer=dealer, **working_area_data)
    user.role = User.RoleChoices.DEALER
    user.save(update_fields=["role"])

    return dealer
