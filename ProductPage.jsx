import React, { useState, useEffect } from "react";
import { useParams, Link, useNavigate } from "react-router-dom";
import { PRODUCTS } from "../data/products";
import RatingBox from "../components/RatingBox";
import ImageSlider from "../components/ImageSlider";

export default function ProductPage() {
  const { id } = useParams();
  const navigate = useNavigate();

  const product = PRODUCTS.find((p) => p.id === id);

  const [qty, setQty] = useState(1);
  const [message, setMessage] = useState("");
  const [requests, setRequests] = useState([]);
  const [reviews, setReviews] = useState([]);

  const [wishlist, setWishlist] = useState([]);

  /* LOAD WISHLIST FROM LOCAL STORAGE */
  useEffect(() => {
    const saved = JSON.parse(localStorage.getItem("wishlist")) || [];
    setWishlist(saved);
  }, []);

  /* SAVE WISHLIST WHEN UPDATED */
  useEffect(() => {
    localStorage.setItem("wishlist", JSON.stringify(wishlist));
  }, [wishlist]);

  if (!product) {
    return (
      <div className="container" style={{ padding: 40 }}>
        <h2 style={{ color: "var(--gold-1)" }}>Product not found</h2>
        <Link to="/marketplace" style={{ color: "var(--gold-2)" }}>
          ← Back to Marketplace
        </Link>
      </div>
    );
  }

  /* WISHLIST HANDLERS */
  const isWishlisted = wishlist.includes(product.id);

  function toggleWishlist() {
    if (isWishlisted) {
      setWishlist(wishlist.filter((pid) => pid !== product.id));
    } else {
      setWishlist([...wishlist, product.id]);
    }
  }

  /* SEND QUOTE */
  function sendQuote() {
    if (!message) return alert("Please enter a message.");

    const newReq = {
      id: Date.now(),
      qty,
      message,
      date: new Date().toLocaleString(),
    };

    setRequests([newReq, ...requests]);
    setMessage("");
    setQty(1);

    alert("Your quote request has been sent!");
  }

  /* PUBLISH REVIEW */
  function publishReview(rating) {
    if (!message) return alert("Write a comment first.");

    const newReview = {
      id: Date.now(),
      rating,
      comment: message,
      date: new Date().toLocaleDateString(),
    };

    setReviews([newReview, ...reviews]);
    setMessage("");
  }

  /* CONTACT SELLER */
  function contactSeller() {
    alert(
      `Contact Seller:\nName: ${product.seller}\nProduct: ${product.title}`
    );
  }

  /* RELATED PRODUCTS */
  const related = PRODUCTS.filter(
    (p) => p.category === product.category && p.id !== product.id
  );

  return (
    <div className="container" style={{ padding: "30px 0 80px" }}>
      {/* BACK BUTTONS */}
      <div style={{ marginBottom: 20 }}>
        <button
          className="btn"
          onClick={() => navigate(`/categories/${product.category}`)}
        >
          ← Back to Category
        </button>

        <button
          className="btn"
          style={{ marginLeft: 10 }}
          onClick={() => navigate("/marketplace")}
        >
          Marketplace
        </button>
      </div>

      {/* MAIN STRUCTURE */}
      <div
        style={{ display: "grid", gridTemplateColumns: "1fr 350px", gap: 24 }}
      >
        {/* LEFT — SLIDER & DETAILS */}
        <div>
          <ImageSlider images={product.images} />

          <h1
            style={{
              marginTop: 18,
              color: "var(--gold-1)",
              fontSize: 30,
              fontWeight: 800,
            }}
          >
            {product.title}
          </h1>

          <p style={{ marginTop: 10, color: "var(--muted)" }}>
            {product.description}
          </p>

          {/* VIDEO */}
          {product.video && (
            <video
              src={product.video}
              controls
              style={{
                width: "100%",
                marginTop: 16,
                borderRadius: 14,
                boxShadow: "0 8px 24px rgba(0,0,0,0.35)",
              }}
            />
          )}

          {/* ⭐ ADD / REMOVE WISHLIST BUTTON */}
          <button
            onClick={toggleWishlist}
            className="btn"
            style={{
              marginTop: 20,
              padding: "10px 18px",
              borderRadius: 10,
              background: isWishlisted ? "darkred" : "var(--gold-2)",
              color: "#fff",
              fontWeight: 700,
            }}
          >
            {isWishlisted ? "Remove from Wishlist" : "Add to Wishlist"}
          </button>
        </div>

        {/* RIGHT — SELLER BOX */}
        <aside
          style={{
            padding: 20,
            background: "rgba(255,255,255,0.05)",
            borderRadius: 14,
          }}
        >
          <div style={{ fontSize: 13, color: "var(--muted)" }}>Seller</div>
          <div style={{ fontSize: 20, fontWeight: 700 }}>{product.seller}</div>

          <div style={{ marginTop: 12 }}>
            <div style={{ fontSize: 13, color: "var(--muted)" }}>Price</div>
            <div style={{ fontWeight: 700 }}>{product.price}</div>
          </div>

          <div style={{ marginTop: 12 }}>
            <div style={{ fontSize: 13, color: "var(--muted)" }}>Country</div>
            <div style={{ fontWeight: 700 }}>{product.country}</div>
          </div>

          <button
            className="cta"
            style={{ marginTop: 20 }}
            onClick={contactSeller}
          >
            Contact Seller
          </button>

          <hr style={{ margin: "22px 0", opacity: 0.2 }} />

          {/* REQUEST QUOTE */}
          <h3 style={{ color: "var(--gold-1)", marginBottom: 10 }}>
            Request a Quote
          </h3>

          <input
            type="number"
            min={1}
            value={qty}
            onChange={(e) => setQty(Number(e.target.value))}
            style={{ padding: 10, width: "100%", borderRadius: 8 }}
          />

          <textarea
            placeholder="Write a message..."
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            style={{
              width: "100%",
              height: 100,
              padding: 10,
              marginTop: 10,
              borderRadius: 8,
            }}
          />

          <button className="cta" style={{ marginTop: 10 }} onClick={sendQuote}>
            Send Quote
          </button>

          {/* RATING */}
          <RatingBox onSubmit={publishReview} />
        </aside>
      </div>

      {/* QUOTE REQUESTS */}
      <div style={{ marginTop: 40 }}>
        <h2 style={{ color: "var(--gold-1)" }}>Quote Requests</h2>

        {requests.map((r) => (
          <div
            key={r.id}
            className="card"
            style={{ padding: 16, marginTop: 12 }}
          >
            <strong>Qty:</strong> {r.qty} <br />
            <strong>Message:</strong> {r.message}
            <br />
            <small style={{ color: "var(--muted)" }}>{r.date}</small>
          </div>
        ))}
      </div>

      {/* REVIEWS */}
      <div style={{ marginTop: 40 }}>
        <h2 style={{ color: "var(--gold-1)" }}>Reviews</h2>

        {reviews.length === 0 && (
          <p style={{ color: "var(--muted)" }}>No reviews yet.</p>
        )}

        {reviews.map((r) => (
          <div
            key={r.id}
            className="card"
            style={{ padding: 16, marginTop: 12 }}
          >
            <div style={{ color: "#D4AF37", fontSize: 18 }}>
              {"★".repeat(r.rating)}
              {"☆".repeat(5 - r.rating)}
            </div>

            <p style={{ marginTop: 6 }}>{r.comment}</p>
            <small style={{ color: "var(--muted)" }}>{r.date}</small>
          </div>
        ))}
      </div>

      {/* RELATED PRODUCTS */}
      {related.length > 0 && (
        <div style={{ marginTop: 50 }}>
          <h2 style={{ color: "var(--gold-1)" }}>Related Products</h2>

          <div
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(auto-fill, minmax(260px, 1fr))",
              gap: 20,
              marginTop: 20,
            }}
          >
            {related.map((p) => (
              <Link
                key={p.id}
                to={`/marketplace/product/${p.id}`}
                className="card"
                style={{
                  padding: 14,
                  textDecoration: "none",
                  color: "inherit",
                  borderRadius: 12,
                }}
              >
                <img
                  src={p.images?.[0]}
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
                    marginTop: 10,
                    fontSize: 17,
                    fontWeight: 700,
                    color: "var(--gold-1)",
                  }}
                >
                  {p.title}
                </h3>
              </Link>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
