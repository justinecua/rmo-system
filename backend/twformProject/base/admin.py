from django.contrib import admin
from .models import Proponent, ProposedTitle, Form, EvaluationCriteria, FormSchedule, FormClearance, FormApproval, FormPanel, FormType, Account, UserType, FacultyUserType, ThesisTitle, InstitutionalResearchAgenda, Course, CollegeResearchAgenda, College

admin.site.register(Proponent)
admin.site.register(ProposedTitle)
admin.site.register(Form)
admin.site.register(EvaluationCriteria)
admin.site.register(FormSchedule)
admin.site.register(FormClearance)
admin.site.register(FormApproval)
admin.site.register(FormPanel)
admin.site.register(FormType)
admin.site.register(Account)
admin.site.register(UserType)
admin.site.register(FacultyUserType)
admin.site.register(ThesisTitle)
admin.site.register(InstitutionalResearchAgenda)
admin.site.register(Course)
admin.site.register(CollegeResearchAgenda)
admin.site.register(College)

