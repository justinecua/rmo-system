from django.db import models

def upload_to_ira(instance, filename):
    return f'ira_images/{filename}'

class InstitutionalResearchAgenda(models.Model):
    ira_id = models.AutoField(primary_key=True)
    title = models.CharField(max_length=500)
    cover_image = models.ImageField(upload_to=upload_to_ira, null=True, blank=True)
    rationale = models.TextField()
    role_of_rmo = models.TextField()
    objectives = models.TextField()
    update_process = models.TextField()
    framework_description = models.TextField()
    date_covered = models.CharField(max_length=50, default="2025–2030")
    created_at = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return self.title



class KeyResearchArea(models.Model):
    ira = models.ForeignKey(InstitutionalResearchAgenda, on_delete=models.CASCADE, related_name='key_areas')
    title = models.CharField(max_length=500)
    description = models.TextField(blank=True, null=True)

    def __str__(self):
        return self.title


class ResearchTheme(models.Model):
    key_area = models.ForeignKey(KeyResearchArea, on_delete=models.CASCADE, related_name='themes')
    title = models.CharField(max_length=500)
    description = models.TextField(blank=True, null=True)

    def __str__(self):
        return self.title


class PriorityTopic(models.Model):
    theme = models.ForeignKey(ResearchTheme, on_delete=models.CASCADE, related_name='topics')
    title = models.CharField(max_length=1000)
    details = models.TextField(blank=True, null=True)

    def __str__(self):
        return self.title
