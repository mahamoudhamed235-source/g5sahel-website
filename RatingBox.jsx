import React, { useState } from "react";

export default function RatingBox({ onSubmit }) {
  const [rating, setRating] = useState(0);
  const [hover, setHover] = useState(0);
  const [text, setText] = useState("");

  function handleSubmit() {
    if (!text.trim()) return;
    onSubmit({ rating, text, date: new Date().toLocaleString() });
    setText("");
    setRating(0);
  }

  return (
    <div
      style={{
        marginTop: 30,
        padding: 20,
        borderRadius: 14,
        background: "rgba(255,255,255,0.05)",
      }}
    >
      <h3 style={{ color: "var(--gold-1)", marginBottom: 10 }}>
        Rate & Review this Product
      </h3>

      {/* STARS */}
      <div style={{ marginBottom: 12 }}>
        {[1, 2, 3, 4, 5].map((star) => (
          <span
            key={star}
            onClick={() => setRating(star)}
            onMouseEnter={() => setHover(star)}
            onMouseLeave={() => setHover(0)}
            style={{
              cursor: "pointer",
              fontSize: 28,
              marginRight: 6,
              color:
                star <= (hover || rating)
                  ? "var(--gold-1)"
                  : "rgba(255,255,255,0.3)",
            }}
          >
            ★
          </span>
        ))}
      </div>

      {/* TEXTBOX */}
      <textarea
        value={text}
        onChange={(e) => setText(e.target.value)}
        placeholder="Write your review here..."
        style={{
          width: "100%",
          padding: 12,
          borderRadius: 10,
          background: "rgba(255,255,255,0.07)",
          border: "1px solid rgba(255,255,255,0.15)",
          color: "white",
          minHeight: 90,
        }}
      />

      {/* BUTTON */}
      <button
        onClick={handleSubmit}
        style={{
          marginTop: 12,
          padding: "10px 18px",
          borderRadius: 10,
          background: "var(--gold-1)",
          color: "#000",
          fontWeight: 700,
          cursor: "pointer",
          border: "none",
        }}
      >
        Publish Review
      </button>
    </div>
  );
}
