from rest_framework import serializers
from .models import Course
from django.contrib.auth.models import User
from rest_framework_simplejwt.serializers import TokenObtainPairSerializer
from rest_framework_simplejwt.tokens import RefreshToken
from django.contrib.auth.models import User
from django.contrib.auth import authenticate
from rest_framework import serializers
from .models import Account

class UserRegisterSerializer(serializers.ModelSerializer):
    password = serializers.CharField(write_only=True)

    class Meta:
        model = User
        fields = ['email', 'password']

    def create(self, validated_data):
        user = User(
            email=validated_data['email']
        )
        user.set_password(validated_data['password'])
        user.save()
        return user

class UserSerializer(serializers.ModelSerializer):
    user_type = serializers.SerializerMethodField()

    class Meta:
        model = User
        fields = ['id', 'username', 'email', 'user_type']

    def get_user_type(self, user):
        try:
            account = Account.objects.get(user_id=user)
            return account.user_type_id.name
        except Account.DoesNotExist:
            return None


class CoursesSerializer(serializers.ModelSerializer):
    class Meta:
        model =Course
        fields = ['course_id', 'course_name', 'department']

class EmailTokenObtainPairSerializer(serializers.Serializer):
    email = serializers.EmailField()
    password = serializers.CharField(write_only=True)

    def validate(self, attrs):
        email = attrs.get("email")
        password = attrs.get("password")

        try:
            user = User.objects.get(email=email)
        except User.DoesNotExist:
            raise serializers.ValidationError("Invalid email or password")

        user = authenticate(username=user.username, password=password)

        if user is None:
            raise serializers.ValidationError("No user found")

        try:
            account = Account.objects.get(user_id=user)
            user_type = account.user_type_id.name 
        except Account.DoesNotExist:
            user_type = None

        refresh = RefreshToken.for_user(user)
        return {
            "refresh": str(refresh),
            "access": str(refresh.access_token),
            "user_type": user_type, 
        }
