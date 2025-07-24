from rest_framework import serializers
from .models import Articles, ArticleFiles
from base.models import College

class CollegeSerializer(serializers.ModelSerializer):
    class Meta:
        model = College
        fields = ['college_id', 'name', 'code']

class ArticleFileSerializer(serializers.ModelSerializer):
    class Meta:
        model = ArticleFiles
        fields = ['article_file_id', 'pdf_path']

class ArticleSerializer(serializers.ModelSerializer):
    college = CollegeSerializer()
    articleFiles = ArticleFileSerializer(many=True, read_only=True)
    
    class Meta:
        model = Articles
        fields = [
            'article_id',
            'title',
            'authors',
            'emails',
            'abstract',
            'college',
            'keywords',
            'status',
            'articleFiles'
        ]