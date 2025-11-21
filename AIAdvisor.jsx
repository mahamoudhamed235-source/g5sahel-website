import React, { useState } from "react";
import { FaMicrophone, FaPaperPlane, FaRobot, FaUser } from "react-icons/fa";

export default function AIAdvisor() {
  const [messages, setMessages] = useState([
    {
      from: "ai",
      text: "Hello! Ask me anything about the Sahel & North Africa — economy, investment, security, climate, tourism, or opportunities.",
    },
  ]);

  const [inputText, setInputText] = useState("");

  function sendMessage() {
    if (!inputText.trim()) return;

    const newUserMessage = { from: "user", text: inputText };
    setMessages((prev) => [...prev, newUserMessage]);

    // Fake AI Reply (temporary — until ChatGPT API integration)
    const aiReply = {
      from: "ai",
      text: "Your question has been received. Soon this section will use ChatGPT API + n8n to provide real-time analysis.",
    };

    setTimeout(() => {
      setMessages((prev) => [...prev, aiReply]);
    }, 600);

    setInputText("");
  }

  return (
    <div className="container" style={{ paddingTop: 40, paddingBottom: 60 }}>
      <h1
        style={{
          fontSize: 38,
          fontWeight: 800,
          color: "var(--gold-1)",
          textAlign: "center",
          marginBottom: 10,
        }}
      >
        Sahel AI Advisor
      </h1>

      <p
        style={{
          textAlign: "center",
          fontSize: 16,
          maxWidth: 600,
          margin: "0 auto 40px",
          color: "var(--muted)",
        }}
      >
        Intelligent, real-time analysis for the Sahel & North Africa. Ask about
        economy, opportunities, trade, climate, security, tourism, and more.
      </p>

      {/* Chat Window */}
      <div
        style={{
          background: "rgba(0,0,0,0.35)",
          borderRadius: 16,
          padding: 20,
          minHeight: 400,
          maxHeight: 500,
          overflowY: "auto",
          backdropFilter: "blur(10px)",
          border: "1px solid rgba(255,255,255,0.08)",
          boxShadow: "0 0 20px rgba(0,0,0,0.3)",
        }}
      >
        {messages.map((msg, i) => (
          <div
            key={i}
            style={{
              display: "flex",
              marginBottom: 18,
              alignItems: "flex-start",
              gap: 10,
            }}
          >
            {msg.from === "ai" ? (
              <FaRobot size={26} color="#D4AF37" />
            ) : (
              <FaUser size={24} color="#E8E8E8" />
            )}

            <div
              style={{
                background:
                  msg.from === "ai"
                    ? "rgba(212,175,55,0.15)"
                    : "rgba(255,255,255,0.1)",
                padding: "12px 16px",
                borderRadius: 12,
                maxWidth: "75%",
                border:
                  msg.from === "ai"
                    ? "1px solid rgba(212,175,55,0.4)"
                    : "1px solid rgba(255,255,255,0.15)",
                fontSize: 15,
                lineHeight: 1.5,
              }}
            >
              {msg.text}
            </div>
          </div>
        ))}
      </div>

      {/* Input Section */}
      <div
        style={{
          marginTop: 20,
          display: "flex",
          gap: 12,
          alignItems: "center",
        }}
      >
        <button
          style={{
            background: "rgba(212,175,55,0.3)",
            border: "1px solid rgba(212,175,55,0.6)",
            padding: "10px 14px",
            borderRadius: 12,
          }}
        >
          <FaMicrophone size={20} color="#D4AF37" />
        </button>

        <input
          value={inputText}
          onChange={(e) => setInputText(e.target.value)}
          placeholder="Ask your question…"
          style={{
            flex: 1,
            padding: "14px",
            borderRadius: 12,
            border: "1px solid rgba(255,255,255,0.2)",
            background: "rgba(0,0,0,0.25)",
            color: "#fff",
          }}
        />

        <button
          onClick={sendMessage}
          style={{
            background: "rgba(212,175,55,0.3)",
            border: "1px solid rgba(212,175,55,0.6)",
            padding: "10px 14px",
            borderRadius: 12,
          }}
        >
          <FaPaperPlane size={20} color="#D4AF37" />
        </button>
      </div>
    </div>
  );
}
