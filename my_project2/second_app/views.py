from django.shortcuts import render
from second_app import models as md
from django.http import HttpResponse
from . import forms


def index(request):
    return render(request,'second_app/index.html')

def user(request):
    s = md.User.objects.order_by('Last_name')
    user_list = {'user':s}
    return render(request,'second_app/user.html',context=user_list)


def user_submit(request):
    form = forms.User_submit()
    form_dict = {"form":form}

    if request.method == "POST":
        form = forms.User_submit(request.POST)

        if form.is_valid():

            form.save(commit=True)
            return index(request)

            # print("Validation Successfull")
            # print("First_name"+form.cleaned_data["First_name"])
            # print("Last_name"+form.cleaned_data["Last_name"])
            # print("Urls"+form.cleaned_data["Urls"])
            

    return render(request, "second_app/form.html",context=form_dict)
