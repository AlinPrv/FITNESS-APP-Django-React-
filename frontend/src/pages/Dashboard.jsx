import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import apiClient from '../api/axios';
import WorkoutForm from '../components/WorkoutForm';
import Navbar from '../components/Navbar';
import Card from '../components/ui/Card';
import Button from '../components/ui/Button';

function Dashboard() {
  const [workouts, setWorkouts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchData = async () => {
      try {
        const workoutsRes = await apiClient.get('workouts/');
        setWorkouts(workoutsRes.data);
      } catch {
        setError('Eroare la încărcarea datelor');
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
    } catch {
      setError('Eroare la ștergere');
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar />
      <div className="max-w-2xl mx-auto px-4 py-6">
        <h2 className="text-2xl font-bold mb-4">Dashboard</h2>

        <Card className="mb-6">
          <h3 className="font-semibold mb-3">Adaugă antrenament nou</h3>
          <WorkoutForm onWorkoutCreated={handleWorkoutCreated} />
        </Card>

        <h3 className="font-semibold mb-3">Antrenamentele tale</h3>

        {loading && <p className="text-gray-500">Se încarcă...</p>}
        {error && <p className="text-red-600">{error}</p>}

        <div className="space-y-3">
          {workouts.map((w) => (
            <Card key={w.id} className="flex items-center justify-between">
              <Link
                to={`/workouts/${w.id}`}
                className="text-blue-600 hover:underline font-medium"
              >
                {w.name || 'Antrenament'} - {w.date}
              </Link>
              <Button variant="danger" onClick={() => handleDelete(w.id)}>
                Șterge
              </Button>
            </Card>
          ))}
        </div>
      </div>
    </div>
  );
}

export default Dashboard;
