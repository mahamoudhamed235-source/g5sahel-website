import React, { useState } from "react";
import { useParams, Link } from "react-router-dom";
import {
  MdLocationPin,
  MdAccessTime,
  MdWork,
  MdOutlineAttachMoney,
  MdClose,
} from "react-icons/md";

export default function JobDetails() {
  const { id } = useParams();
  const [applyOpen, setApplyOpen] = useState(false); // 🔥 التحكم في النافذة المنبثقة

  // عينات بيانات
  const SAMPLE_JOBS = {
    1: {
      title: "Agriculture Project Manager",
      company: "Sahel AgroTech",
      location: "N'Djamena, Chad",
      pay: "$1,200 - $1,800",
      type: "Full Time",
      posted: "3 days ago",
      description: `
        We are seeking an experienced Agriculture Project Manager to lead community farming initiatives,
        coordinate field activities, and collaborate with international partners.
      `,
      skills: ["Project Management", "Leadership", "Agriculture", "Reporting"],
    },
    2: {
      title: "Solar Energy Technician",
      company: "EcoPower Africa",
      location: "Bamako, Mali",
      pay: "$900 - $1,300",
      type: "Contract",
      posted: "1 week ago",
      description: `
        We are hiring a Solar Energy Technician to assist in the installation
        and maintenance of solar panels across the Sahel region.
      `,
      skills: ["Solar Systems", "Safety Standards", "Technical Skills"],
    },
    3: {
      title: "Quality Control – Gum Arabic",
      company: "DesertChem Export",
      location: "Khartoum, Sudan",
      pay: "$1,000 - $1,500",
      type: "Full Time",
      posted: "2 days ago",
      description: `
        We are looking for a Quality Control Specialist for gum arabic production lines.
        You will evaluate product purity, moisture levels, and supervise drying & grinding processes.
      `,
      skills: ["Quality Assurance", "Lab Testing", "ISO Standards"],
    },
  };

  const job = SAMPLE_JOBS[id];

  if (!job) {
    return (
      <div className="container" style={{ padding: 50 }}>
        <h2 style={{ color: "var(--gold-1)" }}>Job not found</h2>
        <Link to="/jobs" style={{ color: "var(--gold-2)" }}>
          ← Back to Jobs
        </Link>
      </div>
    );
  }

  return (
    <>
      <div className="container" style={{ padding: "30px 0 80px" }}>
        {/* TITLE BANNER */}
        <div
          style={{
            width: "100%",
            height: 260,
            borderRadius: 14,
            background:
              "linear-gradient(135deg, rgba(10,36,99,0.5), rgba(212,175,55,0.3))",
            marginBottom: 30,
            display: "flex",
            alignItems: "flex-end",
            padding: 24,
          }}
        >
          <h1
            style={{
              fontSize: 34,
              color: "#fff",
              fontWeight: 800,
            }}
          >
            {job.title}
          </h1>
        </div>

        {/* JOB INFO */}
        <h2 style={{ color: "var(--gold-1)" }}>{job.company}</h2>
        <div
          style={{ display: "flex", flexWrap: "wrap", gap: 20, marginTop: 10 }}
        >
          <div style={{ display: "flex", alignItems: "center", gap: 6 }}>
            <MdLocationPin size={20} /> {job.location}
          </div>
          <div style={{ display: "flex", alignItems: "center", gap: 6 }}>
            <MdOutlineAttachMoney size={20} /> {job.pay}
          </div>
          <div style={{ display: "flex", alignItems: "center", gap: 6 }}>
            <MdWork size={20} /> {job.type}
          </div>
          <div style={{ display: "flex", alignItems: "center", gap: 6 }}>
            <MdAccessTime size={20} /> Posted: {job.posted}
          </div>
        </div>

        {/* APPLY NOW BUTTON */}
        <button
          onClick={() => setApplyOpen(true)}
          style={{
            marginTop: 24,
            background: "var(--gold-1)",
            padding: "12px 24px",
            borderRadius: 8,
            border: "none",
            cursor: "pointer",
            fontSize: 16,
            fontWeight: 700,
          }}
        >
          Apply Now
        </button>

        {/* DESCRIPTION */}
        <section style={{ marginTop: 40 }}>
          <h3 style={{ color: "var(--gold-1)" }}>Job Description</h3>
          <p
            style={{ marginTop: 10, color: "#DDE3EC", whiteSpace: "pre-line" }}
          >
            {job.description}
          </p>
        </section>

        {/* SKILLS */}
        <section style={{ marginTop: 40 }}>
          <h3 style={{ color: "var(--gold-1)" }}>Required Skills</h3>
          <div
            style={{
              marginTop: 12,
              display: "flex",
              gap: 10,
              flexWrap: "wrap",
            }}
          >
            {job.skills.map((sk) => (
              <span
                key={sk}
                style={{
                  padding: "6px 14px",
                  borderRadius: 20,
                  background: "rgba(255,255,255,0.07)",
                  border: "1px solid rgba(212,175,55,0.25)",
                }}
              >
                {sk}
              </span>
            ))}
          </div>
        </section>

        {/* MAP */}
        <section style={{ marginTop: 40 }}>
          <h3 style={{ color: "var(--gold-1)" }}>Location Map</h3>
          <div
            style={{
              width: "100%",
              height: 240,
              background: "rgba(255,255,255,0.07)",
              borderRadius: 12,
              marginTop: 14,
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            Google Map (Coming Soon)
          </div>
        </section>

        {/* RELATED JOBS */}
        <section style={{ marginTop: 50 }}>
          <h3 style={{ color: "var(--gold-1)" }}>Similar Jobs</h3>

          <div style={{ display: "grid", gap: 20, marginTop: 16 }}>
            {Object.entries(SAMPLE_JOBS)
              .filter(([jid]) => jid !== id)
              .map(([jid, item]) => (
                <Link
                  key={jid}
                  to={`/jobs/${jid}`}
                  style={{
                    background: "rgba(255,255,255,0.05)",
                    padding: 16,
                    borderRadius: 12,
                    border: "1px solid rgba(255,255,255,0.1)",
                    color: "#fff",
                  }}
                >
                  <div style={{ fontSize: 18, fontWeight: 700 }}>
                    {item.title}
                  </div>
                  <div style={{ opacity: 0.7 }}>{item.company}</div>
                </Link>
              ))}
          </div>
        </section>
      </div>

      {/* APPLY NOW MODAL */}
      {applyOpen && (
        <div
          style={{
            position: "fixed",
            top: 0,
            left: 0,
            width: "100%",
            height: "100%",
            backdropFilter: "blur(6px)",
            background: "rgba(0,0,0,0.65)",
            display: "flex",
            justifyContent: "center",
            alignItems: "flex-start",
            paddingTop: 60,
            zIndex: 2000,
          }}
        >
          <div
            style={{
              width: "90%",
              maxWidth: 600,
              background: "rgba(255,255,255,0.06)",
              border: "1px solid rgba(255,255,255,0.15)",
              borderRadius: 14,
              padding: 24,
            }}
          >
            <div style={{ display: "flex", justifyContent: "space-between" }}>
              <h2 style={{ color: "var(--gold-1)" }}>Apply for {job.title}</h2>

              <MdClose
                size={26}
                style={{ cursor: "pointer" }}
                onClick={() => setApplyOpen(false)}
              />
            </div>

            {/* FORM */}
            <div style={{ marginTop: 20, display: "grid", gap: 14 }}>
              <input
                placeholder="Full Name"
                style={{
                  padding: 12,
                  borderRadius: 8,
                  border: "1px solid rgba(255,255,255,0.1)",
                  background: "rgba(255,255,255,0.08)",
                  color: "#fff",
                }}
              />

              <input
                placeholder="Email Address"
                style={{
                  padding: 12,
                  borderRadius: 8,
                  border: "1px solid rgba(255,255,255,0.1)",
                  background: "rgba(255,255,255,0.08)",
                  color: "#fff",
                }}
              />

              <input
                placeholder="Phone Number"
                style={{
                  padding: 12,
                  borderRadius: 8,
                  border: "1px solid rgba(255,255,255,0.1)",
                  background: "rgba(255,255,255,0.08)",
                  color: "#fff",
                }}
              />

              <textarea
                placeholder="Cover Letter"
                rows="4"
                style={{
                  padding: 12,
                  borderRadius: 8,
                  border: "1px solid rgba(255,255,255,0.1)",
                  background: "rgba(255,255,255,0.08)",
                  color: "#fff",
                  resize: "none",
                }}
              />

              <button
                style={{
                  marginTop: 10,
                  background: "var(--gold-1)",
                  color: "#000",
                  padding: "12px 20px",
                  borderRadius: 8,
                  border: "none",
                  fontSize: 16,
                  fontWeight: 700,
                  cursor: "pointer",
                }}
              >
                Submit Application
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
