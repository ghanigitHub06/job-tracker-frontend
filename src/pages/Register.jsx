import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

export default function Register() {
  const navigate = useNavigate();
  const { login } = useAuth();
  const [form, setForm] = useState({ name: "", email: "", password: "" });
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handle = (e) => setForm({ ...form, [e.target.name]: e.target.value });

  const submit = async (e) => {
    e.preventDefault();
    setError("");
    if (form.password.length < 6) {
      setError("Password must be at least 6 characters.");
      return;
    }
    setLoading(true);
    try {
      const res = await fetch(
        `${import.meta.env.VITE_API_BASE_URL}/auth/register`,
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(form),
        },
      );
      if (!res.ok) {
        const data = await res.json();
        throw new Error(data.message || "Registration failed.");
      }
      await login(form.email, form.password);
      navigate("/dashboard");
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Syne:wght@400;600;700;800&family=DM+Sans:ital,wght@0,300;0,400;0,500;1,300&display=swap');

        *, *::before, *::after { margin: 0; padding: 0; box-sizing: border-box; }

        :root {
          --ink:    #0a0a0f;
          --paper:  #f5f3ee;
          --cream:  #eae7df;
          --accent: #e85d2f;
          --gold:   #c9a84c;
          --muted:  #6b6660;
          --border: rgba(0,0,0,0.1);
        }

        .auth-page {
          min-height: 100vh;
          display: grid;
          grid-template-columns: 1fr 1fr;
          font-family: 'DM Sans', sans-serif;
          background: var(--paper);
        }

        /* ── LEFT PANEL ── */
        .auth-left {
          background: var(--ink);
          display: flex; flex-direction: column;
          justify-content: space-between;
          padding: 3rem;
          position: relative; overflow: hidden;
        }
        .auth-left::before {
          content: '';
          position: absolute; top: -30%; left: -20%;
          width: 500px; height: 500px; border-radius: 50%;
          background: radial-gradient(circle, rgba(232,93,47,0.2) 0%, transparent 65%);
        }
        .auth-left::after {
          content: '';
          position: absolute; bottom: -10%; right: -20%;
          width: 400px; height: 400px; border-radius: 50%;
          background: radial-gradient(circle, rgba(201,168,76,0.12) 0%, transparent 65%);
        }
        .auth-logo {
          font-family: 'Syne', sans-serif;
          font-weight: 800; font-size: 1.2rem;
          color: white; text-decoration: none;
          position: relative; z-index: 1;
        }
        .auth-logo span { color: var(--accent); }

        .auth-left-content { position: relative; z-index: 1; }
        .auth-left-tag {
          display: inline-block;
          background: rgba(232,93,47,0.15);
          border: 1px solid rgba(232,93,47,0.3);
          color: var(--accent); border-radius: 100px;
          padding: 0.3rem 0.9rem; font-size: 0.72rem;
          font-weight: 600; letter-spacing: .06em; text-transform: uppercase;
          margin-bottom: 1.5rem;
        }
        .auth-left-title {
          font-family: 'Syne', sans-serif;
          font-size: clamp(2rem, 3.5vw, 3rem);
          font-weight: 800; line-height: 1.05;
          letter-spacing: -0.03em; color: white;
          margin-bottom: 1rem;
        }
        .auth-left-title span { color: var(--accent); }
        .auth-left-sub {
          color: rgba(255,255,255,0.45);
          font-size: 0.9rem; line-height: 1.7; max-width: 320px;
        }

        /* feature list */
        .auth-features { position: relative; z-index: 1; }
        .auth-feature {
          display: flex; align-items: flex-start; gap: 0.75rem;
          margin-bottom: 1rem;
        }
        .auth-feature-icon {
          width: 32px; height: 32px; border-radius: 8px;
          background: rgba(232,93,47,0.15);
          display: flex; align-items: center; justify-content: center;
          font-size: 0.9rem; flex-shrink: 0; margin-top: 1px;
        }
        .auth-feature-text { }
        .auth-feature-title {
          font-size: 0.85rem; font-weight: 600; color: white; margin-bottom: 0.1rem;
        }
        .auth-feature-desc { font-size: 0.78rem; color: rgba(255,255,255,0.35); }

        /* ── RIGHT PANEL ── */
        .auth-right {
          display: flex; align-items: center; justify-content: center;
          padding: 3rem 2rem;
          background: var(--paper);
        }
        .auth-form-wrap {
          width: 100%; max-width: 400px;
          animation: fadeUp .5s ease both;
        }
        @keyframes fadeUp {
          from { opacity: 0; transform: translateY(16px); }
          to   { opacity: 1; transform: translateY(0); }
        }

        .auth-form-title {
          font-family: 'Syne', sans-serif;
          font-size: 1.8rem; font-weight: 800;
          letter-spacing: -0.03em; color: var(--ink);
          margin-bottom: 0.4rem;
        }
        .auth-form-sub {
          color: var(--muted); font-size: 0.88rem;
          margin-bottom: 2rem;
        }
        .auth-form-sub a {
          color: var(--accent); text-decoration: none; font-weight: 500;
        }
        .auth-form-sub a:hover { text-decoration: underline; }

        .form-group { margin-bottom: 1.1rem; }
        .form-label {
          display: block; font-size: 0.8rem; font-weight: 600;
          color: var(--ink); margin-bottom: 0.4rem;
        }
        .form-input {
          width: 100%; padding: 0.8rem 1rem;
          border: 1.5px solid var(--border);
          border-radius: 10px;
          font-family: 'DM Sans', sans-serif; font-size: 0.95rem;
          background: white; color: var(--ink);
          outline: none;
          transition: border-color .2s, box-shadow .2s;
        }
        .form-input::placeholder { color: rgba(107,102,96,0.5); }
        .form-input:focus {
          border-color: var(--accent);
          box-shadow: 0 0 0 3px rgba(232,93,47,0.1);
        }

        .auth-error {
          background: rgba(232,93,47,0.08);
          border: 1px solid rgba(232,93,47,0.25);
          color: var(--accent); border-radius: 8px;
          padding: 0.7rem 1rem; font-size: 0.85rem;
          margin-bottom: 1.25rem;
        }

        .auth-submit {
          width: 100%; padding: 0.9rem;
          background: var(--ink); color: white;
          border: none; border-radius: 10px; cursor: pointer;
          font-family: 'DM Sans', sans-serif;
          font-size: 0.95rem; font-weight: 600;
          transition: background .2s, transform .15s;
          margin-top: 0.5rem;
        }
        .auth-submit:hover:not(:disabled) {
          background: var(--accent); transform: translateY(-1px);
        }
        .auth-submit:disabled { opacity: 0.6; cursor: not-allowed; }

        .auth-terms {
          font-size: 0.75rem; color: var(--muted);
          text-align: center; margin-top: 1rem; line-height: 1.5;
        }

        .auth-switch {
          text-align: center; margin-top: 1.5rem;
          font-size: 0.85rem; color: var(--muted);
        }
        .auth-switch a {
          color: var(--accent); font-weight: 600; text-decoration: none;
        }
        .auth-switch a:hover { text-decoration: underline; }

        @media (max-width: 768px) {
          .auth-page { grid-template-columns: 1fr; }
          .auth-left { display: none; }
          .auth-right { padding: 2rem 1.5rem; }
        }
      `}</style>

      <div className="auth-page">
        {/* LEFT */}
        <div className="auth-left">
          <a className="auth-logo" href="/">
            Job<span>Track</span>
          </a>

          <div className="auth-left-content">
            <div className="auth-left-tag">Get started free</div>
            <h2 className="auth-left-title">
              Take control of
              <br />
              your <span>job search</span>
              <br />
              today.
            </h2>
            <p className="auth-left-sub">
              Join thousands of job seekers who track smarter. Free forever, no
              credit card needed.
            </p>
          </div>

          <div className="auth-features">
            {[
              {
                icon: "⚡",
                title: "Kanban Pipeline",
                desc: "5 stages from Wishlist to Offer",
              },
              {
                icon: "📊",
                title: "Analytics Dashboard",
                desc: "Weekly trends & success rates",
              },
              {
                icon: "🔐",
                title: "100% Private",
                desc: "Your data, secured with JWT",
              },
            ].map((f) => (
              <div className="auth-feature" key={f.title}>
                <div className="auth-feature-icon">{f.icon}</div>
                <div className="auth-feature-text">
                  <div className="auth-feature-title">{f.title}</div>
                  <div className="auth-feature-desc">{f.desc}</div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* RIGHT */}
        <div className="auth-right">
          <div className="auth-form-wrap">
            <h1 className="auth-form-title">Create account</h1>
            <p className="auth-form-sub">
              Already have one? <Link to="/login">Sign in</Link>
            </p>

            {error && <div className="auth-error">{error}</div>}

            <form onSubmit={submit}>
              <div className="form-group">
                <label className="form-label">Full name</label>
                <input
                  className="form-input"
                  type="text"
                  name="name"
                  placeholder="Ravi Kumar"
                  value={form.name}
                  onChange={handle}
                  required
                />
              </div>

              <div className="form-group">
                <label className="form-label">Email address</label>
                <input
                  className="form-input"
                  type="email"
                  name="email"
                  placeholder="you@example.com"
                  value={form.email}
                  onChange={handle}
                  required
                />
              </div>

              <div className="form-group">
                <label className="form-label">Password</label>
                <input
                  className="form-input"
                  type="password"
                  name="password"
                  placeholder="Min. 6 characters"
                  value={form.password}
                  onChange={handle}
                  required
                />
              </div>

              <button className="auth-submit" type="submit" disabled={loading}>
                {loading ? "Creating account..." : "Create free account →"}
              </button>
            </form>

            <p className="auth-terms">
              By signing up you agree to our terms of service and privacy
              policy.
            </p>

            <div className="auth-switch">
              Already have an account? <Link to="/login">Sign in</Link>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
