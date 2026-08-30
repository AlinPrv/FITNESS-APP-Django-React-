from django.db import models
from django.conf import settings

# Create your models here.


class Exercise(models.Model):
    MUSCLE_GROUP_CHOICES = [
        ("chest", "Piept"),
        ("back", "Spate"),
        ("legs", "Picioare"),
        ("shoulders", "Umeri"),
        ("arms", "Brate"),
        ("core", "Abdomen"),
        ("cardio", "Cardio"),
    ]

    TYPE_CHOICES = [
        ("strength", "Forta"),
        ("cardio", "Cardio"),
    ]

    name = models.CharField(max_length=255)
    muscle_group = models.CharField(max_length=50, choices=MUSCLE_GROUP_CHOICES)
    exercise_type = models.CharField(max_length=50, choices=TYPE_CHOICES)
    description = models.TextField(blank=True, null=True)

    def __str__(self):
        return self.name


class Workout(models.Model):
    user = models.ForeignKey(settings.AUTH_USER_MODEL, on_delete=models.CASCADE)
    date = models.DateField()
    name = models.CharField(max_length=255, blank=True)
    notes = models.TextField(blank=True)

    def __str__(self):
        return f"{self.name} - {self.date}"


class WorkoutSet(models.Model):
    workout = models.ForeignKey(Workout, on_delete=models.CASCADE, related_name="sets")
    exercise = models.ForeignKey(
        Exercise, on_delete=models.CASCADE, related_name="sets"
    )
    reps = models.PositiveIntegerField(null=True, blank=True)
    weight_kg = models.DecimalField(
        max_digits=5, decimal_places=2, null=True, blank=True
    )
    duration_seconds = models.PositiveIntegerField(null=True, blank=True)
    distance_km = models.DecimalField(
        max_digits=5, decimal_places=2, null=True, blank=True
    )

    def __str__(self):
        return f"{self.exercise.name} - {self.workout.date}"
