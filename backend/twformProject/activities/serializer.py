from accounts.models import Account
from django.contrib.auth.models import User
from rest_framework_simplejwt.serializers import TokenObtainPairSerializer
from rest_framework_simplejwt.tokens import RefreshToken
from django.contrib.auth import authenticate
from rest_framework import serializers
from .models import Activity, ActivityPhoto  

class ActivityPhotoSerializer(serializers.ModelSerializer):
    class Meta:
        model = ActivityPhoto
        fields = ['activity_photo_id', 'image', 'is_cover']

class ActivitySerializer(serializers.ModelSerializer):
    photos = ActivityPhotoSerializer(many=True, read_only=True)

    class Meta:
        model = Activity
        fields = ['activity_id', 'title', 'description', 'scheduled_date', 
                'photos', 'end_time', 'start_time', 'venue']