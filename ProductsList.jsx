import React, { useState } from "react";
import { PRODUCTS } from "../data/products";
import { Link } from "react-router-dom";

export default function ProductsList() {
  const [search, setSearch] = useState("");
  const [filterCountry, setFilterCountry] = useState("all");
  const [sortBy, setSortBy] = useState("default");

  // استخراج الدول المتاحة تلقائيًا
  const countries = ["all", ...new Set(PRODUCTS.map((p) => p.country))];

  // فلترة المنتجات
  const filtered = PRODUCTS.filter((p) => {
    const matchesSearch =
      p.title.toLowerCase().includes(search.toLowerCase()) ||
      p.description.toLowerCase().includes(search.toLowerCase());

    const matchesCountry =
      filterCountry === "all" ? true : p.country === filterCountry;

    return matchesSearch && matchesCountry;
  });

  // ترتيب المنتجات
  const sorted = [...filtered].sort((a, b) => {
    if (sortBy === "title") return a.title.localeCompare(b.title);
    if (sortBy === "country") return a.country.localeCompare(b.country);
    return 0;
  });

  return (
    <div className="container" style={{ padding: "40px 0" }}>
      <h1
        style={{
          fontSize: 34,
          fontWeight: 800,
          color: "var(--gold-1)",
          marginBottom: 20,
        }}
      >
        All Products
      </h1>

      {/* ------------------ SEARCH & FILTER BAR ------------------ */}
      <div
        style={{
          display: "flex",
          gap: 12,
          marginBottom: 30,
          flexWrap: "wrap",
        }}
      >
        {/* Search */}
        <input
          type="text"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          placeholder="Search products..."
          style={{
            flex: 1,
            padding: 12,
            borderRadius: 8,
            background: "rgba(255,255,255,0.07)",
            color: "#fff",
            border: "1px solid rgba(255,255,255,0.1)",
          }}
        />

        {/* Country Filter */}
        <select
          value={filterCountry}
          onChange={(e) => setFilterCountry(e.target.value)}
          style={{
            padding: 12,
            borderRadius: 8,
            background: "rgba(255,255,255,0.07)",
            color: "#fff",
            border: "1px solid rgba(255,255,255,0.2)",
          }}
        >
          {countries.map((c, i) => (
            <option key={i} value={c}>
              {c === "all" ? "All Countries" : c}
            </option>
          ))}
        </select>

        {/* Sort */}
        <select
          value={sortBy}
          onChange={(e) => setSortBy(e.target.value)}
          style={{
            padding: 12,
            borderRadius: 8,
            background: "rgba(255,255,255,0.07)",
            color: "#fff",
            border: "1px solid rgba(255,255,255,0.2)",
          }}
        >
          <option value="default">Sort By</option>
          <option value="title">Title</option>
          <option value="country">Country</option>
        </select>
      </div>

      {/* ------------------ PRODUCTS GRID ------------------ */}
      <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fill, minmax(260px, 1fr))",
          gap: 24,
        }}
      >
        {sorted.map((p) => (
          <Link
            key={p.id}
            to={`/marketplace/product/${p.id}`}
            className="card"
            style={{
              padding: 16,
              borderRadius: 14,
              textDecoration: "none",
              color: "inherit",
            }}
          >
            {/* Image */}
            <img
              src={p.images?.[0]}
              alt={p.title}
              style={{
                width: "100%",
                height: 160,
                borderRadius: 12,
                objectFit: "cover",
                marginBottom: 10,
              }}
            />

            {/* Title */}
            <h3
              style={{
                color: "var(--gold-1)",
                fontSize: 18,
                fontWeight: 700,
                marginBottom: 6,
              }}
            >
              {p.title}
            </h3>

            {/* Country */}
            <p style={{ color: "#ccc", marginBottom: 2 }}>{p.country}</p>

            {/* Price */}
            <p style={{ fontWeight: 600, color: "var(--gold-2)" }}>{p.price}</p>
          </Link>
        ))}
      </div>
    </div>
  );
}
