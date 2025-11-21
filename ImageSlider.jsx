import React, { useState } from "react";

export default function ImageSlider({ images = [] }) {
  const [main, setMain] = useState(images[0]);

  if (!images || images.length === 0) {
    return (
      <div
        style={{
          height: 420,
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          background: "rgba(255,255,255,0.05)",
          borderRadius: 14,
          color: "var(--muted)",
        }}
      >
        No image available
      </div>
    );
  }

  return (
    <div>
      {/* MAIN IMAGE */}
      <div
        style={{
          width: "100%",
          height: 420,
          borderRadius: 14,
          overflow: "hidden",
        }}
      >
        <img
          src={main}
          alt="product"
          style={{
            width: "100%",
            height: "100%",
            objectFit: "cover",
            transition: "0.3s",
            cursor: "zoom-in",
          }}
          onClick={() => window.open(main, "_blank")}
        />
      </div>

      {/* THUMBNAILS */}
      <div
        style={{
          display: "flex",
          gap: 10,
          marginTop: 12,
          overflowX: "auto",
          paddingBottom: 8,
        }}
      >
        {images.map((img, i) => (
          <img
            key={i}
            src={img}
            alt="thumb"
            onClick={() => setMain(img)}
            style={{
              width: 90,
              height: 70,
              borderRadius: 8,
              objectFit: "cover",
              cursor: "pointer",
              border:
                main === img
                  ? "2px solid var(--gold-1)"
                  : "2px solid transparent",
              opacity: main === img ? 1 : 0.6,
              transition: "0.2s",
            }}
          />
        ))}
      </div>
    </div>
  );
}
