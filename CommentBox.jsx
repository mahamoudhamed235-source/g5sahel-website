import React, { useState, useRef } from "react";

export default function CommentBox() {
  const [text, setText] = useState("");
  const [comments, setComments] = useState([]);
  const [recording, setRecording] = useState(false);
  const mediaRef = useRef(null);
  const chunksRef = useRef([]);

  // Start Audio Recording
  async function startRecording() {
    if (!navigator.mediaDevices) {
      alert("Audio recording not supported in this browser");
      return;
    }

    const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
    const mr = new MediaRecorder(stream);

    mediaRef.current = mr;
    chunksRef.current = [];

    mr.ondataavailable = (e) => chunksRef.current.push(e.data);

    mr.onstop = () => {
      const blob = new Blob(chunksRef.current, { type: "audio/webm" });
      const url = URL.createObjectURL(blob);

      setComments((prev) => [
        {
          type: "audio",
          url,
          blob,
          id: Date.now(),
          name: "Voice Comment",
        },
        ...prev,
      ]);
    };

    mr.start();
    setRecording(true);
  }

  // Stop Recording
  function stopRecording() {
    if (mediaRef.current) mediaRef.current.stop();
    setRecording(false);
  }

  // Submit Text Comment
  function submitText() {
    if (!text.trim()) return;

    setComments((prev) => [{ type: "text", text, id: Date.now() }, ...prev]);

    setText("");
  }

  return (
    <div>
      {/* INPUT AREA */}
      <div style={{ display: "flex", gap: 8 }}>
        <input
          value={text}
          onChange={(e) => setText(e.target.value)}
          placeholder="Write a comment..."
          style={{
            flex: 1,
            padding: 8,
            borderRadius: 8,
            border: "1px solid rgba(255,255,255,0.03)",
            background: "transparent",
            color: "var(--text)",
          }}
        />

        <button onClick={submitText} className="cta">
          Comment
        </button>

        {/* AUDIO BUTTON */}
        {!recording ? (
          <button onClick={startRecording} title="Record Voice">
            🎤
          </button>
        ) : (
          <button
            onClick={stopRecording}
            style={{ background: "#c63a3a" }}
            title="Stop Recording"
          >
            Stop
          </button>
        )}
      </div>

      {/* COMMENTS LIST */}
      <div style={{ marginTop: 12 }}>
        {comments.map((c) => (
          <div
            key={c.id}
            style={{
              background: "rgba(255,255,255,0.02)",
              padding: 10,
              borderRadius: 8,
              marginBottom: 8,
            }}
          >
            {c.type === "text" ? (
              <div>{c.text}</div>
            ) : (
              <div>
                <div>{c.name}</div>
                <audio controls src={c.url}></audio>
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}
