import uuid
import boto3
from django.conf import settings
from rest_framework.response import Response
from rest_framework.views import APIView
from rest_framework.permissions import IsAuthenticated
from rest_framework import status
from .serializers import UpdateAvatarSerializer
from .models import UserProfile


class GeneratePresignedURL(APIView):
    permission_classes = [IsAuthenticated]

    def post(self, request):
        s3 = boto3.client(
            "s3",
            aws_access_key_id=settings.AWS_ACCESS_KEY_ID,
            aws_secret_access_key=settings.AWS_SECRET_ACCESS_KEY,
            region_name=settings.AWS_S3_REGION_NAME,
        )

        file_ext = request.data.get("ext", "jpg")
        unique_key = f"avatars/{uuid.uuid4()}.{file_ext}"

        presigned_url = s3.generate_presigned_url(
            ClientMethod="put_object",
            Params={
                "Bucket": settings.AWS_STORAGE_BUCKET_NAME,
                "Key": unique_key,
                "ContentType": f"image/{file_ext}",
            },
            ExpiresIn=3600,
        )

        return Response({"avatar_url": presigned_url, "avatar_key": unique_key})


class SaveUploadedAvatar(APIView):
    permission_classes = [IsAuthenticated]

    def put(self, request, *args, **kwargs):
        profile, created = UserProfile.objects.get_or_create(user=request.user)
        serializer = UpdateAvatarSerializer(profile, data=request.data, partial=True)
        serializer.is_valid(raise_exception=True)
        serializer.save()
        return Response(serializer.data, status=status.HTTP_200_OK)


class UserProfileView(APIView):
    permission_classes = [IsAuthenticated]

    def get(self, request):
        profile, created = UserProfile.objects.get_or_create(user=request.user)

        return Response(
            {
                "id": request.user.id,
                "name": request.user.name,
                "email": request.user.email,
                "profile": {
                    "avatar_url": profile.avatar_url,
                    "bio": profile.bio,
                },
            }
        )
