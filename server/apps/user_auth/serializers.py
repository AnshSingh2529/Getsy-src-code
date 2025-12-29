from rest_framework import serializers
from .models import (
    User,
    Dealer,
    Agency,
    AgencyDealerConnection,
    AgencyAddress,
    DealerWorkingArea,
)
from apps.user_auth.services.dealer_service import create_dealer_with_working_area
from apps.user_auth.services.agency_service import create_agency_with_role_address


class UserSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = [
            "id",
            "email",
            "username",
            "role",
        ]
        read_only_fields = [
            "id",
            "email",
            "role",
        ]


class AgencyAddress(serializers.ModelSerializer):
    class Meta:
        model = AgencyAddress
        fields = [
            "pincode",
            "landmark",
            "city",
            "area",
        ]


class AgencySerializer(serializers.ModelSerializer):
    addresses = AgencyAddress()

    class Meta:
        model = Agency
        fields = [
            "name",
            "email",
            "phone",
            "rera_cert_number",
            "addresses",
        ]


class DealerWorkingArea(serializers.ModelSerializer):
    class Meta:
        model = DealerWorkingArea
        fields = [
            "pincode",
            "city",
            "area",
        ]


class DealerSerializer(serializers.ModelSerializer):
    working_area = DealerWorkingArea()

    class Meta:
        model = Dealer
        fields = [
            "name",
            "phone",
            "working_area",
        ]
        read_only_fields = [
            "dlr_id",
            "name",
            "phone",
            "is_active",
            "created_at",
        ]

    def create(self, validated_data):
        working_area_data = validated_data.pop("working_area")
        user = self.context["request"].user

        return create_dealer_with_working_area(
            dealer_data=validated_data,
            working_area_data=working_area_data,
            user=user,
        )


# class AgencyDealerConnectionSerializer(serializers.ModelSerializer):
#     class Meta:
#         model = AgencyDealerConnection
#         fields = [
#             "id",
#             "agency",
#             "dealer",
#             "requested_by",
#             "status",
#             "requested_at",
#             "responded_at",
#         ]
#         read_only_fields = [
#             "status",
#             "requested_at",
#             "responded_at",
#         ]


# class AgencyDealerRequestSerializer(serializers.Serializer):
#     # Expect agency_id or dealer_id to be passed based on caller role
#     agency_id = serializers.IntegerField(required=False)
#     dealer_id = serializers.IntegerField(required=False)

#     def validate(self, attrs):
#         if not attrs.get("agency_id") and not attrs.get("dealer_id"):
#             raise serializers.ValidationError("agency_id or dealer_id required.")
#         return attrs
