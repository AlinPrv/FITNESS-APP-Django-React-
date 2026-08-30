import { useState } from "react";
import apiClient from "../api/axios";

function WorkoutForm({ onWorkoutCreated }) {
  const [name, setName] = useState("");
  const [date, setDate] = useState("");
  const [error, setError] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    try {
      const response = await apiClient.post("workouts/", { name, date });
      onWorkoutCreated(response.data);
      setName("");
      setDate("");
    } catch (err) {
      setError("Eroare la crearea antrenamentului");
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <input
        type="text"
        placeholder="Numele antrenamentului"
        value={name}
        onChange={(e) => setName(e.target.value)}
      />
      <input
        type="date"
        value={date}
        onChange={(e) => setDate(e.target.value)}
        required
      />
      {error && <p style={{ color: "red" }}>{error}</p>}
      <button type="submit">Adaugă antrenament</button>
    </form>
  );
}

export default WorkoutForm;
