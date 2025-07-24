from django.db import models
from accounts.models import Account

class Announcement(models.Model):
    announcement_id = models.AutoField(primary_key=True)
    title = models.CharField(max_length=255)
    short_description = models.TextField(max_length=600,blank=True)
    description = models.TextField(max_length=8000)
    date_posted = models.DateTimeField(auto_now_add=True)
    is_pinned = models.BooleanField(default=False)

    def __str__(self):
        return self.title


class AnnouncementPhoto(models.Model):
    announcement_photo_id = models.AutoField(primary_key=True)
    announcement_id = models.ForeignKey(Announcement, on_delete=models.CASCADE, related_name='photos')
    image = models.ImageField(upload_to='announcements/')
    is_cover = models.BooleanField(default=False) 

    def __str__(self):
        return f"{'Cover' if self.is_cover else 'Additional'} for {self.announcement.title}"
