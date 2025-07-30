from django.shortcuts import render
from rest_framework.response import Response
from rest_framework.decorators import api_view
from accounts.models import Account
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
from base.models import College
from rest_framework import status, serializers

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

from rest_framework.decorators import api_view, permission_classes
from rest_framework.permissions import AllowAny
from rest_framework.response import Response
from rest_framework import status
from django.contrib.auth.models import User
from base.models import College, Course
from accounts.models import Account, UserType
from .serializer import UserRegisterSerializer

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
