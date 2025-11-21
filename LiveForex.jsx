// src/pages/LiveForex.jsx
import React, { useEffect, useState, useRef } from "react";
import { Link } from "react-router-dom";

const FOREX = [
  { id: "usd_xof", label: "USD / XOF (CFA)", base: 610 },
  { id: "usd_egp", label: "USD / EGP", base: 51.8 },
  { id: "usd_ngn", label: "USD / NGN", base: 1480 },
  { id: "eur_xof", label: "EUR / XOF", base: 655 },
  { id: "sar_egp", label: "SAR / EGP", base: 13.8 },
  { id: "usd_mad", label: "USD / MAD", base: 10.0 },
  { id: "usd_dzd", label: "USD / DZD", base: 134 },
];

function randWalk(prev, volatility = 0.6) {
  const change = (Math.random() - 0.48) * volatility;
  return Math.max(0.0001, +(prev + change).toFixed(4));
}

function makeSpark(values, width = 140, height = 40) {
  if (!values.length) return "";
  const max = Math.max(...values);
  const min = Math.min(...values);
  const scale = max - min || 1;
  const step = width / (values.length - 1);

  return values
    .map((v, i) => {
      const x = i * step;
      const y = height - ((v - min) / scale) * height;
      return `${i === 0 ? "M" : "L"}${x},${y}`;
    })
    .join(" ");
}

export default function LiveForex() {
  const [data, setData] = useState(() =>
    FOREX.reduce((acc, fx) => {
      acc[fx.id] = Array.from(
        { length: 28 },
        () => +(fx.base + (Math.random() - 0.5) * 0.03 * fx.base).toFixed(4)
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
        FOREX.forEach((fx) => {
          const arr = [...next[fx.id]];
          const last = arr[arr.length - 1];
          arr.push(randWalk(last));
          if (arr.length > 30) arr.shift();
          next[fx.id] = arr;
        });
        return next;
      });
      setTick((t) => t + 1);
    }, 2500);

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
          marginBottom: 20,
        }}
      >
        <h1 style={{ color: "var(--gold-1)", fontSize: 30 }}>
          Live Forex Dashboard
        </h1>

        <div style={{ color: "var(--muted)" }}>
          <Link to="/markets" style={{ color: "var(--gold-2)" }}>
            ← Back to Markets
          </Link>
        </div>
      </div>

      <p style={{ color: "var(--muted)", marginBottom: 20 }}>
        Real-time African FX index — simulated data for UI testing. Later we
        will plug real African FX APIs (XOF, EGP, MAD, NGN...).
      </p>

      <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fit, minmax(260px, 1fr))",
          gap: 20,
        }}
      >
        {FOREX.map((fx) => {
          const arr = data[fx.id];
          const last = arr[arr.length - 1];
          const prev = arr[arr.length - 2];
          const diff = last - prev;
          const up = diff >= 0;

          return (
            <div
              key={fx.id}
              className="card"
              style={{
                padding: 20,
                borderRadius: 16,
                background:
                  "linear-gradient(135deg, rgba(15,15,30,0.65), rgba(212,175,55,0.08))",
                boxShadow: "0 6px 20px rgba(0,0,0,0.4)",
              }}
            >
              <div style={{ display: "flex", justifyContent: "space-between" }}>
                <div>
                  <div
                    style={{
                      fontWeight: 800,
                      fontSize: 18,
                      color: "var(--gold-1)",
                    }}
                  >
                    {fx.label}
                  </div>
                  <div style={{ fontSize: 12, color: "var(--muted)" }}>
                    Updated: {tick % 60}s ago
                  </div>
                </div>

                <div style={{ textAlign: "right" }}>
                  <div style={{ fontSize: 20 }}>{last.toLocaleString()}</div>
                  <div
                    style={{
                      color: up ? "#4ddb6b" : "#ff7b7b",
                      fontWeight: 700,
                      fontSize: 14,
                    }}
                  >
                    {up ? "▲" : "▼"} {Math.abs(diff).toFixed(3)}
                  </div>
                </div>
              </div>

              <svg width="150" height="40" style={{ marginTop: 12 }}>
                <path
                  d={makeSpark(arr)}
                  fill="none"
                  stroke={up ? "#4ddb6b" : "#ff7b7b"}
                  strokeWidth="2"
                />
              </svg>
            </div>
          );
        })}
      </div>
    </div>
  );
}
