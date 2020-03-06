from django.urls import path,include
from . import views
from django.contrib.auth import views as auth_views


app_name = 'accounts'

urlpatterns = [
    path('login/',auth_views.LoginView.as_view(),name='login'),
    path('logout/',auth_views.LogoutView.as_view(),name='logout'),
    path('signup/',views.SignUpView.as_view(),name='signup')
]
