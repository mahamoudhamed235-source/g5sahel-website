import React, { useState } from "react";
import { Link } from "react-router-dom";
import { PRODUCTS } from "../data/products";
import { MdSearch, MdFilterList, MdPublic, MdCategory } from "react-icons/md";

export default function Marketplace() {
  const [search, setSearch] = useState("");
  const [country, setCountry] = useState("all");

  /* جميع الدول المتوفرة من المنتجات */
  const countries = [
    "all",
    ...Array.from(new Set(PRODUCTS.map((p) => p.country))),
  ];

  /* تصفية المنتجات */
  const filtered = PRODUCTS.filter((p) => {
    const matchesSearch = p.title.toLowerCase().includes(search.toLowerCase());
    const matchesCountry = country === "all" || p.country === country;
    return matchesSearch && matchesCountry;
  });

  return (
    <div className="container" style={{ padding: "40px 0" }}>
      {/* -------------------------------- */}
      {/*          PAGE TITLE              */}
      {/* -------------------------------- */}
      <h1
        style={{
          fontSize: 36,
          fontWeight: 800,
          color: "var(--gold-1)",
          marginBottom: 10,
        }}
      >
        Africa Marketplace
      </h1>

      <p style={{ color: "var(--muted)", marginBottom: 30 }}>
        Buy & Sell Trusted African Products — Sahel Region • North Africa • West
        Africa.
      </p>

      {/* -------------------------------- */}
      {/*         SEARCH & FILTERS         */}
      {/* -------------------------------- */}
      <div
        style={{
          display: "flex",
          gap: 14,
          marginBottom: 30,
          alignItems: "center",
        }}
      >
        {/* SEARCH */}
        <div
          style={{
            flex: 1,
            background: "rgba(255,255,255,0.05)",
            padding: "12px 14px",
            borderRadius: 12,
            display: "flex",
            alignItems: "center",
            gap: 10,
          }}
        >
          <MdSearch size={22} color="var(--gold-1)" />
          <input
            placeholder="Search product..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            style={{
              background: "transparent",
              border: "none",
              color: "#fff",
              width: "100%",
              outline: "none",
            }}
          />
        </div>

        {/* COUNTRY FILTER */}
        <div
          style={{
            background: "rgba(255,255,255,0.05)",
            padding: "12px 14px",
            borderRadius: 12,
            display: "flex",
            gap: 10,
            alignItems: "center",
            minWidth: 180,
          }}
        >
          <MdPublic size={22} color="var(--gold-1)" />
          <select
            value={country}
            onChange={(e) => setCountry(e.target.value)}
            style={{
              background: "transparent",
              border: "none",
              color: "#fff",
              width: "100%",
              outline: "none",
            }}
          >
            {countries.map((c) => (
              <option key={c} value={c} style={{ color: "#000" }}>
                {c === "all" ? "All Countries" : c}
              </option>
            ))}
          </select>
        </div>
      </div>

      {/* -------------------------------- */}
      {/*        FEATURED CATEGORIES       */}
      {/* -------------------------------- */}
      <h2
        style={{
          marginBottom: 18,
          fontSize: 26,
          fontWeight: 700,
          color: "#E6E9EE",
        }}
      >
        Popular Sectors
      </h2>

      <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fit, minmax(180px, 1fr))",
          gap: 20,
          marginBottom: 40,
        }}
      >
        {[
          ["Agriculture", "/categories/agriculture"],
          ["Livestock", "/categories/livestock"],
          ["Honey", "/categories/honey"],
          ["Oils", "/categories/oils"],
          ["Cotton", "/categories/cotton"],
          ["Minerals", "/categories/minerals"],
          ["Cocoa", "/categories/cocoa"],
          ["Sesame", "/categories/sesame"],
          ["Gum Arabic", "/categories/gum-arabic"],
        ].map(([name, link], i) => (
          <Link
            key={i}
            to={link}
            className="card"
            style={{
              padding: 20,
              borderRadius: 16,
              textAlign: "center",
              textDecoration: "none",
            }}
          >
            <MdCategory size={30} color="var(--gold-1)" />
            <div style={{ marginTop: 8, color: "#fff", fontWeight: 700 }}>
              {name}
            </div>
          </Link>
        ))}
      </div>

      {/* -------------------------------- */}
      {/*         PRODUCT LIST GRID        */}
      {/* -------------------------------- */}
      <h2
        style={{
          marginBottom: 18,
          fontSize: 26,
          fontWeight: 700,
          color: "#E6E9EE",
        }}
      >
        Available Products
      </h2>

      {filtered.length === 0 ? (
        <p style={{ color: "var(--muted)", marginTop: 20 }}>
          No products match your search.
        </p>
      ) : (
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit, minmax(260px, 1fr))",
            gap: 24,
            marginTop: 20,
          }}
        >
          {filtered.map((p) => (
            <Link
              key={p.id}
              to={`/marketplace/product/${p.id}`}
              className="card"
              style={{
                padding: 14,
                borderRadius: 14,
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
                  color: "var(--gold-1)",
                  fontSize: 18,
                  fontWeight: 700,
                }}
              >
                {p.title}
              </h3>

              <p style={{ fontSize: 14, color: "var(--muted)" }}>{p.country}</p>

              <p style={{ fontSize: 15, color: "#fff", fontWeight: 600 }}>
                {p.price}
              </p>
            </Link>
          ))}
        </div>
      )}
    </div>
  );
}
