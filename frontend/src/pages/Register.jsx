import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import apiClient from "../api/axios";
import Card from "../components/ui/Card";
import Input from "../components/ui/Input";
import Button from "../components/ui/Button";

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
    <div className="min-h-screen flex items-center justify-center bg-gray-50 px-4">
      <Card className="w-full max-w-sm">
        <h2 className="text-2xl font-bold mb-4 text-center">Register</h2>
        <form onSubmit={handleSubmit}>
          <Input
            name="username"
            placeholder="Username"
            onChange={handleChange}
          />
          <Input
            name="email"
            type="email"
            placeholder="Email"
            onChange={handleChange}
          />
          <Input
            name="password"
            type="password"
            placeholder="Parolă"
            onChange={handleChange}
          />
          {error && <p className="text-red-600 text-sm mb-3">{error}</p>}
          <Button type="submit">Register</Button>
        </form>
        <p className="text-sm text-center mt-4 text-gray-600">
          Ai deja cont?{" "}
          <Link to="/login" className="text-blue-600 hover:underline">
            Login
          </Link>
        </p>
      </Card>
    </div>
  );
}

export default Register;
