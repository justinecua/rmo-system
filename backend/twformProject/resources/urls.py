
from django.urls import path
from . import views

urlpatterns = [
    path("uploadResource/", views.uploadResource, name='uploadResource'),
    path("getResources/", views.getResources, name='getResource'),
]
