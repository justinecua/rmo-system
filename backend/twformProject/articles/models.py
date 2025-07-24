from django.db import models
from base.models import College

class Articles(models.Model):
    STATUS_CHOICES = [
        ("pending", "Pending"),
        ("approved", "Approved"),
        ("rejected", "Rejected"),
    ]

    article_id = models.AutoField(primary_key=True)
    title = models.CharField(max_length=600)
    authors = models.JSONField(default=list)
    emails = models.JSONField(default=list)
    abstract = models.TextField(max_length=5000)
    college = models.ForeignKey(College, null=True, blank=True, on_delete=models.CASCADE)
    keywords = models.JSONField(default=list)
    status = models.CharField(max_length=20, choices=STATUS_CHOICES, default="pending", null=True)

    def __str__(self):
        return self.title


class ArticleFiles(models.Model):
    article_file_id = models.AutoField(primary_key=True)
    article = models.ForeignKey(Articles, on_delete=models.CASCADE, related_name='articleFiles')
    pdf_path = models.FileField(upload_to='articles/')

    def __str__(self):
        return f"{self.article.title} File"
