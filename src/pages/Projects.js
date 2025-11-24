// src/pages/Projects.js
import React from "react";
import { motion } from "framer-motion";
import DreamScene from "../components/DreamScene";
import { useNavigate } from "react-router-dom";

export default function Projects() {
  const navigate = useNavigate();

  return (
    <div style={{ position: "relative", width: "100vw", height: "100vh", overflow: "hidden" }}>
      
      {/* BACK BUTTON */}
      <motion.button
        onClick={() => navigate("/")}
        initial={{ opacity: 0, y: -10 }}
        animate={{ opacity: 1, y: 0 }}
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.95 }}
        style={{
          position: "absolute",
          top: "30px",
          left: "30px",
          padding: "12px 24px",
          fontSize: "1.2rem",
          fontWeight: "600",
          color: "white",
          background: "linear-gradient(90deg, #ec4899, #a78bfa)",
          border: "none",
          borderRadius: "12px",
          cursor: "pointer",
          zIndex: 999,
          boxShadow: "0 0 25px rgba(167,139,250,0.6)",
        }}
      >
        ⬅ Back
      </motion.button>

      {/* BACKGROUND UNIVERSE */}
      <div style={{ position: "absolute", inset: 0 }}>
        <DreamScene />
      </div>

      {/* TITLE */}
      <motion.h1
        initial={{ opacity: 0, y: -40 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1.2, ease: "easeOut" }}
        style={{
          position: "absolute",
          top: "6%",
          left: "50%",
          transform: "translateX(-50%)",
          fontSize: "4.6rem",
          fontWeight: "900",
          background: "linear-gradient(90deg, #ec4899, #8b5cf6, #a78bfa)",
          WebkitBackgroundClip: "text",
          WebkitTextFillColor: "transparent",
          textAlign: "center",
          zIndex: 10,
          textShadow: "0 0 50px rgba(236,72,153,0.5)",
        }}
      >
        My Projects
      </motion.h1>

      {/* SUBTITLE */}
      <motion.p
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.6, duration: 1.2 }}
        style={{
          position: "absolute",
          top: "15%",
          left: "50%",
          transform: "translateX(-50%)",
          fontSize: "1.35rem",
          color: "rgba(255,255,255,0.9)",
          zIndex: 10,
          textAlign: "center",
        }}
      >
        Here are the worlds I've built with code and creativity:
      </motion.p>

      {/* CARD CONTAINER */}
      <div
        style={{
          position: "absolute",
          top: "24%",
          left: "50%",
          transform: "translateX(-50%)",
          width: "100%",
          maxWidth: "1300px",
          padding: "0 40px",
          zIndex: 20,
        }}
      >
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit, minmax(320px, 1fr))",
            gap: "40px",
          }}
        >
          {/* --- CARD COMPONENT FUNCTION --- */}
          {[
            {
              title: "E-commerce Platform",
              tech: "React + Firebase",
              desc: "Full-stack shopping experience",
              glow: "rgba(139,92,246,0.45)",
            },
            {
              title: "Mental Health App",
              tech: "MERN Stack",
              desc: "Helping people find peace",
              glow: "rgba(236,72,153,0.45)",
            },
            {
              title: "This Digital Twin",
              tech: "React + Three.js + Groq AI",
              desc: "You're living in it",
              glow: "rgba(168,85,247,0.45)",
            },
          ].map((card, idx) => (
            <motion.div
              key={idx}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.9 + idx * 0.2, duration: 0.8 }}
              whileHover={{
                y: -18,
                scale: 1.04,
                rotateX: 4,
                rotateY: -4,
                boxShadow: `0 0 40px ${card.glow}, 0 0 80px ${card.glow}`,
                borderColor: card.glow,
              }}
              whileTap={{ scale: 0.97 }}
              style={{
                padding: "35px",
                borderRadius: "22px",
                backdropFilter: "blur(18px)",
                border: "1px solid rgba(255,255,255,0.15)",
                background: "rgba(20,20,35,0.35)",
                transition: "0.25s ease",
              }}
            >
              <h3
                style={{
                  fontSize: "2rem",
                  fontWeight: 700,
                  marginBottom: "12px",
                  background: "linear-gradient(90deg, #ec4899, #a78bfa)",
                  WebkitBackgroundClip: "text",
                  WebkitTextFillColor: "transparent",
                }}
              >
                {card.title}
              </h3>

              <p style={{ fontSize: "1.1rem", opacity: 0.9, marginBottom: "6px" }}>
                {card.tech}
              </p>

              <p style={{ fontSize: "1.2rem", opacity: 0.95 }}>{card.desc}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );
}
