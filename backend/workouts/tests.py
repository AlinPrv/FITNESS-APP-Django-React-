from django.contrib.auth import get_user_model
from django.urls import reverse
from rest_framework.test import APITestCase
from rest_framework import status
from .models import Exercise, Workout

User = get_user_model()


class WorkoutModelTests(APITestCase):
    def test_create_workout(self):
        user = User.objects.create_user(username="wuser", password="parola123")
        workout = Workout.objects.create(
            user=user, date="2026-08-30", name="Test Workout"
        )
        self.assertEqual(workout.user, user)
        self.assertEqual(str(workout), "Test Workout - 2026-08-30")


class WorkoutCRUDTests(APITestCase):
    def setUp(self):
        self.user = User.objects.create_user(username="cruduser", password="parola123")
        self.other_user = User.objects.create_user(
            username="otheruser", password="parola123"
        )
        self.client.force_authenticate(user=self.user)

    def test_create_workout(self):
        url = reverse("workout-list")
        data = {"date": "2026-08-30", "name": "Antrenament nou"}
        response = self.client.post(url, data)
        self.assertEqual(response.status_code, status.HTTP_201_CREATED)
        self.assertEqual(Workout.objects.filter(user=self.user).count(), 1)

    def test_user_cannot_see_others_workouts(self):
        Workout.objects.create(
            user=self.other_user, date="2026-08-30", name="Nu al meu"
        )
        url = reverse("workout-list")
        response = self.client.get(url)
        self.assertEqual(len(response.data), 0)

    def test_unauthenticated_request_denied(self):
        self.client.force_authenticate(user=None)
        url = reverse("workout-list")
        response = self.client.get(url)
        self.assertEqual(response.status_code, status.HTTP_401_UNAUTHORIZED)


class ExerciseTests(APITestCase):
    def setUp(self):
        self.user = User.objects.create_user(username="exuser", password="parola123")
        self.client.force_authenticate(user=self.user)

    def test_create_exercise(self):
        url = reverse("exercise-list")
        data = {
            "name": "Genuflexiuni Test",
            "muscle_group": "legs",
            "exercise_type": "strength",
        }
        response = self.client.post(url, data)
        self.assertEqual(response.status_code, status.HTTP_201_CREATED)
        self.assertTrue(Exercise.objects.filter(name="Genuflexiuni Test").exists())
