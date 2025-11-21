import React from "react";
import { Link } from "react-router-dom";

const COUNTRIES = [
  {
    id: "mali",
    name: "Mali",
    region: "Sahel",
    flag: "https://flagcdn.com/w320/ml.png",
  },
  {
    id: "niger",
    name: "Niger",
    region: "Sahel",
    flag: "https://flagcdn.com/w320/ne.png",
  },
  {
    id: "chad",
    name: "Chad",
    region: "Sahel",
    flag: "https://flagcdn.com/w320/td.png",
  },
  {
    id: "mauritania",
    name: "Mauritania",
    region: "Sahel",
    flag: "https://flagcdn.com/w320/mr.png",
  },
  {
    id: "burkina",
    name: "Burkina Faso",
    region: "Sahel",
    flag: "https://flagcdn.com/w320/bf.png",
  },

  // North Africa
  {
    id: "egypt",
    name: "Egypt",
    region: "North Africa",
    flag: "https://flagcdn.com/w320/eg.png",
  },
  {
    id: "libya",
    name: "Libya",
    region: "North Africa",
    flag: "https://flagcdn.com/w320/ly.png",
  },
  {
    id: "algeria",
    name: "Algeria",
    region: "North Africa",
    flag: "https://flagcdn.com/w320/dz.png",
  },
  {
    id: "tunisia",
    name: "Tunisia",
    region: "North Africa",
    flag: "https://flagcdn.com/w320/tn.png",
  },
  {
    id: "morocco",
    name: "Morocco",
    region: "North Africa",
    flag: "https://flagcdn.com/w320/ma.png",
  },
];

export default function CountriesList() {
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
        African Countries
      </h1>

      <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fill, minmax(220px, 1fr))",
          gap: 24,
        }}
      >
        {COUNTRIES.map((country) => (
          <Link
            key={country.id}
            to={`/country/${country.id}`}
            className="card"
            style={{
              padding: 20,
              borderRadius: 14,
              textDecoration: "none",
            }}
          >
            <img
              src={country.flag}
              alt={country.name}
              style={{
                width: "100%",
                height: 120,
                objectFit: "cover",
                borderRadius: 10,
                marginBottom: 10,
              }}
            />

            <h3
              style={{
                fontSize: 18,
                fontWeight: 700,
                color: "var(--gold-1)",
                marginBottom: 6,
              }}
            >
              {country.name}
            </h3>

            <div style={{ color: "var(--muted)" }}>{country.region}</div>
          </Link>
        ))}
      </div>
    </div>
  );
}
