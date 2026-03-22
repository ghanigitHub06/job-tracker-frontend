import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import API from "../api/axios";
import toast from "react-hot-toast";
import { Briefcase, Mail, Lock, User } from "lucide-react";

const Register = () => {
  const [form, setForm] = useState({ name: "", email: "", password: "" });
  const [loading, setLoading] = useState(false);
  const { login } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (form.password.length < 6) {
      toast.error("Password must be at least 6 characters");
      return;
    }
    setLoading(true);
    try {
      const { data } = await API.post("/auth/register", form);
      login(data);
      toast.success(`Account created! Welcome, ${data.name}!`);
      navigate("/dashboard");
    } catch (err) {
      toast.error(err.response?.data?.error || "Registration failed");
    } finally {
      setLoading(false);
    }
  };

  const inputStyle = {
    width: "100%",
    padding: "11px 12px 11px 38px",
    borderRadius: "8px",
    border: "1px solid #E2E8F0",
    fontSize: "14px",
    boxSizing: "border-box",
    background: "#F8FAFC",
    outline: "none",
  };

  const iconStyle = {
    position: "absolute",
    left: "12px",
    top: "50%",
    transform: "translateY(-50%)",
  };

  return (
    <div
      style={{
        minHeight: "100vh",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        background: "linear-gradient(135deg, #667eea 0%, #764ba2 100%)",
        padding: "16px",
      }}
    >
      <div
        style={{
          background: "white",
          borderRadius: "20px",
          padding: "40px",
          width: "100%",
          maxWidth: "420px",
          boxShadow: "0 20px 60px rgba(0,0,0,0.2)",
        }}
      >
        {/* Logo */}
        <div style={{ textAlign: "center", marginBottom: "32px" }}>
          <div
            style={{
              width: "60px",
              height: "60px",
              borderRadius: "16px",
              background: "linear-gradient(135deg, #667eea 0%, #764ba2 100%)",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              margin: "0 auto 16px",
            }}
          >
            <Briefcase size={28} color="white" />
          </div>
          <h1
            style={{
              margin: "0 0 6px",
              fontSize: "24px",
              fontWeight: 800,
              color: "#1E293B",
            }}
          >
            Create account
          </h1>
          <p style={{ margin: 0, color: "#64748B", fontSize: "14px" }}>
            Start tracking your job applications
          </p>
        </div>

        <form
          onSubmit={handleSubmit}
          style={{ display: "flex", flexDirection: "column", gap: "16px" }}
        >
          <div>
            <label
              style={{
                display: "block",
                fontSize: "13px",
                fontWeight: 600,
                color: "#475569",
                marginBottom: "6px",
              }}
            >
              Full name
            </label>
            <div style={{ position: "relative" }}>
              <User size={16} color="#94A3B8" style={iconStyle} />
              <input
                value={form.name}
                required
                onChange={(e) => setForm({ ...form, name: e.target.value })}
                placeholder="Ravi Kumar"
                style={inputStyle}
              />
            </div>
          </div>

          <div>
            <label
              style={{
                display: "block",
                fontSize: "13px",
                fontWeight: 600,
                color: "#475569",
                marginBottom: "6px",
              }}
            >
              Email address
            </label>
            <div style={{ position: "relative" }}>
              <Mail size={16} color="#94A3B8" style={iconStyle} />
              <input
                type="email"
                value={form.email}
                required
                onChange={(e) => setForm({ ...form, email: e.target.value })}
                placeholder="you@example.com"
                style={inputStyle}
              />
            </div>
          </div>

          <div>
            <label
              style={{
                display: "block",
                fontSize: "13px",
                fontWeight: 600,
                color: "#475569",
                marginBottom: "6px",
              }}
            >
              Password
            </label>
            <div style={{ position: "relative" }}>
              <Lock size={16} color="#94A3B8" style={iconStyle} />
              <input
                type="password"
                value={form.password}
                required
                onChange={(e) => setForm({ ...form, password: e.target.value })}
                placeholder="Min. 6 characters"
                style={inputStyle}
              />
            </div>
          </div>

          <button
            type="submit"
            disabled={loading}
            style={{
              padding: "12px",
              borderRadius: "10px",
              border: "none",
              background: "linear-gradient(135deg, #667eea 0%, #764ba2 100%)",
              color: "white",
              fontSize: "15px",
              fontWeight: 700,
              cursor: loading ? "not-allowed" : "pointer",
              opacity: loading ? 0.8 : 1,
              marginTop: "4px",
            }}
          >
            {loading ? "Creating account..." : "Create Account"}
          </button>
        </form>

        <p
          style={{
            textAlign: "center",
            marginTop: "24px",
            fontSize: "14px",
            color: "#64748B",
          }}
        >
          Already have an account?{" "}
          <Link
            to="/login"
            style={{
              color: "#6366F1",
              fontWeight: 600,
              textDecoration: "none",
            }}
          >
            Sign in
          </Link>
        </p>
      </div>
    </div>
  );
};

export default Register;
