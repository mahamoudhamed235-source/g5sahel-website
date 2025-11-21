import React from "react";
import { Link } from "react-router-dom";
import { PRODUCTS } from "../data/products";

export default function SellerDirectory() {
  // استخراج قائمة البائعين من المنتجات (بدون تكرار)
  const sellers = [];
  const map = new Set();

  PRODUCTS.forEach((p) => {
    if (!map.has(p.seller)) {
      map.add(p.seller);

      sellers.push({
        name: p.seller,
        country: p.country,
        category: p.category,
        sellerId: p.seller.toLowerCase().replace(/\s+/g, "-"),
        productsCount: PRODUCTS.filter((x) => x.seller === p.seller).length,
        image: `https://ui-avatars.com/api/?name=${encodeURIComponent(
          p.seller
        )}&background=0D6EFD&color=fff&size=256`,
      });
    }
  });

  return (
    <div className="container" style={{ padding: "40px 0" }}>
      <h1
        style={{
          fontSize: 34,
          fontWeight: 800,
          color: "var(--gold-1)",
          marginBottom: 10,
        }}
      >
        Verified African Suppliers
      </h1>

      <p style={{ color: "var(--muted)", fontSize: 16, marginBottom: 40 }}>
        Explore trusted exporters from Sahel, North Africa, and across Africa.
      </p>

      {/* GRID */}
      <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fill, minmax(260px, 1fr))",
          gap: 24,
        }}
      >
        {sellers.map((s, i) => (
          <div
            key={i}
            className="card"
            style={{ padding: 20, borderRadius: 16, textAlign: "center" }}
          >
            <img
              src={s.image}
              alt={s.name}
              style={{
                width: 120,
                height: 120,
                borderRadius: "50%",
                objectFit: "cover",
                marginBottom: 12,
              }}
            />

            <h3 style={{ color: "var(--gold-1)", fontSize: 20 }}>{s.name}</h3>

            <p style={{ color: "var(--muted)", margin: "4px 0" }}>
              {s.country}
            </p>

            <p style={{ color: "var(--muted)", marginBottom: 8 }}>
              {s.productsCount} products
            </p>

            <Link
              to={`/seller/${s.sellerId}`}
              className="cta"
              style={{ display: "block", marginTop: 10 }}
            >
              View Supplier →
            </Link>
          </div>
        ))}
      </div>
    </div>
  );
}
