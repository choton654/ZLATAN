from django import forms
from .models import User


class User_submit(forms.ModelForm):
    class Meta:
        model = User
        fields = "__all__"
        