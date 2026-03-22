import { useState, useEffect } from "react";
import { Doughnut, Bar } from "react-chartjs-2";
import {
  Chart as ChartJS,
  ArcElement,
  Tooltip,
  Legend,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
} from "chart.js";
import API from "../api/axios";
import Navbar from "../components/Navbar";
import toast from "react-hot-toast";
import { TrendingUp, Briefcase, CheckCircle, Award } from "lucide-react";

ChartJS.register(
  ArcElement,
  Tooltip,
  Legend,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
);

const StatCard = ({ icon, label, value, color, bg }) => (
  <div
    className="card"
    style={{ display: "flex", alignItems: "center", gap: "1rem" }}
  >
    <div
      style={{
        width: "48px",
        height: "48px",
        borderRadius: "12px",
        background: bg,
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        flexShrink: 0,
      }}
    >
      {icon}
    </div>
    <div>
      <p
        style={{
          margin: "0 0 2px",
          fontSize: "0.78rem",
          color: "var(--muted)",
          fontWeight: 500,
          fontFamily: "'DM Sans', sans-serif",
        }}
      >
        {label}
      </p>
      <p
        style={{
          margin: 0,
          fontSize: "1.6rem",
          fontWeight: 800,
          color,
          fontFamily: "'Syne', sans-serif",
          lineHeight: 1,
        }}
      >
        {value}
      </p>
    </div>
  </div>
);

const Analytics = () => {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    API.get("/jobs/analytics")
      .then((res) => setData(res.data))
      .catch(() => toast.error("Failed to load analytics"))
      .finally(() => setLoading(false));
  }, []);

  if (loading)
    return (
      <div className="app-layout">
        <Navbar />
        <main className="app-main">
          <div
            style={{
              textAlign: "center",
              padding: "80px",
              color: "var(--muted)",
              fontFamily: "'DM Sans', sans-serif",
            }}
          >
            Loading analytics...
          </div>
        </main>
      </div>
    );

  if (!data) return null;

  const breakdown = data.statusBreakdown || {};

  const doughnutData = {
    labels: ["Wishlist", "Applied", "Interview", "Offer", "Rejected"],
    datasets: [
      {
        data: [
          breakdown.WISHLIST || 0,
          breakdown.APPLIED || 0,
          breakdown.INTERVIEW || 0,
          breakdown.OFFER || 0,
          breakdown.REJECTED || 0,
        ],
        backgroundColor: [
          "#7c3aed",
          "#1d4ed8",
          "#b45309",
          "#065f46",
          "#dc2626",
        ],
        borderWidth: 0,
        hoverOffset: 6,
      },
    ],
  };

  const weekly = data.weeklyApplications || [];
  const barData = {
    labels: weekly.map((w) => `Week ${w.week}`),
    datasets: [
      {
        label: "Applications",
        data: weekly.map((w) => w.count),
        backgroundColor: "#e85d2f",
        borderRadius: 6,
        borderSkipped: false,
      },
    ],
  };

  const barOptions = {
    responsive: true,
    plugins: { legend: { display: false } },
    scales: {
      y: {
        beginAtZero: true,
        ticks: {
          stepSize: 1,
          font: { family: "'DM Sans', sans-serif", size: 11 },
        },
        grid: { color: "var(--cream)" },
      },
      x: {
        grid: { display: false },
        ticks: { font: { family: "'DM Sans', sans-serif", size: 11 } },
      },
    },
  };

  const STATUS_COLORS = [
    { key: "WISHLIST", label: "Wishlist", color: "#7c3aed", bg: "#ede9fe" },
    { key: "APPLIED", label: "Applied", color: "#1d4ed8", bg: "#dbeafe" },
    { key: "INTERVIEW", label: "Interview", color: "#b45309", bg: "#fef3c7" },
    { key: "OFFER", label: "Offer", color: "#065f46", bg: "#d1fae5" },
    { key: "REJECTED", label: "Rejected", color: "#dc2626", bg: "#fee2e2" },
  ];

  return (
    <div className="app-layout">
      <Navbar />

      <main className="app-main">
        {/* Header */}
        <div className="page-header">
          <h1 className="page-title">Analytics</h1>
          <p className="page-subtitle">
            Your job search performance at a glance
          </p>
        </div>

        {/* Stat Cards */}
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit, minmax(200px, 1fr))",
            gap: "1rem",
            marginBottom: "1.5rem",
          }}
        >
          <StatCard
            icon={<Briefcase size={20} color="#e85d2f" />}
            label="Total Applications"
            bg="#fde8e0"
            value={data.totalApplications}
            color="var(--accent)"
          />
          <StatCard
            icon={<TrendingUp size={20} color="#b45309" />}
            label="Interviews"
            bg="#fef3c7"
            value={breakdown.INTERVIEW || 0}
            color="#b45309"
          />
          <StatCard
            icon={<CheckCircle size={20} color="#065f46" />}
            label="Offers"
            bg="#d1fae5"
            value={breakdown.OFFER || 0}
            color="#065f46"
          />
          <StatCard
            icon={<Award size={20} color="#7c3aed" />}
            label="Success Rate"
            bg="#ede9fe"
            value={`${data.successRate?.toFixed(1)}%`}
            color="#7c3aed"
          />
        </div>

        {/* Charts */}
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "1fr 2fr",
            gap: "1.25rem",
            marginBottom: "1.25rem",
          }}
        >
          {/* Doughnut */}
          <div className="card">
            <h2
              style={{
                fontFamily: "'Syne', sans-serif",
                fontSize: "1rem",
                fontWeight: 700,
                color: "var(--ink)",
                marginBottom: "1.25rem",
              }}
            >
              Status breakdown
            </h2>
            <Doughnut
              data={doughnutData}
              options={{
                plugins: {
                  legend: {
                    position: "bottom",
                    labels: {
                      padding: 14,
                      font: { family: "'DM Sans', sans-serif", size: 11 },
                    },
                  },
                },
                cutout: "65%",
              }}
            />
          </div>

          {/* Bar Chart */}
          <div className="card">
            <h2
              style={{
                fontFamily: "'Syne', sans-serif",
                fontSize: "1rem",
                fontWeight: 700,
                color: "var(--ink)",
                marginBottom: "1.25rem",
              }}
            >
              Applications per week
            </h2>
            {weekly.length === 0 ? (
              <div className="empty-state">
                <div className="empty-state-icon">📈</div>
                <div className="empty-state-title">Not enough data yet</div>
                <div className="empty-state-desc">
                  Add more applications to see weekly trends
                </div>
              </div>
            ) : (
              <Bar data={barData} options={barOptions} />
            )}
          </div>
        </div>

        {/* Status Summary */}
        <div className="card">
          <h2
            style={{
              fontFamily: "'Syne', sans-serif",
              fontSize: "1rem",
              fontWeight: 700,
              color: "var(--ink)",
              marginBottom: "1.25rem",
            }}
          >
            Status summary
          </h2>
          <div
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(5, 1fr)",
              gap: "0.75rem",
            }}
          >
            {STATUS_COLORS.map((s) => (
              <div
                key={s.key}
                style={{
                  background: s.bg,
                  borderRadius: "10px",
                  padding: "1.25rem",
                  textAlign: "center",
                }}
              >
                <div
                  style={{
                    fontSize: "1.8rem",
                    fontWeight: 800,
                    color: s.color,
                    fontFamily: "'Syne', sans-serif",
                    lineHeight: 1,
                  }}
                >
                  {breakdown[s.key] || 0}
                </div>
                <div
                  style={{
                    fontSize: "0.72rem",
                    fontWeight: 700,
                    color: s.color,
                    marginTop: "0.3rem",
                    textTransform: "uppercase",
                    letterSpacing: ".05em",
                  }}
                >
                  {s.label}
                </div>
                <div
                  style={{
                    fontSize: "0.7rem",
                    color: "var(--muted)",
                    marginTop: "0.2rem",
                  }}
                >
                  {data.totalApplications > 0
                    ? `${(((breakdown[s.key] || 0) / data.totalApplications) * 100).toFixed(0)}%`
                    : "0%"}
                </div>
              </div>
            ))}
          </div>
        </div>
      </main>
    </div>
  );
};

export default Analytics;
