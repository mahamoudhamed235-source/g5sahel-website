import React, { useState } from "react";

export default function AdminLogin() {
  const [email, setEmail] = useState("");
  const [pass, setPass] = useState("");

  function handleLogin() {
    if (email === "admin@g5sahel.com" && pass === "123456") {
      localStorage.setItem("admin_auth", "true");
      window.location.href = "/admin/dashboard";
    } else {
      alert("Invalid email or password.");
    }
  }

  return (
    <div
      style={{
        minHeight: "100vh",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        background:
          "linear-gradient(135deg, rgba(10,36,99,0.65), rgba(212,175,55,0.15))",
        padding: 20,
      }}
    >
      <div
        style={{
          width: "100%",
          maxWidth: 420,
          background: "rgba(0,0,0,0.55)",
          padding: 30,
          borderRadius: 18,
          boxShadow: "0 8px 40px rgba(0,0,0,0.35)",
          backdropFilter: "blur(10px)",
          border: "1px solid rgba(255,255,255,0.1)",
        }}
      >
        <h2
          style={{
            textAlign: "center",
            color: "var(--gold-1)",
            marginBottom: 30,
            fontSize: 28,
            fontWeight: 800,
          }}
        >
          Admin Login
        </h2>

        <div style={{ display: "grid", gap: 14 }}>
          <input
            type="email"
            placeholder="Admin Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            style={{
              padding: 14,
              borderRadius: 10,
              background: "rgba(255,255,255,0.07)",
              border: "1px solid rgba(255,255,255,0.1)",
              color: "#fff",
            }}
          />

          <input
            type="password"
            placeholder="Password"
            value={pass}
            onChange={(e) => setPass(e.target.value)}
            style={{
              padding: 14,
              borderRadius: 10,
              background: "rgba(255,255,255,0.07)",
              border: "1px solid rgba(255,255,255,0.1)",
              color: "#fff",
            }}
          />

          <button
            onClick={handleLogin}
            style={{
              padding: 14,
              borderRadius: 10,
              marginTop: 10,
              background: "var(--gold-1)",
              border: "none",
              fontWeight: 700,
              cursor: "pointer",
            }}
          >
            Login
          </button>
        </div>
      </div>
    </div>
  );
}
