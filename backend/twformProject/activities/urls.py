from django.urls import path
from .views import activities, get_activities, delete_activity

urlpatterns = [
    path('add_activities/', activities, name='activities'),
    path('get_activities/', get_activities, name='get_activities'),
    path("del_activities/<int:activity_id>/", delete_activity, name="delete_activity"),
]
