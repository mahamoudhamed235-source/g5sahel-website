import React from "react";
import { useParams, Link } from "react-router-dom";
import { PRODUCTS } from "../data/products";

export default function SellerProfile() {
  const { sellerName } = useParams();

  // جميع المنتجات التي يبيعها هذا البائع
  const sellerProducts = PRODUCTS.filter(
    (p) => p.seller.toLowerCase().replace(/\s+/g, "-") === sellerName
  );

  if (sellerProducts.length === 0) {
    return (
      <div className="container" style={{ padding: "40px 0" }}>
        <h2 style={{ color: "var(--gold-1)" }}>Seller Not Found</h2>
        <Link to="/marketplace" style={{ color: "var(--gold-2)" }}>
          ← Back to Marketplace
        </Link>
      </div>
    );
  }

  // معلومات البائع (من أول منتج يمتلكه)
  const sellerInfo = sellerProducts[0];

  return (
    <div className="container" style={{ padding: "40px 0" }}>
      {/* SELLER INFO */}
      <h1
        style={{
          fontSize: 34,
          fontWeight: 800,
          color: "var(--gold-1)",
          marginBottom: 10,
        }}
      >
        {sellerInfo.seller}
      </h1>

      <p style={{ color: "var(--muted)", marginBottom: 30 }}>
        Country: {sellerInfo.country}
      </p>

      <hr style={{ margin: "25px 0", opacity: 0.2 }} />

      {/* SELLER PRODUCTS */}
      <h2 style={{ color: "var(--gold-1)", marginBottom: 20 }}>
        Products from this Seller
      </h2>

      <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fill, minmax(260px, 1fr))",
          gap: 24,
        }}
      >
        {sellerProducts.map((p) => (
          <Link
            key={p.id}
            to={`/marketplace/product/${p.id}`}
            className="card"
            style={{
              padding: 16,
              borderRadius: 12,
              textDecoration: "none",
              color: "inherit",
            }}
          >
            <img
              src={p.images?.[0]}
              alt={p.title}
              style={{
                width: "100%",
                height: 170,
                objectFit: "cover",
                borderRadius: 12,
              }}
            />

            <h3
              style={{
                marginTop: 10,
                fontSize: 18,
                color: "var(--gold-1)",
                fontWeight: 700,
              }}
            >
              {p.title}
            </h3>

            <p style={{ color: "var(--muted)", fontSize: 14 }}>{p.price}</p>
          </Link>
        ))}
      </div>

      <div style={{ marginTop: 30 }}>
        <Link to="/marketplace" style={{ color: "var(--gold-2)" }}>
          ← Back to Marketplace
        </Link>
      </div>
    </div>
  );
}
