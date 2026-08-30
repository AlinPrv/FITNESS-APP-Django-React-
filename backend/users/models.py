from django.db import models
from django.contrib.auth.models import AbstractUser

# Create your models here.


class User(AbstractUser):
    weight_kg = models.DecimalField(
        max_digits=5, decimal_places=2, null=True, blank=True
    )
    height_cm = models.DecimalField(
        max_digits=5, decimal_places=2, null=True, blank=True
    )
    goal = models.CharField(max_length=255, null=True, blank=True)
