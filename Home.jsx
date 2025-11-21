import React from "react";
import Ticker from "../components/Ticker";
import StatsBar from "../components/StatsBar";
import { Link } from "react-router-dom";
import { useTranslation } from "react-i18next";

/* Material icons (stable) */
import {
  MdTravelExplore,
  MdFactory,
  MdAgriculture,
  MdShowChart,
  MdBolt,
  MdLocalHospital,
  MdBusinessCenter,
  MdMemory,
  MdLocalShipping,
  MdSecurity,
  MdPets,
  MdWaterDrop,
  MdDiamond,
  MdMenuBook,
  MdWork,
} from "react-icons/md";

export default function Home() {
  const { t } = useTranslation();

  const sampleTicker = [
    "Gold 1,975 USD/oz (-0.3%)",
    "Oil Brent 84.21 USD (-0.7%)",
    "Wheat 345 USD (+1.1%)",
    "USD/XOF 650 (+0.5%)",
    "EUR/XOF 720 (+0.2%)",
    "Egypt Inflation 24.3%",
    "Morocco Phosphate Index +1.7%",
  ];

  const sectors = [
    {
      title: "Tourism",
      desc: "Explore destinations & attractions",
      icon: <MdTravelExplore size={28} />,
    },
    {
      title: "Industry",
      desc: "Factories, minerals, and investments",
      icon: <MdFactory size={28} />,
    },
    {
      title: "Agriculture",
      desc: "Farming, crops, and agribusiness",
      icon: <MdAgriculture size={28} />,
    },
    {
      title: "Economy",
      desc: "Insights, GDP, trends",
      icon: <MdShowChart size={28} />,
    },
    {
      title: "Energy",
      desc: "Oil, gas, solar, wind",
      icon: <MdBolt size={28} />,
    },
    {
      title: "Health",
      desc: "Hospitals, clinics, health systems",
      icon: <MdLocalHospital size={28} />,
    },
    {
      title: "Investment",
      desc: "Opportunities & bids",
      icon: <MdBusinessCenter size={28} />,
    },
    {
      title: "Technology",
      desc: "Startups, ICT, innovation",
      icon: <MdMemory size={28} />,
    },
    {
      title: "Transport",
      desc: "Roads, ports, aviation",
      icon: <MdLocalShipping size={28} />,
    },
    {
      title: "Security",
      desc: "Stability, updates, alerts",
      icon: <MdSecurity size={28} />,
    },
    {
      title: "Livestock",
      desc: "Cattle, goats, trade",
      icon: <MdPets size={28} />,
    },
    {
      title: "Water",
      desc: "Rivers, dams, irrigation",
      icon: <MdWaterDrop size={28} />,
    },
    {
      title: "Mining",
      desc: "Gold, uranium, phosphates",
      icon: <MdDiamond size={28} />,
    },
    {
      title: "Culture",
      desc: "Languages, heritage",
      icon: <MdMenuBook size={28} />,
    },
    { title: "Jobs", desc: "Work opportunities", icon: <MdWork size={28} /> },
  ];

  return (
    <div className="fade-in" style={{ paddingBottom: 80 }}>
      {/* LIVE TICKER */}
      <Ticker items={sampleTicker} />

      {/* STATS BAR */}
      <div className="fade-scale">
        <StatsBar />
      </div>

      {/* HERO */}
      <section className="hero container fade-in" style={{ paddingTop: 30 }}>
        <div className="left">
          <h1 className="hero-title fade-in" style={{ maxWidth: 760 }}>
            {t("headline") || "AI-Powered Gateway to the Sahel’s Future"}
          </h1>

          <p className="hero-sub fade-in-slow" style={{ maxWidth: 640 }}>
            AI-driven insights, real-time markets, curated investment
            opportunities, and institutional-grade analysis for the Sahel &
            North Africa.
          </p>

          <div className="search-box fade-scale" style={{ marginTop: 20 }}>
            <input
              aria-label="Search"
              placeholder="Search countries, sectors, or ask the AI..."
            />
            <button className="cta">Ask AI</button>
          </div>

          <div
            style={{
              marginTop: 18,
              display: "flex",
              gap: 12,
              flexWrap: "wrap",
            }}
          >
            <button className="cta-small">Subscribe</button>
            <button className="cta-small">Submit Opportunity</button>
          </div>
        </div>

        <div className="right fade-in" style={{ minWidth: 320 }}>
          <div
            className="map-preview hero-map"
            style={{
              display: "flex",
              flexDirection: "column",
              gap: 12,
              alignItems: "center",
            }}
          >
            <div style={{ fontWeight: 700, color: "var(--gold-1)" }}>
              Africa Gateway
            </div>

            <div
              className="map-placeholder"
              style={{
                width: "100%",
                height: 220,
                borderRadius: 12,
                background:
                  "linear-gradient(180deg, rgba(255,255,255,0.02), rgba(255,255,255,0.01))",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                color: "var(--muted)",
                fontSize: 14,
                border: "1px solid rgba(255,255,255,0.06)",
                boxShadow: "0 8px 30px rgba(0,0,0,0.45)",
              }}
            >
              Interactive map placeholder — integration pending
            </div>

            <div style={{ width: "100%", display: "flex", gap: 8 }}>
              <div
                style={{
                  flex: 1,
                  background: "rgba(255,255,255,0.03)",
                  padding: 10,
                  borderRadius: 8,
                  textAlign: "center",
                }}
              >
                <div style={{ fontWeight: 700, color: "var(--gold-1)" }}>5</div>
                <div style={{ color: "var(--muted)", fontSize: 12 }}>
                  Sahel Countries
                </div>
              </div>
              <div
                style={{
                  flex: 1,
                  background: "rgba(255,255,255,0.03)",
                  padding: 10,
                  borderRadius: 8,
                  textAlign: "center",
                }}
              >
                <div style={{ fontWeight: 700, color: "var(--gold-1)" }}>7</div>
                <div style={{ color: "var(--muted)", fontSize: 12 }}>
                  North Africa
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* KEY SECTORS */}
      <section className="section container fade-in" style={{ paddingTop: 20 }}>
        <h3 style={{ marginBottom: 12, fontSize: 22, color: "var(--gold-1)" }}>
          Explore Key Sectors
        </h3>

        <div
          className="grid"
          style={{
            gap: 18,
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit, minmax(220px, 1fr))",
          }}
        >
          {sectors.map((s) => (
            <div
              key={s.title}
              className="card fade-scale"
              style={{
                padding: 18,
                minHeight: 150,
                display: "flex",
                flexDirection: "column",
                justifyContent: "space-between",
              }}
            >
              <div style={{ display: "flex", gap: 12, alignItems: "center" }}>
                <div
                  style={{
                    width: 48,
                    height: 48,
                    borderRadius: 10,
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    background: "rgba(255,255,255,0.03)",
                    color: "#fff",
                    transition: "all .2s",
                  }}
                  className="sector-icon"
                >
                  {s.icon}
                </div>

                <div style={{ flex: 1 }}>
                  <div
                    style={{
                      fontWeight: 800,
                      color: "var(--gold-1)",
                      fontSize: 16,
                    }}
                  >
                    {s.title}
                  </div>
                  <div
                    style={{
                      color: "var(--muted)",
                      fontSize: 13,
                      marginTop: 4,
                    }}
                  >
                    {s.desc}
                  </div>
                </div>
              </div>

              <div style={{ marginTop: 12 }}>
                <Link
                  to="/"
                  style={{ color: "var(--gold-2)", fontWeight: 600 }}
                >
                  Learn more →
                </Link>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* MARKETS SNAPSHOT */}
      <section
        className="section container fade-in-slow"
        style={{ paddingTop: 30 }}
      >
        <h3 style={{ fontSize: 22, color: "var(--gold-1)" }}>
          African Markets — Live Snapshot
        </h3>

        <div
          className="market-grid"
          style={{
            marginTop: 16,
            display: "grid",
            gap: 16,
            gridTemplateColumns: "repeat(auto-fit, minmax(260px, 1fr))",
          }}
        >
          <div className="card fade-scale" style={{ padding: 18 }}>
            <div
              style={{ fontWeight: 700, fontSize: 16, color: "var(--gold-1)" }}
            >
              Currencies
            </div>
            <div style={{ marginTop: 10, color: "var(--muted)" }}>
              USD/XOF 650 • EUR/XOF 720 • EGP/USD 49.0
            </div>
          </div>

          <div className="card fade-scale" style={{ padding: 18 }}>
            <div
              style={{ fontWeight: 700, fontSize: 16, color: "var(--gold-1)" }}
            >
              Commodities
            </div>
            <div style={{ marginTop: 10, color: "var(--muted)" }}>
              Gold 1975 • Oil 84.2 • Wheat 345 • Uranium +3.2%
            </div>
          </div>

          <div className="card fade-scale" style={{ padding: 18 }}>
            <div
              style={{ fontWeight: 700, fontSize: 16, color: "var(--gold-1)" }}
            >
              Agricultural Prices
            </div>
            <div style={{ marginTop: 10, color: "var(--muted)" }}>
              Millet • Sorghum • Maize — live feed planned
            </div>
          </div>
        </div>
      </section>

      {/* MARKETPLACE */}
      <section className="section container fade-in" style={{ paddingTop: 30 }}>
        <h3 style={{ fontSize: 22, color: "var(--gold-1)" }}>
          Marketplace — Top Products
        </h3>

        <div
          className="grid"
          style={{
            marginTop: 16,
            display: "grid",
            gap: 16,
            gridTemplateColumns: "repeat(auto-fit, minmax(260px, 1fr))",
          }}
        >
          {[1, 2, 3].map((i) => (
            <div key={i} className="card fade-scale" style={{ padding: 18 }}>
              <div style={{ fontWeight: 700, fontSize: 16 }}>
                Organic Honey — Product {i}
              </div>
              <div
                style={{ color: "var(--muted)", marginTop: 8, fontSize: 13 }}
              >
                Price live: 3.4 USD/kg — Origin: Senegal
              </div>
              <div style={{ marginTop: 14 }}>
                <button className="cta">Contact Seller</button>
              </div>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}
