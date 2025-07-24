from rest_framework_simplejwt.views import (
    TokenObtainPairView,
    TokenRefreshView,
)

from django.urls import path
from . import views

urlpatterns = [
    path("submitArticle/", views.submit_article, name="submitArticle"),
    path('articles/', views.get_articles, name='get_articles'),
    path('articles/<int:article_id>/status/', views.update_article_status, name='update_article_status'),
    path('articles/<int:article_id>/', views.get_article_details, name='get_article_details'),
    path('articles/submit/', views.submit_article, name='submit_article'),
    path("articles/approved", views.get_approved_articles, name="get_approved_articles"),
]
