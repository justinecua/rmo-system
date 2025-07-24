from django.db import models
from django.conf import settings
from datetime import date

class College(models.Model):
    college_id = models.AutoField(primary_key=True)
    name = models.CharField(max_length=500)
    code = models.CharField(max_length=50)

    def __str__(self):
        return self.code

class CollegeResearchAgenda(models.Model):
    cra_id = models.AutoField(primary_key=True)
    name = models.CharField(max_length=500)
    description = models.CharField(max_length=1500)
    college_id = models.ForeignKey(College, null=True, blank=True, on_delete=models.CASCADE)

    def __str__(self):
        return self.name

class ThesisTitle(models.Model):
    thesis_title_id = models.AutoField(primary_key=True)
    thesis_title = models.CharField(max_length=800)
    college_id = models.ForeignKey(College, on_delete=models.CASCADE)

    def __str__(self):
        return self.thesis_title

class Course(models.Model):
    course_id = models.AutoField(primary_key=True)
    name = models.CharField(max_length=500)
    code = models.CharField(max_length=50)
    college_id = models.ForeignKey(College, on_delete=models.CASCADE)

    def __str__(self):
        return self.name

class InstitutionalResearchAgenda(models.Model):
    ira_id = models.AutoField(primary_key=True)
    name = models.CharField(max_length=1000)
    sub_areas = models.CharField(max_length=1500)

    def __str__(self):
        return self.name

class FacultyUserType(models.Model):
    faculty_type_id = models.AutoField(primary_key=True)
    name = models.CharField(max_length=255)

    def __str__(self):
        return self.name

