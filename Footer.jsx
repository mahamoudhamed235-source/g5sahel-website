import React from "react";
import {
  FaFacebookF,
  FaTwitter,
  FaInstagram,
  FaLinkedin,
  FaYoutube,
  FaTiktok,
} from "react-icons/fa";

export default function Footer() {
  return (
    <footer
      style={{
        marginTop: 60,
        padding: "50px 0",
        background: "rgba(0,0,0,0.35)",
        backdropFilter: "blur(12px)",
        borderTop: "1px solid rgba(255,255,255,0.15)",
      }}
    >
      <div className="container" style={{ display: "grid", gap: 40 }}>
        {/* TOP FOOTER SECTIONS */}
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit, minmax(220px, 1fr))",
            gap: 40,
          }}
        >
          {/* ABOUT */}
          <div>
            <h3 style={{ color: "var(--gold-1)", marginBottom: 10 }}>
              About Us
            </h3>
            <p style={{ color: "var(--muted)", fontSize: 14, lineHeight: 1.6 }}>
              G5Sahel.com — A global platform providing insights, data, and
              AI-powered intelligence for the Sahel & North Africa. Trusted by
              investors, analysts, and governments.
            </p>
          </div>

          {/* QUICK LINKS */}
          <div>
            <h3 style={{ color: "var(--gold-1)", marginBottom: 10 }}>
              Quick Links
            </h3>
            {[
              "Our Vision",
              "Our Team",
              "Partners",
              "Knowledge Library",
              "News & Analysis",
              "Events",
            ].map((item) => (
              <p key={item} style={{ color: "var(--muted)", marginBottom: 6 }}>
                {item}
              </p>
            ))}
          </div>

          {/* SUPPORT */}
          <div>
            <h3 style={{ color: "var(--gold-1)", marginBottom: 10 }}>
              Support
            </h3>
            {[
              "Help Center",
              "Customer Support",
              "Contact Us",
              "FAQ",
              "Privacy Policy",
              "Terms of Service",
            ].map((item) => (
              <p key={item} style={{ color: "var(--muted)", marginBottom: 6 }}>
                {item}
              </p>
            ))}
          </div>

          {/* SOCIAL */}
          <div>
            <h3 style={{ color: "var(--gold-1)", marginBottom: 10 }}>
              Connect With Us
            </h3>

            <div style={{ display: "flex", gap: 14 }}>
              <FaFacebookF
                size={20}
                style={{ color: "white", cursor: "pointer" }}
              />
              <FaTwitter
                size={20}
                style={{ color: "white", cursor: "pointer" }}
              />
              <FaInstagram
                size={20}
                style={{ color: "white", cursor: "pointer" }}
              />
              <FaLinkedin
                size={20}
                style={{ color: "white", cursor: "pointer" }}
              />
              <FaYoutube
                size={20}
                style={{ color: "white", cursor: "pointer" }}
              />
              <FaTiktok
                size={20}
                style={{ color: "white", cursor: "pointer" }}
              />
            </div>
          </div>
        </div>

        {/* COPYRIGHT */}
        <div
          style={{
            textAlign: "center",
            paddingTop: 20,
            borderTop: "1px solid rgba(255,255,255,0.1)",
            color: "var(--muted)",
            fontSize: 14,
          }}
        >
          © {new Date().getFullYear()} G5Sahel.com — All Rights Reserved.
        </div>
      </div>
    </footer>
  );
}
