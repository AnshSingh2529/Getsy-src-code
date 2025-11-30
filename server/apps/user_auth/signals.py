from django.db.models.signals import pre_delete
from django.dispatch import receiver
from rest_framework_simplejwt.token_blacklist.models import OutstandingToken, BlacklistedToken
from django.contrib.auth import get_user_model

User = get_user_model()

# Signal to delete related tokens when a user is deleted
@receiver(pre_delete, sender=User)
def delete_related_tokens(sender, instance, **kwargs):
    BlacklistedToken.objects.filter(token__user=instance).delete()
    OutstandingToken.objects.filter(user=instance).delete()


# New signal to update last_login on user login
from django.contrib.auth.signals import user_logged_in
from django.dispatch import receiver
from django.utils import timezone

@receiver(user_logged_in)
def update_user_login_time(sender, user, request, **kwargs):
    user.last_login = timezone.now()
    user.is_active = True
    user.save(update_fields=["last_login", "is_active"])