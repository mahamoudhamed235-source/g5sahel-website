import React, { useState, useEffect } from "react";
import { PRODUCTS } from "../data/products";

export default function UserDashboard() {
  const [activeTab, setActiveTab] = useState("overview");

  /* Saved Jobs */
  const [savedJobs, setSavedJobs] = useState([]);

  /* Applications */
  const [applications, setApplications] = useState([]);

  /* Wishlist */
  const [wishlist, setWishlist] = useState([]);

  /* Profile */
  const [profile, setProfile] = useState({
    name: "",
    email: "",
    phone: "",
    country: "",
  });

  /* Load all data when page opens */
  useEffect(() => {
    const saved = JSON.parse(localStorage.getItem("saved_jobs")) || [];
    setSavedJobs(saved);

    const apps = JSON.parse(localStorage.getItem("job_applications")) || [];
    setApplications(apps);

    const w = JSON.parse(localStorage.getItem("wishlist")) || [];
    setWishlist(w);

    const user = JSON.parse(localStorage.getItem("user_profile")) || profile;
    setProfile(user);
  }, []);

  function saveProfile() {
    localStorage.setItem("user_profile", JSON.stringify(profile));
    alert("Profile updated successfully!");
  }

  /* Remove from wishlist */
  function removeFromWishlist(id) {
    const updated = wishlist.filter((pid) => pid !== id);
    setWishlist(updated);
    localStorage.setItem("wishlist", JSON.stringify(updated));
  }

  /* Wishlist product objects */
  const wishlistProducts = PRODUCTS.filter((p) => wishlist.includes(p.id));

  return (
    <div className="container" style={{ padding: "40px 0 80px" }}>
      <h1 style={{ color: "var(--gold-1)", fontSize: 32, marginBottom: 20 }}>
        User Dashboard
      </h1>

      {/* 🔥 Navigation Tabs */}
      <div
        style={{
          display: "flex",
          gap: 14,
          marginBottom: 30,
          borderBottom: "1px solid rgba(255,255,255,0.1)",
          paddingBottom: 12,
        }}
      >
        {[
          ["overview", "Overview"],
          ["wishlist", "Wishlist"],
          ["saved", "Saved Jobs"],
          ["applications", "Applications"],
          ["profile", "Profile"],
        ].map(([key, label]) => (
          <div
            key={key}
            onClick={() => setActiveTab(key)}
            style={{
              padding: "10px 16px",
              cursor: "pointer",
              borderRadius: 8,
              background:
                activeTab === key
                  ? "rgba(212,175,55,0.25)"
                  : "rgba(255,255,255,0.06)",
              border:
                activeTab === key
                  ? "1px solid var(--gold-1)"
                  : "1px solid rgba(255,255,255,0.1)",
            }}
          >
            {label}
          </div>
        ))}
      </div>

      {/* -------------------------------------------------- */}
      {/*                       OVERVIEW                     */}
      {/* -------------------------------------------------- */}
      {activeTab === "overview" && (
        <div>
          <h2 style={{ color: "var(--gold-1)" }}>Overview</h2>

          <div
            style={{
              display: "grid",
              gridTemplateColumns: "1fr 1fr 1fr",
              gap: 20,
              marginTop: 20,
            }}
          >
            <div className="card" style={{ padding: 20 }}>
              <h3 style={{ color: "var(--gold-1)" }}>Wishlist</h3>
              <div style={{ fontSize: 22 }}>{wishlist.length}</div>
            </div>

            <div className="card" style={{ padding: 20 }}>
              <h3 style={{ color: "var(--gold-1)" }}>Saved Jobs</h3>
              <div style={{ fontSize: 22 }}>{savedJobs.length}</div>
            </div>

            <div className="card" style={{ padding: 20 }}>
              <h3 style={{ color: "var(--gold-1)" }}>Applications</h3>
              <div style={{ fontSize: 22 }}>{applications.length}</div>
            </div>
          </div>
        </div>
      )}

      {/* -------------------------------------------------- */}
      {/*                    WISHLIST TAB                   */}
      {/* -------------------------------------------------- */}
      {activeTab === "wishlist" && (
        <div>
          <h2 style={{ color: "var(--gold-1)" }}>Wishlist</h2>

          {wishlistProducts.length === 0 ? (
            <p style={{ color: "var(--muted)", marginTop: 20 }}>
              You haven’t added any products to your wishlist yet.
            </p>
          ) : (
            <div
              style={{
                marginTop: 20,
                display: "grid",
                gridTemplateColumns: "repeat(auto-fill, minmax(260px, 1fr))",
                gap: 18,
              }}
            >
              {wishlistProducts.map((p) => (
                <div
                  key={p.id}
                  className="card"
                  style={{
                    padding: 14,
                    borderRadius: 12,
                    background: "rgba(255,255,255,0.05)",
                  }}
                >
                  <img
                    src={p.images[0]}
                    alt={p.title}
                    style={{
                      width: "100%",
                      height: 160,
                      objectFit: "cover",
                      borderRadius: 10,
                    }}
                  />

                  <h3
                    style={{
                      fontSize: 17,
                      fontWeight: 700,
                      marginTop: 10,
                      color: "var(--gold-1)",
                    }}
                  >
                    {p.title}
                  </h3>

                  <div style={{ opacity: 0.8, marginTop: 4 }}>{p.price}</div>
                  <div style={{ color: "var(--gold-2)", marginTop: 4 }}>
                    {p.country}
                  </div>

                  <div
                    style={{
                      display: "flex",
                      justifyContent: "space-between",
                      marginTop: 12,
                    }}
                  >
                    <a
                      href={`/marketplace/product/${p.id}`}
                      className="btn"
                      style={{
                        padding: "8px 14px",
                        borderRadius: 8,
                      }}
                    >
                      View
                    </a>

                    <button
                      className="btn"
                      style={{
                        padding: "8px 14px",
                        borderRadius: 8,
                        background: "darkred",
                        color: "white",
                      }}
                      onClick={() => removeFromWishlist(p.id)}
                    >
                      Remove
                    </button>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      )}

      {/* -------------------------------------------------- */}
      {/*                    SAVED JOBS                     */}
      {/* -------------------------------------------------- */}
      {activeTab === "saved" && (
        <div>
          <h2 style={{ color: "var(--gold-1)" }}>Saved Jobs</h2>

          {savedJobs.length === 0 ? (
            <p style={{ color: "var(--muted)" }}>No saved jobs.</p>
          ) : (
            <div style={{ marginTop: 20, display: "grid", gap: 14 }}>
              {savedJobs.map((job, i) => (
                <div
                  key={i}
                  className="card"
                  style={{
                    padding: 16,
                    borderRadius: 12,
                    background: "rgba(255,255,255,0.05)",
                  }}
                >
                  <h3>{job.title}</h3>
                  <div>{job.company}</div>
                  <div style={{ color: "var(--gold-2)" }}>
                    Location: {job.location}
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      )}

      {/* -------------------------------------------------- */}
      {/*                    APPLICATIONS                    */}
      {/* -------------------------------------------------- */}
      {activeTab === "applications" && (
        <div>
          <h2 style={{ color: "var(--gold-1)" }}>Applications</h2>

          {applications.length === 0 ? (
            <p style={{ color: "var(--muted)" }}>You have no applications.</p>
          ) : (
            <div style={{ marginTop: 20, display: "grid", gap: 14 }}>
              {applications.map((a, i) => (
                <div
                  key={i}
                  className="card"
                  style={{
                    padding: 16,
                    background: "rgba(255,255,255,0.1)",
                    borderRadius: 12,
                  }}
                >
                  <h3>{a.title}</h3>
                  <div>Company: {a.company}</div>
                  <div>Email: {a.email}</div>
                  <div>Phone: {a.phone}</div>
                  <small style={{ opacity: 0.7 }}>Submitted: {a.date}</small>
                </div>
              ))}
            </div>
          )}
        </div>
      )}

      {/* -------------------------------------------------- */}
      {/*                     PROFILE TAB                    */}
      {/* -------------------------------------------------- */}
      {activeTab === "profile" && (
        <div style={{ maxWidth: 500 }}>
          <h2 style={{ color: "var(--gold-1)" }}>Profile Information</h2>

          <div style={{ marginTop: 20, display: "grid", gap: 14 }}>
            <input
              placeholder="Full Name"
              value={profile.name}
              onChange={(e) => setProfile({ ...profile, name: e.target.value })}
              className="input"
            />

            <input
              placeholder="Email"
              value={profile.email}
              onChange={(e) =>
                setProfile({ ...profile, email: e.target.value })
              }
              className="input"
            />

            <input
              placeholder="Phone"
              value={profile.phone}
              onChange={(e) =>
                setProfile({ ...profile, phone: e.target.value })
              }
              className="input"
            />

            <input
              placeholder="Country"
              value={profile.country}
              onChange={(e) =>
                setProfile({ ...profile, country: e.target.value })
              }
              className="input"
            />

            <button onClick={saveProfile} className="cta">
              Save Changes
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
