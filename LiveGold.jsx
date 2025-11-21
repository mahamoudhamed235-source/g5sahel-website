import React from "react";
import { Link } from "react-router-dom";

/* GOLD LIVE DATA (demo – can be connected to API later) */
const GOLD_DATA = [
  {
    name: "Gold Spot (XAU/USD)",
    price: 2368.22,
    change: "+1.42%",
    history: [2320, 2335, 2310, 2340, 2368],
  },
  {
    name: "Gold Futures",
    price: 2375.1,
    change: "+0.88%",
    history: [2310, 2320, 2300, 2350, 2375],
  },
];

function Sparkline({ data }) {
  const max = Math.max(...data);
  const min = Math.min(...data);

  return (
    <svg width="100%" height="50">
      {data.map((val, i) => {
        const x = (i / (data.length - 1)) * 100;
        const y = 50 - ((val - min) / (max - min)) * 40;

        return (
          <circle
            key={i}
            cx={`${x}%`}
            cy={y}
            r="2"
            fill="#D4AF37"
            stroke="#D4AF37"
          />
        );
      })}
    </svg>
  );
}

export default function LiveGold() {
  return (
    <div className="container" style={{ padding: "40px 0" }}>
      {/* TITLE */}
      <h1
        style={{
          color: "var(--gold-1)",
          fontSize: 32,
          fontWeight: 800,
          marginBottom: 20,
        }}
      >
        Live Gold Market
      </h1>

      {/* GRID */}
      <div
        className="grid"
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fit, minmax(320px, 1fr))",
          gap: 24,
        }}
      >
        {GOLD_DATA.map((item, i) => (
          <div
            key={i}
            className="card"
            style={{
              padding: 20,
              background: "rgba(0,0,0,0.45)",
              borderRadius: 16,
              border: "1px solid rgba(212,175,55,0.35)",
            }}
          >
            <h3
              style={{
                color: "#E6E9EE",
                marginBottom: 6,
                fontWeight: 700,
              }}
            >
              {item.name}
            </h3>

            <div
              style={{
                color: "var(--gold-1)",
                fontSize: 28,
                fontWeight: 800,
              }}
            >
              {item.price.toLocaleString()} USD
            </div>

            <div
              style={{
                color: item.change.includes("+") ? "#00ff85" : "#ff5252",
                marginBottom: 10,
                fontWeight: 700,
              }}
            >
              {item.change}
            </div>

            <Sparkline data={item.history} />

            <Link
              to="/markets"
              style={{ color: "var(--gold-2)", fontWeight: 600 }}
            >
              ← Back to Markets
            </Link>
          </div>
        ))}
      </div>
    </div>
  );
}
