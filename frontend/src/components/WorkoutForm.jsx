import { useState } from "react";
import apiClient from "../api/axios";
import Input from "./ui/Input";
import Button from "./ui/Button";

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
      <Input
        type="text"
        placeholder="Numele antrenamentului"
        value={name}
        onChange={(e) => setName(e.target.value)}
      />
      <Input
        type="date"
        value={date}
        onChange={(e) => setDate(e.target.value)}
        required
      />
      {error && <p className="text-red-600 text-sm mb-3">{error}</p>}
      <Button type="submit">Adaugă antrenament</Button>
    </form>
  );
}

export default WorkoutForm;
