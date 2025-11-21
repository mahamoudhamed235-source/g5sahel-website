import React from "react";
import { useParams, Link } from "react-router-dom";
import { PRODUCTS } from "../data/products";

/* 📌 بيانات أساسية — لاحقاً سنضيف بيانات أكثر */
const COUNTRY_INFO = {
  mali: {
    name: "Mali",
    flag: "https://flagcdn.com/w320/ml.png",
    population: "21.9 million",
    gdp: "$19.9 billion",
    capital: "Bamako",
    exports: ["Gold", "Cotton", "Livestock"],
  },
  niger: {
    name: "Niger",
    flag: "https://flagcdn.com/w320/ne.png",
    population: "25 million",
    gdp: "$14.9 billion",
    capital: "Niamey",
    exports: ["Uranium", "Livestock", "Onions"],
  },
  chad: {
    name: "Chad",
    flag: "https://flagcdn.com/w320/td.png",
    population: "17.3 million",
    gdp: "$11.3 billion",
    capital: "N'Djamena",
    exports: ["Oil", "Livestock", "Sesame"],
  },
  mauritania: {
    name: "Mauritania",
    flag: "https://flagcdn.com/w320/mr.png",
    population: "4.7 million",
    gdp: "$8.4 billion",
    capital: "Nouakchott",
    exports: ["Iron Ore", "Fish", "Gold"],
  },
  burkina: {
    name: "Burkina Faso",
    flag: "https://flagcdn.com/w320/bf.png",
    population: "22 million",
    gdp: "$19.8 billion",
    capital: "Ouagadougou",
    exports: ["Gold", "Cotton", "Sesame"],
  },

  /* North Africa */
  egypt: {
    name: "Egypt",
    flag: "https://flagcdn.com/w320/eg.png",
    population: "112 million",
    gdp: "$476 billion",
    capital: "Cairo",
    exports: ["Petroleum", "Chemicals", "Foods"],
  },
  algeria: {
    name: "Algeria",
    flag: "https://flagcdn.com/w320/dz.png",
    population: "45 million",
    gdp: "$191 billion",
    capital: "Algiers",
    exports: ["Gas", "Oil", "Dates"],
  },
  morocco: {
    name: "Morocco",
    flag: "https://flagcdn.com/w320/ma.png",
    population: "37 million",
    gdp: "$138 billion",
    capital: "Rabat",
    exports: ["Cars", "Phosphate", "Agriculture"],
  },
  tunisia: {
    name: "Tunisia",
    flag: "https://flagcdn.com/w320/tn.png",
    population: "12.1 million",
    gdp: "$46.4 billion",
    capital: "Tunis",
    exports: ["Olive Oil", "Electronics", "Textiles"],
  },
  libya: {
    name: "Libya",
    flag: "https://flagcdn.com/w320/ly.png",
    population: "6.7 million",
    gdp: "$41 billion",
    capital: "Tripoli",
    exports: ["Oil"],
  },
};

export default function CountryPage() {
  const { countryId } = useParams();
  const country = COUNTRY_INFO[countryId];

  if (!country) {
    return (
      <div className="container" style={{ padding: 40 }}>
        <h2 style={{ color: "var(--gold-1)" }}>Country Not Found</h2>
        <Link to="/countries" style={{ color: "var(--gold-2)" }}>
          ← Back to Countries List
        </Link>
      </div>
    );
  }

  /* جلب المنتجات القادمة من هذا البلد */
  const countryProducts = PRODUCTS.filter(
    (p) => p.country.toLowerCase() === country.name.toLowerCase()
  );

  return (
    <div className="container" style={{ padding: "40px 0" }}>
      {/* FLAG + NAME */}
      <div style={{ display: "flex", alignItems: "center", gap: 20 }}>
        <img
          src={country.flag}
          alt=""
          style={{ width: 120, height: 80, borderRadius: 10 }}
        />
        <h1 style={{ fontSize: 36, color: "var(--gold-1)" }}>{country.name}</h1>
      </div>

      {/* BASIC INFO */}
      <div
        style={{
          marginTop: 30,
          padding: 20,
          borderRadius: 16,
          background: "rgba(255,255,255,0.05)",
        }}
      >
        <h2 style={{ color: "var(--gold-1)", marginBottom: 14 }}>
          Country Overview
        </h2>

        <p>
          <strong>Capital:</strong> {country.capital}
        </p>
        <p>
          <strong>Population:</strong> {country.population}
        </p>
        <p>
          <strong>GDP:</strong> {country.gdp}
        </p>

        <p>
          <strong>Main Exports:</strong> {country.exports.join(", ")}
        </p>
      </div>

      {/* PRODUCTS FROM THIS COUNTRY */}
      <div style={{ marginTop: 50 }}>
        <h2 style={{ color: "var(--gold-1)", marginBottom: 20 }}>
          Products from {country.name}
        </h2>

        {countryProducts.length === 0 ? (
          <p style={{ color: "var(--muted)" }}>
            No products from this country yet.
          </p>
        ) : (
          <div
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(auto-fill, minmax(260px, 1fr))",
              gap: 24,
            }}
          >
            {countryProducts.map((prod) => (
              <Link
                key={prod.id}
                to={`/marketplace/product/${prod.id}`}
                className="card"
                style={{
                  padding: 14,
                  borderRadius: 14,
                  textDecoration: "none",
                }}
              >
                <img
                  src={prod.images?.[0]}
                  alt={prod.title}
                  style={{
                    width: "100%",
                    height: 160,
                    borderRadius: 10,
                    objectFit: "cover",
                  }}
                />

                <h3
                  style={{
                    color: "var(--gold-1)",
                    marginTop: 10,
                    fontSize: 18,
                  }}
                >
                  {prod.title}
                </h3>
              </Link>
            ))}
          </div>
        )}
      </div>

      {/* BACK BUTTON */}
      <div style={{ marginTop: 40 }}>
        <Link to="/countries" style={{ color: "var(--gold-2)", fontSize: 16 }}>
          ← Back to All Countries
        </Link>
      </div>
    </div>
  );
}
