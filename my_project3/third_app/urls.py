from django.urls import include,path
from . import views

app_name = "third_app"

urlpatterns = [
    path('registration/', views.registration, name='registration'),
    path('user_login/', views.user_login, name='user_login'),

]


# path('login/', views.more, name='login'),
#path('base/', views.base, name='base'),