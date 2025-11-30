# profiles/urls.py

from django.urls import path
from .views import GeneratePresignedURL, SaveUploadedAvatar, UserProfileView

urlpatterns = [
    path("avatar/presigned/", GeneratePresignedURL.as_view(), name="presigned-url"),
    path("avatar/save/", SaveUploadedAvatar.as_view(), name="save-avatar"),
    path("userprofile/", UserProfileView.as_view(), name="user-profile"),
]
