from accounts.models import Account
from announcements.models import Announcement, AnnouncementPhoto
from django.contrib.auth.models import User
from rest_framework_simplejwt.serializers import TokenObtainPairSerializer
from rest_framework_simplejwt.tokens import RefreshToken
from django.contrib.auth import authenticate
from rest_framework import serializers

class AnnouncementPhotoSerializer(serializers.ModelSerializer):
    class Meta:
        model = AnnouncementPhoto
        fields = ['announcement_photo_id', 'image', 'is_cover']


class AnnouncementSerializer(serializers.ModelSerializer):
    photos = AnnouncementPhotoSerializer(many=True, read_only=True)
    
    class Meta:
        model = Announcement
        fields = [
            'announcement_id',
            'title',
            'short_description',
            'description',
            'date_posted',
            'is_pinned',
            'photos'
        ]