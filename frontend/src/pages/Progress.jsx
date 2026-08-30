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
import Navbar from "../components/Navbar";
import Card from "../components/ui/Card";

function Progress() {
  const [workouts, setWorkouts] = useState([]);
  const [exercises, setExercises] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [selectedExerciseId, setSelectedExerciseId] = useState("");

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

  if (loading)
    return <p className="text-center mt-10 text-gray-500">Se încarcă...</p>;
  if (error) return <p className="text-center mt-10 text-red-600">{error}</p>;

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
    <div className="min-h-screen bg-gray-50">
      <Navbar />
      <div className="max-w-2xl mx-auto px-4 py-6">
        <h2 className="text-2xl font-bold mb-4">Progres</h2>

        <Card className="mb-6">
          <h3 className="font-semibold mb-3">Frecvența antrenamentelor</h3>
          <ResponsiveContainer width="100%" height={300}>
            <BarChart data={frequencyData}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="date" />
              <YAxis allowDecimals={false} />
              <Tooltip />
              <Legend />
              <Bar dataKey="count" name="Antrenamente" fill="#2563eb" />
            </BarChart>
          </ResponsiveContainer>
        </Card>

        <Card>
          <h3 className="font-semibold mb-3">Evoluție greutate pe exercițiu</h3>
          <select
            value={selectedExerciseId}
            onChange={(e) => setSelectedExerciseId(e.target.value)}
            className="w-full px-3 py-2 border border-gray-300 rounded-md mb-4 focus:outline-none focus:ring-2 focus:ring-blue-500"
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
                  stroke="#16a34a"
                />
              </LineChart>
            </ResponsiveContainer>
          )}
        </Card>
      </div>
    </div>
  );
}

export default Progress;
