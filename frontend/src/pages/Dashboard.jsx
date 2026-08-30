import { useState, useEffect } from "react";
import apiClient from "../api/axios";
import WorkoutForm from "../components/WorkoutForm";

function Dashboard() {
  const [exercises, setExercises] = useState([]);
  const [workouts, setWorkouts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [exercisesRes, workoutsRes] = await Promise.all([
          apiClient.get("exercises/"),
          apiClient.get("workouts/"),
        ]);
        setExercises(exercisesRes.data);
        setWorkouts(workoutsRes.data);
      } catch (err) {
        setError("Eroare la încărcarea datelor");
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, []);

  const handleWorkoutCreated = (newWorkout) => {
    setWorkouts([...workouts, newWorkout]);
  };

  const handleDelete = async (id) => {
    try {
      await apiClient.delete(`workouts/${id}/`);
      setWorkouts(workouts.filter((w) => w.id !== id));
    } catch (err) {
      setError("Eroare la ștergere");
    }
  };

  if (loading) return <p>Se încarcă...</p>;
  if (error) return <p style={{ color: "red" }}>{error}</p>;

  return (
    <div>
      <h2>Dashboard</h2>

      <h3>Adaugă antrenament nou</h3>
      <WorkoutForm onWorkoutCreated={handleWorkoutCreated} />

      <h3>Antrenamentele tale</h3>
      <ul>
        {workouts.map((w) => (
          <li key={w.id}>
            {w.name || "Antrenament"} - {w.date}
            <button onClick={() => handleDelete(w.id)}>Șterge</button>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default Dashboard;
