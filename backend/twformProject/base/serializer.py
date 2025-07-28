from rest_framework import serializers
from accounts.models import Account
from base.models import College
from django.contrib.auth.models import User
from rest_framework_simplejwt.serializers import TokenObtainPairSerializer
from rest_framework_simplejwt.tokens import RefreshToken
from django.contrib.auth import authenticate, get_user_model
from rest_framework import serializers

from rest_framework import serializers
from django.contrib.auth.models import User
from django.contrib.auth.hashers import make_password
from accounts.models import Account, UserType
from base.models import College, Course

class UserRegisterSerializer(serializers.ModelSerializer):
    college_id = serializers.IntegerField(required=False, allow_null=True)
    course_id = serializers.IntegerField(required=False, allow_null=True)
    user_type_id = serializers.IntegerField()
    first_name = serializers.CharField()
    last_name = serializers.CharField()
    username = serializers.CharField()

    class Meta:
        model = User
        fields = [
            'username',
            'email',
            'password',
            'first_name',
            'last_name',
            'college_id',
            'course_id',
            'user_type_id',
        ]
        extra_kwargs = {
            'password': {'write_only': True},
        }

    def create(self, validated_data):
        password = validated_data.pop("password")
        college_id = validated_data.pop("college_id", None)
        course_id = validated_data.pop("course_id", None)
        user_type_id = validated_data.pop("user_type_id")

        user = User(**validated_data)
        user.set_password(password)
        user.save()

        college = College.objects.filter(pk=college_id).first() if college_id else None
        course = Course.objects.filter(pk=course_id).first() if course_id else None

        try:
            user_type = UserType.objects.get(pk=user_type_id)
        except UserType.DoesNotExist:
            raise serializers.ValidationError({"user_type_id": "Invalid user type ID"})

        Account.objects.create(
            user_id=user,
            college_id=college,
            course_id=course,
            user_type_id=user_type,
        )

        return user


class UserSerializer(serializers.ModelSerializer):
    user_type = serializers.SerializerMethodField()

    class Meta:
        model = User
        fields = ['id', 'username', 'email', 'user_type', 'first_name', 'last_name']

    def get_user_type(self, user):
        try:
            account = Account.objects.get(user_id=user)
            return account.user_type_id.name
        except Account.DoesNotExist:
            return None

class CollegeSerializer(serializers.ModelSerializer):
    class Meta:
        model = College
        fields = ['college_id', 'name', 'code']



User = get_user_model()

class EmailTokenObtainPairSerializer(serializers.Serializer):
    email = serializers.EmailField()
    password = serializers.CharField(write_only=True)

    def validate(self, attrs):
        email = attrs.get("email")
        password = attrs.get("password")

        try:
            user = User.objects.get(email=email)
        except User.DoesNotExist:
            raise serializers.ValidationError("User not found.")

        # Email exists, now check password
        if not user.check_password(password):
            raise serializers.ValidationError("Incorrect password.")

        if not user.is_active:
            raise serializers.ValidationError("This account is inactive.")

        # Get user_type
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



