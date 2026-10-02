import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext.jsx";

function Navbar() {
  const { token, user, logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate("/login");
  };

  return (
    <nav className="bg-blue-600 text-white">
      <div className="max-w-6xl mx-auto px-4 py-3 flex flex-wrap items-center justify-between gap-2">
        <Link to="/" className="text-xl font-bold">
          BookStore
        </Link>

        <div className="flex flex-wrap items-center gap-4">
          <Link to="/">Home</Link>

          {token ? (
            <>
              <Link to="/add-book">Add Book</Link>
              {user && <span className="text-sm">Welcome, {user.name}</span>}
              <button
                onClick={handleLogout}
                className="bg-white text-blue-600 px-3 py-1 rounded"
              >
                Logout
              </button>
            </>
          ) : (
            <>
              <Link to="/login">Login</Link>
              <Link to="/register">Register</Link>
            </>
          )}
        </div>
      </div>
    </nav>
  );
}

export default Navbar;