import React from "react";
import { useParams, Link } from "react-router-dom";
import { MdOutlineAccessTime, MdShare, MdBookmarkBorder } from "react-icons/md";

export default function Article() {
  const { id } = useParams();

  // عينات بيانات (لاحقًا نربط API)
  const SAMPLE_POSTS = {
    1: {
      title: "Major Reform in Sahel Agriculture Boosts Exports",
      date: "Nov 10, 2025",
      author: "G5Sahel Editorial Team",
      content: `
        The Sahel region is witnessing a major transformation in agricultural production.
        New irrigation networks and investments from international partners have enabled
        larger cultivation areas, improved yields, and better export logistics.

        Experts say this reform could make the Sahel one of Africa’s fastest-growing 
        agricultural zones within a few years.

        “This is more than a policy change—it's a full economic shift,” says Dr. Hassan Diarra.
      `,
    },
    2: {
      title: "Regional Energy Pact Signed to Expand Solar Farms",
      date: "Nov 9, 2025",
      author: "African Energy Monitor",
      content: `
        Five countries have signed a historic agreement to develop cross-border solar farms.
        The project aims to power over 14 million homes by 2030 while reducing fossil dependency.

        Gulf investors have shown strong interest in supporting the solar corridor initiative.
      `,
    },
    3: {
      title: "Phosphate Discoveries in North Africa Attract Investment",
      date: "Nov 8, 2025",
      author: "North Africa Mining News",
      content: `
        New phosphate deposits discovered in Algeria and Morocco could reshape 
        the global fertilizer market.

        Early geological surveys show high-grade reserves suitable for long-term extraction.
      `,
    },
    4: {
      title: "Tourism Recovery: Sahel Cultural Routes Reopened",
      date: "Nov 6, 2025",
      author: "Sahel Travel Agency",
      content: `
        After years of closures, cultural heritage routes across the Sahel are reopening.
        Tourists can now enjoy guided safaris, ancient rock art sites, and Tuareg cultural experiences.
      `,
    },
  };

  const article = SAMPLE_POSTS[id];

  if (!article) {
    return (
      <div className="container" style={{ padding: "40px 0" }}>
        <h2 style={{ color: "var(--gold-1)", marginBottom: 20 }}>
          Article not found
        </h2>
        <Link to="/news" style={{ color: "var(--gold-2)" }}>
          ← Back to News
        </Link>
      </div>
    );
  }

  return (
    <div className="container" style={{ padding: "40px 0 80px" }}>
      {/* TITLE */}
      <h1
        style={{
          fontSize: 34,
          fontWeight: 800,
          color: "#E6E9EE",
          marginBottom: 12,
        }}
      >
        {article.title}
      </h1>

      {/* META INFO */}
      <div
        style={{
          display: "flex",
          gap: 20,
          alignItems: "center",
          marginBottom: 25,
          color: "var(--muted)",
        }}
      >
        <div style={{ display: "flex", alignItems: "center", gap: 6 }}>
          <MdOutlineAccessTime size={18} /> {article.date}
        </div>
        <div>By: {article.author}</div>

        <div style={{ marginLeft: "auto", display: "flex", gap: 16 }}>
          <MdShare size={22} style={{ cursor: "pointer" }} />
          <MdBookmarkBorder size={22} style={{ cursor: "pointer" }} />
        </div>
      </div>

      {/* HERO IMAGE */}
      <img
        src="https://images.unsplash.com/photo-1501785888041-af3ef285b470?auto=format&fit=crop&w=1200&q=60"
        alt="Article Cover"
        style={{
          width: "100%",
          height: 340,
          objectFit: "cover",
          borderRadius: 14,
          marginBottom: 30,
          boxShadow: "0 10px 40px rgba(0,0,0,0.5)",
        }}
      />

      {/* CONTENT */}
      <article
        style={{
          color: "#DDE3EC",
          fontSize: 18,
          lineHeight: 1.7,
          whiteSpace: "pre-line",
        }}
      >
        {article.content}
      </article>

      {/* QUOTE */}
      <blockquote
        style={{
          marginTop: 40,
          padding: "20px 24px",
          borderLeft: "5px solid var(--gold-1)",
          background: "rgba(255,255,255,0.05)",
          borderRadius: 8,
          fontStyle: "italic",
          color: "var(--gold-2)",
        }}
      >
        “This analysis reflects ongoing economic transitions shaping the future
        of the Sahel region.”
      </blockquote>
      {/* RELATED ARTICLES */}
      <div style={{ marginTop: 50 }}>
        <h2
          style={{
            color: "var(--gold-1)",
            marginBottom: 20,
            fontSize: 24,
            fontWeight: 700,
          }}
        >
          Related Articles
        </h2>

        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit, minmax(260px, 1fr))",
            gap: 20,
          }}
        >
          {[1, 2, 3].map((rid) => (
            <Link
              to={`/news/${rid}`}
              key={rid}
              style={{
                background: "rgba(255,255,255,0.05)",
                padding: 16,
                borderRadius: 10,
                textDecoration: "none",
                color: "#E6E9EE",
                boxShadow: "0 6px 20px rgba(0,0,0,0.3)",
              }}
            >
              <div
                style={{
                  height: 120,
                  background:
                    "linear-gradient(135deg, rgba(10,36,99,0.5), rgba(212,175,55,0.2))",
                  borderRadius: 8,
                  marginBottom: 12,
                }}
              />

              <div style={{ fontWeight: 700, marginBottom: 6 }}>
                {SAMPLE_POSTS[rid].title}
              </div>

              <div style={{ color: "var(--muted)", fontSize: 14 }}>
                {SAMPLE_POSTS[rid].date}
              </div>

              <div style={{ marginTop: 10, color: "var(--gold-2)" }}>
                Read more →
              </div>
            </Link>
          ))}
        </div>
      </div>
      {/* COMMENTS SECTION */}
      <div style={{ marginTop: 50 }}>
        <h2
          style={{
            color: "var(--gold-1)",
            marginBottom: 20,
            fontSize: 24,
            fontWeight: 700,
          }}
        >
          Comments
        </h2>

        {/* COMMENT FORM */}
        <div
          style={{
            background: "rgba(255,255,255,0.05)",
            padding: 20,
            borderRadius: 10,
            marginBottom: 30,
          }}
        >
          <input
            id="commentName"
            placeholder="Your name"
            style={{
              width: "100%",
              padding: 10,
              borderRadius: 6,
              marginBottom: 10,
              border: "1px solid rgba(255,255,255,0.15)",
              background: "rgba(0,0,0,0.2)",
              color: "#E6E9EE",
            }}
          />

          <textarea
            id="commentText"
            placeholder="Write your comment..."
            rows="4"
            style={{
              width: "100%",
              padding: 10,
              borderRadius: 6,
              border: "1px solid rgba(255,255,255,0.15)",
              background: "rgba(0,0,0,0.2)",
              color: "#E6E9EE",
            }}
          ></textarea>

          <button
            onClick={() => {
              const name = document.getElementById("commentName").value.trim();
              const text = document.getElementById("commentText").value.trim();
              if (!name || !text) return alert("Please fill all fields.");

              const list = document.getElementById("commentsList");
              const item = document.createElement("div");
              item.style = `
          background: rgba(255,255,255,0.05);
          padding: 12px;
          border-radius: 8px;
          margin-bottom: 10px;
        `;
              item.innerHTML = `
          <strong style="color: var(--gold-1)">${name}</strong>
          <p style="margin: 6px 0; color: #DDE3EC">${text}</p>
        `;
              list.prepend(item);

              document.getElementById("commentName").value = "";
              document.getElementById("commentText").value = "";
            }}
            style={{
              marginTop: 12,
              padding: "10px 18px",
              background: "var(--gold-1)",
              color: "#000",
              fontWeight: 700,
              border: "none",
              borderRadius: 6,
              cursor: "pointer",
            }}
          >
            Publish
          </button>
        </div>

        {/* COMMENTS LIST */}
        <div id="commentsList"></div>
      </div>

      {/* BACK BUTTON */}
      <div style={{ marginTop: 40 }}>
        <Link
          to="/news"
          style={{
            color: "var(--gold-2)",
            fontWeight: 700,
            fontSize: 16,
          }}
        >
          ← Back to News
        </Link>
      </div>
    </div>
  );
}
