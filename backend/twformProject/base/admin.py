from django.contrib import admin
from base.models import College
from articles.models import Articles, ArticleFiles
from accounts.models import UserType, Account
from base.models import FacultyUserType
from activities.models import Activity

admin.site.register(College)
admin.site.register(Articles)
admin.site.register(ArticleFiles)
admin.site.register(UserType)
admin.site.register(Account)
admin.site.register(FacultyUserType)
admin.site.register(Activity)
