from django.db import models

class User(models.Model):
    First_name = models.CharField(max_length=100,unique=True)
    Last_name = models.CharField(max_length = 100)
    Urls = models.URLField(unique=True)

    def __str__(self):
        return self.First_name



