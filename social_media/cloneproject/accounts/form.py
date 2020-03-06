from django.contrib.auth import get_user_model
from django.contrib.auth.forms import UserCreationForm
from .models import UserInfo
class UserFrom(UserCreationForm):
    
    class Meta():
        fields = ('username','email','password1','password2')
        model = UserInfo
        
        def __init__(self, *args, **kwargs):
            super().__init__(*args, **kwargs)
            self.fields['username'].label = "Name"
            self.fields['email'].label = "Email"
