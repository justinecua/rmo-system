from django.shortcuts import render
from rest_framework.response import Response
from rest_framework.decorators import api_view
from .models import Course, FormType
from .serializer import CoursesSerializer, UserRegisterSerializer, EmailTokenObtainPairSerializer, FormTypeSerializer
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
                secure=False,
                samesite="Lax",
                path="/"
            )

            res.set_cookie(
                key="refresh_token",
                value=tokens["refresh"],
                httponly=True,
                secure=False,
                samesite="Lax",
                path="/"
            )

            return res

        except Exception as e:
            return Response({'success': False, 'error': str(e)}, status=400)

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
                secure=False,
                samesite="Lax",
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
        res.delete_cookie('access_token', path='/', samesite='Lax')
        res.delete_cookie('refresh_token', path='/', samesite='Lax')
        
        return res
    except:
        return Response({'success': False})


@api_view(['GET'])
@permission_classes([IsAuthenticated]) 
def get_courses(request):
    user = request.user
    courses = Course.objects.all()
    serializer = CoursesSerializer(courses, many=True)
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


@api_view(['GET'])
@permission_classes([IsAuthenticated]) 
def get_formTypes(request):
    form_types = FormType.objects.all()
    serializer = FormTypeSerializer(form_types, many=True)
    return Response(serializer.data)