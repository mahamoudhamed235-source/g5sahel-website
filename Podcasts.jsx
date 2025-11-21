// src/pages/Podcasts.jsx
import React, { useState, useEffect, useRef } from "react";

function getSaved() {
  try {
    return JSON.parse(localStorage.getItem("podcasts_db")) || [];
  } catch {
    return [];
  }
}

export default function Podcasts() {
  const [episodes, setEpisodes] = useState(getSaved());
  const [title, setTitle] = useState("");
  const fileRef = useRef();

  useEffect(() => {
    localStorage.setItem("podcasts_db", JSON.stringify(episodes));
  }, [episodes]);

  function addLocal(e) {
    const f = e.target.files[0];
    if (!f) return;
    if (!f.type.startsWith("audio/")) return alert("Choose an audio file.");
    const url = URL.createObjectURL(f);
    const item = {
      id: Date.now().toString(),
      title: title || f.name,
      src: url,
      date: new Date().toLocaleString(),
    };
    setEpisodes((p) => [item, ...p]);
    setTitle("");
    fileRef.current.value = "";
  }

  function remove(id) {
    setEpisodes((p) => p.filter((ep) => ep.id !== id));
  }

  return (
    <div className="container" style={{ padding: 30 }}>
      <h1 style={{ color: "var(--gold-1)" }}>Podcasts</h1>
      <p style={{ color: "var(--muted)" }}>
        أضف حلقات بودكاست (ملفات صوتية أو روابط). الحلقات تحفظ محليًا الآن.
      </p>

      <div style={{ maxWidth: 720, display: "grid", gap: 12 }}>
        <input
          placeholder="Episode title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          style={{ padding: 10, borderRadius: 8 }}
        />
        <div style={{ display: "flex", gap: 8 }}>
          <input
            ref={fileRef}
            type="file"
            accept="audio/*"
            onChange={addLocal}
          />
          <button
            className="btn"
            onClick={() => fileRef.current && fileRef.current.click()}
          >
            Upload
          </button>
        </div>

        <div style={{ marginTop: 12 }}>
          {episodes.length === 0 && (
            <div style={{ color: "var(--muted)" }}>No episodes yet.</div>
          )}
          {episodes.map((ep) => (
            <div
              key={ep.id}
              className="card"
              style={{ padding: 12, marginTop: 8 }}
            >
              <div style={{ display: "flex", justifyContent: "space-between" }}>
                <strong style={{ color: "var(--gold-1)" }}>{ep.title}</strong>
                <small style={{ color: "var(--muted)" }}>{ep.date}</small>
              </div>

              <audio
                src={ep.src}
                controls
                style={{ width: "100%", marginTop: 8 }}
              />

              <div style={{ marginTop: 8, display: "flex", gap: 8 }}>
                <button
                  className="btn"
                  onClick={() => alert("Open episode details (placeholder)")}
                >
                  Details
                </button>
                <button
                  className="btn"
                  style={{ background: "rgba(255,50,50,0.12)" }}
                  onClick={() => remove(ep.id)}
                >
                  Remove
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
