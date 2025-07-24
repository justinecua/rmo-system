
from django.shortcuts import render
from rest_framework.response import Response
from rest_framework.decorators import api_view
from accounts.models import Account
from activities.models import Activity, ActivityPhoto
from .serializer import ActivitySerializer, ActivityPhotoSerializer
from rest_framework.decorators import api_view, permission_classes
from rest_framework.permissions import IsAuthenticated, AllowAny
from rest_framework_simplejwt.tokens import AccessToken
from rest_framework.exceptions import AuthenticationFailed
from django.contrib.auth.models import User
from rest_framework_simplejwt.views import (
    TokenObtainPairView,
    TokenRefreshView
)
from rest_framework.decorators import api_view, parser_classes
from rest_framework.parsers import MultiPartParser, FormParser
from rest_framework import status
import os
from django.conf import settings
from rest_framework.pagination import PageNumberPagination

@api_view(['POST'])
@permission_classes([IsAuthenticated])
@parser_classes([MultiPartParser, FormParser])
def activities(request):
    title = request.data.get('title')
    description = request.data.get('description')
    scheduled_date = request.data.get('scheduled_date')
    start_time = request.data.get('start_time')
    end_time = request.data.get('end_time')
    cover_photo = request.FILES.get('cover_photo')
    additional_images = request.FILES.getlist('additional_images')

    activity = Activity.objects.create(
        title=title,
        description=description,
        scheduled_date=scheduled_date,
        start_time=start_time,
        end_time=end_time,
    )

    if cover_photo:
        ActivityPhoto.objects.create(
            activity=activity,
            image=cover_photo,
            is_cover=True
        )

    for img in additional_images:
        ActivityPhoto.objects.create(
            activity=activity,
            image=img,
            is_cover=False
        )

    serializer = ActivitySerializer(activity)
    return Response(serializer.data, status=status.HTTP_201_CREATED)

class StandardResultsSetPagination(PageNumberPagination):
    page_size = 8  # default page size
    page_size_query_param = 'page_size'
    max_page_size = 100

@api_view(['GET'])
@permission_classes([AllowAny]) 
def get_activities(request):
    activities = Activity.objects.prefetch_related('photos').order_by('-created_at')
    paginator = StandardResultsSetPagination()
    result_page = paginator.paginate_queryset(activities, request)
    serializer = ActivitySerializer(result_page, many=True)
    return paginator.get_paginated_response(serializer.data)

@api_view(['DELETE'])
@permission_classes([IsAuthenticated])
def delete_activity(request, activity_id):
    try:
        activity = Activity.objects.get(pk=activity_id)

        for photo in activity.photos.all():
            image_path = photo.image.path
            if os.path.isfile(image_path):
                os.remove(image_path)
        activity.delete()

        return Response({"detail": "Activity is deleted."}, status=status.HTTP_204_NO_CONTENT)

    except Activity.DoesNotExist:
        return Response({"detail": "Activity not found."}, status=status.HTTP_404_NOT_FOUND)
