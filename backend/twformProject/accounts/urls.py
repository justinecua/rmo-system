from django.urls import path
from . import views 

urlpatterns = [
    path('get_userTypes/', views.get_userTypes, name='get_userTypes'),
]
