import { useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";

const FEATURES = [
  {
    icon: "⚡",
    title: "Kanban Board",
    desc: "Drag and visualize every application across Wishlist, Applied, Interview, Offer & Rejected.",
  },
  {
    icon: "📊",
    title: "Smart Analytics",
    desc: "Weekly trend charts and status breakdowns so you always know where you stand.",
  },
  {
    icon: "🔐",
    title: "Secure & Private",
    desc: "JWT-powered authentication. Your data belongs to you — always.",
  },
  {
    icon: "🗒️",
    title: "Notes & Links",
    desc: "Attach job links, notes and applied dates to every application card.",
  },
];

const STEPS = [
  {
    num: "01",
    title: "Create Account",
    desc: "Sign up in seconds, no credit card needed.",
  },
  {
    num: "02",
    title: "Add Applications",
    desc: "Log every job you apply to with one click.",
  },
  {
    num: "03",
    title: "Track Progress",
    desc: "Move cards across stages as you hear back.",
  },
  {
    num: "04",
    title: "Land the Job",
    desc: "Use analytics to optimise your strategy.",
  },
];

const STATS = [
  { value: "5", label: "Application Stages" },
  { value: "∞", label: "Applications Tracked" },
  { value: "100%", label: "Free to Use" },
  { value: "24/7", label: "Always Available" },
];

export default function Home() {
  const navigate = useNavigate();
  const heroRef = useRef(null);
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });
  const [visible, setVisible] = useState({});

  /* Parallax glow follows mouse */
  useEffect(() => {
    const handle = (e) => setMousePos({ x: e.clientX, y: e.clientY });
    window.addEventListener("mousemove", handle);
    return () => window.removeEventListener("mousemove", handle);
  }, []);

  /* Scroll-reveal */
  useEffect(() => {
    const els = document.querySelectorAll("[data-reveal]");
    const io = new IntersectionObserver(
      (entries) =>
        entries.forEach(
          (e) =>
            e.isIntersecting &&
            setVisible((v) => ({ ...v, [e.target.dataset.reveal]: true })),
        ),
      { threshold: 0.15 },
    );
    els.forEach((el) => io.observe(el));
    return () => io.disconnect();
  }, []);

  const reveal = (id) => (visible[id] ? "revealed" : "");

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
          --card:   #ffffff;
          --border: rgba(0,0,0,0.08);
        }

        html { scroll-behavior: smooth; }

        .home-page {
  font-family: 'DM Sans', sans-serif;
  background: var(--paper);
  color: var(--ink);
  overflow-x: hidden;
  min-height: 100vh;
}

        /* ── NAV ── */
        .nav {
          position: fixed; top: 0; left: 0; right: 0; z-index: 100;
          display: flex; align-items: center; justify-content: space-between;
          padding: 1.25rem 4rem;
          background: rgba(245,243,238,0.85);
          backdrop-filter: blur(14px);
          border-bottom: 1px solid var(--border);
        }
        .nav-logo {
          font-family: 'Syne', sans-serif;
          font-weight: 800; font-size: 1.1rem; letter-spacing: -0.02em;
          color: var(--ink);
          text-decoration: none;
          display: flex; align-items: center; gap: 0.5rem;
        }
        .nav-logo span { color: var(--accent); }
        .nav-actions { display: flex; gap: 0.75rem; align-items: center; }
        .btn-ghost {
          background: none; border: none; cursor: pointer;
          font-family: 'DM Sans', sans-serif; font-size: 0.9rem;
          color: var(--muted); padding: 0.5rem 1rem;
          border-radius: 6px; transition: color .2s;
        }
        .btn-ghost:hover { color: var(--ink); }
        .btn-primary {
          background: var(--ink); color: var(--paper);
          border: none; cursor: pointer; border-radius: 8px;
          font-family: 'DM Sans', sans-serif; font-size: 0.9rem; font-weight: 500;
          padding: 0.6rem 1.4rem;
          transition: background .2s, transform .15s;
        }
        .btn-primary:hover { background: var(--accent); transform: translateY(-1px); }

        /* ── HERO ── */
        .hero {
          min-height: 100vh;
          display: flex; flex-direction: column;
          align-items: center; justify-content: center;
          text-align: center;
          padding: 8rem 2rem 6rem;
          position: relative; overflow: hidden;
        }
        .hero-glow {
          position: fixed; width: 600px; height: 600px;
          border-radius: 50%;
          background: radial-gradient(circle, rgba(232,93,47,0.12) 0%, transparent 70%);
          pointer-events: none; z-index: 0;
          transform: translate(-50%, -50%);
          transition: left .1s, top .1s;
        }
        .hero-badge {
          display: inline-flex; align-items: center; gap: 0.4rem;
          background: var(--cream); border: 1px solid var(--border);
          border-radius: 100px; padding: 0.35rem 1rem;
          font-size: 0.78rem; color: var(--muted); margin-bottom: 2rem;
          animation: fadeUp .6s ease both;
        }
        .hero-badge-dot {
          width: 6px; height: 6px; border-radius: 50%;
          background: var(--accent); animation: pulse 2s infinite;
        }
        @keyframes pulse { 0%,100%{opacity:1} 50%{opacity:.4} }

        .hero h1 {
          font-family: 'Syne', sans-serif;
          font-size: clamp(3rem, 8vw, 7rem);
          font-weight: 800; line-height: 0.95;
          letter-spacing: -0.04em;
          color: var(--ink);
          animation: fadeUp .7s .1s ease both;
          position: relative; z-index: 1;
        }
        .hero h1 em {
          font-style: normal; color: var(--accent);
          position: relative; display: inline-block;
        }
        .hero h1 em::after {
          content: '';
          position: absolute; left: 0; bottom: 4px; right: 0;
          height: 3px; background: var(--gold); border-radius: 2px;
          transform: scaleX(0); transform-origin: left;
          animation: underlineGrow .8s .8s ease forwards;
        }
        @keyframes underlineGrow { to { transform: scaleX(1); } }

        .hero-sub {
          max-width: 520px; margin: 2rem auto 0;
          font-size: 1.1rem; line-height: 1.7; color: var(--muted);
          font-weight: 300;
          animation: fadeUp .7s .2s ease both;
          position: relative; z-index: 1;
        }
        .hero-cta {
          display: flex; gap: 1rem; justify-content: center;
          margin-top: 2.5rem; flex-wrap: wrap;
          animation: fadeUp .7s .3s ease both;
          position: relative; z-index: 1;
        }
        .btn-lg {
          padding: 0.9rem 2rem; border-radius: 10px;
          font-family: 'DM Sans', sans-serif; font-size: 1rem; font-weight: 500;
          cursor: pointer; border: none;
          transition: transform .2s, box-shadow .2s;
        }
        .btn-lg:hover { transform: translateY(-2px); box-shadow: 0 8px 24px rgba(0,0,0,.12); }
        .btn-dark { background: var(--ink); color: var(--paper); }
        .btn-dark:hover { background: var(--accent); }
        .btn-outline {
          background: transparent; color: var(--ink);
          border: 1.5px solid var(--border) !important;
        }
        .btn-outline:hover { border-color: var(--ink) !important; }

        /* hero kanban preview */
        .hero-preview {
          margin-top: 5rem; width: 100%; max-width: 900px;
          position: relative; z-index: 1;
          animation: fadeUp .8s .5s ease both;
        }
        .preview-bar {
          display: flex; gap: 0.5rem;
          background: var(--ink); border-radius: 14px 14px 0 0;
          padding: 0.75rem 1.2rem; align-items: center;
        }
        .preview-dot { width: 10px; height: 10px; border-radius: 50%; }
        .preview-dot:nth-child(1) { background: #ff5f57; }
        .preview-dot:nth-child(2) { background: #febc2e; }
        .preview-dot:nth-child(3) { background: #28c840; }
        .preview-title {
          flex: 1; text-align: center;
          color: rgba(255,255,255,.4); font-size: 0.75rem; letter-spacing: .05em;
        }
        .preview-board {
          background: var(--cream); border: 1px solid var(--border);
          border-top: none; border-radius: 0 0 14px 14px;
          padding: 1.5rem; display: flex; gap: 1rem; overflow: hidden;
        }
        .preview-col { flex: 1; min-width: 0; }
        .preview-col-head {
          font-size: 0.7rem; font-weight: 600; text-transform: uppercase;
          letter-spacing: .08em; color: var(--muted); margin-bottom: 0.75rem;
          display: flex; align-items: center; gap: 0.4rem;
        }
        .preview-col-dot { width: 6px; height: 6px; border-radius: 50%; }
        .preview-card {
          background: white; border-radius: 8px; padding: 0.75rem;
          margin-bottom: 0.5rem; border: 1px solid var(--border);
          font-size: 0.72rem;
        }
        .preview-card-co { font-weight: 600; color: var(--ink); margin-bottom: 0.2rem; }
        .preview-card-role { color: var(--muted); font-size: 0.68rem; }
        .preview-card-tag {
          display: inline-block; margin-top: 0.4rem;
          padding: 0.15rem 0.5rem; border-radius: 100px;
          font-size: 0.63rem; font-weight: 600;
        }

        /* ── STATS ── */
        .stats {
          background: var(--ink); color: var(--paper);
          padding: 4rem 4rem;
          display: grid; grid-template-columns: repeat(4,1fr); gap: 2rem;
        }
        .stat { text-align: center; }
        .stat-val {
          font-family: 'Syne', sans-serif;
          font-size: 3rem; font-weight: 800; color: var(--accent);
          line-height: 1;
        }
        .stat-label { font-size: 0.85rem; color: rgba(255,255,255,.5); margin-top: 0.5rem; }

        /* ── SECTIONS COMMON ── */
        section { padding: 7rem 4rem; }
        .section-label {
          font-size: 0.75rem; font-weight: 600; text-transform: uppercase;
          letter-spacing: .1em; color: var(--accent); margin-bottom: 1rem;
        }
        .section-title {
          font-family: 'Syne', sans-serif;
          font-size: clamp(2rem, 4vw, 3.2rem); font-weight: 800;
          line-height: 1.1; letter-spacing: -0.03em; color: var(--ink);
          max-width: 560px;
        }
        .section-title span { color: var(--accent); }

        /* ── FEATURES ── */
        .features { background: var(--paper); }
        .features-grid {
          display: grid; grid-template-columns: repeat(2, 1fr);
          gap: 1.5rem; margin-top: 4rem;
        }
        .feature-card {
          background: var(--card); border: 1px solid var(--border);
          border-radius: 16px; padding: 2rem;
          transition: transform .25s, box-shadow .25s;
          opacity: 0; transform: translateY(30px);
          transition: opacity .5s ease, transform .5s ease, box-shadow .25s;
        }
        .feature-card.revealed { opacity: 1; transform: translateY(0); }
        .feature-card:hover { transform: translateY(-4px); box-shadow: 0 12px 40px rgba(0,0,0,.08); }
        .feature-icon {
          width: 48px; height: 48px; border-radius: 12px;
          background: var(--cream); display: flex; align-items: center;
          justify-content: center; font-size: 1.4rem; margin-bottom: 1.25rem;
        }
        .feature-title {
          font-family: 'Syne', sans-serif;
          font-size: 1.1rem; font-weight: 700; margin-bottom: 0.5rem;
        }
        .feature-desc { color: var(--muted); font-size: 0.9rem; line-height: 1.6; }

        /* ── HOW IT WORKS ── */
        .how { background: var(--cream); }
        .steps {
          display: grid; grid-template-columns: repeat(4,1fr);
          gap: 2rem; margin-top: 4rem; position: relative;
        }
        .steps::before {
          content: ''; position: absolute; top: 28px; left: 10%; right: 10%;
          height: 1px; background: var(--border); z-index: 0;
        }
        .step {
          position: relative; z-index: 1; text-align: center;
          opacity: 0; transform: translateY(24px);
          transition: opacity .5s ease, transform .5s ease;
        }
        .step.revealed { opacity: 1; transform: translateY(0); }
        .step:nth-child(2) { transition-delay: .1s; }
        .step:nth-child(3) { transition-delay: .2s; }
        .step:nth-child(4) { transition-delay: .3s; }
        .step-num {
          font-family: 'Syne', sans-serif;
          width: 56px; height: 56px; border-radius: 50%;
          background: var(--ink); color: var(--paper);
          display: flex; align-items: center; justify-content: center;
          font-size: 0.9rem; font-weight: 800; margin: 0 auto 1.5rem;
        }
        .step-title {
          font-family: 'Syne', sans-serif;
          font-weight: 700; font-size: 1rem; margin-bottom: 0.5rem;
        }
        .step-desc { color: var(--muted); font-size: 0.85rem; line-height: 1.6; }

        /* ── CTA ── */
        .cta-section {
          background: var(--ink); color: var(--paper);
          text-align: center; padding: 8rem 4rem;
          position: relative; overflow: hidden;
        }
        .cta-section::before {
          content: '';
          position: absolute; inset: 0;
          background: radial-gradient(ellipse at 50% 0%, rgba(232,93,47,.25) 0%, transparent 60%);
        }
        .cta-section * { position: relative; z-index: 1; }
        .cta-title {
          font-family: 'Syne', sans-serif;
          font-size: clamp(2.5rem, 5vw, 5rem);
          font-weight: 800; line-height: 1; letter-spacing: -0.04em;
          margin-bottom: 1.5rem;
        }
        .cta-title span { color: var(--accent); }
        .cta-sub { color: rgba(255,255,255,.5); font-size: 1rem; margin-bottom: 2.5rem; }
        .btn-accent {
          background: var(--accent); color: white;
          padding: 1rem 2.5rem; border-radius: 10px;
          font-family: 'DM Sans', sans-serif; font-size: 1rem; font-weight: 600;
          border: none; cursor: pointer;
          transition: transform .2s, box-shadow .2s;
        }
        .btn-accent:hover { transform: translateY(-2px); box-shadow: 0 10px 30px rgba(232,93,47,.4); }

        /* ── FOOTER ── */
        footer {
          background: var(--ink); color: rgba(255,255,255,.3);
          text-align: center; padding: 2rem; font-size: 0.8rem;
          border-top: 1px solid rgba(255,255,255,.06);
        }
        footer span { color: var(--accent); }

        /* ── ANIMATIONS ── */
        @keyframes fadeUp {
          from { opacity: 0; transform: translateY(24px); }
          to   { opacity: 1; transform: translateY(0); }
        }

        /* ── RESPONSIVE ── */
        @media (max-width: 768px) {
          .nav { padding: 1rem 1.5rem; }
          section { padding: 5rem 1.5rem; }
          .stats { grid-template-columns: repeat(2,1fr); padding: 3rem 1.5rem; }
          .features-grid { grid-template-columns: 1fr; }
          .steps { grid-template-columns: repeat(2,1fr); }
          .steps::before { display: none; }
          .preview-board { display: none; }
          .hero { padding: 7rem 1.5rem 4rem; }
        }
      `}</style>

      {/* NAV */}
      <nav className="nav">
        <a className="nav-logo" href="/">
          Job<span>Track</span>
        </a>
        <div className="nav-actions">
          <button className="btn-ghost" onClick={() => navigate("/login")}>
            Sign in
          </button>
          <button className="btn-primary" onClick={() => navigate("/register")}>
            Get Started
          </button>
        </div>
      </nav>

      {/* HERO GLOW */}
      <div
        className="hero-glow"
        style={{ left: mousePos.x, top: mousePos.y }}
      />

      {/* HERO */}
      <section className="hero" ref={heroRef}>
        <div className="hero-badge">
          <div className="hero-badge-dot" />
          Free forever — no credit card required
        </div>

        <h1>
          Track every
          <br />
          <em>opportunity</em>
          <br />
          you deserve.
        </h1>

        <p className="hero-sub">
          The smartest way to organise your job search. Kanban boards,
          analytics, and notes — all in one place.
        </p>

        <div className="hero-cta">
          <button
            className="btn-lg btn-dark"
            onClick={() => navigate("/register")}
          >
            Start tracking free →
          </button>
          <button
            className="btn-lg btn-outline"
            onClick={() => navigate("/login")}
          >
            Sign in
          </button>
        </div>

        {/* Mini Kanban Preview */}
        <div className="hero-preview">
          <div className="preview-bar">
            <div className="preview-dot" />
            <div className="preview-dot" />
            <div className="preview-dot" />
            <div className="preview-title">jobtrack.app — dashboard</div>
          </div>
          <div className="preview-board">
            {[
              {
                label: "Applied",
                color: "#3b82f6",
                cards: [
                  { co: "Google", role: "Software Engineer" },
                  { co: "Stripe", role: "Backend Dev" },
                ],
              },
              {
                label: "Interview",
                color: "#f59e0b",
                cards: [{ co: "Anthropic", role: "ML Engineer" }],
              },
              {
                label: "Offer",
                color: "#10b981",
                cards: [{ co: "Vercel", role: "Frontend Dev" }],
              },
              {
                label: "Rejected",
                color: "#ef4444",
                cards: [{ co: "Meta", role: "iOS Engineer" }],
              },
            ].map((col) => (
              <div className="preview-col" key={col.label}>
                <div className="preview-col-head">
                  <div
                    className="preview-col-dot"
                    style={{ background: col.color }}
                  />
                  {col.label}
                </div>
                {col.cards.map((c) => (
                  <div className="preview-card" key={c.co}>
                    <div className="preview-card-co">{c.co}</div>
                    <div className="preview-card-role">{c.role}</div>
                    <span
                      className="preview-card-tag"
                      style={{ background: col.color + "20", color: col.color }}
                    >
                      {col.label}
                    </span>
                  </div>
                ))}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* STATS */}
      <div className="stats">
        {STATS.map((s) => (
          <div className="stat" key={s.label}>
            <div className="stat-val">{s.value}</div>
            <div className="stat-label">{s.label}</div>
          </div>
        ))}
      </div>

      {/* FEATURES */}
      <section className="features">
        <div className="section-label">Features</div>
        <h2 className="section-title">
          Everything you need to <span>land the role</span>
        </h2>
        <div className="features-grid">
          {FEATURES.map((f, i) => (
            <div
              className={`feature-card ${reveal("feat" + i)}`}
              data-reveal={`feat${i}`}
              key={f.title}
              style={{ transitionDelay: `${i * 0.1}s` }}
            >
              <div className="feature-icon">{f.icon}</div>
              <div className="feature-title">{f.title}</div>
              <div className="feature-desc">{f.desc}</div>
            </div>
          ))}
        </div>
      </section>

      {/* HOW IT WORKS */}
      <section className="how">
        <div className="section-label">How it works</div>
        <h2 className="section-title">
          Up and running in <span>4 steps</span>
        </h2>
        <div className="steps">
          {STEPS.map((s, i) => (
            <div
              className={`step ${reveal("step" + i)}`}
              data-reveal={`step${i}`}
              key={s.num}
            >
              <div className="step-num">{s.num}</div>
              <div className="step-title">{s.title}</div>
              <div className="step-desc">{s.desc}</div>
            </div>
          ))}
        </div>
      </section>

      {/* CTA */}
      <section className="cta-section">
        <h2 className="cta-title">
          Ready to take
          <br />
          <span>control?</span>
        </h2>
        <p className="cta-sub">
          Join job seekers who track smarter, not harder.
        </p>
        <button className="btn-accent" onClick={() => navigate("/register")}>
          Create free account →
        </button>
      </section>

      {/* FOOTER */}
      <footer>
        Built with <span>♥</span> · Smart Job Application Tracker ·{" "}
        {new Date().getFullYear()}
      </footer>
    </>
  );
}
