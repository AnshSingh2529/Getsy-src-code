from django.urls import path
from . import views
from rest_framework import routers


urlpatterns = [
    path("auth/get-jwt-token/", views.get_jwt_token, name="get_token"),
    path("auth/logout/", views.logout_view),
    path("broker/dashboard/", views.DealerDashboardView.as_view()),
    path("firm/dashboard/", views.AgencyDashboardView.as_view()),
]

router = routers.DefaultRouter()
router.register(r"firms", views.AgencyViewSet, basename="firm")
router.register(r"brokers", views.DealerViewSet, basename="broker")


urlpatterns += router.urls

# For Agency
"""
# Endpoint	Who can access
# POST   -> /firms/	Any authenticated user → becomes AGENCY
# PUT    -> /firms/{id}/	Only AGENCY
# DELETE -> /firms/{id}/	AGENCY (self) or ADMIN
# GET    -> /firms/	ADMIN only
# GET    -> /firms/{id}/	ADMIN or owning AGENCY
"""

# For Dealer
"""
# Endpoint	Who can access
# POST   -> /brokers/	Any authenticated user → becomes DEALER
# PUT    -> /brokers/{id}/	Only DEALER
# DELETE -> /brokers/{id}/	DEALER (self) or ADMIN
# GET    -> /brokers/	ADMIN only
# GET    -> /brokers/{id}/	ADMIN or owning DEALER
"""
