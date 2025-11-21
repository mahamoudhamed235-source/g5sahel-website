import React, { useEffect, useState } from "react";

/**
 * WishlistButton
 * props:
 *   id (string) - product id
 *   product (object) - optional product data to store
 */
export default function WishlistButton({ id, product }) {
  const KEY = "g5_wishlist_v1";
  const [saved, setSaved] = useState(false);

  useEffect(() => {
    try {
      const raw = localStorage.getItem(KEY);
      const list = raw ? JSON.parse(raw) : {};
      setSaved(Boolean(list[id]));
    } catch (e) {
      setSaved(false);
    }
  }, [id]);

  function toggle() {
    const raw = localStorage.getItem(KEY);
    const list = raw ? JSON.parse(raw) : {};
    if (list[id]) {
      delete list[id];
      localStorage.setItem(KEY, JSON.stringify(list));
      setSaved(false);
    } else {
      // store minimal product snapshot (can extend later)
      list[id] = {
        id,
        title: product?.title || "Untitled",
        image: product?.images?.[0] || null,
        price: product?.price || null,
        date: new Date().toISOString(),
      };
      localStorage.setItem(KEY, JSON.stringify(list));
      setSaved(true);
    }
    // dispatch event so other parts of the app can react
    window.dispatchEvent(
      new CustomEvent("g5_wishlist_changed", { detail: { id } })
    );
  }

  return (
    <button
      onClick={toggle}
      title={saved ? "Remove from Wishlist" : "Add to Wishlist"}
      style={{
        padding: "8px 12px",
        borderRadius: 10,
        border: "none",
        cursor: "pointer",
        background: saved ? "var(--gold-1)" : "rgba(255,255,255,0.06)",
        color: saved ? "#000" : "var(--gold-1)",
        fontWeight: 700,
      }}
    >
      {saved ? "Saved ✓" : "Save"}
    </button>
  );
}
