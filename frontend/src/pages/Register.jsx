import { useState } from "react";
import { useNavigate } from "react-router-dom";
import apiClient from "../api/axios";

function Register() {
  const [formData, setFormData] = useState({
    username: "",
    email: "",
    password: "",
  });
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    try {
      await apiClient.post("register/", formData);
      navigate("/login");
    } catch (err) {
      setError("Eroare la înregistrare. Verifică datele introduse.");
    }
  };

  return (
    <div>
      <h2>Register</h2>
      <form onSubmit={handleSubmit}>
        <input name="username" placeholder="Username" onChange={handleChange} />
        <input
          name="email"
          type="email"
          placeholder="Email"
          onChange={handleChange}
        />
        <input
          name="password"
          type="password"
          placeholder="Parolă"
          onChange={handleChange}
        />
        {error && <p style={{ color: "red" }}>{error}</p>}
        <button type="submit">Register</button>
      </form>
    </div>
  );
}

export default Register;
