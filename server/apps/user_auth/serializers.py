from rest_framework import serializers
from .models import User, Dealer, Agency, AgencyDealerConnection
from apps.user_auth.services.dealer_service import create_dealer


class UserSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = ["id", "email", "username", "role"]
        read_only_fields = ["id", "email", "role"]


class AgencyAddress(serializers.ModelSerializer):
    pass


class AgencySerializer(serializers.ModelSerializer):
    addresses = AgencyAddress(many=True, read_only=True)

    class Meta:
        model = Agency
        fields = ["name", "email", "phone", "rera_cert_number"]


class DealerWorkingArea(serializers.ModelSerializer):
    pass


class DealerSerializer(serializers.ModelSerializer):
    working_area = DealerWorkingArea(many=True, read_only=True)

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
        return create_dealer(**validated_data)


class AgencyDealerConnectionSerializer(serializers.ModelSerializer):
    class Meta:
        model = AgencyDealerConnection
        fields = [
            "id",
            "agency",
            "dealer",
            "requested_by",
            "status",
            "requested_at",
            "responded_at",
        ]
        read_only_fields = ["status", "requested_at", "responded_at"]


class AgencyDealerRequestSerializer(serializers.Serializer):
    # Expect agency_id or dealer_id to be passed based on caller role
    agency_id = serializers.IntegerField(required=False)
    dealer_id = serializers.IntegerField(required=False)

    def validate(self, attrs):
        if not attrs.get("agency_id") and not attrs.get("dealer_id"):
            raise serializers.ValidationError("agency_id or dealer_id required.")
        return attrs
