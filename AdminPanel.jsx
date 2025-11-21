import React, { useEffect, useState } from "react";

/**
 * AdminPanel (MVP)
 * - إدارة المنتجات (إضافة/تعديل/حذف) مخزنة في localStorage (key: "admin_products")
 * - إدارة الفئات (Categories) مخزنة في localStorage (key: "admin_categories")
 * - إدارة الوظائف (Jobs) مخزنة في localStorage (key: "admin_jobs")
 * - زر تصدير/استيراد JSON لكل البيانات
 * - واجهة مبسطة وفخمة تناسب التصميم العام
 *
 * لاحقًا سنربط هذه البيانات مع Marketplace و Jobs و Categories لعرضها مباشرة للمستخدمين.
 */

function load(key, fallback = []) {
  try {
    return JSON.parse(localStorage.getItem(key)) || fallback;
  } catch {
    return fallback;
  }
}
function save(key, data) {
  localStorage.setItem(key, JSON.stringify(data));
}

export default function AdminPanel() {
  const [tab, setTab] = useState("products");

  // data stores
  const [products, setProducts] = useState([]);
  const [categories, setCategories] = useState([]);
  const [jobs, setJobs] = useState([]);

  // temporary inputs for product form
  const [prodForm, setProdForm] = useState({
    id: "",
    title: "",
    category: "",
    price: "",
    country: "",
    seller: "",
    description: "",
    images: "",
    video: "",
  });

  // job form
  const [jobForm, setJobForm] = useState({
    id: "",
    title: "",
    company: "",
    location: "",
    description: "",
  });

  // category form
  const [catForm, setCatForm] = useState({
    id: "",
    title: "",
    description: "",
  });

  useEffect(() => {
    setProducts(load("admin_products", []));
    setCategories(load("admin_categories", []));
    setJobs(load("admin_jobs", []));
  }, []);

  // SAVE helpers
  function persistProducts(next) {
    setProducts(next);
    save("admin_products", next);
  }
  function persistCategories(next) {
    setCategories(next);
    save("admin_categories", next);
  }
  function persistJobs(next) {
    setJobs(next);
    save("admin_jobs", next);
  }

  // ----- PRODUCTS CRUD -----
  function onAddOrUpdateProduct(e) {
    e.preventDefault();
    // basic validation
    if (!prodForm.title || !prodForm.category) {
      return alert("Please provide product title and category.");
    }

    const entry = {
      id: prodForm.id || `adm-prod-${Date.now()}`,
      title: prodForm.title,
      category: prodForm.category,
      price: prodForm.price || "Negotiate",
      country: prodForm.country || "Unknown",
      seller: prodForm.seller || "Admin",
      description: prodForm.description || "",
      images:
        prodForm.images
          .split(",")
          .map((s) => s.trim())
          .filter(Boolean) || [],
      video: prodForm.video || null,
    };

    const existingIndex = products.findIndex((p) => p.id === entry.id);
    let updated;
    if (existingIndex >= 0) {
      updated = [...products];
      updated[existingIndex] = entry;
    } else {
      updated = [entry, ...products];
    }
    persistProducts(updated);

    // reset
    setProdForm({
      id: "",
      title: "",
      category: "",
      price: "",
      country: "",
      seller: "",
      description: "",
      images: "",
      video: "",
    });

    alert("Product saved.");
  }

  function onEditProduct(id) {
    const p = products.find((x) => x.id === id);
    if (!p) return;
    setProdForm({
      id: p.id,
      title: p.title,
      category: p.category,
      price: p.price,
      country: p.country,
      seller: p.seller,
      description: p.description,
      images: (p.images || []).join(", "),
      video: p.video || "",
    });
    setTab("products");
    window.scrollTo({ top: 0, behavior: "smooth" });
  }

  function onDeleteProduct(id) {
    if (!confirm("Delete product?")) return;
    const updated = products.filter((p) => p.id !== id);
    persistProducts(updated);
  }

  // ----- CATEGORIES CRUD -----
  function onAddOrUpdateCategory(e) {
    e.preventDefault();
    if (!catForm.title) return alert("Category title required.");
    const entry = {
      id: catForm.id || `adm-cat-${Date.now()}`,
      title: catForm.title,
      description: catForm.description || "",
    };
    const existingIndex = categories.findIndex((c) => c.id === entry.id);
    let updated;
    if (existingIndex >= 0) {
      updated = [...categories];
      updated[existingIndex] = entry;
    } else {
      updated = [entry, ...categories];
    }
    persistCategories(updated);
    setCatForm({ id: "", title: "", description: "" });
    alert("Category saved.");
  }

  function onEditCategory(id) {
    const c = categories.find((x) => x.id === id);
    if (!c) return;
    setCatForm({ id: c.id, title: c.title, description: c.description });
    setTab("categories");
    window.scrollTo({ top: 0, behavior: "smooth" });
  }

  function onDeleteCategory(id) {
    if (!confirm("Delete category?")) return;
    const updated = categories.filter((c) => c.id !== id);
    persistCategories(updated);
  }

  // ----- JOBS CRUD -----
  function onAddOrUpdateJob(e) {
    e.preventDefault();
    if (!jobForm.title || !jobForm.company)
      return alert("Title & company required.");
    const entry = {
      id: jobForm.id || `adm-job-${Date.now()}`,
      title: jobForm.title,
      company: jobForm.company,
      location: jobForm.location || "",
      description: jobForm.description || "",
    };
    const existingIndex = jobs.findIndex((j) => j.id === entry.id);
    let updated;
    if (existingIndex >= 0) {
      updated = [...jobs];
      updated[existingIndex] = entry;
    } else {
      updated = [entry, ...jobs];
    }
    persistJobs(updated);
    setJobForm({
      id: "",
      title: "",
      company: "",
      location: "",
      description: "",
    });
    alert("Job saved.");
  }

  function onEditJob(id) {
    const j = jobs.find((x) => x.id === id);
    if (!j) return;
    setJobForm({
      id: j.id,
      title: j.title,
      company: j.company,
      location: j.location,
      description: j.description,
    });
    setTab("jobs");
    window.scrollTo({ top: 0, behavior: "smooth" });
  }

  function onDeleteJob(id) {
    if (!confirm("Delete job?")) return;
    const updated = jobs.filter((j) => j.id !== id);
    persistJobs(updated);
  }

  // EXPORT / IMPORT
  function exportAll() {
    const payload = {
      products,
      categories,
      jobs,
    };
    const dataStr =
      "data:text/json;charset=utf-8," +
      encodeURIComponent(JSON.stringify(payload, null, 2));
    const a = document.createElement("a");
    a.href = dataStr;
    a.download = "g5sahel-admin-data.json";
    a.click();
  }

  function importAll(e) {
    const file = e.target.files?.[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onload = (ev) => {
      try {
        const parsed = JSON.parse(ev.target.result);
        if (parsed.products) persistProducts(parsed.products);
        if (parsed.categories) persistCategories(parsed.categories);
        if (parsed.jobs) persistJobs(parsed.jobs);
        alert("Imported successfully.");
      } catch (err) {
        alert("Invalid JSON file.");
      }
    };
    reader.readAsText(file);
  }

  // UI rendering
  return (
    <div className="container" style={{ padding: "30px 0 80px" }}>
      <h1 style={{ color: "var(--gold-1)", fontSize: 28, marginBottom: 12 }}>
        Admin Panel
      </h1>
      <p style={{ color: "var(--muted)" }}>
        Manage products, categories and jobs. Data is saved locally
        (localStorage) — later we will connect to a backend DB.
      </p>

      {/* TABS */}
      <div
        style={{ display: "flex", gap: 12, marginTop: 18, marginBottom: 18 }}
      >
        {[
          ["products", "Products"],
          ["categories", "Categories"],
          ["jobs", "Jobs"],
          ["tools", "Tools"],
        ].map(([k, label]) => (
          <div
            key={k}
            onClick={() => setTab(k)}
            style={{
              padding: "8px 12px",
              cursor: "pointer",
              borderRadius: 8,
              background:
                tab === k ? "rgba(212,175,55,0.18)" : "rgba(255,255,255,0.04)",
              border:
                tab === k
                  ? "1px solid var(--gold-1)"
                  : "1px solid rgba(255,255,255,0.06)",
            }}
          >
            {label}
          </div>
        ))}
      </div>

      {/* CONTENT */}
      <div style={{ display: "grid", gap: 18 }}>
        {/* PRODUCTS TAB */}
        {tab === "products" && (
          <div>
            <h2 style={{ color: "var(--gold-1)" }}>Add / Edit Product</h2>
            <form
              onSubmit={onAddOrUpdateProduct}
              style={{ display: "grid", gap: 10, marginTop: 12 }}
            >
              <input
                placeholder="Title"
                value={prodForm.title}
                onChange={(e) =>
                  setProdForm({ ...prodForm, title: e.target.value })
                }
                className="input"
              />
              <select
                value={prodForm.category}
                onChange={(e) =>
                  setProdForm({ ...prodForm, category: e.target.value })
                }
                className="input"
              >
                <option value="">-- Select Category --</option>
                {categories.map((c) => (
                  <option key={c.id} value={c.id}>
                    {c.title}
                  </option>
                ))}
              </select>
              <input
                placeholder="Price (text)"
                value={prodForm.price}
                onChange={(e) =>
                  setProdForm({ ...prodForm, price: e.target.value })
                }
                className="input"
              />
              <input
                placeholder="Country"
                value={prodForm.country}
                onChange={(e) =>
                  setProdForm({ ...prodForm, country: e.target.value })
                }
                className="input"
              />
              <input
                placeholder="Seller"
                value={prodForm.seller}
                onChange={(e) =>
                  setProdForm({ ...prodForm, seller: e.target.value })
                }
                className="input"
              />
              <input
                placeholder="Images (comma separated URLs)"
                value={prodForm.images}
                onChange={(e) =>
                  setProdForm({ ...prodForm, images: e.target.value })
                }
                className="input"
              />
              <input
                placeholder="Video URL (optional)"
                value={prodForm.video}
                onChange={(e) =>
                  setProdForm({ ...prodForm, video: e.target.value })
                }
                className="input"
              />
              <textarea
                placeholder="Description"
                value={prodForm.description}
                onChange={(e) =>
                  setProdForm({ ...prodForm, description: e.target.value })
                }
                className="input"
                style={{ minHeight: 100 }}
              />
              <div style={{ display: "flex", gap: 8 }}>
                <button className="cta" type="submit">
                  Save Product
                </button>
                <button
                  type="button"
                  className="btn"
                  onClick={() =>
                    setProdForm({
                      id: "",
                      title: "",
                      category: "",
                      price: "",
                      country: "",
                      seller: "",
                      description: "",
                      images: "",
                      video: "",
                    })
                  }
                >
                  Clear
                </button>
              </div>
            </form>

            {/* list */}
            <div style={{ marginTop: 18 }}>
              <h3 style={{ color: "var(--gold-1)" }}>Existing Products</h3>
              <div style={{ display: "grid", gap: 8, marginTop: 8 }}>
                {products.map((p) => (
                  <div
                    key={p.id}
                    className="card"
                    style={{
                      display: "flex",
                      justifyContent: "space-between",
                      alignItems: "center",
                    }}
                  >
                    <div>
                      <div style={{ fontWeight: 700 }}>{p.title}</div>
                      <div style={{ color: "var(--muted)" }}>
                        {p.seller} • {p.country} • {p.price}
                      </div>
                    </div>
                    <div style={{ display: "flex", gap: 8 }}>
                      <button
                        className="btn"
                        onClick={() => onEditProduct(p.id)}
                      >
                        Edit
                      </button>
                      <button
                        className="btn"
                        style={{ background: "darkred", color: "#fff" }}
                        onClick={() => onDeleteProduct(p.id)}
                      >
                        Delete
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

        {/* CATEGORIES TAB */}
        {tab === "categories" && (
          <div>
            <h2 style={{ color: "var(--gold-1)" }}>Categories</h2>
            <form
              onSubmit={onAddOrUpdateCategory}
              style={{ display: "grid", gap: 8, marginTop: 12 }}
            >
              <input
                placeholder="Title"
                value={catForm.title}
                onChange={(e) =>
                  setCatForm({ ...catForm, title: e.target.value })
                }
                className="input"
              />
              <textarea
                placeholder="Description"
                value={catForm.description}
                onChange={(e) =>
                  setCatForm({ ...catForm, description: e.target.value })
                }
                className="input"
                style={{ minHeight: 80 }}
              />
              <div style={{ display: "flex", gap: 8 }}>
                <button className="cta" type="submit">
                  Save Category
                </button>
                <button
                  type="button"
                  className="btn"
                  onClick={() =>
                    setCatForm({ id: "", title: "", description: "" })
                  }
                >
                  Clear
                </button>
              </div>
            </form>

            <div style={{ marginTop: 14 }}>
              <h3 style={{ color: "var(--gold-1)" }}>Existing Categories</h3>
              <div style={{ display: "grid", gap: 8, marginTop: 8 }}>
                {categories.map((c) => (
                  <div
                    key={c.id}
                    className="card"
                    style={{
                      display: "flex",
                      justifyContent: "space-between",
                      alignItems: "center",
                    }}
                  >
                    <div>
                      <div style={{ fontWeight: 700 }}>{c.title}</div>
                      <div style={{ color: "var(--muted)" }}>
                        {c.description}
                      </div>
                    </div>
                    <div style={{ display: "flex", gap: 8 }}>
                      <button
                        className="btn"
                        onClick={() => onEditCategory(c.id)}
                      >
                        Edit
                      </button>
                      <button
                        className="btn"
                        style={{ background: "darkred", color: "#fff" }}
                        onClick={() => onDeleteCategory(c.id)}
                      >
                        Delete
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

        {/* JOBS TAB */}
        {tab === "jobs" && (
          <div>
            <h2 style={{ color: "var(--gold-1)" }}>Jobs</h2>
            <form
              onSubmit={onAddOrUpdateJob}
              style={{ display: "grid", gap: 8, marginTop: 12 }}
            >
              <input
                placeholder="Job Title"
                value={jobForm.title}
                onChange={(e) =>
                  setJobForm({ ...jobForm, title: e.target.value })
                }
                className="input"
              />
              <input
                placeholder="Company"
                value={jobForm.company}
                onChange={(e) =>
                  setJobForm({ ...jobForm, company: e.target.value })
                }
                className="input"
              />
              <input
                placeholder="Location"
                value={jobForm.location}
                onChange={(e) =>
                  setJobForm({ ...jobForm, location: e.target.value })
                }
                className="input"
              />
              <textarea
                placeholder="Description"
                value={jobForm.description}
                onChange={(e) =>
                  setJobForm({ ...jobForm, description: e.target.value })
                }
                className="input"
                style={{ minHeight: 80 }}
              />
              <div style={{ display: "flex", gap: 8 }}>
                <button className="cta" type="submit">
                  Save Job
                </button>
                <button
                  type="button"
                  className="btn"
                  onClick={() =>
                    setJobForm({
                      id: "",
                      title: "",
                      company: "",
                      location: "",
                      description: "",
                    })
                  }
                >
                  Clear
                </button>
              </div>
            </form>

            <div style={{ marginTop: 14 }}>
              <h3 style={{ color: "var(--gold-1)" }}>Existing Jobs</h3>
              <div style={{ display: "grid", gap: 8, marginTop: 8 }}>
                {jobs.map((j) => (
                  <div
                    key={j.id}
                    className="card"
                    style={{
                      display: "flex",
                      justifyContent: "space-between",
                      alignItems: "center",
                    }}
                  >
                    <div>
                      <div style={{ fontWeight: 700 }}>{j.title}</div>
                      <div style={{ color: "var(--muted)" }}>
                        {j.company} • {j.location}
                      </div>
                    </div>
                    <div style={{ display: "flex", gap: 8 }}>
                      <button className="btn" onClick={() => onEditJob(j.id)}>
                        Edit
                      </button>
                      <button
                        className="btn"
                        style={{ background: "darkred", color: "#fff" }}
                        onClick={() => onDeleteJob(j.id)}
                      >
                        Delete
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

        {/* TOOLS TAB */}
        {tab === "tools" && (
          <div>
            <h2 style={{ color: "var(--gold-1)" }}>Tools</h2>
            <div
              style={{
                display: "flex",
                gap: 12,
                flexWrap: "wrap",
                marginTop: 12,
              }}
            >
              <div className="card" style={{ padding: 12 }}>
                <div style={{ fontWeight: 700 }}>Export / Import</div>
                <div style={{ color: "var(--muted)", marginTop: 6 }}>
                  Export all admin data (products, categories, jobs) as JSON.
                </div>
                <div style={{ marginTop: 8, display: "flex", gap: 8 }}>
                  <button className="btn" onClick={exportAll}>
                    Export JSON
                  </button>
                  <label className="btn" style={{ cursor: "pointer" }}>
                    Import JSON
                    <input
                      type="file"
                      accept="application/json"
                      onChange={importAll}
                      style={{ display: "none" }}
                    />
                  </label>
                </div>
              </div>

              <div className="card" style={{ padding: 12 }}>
                <div style={{ fontWeight: 700 }}>Notes</div>
                <div style={{ color: "var(--muted)", marginTop: 6 }}>
                  Data saved locally. Next step: connect backend API to sync
                  data and enable user-facing read operations.
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
