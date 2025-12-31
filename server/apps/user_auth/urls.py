from django.urls import path
from . import views
from rest_framework import routers


urlpatterns = [
    path("auth/get-jwt-token/", views.get_jwt_token, name="get_token"),
    path("auth/logout/", views.logout_view),
    path("dealer/dashboard/", views.DealerDashboardView.as_view()),
    path("agency/dashboard/", views.AgencyDashboardView.as_view()),
]

router = routers.DefaultRouter()
router.register(r"agencies", views.AgencyViewSet, basename="agency")
router.register(r"dealers", views.DealerViewSet, basename="dealer")


urlpatterns += router.urls

# For Agency
"""
# Endpoint	Who can access
# POST   -> /agencies/	Any authenticated user → becomes AGENCY
# PUT    -> /agencies/{id}/	Only AGENCY
# DELETE -> /agencies/{id}/	AGENCY (self) or ADMIN
# GET    -> /agencies/	ADMIN only
# GET    -> /agencies/{id}/	ADMIN or owning AGENCY
"""

# For Dealer
"""
# Endpoint	Who can access
# POST   -> /dealers/	Any authenticated user → becomes DEALER
# PUT    -> /dealers/{id}/	Only DEALER
# DELETE -> /dealers/{id}/	DEALER (self) or ADMIN
# GET    -> /dealers/	ADMIN only
# GET    -> /dealers/{id}/	ADMIN or owning DEALER
"""
