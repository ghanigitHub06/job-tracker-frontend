import {
  ExternalLink,
  Pencil,
  Trash2,
  Calendar,
  Building2,
} from "lucide-react";

const STATUS_COLORS = {
  APPLIED: {
    bg: "#EEF2FF",
    border: "#818CF8",
    text: "#4338CA",
    dot: "#6366F1",
  },
  INTERVIEW: {
    bg: "#FFF7ED",
    border: "#FDBA74",
    text: "#C2410C",
    dot: "#F97316",
  },
  OFFER: { bg: "#F0FDF4", border: "#86EFAC", text: "#15803D", dot: "#22C55E" },
  REJECTED: {
    bg: "#FFF1F2",
    border: "#FDA4AF",
    text: "#BE123C",
    dot: "#F43F5E",
  },
};

const JobCard = ({ job, onEdit, onDelete }) => {
  const colors = STATUS_COLORS[job.status];

  return (
    <div
      style={{
        background: "white",
        borderRadius: "12px",
        padding: "16px",
        boxShadow: "0 1px 4px rgba(0,0,0,0.08)",
        border: "1px solid #F1F5F9",
        transition: "box-shadow 0.2s, transform 0.2s",
        cursor: "default",
      }}
      onMouseEnter={(e) => {
        e.currentTarget.style.boxShadow = "0 4px 16px rgba(0,0,0,0.12)";
        e.currentTarget.style.transform = "translateY(-2px)";
      }}
      onMouseLeave={(e) => {
        e.currentTarget.style.boxShadow = "0 1px 4px rgba(0,0,0,0.08)";
        e.currentTarget.style.transform = "translateY(0)";
      }}
    >
      {/* Company + Role */}
      <div style={{ marginBottom: "10px" }}>
        <div
          style={{
            display: "flex",
            alignItems: "center",
            gap: "6px",
            marginBottom: "4px",
          }}
        >
          <Building2 size={14} color="#94A3B8" />
          <span style={{ fontSize: "13px", color: "#64748B", fontWeight: 500 }}>
            {job.company}
          </span>
        </div>
        <h3
          style={{
            margin: 0,
            fontSize: "15px",
            fontWeight: 600,
            color: "#1E293B",
          }}
        >
          {job.role}
        </h3>
      </div>

      {/* Status Badge */}
      <div
        style={{
          display: "inline-flex",
          alignItems: "center",
          gap: "5px",
          background: colors.bg,
          border: `1px solid ${colors.border}`,
          color: colors.text,
          padding: "3px 10px",
          borderRadius: "20px",
          fontSize: "11px",
          fontWeight: 600,
          marginBottom: "10px",
        }}
      >
        <div
          style={{
            width: "6px",
            height: "6px",
            borderRadius: "50%",
            background: colors.dot,
          }}
        />
        {job.status}
      </div>

      {/* Applied Date */}
      {job.appliedDate && (
        <div
          style={{
            display: "flex",
            alignItems: "center",
            gap: "5px",
            fontSize: "12px",
            color: "#94A3B8",
            marginBottom: "10px",
          }}
        >
          <Calendar size={12} />
          {new Date(job.appliedDate).toLocaleDateString("en-IN", {
            day: "numeric",
            month: "short",
            year: "numeric",
          })}
        </div>
      )}

      {/* Notes */}
      {job.notes && (
        <p
          style={{
            margin: "0 0 12px 0",
            fontSize: "12px",
            color: "#64748B",
            lineHeight: 1.5,
            background: "#F8FAFC",
            padding: "8px",
            borderRadius: "6px",
            borderLeft: "3px solid #E2E8F0",
          }}
        >
          {job.notes}
        </p>
      )}

      {/* Actions */}
      <div style={{ display: "flex", gap: "8px", alignItems: "center" }}>
        {job.jobLink && (
          <a
            href={job.jobLink}
            target="_blank"
            rel="noopener noreferrer"
            style={{
              display: "flex",
              alignItems: "center",
              gap: "4px",
              fontSize: "12px",
              color: "#6366F1",
              textDecoration: "none",
              padding: "4px 8px",
              borderRadius: "6px",
              background: "#EEF2FF",
              fontWeight: 500,
            }}
          >
            <ExternalLink size={12} /> View Job
          </a>
        )}
        <div style={{ marginLeft: "auto", display: "flex", gap: "6px" }}>
          <button
            onClick={() => onEdit(job)}
            style={{
              background: "#F1F5F9",
              border: "none",
              borderRadius: "6px",
              padding: "6px",
              cursor: "pointer",
              display: "flex",
              alignItems: "center",
              color: "#475569",
            }}
          >
            <Pencil size={13} />
          </button>
          <button
            onClick={() => onDelete(job.id)}
            style={{
              background: "#FFF1F2",
              border: "none",
              borderRadius: "6px",
              padding: "6px",
              cursor: "pointer",
              display: "flex",
              alignItems: "center",
              color: "#F43F5E",
            }}
          >
            <Trash2 size={13} />
          </button>
        </div>
      </div>
    </div>
  );
};

export default JobCard;
