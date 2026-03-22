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
import { TrendingUp, Briefcase, CheckCircle, XCircle } from "lucide-react";

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
    style={{
      background: "white",
      borderRadius: "14px",
      padding: "20px 24px",
      boxShadow: "0 1px 4px rgba(0,0,0,0.07)",
      border: "1px solid #F1F5F9",
      display: "flex",
      alignItems: "center",
      gap: "16px",
    }}
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
      }}
    >
      {icon}
    </div>
    <div>
      <p
        style={{
          margin: "0 0 2px",
          fontSize: "13px",
          color: "#64748B",
          fontWeight: 500,
        }}
      >
        {label}
      </p>
      <p style={{ margin: 0, fontSize: "26px", fontWeight: 800, color }}>
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
      <div style={{ minHeight: "100vh", background: "#F8FAFC" }}>
        <Navbar />
        <div style={{ textAlign: "center", padding: "80px", color: "#94A3B8" }}>
          Loading analytics...
        </div>
      </div>
    );

  if (!data) return null;

  const breakdown = data.statusBreakdown || {};

  // Doughnut chart data
  const doughnutData = {
    labels: ["Applied", "Interview", "Offer", "Rejected"],
    datasets: [
      {
        data: [
          breakdown.APPLIED || 0,
          breakdown.INTERVIEW || 0,
          breakdown.OFFER || 0,
          breakdown.REJECTED || 0,
        ],
        backgroundColor: ["#6366F1", "#F97316", "#22C55E", "#F43F5E"],
        borderWidth: 0,
        hoverOffset: 6,
      },
    ],
  };

  // Bar chart data (weekly)
  const weekly = data.weeklyApplications || [];
  const barData = {
    labels: weekly.map((w) => `Week ${w.week}`),
    datasets: [
      {
        label: "Applications",
        data: weekly.map((w) => w.count),
        backgroundColor: "#818CF8",
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
        ticks: { stepSize: 1 },
        grid: { color: "#F1F5F9" },
      },
      x: { grid: { display: false } },
    },
  };

  return (
    <div style={{ minHeight: "100vh", background: "#F8FAFC" }}>
      <Navbar />

      <div style={{ padding: "24px", maxWidth: "1200px", margin: "0 auto" }}>
        {/* Header */}
        <div style={{ marginBottom: "24px" }}>
          <h1
            style={{
              margin: "0 0 4px",
              fontSize: "24px",
              fontWeight: 800,
              color: "#1E293B",
            }}
          >
            Analytics
          </h1>
          <p style={{ margin: 0, color: "#64748B", fontSize: "14px" }}>
            Your job search performance at a glance
          </p>
        </div>

        {/* Stat Cards */}
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit, minmax(220px, 1fr))",
            gap: "16px",
            marginBottom: "24px",
          }}
        >
          <StatCard
            icon={<Briefcase size={22} color="#6366F1" />}
            label="Total Applications"
            bg="#EEF2FF"
            value={data.totalApplications}
            color="#6366F1"
          />
          <StatCard
            icon={<TrendingUp size={22} color="#F97316" />}
            label="Interviews"
            bg="#FFF7ED"
            value={breakdown.INTERVIEW || 0}
            color="#F97316"
          />
          <StatCard
            icon={<CheckCircle size={22} color="#22C55E" />}
            label="Offers"
            bg="#F0FDF4"
            value={breakdown.OFFER || 0}
            color="#22C55E"
          />
          <StatCard
            icon={<TrendingUp size={22} color="#8B5CF6" />}
            label="Success Rate"
            bg="#F5F3FF"
            value={`${data.successRate?.toFixed(1)}%`}
            color="#8B5CF6"
          />
        </div>

        {/* Charts Row */}
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "1fr 2fr",
            gap: "20px",
          }}
        >
          {/* Doughnut */}
          <div
            style={{
              background: "white",
              borderRadius: "14px",
              padding: "24px",
              boxShadow: "0 1px 4px rgba(0,0,0,0.07)",
              border: "1px solid #F1F5F9",
            }}
          >
            <h2
              style={{
                margin: "0 0 20px",
                fontSize: "16px",
                fontWeight: 700,
                color: "#1E293B",
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
                    labels: { padding: 16, font: { size: 12 } },
                  },
                },
                cutout: "65%",
              }}
            />
          </div>

          {/* Bar Chart */}
          <div
            style={{
              background: "white",
              borderRadius: "14px",
              padding: "24px",
              boxShadow: "0 1px 4px rgba(0,0,0,0.07)",
              border: "1px solid #F1F5F9",
            }}
          >
            <h2
              style={{
                margin: "0 0 20px",
                fontSize: "16px",
                fontWeight: 700,
                color: "#1E293B",
              }}
            >
              Applications per week
            </h2>
            {weekly.length === 0 ? (
              <div
                style={{
                  textAlign: "center",
                  padding: "60px",
                  color: "#CBD5E1",
                }}
              >
                Not enough data yet
              </div>
            ) : (
              <Bar data={barData} options={barOptions} />
            )}
          </div>
        </div>

        {/* Status Detail Table */}
        <div
          style={{
            background: "white",
            borderRadius: "14px",
            padding: "24px",
            marginTop: "20px",
            boxShadow: "0 1px 4px rgba(0,0,0,0.07)",
            border: "1px solid #F1F5F9",
          }}
        >
          <h2
            style={{
              margin: "0 0 16px",
              fontSize: "16px",
              fontWeight: 700,
              color: "#1E293B",
            }}
          >
            Status summary
          </h2>
          <div
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(4, 1fr)",
              gap: "12px",
            }}
          >
            {[
              {
                key: "APPLIED",
                label: "Applied",
                color: "#6366F1",
                bg: "#EEF2FF",
              },
              {
                key: "INTERVIEW",
                label: "Interview",
                color: "#F97316",
                bg: "#FFF7ED",
              },
              { key: "OFFER", label: "Offer", color: "#22C55E", bg: "#F0FDF4" },
              {
                key: "REJECTED",
                label: "Rejected",
                color: "#F43F5E",
                bg: "#FFF1F2",
              },
            ].map((s) => (
              <div
                key={s.key}
                style={{
                  background: s.bg,
                  borderRadius: "10px",
                  padding: "16px",
                  textAlign: "center",
                }}
              >
                <div
                  style={{ fontSize: "28px", fontWeight: 800, color: s.color }}
                >
                  {breakdown[s.key] || 0}
                </div>
                <div
                  style={{
                    fontSize: "12px",
                    fontWeight: 600,
                    color: s.color,
                    marginTop: "4px",
                  }}
                >
                  {s.label}
                </div>
                <div
                  style={{
                    fontSize: "11px",
                    color: "#94A3B8",
                    marginTop: "2px",
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
      </div>
    </div>
  );
};

export default Analytics;
