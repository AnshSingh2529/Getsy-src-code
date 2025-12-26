from django.urls import path
from . import views

urlpatterns = [
    path("token/", views.get_jwt_token, name="get_token"),
]
