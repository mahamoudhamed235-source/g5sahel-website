// src/pages/LiveMarkets.jsx
import React, { useEffect, useState, useRef } from "react";
import { Link } from "react-router-dom";

/**
 * LiveMarkets.jsx
 * شاشة أسعار حية تجريبية (محاكاة بيانات) + *sparkline* بسيط SVG
 * تعمل دون مكتبات خارجية — جاهزة للاستبدال بالـ API لاحقًا.
 */

const SYMBOLS = [
  { id: "gold", label: "Gold (USD/oz)", base: 1975 },
  { id: "brent", label: "Oil Brent (USD)", base: 84.2 },
  { id: "wheat", label: "Wheat (USD/ton)", base: 345 },
  { id: "usd_xof", label: "USD / XOF", base: 650 },
  { id: "egp_usd", label: "EGP / USD", base: 0.0204 * 1 }, // sample
  { id: "gum", label: "Gum Arabic (USD/kg)", base: 3.4 },
  { id: "cattle", label: "Cattle (USD/head)", base: 280 },
];

function randWalk(prev, volatility = 0.5) {
  // simple random walk around prev
  const change = (Math.random() - 0.48) * volatility; // bias tiny
  return Math.max(0.0001, +(prev + change).toFixed(4));
}

function makeSparklinePath(values, width = 120, height = 36) {
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

export default function LiveMarkets() {
  // state: map symbolId -> array of recent values
  const [data, setData] = useState(() =>
    SYMBOLS.reduce((acc, s) => {
      acc[s.id] = Array.from(
        { length: 28 },
        () => +(s.base + (Math.random() - 0.5) * (s.base * 0.02)).toFixed(4)
      );
      return acc;
    }, {})
  );

  // used to force small animation color flashes
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
          arr.push(randWalk(last, Math.max(0.15, Math.abs(last) * 0.002)));
          if (arr.length > 30) arr.shift();
          next[s.id] = arr;
        });
        return next;
      });
      setTick((t) => t + 1);
    }, 3000); // كل 3 ثواني تحديث (يمكن تغييره)

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
          Live Markets — Real-time Snapshot
        </h1>
        <div style={{ fontSize: 14, color: "var(--muted)" }}>
          <Link
            to="/marketplace"
            style={{ color: "var(--gold-2)", textDecoration: "none" }}
          >
            → Marketplace
          </Link>
          <span style={{ marginLeft: 12 }}>•</span>
          <Link
            to="/markets"
            style={{
              color: "var(--gold-2)",
              marginLeft: 12,
              textDecoration: "none",
            }}
          >
            Markets Overview
          </Link>
        </div>
      </div>

      <p style={{ color: "var(--muted)", marginBottom: 20 }}>
        This is a simulated live feed to design and test the UI. Later we will
        connect real APIs for live pricing, exchanges and commodities.
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
                  "linear-gradient(135deg, rgba(10,36,99,0.25), rgba(212,175,55,0.04))",
                boxShadow: "0 6px 22px rgba(0,0,0,0.28)",
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
                {/* sparkline SVG */}
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

                {/* mini-actions */}
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
                    onClick={() => alert(`${s.label} — Open details`)}
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
                      alert(`Follow ${s.label} — will add to watchlist`)
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
        Tip: these are simulated values. I can now connect a real API (exchange
        / commodity feed) and convert this page to live data — تريد أن أوصّلها
        لبيانات حقيقية الآن؟
      </div>
    </div>
  );
}
