from django.urls import path
from . import views

urlpatterns = [
    path("token/", views.get_jwt_token, name="get_token"),
    path("me/", views.ProfileView.as_view()),
    path("dealer/dashboard/", views.DealerDashboardView.as_view()),
    path("agency/dashboard/", views.AgencyDashboardView.as_view()),
]
