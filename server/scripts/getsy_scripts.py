from apps.user_auth.models import User
from apps.properties.models import Property
from pprint import pprint
from django.db import connection


def run():
    # # filter users by role

    users = User.objects.latest('date_joined')
    # users = User.objects.first()
    # users = User.objects.earliest('date_joined')

    print(users)

    # users = User.objects.all()[2:3]
    # print(users)
    # print(users.count())

    # dealers = User.ROLE_CHOICES.DEALER
    # agencies = User.ROLE_CHOICES.AGENCY
    # users = User.ROLE_CHOICES.USER

    # check_base_user = [dealers, agencies, users]

    # users_by_role = User.objects.filter(role__in=check_base_user)
    # print(users_by_role)
    # print(User.objects.get(name="Michael Garcia"))

    # print(User.objects.filter(role=User.ROLE_CHOICES.DEALER).count())

    pprint(connection.queries)
