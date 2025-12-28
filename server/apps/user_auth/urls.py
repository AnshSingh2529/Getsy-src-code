from django.urls import path
from . import views

urlpatterns = [
    path("token/", views.get_jwt_token, name="get_token"),
    path("me/", ProfileView.as_view()),
    path("dealer/dashboard/", DealerDashboardView.as_view()),
    path("agency/dashboard/", AgencyDashboardView.as_view()),
]
