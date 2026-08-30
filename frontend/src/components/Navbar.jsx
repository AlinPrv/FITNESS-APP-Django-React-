import { Link } from 'react-router-dom';
import useAuthStore from '../store/authStore';

function Navbar() {
  const logout = useAuthStore((state) => state.logout);

  return (
    <nav className="bg-white shadow px-4 py-3 flex items-center justify-between">
      <div className="flex gap-4">
        <Link
          to="/dashboard"
          className="font-semibold text-gray-800 hover:text-blue-600"
        >
          Dashboard
        </Link>
        <Link
          to="/progress"
          className="font-semibold text-gray-800 hover:text-blue-600"
        >
          Progres
        </Link>
      </div>
      <button onClick={logout} className="text-sm text-red-600 hover:underline">
        Logout
      </button>
    </nav>
  );
}

export default Navbar;
