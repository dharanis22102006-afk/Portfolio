// src/pages/Chat.jsx
import React, { useState, useEffect, useRef } from "react";
import { motion } from "framer-motion";
import BackButton from "../components/BackButton.jsx";   // ← THIS IS THE ONLY ONE THAT WORKS
export default function Chat() {
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);
  const messagesEndRef = useRef(null);

  // Auto-scroll to bottom
  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };
  useEffect(() => scrollToBottom(), [messages]);

  // Welcome message (only on first visit)
  useEffect(() => {
    const visited = localStorage.getItem("dharaniTwinVisited");
    if (!visited) {
      setMessages([
        {
          text: "Hi, I'm Dharani's Digital Twin! Welcome to my universe. Ask me anything about projects, skills, experience, or just say hi!",
          sender: "bot",
        },
      ]);
      localStorage.setItem("dharaniTwinVisited", "true");
    }
  }, []);

  // Fade in from Home page
  useEffect(() => {
    document.body.style.transition = "opacity 0.8s ease";
    document.body.style.opacity = "1";
  }, []);

  // SEND MESSAGE → CALLS YOUR BACKEND → GROQ API
  const handleSend = async (e) => {
    e?.preventDefault();
    if (!input.trim() || loading) return;

    const userMsg = input.trim();
    setInput("");
    setMessages((prev) => [...prev, { text: userMsg, sender: "user" }]);
    setLoading(true);

    try {
      const response = await fetch("http://localhost:5000/ask", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          messages: [
            {
              role: "system",
              content: "You are Dharani's friendly, fun, and smart digital twin. Be helpful, natural, and engaging.",
            },
            ...messages.map((m) => ({
              role: m.sender === "user" ? "user" : "assistant",
              content: m.text,
            })),
            { role: "user", content: userMsg },
          ],
        }),
      });

      if (!response.ok) throw new Error("Backend error");

      const data = await response.json();
      const botReply = data.choices[0].message.content;

      setMessages((prev) => [...prev, { text: botReply, sender: "bot" }]);
    } catch (error) {
      console.error("Chat error:", error);
      setMessages((prev) => [
        ...prev,
        { text: "Lost in space... Try again?", sender: "bot" },
      ]);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div
      style={{
        height: "100vh",
        background: "linear-gradient(135deg, #0c0720 0%, #1a1033 60%, #0f0c29 100%)",
        display: "flex",
        flexDirection: "column",
        fontFamily: "'Segoe UI', sans-serif",
        color: "white",
        position: "relative",
      }}
    >
      {/* ←←← BACK TO UNIVERSE BUTTON ←←← */}
      <motion.div
        initial={{ opacity: 0, x: -100 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.8, ease: "easeOut" }}
        style={{
          position: "fixed",
          top: "30px",
          left: "30px",
          zIndex: 9999,
        }}
      >
        <BackButton />
      </motion.div>

      {/* Messages Area */}
      <div
        style={{
          flex: 1,
          overflowY: "auto",
          padding: "100px 20px 10px", // ← Extra top padding so back button doesn't cover messages
        }}
      >
        {messages.map((msg, i) => (
          <motion.div
            key={i}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: i * 0.08 }}
            style={{
              maxWidth: "80%",
              margin: "15px 0",
              marginLeft: msg.sender === "user" ? "auto" : "15px",
              marginRight: msg.sender === "bot" ? "auto" : "15px",
            }}
          >
            <div
              style={{
                padding: "16px 22px",
                borderRadius: "22px",
                background:
                  msg.sender === "user"
                    ? "linear-gradient(135deg, #ec4899, #c084fc)"
                    : "rgba(167, 139, 250, 0.25)",
                backdropFilter: "blur(12px)",
                border: "1px solid rgba(255,255,255,0.12)",
                boxShadow:
                  msg.sender === "user"
                    ? "0 6px 20px rgba(236,72,153,0.4)"
                    : "0 6px 20px rgba(167,139,250,0.2)",
                fontSize: "1.05rem",
                lineHeight: "1.5",
              }}
            >
              {msg.text}
            </div>
          </motion.div>
        ))}

        {/* Typing Indicator */}
        {loading && (
          <div style={{ textAlign: "center", margin: "20px 0" }}>
            <motion.span
              animate={{ opacity: [0.4, 1, 0.4] }}
              transition={{ repeat: Infinity, duration: 1.5 }}
              style={{ color: "#c084fc", fontSize: "1.1rem" }}
            >
              Thinking...
            </motion.span>
          </div>
        )}
        <div ref={messagesEndRef} />
      </div>

      {/* Input Bar */}
      <form
        onSubmit={handleSend}
        style={{
          padding: "20px",
          background: "rgba(10, 5, 30, 0.8)",
          backdropFilter: "blur(15px)",
          borderTop: "1px solid rgba(167,139,250,0.3)",
        }}
      >
        <div
          style={{
            maxWidth: "1000px",
            margin: "0 auto",
            display: "flex",
            gap: "16px",
            alignItems: "center",
          }}
        >
          <input
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder="Ask your twin..."
            style={{
              flex: 1,
              padding: "18px 28px",
              fontSize: "1.15rem",
              borderRadius: "50px",
              border: "2px solid rgba(167,139,250,0.5)",
              background: "rgba(255,255,255,0.1)",
              color: "white",
              outline: "none",
              transition: "all 0.3s ease",
            }}
            onFocus={(e) => (e.target.style.borderColor = "#ec4899")}
            onBlur={(e) => (e.target.style.borderColor = "rgba(167,139,250,0.5)")}
          />
          <motion.button
            whileHover={{ scale: 1.08 }}
            whileTap={{ scale: 0.95 }}
            type="submit"
            disabled={loading}
            style={{
              padding: "18px 40px",
              borderRadius: "50px",
              background: "linear-gradient(45deg, #ec4899, #c084fc)",
              color: "white",
              border: "none",
              fontWeight: "bold",
              fontSize: "1.1rem",
              cursor: "pointer",
              boxShadow: "0 0 40px rgba(236,72,153,0.7)",
            }}
          >
            Send
          </motion.button>
        </div>
      </form>
    </div>
  );
}