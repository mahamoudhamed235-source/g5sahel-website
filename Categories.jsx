import React from "react";
import { CATEGORIES } from "../data/categories";
import { Link } from "react-router-dom";

export default function Categories() {
  return (
    <div className="container" style={{ padding: "40px 0" }}>
      <h1
        style={{
          fontSize: 32,
          fontWeight: 800,
          color: "var(--gold-1)",
          marginBottom: 14,
        }}
      >
        African Sectors & Categories
      </h1>

      <p style={{ color: "var(--muted)", marginBottom: 40, fontSize: 16 }}>
        Explore key African products, resources, industries, and export sectors.
      </p>

      {/* CATEGORY GRID */}
      <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fill, minmax(260px, 1fr))",
          gap: 24,
        }}
      >
        {CATEGORIES.map((cat) => {
          const Icon = cat.icon; // الأيقونة جاهزة هنا

          return (
            <div
              key={cat.id}
              className="card"
              style={{
                padding: 20,
                borderRadius: 16,
                minHeight: 200,
                display: "flex",
                flexDirection: "column",
                justifyContent: "space-between",
                background:
                  "linear-gradient(135deg, rgba(10,36,99,0.25), rgba(212,175,55,0.08))",
                boxShadow: "0 4px 20px rgba(0,0,0,0.25)",
              }}
            >
              {/* ICON */}
              <div style={{ marginBottom: 14 }}>
                {Icon && <Icon size={34} color="var(--gold-1)" />}
              </div>

              {/* TITLE */}
              <h3
                style={{
                  color: "var(--gold-1)",
                  fontSize: 20,
                  fontWeight: 700,
                  marginBottom: 6,
                }}
              >
                {cat.title}
              </h3>

              {/* DESCRIPTION */}
              <p style={{ color: "var(--muted)", fontSize: 14, flexGrow: 1 }}>
                {cat.description}
              </p>

              {/* FIXED LINK  ✔️ */}
              <Link
                to={`/categories/${cat.id}`}
                style={{
                  marginTop: 14,
                  fontWeight: 600,
                  fontSize: 15,
                  color: "var(--gold-2)",
                }}
              >
                Explore →
              </Link>
            </div>
          );
        })}
      </div>
    </div>
  );
}
