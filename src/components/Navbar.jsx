import { Link, useNavigate, useLocation } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import { LogOut, LayoutDashboard, BarChart2, Briefcase } from "lucide-react";

const Navbar = () => {
  const { user, logout } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();

  const handleLogout = () => {
    logout();
    navigate("/login");
  };

  const isActive = (path) => location.pathname === path;

  return (
    <nav
      style={{
        background: "linear-gradient(135deg, #667eea 0%, #764ba2 100%)",
        padding: "0 24px",
        display: "flex",
        alignItems: "center",
        justifyContent: "space-between",
        height: "64px",
        boxShadow: "0 2px 10px rgba(0,0,0,0.15)",
        position: "sticky",
        top: 0,
        zIndex: 100,
      }}
    >
      {/* Logo */}
      <div style={{ display: "flex", alignItems: "center", gap: "10px" }}>
        <Briefcase size={24} color="white" />
        <span
          style={{
            color: "white",
            fontWeight: 700,
            fontSize: "18px",
            letterSpacing: "-0.3px",
          }}
        >
          JobTracker
        </span>
      </div>

      {/* Nav Links */}
      <div style={{ display: "flex", gap: "8px" }}>
        <Link
          to="/dashboard"
          style={{
            display: "flex",
            alignItems: "center",
            gap: "6px",
            color: isActive("/dashboard") ? "white" : "rgba(255,255,255,0.75)",
            textDecoration: "none",
            padding: "8px 16px",
            borderRadius: "8px",
            background: isActive("/dashboard")
              ? "rgba(255,255,255,0.2)"
              : "transparent",
            fontSize: "14px",
            fontWeight: 500,
            transition: "all 0.2s",
          }}
        >
          <LayoutDashboard size={16} /> Dashboard
        </Link>
        <Link
          to="/analytics"
          style={{
            display: "flex",
            alignItems: "center",
            gap: "6px",
            color: isActive("/analytics") ? "white" : "rgba(255,255,255,0.75)",
            textDecoration: "none",
            padding: "8px 16px",
            borderRadius: "8px",
            background: isActive("/analytics")
              ? "rgba(255,255,255,0.2)"
              : "transparent",
            fontSize: "14px",
            fontWeight: 500,
            transition: "all 0.2s",
          }}
        >
          <BarChart2 size={16} /> Analytics
        </Link>
      </div>

      {/* User + Logout */}
      <div style={{ display: "flex", alignItems: "center", gap: "12px" }}>
        <div
          style={{
            width: "36px",
            height: "36px",
            borderRadius: "50%",
            background: "rgba(255,255,255,0.25)",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            color: "white",
            fontWeight: 700,
            fontSize: "14px",
          }}
        >
          {user?.name?.charAt(0).toUpperCase()}
        </div>
        <span style={{ color: "rgba(255,255,255,0.9)", fontSize: "14px" }}>
          {user?.name}
        </span>
        <button
          onClick={handleLogout}
          style={{
            display: "flex",
            alignItems: "center",
            gap: "6px",
            background: "rgba(255,255,255,0.15)",
            border: "1px solid rgba(255,255,255,0.3)",
            color: "white",
            padding: "8px 14px",
            borderRadius: "8px",
            cursor: "pointer",
            fontSize: "13px",
            fontWeight: 500,
          }}
        >
          <LogOut size={14} /> Logout
        </button>
      </div>
    </nav>
  );
};

export default Navbar;
