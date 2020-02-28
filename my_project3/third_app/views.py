from django.shortcuts import render
from .form import UserForm,UserInfoForm


from django.contrib.auth import authenticate,login,logout
from django.http import HttpResponseRedirect,HttpResponse
from django.urls import reverse
from django.contrib.auth.decorators import login_required



def index(request):
    return render(request, "third_app/index.html")

@login_required
def spacial(request):
    return HttpResponse("You r logged in")


@login_required
def user_logout(request):
    logout(request)

    return render(request,"third_app/thank_u.html")


def registration(request):

    registered = False
    if request.method == "POST":

        user_info = UserForm(data=request.POST)
        profile_info = UserInfoForm(data=request.POST)

        if user_info.is_valid() & profile_info.is_valid():

            user = user_info.save()
            user.set_password(user.password)
            user.save()

            profile = profile_info.save(commit=False)
            profile.user = user

            if "profile_pic" in request.FILES:
                print("found it")
                profile.profile_pic = request.FILES["profile_pic"]

            profile.save()

            registered = True
        else:
            print(user_info.errors,profile_info.errors)

    else:
        user_info=UserForm()
        profile_info=UserInfoForm()

    my_dict = {"registered":registered, "user_info":user_info, "profile_info":profile_info}

    return render(request, "third_app/registration.html",context=my_dict)



def user_login(request):

    if request.method == "POST":
        username = request.POST.get("username")
        password = request.POST.get("password")

        user = authenticate(username=username,password=password)

        if user:
            if user.is_active:

                login(request,user)

                return HttpResponseRedirect(reverse("index"))
            else:
                return HttpResponse("Your account is not active")
        else:
            print("Someone tried to log in but failed")
            print("username {}, password {}".format(username,password))
            return HttpResponse("You are an unauthenticate user")
    else:
        return render(request, "third_app/login.html",{})
