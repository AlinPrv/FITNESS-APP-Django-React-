import { useState, useEffect } from "react";
import {
  LineChart,
  Line,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts";
import apiClient from "../api/axios";

function Progress() {
  const [workouts, setWorkouts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [selectedExerciseId, setSelectedExerciseId] = useState("");
  const [exercises, setExercises] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [workoutsRes, exercisesRes] = await Promise.all([
          apiClient.get("workouts/"),
          apiClient.get("exercises/"),
        ]);
        setWorkouts(workoutsRes.data);
        setExercises(exercisesRes.data);
      } catch (err) {
        setError("Eroare la încărcarea datelor");
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, []);

  if (loading) return <p>Se încarcă...</p>;
  if (error) return <p style={{ color: "red" }}>{error}</p>;

  const frequencyData = workouts
    .reduce((acc, w) => {
      const existing = acc.find((item) => item.date === w.date);
      if (existing) {
        existing.count += 1;
      } else {
        acc.push({ date: w.date, count: 1 });
      }
      return acc;
    }, [])
    .sort((a, b) => new Date(a.date) - new Date(b.date));

  const weightProgressData = workouts
    .flatMap((w) =>
      (w.sets || [])
        .filter(
          (s) =>
            Number(s.exercise) === Number(selectedExerciseId) && s.weight_kg,
        )
        .map((s) => ({ date: w.date, weight: Number(s.weight_kg) })),
    )
    .sort((a, b) => new Date(a.date) - new Date(b.date));

  return (
    <div>
      <h2>Progres</h2>

      <h3>Frecvența antrenamentelor</h3>
      <ResponsiveContainer width="100%" height={300}>
        <BarChart data={frequencyData}>
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="date" />
          <YAxis allowDecimals={false} />
          <Tooltip />
          <Legend />
          <Bar dataKey="count" name="Antrenamente" fill="#8884d8" />
        </BarChart>
      </ResponsiveContainer>

      <h3>Evoluție greutate pe exercițiu</h3>
      <select
        value={selectedExerciseId}
        onChange={(e) => setSelectedExerciseId(e.target.value)}
      >
        <option value="">Alege exercițiu</option>
        {exercises
          .filter((ex) => ex.exercise_type === "strength")
          .map((ex) => (
            <option key={ex.id} value={ex.id}>
              {ex.name}
            </option>
          ))}
      </select>

      {selectedExerciseId && (
        <ResponsiveContainer width="100%" height={300}>
          <LineChart data={weightProgressData}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="date" />
            <YAxis />
            <Tooltip />
            <Legend />
            <Line
              type="monotone"
              dataKey="weight"
              name="Greutate (kg)"
              stroke="#82ca9d"
            />
          </LineChart>
        </ResponsiveContainer>
      )}
    </div>
  );
}

export default Progress;
