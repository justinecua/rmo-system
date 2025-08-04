from django.db import models
from accounts.models import Account

class Activity(models.Model):
    activity_id = models.AutoField(primary_key=True)
    title = models.CharField(max_length=255)
    description = models.TextField(max_length=2000)
    scheduled_date = models.DateField(null=True)
    venue = models.CharField(max_length=255, blank=True, null=True)
    start_time = models.TimeField(null=True)
    end_time = models.TimeField(null=True)
    created_at = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return self.title

class ActivityPhoto(models.Model):
    activity_photo_id = models.AutoField(primary_key=True)
    activity = models.ForeignKey(Activity, on_delete=models.CASCADE, related_name='photos')
    image = models.ImageField(upload_to='activities/')
    is_cover = models.BooleanField(default=False)

    def __str__(self):
        return f"{'Cover' if self.is_cover else 'Additional'} for {self.activity.title}"
