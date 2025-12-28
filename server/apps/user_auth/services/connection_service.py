# accounts/services/connection_service.py
from django.db import transaction
from django.utils import timezone
from django.core.exceptions import PermissionDenied

from apps.user_auth.models import AgencyDealerConnection

@transaction.atomic
def create_connection_request(agency, dealer, requested_by):
    """
    Upsert a pending request (no duplicates because of unique_together).
    requested_by: "agency" or "dealer"
    Returns the connection instance.
    """
    instance, created = AgencyDealerConnection.objects.get_or_create(
        agency=agency,
        dealer=dealer,
        defaults={"requested_by": requested_by}
    )
    if not created:
        # If already exists and declined, allow re-request by toggling to pending
        if instance.status == AgencyDealerConnection.STATUS_DECLINED:
            instance.status = AgencyDealerConnection.STATUS_PENDING
            instance.requested_by = requested_by
            instance.requested_at = timezone.now()
            instance.responded_at = None
            instance.save()
    return instance

@transaction.atomic
def approve_connection(connection: AgencyDealerConnection, approver_type: str):
    """
    Only the *non-initiator* may approve. approver_type is 'agency' or 'dealer'.
    """
    if connection.status != AgencyDealerConnection.STATUS_PENDING:
        raise PermissionDenied("Only pending requests can be approved.")

    if connection.requested_by == approver_type:
        raise PermissionDenied("Initiator cannot approve their own request.")

    connection.status = AgencyDealerConnection.STATUS_APPROVED
    connection.responded_at = timezone.now()
    connection.save()
    return connection

@transaction.atomic
def decline_connection(connection: AgencyDealerConnection, approver_type: str):
    if connection.status != AgencyDealerConnection.STATUS_PENDING:
        raise PermissionDenied("Only pending requests can be declined.")

    if connection.requested_by == approver_type:
        raise PermissionDenied("Initiator cannot decline their own request (use cancel).")

    connection.status = AgencyDealerConnection.STATUS_DECLINED
    connection.responded_at = timezone.now()
    connection.save()
    return connection
