import React, { useState } from "react";
import { Link } from "react-router-dom";
import { useTranslation } from "react-i18next";
import {
  MdOutlineTrendingUp,
  MdOutlineArticle,
  MdOutlineAccessTime,
  MdOutlinePublic,
  MdOutlineBusiness,
  MdOutlineAgriculture,
  MdOutlineSecurity,
  MdSearch,
} from "react-icons/md";

const SAMPLE_ARTICLES = [
  {
    id: 1,
    title: "Major Reform in Sahel Agriculture Boosts Exports",
    category: "Agriculture",
    summary:
      "New policies and irrigation projects expected to increase millet and sorghum exports across Sahel countries within 18 months.",
    date: "Nov 10, 2025",
    image: null,
  },
  {
    id: 2,
    title: "Regional Energy Pact Signed to Expand Solar Farms",
    category: "Energy",
    summary:
      "Five countries signed a landmark agreement to develop cross-border solar corridors and invest in grid stability.",
    date: "Nov 9, 2025",
    image: null,
  },
  {
    id: 3,
    title: "Phosphate Discoveries in North Africa Attract Investment",
    category: "Industry",
    summary:
      "New deposits open opportunities for fertilizer production and industrial partnerships with Gulf investors.",
    date: "Nov 8, 2025",
    image: null,
  },
  {
    id: 4,
    title: "Tourism Recovery: Sahel Cultural Routes Reopened",
    category: "Tourism",
    summary:
      "Cultural routes and heritage sites are reopening with new safety measures and guided programs for international tourists.",
    date: "Nov 6, 2025",
    image: null,
  },
];

const CATEGORIES = [
  { key: "All", icon: <MdOutlinePublic size={18} /> },
  { key: "Economy", icon: <MdOutlineBusiness size={18} /> },
  { key: "Agriculture", icon: <MdOutlineAgriculture size={18} /> },
  { key: "Energy", icon: <MdOutlineTrendingUp size={18} /> },
  { key: "Security", icon: <MdOutlineSecurity size={18} /> },
  { key: "Tourism", icon: <MdOutlineArticle size={18} /> },
];

export default function News() {
  const { t } = useTranslation();
  const [filter, setFilter] = useState("All");
  const [q, setQ] = useState("");

  const filtered = SAMPLE_ARTICLES.filter((a) => {
    const matchCategory = filter === "All" || a.category === filter;
    const matchQuery =
      q.trim() === "" ||
      a.title.toLowerCase().includes(q.toLowerCase()) ||
      a.summary.toLowerCase().includes(q.toLowerCase());
    return matchCategory && matchQuery;
  });

  return (
    <div style={{ padding: "30px 0 80px" }}>
      {/* HERO */}
      <section className="container fade-in" style={{ marginBottom: 28 }}>
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "1fr 360px",
            gap: 20,
            alignItems: "start",
          }}
        >
          <div
            style={{
              padding: 28,
              borderRadius: 14,
              background:
                "linear-gradient(180deg, rgba(212,175,55,0.07), rgba(255,255,255,0.02))",
              border: "1px solid rgba(212,175,55,0.12)",
              boxShadow: "0 10px 40px rgba(2,6,23,0.6)",
            }}
          >
            <div
              style={{
                color: "var(--gold-1)",
                fontWeight: 800,
                fontSize: 20,
                marginBottom: 8,
              }}
            >
              Breaking News
            </div>

            <h1 style={{ margin: 0, fontSize: 30, color: "#EAF0F8" }}>
              {t("news_headline") ||
                "Sahel Economic Outlook: Growth & Opportunity"}
            </h1>

            <p
              style={{
                color: "var(--muted)",
                marginTop: 12,
                maxWidth: 720,
                lineHeight: 1.6,
              }}
            >
              Latest curated coverage and expert analysis on economics,
              investments, security updates, and climate developments across the
              Sahel & North Africa.
            </p>

            <div style={{ marginTop: 18, display: "flex", gap: 12 }}>
              <button className="cta">Subscribe to Alerts</button>
              <button className="cta-small">Submit a Tip</button>
            </div>
          </div>

          {/* RIGHT - Trending */}
          <aside
            style={{
              borderRadius: 12,
              padding: 18,
              background: "rgba(255,255,255,0.02)",
              border: "1px solid rgba(255,255,255,0.04)",
            }}
          >
            <div
              style={{
                display: "flex",
                alignItems: "center",
                gap: 8,
                marginBottom: 12,
              }}
            >
              <MdOutlineTrendingUp size={20} color="var(--gold-1)" />
              <div style={{ fontWeight: 700, color: "var(--gold-1)" }}>
                Trending
              </div>
            </div>

            {SAMPLE_ARTICLES.slice(0, 3).map((a) => (
              <div key={a.id} style={{ marginBottom: 12 }}>
                <div style={{ fontWeight: 700, color: "#E6E9EE" }}>
                  {a.title}
                </div>
                <div style={{ color: "var(--muted)", fontSize: 13 }}>
                  {a.date}
                </div>
              </div>
            ))}
          </aside>
        </div>
      </section>

      {/* FILTERS BAR */}
      <section className="container fade-in-slow" style={{ marginBottom: 18 }}>
        <div
          style={{
            display: "flex",
            gap: 12,
            alignItems: "center",
            flexWrap: "wrap",
            justifyContent: "space-between",
          }}
        >
          <div
            style={{
              display: "flex",
              gap: 8,
              alignItems: "center",
              flexWrap: "wrap",
            }}
          >
            {CATEGORIES.map((c) => (
              <button
                key={c.key}
                onClick={() => setFilter(c.key)}
                style={{
                  background:
                    filter === c.key
                      ? "linear-gradient(90deg, #D4AF37, #C19A6B)"
                      : "rgba(255,255,255,0.03)",
                  color: filter === c.key ? "#081020" : "#fff",
                  border:
                    filter === c.key
                      ? "none"
                      : "1px solid rgba(255,255,255,0.06)",
                  padding: "8px 12px",
                  borderRadius: 10,
                  display: "flex",
                  gap: 8,
                  alignItems: "center",
                  fontWeight: 600,
                  fontSize: 13,
                }}
              >
                <span style={{ display: "inline-flex", alignItems: "center" }}>
                  {c.icon}
                </span>
                <span>{c.key}</span>
              </button>
            ))}
          </div>

          <div style={{ display: "flex", gap: 8, alignItems: "center" }}>
            <div style={{ position: "relative" }}>
              <input
                value={q}
                onChange={(e) => setQ(e.target.value)}
                placeholder="Search news, topics or keywords..."
                style={{
                  padding: "8px 36px 8px 12px",
                  borderRadius: 10,
                  border: "1px solid rgba(255,255,255,0.06)",
                  background: "rgba(255,255,255,0.02)",
                  color: "#fff",
                }}
              />
              <MdSearch
                size={18}
                color="var(--muted)"
                style={{ position: "absolute", right: 8, top: 7 }}
              />
            </div>

            <button className="cta-small">Filter</button>
          </div>
        </div>
      </section>

      {/* NEWS GRID */}
      <section className="container fade-in" style={{ marginBottom: 36 }}>
        <div
          style={{
            display: "grid",
            gap: 18,
            gridTemplateColumns: "repeat(auto-fit, minmax(300px, 1fr))",
          }}
        >
          {filtered.map((article) => (
            <article
              key={article.id}
              className="card fade-scale"
              style={{
                display: "flex",
                flexDirection: "column",
                gap: 12,
                padding: 16,
              }}
            >
              <div
                style={{
                  height: 160,
                  borderRadius: 10,
                  background:
                    "linear-gradient(135deg, rgba(10,36,99,0.4), rgba(193,154,107,0.1))",
                  display: "flex",
                  alignItems: "flex-end",
                  padding: 12,
                  color: "#fff",
                  fontWeight: 700,
                  fontSize: 18,
                  boxShadow: "inset 0 -30px 60px rgba(0,0,0,0.5)",
                }}
              >
                {article.title}
              </div>

              <div style={{ color: "var(--muted)", fontSize: 14 }}>
                {article.summary}
              </div>

              <div
                style={{
                  display: "flex",
                  justifyContent: "space-between",
                  alignItems: "center",
                  marginTop: "auto",
                }}
              >
                <div style={{ color: "var(--muted)", fontSize: 13 }}>
                  <MdOutlineAccessTime
                    size={14}
                    style={{ verticalAlign: "middle", marginRight: 6 }}
                  />
                  {article.date}
                </div>

                <Link
                  to={`/news/${article.id}`}
                  style={{ color: "var(--gold-2)", fontWeight: 700 }}
                >
                  Read more →
                </Link>
              </div>
            </article>
          ))}

          {filtered.length === 0 && (
            <div style={{ color: "var(--muted)" }}>
              No results found for your search / filter.
            </div>
          )}
        </div>
      </section>

      {/* FOOTER NOTE / LOAD MORE */}
      <section className="container fade-in-slow" style={{ marginTop: 14 }}>
        <div style={{ display: "flex", justifyContent: "center" }}>
          <button className="cta-small">Load more articles</button>
        </div>
      </section>
    </div>
  );
}
