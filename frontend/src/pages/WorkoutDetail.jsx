import { useState, useEffect } from "react";
import { useParams, Link } from "react-router-dom";
import apiClient from "../api/axios";
import Navbar from "../components/Navbar";
import Card from "../components/ui/Card";
import Button from "../components/ui/Button";
import Input from "../components/ui/Input";

function WorkoutDetail() {
  const { id } = useParams();
  const [workout, setWorkout] = useState(null);
  const [exercises, setExercises] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const [selectedExercise, setSelectedExercise] = useState("");
  const [reps, setReps] = useState("");
  const [weightKg, setWeightKg] = useState("");
  const [durationSeconds, setDurationSeconds] = useState("");
  const [distanceKm, setDistanceKm] = useState("");

  const fetchWorkout = async () => {
    try {
      const [workoutRes, exercisesRes] = await Promise.all([
        apiClient.get(`workouts/${id}/`),
        apiClient.get("exercises/"),
      ]);
      setWorkout(workoutRes.data);
      setExercises(exercisesRes.data);
    } catch (err) {
      setError("Eroare la încărcarea antrenamentului");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchWorkout();
  }, [id]);

  const selectedExerciseObj = exercises.find(
    (ex) => ex.id === Number(selectedExercise),
  );
  const isCardio = selectedExerciseObj?.exercise_type === "cardio";

  const handleAddSet = async (e) => {
    e.preventDefault();
    setError("");
    try {
      const payload = {
        workout: id,
        exercise: selectedExercise,
        reps: isCardio ? null : reps || null,
        weight_kg: isCardio ? null : weightKg || null,
        duration_seconds: isCardio ? durationSeconds || null : null,
        distance_km: isCardio ? distanceKm || null : null,
      };
      await apiClient.post("workout-sets/", payload);
      setReps("");
      setWeightKg("");
      setDurationSeconds("");
      setDistanceKm("");
      fetchWorkout();
    } catch (err) {
      setError("Eroare la adăugarea setului");
    }
  };

  const handleDeleteSet = async (setId) => {
    try {
      await apiClient.delete(`workout-sets/${setId}/`);
      fetchWorkout();
    } catch (err) {
      setError("Eroare la ștergerea setului");
    }
  };

  if (loading)
    return <p className="text-center mt-10 text-gray-500">Se încarcă...</p>;
  if (error && !workout)
    return <p className="text-center mt-10 text-red-600">{error}</p>;

  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar />
      <div className="max-w-2xl mx-auto px-4 py-6">
        <Link to="/dashboard" className="text-blue-600 hover:underline text-sm">
          ← Înapoi la Dashboard
        </Link>
        <h2 className="text-2xl font-bold my-4">
          {workout.name || "Antrenament"} - {workout.date}
        </h2>

        <Card className="mb-6">
          <h3 className="font-semibold mb-3">Seturi</h3>
          {workout.sets.length === 0 && (
            <p className="text-gray-500 text-sm">Niciun set adăugat încă.</p>
          )}
          <div className="space-y-2">
            {workout.sets.map((s) => (
              <div
                key={s.id}
                className="flex items-center justify-between border-b pb-2"
              >
                <span>
                  <strong>{s.exercise_name}</strong>:{" "}
                  {s.reps
                    ? `${s.reps} repetări, ${s.weight_kg} kg`
                    : `${s.duration_seconds}s, ${s.distance_km} km`}
                </span>
                <Button variant="danger" onClick={() => handleDeleteSet(s.id)}>
                  Șterge
                </Button>
              </div>
            ))}
          </div>
        </Card>

        <Card>
          <h3 className="font-semibold mb-3">Adaugă set</h3>
          <form onSubmit={handleAddSet}>
            <select
              value={selectedExercise}
              onChange={(e) => setSelectedExercise(e.target.value)}
              required
              className="w-full px-3 py-2 border border-gray-300 rounded-md mb-3 focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              <option value="">Alege exercițiu</option>
              {exercises.map((ex) => (
                <option key={ex.id} value={ex.id}>
                  {ex.name} (
                  {ex.exercise_type === "cardio" ? "Cardio" : "Forță"})
                </option>
              ))}
            </select>

            {isCardio ? (
              <>
                <Input
                  type="number"
                  placeholder="Durată (secunde)"
                  value={durationSeconds}
                  onChange={(e) => setDurationSeconds(e.target.value)}
                />
                <Input
                  type="number"
                  step="0.01"
                  placeholder="Distanță (km)"
                  value={distanceKm}
                  onChange={(e) => setDistanceKm(e.target.value)}
                />
              </>
            ) : (
              <>
                <Input
                  type="number"
                  placeholder="Repetări"
                  value={reps}
                  onChange={(e) => setReps(e.target.value)}
                />
                <Input
                  type="number"
                  step="0.01"
                  placeholder="Greutate (kg)"
                  value={weightKg}
                  onChange={(e) => setWeightKg(e.target.value)}
                />
              </>
            )}

            {error && <p className="text-red-600 text-sm mb-3">{error}</p>}
            <Button type="submit">Adaugă set</Button>
          </form>
        </Card>
      </div>
    </div>
  );
}

export default WorkoutDetail;
