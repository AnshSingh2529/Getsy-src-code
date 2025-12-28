from datetime import timezone
from ..models import Dealer
from django.db import transaction


DEALER_PREFIX = "DLR"
DEALER_PAD = 4


def _parse_number_from_public_id(public_id: str) -> int:
    # Expect format DLR-0001
    try:
        return int(public_id.split("-")[1])
    except Exception:
        return 0


def generate_dlr_id():
    last = Dealer.objects.select_for_update().order_by("-id").first()
    if last and last.dlr_id:
        last_number = _parse_number_from_public_id(last.dlr_id)
        next_number = last_number + 1
    else:
        next_number = 1
    return f"{DEALER_PREFIX}-{str(next_number).zfill(DEALER_PAD)}"


@transaction.atomic
def create_dealer(**validated_data):
    dealer = Dealer(**validated_data)
    dealer.dlr_id = generate_dlr_id()
    dealer.save()
    return dealer


