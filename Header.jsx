import React, { useState } from "react";
import { Link } from "react-router-dom";

import {
  MdLanguage,
  MdSearch,
  MdAccountCircle,
  MdNewspaper,
  MdShowChart,
  MdSmartToy,
  MdWork,
  MdMenu,
  MdApps,
  MdTimeline,
} from "react-icons/md";

export default function Header() {
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <>
      {/* TOP BAR */}
      <div
        style={{
          width: "100%",
          padding: "6px 0",
          background: "rgba(0,0,0,0.45)",
          backdropFilter: "blur(10px)",
          borderBottom: "1px solid rgba(255,255,255,0.12)",
        }}
      >
        <div
          className="container"
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            fontSize: 13,
            color: "#E6E9EE",
          }}
        >
          <div style={{ opacity: 0.9 }}>🇸🇦 G5Sahel — Official Platform</div>

          <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
            <MdLanguage size={18} color="var(--gold-1)" />
            <span style={{ cursor: "pointer" }}>EN</span>
            <span style={{ opacity: 0.6 }}>|</span>
            <span style={{ cursor: "pointer" }}>FR</span>
            <span style={{ opacity: 0.6 }}>|</span>
            <span style={{ cursor: "pointer" }}>AR</span>
          </div>
        </div>
      </div>

      {/* MAIN HEADER */}
      <header
        style={{
          width: "100%",
          backdropFilter: "blur(14px)",
          background: "rgba(0,0,0,0.35)",
          borderBottom: "1px solid rgba(255,255,255,0.08)",
          position: "sticky",
          top: 0,
          zIndex: 900,
        }}
      >
        <div
          className="container"
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            padding: "14px 0",
          }}
        >
          {/* LOGO */}
          <Link
            to="/"
            style={{
              fontSize: 24,
              fontWeight: 800,
              letterSpacing: 0.7,
              color: "var(--gold-1)",
            }}
          >
            G5Sahel<span style={{ color: "#E3E8F0" }}>.com</span>
          </Link>

          {/* DESKTOP MENU */}
          <nav className="nav-desktop">
            <Link to="/categories" className="navlink">
              <MdApps size={20} /> Categories
            </Link>

            <Link to="/news" className="navlink">
              <MdNewspaper size={20} /> News
            </Link>

            <Link to="/markets" className="navlink">
              <MdShowChart size={20} /> Markets
            </Link>

            {/* ⭐ FIXED LINK */}
            <Link to="/markets/live" className="navlink">
              <MdTimeline size={20} /> Live Markets
            </Link>

            <Link to="/marketplace" className="navlink">
              <MdShowChart size={20} /> Marketplace
            </Link>

            <Link to="/ai-advisor" className="navlink">
              <MdSmartToy size={20} /> AI Advisor
            </Link>

            <Link to="/jobs" className="navlink">
              <MdWork size={20} /> Jobs
            </Link>
          </nav>

          {/* ACTIONS */}
          <div style={{ display: "flex", alignItems: "center", gap: 16 }}>
            <MdSearch size={22} className="icon-btn" />

            <Link
              to="/dashboard"
              className="cta-small"
              style={{ display: "flex", alignItems: "center", gap: 6 }}
            >
              <MdAccountCircle size={22} /> Dashboard
            </Link>

            <MdMenu
              size={28}
              className="menu-toggle"
              onClick={() => setMenuOpen(!menuOpen)}
            />
          </div>
        </div>

        {/* MOBILE MENU */}
        {menuOpen && (
          <div
            style={{
              background: "rgba(0,0,0,0.85)",
              padding: 20,
              borderTop: "1px solid rgba(255,255,255,0.1)",
            }}
          >
            {[
              ["Categories", "/categories"],
              ["News", "/news"],
              ["Markets", "/markets"],
              ["Live Markets", "/markets/live"], // ← FIXED
              ["Marketplace", "/marketplace"],
              ["AI Advisor", "/ai-advisor"],
              ["Jobs", "/jobs"],
            ].map(([name, path]) => (
              <div key={name} style={{ marginBottom: 16 }}>
                <Link
                  to={path}
                  className="navlink"
                  onClick={() => setMenuOpen(false)}
                  style={{ fontSize: 18 }}
                >
                  {name}
                </Link>
              </div>
            ))}

            <hr
              style={{
                border: "none",
                borderTop: "1px solid rgba(255,255,255,0.2)",
                margin: "14px 0",
              }}
            />

            <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
              <MdLanguage size={20} color="var(--gold-1)" />
              <span>EN</span>
              <span>|</span>
              <span>FR</span>
              <span>|</span>
              <span>AR</span>
            </div>
          </div>
        )}
      </header>
    </>
  );
}
