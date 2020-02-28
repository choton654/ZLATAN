import  os
os.environ.setdefault('DJANGO_SETTINGS_MODULE', 'my_project2.settings')

import django
django.setup()
import random
import second_app.models as md
from faker import Faker


fk = Faker()
def populate(N=5):
    for i in range(N):
        fake_url = fk.url()
        fake_first = fk.name()
        fake_last = fk.name()

        user = md.User.objects.get_or_create(First_name=fake_first, Last_name=fake_last,Urls=fake_url)[0]

if __name__ == '__main__':
    print('poulating')
    populate(20)
    print('population complete')