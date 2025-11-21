import React from "react";
import { Link } from "react-router-dom";

/* ---------------------------
   COUNTRIES DATABASE
---------------------------- */
const COUNTRIES = [
  {
    id: "chad",
    name: "Chad",
    region: "Sahel",
    flag: "https://flagcdn.com/w320/td.png",
    summary: "Rich in livestock, gum arabic, gold, and agriculture.",
  },
  {
    id: "niger",
    name: "Niger",
    region: "Sahel",
    flag: "https://flagcdn.com/w320/ne.png",
    summary: "Uranium, livestock, onions, and agricultural exports.",
  },
  {
    id: "mali",
    name: "Mali",
    region: "Sahel",
    flag: "https://flagcdn.com/w320/ml.png",
    summary: "Gold, cotton, livestock and agricultural production.",
  },
  {
    id: "mauritania",
    name: "Mauritania",
    region: "Sahel",
    flag: "https://flagcdn.com/w320/mr.png",
    summary: "Iron ore, fisheries, livestock and desert agriculture.",
  },
  {
    id: "burkina",
    name: "Burkina Faso",
    region: "Sahel",
    flag: "https://flagcdn.com/w320/bf.png",
    summary: "Gold, cotton, sesame, livestock and agriculture.",
  },

  /* NORTH AFRICA */
  {
    id: "egypt",
    name: "Egypt",
    region: "North Africa",
    flag: "https://flagcdn.com/w320/eg.png",
    summary: "Agriculture, textiles, petrochemicals, tourism.",
  },
  {
    id: "morocco",
    name: "Morocco",
    region: "North Africa",
    flag: "https://flagcdn.com/w320/ma.png",
    summary: "Phosphates, agriculture, automotive and aerospace.",
  },
  {
    id: "algeria",
    name: "Algeria",
    region: "North Africa",
    flag: "https://flagcdn.com/w320/dz.png",
    summary: "Natural gas, oil, agriculture, and minerals.",
  },
  {
    id: "tunisia",
    name: "Tunisia",
    region: "North Africa",
    flag: "https://flagcdn.com/w320/tn.png",
    summary: "Olive oil, electronics, agriculture and tourism.",
  },
  {
    id: "libya",
    name: "Libya",
    region: "North Africa",
    flag: "https://flagcdn.com/w320/ly.png",
    summary: "Oil, agriculture and minerals.",
  },
];

/* ---------------------------
   LIVE AFRICAN MARKET BLOCKS
---------------------------- */
const LIVE_MARKETS = [
  {
    id: "gum-arabic-live",
    title: "Live Gum Arabic Prices",
    description: "Daily prices for Hashab & Talha from Sahel markets.",
    color: "rgba(10, 36, 99, 0.45)",
  },
  {
    id: "sesame-live",
    title: "Sesame Seed Market",
    description: "Export-grade sesame (Sudan, Ethiopia, Nigeria).",
    color: "rgba(212, 175, 55, 0.20)",
  },
  {
    id: "gold-live",
    title: "Gold & Minerals",
    description: "Real-time gold dore & minerals trading.",
    color: "rgba(99, 10, 30, 0.45)",
  },
];

export default function Markets() {
  const regions = ["Sahel", "North Africa"];

  return (
    <div className="container" style={{ padding: "40px 0" }}>
      {/* TITLE */}
      <h1
        style={{
          fontSize: 34,
          fontWeight: 800,
          color: "var(--gold-1)",
          marginBottom: 10,
        }}
      >
        African Markets Overview
      </h1>

      <p style={{ color: "var(--muted)", marginBottom: 30 }}>
        Explore countries, live commodity prices, export opportunities and more.
      </p>

      {/* ---------------------------
          LIVE AFRICAN MARKET SECTION
      ---------------------------- */}
      <h2
        style={{
          fontSize: 26,
          fontWeight: 700,
          color: "var(--gold-2)",
          marginBottom: 16,
        }}
      >
        Live African Markets
      </h2>

      <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fit, minmax(260px, 1fr))",
          gap: 24,
          marginBottom: 40,
        }}
      >
        {LIVE_MARKETS.map((m) => (
          <Link
            key={m.id}
            to={`/markets/live`}
            className="card"
            style={{
              padding: 20,
              borderRadius: 16,
              background: m.color,
              textDecoration: "none",
            }}
          >
            <h3 style={{ color: "var(--gold-1)", fontWeight: 800 }}>
              {m.title}
            </h3>

            <p style={{ color: "var(--muted)", marginTop: 6 }}>
              {m.description}
            </p>

            <div
              style={{
                marginTop: 10,
                fontWeight: 600,
                color: "var(--gold-2)",
              }}
            >
              View →
            </div>
          </Link>
        ))}
      </div>

      {/* -------------------------------------------
          PREMIUM LIVE MARKET DASHBOARDS
      -------------------------------------------- */}
      <h2
        style={{
          fontSize: 26,
          fontWeight: 800,
          color: "var(--gold-1)",
          marginBottom: 16,
          marginTop: 40,
        }}
      >
        Live Market Dashboards
      </h2>

      <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fit, minmax(260px, 1fr))",
          gap: 24,
          marginBottom: 40,
        }}
      >
        {[
          {
            id: "live-agriculture",
            title: "Agriculture Live",
            desc: "Real-time prices for crops & raw agricultural goods.",
            icon: "🌾",
          },
          {
            id: "live-energy",
            title: "Energy Live",
            desc: "Oil, Gas, Diesel & fuel markets updated in real-time.",
            icon: "🛢️",
          },
          {
            id: "live-metals",
            title: "Metals Live",
            desc: "Gold, Silver and Industrial metals live dashboards.",
            icon: "⛏️",
          },
          {
            id: "live-livestock",
            title: "Livestock Live",
            desc: "Cattle, sheep and other livestock dynamic price index.",
            icon: "🐄",
          },
          {
            id: "live-forex",
            title: "Forex Live",
            desc: "Currencies across Africa: USD, EUR, XOF, EGP and more.",
            icon: "💱",
          },
        ].map((m) => (
          <Link
            key={m.id}
            to={
              m.id === "live-agriculture"
                ? "/markets/live-agriculture" // ⭐ التعديل الوحيد
                : `/markets/${m.id}`
            }
            className="card"
            style={{
              padding: 24,
              borderRadius: 20,
              background:
                "linear-gradient(135deg, rgba(20,20,20,0.65), rgba(212,175,55,0.12))",
              border: "1px solid rgba(212,175,55,0.15)",
              boxShadow: "0 8px 30px rgba(0,0,0,0.45)",
              backdropFilter: "blur(8px)",
              textDecoration: "none",
            }}
          >
            <div style={{ fontSize: 42, marginBottom: 12 }}>{m.icon}</div>

            <h3
              style={{
                color: "var(--gold-1)",
                fontWeight: 800,
                marginBottom: 8,
                fontSize: 20,
              }}
            >
              {m.title}
            </h3>

            <p style={{ color: "var(--muted)", fontSize: 14 }}>{m.desc}</p>

            <div
              style={{
                marginTop: 14,
                color: "var(--gold-2)",
                fontWeight: 600,
                fontSize: 15,
              }}
            >
              View Dashboard →
            </div>
          </Link>
        ))}
      </div>

      {/* ---------------------------
          COUNTRIES
      ---------------------------- */}
      {regions.map((region) => (
        <div key={region} style={{ marginBottom: 40 }}>
          <h2
            style={{
              fontSize: 26,
              fontWeight: 700,
              color: "var(--gold-2)",
              marginBottom: 16,
            }}
          >
            {region}
          </h2>

          <div
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(auto-fit, minmax(240px, 1fr))",
              gap: 24,
            }}
          >
            {COUNTRIES.filter((c) => c.region === region).map((country) => (
              <Link
                key={country.id}
                to={`/country/${country.id}`}
                className="card"
                style={{
                  padding: 20,
                  borderRadius: 16,
                  textDecoration: "none",
                  background:
                    "linear-gradient(135deg, rgba(10,36,99,0.4), rgba(212,175,55,0.08))",
                }}
              >
                <img
                  src={country.flag}
                  alt={country.name}
                  style={{
                    width: "100%",
                    height: 120,
                    objectFit: "cover",
                    borderRadius: 10,
                    marginBottom: 12,
                  }}
                />

                <h3
                  style={{
                    fontSize: 20,
                    fontWeight: 700,
                    color: "var(--gold-1)",
                  }}
                >
                  {country.name}
                </h3>

                <p style={{ color: "var(--muted)", fontSize: 14 }}>
                  {country.summary}
                </p>

                <div
                  style={{
                    marginTop: 12,
                    fontWeight: 600,
                    color: "var(--gold-2)",
                  }}
                >
                  View Details →
                </div>
              </Link>
            ))}
          </div>
        </div>
      ))}
    </div>
  );
}
