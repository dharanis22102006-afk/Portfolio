// src/components/BackButton.jsx
import React from "react";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";

export default function BackButton() {
  const navigate = useNavigate();

  return (
    <motion.button
      initial={{ opacity: 0, x: -50 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ duration: 0.8, ease: "easeOut" }}
      whileHover={{ scale: 1.1, boxShadow: "0 0 40px rgba(236, 72, 153, 0.8)" }}
      whileTap={{ scale: 0.95 }}
      onClick={() => navigate("/")}
      style={{
        padding: "16px 32px",
        background: "rgba(236, 72, 153, 0.4)",        // Stronger pink
        backdropFilter: "blur(12px)",
        border: "2px solid #ec4899",
        borderRadius: "50px",
        color: "white",
        fontWeight: "bold",
        fontSize: "1.1rem",
        cursor: "pointer",
        boxShadow: "0 0 30px rgba(236, 72, 153, 0.6)",
        display: "flex",
        alignItems: "center",
        gap: "12px",
        zIndex: 9999,
        minWidth: "200px",
        justifyContent: "center",
      }}
    >
      ← Back to Universe
    </motion.button>
  );
}