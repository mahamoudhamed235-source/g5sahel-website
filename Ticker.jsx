import React from "react";

export default function Ticker({ items }) {
  return (
    <div
      style={{
        width: "100%",
        overflow: "hidden",
        whiteSpace: "nowrap",
        background: "rgba(0,0,0,0.35)",
        backdropFilter: "blur(8px)",
        borderBottom: "1px solid rgba(255,255,255,0.08)",
        padding: "8px 0",
        marginBottom: 0,
      }}
    >
      <div
        style={{
          display: "inline-block",
          animation: "ticker 40s linear infinite",
        }}
      >
        {items.map((text, index) => {
          const isPositive = text.includes("+");
          const isNegative = text.includes("-");
          const color = isPositive
            ? "#4CAF50"
            : isNegative
            ? "#FF5252"
            : "var(--gold-1)";

          return (
            <span
              key={index}
              style={{
                display: "inline-block",
                marginRight: 40,
                fontSize: 15,
                color,
                fontWeight: 600,
              }}
            >
              {text}
            </span>
          );
        })}
      </div>

      {/* Animation CSS inside JS */}
      <style>
        {`
          @keyframes ticker {
            0% { transform: translateX(0); }
            100% { transform: translateX(-100%); }
          }
        `}
      </style>
    </div>
  );
}
