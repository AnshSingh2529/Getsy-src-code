from rest_framework.response import Response
from rest_framework_simplejwt.tokens import RefreshToken
from rest_framework.decorators import api_view, permission_classes
from rest_framework.permissions import IsAuthenticated
from rest_framework.views import APIView
from rest_framework.response import Response
from apps.user_auth.permissions import IsAgency, IsDealer, IsEndUser


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
