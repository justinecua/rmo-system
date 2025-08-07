from django.shortcuts import render
from rest_framework.response import Response
from rest_framework.decorators import api_view
from .serializer import UserRegisterSerializer, EmailTokenObtainPairSerializer, CollegeSerializer
from rest_framework.decorators import api_view, permission_classes
from rest_framework.permissions import IsAuthenticated, AllowAny
from rest_framework_simplejwt.tokens import AccessToken
from rest_framework.exceptions import AuthenticationFailed
from django.contrib.auth.models import User
from .serializer import UserSerializer
from rest_framework_simplejwt.views import (
    TokenObtainPairView,
    TokenRefreshView
)
from rest_framework.decorators import api_view, parser_classes
from rest_framework.parsers import MultiPartParser, FormParser
from rest_framework import status
from rest_framework import status, serializers
from rest_framework import status
from django.contrib.auth.models import User
from base.models import College, Course
from accounts.models import Account, UserType
from announcements.models import Announcement
from activities.models import Activity
from articles.models import Articles
from resources.models import Resource
from .serializer import UserRegisterSerializer


@api_view(['POST'])
@permission_classes([AllowAny])
def register(request):
    serializer = UserRegisterSerializer(data=request.data)
    if serializer.is_valid():
        serializer.save()
        return Response(serializer.data)
    return Response(serializer.error)


class CustomTokenObtainPairView(TokenObtainPairView):
    serializer_class = EmailTokenObtainPairSerializer

    def post(self, request, *args, **kwargs):
        try:
            serializer = self.get_serializer(data=request.data)
            serializer.is_valid(raise_exception=True)
            tokens = serializer.validated_data

            res = Response({
                'success': True,
                'user_type': tokens["user_type"]
            })

            res.set_cookie(
                key="access_token",
                value=tokens["access"],
                httponly=True,
                secure=True,
                samesite="None",
                path="/"
            )

            res.set_cookie(
                key="refresh_token",
                value=tokens["refresh"],
                httponly=True,
                secure=True,
                samesite="None",
                path="/"
            )

            return res

        except serializers.ValidationError as e:
            raw = e.detail
            if isinstance(raw, dict) and "non_field_errors" in raw:
                error_message = raw["non_field_errors"][0]
            else:
                error_message = str(e.detail)

            return Response(
                {"success": False, "error": str(error_message)},
                status=status.HTTP_401_UNAUTHORIZED
            )

        except Exception as e:
            return Response(
                {"success": False, "error": str(e)},
                status=status.HTTP_400_BAD_REQUEST
            )


class CustomRefreshTokenView(TokenRefreshView):
    def post(self, request, *args, **kwargs):

        try:
            refresh_token = request.COOKIES.get('refresh_token')
            request.data['refresh'] = refresh_token

            response = super().post(request, *args, **kwargs)
            tokens = response.data
            access_token = tokens['access']

            res = Response()
            res.data = {'refreshed': True}

            res.set_cookie(
                key='access_token',
                value=access_token,
                httponly=True,
                secure=True,
                samesite="None",
                path='/'
            )

            return res
        
        except:
            return Response({'success': False})

@api_view(['POST'])
def logout(request):
    try:
        res = Response()
        res.data = {'success': True}
        res.delete_cookie('access_token', path='/', samesite='None')
        res.delete_cookie('refresh_token', path='/', samesite='None')
        
        return res
    except:
        return Response({'success': False})


@api_view(['GET'])
@permission_classes([AllowAny]) 
def get_colleges(request):
    colleges = College.objects.all()
    serializer = CollegeSerializer(colleges, many=True)
    return Response(serializer.data)

@api_view(['GET'])
@permission_classes([AllowAny]) 
def is_logged_in(request):
    token = request.COOKIES.get('access_token')

    if not token:
        raise AuthenticationFailed("Access token not provided")

    try:
        access_token = AccessToken(token)
        user = User.objects.get(id=access_token['user_id'])
    except Exception as e:
        raise AuthenticationFailed("Invalid or expired token")

    serializer = UserSerializer(user)
    return Response(serializer.data)


# @api_view(['GET'])
# @permission_classes([IsAuthenticated]) 
# def get_formTypes(request):
#     form_types = FormType.objects.all()
#     serializer = FormTypeSerializer(form_types, many=True)
#     return Response(serializer.data)

@api_view(['POST'])
@permission_classes([AllowAny])
def register(request):
    serializer = UserRegisterSerializer(data=request.data)
    if serializer.is_valid():
        user = serializer.save()

        college_id = request.data.get('college_id')
        course_id = request.data.get('course_id')
        user_type_id = request.data.get('user_type_id')

        college = College.objects.filter(pk=college_id).first() if college_id else None
        course = Course.objects.filter(pk=course_id).first() if course_id else None

        try:
            user_type = UserType.objects.get(pk=user_type_id)
        except UserType.DoesNotExist:
            return Response({"error": "Invalid user type"}, status=status.HTTP_400_BAD_REQUEST)

        Account.objects.create(
            user_id=user,
            college_id=college,
            course_id=course,
            user_type_id=user_type,
        )

        return Response({"message": "User registered successfully."}, status=status.HTTP_201_CREATED)

    return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)


#-----------------------Dashboard ----------------------------

from rest_framework.decorators import api_view, permission_classes
from rest_framework.permissions import IsAuthenticated
from rest_framework.response import Response
from django.db.models import Count
from datetime import datetime, timedelta
from .serializer import (
    DashboardStatsSerializer,
    RecentActivitySerializer,
    ArticleStatusSerializer
)
from activities.models import Activity
from announcements.models import Announcement
from articles.models import Articles
from resources.models import Resource
from accounts.models import Account
from django.db.models import Count

@api_view(['GET'])
@permission_classes([IsAuthenticated])
def dashboard_stats(request):
    stats = {
        'activities': Activity.objects.count(),
        'announcements': Announcement.objects.count(),
        'articles': Articles.objects.count(),
        'pending_articles': Articles.objects.filter(status='pending').count(),
        'resources': Resource.objects.count(),
        'users': Account.objects.count()
    }
    
    serializer = DashboardStatsSerializer(stats)
    return Response(serializer.data)

@api_view(['GET'])
@permission_classes([IsAuthenticated])
def recent_activities(request):
    thirty_days_ago = datetime.now() - timedelta(days=30)
    
    activities = Activity.objects.filter(
        created_at__gte=thirty_days_ago
    ).order_by('-created_at')[:5]
    
    announcements = Announcement.objects.filter(
        date_posted__gte=thirty_days_ago
    ).order_by('-date_posted')[:5]
    
    recent_items = []
    
    for activity in activities:
        recent_items.append({
            'id': activity.activity_id,
            'title': activity.title,
            'date': activity.created_at.date(),
            'type': 'activity'
        })
    
    for announcement in announcements:
        recent_items.append({
            'id': announcement.announcement_id,
            'title': announcement.title,
            'date': announcement.date_posted.date(),
            'type': 'announcement'
        })

    recent_items.sort(key=lambda x: x['date'], reverse=True)
    
    serializer = RecentActivitySerializer(recent_items[:4], many=True)
    return Response(serializer.data)

@api_view(['GET'])
@permission_classes([IsAuthenticated])
def article_status(request):
    status_counts = Articles.objects.values('status').annotate(count=Count('status'))
    
    status_map = {
        'pending': 'Pending',
        'approved': 'Approved',
        'rejected': 'Rejected'
    }

    article_data = [
        {
            'name': status_map.get(item['status'], item['status']),
            'count': item['count']
        }
        for item in status_counts
    ]
    
    required_statuses = ['Pending', 'Approved', 'Rejected']
    existing_statuses = [item['name'] for item in article_data]

    for status in required_statuses:
        if status not in existing_statuses:
            article_data.append({'name': status, 'count': 0})

    return Response(article_data)

@api_view(['GET'])
@permission_classes([IsAuthenticated])
def dashboard_data(request):
    stats_response = dashboard_stats(request._request)
    activities_response = recent_activities(request._request)
    articles_response = article_status(request._request)
    
    return Response({
        'stats': stats_response.data,
        'recent_activities': activities_response.data,
        'article_status': articles_response.data
    })