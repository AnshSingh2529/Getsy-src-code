from django.contrib import admin
from django.contrib.auth.admin import UserAdmin as BaseUserAdmin
from django.utils.translation import gettext_lazy as _

from .models import User


@admin.register(User)
class UserAdmin(BaseUserAdmin):
    """
    Custom admin for email-based authentication.
    """

    ordering = ("email",)
    list_display = ("id", "email", "username", "is_staff", "is_active")
    list_filter = ("is_staff", "is_superuser", "is_active", "groups")
    search_fields = ("email", "username")

    fieldsets = (
        (None, {"fields": ("email", "password")}),
        (_("Personal info"), {"fields": ("username",)}),
        (
            _("Permissions"),
            {
                "fields": (
                    "is_active",
                    "is_staff",
                    "is_superuser",
                    "groups",
                    "user_permissions",
                )
            },
        ),
        (_("Important dates"), {"fields": ("last_login", "date_joined")}),
    )

    add_fieldsets = (
        (
            None,
            {
                "classes": ("wide",),
                "fields": (
                    "email",
                    "username",
                    "password1",
                    "password2",
                    "is_staff",
                    "is_superuser",
                ),
            },
        ),
    )

    filter_horizontal = ("groups", "user_permissions")


# accounts/admin.py
from django.contrib import admin
from django.contrib import messages
from django.db import transaction

from .models import AgencyDealerConnection, Dealer, Agency
from apps.user_auth.services.connection_service import (
    approve_connection,
    decline_connection,
)


@admin.register(AgencyDealerConnection)
class AgencyDealerConnectionAdmin(admin.ModelAdmin):
    list_display = (
        "id",
        "agency",
        "dealer",
        "requested_by",
        "status",
        "requested_at",
        "responded_at",
    )
    list_filter = ("status", "requested_by")
    actions = ["approve_selected", "decline_selected"]

    @admin.action(description="Approve selected connections")
    def approve_selected(self, request, queryset):
        success = 0
        failures = []
        with transaction.atomic():
            for conn in queryset.select_for_update():
                try:
                    # Here the admin is performing approve on behalf of non-initiator.
                    # In a real platform you'd restrict admin power; this is an admin tool.
                    approver_type = (
                        AgencyDealerConnection.REQUESTED_BY_AGENCY
                        if conn.requested_by
                        == AgencyDealerConnection.REQUESTED_BY_DEALER
                        else AgencyDealerConnection.REQUESTED_BY_DEALER
                    )
                    approve_connection(conn, approver_type)
                    success += 1
                except Exception as exc:
                    failures.append(str(exc))
        self.message_user(
            request,
            f"Approved: {success}. Failures: {len(failures)}",
            level=messages.INFO,
        )

    @admin.action(description="Decline selected connections")
    def decline_selected(self, request, queryset):
        success = 0
        with transaction.atomic():
            for conn in queryset.select_for_update():
                try:
                    approver_type = (
                        AgencyDealerConnection.REQUESTED_BY_AGENCY
                        if conn.requested_by
                        == AgencyDealerConnection.REQUESTED_BY_DEALER
                        else AgencyDealerConnection.REQUESTED_BY_DEALER
                    )
                    decline_connection(conn, approver_type)
                    success += 1
                except Exception:
                    pass
        self.message_user(request, f"Declined: {success}", level=messages.INFO)


@admin.register(Dealer)
class DealerAdmin(admin.ModelAdmin):
    readonly_fields = ("dlr_id",)
    list_display = ("dealer_id", "dealer", "phone", "is_active", "created_at")


@admin.register(Agency)
class AgencyAdmin(admin.ModelAdmin):
    list_display = ("name", "phone", "is_active", "created_at")
