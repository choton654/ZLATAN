from django.shortcuts import render
from django.views.generic import CreateView
from django.urls import reverse_lazy
from . import form
# from django.contrib.auth.forms import  UserCreationForm

class SignUpView(CreateView):
    form_class = form.UserFrom
    template_name = 'accounts/SignUp.html'
    success_url=reverse_lazy('login')