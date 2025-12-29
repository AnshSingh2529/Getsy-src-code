from django.core.management.base import BaseCommand, CommandError
from django.contrib.auth import get_user_model

from apps.user_auth.services.agency_service import create_agency_with_role_address

User = get_user_model()


class Command(BaseCommand):
    help = "Create an Agency for an existing authenticated user"

    def add_arguments(self, parser):
        parser.add_argument("--email", required=True, help="User email")
        parser.add_argument("--name", required=True)
        parser.add_argument("--phone", required=True)
        parser.add_argument("--rera", required=True)

        parser.add_argument("--city", required=True)
        parser.add_argument("--area", required=True)
        parser.add_argument("--pincode", required=True)
        parser.add_argument("--landmark", default="")

    def handle(self, *args, **options):
        try:
            user = User.objects.get(email=options["email"])
        except User.DoesNotExist:
            raise CommandError("User with this email does not exist")

        agency_data = {
            "name": options["name"],
            "phone": options["phone"],
            "rera_cert_number": options["rera"],
            "email": options["email"],
        }

        address_data = {
            "city": options["city"],
            "area": options["area"],
            "pincode": options["pincode"],
            "landmark": options["landmark"],
        }

        try:
            agency = create_agency_with_role_address(
                agency_data=agency_data,
                address_data=address_data,
                user=user,
            )
        except ValueError as e:
            raise CommandError(str(e))

        self.stdout.write(
            self.style.SUCCESS(
                f"Agency '{agency.name}' created for {user.email}"
            )
        )
