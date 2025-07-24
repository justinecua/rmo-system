from django.urls import path
from .views import announcements, get_announcements, delete_announcement

urlpatterns = [
    path('add_announcements/', announcements, name='announcements'),
    path('get_announcements/', get_announcements, name='get_announcements'),
    path("del_announcements/<int:announcement_id>/", delete_announcement, name="delete_announcement"),
]
