from rest_framework import serializers
from .models import UserProfile


class UserProfileSerializer(serializers.ModelSerializer):
    class Meta:
        model = UserProfile
        fields = ["id", "bio", "avatar_url", "avatar_key", "uploaded_at"]
        read_only_fields = ["uploaded_at", "avatar_url", "avatar_key"]


class UpdateAvatarSerializer(serializers.ModelSerializer):
    class Meta:
        model = UserProfile
        fields = ("bio", "avatar_url", "avatar_key")
        extra_kwargs = {
            "bio": {"required": False, "allow_blank": True},
            "avatar_url": {"required": False, "allow_blank": True},
            "avatar_key": {"required": False, "allow_blank": True},
        }

    def validate_avatar_url(self, value):
        if value and not value.startswith(("http://", "https://")):
            raise serializers.ValidationError("Invalid URL format.")
        return value
