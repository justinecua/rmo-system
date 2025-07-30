from rest_framework import serializers
from django.contrib.auth.models import User
from accounts.models import UserType

class UserRegisterSerializer(serializers.ModelSerializer):
    college_id = serializers.IntegerField(required=False, allow_null=True)
    course_id = serializers.IntegerField(required=False, allow_null=True)
    user_type_id = serializers.IntegerField()

    class Meta:
        model = User
        fields = ['username', 'email', 'password', 'college_id', 'course_id', 'user_type_id']
        extra_kwargs = {
            'password': {'write_only': True}
        }

class UserTypeSerializer(serializers.ModelSerializer):
    class Meta:
        model = UserType
        fields = ['user_type_id', 'name']