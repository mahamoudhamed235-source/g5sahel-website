// src/components/CommentSection.jsx
import React, { useState, useEffect } from "react";

export default function CommentSection({ keyId }) {
  const storageKey = `comments_${keyId}`;
  const [comments, setComments] = useState(() => {
    try {
      return JSON.parse(localStorage.getItem(storageKey)) || [];
    } catch {
      return [];
    }
  });
  const [text, setText] = useState("");

  useEffect(() => {
    localStorage.setItem(storageKey, JSON.stringify(comments));
  }, [comments, storageKey]);

  function submit() {
    if (!text.trim()) return;
    const c = {
      id: Date.now(),
      text,
      date: new Date().toLocaleString(),
    };
    setComments((p) => [c, ...p]);
    setText("");
  }

  return (
    <div style={{ marginTop: 14 }}>
      <h4 style={{ color: "var(--gold-1)" }}>Comments</h4>
      <textarea
        value={text}
        onChange={(e) => setText(e.target.value)}
        placeholder="Write a comment..."
        style={{ width: "100%", height: 80, padding: 10, borderRadius: 8 }}
      />
      <div style={{ display: "flex", gap: 8, marginTop: 8 }}>
        <button className="cta" onClick={submit}>
          Publish
        </button>
      </div>

      <div style={{ marginTop: 12 }}>
        {comments.map((c) => (
          <div
            key={c.id}
            className="card"
            style={{ padding: 10, marginTop: 8 }}
          >
            <div style={{ fontSize: 13, color: "var(--muted)" }}>{c.date}</div>
            <div style={{ marginTop: 6 }}>{c.text}</div>
          </div>
        ))}
      </div>
    </div>
  );
}
