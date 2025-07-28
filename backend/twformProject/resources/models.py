from django.db import models
from base.models import College

class Resource(models.Model):
    resource_id = models.AutoField(primary_key=True)
    title = models.CharField(max_length=500)
    file = models.FileField(upload_to='resources/')
    size = models.PositiveIntegerField()

    def __str__(self):
        return self.title

