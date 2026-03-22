import { useState, useEffect } from "react";
import { X } from "lucide-react";

const STATUSES = ["APPLIED", "INTERVIEW", "OFFER", "REJECTED"];

const INPUT_STYLE = {
  width: "100%",
  padding: "10px 12px",
  borderRadius: "8px",
  border: "1px solid #E2E8F0",
  fontSize: "14px",
  color: "#1E293B",
  background: "#F8FAFC",
  boxSizing: "border-box",
  outline: "none",
  transition: "border-color 0.2s",
};

const LABEL_STYLE = {
  display: "block",
  fontSize: "13px",
  fontWeight: 600,
  color: "#475569",
  marginBottom: "6px",
};

const JobModal = ({ isOpen, onClose, onSave, editJob }) => {
  const [form, setForm] = useState({
    company: "",
    role: "",
    status: "APPLIED",
    jobLink: "",
    notes: "",
    appliedDate: "",
  });
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (editJob) {
      setForm({
        company: editJob.company || "",
        role: editJob.role || "",
        status: editJob.status || "APPLIED",
        jobLink: editJob.jobLink || "",
        notes: editJob.notes || "",
        appliedDate: editJob.appliedDate || "",
      });
    } else {
      setForm({
        company: "",
        role: "",
        status: "APPLIED",
        jobLink: "",
        notes: "",
        appliedDate: "",
      });
    }
  }, [editJob, isOpen]);

  if (!isOpen) return null;

  const handleChange = (e) =>
    setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    await onSave(form);
    setLoading(false);
  };

  return (
    <div
      style={{
        position: "fixed",
        inset: 0,
        background: "rgba(0,0,0,0.45)",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        zIndex: 1000,
        padding: "16px",
      }}
    >
      <div
        style={{
          background: "white",
          borderRadius: "16px",
          padding: "28px",
          width: "100%",
          maxWidth: "500px",
          boxShadow: "0 20px 60px rgba(0,0,0,0.2)",
          maxHeight: "90vh",
          overflowY: "auto",
        }}
      >
        {/* Header */}
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            marginBottom: "24px",
          }}
        >
          <h2
            style={{
              margin: 0,
              fontSize: "18px",
              fontWeight: 700,
              color: "#1E293B",
            }}
          >
            {editJob ? "Edit Application" : "Add New Application"}
          </h2>
          <button
            onClick={onClose}
            style={{
              background: "#F1F5F9",
              border: "none",
              borderRadius: "8px",
              padding: "8px",
              cursor: "pointer",
              display: "flex",
              alignItems: "center",
            }}
          >
            <X size={16} color="#64748B" />
          </button>
        </div>

        <form
          onSubmit={handleSubmit}
          style={{ display: "flex", flexDirection: "column", gap: "16px" }}
        >
          {/* Company */}
          <div>
            <label style={LABEL_STYLE}>Company *</label>
            <input
              name="company"
              value={form.company}
              onChange={handleChange}
              placeholder="e.g. Google"
              required
              style={INPUT_STYLE}
              onFocus={(e) => (e.target.style.borderColor = "#6366F1")}
              onBlur={(e) => (e.target.style.borderColor = "#E2E8F0")}
            />
          </div>

          {/* Role */}
          <div>
            <label style={LABEL_STYLE}>Role *</label>
            <input
              name="role"
              value={form.role}
              onChange={handleChange}
              placeholder="e.g. Backend Engineer"
              required
              style={INPUT_STYLE}
              onFocus={(e) => (e.target.style.borderColor = "#6366F1")}
              onBlur={(e) => (e.target.style.borderColor = "#E2E8F0")}
            />
          </div>

          {/* Status */}
          <div>
            <label style={LABEL_STYLE}>Status *</label>
            <select
              name="status"
              value={form.status}
              onChange={handleChange}
              style={{ ...INPUT_STYLE, cursor: "pointer" }}
            >
              {STATUSES.map((s) => (
                <option key={s} value={s}>
                  {s}
                </option>
              ))}
            </select>
          </div>

          {/* Applied Date */}
          <div>
            <label style={LABEL_STYLE}>Applied Date</label>
            <input
              type="date"
              name="appliedDate"
              value={form.appliedDate}
              onChange={handleChange}
              style={INPUT_STYLE}
              onFocus={(e) => (e.target.style.borderColor = "#6366F1")}
              onBlur={(e) => (e.target.style.borderColor = "#E2E8F0")}
            />
          </div>

          {/* Job Link */}
          <div>
            <label style={LABEL_STYLE}>Job Link</label>
            <input
              name="jobLink"
              value={form.jobLink}
              onChange={handleChange}
              placeholder="https://..."
              style={INPUT_STYLE}
              onFocus={(e) => (e.target.style.borderColor = "#6366F1")}
              onBlur={(e) => (e.target.style.borderColor = "#E2E8F0")}
            />
          </div>

          {/* Notes */}
          <div>
            <label style={LABEL_STYLE}>Notes</label>
            <textarea
              name="notes"
              value={form.notes}
              onChange={handleChange}
              placeholder="Any notes about this application..."
              rows={3}
              style={{ ...INPUT_STYLE, resize: "vertical" }}
              onFocus={(e) => (e.target.style.borderColor = "#6366F1")}
              onBlur={(e) => (e.target.style.borderColor = "#E2E8F0")}
            />
          </div>

          {/* Buttons */}
          <div style={{ display: "flex", gap: "12px", marginTop: "8px" }}>
            <button
              type="button"
              onClick={onClose}
              style={{
                flex: 1,
                padding: "11px",
                borderRadius: "8px",
                border: "1px solid #E2E8F0",
                background: "white",
                color: "#64748B",
                fontSize: "14px",
                fontWeight: 600,
                cursor: "pointer",
              }}
            >
              Cancel
            </button>
            <button
              type="submit"
              disabled={loading}
              style={{
                flex: 2,
                padding: "11px",
                borderRadius: "8px",
                border: "none",
                background: "linear-gradient(135deg, #667eea 0%, #764ba2 100%)",
                color: "white",
                fontSize: "14px",
                fontWeight: 600,
                cursor: loading ? "not-allowed" : "pointer",
                opacity: loading ? 0.7 : 1,
              }}
            >
              {loading
                ? "Saving..."
                : editJob
                  ? "Update Application"
                  : "Add Application"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default JobModal;
