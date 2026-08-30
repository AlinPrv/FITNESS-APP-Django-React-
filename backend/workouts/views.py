from rest_framework import viewsets, permissions
from django.db.models import Count
from rest_framework.decorators import api_view, permission_classes
from rest_framework.response import Response
from .models import Exercise, Workout, WorkoutSet
from .serializers import ExerciseSerializer, WorkoutSerializer, WorkoutSetSerializer


class ExerciseViewSet(viewsets.ModelViewSet):
    queryset = Exercise.objects.all()
    serializer_class = ExerciseSerializer
    permission_classes = [permissions.IsAuthenticated]


class WorkoutViewSet(viewsets.ModelViewSet):
    serializer_class = WorkoutSerializer
    permission_classes = [permissions.IsAuthenticated]

    def get_queryset(self):
        return Workout.objects.filter(user=self.request.user)

    def perform_create(self, serializer):
        serializer.save(user=self.request.user)


class WorkoutSetViewSet(viewsets.ModelViewSet):
    serializer_class = WorkoutSetSerializer
    permission_classes = [permissions.IsAuthenticated]

    def get_queryset(self):
        return WorkoutSet.objects.filter(workout__user=self.request.user)


@api_view(["GET"])
@permission_classes([permissions.IsAuthenticated])
def progress_view(request):
    workouts = Workout.objects.filter(user=request.user)
    total_workouts = workouts.count()
    by_date = workouts.values("date").annotate(count=Count("id")).order_by("date")

    return Response(
        {
            "total_workouts": total_workouts,
            "workouts_by_date": list(by_date),
        }
    )
