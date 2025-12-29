from rest_framework.response import Response
from rest_framework_simplejwt.tokens import RefreshToken
from rest_framework.decorators import api_view, permission_classes
from rest_framework.permissions import IsAuthenticated, IsAdminUser
from rest_framework.views import APIView
from rest_framework.response import Response
from apps.user_auth.permissions import IsAgency, IsDealer, IsEndUser
from rest_framework.generics import CreateAPIView, RetrieveAPIView

from server.apps.user_auth.services.agency_service import (
    create_agency_with_role_address,
)
from server.apps.user_auth.services.dealer_service import (
    create_dealer_with_working_area,
)
from .serializers import (
    DealerSerializer,
    AgencySerializer,
    AgencyDealerConnectionSerializer,
    AgencyDealerRequestSerializer,
)
from .models import Dealer, Agency, AgencyDealerConnection
from rest_framework import viewsets, status, mixins
from rest_framework.decorators import action
from rest_framework.response import Response
from django.shortcuts import get_object_or_404

from apps.user_auth.services.connection_service import (
    create_connection_request,
    approve_connection,
    decline_connection,
)
from .permissions import IsAgencyAdminOrDealerOwner


@api_view(["GET"])
@permission_classes([IsAuthenticated])
def get_jwt_token(request):
    """
    Exchange authenticated session (Google login) for JWT tokens
    """
    user = request.user
    refresh = RefreshToken.for_user(request.user)
    return Response(
        {
            "access": str(refresh.access_token),
            "refresh": str(refresh),
            "user": {
                "id": user.id,
                "email": user.email,
                "username": user.username,
                "role": request.user.role,
            },
        }
    )


class ProfileView(APIView):
    permission_classes = [IsEndUser]

    def get(self, request):
        user = request.user
        return Response(
            {
                "id": user.id,
                "email": user.email,
                "username": user.username,
                "role": user.role,
            }
        )


class DealerDashboardView(APIView):
    permission_classes = [IsDealer]

    def get(self, request):
        return Response(
            {
                "message": "Dealer dashboard access granted",
                "email": request.user.email,
                "role": request.user.role,
            }
        )


class AgencyDashboardView(APIView):
    permission_classes = [IsAgency]

    def get(self, request):
        return Response(
            {
                "message": "Agency level access",
                "email": request.user.email,
                "role": request.user.role,
            }
        )


class AgencyViewSet(
    mixins.CreateModelMixin,
    mixins.UpdateModelMixin,
    mixins.DestroyModelMixin,
    mixins.ListModelMixin,
    mixins.RetrieveModelMixin,
    viewsets.GenericViewSet,
):
    serializer_class = AgencySerializer
    queryset = Agency.objects.prefetch_related("addresses")

    def get_permissions(self):
        """
        Permission matrix:
        - create → authenticated user (will become agency)
        - update/delete (self) → IsAgency
        - list/delete (global) → IsAdminUser
        """
        if self.action == "create":
            return [IsAuthenticated()]

        if self.action in ["update", "partial_update", "destroy"]:
            return [IsAgency()]

        if self.action in ["list"]:
            return [IsAdminUser()]

        return [IsAuthenticated()]

    def get_queryset(self):
        qs = super().get_queryset()
        user = self.request.user

        if user.is_staff:
            return qs

        return qs.filter(owner=user)

    def perform_create(self, serializer):
        user = self.request.user

        validated_data = serializer.validated_data
        address_data = validated_data.pop("addresses")

        agency = create_agency_with_role_address(
            agency_data=validated_data,
            address_data=address_data,
            user=user,
        )

        serializer.instance = agency

class DealerViewSet(
    mixins.CreateModelMixin,
    mixins.UpdateModelMixin,
    mixins.DestroyModelMixin,
    mixins.ListModelMixin,
    mixins.RetrieveModelMixin,
    viewsets.GenericViewSet,
):
    serializer_class = DealerSerializer
    queryset = Dealer.objects.prefetch_related("working_area")

    def get_permissions(self):
        """
        Permission matrix:
        - create → authenticated user (will become agency)
        - update/delete (self) → IsDealer
        - list/delete (global) → IsAdminUser
        """
        if self.action == "create":
            return [IsAuthenticated()]

        if self.action in ["update", "partial_update", "destroy"]:
            return [IsDealer()]

        if self.action in ["list"]:
            return [IsAdminUser()]

        return [IsAuthenticated()]

    def get_queryset(self):
        qs = super().get_queryset()
        if self.request.user.is_staff:
            return qs
        else:
            qs = qs.filter(user=self.request.user)
        return qs

    def perform_create(self, serializer):
        user = self.request.user
        create_dealer_with_working_area(
            agency_data=serializer.validated_data["agency"],
            address_data=serializer.validated_data["addresses"],
            user=user,
        )


# class AgencyDealerConnectionViewSet(viewsets.GenericViewSet):
#     """
#     Endpoints:
#     - POST /connections/request/  (body: agency_id or dealer_id)
#     - POST /connections/{pk}/approve/
#     - POST /connections/{pk}/decline/
#     - GET  /connections/  (list)
#     """

#     queryset = AgencyDealerConnection.objects.select_related("agency", "dealer").all()
#     serializer_class = AgencyDealerConnectionSerializer
#     permission_classes = [IsAgencyAdminOrDealerOwner]

#     @action(detail=False, methods=["post"], url_path="request")
#     def request_connection(self, request):
#         """
#         Create a request. Caller must be either Agency admin or Dealer user.
#         Client should pass agency_id or dealer_id (the target).
#         """
#         serializer = AgencyDealerRequestSerializer(data=request.data)
#         serializer.is_valid(raise_exception=True)
#         data = serializer.validated_data

#         # Map caller -> their entity (simplest pattern; adapt to your auth)
#         caller_agency = getattr(request.user, "agency", None)
#         caller_dealer = getattr(request.user, "dealer", None)

#         if caller_agency:
#             # Agency initiated request; target must be dealer_id
#             dealer_id = data.get("dealer_id")
#             if not dealer_id:
#                 return Response(
#                     {"detail": "dealer_id required when agency initiates."},
#                     status=status.HTTP_400_BAD_REQUEST,
#                 )

#             dealer = get_object_or_404(Dealer, id=dealer_id)
#             connection = create_connection_request(
#                 agency=caller_agency,
#                 dealer=dealer,
#                 requested_by=AgencyDealerConnection.REQUESTED_BY_AGENCY,
#             )
#         elif caller_dealer:
#             agency_id = data.get("agency_id")
#             if not agency_id:
#                 return Response(
#                     {"detail": "agency_id required when dealer initiates."},
#                     status=status.HTTP_400_BAD_REQUEST,
#                 )

#             agency = get_object_or_404(Agency, id=agency_id)
#             connection = create_connection_request(
#                 agency=agency,
#                 dealer=caller_dealer,
#                 requested_by=AgencyDealerConnection.REQUESTED_BY_DEALER,
#             )
#         else:
#             return Response(
#                 {"detail": "User is not associated with an Agency or Dealer."},
#                 status=status.HTTP_403_FORBIDDEN,
#             )

#         out = AgencyDealerConnectionSerializer(connection)
#         return Response(out.data, status=status.HTTP_201_CREATED)

#     @action(detail=True, methods=["post"])
#     def approve(self, request, pk=None):
#         conn = get_object_or_404(AgencyDealerConnection, pk=pk)
#         # determine approver type from caller
#         caller_agency = getattr(request.user, "agency", None)
#         caller_dealer = getattr(request.user, "dealer", None)

#         if caller_agency and conn.agency_id == caller_agency.id:
#             approver_type = AgencyDealerConnection.REQUESTED_BY_AGENCY
#         elif caller_dealer and conn.dealer_id == caller_dealer.id:
#             approver_type = AgencyDealerConnection.REQUESTED_BY_DEALER
#         else:
#             return Response(
#                 {"detail": "Not authorized to approve this connection."},
#                 status=status.HTTP_403_FORBIDDEN,
#             )

#         # Only non-initiator may approve -> enforce in service
#         try:
#             connection = approve_connection(conn, approver_type)
#         except Exception as exc:
#             return Response({"detail": str(exc)}, status=status.HTTP_400_BAD_REQUEST)

#         return Response(AgencyDealerConnectionSerializer(connection).data)

#     @action(detail=True, methods=["post"])
#     def decline(self, request, pk=None):
#         conn = get_object_or_404(AgencyDealerConnection, pk=pk)
#         caller_agency = getattr(request.user, "agency", None)
#         caller_dealer = getattr(request.user, "dealer", None)

#         if caller_agency and conn.agency_id == caller_agency.id:
#             approver_type = AgencyDealerConnection.REQUESTED_BY_AGENCY
#         elif caller_dealer and conn.dealer_id == caller_dealer.id:
#             approver_type = AgencyDealerConnection.REQUESTED_BY_DEALER
#         else:
#             return Response(
#                 {"detail": "Not authorized to decline this connection."},
#                 status=status.HTTP_403_FORBIDDEN,
#             )

#         try:
#             connection = decline_connection(conn, approver_type)
#         except Exception as exc:
#             return Response({"detail": str(exc)}, status=status.HTTP_400_BAD_REQUEST)

#         return Response(AgencyDealerConnectionSerializer(connection).data)
