from rest_framework import serializers
from django.contrib.auth import authenticate
from .models import User
from rest_framework_simplejwt.serializers import TokenObtainPairSerializer
from django.utils import timezone


class RegisterSerializer(serializers.ModelSerializer):
    password = serializers.CharField(write_only=True, min_length=8)

    class Meta:
        model = User
        fields = ("email", "name", "phone", "role", "password")
        extra_kwargs = {
            "role": {"required": False},  # allow optional
        }

    def create(self, validated_data):
        password = validated_data.pop("password")
        role = validated_data.get("role", User.ROLE_CHOICES.USER)

        user = User.objects.create_user(
            email=validated_data["email"],
            name=validated_data["name"],
            phone=validated_data["phone"],
            role=role,
            password=password,
        )
        return user


class CustomTokenObtainPairSerializer(TokenObtainPairSerializer):

    @classmethod
    def get_token(cls, user):
        token = super().get_token(user)

        token["email"] = user.email
        token["name"] = user.name
        token["role"] = user.role

        return token


class LoginSerializer(serializers.Serializer):
    email = serializers.EmailField()
    password = serializers.CharField(write_only=True)

    def validate(self, attrs):
        email = attrs.get("email")
        password = attrs.get("password")

        if not email or not password:
            raise serializers.ValidationError('Must include "email" and "password".')

        # Try authenticate via backend
        user = authenticate(
            request=self.context.get("request"), email=email, password=password
        )

        # If authenticate fails (maybe because is_active=False), try manual check
        if not user:
            try:
                user_obj = User.objects.get(email=email)
                if not user_obj.check_password(password):
                    raise serializers.ValidationError(
                        "Unable to log in with provided credentials"
                    )
                user = user_obj
            except User.DoesNotExist:
                raise serializers.ValidationError(
                    "Unable to log in with provided credentials"
                )

        # Update last_login and is_active on fresh DB object
        user.last_login = timezone.now()
        user.is_active = True
        user.save(update_fields=["last_login", "is_active"])

        attrs["user"] = user
        return attrs
