from django.urls import path
from . import views

urlpatterns = [
    path("token/", views.get_jwt_token, name="get_token"),
    path(
        "google/login/?process=login/",
        views.GoogleLoginApiView.as_view(),
        name="process_login",
    ),
    path("logout/", views.GoogleLogoutApiView().as_view()),
]
