import { useState, useEffect } from "react";
import API from "../api/axios";
import JobCard from "../components/JobCard";
import JobModal from "../components/JobModal";
import Navbar from "../components/Navbar";
import toast from "react-hot-toast";
import { Plus, Search } from "lucide-react";

const COLUMNS = [
  { key: "WISHLIST", label: "Wishlist", color: "#7c3aed", bg: "#ede9fe" },
  { key: "APPLIED", label: "Applied", color: "#1d4ed8", bg: "#dbeafe" },
  { key: "INTERVIEW", label: "Interview", color: "#b45309", bg: "#fef3c7" },
  { key: "OFFER", label: "Offer", color: "#065f46", bg: "#d1fae5" },
  { key: "REJECTED", label: "Rejected", color: "#dc2626", bg: "#fee2e2" },
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

  const filtered = jobs.filter(
    (j) =>
      j.company.toLowerCase().includes(search.toLowerCase()) ||
      j.role.toLowerCase().includes(search.toLowerCase()),
  );

  const getColumnJobs = (status) => filtered.filter((j) => j.status === status);

  return (
    <div className="app-layout">
      <Navbar />

      <main className="app-main">
        {/* Header */}
        <div
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            marginBottom: "2rem",
            flexWrap: "wrap",
            gap: "1rem",
          }}
        >
          <div className="page-header" style={{ marginBottom: 0 }}>
            <h1 className="page-title">My Applications</h1>
            <p className="page-subtitle">
              {jobs.length} total application{jobs.length !== 1 ? "s" : ""}
            </p>
          </div>

          <div
            style={{ display: "flex", gap: "0.75rem", alignItems: "center" }}
          >
            {/* Search */}
            <div style={{ position: "relative" }}>
              <Search
                size={14}
                color="var(--muted)"
                style={{
                  position: "absolute",
                  left: "10px",
                  top: "50%",
                  transform: "translateY(-50%)",
                }}
              />
              <input
                className="input"
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                placeholder="Search company or role..."
                style={{ paddingLeft: "32px", width: "220px" }}
              />
            </div>

            {/* Add Button */}
            <button className="btn btn-primary" onClick={openAdd}>
              <Plus size={15} /> Add Application
            </button>
          </div>
        </div>

        {/* Kanban Board */}
        {loading ? (
          <div
            style={{
              textAlign: "center",
              padding: "60px",
              color: "var(--muted)",
              fontFamily: "'DM Sans', sans-serif",
            }}
          >
            Loading your applications...
          </div>
        ) : (
          <div
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(5, 1fr)",
              gap: "1rem",
              alignItems: "start",
            }}
          >
            {COLUMNS.map((col) => (
              <div
                key={col.key}
                className="card"
                style={{ padding: 0, overflow: "hidden" }}
              >
                {/* Column Header */}
                <div
                  style={{
                    padding: "12px 16px",
                    background: col.bg,
                    borderBottom: `2px solid ${col.color}`,
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "space-between",
                  }}
                >
                  <span
                    className="kanban-col-header"
                    style={{ color: col.color }}
                  >
                    {col.label}
                  </span>
                  <span
                    style={{
                      background: col.color,
                      color: "white",
                      borderRadius: "20px",
                      padding: "2px 8px",
                      fontSize: "11px",
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
                    <div className="empty-state">
                      <div className="empty-state-icon">📋</div>
                      <div className="empty-state-title">Empty</div>
                      <div className="empty-state-desc">
                        No applications here yet
                      </div>
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
      </main>

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
