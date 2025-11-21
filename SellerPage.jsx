// src/pages/SellerPage.jsx
import React from "react";
import { useParams, Link } from "react-router-dom";
import { PRODUCTS } from "../data/products";

/*
  SellerPage
  - يقرأ :id من المسار (مثال: /seller/Sahel Export Group)
  - يعرض معلومات البائع و جميع منتجاته
  - يسمح بالانتقال لصفحة المنتج الفردي
*/

export default function SellerPage() {
  const { id } = useParams();

  // نعتبر أن معرف البائع في هذا المشروع هو اسمه (product.seller)
  const sellerName = decodeURIComponent(id);

  // منتجات هذا البائع
  const items = PRODUCTS.filter((p) => p.seller === sellerName);

  // إحصائيات سريعة
  const stats = {
    products: items.length,
    countries: Array.from(new Set(items.map((p) => p.country))).length,
  };

  return (
    <div className="container" style={{ padding: "36px 0 80px" }}>
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          gap: 20,
        }}
      >
        <div>
          <h1
            style={{
              margin: 0,
              fontSize: 30,
              color: "var(--gold-1)",
              fontWeight: 800,
            }}
          >
            {sellerName}
          </h1>
          <p style={{ marginTop: 8, color: "var(--muted)" }}>
            Verified seller · Sahel Marketplace
          </p>

          <div
            style={{
              marginTop: 10,
              display: "flex",
              gap: 14,
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
          <Link
            to="/marketplace"
            className="btn"
            style={{ textDecoration: "none" }}
          >
            ← Marketplace
          </Link>
          <a
            href={`mailto:contact@${sellerName
              .replace(/\s+/g, "")
              .toLowerCase()}.com`}
            className="btn"
            style={{ textDecoration: "none" }}
          >
            Contact
          </a>
        </div>
      </div>

      {/* Seller Hero (placeholder image) */}
      <div
        style={{
          marginTop: 22,
          borderRadius: 12,
          overflow: "hidden",
          boxShadow: "0 10px 30px rgba(0,0,0,0.35)",
          background:
            "linear-gradient(135deg, rgba(10,36,99,0.2), rgba(212,175,55,0.05))",
          padding: 18,
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
          <div style={{ minWidth: 180 }}>
            <div
              style={{
                height: 140,
                width: 260,
                borderRadius: 10,
                background: "rgba(255,255,255,0.03)",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                color: "var(--muted)",
                fontWeight: 700,
              }}
            >
              Seller Logo
            </div>
          </div>

          <div style={{ flex: 1, minWidth: 220 }}>
            <p style={{ color: "var(--muted)", lineHeight: 1.6 }}>
              This is a verified supplier profile. Buyer safeguards and contact
              options will be available here. You can add seller description,
              certifications, trust badges and links to company website.
            </p>
          </div>
        </div>
      </div>

      {/* Seller Products */}
      <h2 style={{ marginTop: 28, color: "#E6E9EE" }}>
        Products by {sellerName}
      </h2>

      {items.length === 0 ? (
        <div
          style={{
            marginTop: 12,
            padding: 18,
            borderRadius: 12,
            background: "rgba(255,255,255,0.03)",
            color: "var(--muted)",
          }}
        >
          No products listed yet by this seller.
        </div>
      ) : (
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fill, minmax(260px, 1fr))",
            gap: 18,
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
                  fontSize: 17,
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
                  {p.category}
                </div>
              </div>
            </Link>
          ))}
        </div>
      )}

      {/* Seller footer actions */}
      <div
        style={{ marginTop: 28, display: "flex", gap: 12, flexWrap: "wrap" }}
      >
        <Link
          to="/marketplace"
          style={{ color: "var(--gold-2)", fontWeight: 700 }}
        >
          Back to Marketplace
        </Link>
        <Link to="/" style={{ color: "var(--muted)" }}>
          Home
        </Link>
      </div>
    </div>
  );
}
