from rest_framework.permissions import BasePermission


class IsAgency(BasePermission):
    def has_permission(self, request, view):
        return request.user.is_authenticated and request.user.role == "agency"


class IsDealer(BasePermission):
    def has_permission(self, request, view):
        return request.user.is_authenticated and request.user.role in [
            "dealer",
            "agency",
        ]


class IsEndUser(BasePermission):
    def has_permission(self, request, view):
        return request.user.is_authenticated and request.user.role == "user"


class IsAgencyAdminOrDealerOwner(BasePermission):
    """
    Assumes request.user has either .agency or .dealer attribute linking to models.
    Adapt to your user/profile shape.
    """

    def has_permission(self, request, view):
        return request.user and request.user.is_authenticated

    def has_object_permission(self, request, view, obj):
        # obj is an AgencyDealerConnection or related object
        user = request.user
        # adapt these attribute names to your codebase
        user_agency = getattr(user, "agency", None)
        user_dealer = getattr(user, "dealer", None)

        if user_agency and obj.agency_id == user_agency.id:
            return True
        if user_dealer and obj.dealer_id == user_dealer.id:
            return True
        return False
