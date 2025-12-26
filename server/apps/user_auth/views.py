from django.utils import timezone
from rest_framework import generics, permissions, status
from .serializers import (
    RegisterSerializer,
    LoginSerializer,
)
from rest_framework_simplejwt.views import TokenObtainPairView, TokenRefreshView
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework_simplejwt.tokens import RefreshToken
from .models import User
from rest_framework.decorators import api_view

@api_view(['GET'])
def get_jwt_token(request):
    if not request.user.is_authenticated:
        return Response({"error": "Please sign in first"}, status=401)
    refresh = RefreshToken.for_user(request.user)
    return Response({
        'refresh': str(refresh),
        'access': str(refresh.access_token),
    })

class RegisterView(generics.CreateAPIView):
    serializer_class = RegisterSerializer
    permission_classes = (permissions.AllowAny,)

    def create(self, request, *args, **kwargs):
        print("Incommind Data: ", request.data)
        return super().create(request, *args, **kwargs)


class LoginView(APIView):
    permission_classes = (permissions.AllowAny,)

    def post(self, request):
        serializer = LoginSerializer(data=request.data, context={"request": request})
        serializer.is_valid(raise_exception=True)
        user = serializer.validated_data["user"]

        refresh = RefreshToken.for_user(user)
        response = Response(
            {
                "refresh": str(refresh),
                "access": str(refresh.access_token),
                "user": {
                    "id": user.id,
                    "email": user.email,
                    "name": user.name,
                    "role": user.role,
                    "last_login": user.last_login,
                    "is_active": user.is_active,
                },
            },
            status=status.HTTP_200_OK,
        )

        # ✅ Also support cookie-based login here
        response.set_cookie(
            key="refresh_token",
            value=str(refresh),
            httponly=True,
            secure=True,
            samesite="Lax",
            max_age=7 * 24 * 60 * 60,
        )
        return response


class LogoutView(APIView):
    permission_classes = [permissions.IsAuthenticated]

    def post(self, request):
        refresh_token = request.data.get("refresh")
        if not refresh_token:
            refresh_token = request.COOKIES.get("refresh_token")

        if not refresh_token:
            return Response(
                {"detail": "Refresh token not provided."},
                status=status.HTTP_400_BAD_REQUEST,
            )

        user = request.user

        try:
            token = RefreshToken(refresh_token)
            token.blacklist()
            user.is_active = False
            user.save(update_fields=["is_active"])
            response = Response({"detail": "Logout successful"}, status=200)
            response.delete_cookie("refresh_token")
            return response
        except Exception:
            return Response(
                {"detail": "Invalid or expired token"},
                status=status.HTTP_400_BAD_REQUEST,
            )


class RefreshTokenCookieView(TokenRefreshView):
    permission_classes = (permissions.IsAuthenticated,)

    def post(self, request, *args, **kwargs):
        refresh_token = request.COOKIE.get("refresh_token")
        if refresh_token:
            data = {"refresh": refresh_token}
            request._full_data = data
            request.data = data
        return super().post(request, *args, **kwargs)


class CreateProfileImageView(APIView):
    permission_classes = [permissions.IsAuthenticated]

    def post(self, request):
        user = request.user
        profile_image = request.FILES.get("profile_image")

        if not profile_image:
            return Response(
                {"detail": "No profile image provided."},
                status=status.HTTP_400_BAD_REQUEST,
            )

        user.profile_image = profile_image
        user.save(update_fields=["profile_image"])

        return Response(
            {"detail": "Profile image uploaded successfully."},
            status=status.HTTP_200_OK,
        )
