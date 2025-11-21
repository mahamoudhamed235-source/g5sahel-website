// src/pages/Jobs.jsx
import React, { useState, useMemo, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import {
  MdSearch,
  MdWork,
  MdLocationOn,
  MdBookmarkBorder,
  MdBookmark,
} from "react-icons/md";

const BG = "#071226";
const GOLD = "#D4AF37";
const NEUTRAL = "#E6E9EE";
const MUTED = "rgba(230,233,238,0.7)";
const CARD = "rgba(255,255,255,0.03)";

// ---- MOCK DATA (قابل للتوسيع لاحقاً عبر API) ----
const MOCK_JOBS = [
  {
    id: 1,
    title: "Project Manager — Irrigation Development",
    company: "Sahel WaterWorks",
    country: "Chad",
    city: "N'Djamena",
    sector: "Agriculture",
    type: "Full-time",
    experience: "Senior",
    salaryMin: 1200,
    salaryMax: 1800,
    posted: "2025-11-12",
  },
  {
    id: 2,
    title: "Agriculture Export Specialist",
    company: "Sahel Trade Hub",
    country: "Senegal",
    city: "Dakar",
    sector: "Trade",
    type: "Contract",
    experience: "Mid",
    salaryMin: 900,
    salaryMax: 1400,
    posted: "2025-11-10",
  },
  {
    id: 3,
    title: "Solar Plant Engineer",
    company: "Sahara Energies",
    country: "Mauritania",
    city: "Nouakchott",
    sector: "Energy",
    type: "Full-time",
    experience: "Senior",
    salaryMin: 1500,
    salaryMax: 2500,
    posted: "2025-11-08",
  },
  {
    id: 4,
    title: "Quality Control — Gum Arabic",
    company: "Chad Exporters Ltd.",
    country: "Chad",
    city: "Abéché",
    sector: "Agriculture",
    type: "Part-time",
    experience: "Junior",
    salaryMin: 400,
    salaryMax: 700,
    posted: "2025-11-05",
  },
  {
    id: 5,
    title: "Logistics Coordinator",
    company: "NorthTrade Logistics",
    country: "Morocco",
    city: "Casablanca",
    sector: "Transport",
    type: "Full-time",
    experience: "Mid",
    salaryMin: 1000,
    salaryMax: 1500,
    posted: "2025-11-04",
  },
  {
    id: 6,
    title: "Uranium Field Engineer",
    company: "MineralOps",
    country: "Niger",
    city: "Agadez",
    sector: "Mining",
    type: "Full-time",
    experience: "Senior",
    salaryMin: 1800,
    salaryMax: 3000,
    posted: "2025-11-02",
  },
  {
    id: 7,
    title: "Digital Marketing — Tourism",
    company: "Sahara Travels",
    country: "Tunisia",
    city: "Tunis",
    sector: "Tourism",
    type: "Contract",
    experience: "Mid",
    salaryMin: 700,
    salaryMax: 1200,
    posted: "2025-10-28",
  },
  {
    id: 8,
    title: "Veterinarian — Livestock Program",
    company: "AgriCare Intl.",
    country: "Mali",
    city: "Bamako",
    sector: "Livestock",
    type: "Full-time",
    experience: "Mid",
    salaryMin: 1100,
    salaryMax: 1600,
    posted: "2025-10-25",
  },
];

// ---- Helper: unique values for filters
function unique(arr, key) {
  return Array.from(new Set(arr.map((i) => i[key]))).sort();
}

export default function Jobs() {
  const navigate = useNavigate();

  // Filters & state
  const [query, setQuery] = useState("");
  const [country, setCountry] = useState("All");
  const [sector, setSector] = useState("All");
  const [type, setType] = useState("All");
  const [experience, setExperience] = useState("All");
  const [salaryRange, setSalaryRange] = useState("All");
  const [sortBy, setSortBy] = useState("newest");
  const [saved, setSaved] = useState(() => {
    try {
      return JSON.parse(localStorage.getItem("savedJobs_v1") || "[]");
    } catch {
      return [];
    }
  });

  // options
  const countries = useMemo(() => ["All", ...unique(MOCK_JOBS, "country")], []);
  const sectors = useMemo(() => ["All", ...unique(MOCK_JOBS, "sector")], []);
  const types = useMemo(() => ["All", ...unique(MOCK_JOBS, "type")], []);
  const experiences = useMemo(
    () => ["All", ...unique(MOCK_JOBS, "experience")],
    []
  );
  const salaryRanges = ["All", "< 800", "800 - 1400", "1400 - 2200", "> 2200"];

  // Filtered + Sorted list
  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase();
    let list = MOCK_JOBS.filter((j) => {
      if (country !== "All" && j.country !== country) return false;
      if (sector !== "All" && j.sector !== sector) return false;
      if (type !== "All" && j.type !== type) return false;
      if (experience !== "All" && j.experience !== experience) return false;

      if (salaryRange !== "All") {
        if (salaryRange === "< 800" && !(j.salaryMax < 800)) return false;
        if (
          salaryRange === "800 - 1400" &&
          !(j.salaryMin >= 800 && j.salaryMax <= 1400)
        )
          return false;
        if (
          salaryRange === "1400 - 2200" &&
          !(j.salaryMin >= 1400 && j.salaryMax <= 2200)
        )
          return false;
        if (salaryRange === "> 2200" && !(j.salaryMin > 2200)) return false;
      }

      if (!q) return true;
      return (
        j.title.toLowerCase().includes(q) ||
        j.company.toLowerCase().includes(q) ||
        j.city.toLowerCase().includes(q)
      );
    });

    if (sortBy === "newest") {
      list.sort((a, b) => new Date(b.posted) - new Date(a.posted));
    } else if (sortBy === "salaryDesc") {
      list.sort((a, b) => (b.salaryMax || 0) - (a.salaryMax || 0));
    } else if (sortBy === "salaryAsc") {
      list.sort((a, b) => (a.salaryMin || 0) - (b.salaryMin || 0));
    }

    return list;
  }, [query, country, sector, type, experience, salaryRange, sortBy]);

  useEffect(() => {
    localStorage.setItem("savedJobs_v1", JSON.stringify(saved));
  }, [saved]);

  function toggleSave(id) {
    setSaved((prev) => {
      const next = prev.includes(id)
        ? prev.filter((x) => x !== id)
        : [id, ...prev];
      return next;
    });
  }

  return (
    <div style={{ minHeight: "80vh", padding: "30px 0", background: BG }}>
      <div className="container" style={{ color: NEUTRAL }}>
        {/* Header */}
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "flex-start",
            gap: 18,
          }}
        >
          <div>
            <h1
              style={{ margin: 0, fontSize: 30, fontWeight: 900, color: GOLD }}
            >
              Jobs & Opportunities — Sahel & North Africa
            </h1>
            <div style={{ marginTop: 8, color: MUTED }}>
              Browse verified roles in agriculture, energy, mining, tourism and
              more — curated for investors and professionals.
            </div>

            {/* Stats */}
            <div
              style={{
                marginTop: 12,
                display: "flex",
                gap: 12,
                alignItems: "center",
              }}
            >
              <div style={{ background: CARD, padding: 8, borderRadius: 8 }}>
                <div style={{ fontSize: 12, color: MUTED }}>Available</div>
                <div style={{ fontWeight: 800, fontSize: 18 }}>
                  {filtered.length}
                </div>
              </div>
              <div style={{ background: CARD, padding: 8, borderRadius: 8 }}>
                <div style={{ fontSize: 12, color: MUTED }}>Saved</div>
                <div style={{ fontWeight: 800, fontSize: 18 }}>
                  {saved.length}
                </div>
              </div>
            </div>
          </div>

          {/* Search + Controls */}
          <div style={{ minWidth: 360 }}>
            <div style={{ display: "flex", gap: 8, alignItems: "center" }}>
              <div
                style={{
                  display: "flex",
                  alignItems: "center",
                  gap: 8,
                  background: CARD,
                  padding: "8px 12px",
                  borderRadius: 10,
                }}
              >
                <MdSearch color={MUTED} />
                <input
                  placeholder="Search title, company or city..."
                  value={query}
                  onChange={(e) => setQuery(e.target.value)}
                  style={{
                    border: "none",
                    outline: "none",
                    background: "transparent",
                    color: NEUTRAL,
                    width: 220,
                  }}
                />
              </div>

              <select
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value)}
                style={{
                  background: CARD,
                  color: NEUTRAL,
                  padding: "8px 10px",
                  borderRadius: 8,
                  border: "1px solid rgba(255,255,255,0.04)",
                }}
              >
                <option value="newest">Newest</option>
                <option value="salaryDesc">Salary: High → Low</option>
                <option value="salaryAsc">Salary: Low → High</option>
              </select>
            </div>

            {/* quick filters row */}
            <div
              style={{
                marginTop: 12,
                display: "flex",
                gap: 8,
                flexWrap: "wrap",
              }}
            >
              <select
                value={country}
                onChange={(e) => setCountry(e.target.value)}
                style={{
                  background: CARD,
                  color: NEUTRAL,
                  padding: "8px 10px",
                  borderRadius: 8,
                }}
              >
                {countries.map((c) => (
                  <option key={c} value={c}>
                    {c}
                  </option>
                ))}
              </select>

              <select
                value={sector}
                onChange={(e) => setSector(e.target.value)}
                style={{
                  background: CARD,
                  color: NEUTRAL,
                  padding: "8px 10px",
                  borderRadius: 8,
                }}
              >
                {sectors.map((s) => (
                  <option key={s} value={s}>
                    {s}
                  </option>
                ))}
              </select>

              <select
                value={type}
                onChange={(e) => setType(e.target.value)}
                style={{
                  background: CARD,
                  color: NEUTRAL,
                  padding: "8px 10px",
                  borderRadius: 8,
                }}
              >
                {types.map((t) => (
                  <option key={t} value={t}>
                    {t}
                  </option>
                ))}
              </select>

              <select
                value={experience}
                onChange={(e) => setExperience(e.target.value)}
                style={{
                  background: CARD,
                  color: NEUTRAL,
                  padding: "8px 10px",
                  borderRadius: 8,
                }}
              >
                {experiences.map((ex) => (
                  <option key={ex} value={ex}>
                    {ex}
                  </option>
                ))}
              </select>

              <select
                value={salaryRange}
                onChange={(e) => setSalaryRange(e.target.value)}
                style={{
                  background: CARD,
                  color: NEUTRAL,
                  padding: "8px 10px",
                  borderRadius: 8,
                }}
              >
                {salaryRanges.map((sr) => (
                  <option key={sr} value={sr}>
                    {sr}
                  </option>
                ))}
              </select>
            </div>
          </div>
        </div>

        {/* MAIN LIST */}
        <div style={{ marginTop: 22, display: "grid", gap: 14 }}>
          {filtered.length === 0 && (
            <div
              style={{
                padding: 18,
                borderRadius: 12,
                background: CARD,
                color: MUTED,
              }}
            >
              No matching jobs. Try broadening your filters or clearing the
              search.
            </div>
          )}

          {filtered.map((j) => (
            <div
              key={j.id}
              style={{
                display: "flex",
                gap: 16,
                alignItems: "center",
                background: CARD,
                padding: 16,
                borderRadius: 12,
                border: "1px solid rgba(255,255,255,0.03)",
              }}
            >
              <div
                style={{
                  width: 68,
                  height: 68,
                  borderRadius: 10,
                  background:
                    "linear-gradient(135deg, rgba(10,36,99,0.5), rgba(212,175,55,0.2))",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  color: NEUTRAL,
                  fontWeight: 900,
                }}
              >
                <MdWork size={28} />
              </div>

              <div style={{ flex: 1 }}>
                <div
                  style={{
                    display: "flex",
                    justifyContent: "space-between",
                    gap: 12,
                  }}
                >
                  <div>
                    <div
                      style={{ fontSize: 18, fontWeight: 800, color: NEUTRAL }}
                    >
                      {j.title}
                    </div>
                    <div style={{ color: MUTED, marginTop: 6 }}>
                      {j.company} • {j.sector}
                    </div>
                    <div style={{ color: MUTED, marginTop: 6 }}>
                      {j.city}, {j.country}
                    </div>
                  </div>

                  <div style={{ textAlign: "right", minWidth: 150 }}>
                    <div style={{ color: MUTED, fontSize: 13 }}>
                      {new Date(j.posted).toLocaleDateString()}
                    </div>
                    <div style={{ marginTop: 8, fontWeight: 800, color: GOLD }}>
                      {j.salaryMin} - {j.salaryMax} USD
                    </div>
                    <div style={{ marginTop: 8 }}>
                      <Link
                        to={`/jobs/${j.id}`}
                        style={{
                          textDecoration: "none",
                          color: GOLD,
                          fontWeight: 800,
                        }}
                      >
                        View →
                      </Link>
                    </div>
                  </div>
                </div>

                <div
                  style={{
                    marginTop: 12,
                    display: "flex",
                    gap: 12,
                    alignItems: "center",
                  }}
                >
                  <div
                    style={{
                      color: MUTED,
                      display: "flex",
                      alignItems: "center",
                      gap: 6,
                    }}
                  >
                    <MdLocationOn /> {j.city}
                  </div>
                  <div style={{ color: MUTED }}>{j.type}</div>
                  <div
                    style={{
                      marginLeft: "auto",
                      display: "flex",
                      gap: 10,
                      alignItems: "center",
                    }}
                  >
                    <button
                      onClick={() => navigate(`/jobs/${j.id}`)}
                      style={{
                        padding: "8px 12px",
                        borderRadius: 8,
                        border: "1px solid rgba(255,255,255,0.05)",
                        background: "transparent",
                        color: NEUTRAL,
                        cursor: "pointer",
                      }}
                    >
                      Apply
                    </button>

                    <div
                      style={{ cursor: "pointer" }}
                      onClick={() => toggleSave(j.id)}
                    >
                      {saved.includes(j.id) ? (
                        <MdBookmark size={22} color={GOLD} />
                      ) : (
                        <MdBookmarkBorder size={22} color={MUTED} />
                      )}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* FOOTER ACTIONS */}
        <div
          style={{
            marginTop: 22,
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
          }}
        >
          <div style={{ color: MUTED }}>
            Data: Mock • Ready for API integration (Admin panel will manage
            jobs). Need help connecting source? I can integrate
            AlphaVantage/Custom API later.
          </div>

          <div style={{ display: "flex", gap: 10 }}>
            <button
              onClick={() => {
                setCountry("All");
                setSector("All");
                setType("All");
                setExperience("All");
                setSalaryRange("All");
                setQuery("");
                setSortBy("newest");
              }}
              style={{
                padding: "8px 12px",
                borderRadius: 8,
                background: "rgba(255,255,255,0.02)",
                color: NEUTRAL,
                border: "1px solid rgba(255,255,255,0.04)",
              }}
            >
              Reset Filters
            </button>

            <button
              onClick={() => {
                window.scrollTo({ top: 0, behavior: "smooth" });
              }}
              style={{
                padding: "8px 12px",
                borderRadius: 8,
                background: GOLD,
                color: "#081020",
                fontWeight: 900,
              }}
            >
              Post a Job
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
