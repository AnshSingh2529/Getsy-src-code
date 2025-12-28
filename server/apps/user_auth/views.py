from rest_framework.response import Response
from rest_framework_simplejwt.tokens import RefreshToken
from rest_framework.decorators import api_view
from rest_framework.views import APIView
from rest_framework.authentication import TokenAuthentication
from rest_framework.permissions import IsAuthenticated


@api_view(["GET"])
def get_jwt_token(request):
    if not request.user.is_authenticated:
        return Response({"error": "Please sign in first"}, status=401)
    refresh = RefreshToken.for_user(request.user)
    return Response(
        {
            "refresh": str(refresh),
            "access": str(refresh.access_token),
        }
    )

class GoogleLoginApiView(APIView):
    authentication_classes = [TokenAuthentication]
    permission_classes = [IsAuthenticated]

class GoogleLogoutApiView(APIView):
    permission_classes = [IsAuthenticated]