from rest_framework import serializers
from .models import Exercise, Workout, WorkoutSet


class ExerciseSerializer(serializers.ModelSerializer):
    class Meta:
        model = Exercise
        fields = ["id", "name", "muscle_group", "exercise_type", "description"]


class WorkoutSetSerializer(serializers.ModelSerializer):
    exercise_name = serializers.CharField(source="exercise.name", read_only=True)

    class Meta:
        model = WorkoutSet
        fields = [
            "id",
            "workout",
            "exercise",
            "exercise_name",
            "reps",
            "weight_kg",
            "duration_seconds",
            "distance_km",
        ]


class WorkoutSerializer(serializers.ModelSerializer):
    sets = WorkoutSetSerializer(many=True, read_only=True)

    class Meta:
        model = Workout
        fields = ["id", "user", "date", "name", "notes", "sets"]
        read_only_fields = ["user"]
