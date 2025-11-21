// src/pages/LiveMetals.jsx
import React, { useEffect, useState, useRef } from "react";
import { Link } from "react-router-dom";

/**
 * LiveMetals.jsx
 * شاشة أسعار المعادن (ذهب – فضة – نحاس – حديد) بمحاكاة بيانات
 * تصميم مطابق لمستوى LiveMarkets و LiveAgriculture
 */

const METALS = [
  { id: "gold", label: "Gold (USD/oz)", base: 1975 },
  { id: "silver", label: "Silver (USD/oz)", base: 24.5 },
  { id: "copper", label: "Copper (USD/ton)", base: 8220 },
  { id: "steel", label: "Steel (USD/ton)", base: 580 },
];

function randWalk(prev, rate = 0.003) {
  const change = (Math.random() - 0.5) * prev * rate;
  return Math.max(0.1, +(prev + change).toFixed(2));
}

function makeLine(values, width = 120, height = 36) {
  if (!values.length) return "";
  const max = Math.max(...values);
  const min = Math.min(...values);
  const range = max - min || 1;
  const step = width / (values.length - 1);

  return values
    .map((v, i) => {
      const x = i * step;
      const y = height - ((v - min) / range) * height;
      return `${i === 0 ? "M" : "L"} ${x} ${y}`;
    })
    .join(" ");
}

export default function LiveMetals() {
  const [data, setData] = useState(() =>
    METALS.reduce((acc, m) => {
      acc[m.id] = Array.from(
        { length: 24 },
        () => +(m.base + (Math.random() - 0.5) * m.base * 0.01).toFixed(2)
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

        METALS.forEach((m) => {
          const arr = [...next[m.id]];
          const last = arr[arr.length - 1];
          arr.push(randWalk(last));
          if (arr.length > 30) arr.shift();
          next[m.id] = arr;
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
      <h1
        style={{
          fontSize: 30,
          fontWeight: 800,
          color: "var(--gold-1)",
          marginBottom: 20,
        }}
      >
        Live Metals — Real-time Prices
      </h1>

      <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fit, minmax(260px, 1fr))",
          gap: 20,
        }}
      >
        {METALS.map((m) => {
          const vals = data[m.id];
          const last = vals[vals.length - 1];
          const prev = vals[vals.length - 2];
          const diff = +(last - prev).toFixed(2);
          const up = diff >= 0;

          return (
            <div
              key={m.id}
              className="card"
              style={{
                padding: 20,
                borderRadius: 16,
                background:
                  "linear-gradient(135deg, rgba(50,50,50,0.35), rgba(212,175,55,0.07))",
                boxShadow: "0 6px 22px rgba(0,0,0,0.28)",
              }}
            >
              <div style={{ marginBottom: 10 }}>
                <h3
                  style={{
                    color: "var(--gold-1)",
                    fontSize: 17,
                    fontWeight: 800,
                  }}
                >
                  {m.label}
                </h3>

                <div
                  style={{ color: "var(--muted)", fontSize: 13, marginTop: 4 }}
                >
                  Last update: {tick % 60}s
                </div>
              </div>

              <div style={{ fontSize: 20, fontWeight: 800, color: "#E6E9EE" }}>
                {last.toLocaleString()}
              </div>

              <div
                style={{
                  fontSize: 14,
                  marginTop: 5,
                  fontWeight: 700,
                  color: up ? "#4ddb6b" : "#ff6b6b",
                }}
              >
                {up ? "▲" : "▼"} {Math.abs(diff)}
              </div>

              <svg width="140" height="40" style={{ marginTop: 10 }}>
                <path
                  d={makeLine(vals, 140, 40)}
                  stroke={up ? "#4ddb6b" : "#ff6b6b"}
                  strokeWidth="2"
                  fill="none"
                />
              </svg>
            </div>
          );
        })}
      </div>

      <div style={{ marginTop: 20 }}>
        <Link
          to="/markets"
          style={{ color: "var(--gold-2)", textDecoration: "none" }}
        >
          ← Back to Markets
        </Link>
      </div>
    </div>
  );
}
