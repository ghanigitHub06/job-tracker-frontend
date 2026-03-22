import { useNavigate, useLocation, Link } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

export default function Navbar() {
  const navigate = useNavigate();
  const location = useLocation();
  const { user, logout } = useAuth();

  const handleLogout = () => {
    logout();
    navigate("/");
  };

  const isActive = (path) =>
    location.pathname === path ? "app-nav-link active" : "app-nav-link";

  return (
    <nav className="app-nav">
      <Link className="app-nav-logo" to="/">
        Job<span>Track</span>
      </Link>

      <div className="app-nav-links">
        <Link className={isActive("/dashboard")} to="/dashboard">
          Dashboard
        </Link>
        <Link className={isActive("/analytics")} to="/analytics">
          Analytics
        </Link>
      </div>

      <div className="app-nav-right">
        {user && (
          <span className="app-nav-user">
            Hey, {user.name?.split(" ")[0]} 👋
          </span>
        )}
        <button className="app-nav-logout" onClick={handleLogout}>
          Sign out
        </button>
      </div>
    </nav>
  );
}
