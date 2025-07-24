from django.shortcuts import render
from rest_framework.response import Response
from rest_framework.decorators import api_view
from accounts.models import Account
from announcements.models import Announcement, AnnouncementPhoto
from .serializer import AnnouncementPhotoSerializer, AnnouncementSerializer
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
def announcements(request):
    title = request.data.get('title')
    short_description = request.data.get('short_description')
    description = request.data.get('description')
    is_pinned = request.data.get('is_pinned', False)
    cover_photo = request.FILES.get('cover_photo')
    additional_images = request.FILES.getlist('additional_images')

    announcement = Announcement.objects.create(
        title=title,
        short_description=short_description,
        description=description,
        is_pinned=is_pinned,
    )

    if cover_photo:
        AnnouncementPhoto.objects.create(
            announcement_id=announcement,
            image=cover_photo,
            is_cover=True
        )

    for img in additional_images:
        AnnouncementPhoto.objects.create(
            announcement_id=announcement,
            image=img,
            is_cover=False
        )

    serializer = AnnouncementSerializer(announcement)
    return Response(serializer.data, status=status.HTTP_201_CREATED)

class StandardResultsSetPagination(PageNumberPagination):
    page_size = 8  # default page size
    page_size_query_param = 'page_size'
    max_page_size = 100

@api_view(['GET'])
@permission_classes([AllowAny]) 
def get_announcements(request):
    announcements = Announcement.objects.prefetch_related('photos').order_by('-date_posted')
    paginator = StandardResultsSetPagination()
    result_page = paginator.paginate_queryset(announcements, request)
    serializer = AnnouncementSerializer(result_page, many=True)
    return paginator.get_paginated_response(serializer.data)

@api_view(['DELETE'])
@permission_classes([IsAuthenticated])
def delete_announcement(request, announcement_id):
    try:
        announcement = Announcement.objects.get(pk=announcement_id)

        for photo in announcement.photos.all():
            image_path = photo.image.path
            if os.path.isfile(image_path):
                os.remove(image_path)
        announcement.delete()

        return Response({"detail": "Announcement and its images deleted."}, status=status.HTTP_204_NO_CONTENT)

    except Announcement.DoesNotExist:
        return Response({"detail": "Announcement not found."}, status=status.HTTP_404_NOT_FOUND)
