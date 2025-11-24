// src/pages/Home.jsx
import React from "react";
import { motion } from "framer-motion";
import ChatOrb from "../components/ChatOrb";

export default function Home() {
  const planets = [
    { name: "mercury", size: 48, orbit: 170 },
    { name: "venus",   size: 72, orbit: 240 },
    { name: "earth",   size: 76, orbit: 320 },
    { name: "mars",    size: 54, orbit: 410 },
    { name: "jupiter", size: 140, orbit: 580 },
    { name: "saturn",  size: 122, orbit: 780 },
    { name: "uranus",  size: 88, orbit: 960 },
    { name: "neptune", size: 86, orbit: 1160 },
  ];

  // some random-ish stars for the background
  const stars = Array.from({ length: 90 }, (_, i) => ({
    id: i,
    top: Math.random() * 100,
    left: Math.random() * 100,
    size: 1 + Math.random() * 3,
  }));

  return (
    <div
      style={{
        position: "relative",
        width: "100vw",
        height: "100vh",
        background: "#000",
        overflow: "hidden",
      }}
    >
      {/* BACKGROUND STARS */}
      <div className="stars-layer">
        {stars.map((s) => (
          <div
            key={s.id}
            className="star"
            style={{
              top: `${s.top}%`,
              left: `${s.left}%`,
              width: s.size,
              height: s.size,
            }}
          />
        ))}
      </div>

      {/* TITLES + IMAGE ON RIGHT */}
      <div
        style={{
          position: "absolute",
          top: "10vh",
          left: 0,
          right: 0,
          textAlign: "center",
          zIndex: 20,
        }}
      >
        <div
          style={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            gap: "16px",
            flexWrap: "wrap",
          }}
        >
          <motion.h1
            initial={{ opacity: 0, y: -30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1.4 }}
            style={{
              fontSize: "3.8rem",
              fontWeight: 900,
              background:
                "linear-gradient(90deg, #ec4899, #c084fc, #8b5cf6)",
              WebkitBackgroundClip: "text",
              WebkitTextFillColor: "transparent",
              margin: 0,
            }}
          >
            Welcome to Dharani’s Digital Twin
          </motion.h1>

          {/* change src to your image name in /public */}
          <img
            src="/twinimage.png"
            alt="Dharani"
            style={{
              width: 80,
              height: 80,
              borderRadius: "50%",
              objectFit: "cover",
              boxShadow: "0 0 25px rgba(236,72,153,0.9)",
            }}
          />
        </div>

        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.7 }}
          style={{
            marginTop: "16px",
            fontSize: "1.3rem",
            color: "#c7d2fe",
          }}
        >
          A tiny universe where my skills, projects and story live.
        </motion.p>
      </div>

      {/* ===== SOLAR SYSTEM — FRONT VIEW, BIGGER TO COVER PAGE ===== */}
      <div
        style={{
          position: "absolute",
          top: "55%",
          left: "50%",
          transform: "translate(-50%, -50%)",
          perspective: 1400,
          pointerEvents: "none",
          zIndex: 5,
        }}
      >
        {/* orbital plane, tilted for front view */}
        <div
          style={{
            position: "relative",
            width: 2400,
            height: 2400,
            transformStyle: "preserve-3d",
            transform: "scale(1.05) rotateX(70deg)", // bigger = covers more of the page
            transformOrigin: "50% 50%",
          }}
        >
          {/* SUN (counter-rotated so it faces camera) */}
          <motion.div
            style={{
              position: "absolute",
              top: "50%",
              left: "50%",
              width: 200,
              height: 200,
              transform: "translate(-50%, -50%) rotateX(-70deg)",
            }}
            animate={{ opacity: [0.9, 1, 0.9] }}
            transition={{ duration: 4, repeat: Infinity }}
          >
            <img
              src="/planets/sun.png"
              alt="Sun"
              style={{
                width: "100%",
                height: "100%",
                objectFit: "contain",
                filter: "drop-shadow(0 0 160px #ff9800)",
              }}
            />
          </motion.div>

          {/* ORBITS + PLANETS */}
          {planets.map((p, i) => (
            <React.Fragment key={p.name}>
              {/* orbit line */}
              <div
                style={{
                  position: "absolute",
                  top: "50%",
                  left: "50%",
                  width: p.orbit * 2,
                  height: p.orbit * 2,
                  marginLeft: -p.orbit,
                  marginTop: -p.orbit,
                  border: "1px solid rgba(100, 180, 255, 0.15)",
                  borderRadius: "50%",
                }}
              />

              {/* rotating container for the planet */}
              <motion.div
                style={{
                  position: "absolute",
                  top: "50%",
                  left: "50%",
                  width: p.orbit * 2,
                  height: p.orbit * 2,
                  marginLeft: -p.orbit,
                  marginTop: -p.orbit,
                }}
                animate={{ rotate: 360 }}
                transition={{
                  duration: 28 + i * 6, // outer planets slower
                  repeat: Infinity,
                  ease: "linear",
                }}
              >
                <motion.div
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={{ opacity: [0.85, 1, 0.85], scale: 1 }}
                  transition={{
                    duration: 4 + i * 0.3,
                    repeat: Infinity,
                    delay: 0.8 + i * 0.1,
                    ease: "easeInOut",
                  }}
                  style={{
                    position: "absolute",
                    top: 0,
                    left: "50%",
                    width: p.size,
                    height: p.size,
                    marginLeft: -p.size / 2,
                  }}
                >
                  <img
                    src={`/planets/${p.name}.png`}
                    alt={p.name}
                    style={{
                      width: "100%",
                      height: "100%",
                      objectFit: "contain",
                      filter:
                        "drop-shadow(0 0 40px rgba(255,255,255,0.9))",
                    }}
                  />
                </motion.div>
              </motion.div>
            </React.Fragment>
          ))}
        </div>
      </div>

      {/* POINTER TEXT */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 2.5 }}
        style={{
          position: "fixed",
          bottom: "200px",
          right: "30px",
          zIndex: 9997,
          pointerEvents: "none",
        }}
      >
        <motion.div
          animate={{ x: [0, 16, 0] }}
          transition={{ duration: 4, repeat: Infinity }}
          style={{
            display: "flex",
            alignItems: "center",
            gap: "18px",
            background: "rgba(30,10,90,0.94)",
            padding: "18px 36px",
            borderRadius: "50px",
            backdropFilter: "blur(16px)",
            border: "1px solid rgba(236,72,153,0.6)",
            fontSize: "1.3rem",
            fontWeight: "700",
            color: "#fff",
            boxShadow: "0 0 70px rgba(236,72,153,0.5)",
          }}
        >
          Click here to talk to my AI Twin
        </motion.div>
      </motion.div>

      <ChatOrb />
    </div>
  );
}
