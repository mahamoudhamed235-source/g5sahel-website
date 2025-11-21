import React from "react";

export default function StatsBar() {
  const stats = [
    { label: "Sahel Countries", value: "5", icon: "🌍" },
    { label: "North Africa", value: "7", icon: "🕌" },
    { label: "Economic Sectors", value: "14", icon: "📊" },
    { label: "Investment Opportunities", value: "82+", icon: "💼" },
    { label: "24/7 AI Support", value: "Yes", icon: "⚡" },
  ];

  return (
    <div
      style={{
        marginTop: 20,
        padding: "14px 0",
        background: "rgba(255,255,255,0.04)",
        borderBottom: "1px solid rgba(255,255,255,0.07)",
        borderTop: "1px solid rgba(255,255,255,0.07)",
        backdropFilter: "blur(10px)",
      }}
    >
      <div
        className="container"
        style={{
          display: "flex",
          justifyContent: "space-around",
          alignItems: "center",
          flexWrap: "wrap",
          gap: 14,
        }}
      >
        {stats.map((item, idx) => (
          <div
            key={idx}
            style={{
              textAlign: "center",
              minWidth: 110,
            }}
          >
            <div style={{ fontSize: 26 }}>{item.icon}</div>
            <div
              style={{
                color: "var(--gold-1)",
                fontSize: 22,
                fontWeight: 700,
                marginTop: 4,
              }}
            >
              {item.value}
            </div>
            <div
              style={{
                color: "var(--muted)",
                fontSize: 13,
                marginTop: -4,
              }}
            >
              {item.label}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}