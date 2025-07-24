from rest_framework import serializers
from base.models import Account
from django.contrib.auth.models import User
from rest_framework_simplejwt.serializers import TokenObtainPairSerializer
from rest_framework_simplejwt.tokens import RefreshToken
from django.contrib.auth import authenticate
from rest_framework import serializers

class FormTypeSerializer(serializers.ModelSerializer):
    class Meta:
        model = FormType
        fields = ['form_type_id', 'formName', 'formDescription']
