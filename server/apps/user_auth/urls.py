from django.urls import path
from .views import RegisterView, LoginView, LogoutView
from rest_framework_simplejwt.views import TokenRefreshView

urlpatterns = [
    path("register/", RegisterView.as_view(), name="auth_register"),
    path(
        "login/", LoginView.as_view(), name="token_obtain_pair"
    ),  # returns both access + refresh
    path(
        "token/refresh/", TokenRefreshView.as_view(), name="token_refresh"
    ),  # or use RefreshTokenCookieView for cookie-based
    path("logout/", LogoutView.as_view(), name="auth_logout"),
   
]
