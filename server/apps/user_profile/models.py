from django.db import models

# Create your models here.


class UserProfile(models.Model):
    user = models.OneToOneField(
        "user_auth.User", on_delete=models.CASCADE, related_name="profile"
    )
    bio = models.TextField(blank=True, null=True)
    avatar_url = models.URLField(blank=True, null=True)
    avatar_key = models.CharField(max_length=512, blank=True, null=True)
    uploaded_at = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return f"Profile of {self.user.username}"
