import { useState, useEffect } from "react";
import API from "../api/axios";
import JobCard from "../components/JobCard";
import JobModal from "../components/JobModal";
import Navbar from "../components/Navbar";
import toast from "react-hot-toast";
import { Plus, Search } from "lucide-react";

const COLUMNS = [
  { key: "APPLIED", label: "Applied", color: "#6366F1", bg: "#EEF2FF" },
  { key: "INTERVIEW", label: "Interview", color: "#F97316", bg: "#FFF7ED" },
  { key: "OFFER", label: "Offer", color: "#22C55E", bg: "#F0FDF4" },
  { key: "REJECTED", label: "Rejected", color: "#F43F5E", bg: "#FFF1F2" },
];

const Dashboard = () => {
  const [jobs, setJobs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [modalOpen, setModalOpen] = useState(false);
  const [editJob, setEditJob] = useState(null);
  const [search, setSearch] = useState("");

  const fetchJobs = async () => {
    try {
      const { data } = await API.get("/jobs");
      setJobs(data);
    } catch {
      toast.error("Failed to load jobs");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchJobs();
  }, []);

  const handleSave = async (form) => {
    try {
      if (editJob) {
        await API.put(`/jobs/${editJob.id}`, form);
        toast.success("Application updated!");
      } else {
        await API.post("/jobs", form);
        toast.success("Application added!");
      }
      setModalOpen(false);
      setEditJob(null);
      fetchJobs();
    } catch (err) {
      toast.error(err.response?.data?.error || "Something went wrong");
    }
  };

  const handleDelete = async (id) => {
    if (!window.confirm("Delete this application?")) return;
    try {
      await API.delete(`/jobs/${id}`);
      toast.success("Deleted successfully");
      fetchJobs();
    } catch {
      toast.error("Failed to delete");
    }
  };

  const handleEdit = (job) => {
    setEditJob(job);
    setModalOpen(true);
  };

  const openAdd = () => {
    setEditJob(null);
    setModalOpen(true);
  };

  // Filter by search
  const filtered = jobs.filter(
    (j) =>
      j.company.toLowerCase().includes(search.toLowerCase()) ||
      j.role.toLowerCase().includes(search.toLowerCase()),
  );

  const getColumnJobs = (status) => filtered.filter((j) => j.status === status);

  return (
    <div style={{ minHeight: "100vh", background: "#F8FAFC" }}>
      <Navbar />

      <div style={{ padding: "24px", maxWidth: "1400px", margin: "0 auto" }}>
        {/* Header */}
        <div
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            marginBottom: "24px",
            flexWrap: "wrap",
            gap: "12px",
          }}
        >
          <div>
            <h1
              style={{
                margin: "0 0 4px",
                fontSize: "24px",
                fontWeight: 800,
                color: "#1E293B",
              }}
            >
              My Applications
            </h1>
            <p style={{ margin: 0, color: "#64748B", fontSize: "14px" }}>
              {jobs.length} total application{jobs.length !== 1 ? "s" : ""}
            </p>
          </div>

          <div style={{ display: "flex", gap: "12px", alignItems: "center" }}>
            {/* Search */}
            <div style={{ position: "relative" }}>
              <Search
                size={15}
                color="#94A3B8"
                style={{
                  position: "absolute",
                  left: "10px",
                  top: "50%",
                  transform: "translateY(-50%)",
                }}
              />
              <input
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                placeholder="Search company or role..."
                style={{
                  padding: "9px 12px 9px 32px",
                  borderRadius: "8px",
                  border: "1px solid #E2E8F0",
                  fontSize: "13px",
                  width: "220px",
                  background: "white",
                  outline: "none",
                }}
              />
            </div>

            {/* Add Button */}
            <button
              onClick={openAdd}
              style={{
                display: "flex",
                alignItems: "center",
                gap: "6px",
                padding: "10px 18px",
                borderRadius: "10px",
                border: "none",
                background: "linear-gradient(135deg, #667eea 0%, #764ba2 100%)",
                color: "white",
                fontSize: "14px",
                fontWeight: 600,
                cursor: "pointer",
              }}
            >
              <Plus size={16} /> Add Application
            </button>
          </div>
        </div>

        {/* Kanban Board */}
        {loading ? (
          <div
            style={{ textAlign: "center", padding: "60px", color: "#94A3B8" }}
          >
            Loading your applications...
          </div>
        ) : (
          <div
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(4, 1fr)",
              gap: "16px",
              alignItems: "start",
            }}
          >
            {COLUMNS.map((col) => (
              <div
                key={col.key}
                style={{
                  background: "white",
                  borderRadius: "14px",
                  border: "1px solid #F1F5F9",
                  overflow: "hidden",
                  boxShadow: "0 1px 4px rgba(0,0,0,0.06)",
                }}
              >
                {/* Column Header */}
                <div
                  style={{
                    padding: "14px 16px",
                    background: col.bg,
                    borderBottom: `2px solid ${col.color}`,
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "space-between",
                  }}
                >
                  <span
                    style={{
                      fontWeight: 700,
                      color: col.color,
                      fontSize: "13px",
                      letterSpacing: "0.5px",
                    }}
                  >
                    {col.label.toUpperCase()}
                  </span>
                  <span
                    style={{
                      background: col.color,
                      color: "white",
                      borderRadius: "20px",
                      padding: "2px 10px",
                      fontSize: "12px",
                      fontWeight: 700,
                    }}
                  >
                    {getColumnJobs(col.key).length}
                  </span>
                </div>

                {/* Cards */}
                <div
                  style={{
                    padding: "12px",
                    display: "flex",
                    flexDirection: "column",
                    gap: "10px",
                    minHeight: "200px",
                  }}
                >
                  {getColumnJobs(col.key).length === 0 ? (
                    <div
                      style={{
                        textAlign: "center",
                        padding: "40px 16px",
                        color: "#CBD5E1",
                        fontSize: "13px",
                      }}
                    >
                      No applications
                    </div>
                  ) : (
                    getColumnJobs(col.key).map((job) => (
                      <JobCard
                        key={job.id}
                        job={job}
                        onEdit={handleEdit}
                        onDelete={handleDelete}
                      />
                    ))
                  )}
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      <JobModal
        isOpen={modalOpen}
        onClose={() => {
          setModalOpen(false);
          setEditJob(null);
        }}
        onSave={handleSave}
        editJob={editJob}
      />
    </div>
  );
};

export default Dashboard;
