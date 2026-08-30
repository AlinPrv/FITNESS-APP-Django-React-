import { useState, useEffect } from "react";
import { useParams, Link } from "react-router-dom";
import apiClient from "../api/axios";

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

  if (loading) return <p>Se încarcă...</p>;
  if (error && !workout) return <p style={{ color: "red" }}>{error}</p>;

  return (
    <div>
      <Link to="/dashboard">← Înapoi la Dashboard</Link>
      <h2>
        {workout.name || "Antrenament"} - {workout.date}
      </h2>

      <h3>Seturi</h3>
      <ul>
        {workout.sets.map((s) => (
          <li key={s.id}>
            {s.exercise_name}:{" "}
            {s.reps
              ? `${s.reps} repetări, ${s.weight_kg} kg`
              : `${s.duration_seconds}s, ${s.distance_km} km`}
            <button onClick={() => handleDeleteSet(s.id)}>Șterge</button>
          </li>
        ))}
      </ul>

      <h3>Adaugă set</h3>
      <form onSubmit={handleAddSet}>
        <select
          value={selectedExercise}
          onChange={(e) => setSelectedExercise(e.target.value)}
          required
        >
          <option value="">Alege exercițiu</option>
          {exercises.map((ex) => (
            <option key={ex.id} value={ex.id}>
              {ex.name} ({ex.exercise_type === "cardio" ? "Cardio" : "Forță"})
            </option>
          ))}
        </select>

        {isCardio ? (
          <>
            <input
              type="number"
              placeholder="Durată (secunde)"
              value={durationSeconds}
              onChange={(e) => setDurationSeconds(e.target.value)}
            />
            <input
              type="number"
              step="0.01"
              placeholder="Distanță (km)"
              value={distanceKm}
              onChange={(e) => setDistanceKm(e.target.value)}
            />
          </>
        ) : (
          <>
            <input
              type="number"
              placeholder="Repetări"
              value={reps}
              onChange={(e) => setReps(e.target.value)}
            />
            <input
              type="number"
              step="0.01"
              placeholder="Greutate (kg)"
              value={weightKg}
              onChange={(e) => setWeightKg(e.target.value)}
            />
          </>
        )}

        {error && <p style={{ color: "red" }}>{error}</p>}
        <button type="submit">Adaugă set</button>
      </form>
    </div>
  );
}

export default WorkoutDetail;
