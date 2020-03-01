from django.db import models
from django.urls import reverse

class School(models.Model):
    name = models.CharField(max_length = 200)
    principal = models.CharField(max_length = 200)
    location = models.CharField(max_length = 200)

    def __str__(self):
        return self.name

    def get_absolute_url(self):
        return reverse("CBV_app:detail",kwargs={'pk':self.pk})

class Student(models.Model):
    school = models.ForeignKey(School, on_delete = models.CASCADE, related_name='students')
    name = models.CharField(max_length = 200)
    age = models.PositiveIntegerField()

    def __str__(self):
        return self.name

