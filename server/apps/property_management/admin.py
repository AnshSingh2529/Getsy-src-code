from django.contrib import admin
from .models import (
    Property,
    Agency,
    AgencyAgentMembership,
    AgencyBillingTransaction,
    AgencyProperty,
    AgencyPropertyAccess,
    AgencyPropertyAgents,
    Dealer,
    DealerProperty,
)


# --------------------
# PROPERTY
# --------------------
@admin.register(Property)
class PropertyAdmin(admin.ModelAdmin):
    list_display = (
        "id",
        "title",
        "price",
        "location",
        "isAvailable",
        "views",
        "manager"
    )
    search_fields = ("title", "location")
    list_filter = ("isAvailable",)
    ordering = ("-id",)


# --------------------
# DEALER
# --------------------
@admin.register(Dealer)
class DealerAdmin(admin.ModelAdmin):
    list_display = (
        "id",
        "dealer",
        "location",
        "rera_certificate",
    )
    search_fields = (
        "dealer__email",
        "dealer__name",
        "dealer__phone",
    )
    list_filter = ("location",)


# --------------------
# AGENCY
# --------------------
@admin.register(Agency)
class AgencyAdmin(admin.ModelAdmin):
    list_display = (
        "id",
        "agency",
        "location",
        "rera_certificate",
    )
    search_fields = (
        "agency__email",
        "agency__name",
        "agency__phone",
    )
    list_filter = ("location",)


# --------------------
# DEALER ↔ PROPERTY DEAL
# --------------------
@admin.register(DealerProperty)
class DealerPropertyAdmin(admin.ModelAdmin):
    list_display = (
        "id",
        "dealer",
        "property",
        "status",
        "commission_rate",
        "commission_final",
        "is_commission_paid",
        "created_at",
    )

    list_filter = (
        "status",
        "is_commission_paid",
    )

    search_fields = (
        "dealer__dealer__name",
        "property__title",
    )

    readonly_fields = (
        "commission_final",
        "closed_at",
        "created_at",
        "updated_at",
    )


# --------------------
# AGENCY ↔ PROPERTY DEAL
# --------------------
@admin.register(AgencyProperty)
class AgencyPropertyAdmin(admin.ModelAdmin):
    list_display = (
        "id",
        "agency",
        "property",
        "status",
        "commission_rate",
        "commission_final",
        "is_commission_paid",
        "created_at",
    )

    list_filter = (
        "status",
        "is_commission_paid",
    )

    search_fields = (
        "agency__agency__name",
        "property__title",
    )

    readonly_fields = (
        "commission_final",
        "closed_at",
        "created_at",
        "updated_at",
    )


# --------------------
# AGENCY ↔ DEALER MEMBERSHIP
# --------------------
@admin.register(AgencyAgentMembership)
class AgencyAgentMembershipAdmin(admin.ModelAdmin):
    list_display = (
        "id",
        "dealer",
        "agency",
        "term_days",
        "start_date",
        "end_date",
        "is_active",
    )

    list_filter = (
        "is_active",
        "term_days",
    )

    search_fields = (
        "dealer__dealer__name",
        "agency__agency__name",
    )


# --------------------
# PROPERTY ACCESS (SUBSCRIPTIONS)
# --------------------
@admin.register(AgencyPropertyAccess)
class AgencyPropertyAccessAdmin(admin.ModelAdmin):
    list_display = (
        "id",
        "membership",
        "property",
        "duration_days",
        "start_date",
        "end_date",
        "is_active",
    )

    list_filter = (
        "is_active",
        "duration_days",
    )

    search_fields = (
        "membership__dealer__dealer__name",
        "property__title",
    )


# --------------------
# PROPERTY AGENT ASSIGNMENTS
# --------------------
@admin.register(AgencyPropertyAgents)
class AgencyPropertyAgentsAdmin(admin.ModelAdmin):
    list_display = (
        "id",
        "dealer",
        "agency",
        "property",
        "created_at",
    )

    search_fields = (
        "dealer__dealer__name",
        "agency__agency__name",
        "property__title",
    )


# --------------------
# BILLING / TRANSACTIONS
# --------------------
@admin.register(AgencyBillingTransaction)
class AgencyBillingTransactionAdmin(admin.ModelAdmin):
    list_display = (
        "id",
        "invoice_id",
        "dealer",
        "agency",
        "type",
        "amount",
        "currency",
        "is_paid",
        "created_at",
    )

    list_filter = (
        "type",
        "is_paid",
        "currency",
    )

    search_fields = (
        "invoice_id",
        "dealer__dealer__name",
        "agency__agency__name",
    )

    readonly_fields = (
        "created_at",
        "paid_at",
    )
