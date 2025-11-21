// src/pages/LiveEnergy.jsx
import React, { useEffect, useState, useRef } from "react";
import { Link } from "react-router-dom";

/**
 * LiveEnergy.jsx
 * Simulated live energy market dashboard (Brent, WTI, Diesel, Gas)
 * Same style as LiveMarkets so the look & feel is consistent.
 */

const SYMBOLS = [
  { id: "brent", label: "Brent Crude (USD/barrel)", base: 84.2 },
  { id: "wti", label: "WTI Crude (USD/barrel)", base: 80.6 },
  { id: "diesel", label: "Diesel (USD/ton)", base: 720 },
  { id: "fuel_oil", label: "Fuel Oil (USD/ton)", base: 430 },
  { id: "natgas", label: "Natural Gas (USD/MMBtu)", base: 3.9 },
];

function randWalk(prev, volatility = 0.6) {
  const change = (Math.random() - 0.5) * volatility;
  return Math.max(0.0001, +(prev + change).toFixed(4));
}

function makeSparklinePath(values, width = 140, height = 40) {
  if (!values || values.length === 0) return "";
  const max = Math.max(...values);
  const min = Math.min(...values);
  const range = max - min || 1;
  const step = width / (values.length - 1 || 1);
  return values
    .map((v, i) => {
      const x = i * step;
      const y = height - ((v - min) / range) * height;
      return `${i === 0 ? "M" : "L"} ${x.toFixed(2)} ${y.toFixed(2)}`;
    })
    .join(" ");
}

export default function LiveEnergy() {
  const [data, setData] = useState(() =>
    SYMBOLS.reduce((acc, s) => {
      acc[s.id] = Array.from(
        { length: 30 },
        () => +(s.base + (Math.random() - 0.5) * (s.base * 0.02)).toFixed(4)
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
        SYMBOLS.forEach((s) => {
          const arr = [...next[s.id]];
          const last = arr[arr.length - 1] ?? s.base;
          arr.push(randWalk(last, Math.max(0.2, Math.abs(last) * 0.0018)));
          if (arr.length > 40) arr.shift();
          next[s.id] = arr;
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
    <div className="container" style={{ padding: "30px 0 80px" }}>
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          marginBottom: 18,
        }}
      >
        <h1 style={{ color: "var(--gold-1)", fontSize: 28, margin: 0 }}>
          Live Energy Markets
        </h1>

        <div style={{ fontSize: 14, color: "var(--muted)" }}>
          <Link
            to="/markets"
            style={{ color: "var(--gold-2)", textDecoration: "none" }}
          >
            ← Markets Overview
          </Link>
        </div>
      </div>

      <p style={{ color: "var(--muted)", marginBottom: 20 }}>
        Simulated energy feed for UI testing. Can be linked to a real energy
        data API (EIA, ICE, etc.).
      </p>

      <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fit, minmax(260px, 1fr))",
          gap: 16,
        }}
      >
        {SYMBOLS.map((s) => {
          const vals = data[s.id] || [];
          const last = vals[vals.length - 1] ?? s.base;
          const prev = vals[vals.length - 2] ?? last;
          const diff = +(last - prev).toFixed(4);
          const diffPct = prev ? +((diff / prev) * 100).toFixed(2) : 0;
          const up = diff >= 0;

          return (
            <div
              key={s.id}
              className="card"
              style={{
                padding: 16,
                borderRadius: 12,
                minHeight: 120,
                display: "flex",
                flexDirection: "column",
                justifyContent: "space-between",
                background:
                  "linear-gradient(135deg, rgba(5,30,70,0.28), rgba(212,175,55,0.04))",
                boxShadow: "0 6px 20px rgba(0,0,0,0.25)",
              }}
            >
              <div
                style={{
                  display: "flex",
                  justifyContent: "space-between",
                  alignItems: "flex-start",
                }}
              >
                <div>
                  <div
                    style={{
                      fontWeight: 800,
                      color: "var(--gold-1)",
                      fontSize: 15,
                    }}
                  >
                    {s.label}
                  </div>
                  <div
                    style={{
                      color: "var(--muted)",
                      marginTop: 6,
                      fontSize: 12,
                    }}
                  >
                    Last update: {tick % 60}s
                  </div>
                </div>

                <div style={{ textAlign: "right" }}>
                  <div
                    style={{ fontSize: 18, fontWeight: 800, color: "#E6E9EE" }}
                  >
                    {typeof last === "number" ? last.toLocaleString() : last}
                  </div>
                  <div
                    style={{
                      marginTop: 6,
                      fontSize: 13,
                      color: up ? "#4ddb6b" : "#ff7b7b",
                      fontWeight: 700,
                    }}
                  >
                    {up ? "▲ " : "▼ "}
                    {Math.abs(diff).toLocaleString()} ({Math.abs(diffPct)}%)
                  </div>
                </div>
              </div>

              <div
                style={{
                  marginTop: 12,
                  display: "flex",
                  alignItems: "center",
                  gap: 12,
                }}
              >
                <svg
                  width="140"
                  height="40"
                  viewBox={`0 0 140 40`}
                  style={{ background: "transparent" }}
                >
                  <path
                    d={makeSparklinePath(vals, 140, 40)}
                    fill="none"
                    stroke={up ? "#4ddb6b" : "#ff7b7b"}
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    opacity="0.95"
                  />
                </svg>

                <div
                  style={{
                    marginLeft: "auto",
                    display: "flex",
                    flexDirection: "column",
                    gap: 8,
                  }}
                >
                  <button
                    className="btn"
                    style={{ padding: "6px 10px" }}
                    onClick={() => alert(`${s.label} — تفاصيل`)}
                  >
                    View
                  </button>
                  <button
                    className="btn"
                    style={{
                      padding: "6px 10px",
                      background: "rgba(255,255,255,0.04)",
                    }}
                    onClick={() =>
                      alert(`Watch ${s.label} — added to watchlist`)
                    }
                  >
                    Watch
                  </button>
                </div>
              </div>
            </div>
          );
        })}
      </div>

      <div style={{ marginTop: 22, color: "var(--muted)", fontSize: 13 }}>
        Note: simulated values. When you're ready I will connect a real feed
        (EIA/ICE/API) and map the symbols to live endpoints.
      </div>
    </div>
  );
}
