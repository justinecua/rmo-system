from django.db import models
from base.models import College

class Resource(models.Model):
    resource_id = models.AutoField(primary_key=True)
    subject = models.CharField(max_length=255, blank=True, null=True)  
    file = models.FileField(upload_to='resources/')
    size = models.BigIntegerField()
    title = models.CharField(max_length=255, null=True)

    def __str__(self):
        return self.title

