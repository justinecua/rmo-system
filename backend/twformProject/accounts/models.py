from django.db import models
from django.conf import settings
from datetime import date
from base.models import College, Course, FacultyUserType

class UserType(models.Model):
    user_type_id = models.AutoField(primary_key=True)
    name = models.CharField(max_length=255)
    faculty_type = models.ForeignKey(FacultyUserType, null=True, blank=True, on_delete=models.CASCADE)

    def __str__(self):
        return self.name

class Account(models.Model):
    account_id = models.AutoField(primary_key=True)
    user_id = models.ForeignKey(settings.AUTH_USER_MODEL, on_delete=models.CASCADE)
    college_id = models.ForeignKey(College, null=True, blank=True, on_delete=models.CASCADE)
    course_id = models.ForeignKey(Course, null=True, blank=True, on_delete=models.CASCADE)
    user_type_id =  models.ForeignKey(UserType, on_delete=models.CASCADE)

    def __str__(self):
        return str(self.account_id)

