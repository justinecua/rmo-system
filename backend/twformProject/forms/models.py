from django.db import models
from accounts.models import Account
from base.models import College, CollegeResearchAgenda, ThesisTitle
from institutionalResearchAgenda.models import InstitutionalResearchAgenda
from datetime import date

class FormType(models.Model):
    form_type_id = models.AutoField(primary_key=True)
    formName = models.CharField(max_length=500)
    formDescription = models.CharField(max_length=1500)

    def __str__(self):
        return self.formName

class FormPanel(models.Model):
    form_panel_id = models.AutoField(primary_key=True)
    account_id = models.ForeignKey(Account, on_delete=models.CASCADE)
    status = models.CharField(max_length=500)
    date = models.DateField(default=date.today)

    def __str__(self):
        return self.account_id

class FormApproval(models.Model):
    form_approval_id = models.AutoField(primary_key=True)
    account_id = models.ForeignKey(Account, on_delete=models.CASCADE)
    role = models.CharField(max_length=255)
    status= models.CharField(max_length=255)
    date = models.DateField(default=date.today)

    def __str__(self):
        return self.account_id

class FormClearance(models.Model):
    form_clearance_id = models.AutoField(primary_key=True)
    semester_completed = models.CharField(max_length=255)
    year_completed = models.CharField(max_length=255)
    date_of_article_submission = models.DateField(default=date.today)
    article_code_num = models.DateField(default=date.today)

    def __str__(self):
        return self.date_of_article_submission

class FormSchedule(models.Model):
    form_schedule_id = models.AutoField(primary_key=True)
    proposal_date = models.DateField()
    proposal_time = models.TimeField()
    proposal_place = models.CharField(max_length=1000)
    final_defense_date = models.DateField()
    final_defense_time = models.TimeField()
    final_defense_place = models.CharField(max_length=1000)
    date_reviewed_by_chairman = models.DateField()
    date_of_data_gathering = models.DateField()
    place_of_data_gathering = models.CharField(max_length=1000)
    
    def __str__(self):
        return self.proposal_date


class EvaluationCriteria(models.Model):
    eval_id = models.AutoField(primary_key=True)
    presentation = models.IntegerField()
    content = models.IntegerField()
    organization = models.IntegerField()
    mastery = models.IntegerField()
    remarks = models.CharField(max_length=2500)
    evaluatorName = models.CharField(max_length=500)

    def __str__(self):
        return self.presentation

class Form(models.Model):
    form_id = models.AutoField(primary_key=True)
    form_approval_id = models.ForeignKey(FormApproval, on_delete=models.CASCADE)
    form_type_id = models.ForeignKey(FormType, on_delete=models.CASCADE)
    college_id = models.ForeignKey(College, on_delete=models.CASCADE)
    ira_id = models.ForeignKey(InstitutionalResearchAgenda, on_delete=models.CASCADE)
    cra_id = models.ForeignKey(CollegeResearchAgenda, on_delete=models.CASCADE)
    student_account_id = models.ForeignKey(Account, on_delete=models.CASCADE)
    form_panel_id = models.ForeignKey(FormPanel, on_delete=models.CASCADE)
    eval_id = models.ForeignKey(EvaluationCriteria, on_delete=models.CASCADE)
    form_clearance_id = models.ForeignKey(FormClearance, on_delete=models.CASCADE)
    form_schedule_id = models.ForeignKey(FormSchedule, on_delete=models.CASCADE)
    date_created = models.DateField(default=date.today)

    def __str__(self):
        return self.form_approval_id

class ProposedTitle(models.Model):
    proposed_title_id = models.AutoField(primary_key=True)
    status = models.CharField(max_length=500)
    college_id = models.ForeignKey(College, on_delete=models.CASCADE)
    form_id = models.ForeignKey(Form, on_delete=models.CASCADE)

    def __str__(self):
        return self.status

class Proponent(models.Model):
    proponent_id = models.AutoField(primary_key=True)
    proposal_receipt_num = models.CharField(max_length=500)
    defense_receipt_num = models.CharField(max_length=500)
    form_id = models.ForeignKey(Form, on_delete=models.CASCADE)
    thesis_title_id = models.ForeignKey(ThesisTitle, on_delete=models.CASCADE)
    account_id = models.ForeignKey(Account, on_delete=models.CASCADE)

    def __str__(self):
        return self.status