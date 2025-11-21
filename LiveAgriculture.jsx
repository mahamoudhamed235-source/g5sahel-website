import React, { useEffect, useMemo, useState } from "react";
import { Link } from "react-router-dom";

/**
 * LiveAgriculture.jsx
 * شاشــة احترافية للأسواق الزراعية الحية — محاكاة بيانات (قابلة للربط بواجهة API لاحقاً)
 *
 * مميزات:
 * - أكثر من 20 منتج زراعي أساسي (قمح، ذرة، سمسم، قطن، كاكاو، قهوة، شاي، صمغ عربي ...إلخ)
 * - تحديثات سعرية متكررة (محاكاة real-time)
 * - sparkline صغيرة لكل منتج (SVG بسيط)
 * - أزرار للوصول لصفحات المنتج / category (روابط داخلية)
 * - تصميم responsive مناسب للهاتف والكمبيوتر (اعتمدت على CSS داخلية بسيطة)
 */

/* —————— بيانات أولية شاملة للمنتجات الزراعية —————— */
const INITIAL_PRODUCTS = [
  {
    id: "wheat",
    title: "Wheat (القمح)",
    unit: "USD/ton",
    price: 370,
    country: "Regional",
  },
  {
    id: "maize",
    title: "Maize (الذرة)",
    unit: "USD/ton",
    price: 260,
    country: "Regional",
  },
  {
    id: "rice",
    title: "Rice (الأرز)",
    unit: "USD/ton",
    price: 420,
    country: "Regional",
  },
  {
    id: "sorghum",
    title: "Sorghum (السورغم)",
    unit: "USD/ton",
    price: 210,
    country: "Sahel",
  },
  {
    id: "sesame",
    title: "Sesame (السمسم)",
    unit: "USD/ton",
    price: 1800,
    country: "West Africa",
  },
  {
    id: "cotton",
    title: "Cotton (القطن)",
    unit: "USD/ton",
    price: 1250,
    country: "Sahel / North Africa",
  },
  {
    id: "cocoa",
    title: "Cocoa (الكاكاو)",
    unit: "USD/ton",
    price: 3500,
    country: "West Africa",
  },
  {
    id: "coffee",
    title: "Coffee (القهوة)",
    unit: "USD/ton",
    price: 3200,
    country: "East & West Africa",
  },
  {
    id: "tea",
    title: "Tea (الشاي)",
    unit: "USD/ton",
    price: 1500,
    country: "East Africa",
  },
  {
    id: "peanut",
    title: "Peanut (الفول السوداني)",
    unit: "USD/ton",
    price: 750,
    country: "Sahel",
  },
  {
    id: "rubber",
    title: "Natural Rubber (المطاط الطبيعي)",
    unit: "USD/ton",
    price: 1400,
    country: "West Africa",
  },
  {
    id: "gumarabic",
    title: "Gum Arabic (الصمغ العربي)",
    unit: "USD/kg",
    price: 3.5,
    country: "Chad / Sudan",
  },
  {
    id: "honey",
    title: "Honey (العسل)",
    unit: "USD/kg",
    price: 6.8,
    country: "Sahel Forests",
  },
  {
    id: "palm",
    title: "Palm Oil (زيت النخيل)",
    unit: "USD/ton",
    price: 900,
    country: "West Africa",
  },
  {
    id: "soy",
    title: "Soybean (فول الصويا)",
    unit: "USD/ton",
    price: 480,
    country: "Regional",
  },
  {
    id: "cassava",
    title: "Cassava (الكسافا)",
    unit: "USD/ton",
    price: 120,
    country: "West Africa",
  },
  {
    id: "sugarcane",
    title: "Sugar Cane (قصب السكر)",
    unit: "USD/ton",
    price: 40,
    country: "Regional",
  },
  {
    id: "olive",
    title: "Olive Oil (زيت الزيتون)",
    unit: "USD/ton",
    price: 3200,
    country: "North Africa",
  },
  {
    id: "moringa",
    title: "Moringa (المورينجا)",
    unit: "USD/ton",
    price: 2200,
    country: "Sahel",
  },
  {
    id: "cottonseed",
    title: "Cottonseed (بذور القطن)",
    unit: "USD/ton",
    price: 240,
    country: "Sahel",
  },
];

/* —————— مساعدة: توليد سجل تاريخي صغير لكل سلعة (لايرجع للخادم) —————— */
function initHistory(price) {
  const arr = [];
  // آخر 12 نقطة (مثلاً 12 ساعة أو 12 دقيقة) — مجرد محاكاة
  for (let i = 0; i < 12; i++) {
    // تباين عشوائي محدود
    const variance = (Math.random() - 0.5) * price * 0.01;
    arr.push(Number((price + variance).toFixed(4)));
  }
  return arr;
}

/* —————— رسم sparkline (مخطط صغير SVG) —————— */
function Sparkline({
  values = [],
  color = "#D4AF37",
  width = 100,
  height = 28,
}) {
  if (!values || values.length === 0) return null;
  const min = Math.min(...values);
  const max = Math.max(...values);
  const len = values.length;
  const points = values
    .map((v, i) => {
      const x = (i / (len - 1)) * width;
      const y =
        max === min ? height / 2 : height - ((v - min) / (max - min)) * height;
      return `${x},${y}`;
    })
    .join(" ");
  const last = values[values.length - 1];
  const first = values[0];
  const change = ((last - first) / first) * 100;
  return (
    <svg
      width={width}
      height={height}
      viewBox={`0 0 ${width} ${height}`}
      xmlns="http://www.w3.org/2000/svg"
      role="img"
      aria-label="sparkline"
    >
      <polyline
        fill="none"
        stroke={color}
        strokeWidth="2"
        points={points}
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      {/* subtle area */}
      <polyline
        fill="none"
        strokeOpacity="0.06"
        stroke={color}
        strokeWidth="8"
        points={points}
      />
      <text
        x={width - 2}
        y={12}
        fontSize="9"
        textAnchor="end"
        fill={change >= 0 ? "#8CE99A" : "#FF8C8C"}
      >
        {change >= 0 ? `+${change.toFixed(2)}%` : `${change.toFixed(2)}%`}
      </text>
    </svg>
  );
}

/* —————— CSS داخلية بسيطة —————— */
const styles = {
  container: { padding: "28px 16px", maxWidth: 1200, margin: "0 auto" },
  headerRow: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    gap: 12,
    flexWrap: "wrap",
  },
  searchInput: {
    padding: "10px 12px",
    borderRadius: 10,
    width: 340,
    border: "none",
    outline: "none",
    background: "rgba(255,255,255,0.04)",
    color: "#E6E9EE",
  },
  grid: { marginTop: 20, display: "grid", gap: 12, gridTemplateColumns: "1fr" },
  card: {
    display: "flex",
    justifyContent: "space-between",
    gap: 12,
    padding: 14,
    borderRadius: 12,
    alignItems: "center",
    background:
      "linear-gradient(135deg, rgba(10,36,99,0.22), rgba(212,175,55,0.03))",
    border: "1px solid rgba(255,255,255,0.04)",
  },
  leftCol: { display: "flex", gap: 12, alignItems: "center", minWidth: 220 },
  productTitle: { fontWeight: 800, color: "var(--gold-1)" },
  muted: { color: "var(--muted)" },
  cta: {
    background: "var(--gold-1)",
    color: "#000",
    padding: "8px 12px",
    borderRadius: 8,
    border: "none",
    fontWeight: 700,
    cursor: "pointer",
  },
};

export default function LiveAgriculture() {
  const [query, setQuery] = useState("");
  const [products, setProducts] = useState(() =>
    INITIAL_PRODUCTS.map((p) => ({
      ...p,
      history: initHistory(p.price),
      price: Number(p.price),
      lastUpdate: new Date().toLocaleTimeString(),
    }))
  );
  const [paused, setPaused] = useState(false);
  const [filterRegion, setFilterRegion] = useState("all");

  /* محاكاة التحديث الحي: تعديل الأسعار صغيرًا كل 2.5 ثانية */
  useEffect(() => {
    const id = setInterval(() => {
      if (paused) return;
      setProducts((prev) =>
        prev.map((p) => {
          // نسبة تغيير عشوائية صغيرة تعتمد على نوع السلعة
          const volatility =
            p.id === "sesame" || p.id === "cocoa" ? 0.015 : 0.006;
          const changePct = (Math.random() - 0.5) * volatility * 2;
          const newPrice = Number((p.price * (1 + changePct)).toFixed(4));
          const newHistory = [...p.history.slice(-11), newPrice];
          return {
            ...p,
            price: newPrice,
            history: newHistory,
            lastUpdate: new Date().toLocaleTimeString(),
          };
        })
      );
    }, 2500);

    return () => clearInterval(id);
  }, [paused]);

  const regions = useMemo(
    () => ["all", ...Array.from(new Set(products.map((p) => p.country)))],
    [products]
  );

  const visible = products.filter((p) => {
    const q = query.trim().toLowerCase();
    if (filterRegion !== "all" && p.country !== filterRegion) return false;
    if (!q) return true;
    return (
      p.title.toLowerCase().includes(q) ||
      p.id.toLowerCase().includes(q) ||
      p.country.toLowerCase().includes(q)
    );
  });

  return (
    <div style={styles.container}>
      {/* HEADER */}
      <div style={styles.headerRow}>
        <div>
          <h1 style={{ fontSize: 28, margin: 0, color: "#E6E9EE" }}>
            Live Agriculture Markets
          </h1>
          <div style={{ marginTop: 6, color: "var(--muted)" }}>
            Real-time snapshot — prices & momentum for Sahel & North Africa
            agricultural markets
          </div>
        </div>

        <div style={{ display: "flex", gap: 8, alignItems: "center" }}>
          <input
            placeholder="Search product, country or id..."
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            style={styles.searchInput}
          />

          <select
            value={filterRegion}
            onChange={(e) => setFilterRegion(e.target.value)}
            style={{
              padding: 10,
              borderRadius: 10,
              background: "rgba(255,255,255,0.04)",
              color: "#E6E9EE",
              border: "none",
            }}
          >
            {regions.map((r) => (
              <option key={r} value={r}>
                {r === "all" ? "All regions" : r}
              </option>
            ))}
          </select>

          <button
            onClick={() => setPaused((s) => !s)}
            style={{
              padding: "8px 12px",
              borderRadius: 10,
              border: "none",
              background: paused ? "rgba(255,255,255,0.08)" : "var(--gold-1)",
              cursor: "pointer",
            }}
          >
            {paused ? "Resume" : "Pause"}
          </button>

          <Link to="/marketplace" style={{ textDecoration: "none" }}>
            <button style={{ ...styles.cta, marginLeft: 6 }}>
              Marketplace
            </button>
          </Link>
        </div>
      </div>

      {/* GRID */}
      <div style={{ marginTop: 18 }}>
        <div
          style={{
            display: "flex",
            gap: 12,
            fontSize: 13,
            color: "var(--muted)",
            marginBottom: 8,
          }}
        >
          <div
            style={{ minWidth: 220, fontWeight: 700, color: "var(--gold-1)" }}
          >
            Product
          </div>
          <div style={{ flex: 1 }} />
          <div
            style={{
              width: 120,
              textAlign: "right",
              fontWeight: 700,
              color: "var(--gold-1)",
            }}
          >
            Price
          </div>
        </div>

        <div style={styles.grid}>
          {visible.map((p) => {
            const hist = p.history || [];
            const changePct =
              ((hist[hist.length - 1] - hist[0]) / hist[0]) * 100;
            const up = changePct >= 0;
            return (
              <div key={p.id} style={styles.card}>
                <div style={styles.leftCol}>
                  <div
                    style={{
                      width: 56,
                      height: 56,
                      borderRadius: 10,
                      background: "rgba(255,255,255,0.03)",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      fontWeight: 800,
                    }}
                  >
                    {p.id.slice(0, 2).toUpperCase()}
                  </div>

                  <div>
                    <div style={styles.productTitle}>{p.title}</div>
                    <div style={{ ...styles.muted, fontSize: 13 }}>
                      {p.country} • unit: {p.unit}
                    </div>
                    <div
                      style={{
                        marginTop: 6,
                        fontSize: 12,
                        color: "var(--muted)",
                      }}
                    >
                      Last update: {p.lastUpdate}
                    </div>
                  </div>
                </div>

                <div style={{ display: "flex", alignItems: "center", gap: 18 }}>
                  <div style={{ textAlign: "right", minWidth: 140 }}>
                    <div style={{ fontWeight: 800, fontSize: 18 }}>
                      {p.price.toLocaleString(undefined, {
                        maximumFractionDigits: 4,
                      })}
                    </div>
                    <div
                      style={{
                        color: up ? "#8CE99A" : "#FF8C8C",
                        fontSize: 13,
                        marginTop: 4,
                      }}
                    >
                      {up ? "▲" : "▼"} {changePct.toFixed(2)}%
                    </div>
                  </div>

                  <Sparkline
                    values={hist}
                    color={up ? "#8CE99A" : "#FF8C8C"}
                    width={140}
                    height={36}
                  />

                  <div
                    style={{
                      minWidth: 120,
                      display: "flex",
                      flexDirection: "column",
                      gap: 8,
                    }}
                  >
                    <Link
                      to={`/marketplace/product/${p.id}`}
                      style={{ textDecoration: "none" }}
                    >
                      <button
                        style={{
                          padding: "8px 12px",
                          borderRadius: 8,
                          border: "none",
                          background: "rgba(255,255,255,0.06)",
                          color: "#E6E9EE",
                          cursor: "pointer",
                        }}
                      >
                        View
                      </button>
                    </Link>

                    <button
                      onClick={() =>
                        alert(
                          `Request quote for ${p.title}\n(تعمل حاليا محليًا — ستربط بـ API لاحقًا)`
                        )
                      }
                      style={{ ...styles.cta }}
                    >
                      Request Quote
                    </button>
                  </div>
                </div>
              </div>
            );
          })}

          {visible.length === 0 && (
            <div style={{ color: "var(--muted)", padding: 20 }}>
              No products match your search or filter.
            </div>
          )}
        </div>
      </div>

      {/* FOOTER NOTE */}
      <div style={{ marginTop: 20, color: "var(--muted)", fontSize: 13 }}>
        Tip: This screen uses simulated live data for demo. Connect to real
        market feeds (FAO, local exchanges, commodity APIs) later for
        production-grade live pricing.
      </div>
    </div>
  );
}
