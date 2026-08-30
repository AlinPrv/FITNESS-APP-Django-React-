import { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import apiClient from '../api/axios';
import useAuthStore from '../store/authStore';
import Card from '../components/ui/Card';
import Input from '../components/ui/Input';
import Button from '../components/ui/Button';

function Login() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();
  const login = useAuthStore((state) => state.login);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    try {
      const response = await apiClient.post('token/', { username, password });
      login(response.data.access, response.data.refresh);
      navigate('/dashboard');
    } catch {
      setError('Username sau parolă greșită');
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 px-4">
      <Card className="w-full max-w-sm">
        <h2 className="text-2xl font-bold mb-4 text-center">Login</h2>
        <form onSubmit={handleSubmit}>
          <Input
            type="text"
            placeholder="Username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
          />
          <Input
            type="password"
            placeholder="Parolă"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          {error && <p className="text-red-600 text-sm mb-3">{error}</p>}
          <Button type="submit">Login</Button>
        </form>
        <p className="text-sm text-center mt-4 text-gray-600">
          Nu ai cont?{' '}
          <Link to="/register" className="text-blue-600 hover:underline">
            Înregistrează-te
          </Link>
        </p>
      </Card>
    </div>
  );
}

export default Login;
