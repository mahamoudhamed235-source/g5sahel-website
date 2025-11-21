// src/pages/CategoryPage.jsx
import React from "react";
import { useParams, Link, useNavigate } from "react-router-dom";
import { CATEGORIES } from "../data/categories";
import { PRODUCTS } from "../data/products";

export default function CategoryPage() {
  const { id } = useParams();
  const navigate = useNavigate();

  // العثور على تعريف الفئة (category)
  const category = CATEGORIES.find((c) => c.id === id);

  // منتجات الفئة
  const items = PRODUCTS.filter((p) => p.category === id);

  // إحصائيات مبسطة
  const stats = {
    products: items.length,
    countries: Array.from(new Set(items.map((p) => p.country))).length,
  };

  if (!category) {
    return (
      <div className="container" style={{ padding: "40px 0" }}>
        <h2 style={{ color: "var(--gold-1)" }}>Category not found</h2>
        <p style={{ color: "var(--muted)" }}>
          The requested category does not exist.{" "}
          <Link to="/categories">View all categories</Link>
        </p>
      </div>
    );
  }

  return (
    <div className="container" style={{ padding: "36px 0 80px" }}>
      {/* HEADER */}
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          gap: 20,
          alignItems: "center",
          marginBottom: 20,
        }}
      >
        <div>
          <h1
            style={{
              margin: 0,
              fontSize: 32,
              color: "var(--gold-1)",
              fontWeight: 800,
            }}
          >
            {category.title}
          </h1>
          <p style={{ marginTop: 8, color: "var(--muted)" }}>
            {category.description}
          </p>
          <div
            style={{
              marginTop: 10,
              display: "flex",
              gap: 12,
              color: "var(--muted)",
              fontSize: 14,
            }}
          >
            <div>
              Products:{" "}
              <strong style={{ color: "var(--gold-2)" }}>
                {stats.products}
              </strong>
            </div>
            <div>
              Countries:{" "}
              <strong style={{ color: "var(--gold-2)" }}>
                {stats.countries}
              </strong>
            </div>
          </div>
        </div>

        <div style={{ display: "flex", gap: 10 }}>
          <button className="btn" onClick={() => navigate(-1)}>
            ← Back
          </button>
          <Link
            to="/marketplace"
            className="btn"
            style={{ textDecoration: "none" }}
          >
            Marketplace
          </Link>
        </div>
      </div>

      {/* HERO / MEDIA (اختياري: فيديو أو صورة) */}
      <div
        style={{
          width: "100%",
          borderRadius: 14,
          overflow: "hidden",
          boxShadow: "0 12px 40px rgba(0,0,0,0.45)",
          marginBottom: 28,
          background:
            "linear-gradient(135deg, rgba(10,36,99,0.28), rgba(212,175,55,0.06))",
          padding: 22,
        }}
      >
        <div
          style={{
            display: "flex",
            gap: 18,
            alignItems: "center",
            flexWrap: "wrap",
          }}
        >
          <div style={{ minWidth: 220, maxWidth: 420 }}>
            <div
              style={{
                height: 200,
                borderRadius: 12,
                background: "rgba(255,255,255,0.03)",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                color: "var(--muted)",
              }}
            >
              {/* وضعت عنصر نائب — يمكنك لاحقًا استبداله بصورة أو فيديو خاص بالفئة */}
              <strong style={{ color: "var(--gold-2)" }}>
                {category.title}
              </strong>
            </div>
          </div>

          <div style={{ flex: 1, minWidth: 240 }}>
            <p style={{ color: "var(--muted)", lineHeight: 1.6 }}>
              {category.description}
            </p>

            <div style={{ marginTop: 12, display: "flex", gap: 12 }}>
              <div
                style={{
                  padding: 10,
                  borderRadius: 10,
                  background: "rgba(255,255,255,0.03)",
                }}
              >
                <div style={{ fontSize: 13, color: "var(--muted)" }}>
                  Products
                </div>
                <div
                  style={{
                    fontWeight: 800,
                    color: "var(--gold-2)",
                    fontSize: 18,
                  }}
                >
                  {stats.products}
                </div>
              </div>

              <div
                style={{
                  padding: 10,
                  borderRadius: 10,
                  background: "rgba(255,255,255,0.03)",
                }}
              >
                <div style={{ fontSize: 13, color: "var(--muted)" }}>
                  Countries
                </div>
                <div
                  style={{
                    fontWeight: 800,
                    color: "var(--gold-2)",
                    fontSize: 18,
                  }}
                >
                  {stats.countries}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* PRODUCTS GRID */}
      <h2 style={{ color: "#E6E9EE", marginBottom: 10, fontSize: 22 }}>
        Products in {category.title}
      </h2>

      {items.length === 0 ? (
        <div
          style={{
            padding: 22,
            background: "rgba(255,255,255,0.03)",
            borderRadius: 12,
            color: "var(--muted)",
          }}
        >
          No products listed yet for this category. Sellers can add items from
          the admin panel.
        </div>
      ) : (
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fill, minmax(260px, 1fr))",
            gap: 20,
            marginTop: 14,
          }}
        >
          {items.map((p) => (
            <Link
              key={p.id}
              to={`/marketplace/product/${p.id}`}
              className="card"
              style={{
                padding: 12,
                borderRadius: 12,
                textDecoration: "none",
                color: "inherit",
              }}
            >
              <div
                style={{
                  width: "100%",
                  height: 150,
                  borderRadius: 10,
                  overflow: "hidden",
                }}
              >
                <img
                  src={p.images?.[0]}
                  alt={p.title}
                  style={{ width: "100%", height: "100%", objectFit: "cover" }}
                />
              </div>

              <h3
                style={{
                  marginTop: 10,
                  color: "var(--gold-1)",
                  fontSize: 18,
                  fontWeight: 800,
                }}
              >
                {p.title}
              </h3>
              <p style={{ color: "var(--muted)", marginTop: 6 }}>{p.country}</p>
              <div
                style={{
                  marginTop: 8,
                  display: "flex",
                  justifyContent: "space-between",
                  alignItems: "center",
                }}
              >
                <div style={{ fontWeight: 800, color: "#fff" }}>{p.price}</div>
                <div style={{ color: "var(--muted)", fontSize: 13 }}>
                  {p.seller}
                </div>
              </div>
            </Link>
          ))}
        </div>
      )}

      {/* FOOTER MINI - روابط مفيدة */}
      <div
        style={{
          marginTop: 34,
          display: "flex",
          gap: 12,
          flexWrap: "wrap",
          alignItems: "center",
        }}
      >
        <Link
          to="/categories"
          style={{ color: "var(--gold-2)", fontWeight: 700 }}
        >
          ← Back to Categories
        </Link>
        <Link to="/marketplace" style={{ color: "var(--muted)" }}>
          Marketplace
        </Link>
        <Link to="/" style={{ color: "var(--muted)" }}>
          Home
        </Link>
      </div>
    </div>
  );
}
