// src/pages/Videos.jsx
import React, { useState, useEffect, useRef } from "react";

/**
 * Videos.jsx
 * - رفع ملفات فيديو محليًا (تعرض في الواجهة عبر URL مؤقت)
 * - إضافة روابط خارجية (YouTube / mp4)
 * - قائمة فيديوهات قصيرة
 * - زر لفتح صفحة بث مباشر (يأخذ رابط البث)
 *
 * ملاحظات:
 * - الملفات المخزنة هنا في الذاكرة و localStorage فقط (غير مرفوعة لخادم).
 * - للرفع الحقيقي: نحتاج API/Backend (سأوضح لاحقًا كيف توصّل S3 / Firebase / أي).
 */

function getSaved() {
  try {
    return JSON.parse(localStorage.getItem("videos_db")) || [];
  } catch {
    return [];
  }
}

export default function Videos() {
  const [videos, setVideos] = useState(getSaved());
  const [file, setFile] = useState(null);
  const [externalUrl, setExternalUrl] = useState("");
  const [title, setTitle] = useState("");
  const fileRef = useRef();

  useEffect(() => {
    localStorage.setItem("videos_db", JSON.stringify(videos));
  }, [videos]);

  function addLocalFile(e) {
    const f = e.target.files[0];
    if (!f) return;
    if (!f.type.startsWith("video/"))
      return alert("Please choose a video file.");
    const url = URL.createObjectURL(f);
    const item = {
      id: Date.now().toString(),
      title: title || f.name,
      src: url,
      source: "local",
      size: f.size,
      date: new Date().toLocaleString(),
    };
    setVideos((p) => [item, ...p]);
    setTitle("");
    fileRef.current.value = "";
  }

  function addExternal() {
    if (!externalUrl) return alert("Enter a video link or embed URL.");
    const item = {
      id: Date.now().toString(),
      title: title || externalUrl,
      src: externalUrl,
      source: "external",
      date: new Date().toLocaleString(),
    };
    setVideos((p) => [item, ...p]);
    setExternalUrl("");
    setTitle("");
  }

  function removeVideo(id) {
    setVideos((p) => p.filter((v) => v.id !== id));
  }

  return (
    <div className="container" style={{ padding: 30 }}>
      <h1 style={{ color: "var(--gold-1)" }}>Videos — Uploads & Shorts</h1>
      <p style={{ color: "var(--muted)" }}>
        يمكنك رفع فيديو من جهازك، أو لصق رابط فيديو (YouTube, mp4, m3u8...) —
        حالياً الملفات تُحفظ محليًا (localStorage).
      </p>

      <div style={{ display: "grid", gap: 12, maxWidth: 840 }}>
        <input
          placeholder="Title (optional)"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          style={{ padding: 10, borderRadius: 8 }}
        />

        <div style={{ display: "flex", gap: 8 }}>
          <input
            ref={fileRef}
            type="file"
            accept="video/*"
            onChange={addLocalFile}
            style={{ flex: 1 }}
          />
          <button
            className="btn"
            onClick={() => {
              // trigger file input
              fileRef.current && fileRef.current.click();
            }}
          >
            Upload
          </button>
        </div>

        <div style={{ display: "flex", gap: 8 }}>
          <input
            placeholder="External URL (YouTube or direct mp4/m3u8...)"
            value={externalUrl}
            onChange={(e) => setExternalUrl(e.target.value)}
            style={{ padding: 10, borderRadius: 8, flex: 1 }}
          />
          <button className="btn" onClick={addExternal}>
            Add Link
          </button>
        </div>

        <hr />

        <h3 style={{ color: "var(--gold-1)" }}>Uploaded / Added Videos</h3>

        {videos.length === 0 && (
          <div style={{ color: "var(--muted)" }}>No videos yet.</div>
        )}

        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))",
            gap: 16,
            marginTop: 10,
          }}
        >
          {videos.map((v) => (
            <div key={v.id} className="card" style={{ padding: 12 }}>
              <div style={{ display: "flex", justifyContent: "space-between" }}>
                <strong style={{ color: "var(--gold-1)" }}>{v.title}</strong>
                <small style={{ color: "var(--muted)" }}>{v.date}</small>
              </div>

              <div style={{ marginTop: 8 }}>
                {/* If YouTube link, embed responsive iframe; else use video tag */}
                {v.src.includes("youtube.com") || v.src.includes("youtu.be") ? (
                  <div style={{ position: "relative", paddingTop: "56.25%" }}>
                    <iframe
                      src={
                        v.src.includes("embed")
                          ? v.src
                          : convertYoutubeToEmbed(v.src)
                      }
                      title={v.title}
                      style={{
                        position: "absolute",
                        top: 0,
                        left: 0,
                        width: "100%",
                        height: "100%",
                        border: "none",
                        borderRadius: 8,
                      }}
                      allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                      allowFullScreen
                    />
                  </div>
                ) : (
                  <video
                    src={v.src}
                    controls
                    style={{ width: "100%", borderRadius: 8, marginTop: 8 }}
                  />
                )}
              </div>

              <div style={{ marginTop: 8, display: "flex", gap: 8 }}>
                <button
                  className="btn"
                  onClick={() => {
                    // open new window to view/video page (optional)
                    window.open(v.src, "_blank");
                  }}
                >
                  View
                </button>
                <button
                  className="btn"
                  onClick={() => {
                    navigator.clipboard &&
                      navigator.clipboard.writeText(
                        window.location.href + "#video-" + v.id
                      );
                    alert("Share link copied (local link).");
                  }}
                >
                  Share
                </button>
                <button
                  className="btn"
                  onClick={() => removeVideo(v.id)}
                  style={{ background: "rgba(255,50,50,0.12)" }}
                >
                  Remove
                </button>
              </div>
            </div>
          ))}
        </div>

        <hr />

        <h3 style={{ color: "var(--gold-1)" }}>Live Stream (placeholder)</h3>
        <p style={{ color: "var(--muted)" }}>
          أضف رابط البث المباشر (HLS/m3u8 أو صفحة البث) في المشروع الخلفي لاحقًا
          — حالياً مجرد زر يفتح حقل إدخال.
        </p>
        <LiveStreamBox />
      </div>
    </div>
  );
}

/* ---------- small subcomponents / helpers ---------- */

function LiveStreamBox() {
  const [url, setUrl] = useState("");
  const [open, setOpen] = useState(false);

  return (
    <div style={{ display: "grid", gap: 8, maxWidth: 640 }}>
      <div style={{ display: "flex", gap: 8 }}>
        <input
          placeholder="Live stream URL (HLS .m3u8 or page URL)"
          value={url}
          onChange={(e) => setUrl(e.target.value)}
          style={{ padding: 10, borderRadius: 8, flex: 1 }}
        />
        <button
          className="btn"
          onClick={() => {
            if (!url) return alert("Enter a stream URL.");
            setOpen(true);
          }}
        >
          Open Stream
        </button>
      </div>

      {open && (
        <div>
          <div style={{ marginTop: 8 }}>
            {/* simple iframe/video placeholder */}
            {url.includes(".m3u8") || url.endsWith(".mp4") ? (
              <video
                src={url}
                controls
                style={{ width: "100%", borderRadius: 8 }}
              />
            ) : (
              <iframe
                src={url}
                title="Live Stream"
                style={{
                  width: "100%",
                  height: 420,
                  border: "none",
                  borderRadius: 8,
                }}
              />
            )}
          </div>
        </div>
      )}
    </div>
  );
}

function convertYoutubeToEmbed(url) {
  try {
    // accept youtube.com/watch?v= or youtu.be/...
    const u = new URL(url.includes("http") ? url : "https://" + url);
    if (u.hostname.includes("youtu.be")) {
      const id = u.pathname.slice(1);
      return `https://www.youtube.com/embed/${id}`;
    }
    if (u.hostname.includes("youtube.com")) {
      const v = u.searchParams.get("v");
      if (v) return `https://www.youtube.com/embed/${v}`;
    }
    return url;
  } catch {
    return url;
  }
}
