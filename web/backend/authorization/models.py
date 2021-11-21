from django.db import models
from django.contrib.auth.models import AbstractBaseUser, BaseUserManager
from django.contrib.auth import get_user_model



class BaseAccountManager(BaseUserManager):

    def create_user(self, email, name, password=None):

        if not email:

            raise ValueError('user must have an email')
        
        if not name:

            raise ValueError('user must have a username')
        
        cemail = self.normalize_email(email)

        user = self.model(email=cemail, name=name)
        user.set_password(password)
        user.save()

        costumer = Costumer.objects.create(user=user)
        costumer.save()

        return user
    
    def create_superuser(self, email, name, password=None):

        user = self.create_user(email, name, password)

        user.is_superuser = True
        user.is_admin = True
        user.is_staff = True

        user.save()

        return user

class Account(AbstractBaseUser):

    email = models.EmailField(verbose_name="E-Mail", unique=True, max_length=255)
    name = models.CharField(max_length=255)
    date_joined = models.DateTimeField(verbose_name="date joined", auto_now_add=True)
    last_login = models.DateTimeField(verbose_name="last login", auto_now=True)
    is_active = models.BooleanField(default=True)
    is_superuser = models.BooleanField(default=False)
    is_admin = models.BooleanField(default=False)
    is_staff = models.BooleanField(default=False)

    USERNAME_FIELD = 'email'
    REQUIRED_FIELDS = ['name']

    objects = BaseAccountManager()

    def __str__(self):

        return self.email
    
    def has_perm(*args, **kwargs):

        return True
    
    def has_module_perms(*args, **kwargs):

        return True

User = get_user_model()

class Costumer(models.Model):

    email = models.EmailField(blank=True, null=True, max_length=255)
    user = models.OneToOneField(User, null=True, on_delete=models.CASCADE)


    def __str__(self):

        email = 'Anonymous'

        if self.user:

            email = self.user.email
        else:
            pass

        return email