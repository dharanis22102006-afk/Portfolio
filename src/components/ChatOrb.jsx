// src/components/ChatOrb.jsx   ← REPLACE YOUR CURRENT FILE WITH THIS
import React from "react";
import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";

export default function ChatOrb() {
  const navigate = useNavigate();

  return (
    <motion.button
      initial={{ scale: 0, rotate: -180 }}
      animate={{ scale: 1, rotate: 0 }}
      transition={{ duration: 1.4, type: "spring", stiffness: 180, delay: 1 }}
      whileHover={{ scale: 1.35 }}
      whileTap={{ scale: 0.9 }}
      onClick={() => navigate("/chat")}
      style={{
        position: "fixed",
        bottom: "30px",
        right: "30px",
        zIndex: 9999,
        border: "none",
        background: "transparent",
        cursor: "pointer",
        padding: 0,
      }}
    >
      {/* Pulsating outer ring */}
      <motion.div
        animate={{ scale: [1, 1.5, 1], opacity: [0.5, 0, 0.5] }}
        transition={{ duration: 3, repeat: Infinity, ease: "easeOut" }}
        style={{
          position: "absolute",
          inset: "-25px",
          border: "4px solid #ec4899",
          borderRadius: "50%",
          boxShadow: "0 0 90px #ec4899, 0 0 140px #c084fc",
        }}
      />

      {/* Main orb */}
      <div
        style={{
          width: 86,
          height: 86,
          borderRadius: "50%",
          background: "linear-gradient(135deg, #ec4899, #c084fc, #8b5cf6)",
          boxShadow: `
            0 0 70px #ec4899,
            0 0 120px #c084fc,
            inset 0 0 50px rgba(255,255,255,0.4)
          `,
          position: "relative",
          overflow: "hidden",
        }}
      >
        {/* Floating sparkles inside the orb */}
        {[...Array(8)].map((_, i) => (
          <motion.div
            key={i}
            initial={{ y: 80, opacity: 0 }}
            animate={{
              y: [-40, -100],
              opacity: [0, 1, 0],
              x: Math.sin(i) * 30,
            }}
            transition={{
              duration: 3 + i * 0.3,
              repeat: Infinity,
              delay: i * 0.4,
              ease: "easeOut",
            }}
            style={{
              position: "absolute",
              width: 5,
              height: 5,
              background: "white",
              borderRadius: "50%",
              boxShadow: "0 0 12px white",
              left: "50%",
              x: "-50%",
            }}
          />
        ))}

        {/* Center icon */}
        <div
          style={{
            position: "absolute",
            inset: 0,
            display: "grid",
            placeItems: "center",
            fontSize: "2.4rem",
            textShadow: "0 0 20px black",
          }}
        >
          
        </div>
      </div>

      {/* Tooltip (optional – you already have the pointer text on Home) */}
      {/* You can delete this block if you don’t want double text */}
      <motion.div
        initial={{ opacity: 0, x: 30 }}
        whileHover={{ opacity: 1, x: 0 }}
        transition={{ type: "spring", stiffness: 300 }}
        style={{
          position: "absolute",
          right: "110px",
          top: "50%",
          transform: "translateY(-50%)",
          background: "rgba(20,10,60,0.98)",
          padding: "14px 24px",
          borderRadius: "30px",
          fontWeight: "700",
          fontSize: "1.1rem",
          color: "#fff",
          whiteSpace: "nowrap",
          backdropFilter: "blur(12px)",
          border: "1px solid rgba(236,72,153,0.6)",
          boxShadow: "0 0 50px rgba(236,72,153,0.7)",
          pointerEvents: "none",
        }}
      >
        Click to talk to my AI Twin
      </motion.div>
    </motion.button>
  );
}