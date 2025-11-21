// src/pages/LiveLivestock.jsx
import React, { useEffect, useState, useRef } from "react";
import { Link } from "react-router-dom";

/* -----------------------------------------
   LIVESTOCK ITEMS (Simulated)
------------------------------------------ */
const LIVESTOCK = [
  { id: "cattle", label: "Cattle (USD / head)", base: 275 },
  { id: "sheep", label: "Sheep (USD / head)", base: 65 },
  { id: "goat", label: "Goat (USD / head)", base: 55 },
  { id: "camel", label: "Camel (USD / head)", base: 480 },
  { id: "chicken", label: "Chicken (USD / kg)", base: 2.2 },
  { id: "milk", label: "Milk (USD / liter)", base: 0.68 },
  { id: "eggs", label: "Eggs (USD / dozen)", base: 1.3 },
];

/* Random walk generator */
function randWalk(prev, volatility = 0.6) {
  const change = (Math.random() - 0.48) * volatility;
  return Math.max(0.0001, +(prev + change).toFixed(4));
}

/* Sparkline generator */
function makeSparklinePath(values, width = 120, height = 36) {
  if (!values?.length) return "";
  const max = Math.max(...values);
  const min = Math.min(...values);
  const step = width / (values.length - 1 || 1);
  return values
    .map((v, i) => {
      const x = i * step;
      const y = height - ((v - min) / (max - min || 1)) * height;
      return `${i === 0 ? "M" : "L"} ${x.toFixed(2)} ${y.toFixed(2)}`;
    })
    .join(" ");
}

export default function LiveLivestock() {
  const [data, setData] = useState(() =>
    LIVESTOCK.reduce((acc, item) => {
      acc[item.id] = Array.from(
        { length: 30 },
        () => +(item.base + (Math.random() - 0.5) * item.base * 0.03).toFixed(4)
      );
      return acc;
    }, {})
  );

  const [tick, setTick] = useState(0);
  const mounted = useRef(true);

  useEffect(() => {
    mounted.current = true;

    const interval = setInterval(() => {
      setData((prev) => {
        const next = { ...prev };
        LIVESTOCK.forEach((item) => {
          const arr = [...next[item.id]];
          const last = arr[arr.length - 1] ?? item.base;
          arr.push(randWalk(last, Math.max(0.2, Math.abs(last) * 0.003)));
          if (arr.length > 32) arr.shift();
          next[item.id] = arr;
        });
        return next;
      });
      setTick((t) => t + 1);
    }, 3000);

    return () => {
      mounted.current = false;
      clearInterval(interval);
    };
  }, []);

  return (
    <div className="container" style={{ padding: "32px 0 80px" }}>
      {/* TITLE */}
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          marginBottom: 20,
        }}
      >
        <h1 style={{ color: "var(--gold-1)", fontSize: 30, fontWeight: 800 }}>
          Livestock Market — Live Prices
        </h1>

        <div style={{ fontSize: 14 }}>
          <Link
            to="/markets"
            style={{ color: "var(--gold-2)", textDecoration: "none" }}
          >
            ← Back to Markets
          </Link>
        </div>
      </div>

      <p style={{ color: "var(--muted)", marginBottom: 26 }}>
        Real-time simulation for livestock prices across African and Sahel
        markets.
      </p>

      {/* GRID */}
      <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fit, minmax(260px, 1fr))",
          gap: 18,
        }}
      >
        {LIVESTOCK.map((item) => {
          const values = data[item.id] || [];
          const last = values[values.length - 1] ?? item.base;
          const prev = values[values.length - 2] ?? last;

          const diff = +(last - prev).toFixed(4);
          const diffPct = prev ? +((diff / prev) * 100).toFixed(2) : 0;
          const up = diff >= 0;

          return (
            <div
              key={item.id}
              className="card"
              style={{
                padding: 18,
                borderRadius: 16,
                background:
                  "linear-gradient(135deg, rgba(10,36,99,0.25), rgba(212,175,55,0.06))",
                boxShadow: "0 6px 20px rgba(0,0,0,0.3)",
              }}
            >
              <div style={{ marginBottom: 10 }}>
                <h3
                  style={{
                    color: "var(--gold-1)",
                    fontSize: 18,
                    fontWeight: 800,
                  }}
                >
                  {item.label}
                </h3>

                <div
                  style={{
                    fontSize: 12,
                    color: "var(--muted)",
                    marginTop: 4,
                  }}
                >
                  Last update: {tick % 60}s ago
                </div>
              </div>

              <div style={{ display: "flex", justifyContent: "space-between" }}>
                <div>
                  <div
                    style={{
                      fontSize: 20,
                      fontWeight: 800,
                      color: "#E6E9EE",
                    }}
                  >
                    {last.toLocaleString()}
                  </div>

                  <div
                    style={{
                      marginTop: 6,
                      color: up ? "#4ddb6b" : "#ff7b7b",
                      fontWeight: 700,
                      fontSize: 14,
                    }}
                  >
                    {up ? "▲" : "▼"} {Math.abs(diff)} ({Math.abs(diffPct)}%)
                  </div>
                </div>

                {/* Sparkline */}
                <svg width="130" height="40">
                  <path
                    d={makeSparklinePath(values, 130, 40)}
                    stroke={up ? "#4ddb6b" : "#ff7b7b"}
                    strokeWidth="2"
                    fill="none"
                    strokeLinecap="round"
                  />
                </svg>
              </div>
            </div>
          );
        })}
      </div>

      <div style={{ marginTop: 20, fontSize: 13, color: "var(--muted)" }}>
        These prices are simulated. When you're ready, I can plug in **real
        livestock market APIs**.
      </div>
    </div>
  );
}
