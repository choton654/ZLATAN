from django.db import models
from django.conf import settings

# Create your models here.
from django.urls import reverse
import misaka
from groups.models import Group
from django.contrib.auth import get_user_model
User = get_user_model()



class Post(models.Model):
    user = models.ForeignKey(User, related_name='posts', on_delete=models.CASCADE)
    created_on = models.DateTimeField(auto_now=True)
    massage = models.TextField()
    massage_html = models.TextField(editable=False)
    group = models.ForeignKey(Group, related_name='posts', on_delete=models.CASCADE)

    def __str__(self):
        return self.massage

    def save(self,*arg,**kwargs):
        self.massage_html = misaka.html(self.massage)
        super().save(*arg,**kwargs)

    def get_absolute_url(self):
        return reverse("posts:single", kwargs={"username":self.user.username,"pk": self.pk})

    class Meta:
         ordering = ['-created_on']
         unique_together = ('user','massage')



