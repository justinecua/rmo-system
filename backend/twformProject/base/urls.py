from rest_framework_simplejwt.views import (
    TokenObtainPairView,
    TokenRefreshView,
)

from django.urls import path
from .views import CustomTokenObtainPairView, CustomRefreshTokenView, logout, register, is_logged_in, get_colleges, register, dashboard_data

urlpatterns = [
    path('token/refresh/', CustomRefreshTokenView.as_view(), name='token_refresh'),
    path('login/', CustomTokenObtainPairView.as_view(), name='token_obtain_pair'),
    path('logout/', logout),
    path('register/', register, name="register"),
    path('authenticated/', is_logged_in),
    path('get_colleges/', get_colleges, name='get_colleges'),
    path('dashboard/all/', dashboard_data, name='dashboard_data'),
]
