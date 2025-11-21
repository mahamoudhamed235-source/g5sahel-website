// src/pages/CountriesDirectory.jsx
import React, { useState, useMemo } from "react";
import { Link } from "react-router-dom";

/**
 * CountriesDirectory.jsx
 * صفحة دليل الدول - قائمة دول أفريقيا كاملة مع بحث وفلتر
 *
 * ضع هذا الملف في: src/pages/CountriesDirectory.jsx
 * ربط مقترح للعرض الكامل للدولة: /country/{code} أو /country/{slug}
 */

const AFRICA = [
  { name: "Algeria", code: "DZ", region: "North", flag: "🇩🇿" },
  { name: "Angola", code: "AO", region: "South", flag: "🇦🇴" },
  { name: "Benin", code: "BJ", region: "West", flag: "🇧🇯" },
  { name: "Botswana", code: "BW", region: "South", flag: "🇧🇼" },
  { name: "Burkina Faso", code: "BF", region: "West", flag: "🇧🇫" },
  { name: "Burundi", code: "BI", region: "East", flag: "🇧🇮" },
  { name: "Cabo Verde", code: "CV", region: "West", flag: "🇨🇻" },
  { name: "Cameroon", code: "CM", region: "Central", flag: "🇨🇲" },
  {
    name: "Central African Republic",
    code: "CF",
    region: "Central",
    flag: "🇨🇫",
  },
  { name: "Chad", code: "TD", region: "Sahel", flag: "🇹🇩" },
  { name: "Comoros", code: "KM", region: "East", flag: "🇰🇲" },
  { name: "Congo (Brazzaville)", code: "CG", region: "Central", flag: "🇨🇬" },
  { name: "Congo (Kinshasa)", code: "CD", region: "Central", flag: "🇨🇩" },
  { name: "Côte d'Ivoire", code: "CI", region: "West", flag: "🇨🇮" },
  { name: "Djibouti", code: "DJ", region: "East", flag: "🇩🇯" },
  { name: "Egypt", code: "EG", region: "North", flag: "🇪🇬" },
  { name: "Equatorial Guinea", code: "GQ", region: "Central", flag: "🇬🇶" },
  { name: "Eritrea", code: "ER", region: "East", flag: "🇪🇷" },
  { name: "Eswatini", code: "SZ", region: "South", flag: "🇸🇿" },
  { name: "Ethiopia", code: "ET", region: "East", flag: "🇪🇹" },
  { name: "Gabon", code: "GA", region: "Central", flag: "🇬🇦" },
  { name: "Gambia", code: "GM", region: "West", flag: "🇬🇲" },
  { name: "Ghana", code: "GH", region: "West", flag: "🇬🇭" },
  { name: "Guinea", code: "GN", region: "West", flag: "🇬🇳" },
  { name: "Guinea-Bissau", code: "GW", region: "West", flag: "🇬🇼" },
  { name: "Kenya", code: "KE", region: "East", flag: "🇰🇪" },
  { name: "Lesotho", code: "LS", region: "South", flag: "🇱🇸" },
  { name: "Liberia", code: "LR", region: "West", flag: "🇱🇷" },
  { name: "Libya", code: "LY", region: "North", flag: "🇱🇾" },
  { name: "Madagascar", code: "MG", region: "East", flag: "🇲🇬" },
  { name: "Malawi", code: "MW", region: "South", flag: "🇲🇼" },
  { name: "Mali", code: "ML", region: "Sahel", flag: "🇲🇱" },
  { name: "Mauritania", code: "MR", region: "Sahel", flag: "🇲🇷" },
  { name: "Mauritius", code: "MU", region: "East", flag: "🇲🇺" },
  { name: "Morocco", code: "MA", region: "North", flag: "🇲🇦" },
  { name: "Mozambique", code: "MZ", region: "South", flag: "🇲🇿" },
  { name: "Namibia", code: "NA", region: "South", flag: "🇳🇦" },
  { name: "Niger", code: "NE", region: "Sahel", flag: "🇳🇪" },
  { name: "Nigeria", code: "NG", region: "West", flag: "🇳🇬" },
  { name: "Rwanda", code: "RW", region: "East", flag: "🇷🇼" },
  { name: "Sao Tome & Principe", code: "ST", region: "West", flag: "🇸🇹" },
  { name: "Senegal", code: "SN", region: "Sahel", flag: "🇸🇳" },
  { name: "Seychelles", code: "SC", region: "East", flag: "🇸🇨" },
  { name: "Sierra Leone", code: "SL", region: "West", flag: "🇸🇱" },
  { name: "Somalia", code: "SO", region: "East", flag: "🇸🇴" },
  { name: "South Africa", code: "ZA", region: "South", flag: "🇿🇦" },
  { name: "South Sudan", code: "SS", region: "East", flag: "🇸🇸" },
  { name: "Sudan", code: "SD", region: "Sahel", flag: "🇸🇩" },
  { name: "Tanzania", code: "TZ", region: "East", flag: "🇹🇿" },
  { name: "Togo", code: "TG", region: "West", flag: "🇹🇬" },
  { name: "Tunisia", code: "TN", region: "North", flag: "🇹🇳" },
  { name: "Uganda", code: "UG", region: "East", flag: "🇺🇬" },
  { name: "Zambia", code: "ZM", region: "South", flag: "🇿🇲" },
  { name: "Zimbabwe", code: "ZW", region: "South", flag: "🇿🇼" },
];

const REGIONS = ["All", "North", "Sahel", "West", "East", "Central", "South"];

function slugify(text = "") {
  return text
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/(^-|-$)/g, "");
}

export default function CountriesDirectory() {
  const [q, setQ] = useState("");
  const [region, setRegion] = useState("All");

  const filtered = useMemo(() => {
    const term = q.trim().toLowerCase();
    return AFRICA.filter((c) => {
      if (region !== "All" && c.region !== region) return false;
      if (!term) return true;
      return (
        c.name.toLowerCase().includes(term) ||
        c.code.toLowerCase() === term ||
        c.region.toLowerCase().includes(term)
      );
    });
  }, [q, region]);

  return (
    <div className="container" style={{ padding: "36px 0 80px" }}>
      <header style={{ marginBottom: 18 }}>
        <h1 style={{ fontSize: 32, color: "var(--gold-1)", margin: 0 }}>
          Africa — Countries Directory
        </h1>
        <p style={{ color: "var(--muted)", marginTop: 8 }}>
          Browse all African countries, filter by region, or search by name /
          code.
        </p>
      </header>

      {/* search + filters */}
      <div
        style={{
          display: "flex",
          gap: 12,
          alignItems: "center",
          marginBottom: 22,
          flexWrap: "wrap",
        }}
      >
        <input
          value={q}
          onChange={(e) => setQ(e.target.value)}
          placeholder="Search country, code (eg. ML), or region..."
          style={{
            flex: "1 1 360px",
            padding: 12,
            borderRadius: 10,
            border: "1px solid rgba(255,255,255,0.08)",
            background: "rgba(255,255,255,0.02)",
            color: "#fff",
          }}
        />

        <select
          value={region}
          onChange={(e) => setRegion(e.target.value)}
          style={{
            padding: 12,
            borderRadius: 10,
            border: "1px solid rgba(255,255,255,0.08)",
            background: "rgba(255,255,255,0.02)",
            color: "#fff",
            minWidth: 160,
          }}
        >
          {REGIONS.map((r) => (
            <option key={r} value={r}>
              {r}
            </option>
          ))}
        </select>

        <div
          style={{
            padding: "10px 14px",
            borderRadius: 10,
            background: "rgba(255,255,255,0.03)",
            color: "var(--gold-2)",
            fontWeight: 700,
            minWidth: 130,
            textAlign: "center",
          }}
        >
          {filtered.length} country(ies)
        </div>
      </div>

      {/* grid */}
      <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fill, minmax(240px, 1fr))",
          gap: 18,
        }}
      >
        {filtered.map((c) => (
          <Link
            key={c.code}
            to={`/country/${slugify(c.code || c.name)}`}
            className="card"
            style={{
              padding: 16,
              borderRadius: 12,
              textDecoration: "none",
              color: "inherit",
              display: "flex",
              alignItems: "center",
              gap: 12,
              boxShadow: "0 8px 30px rgba(0,0,0,0.45)",
              background:
                "linear-gradient(135deg, rgba(10,36,99,0.22), rgba(212,175,55,0.06))",
            }}
          >
            <div
              style={{
                fontSize: 34,
                width: 64,
                height: 64,
                borderRadius: 12,
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                background: "rgba(255,255,255,0.03)",
              }}
              aria-hidden
            >
              <span style={{ fontSize: 28 }}>{c.flag}</span>
            </div>

            <div style={{ flex: 1 }}>
              <div
                style={{
                  display: "flex",
                  alignItems: "baseline",
                  gap: 8,
                  justifyContent: "space-between",
                }}
              >
                <div style={{ fontWeight: 800, color: "var(--gold-1)" }}>
                  {c.name}
                </div>
                <div style={{ color: "var(--muted)" }}>{c.code}</div>
              </div>

              <div style={{ color: "var(--muted)", marginTop: 6 }}>
                Region: <strong style={{ color: "#E6E9EE" }}>{c.region}</strong>
              </div>
            </div>
          </Link>
        ))}
      </div>

      {/* footer hint */}
      <div style={{ marginTop: 28, color: "var(--muted)" }}>
        Tip: Click a country to open its detailed page. (You can create a route
        `/country/:code` and re-use this code to fetch country-specific markets,
        news and investment opportunities.)
      </div>
    </div>
  );
}
