from django.contrib import admin
from base.models import College
from articles.models import Articles, ArticleFiles

admin.site.register(College)
admin.site.register(Articles)
admin.site.register(ArticleFiles)

