from django.urls import path, include
from rest_framework.routers import DefaultRouter
from .views import ExerciseViewSet, WorkoutViewSet, WorkoutSetViewSet, progress_view

router = DefaultRouter()
router.register("exercises", ExerciseViewSet, basename="exercise")
router.register("workouts", WorkoutViewSet, basename="workout")
router.register("workout-sets", WorkoutSetViewSet, basename="workoutset")

urlpatterns = [
    path("", include(router.urls)),
    path("progress/", progress_view, name="progress"),
]
