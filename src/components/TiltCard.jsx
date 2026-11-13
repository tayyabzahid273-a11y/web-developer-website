// src/components/TiltCard.jsx
import React, { useRef, useState } from "react";
import { motion, useMotionValue, useSpring, useTransform } from "framer-motion";

export default function TiltCard({ children, className = "" }) {
  const cardRef = useRef(null);
  const [isHovered, setIsHovered] = useState(false);

  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  const springConfig = { stiffness: 150, damping: 18, mass: 0.5 };
  const rotateX = useSpring(useTransform(mouseY, [-0.5, 0.5], [10, -10]), springConfig);
  const rotateY = useSpring(useTransform(mouseX, [-0.5, 0.5], [-10, 10]), springConfig);
  const scale = useSpring(isHovered ? 1.02 : 1, { stiffness: 200, damping: 20 });

  const spotlightX = useMotionValue(50);
  const spotlightY = useMotionValue(50);

  const handleMouseMove = (e) => {
    const card = cardRef.current;
    if (!card) return;

    const rect = card.getBoundingClientRect();
    const x = (e.clientX - rect.left) / rect.width;
    const y = (e.clientY - rect.top) / rect.height;

    mouseX.set(x - 0.5);
    mouseY.set(y - 0.5);
    spotlightX.set(x * 100);
    spotlightY.set(y * 100);
  };

  const handleMouseLeave = () => {
    setIsHovered(false);
    mouseX.set(0);
    mouseY.set(0);
    spotlightX.set(50);
    spotlightY.set(50);
  };

  return (
    <motion.div
      ref={cardRef}
      onMouseMove={handleMouseMove}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={handleMouseLeave}
      style={{
        rotateX,
        rotateY,
        scale,
        transformStyle: "preserve-3d",
        "--spot-x": useTransform(spotlightX, (v) => `${v}%`),
        "--spot-y": useTransform(spotlightY, (v) => `${v}%`),
      }}
      className={`
        group relative w-full rounded-3xl
        bg-cream-50 border border-blush-200
        p-6 sm:p-8
        cursor-pointer select-none
        transition-shadow duration-300 ease-out
        ${isHovered ? "shadow-[0_20px_40px_-10px_rgba(201,111,74,0.25)]" : "shadow-card"}
        ${className}
      `}
    >
      {/* Spotlight layer */}
      <div
        className="pointer-events-none absolute inset-0 rounded-3xl opacity-0 transition-opacity duration-300 group-hover:opacity-100 z-0"
        style={{
          background: "radial-gradient(circle at var(--spot-x) var(--spot-y), rgba(255,255,255,0.8), transparent 60%)",
        }}
      />
      
      {/* Glowing border ring */}
      <div
        className="pointer-events-none absolute inset-0 rounded-3xl opacity-0 transition-opacity duration-300 group-hover:opacity-100 z-0"
        style={{
          boxShadow: "inset 0 0 0 1px rgba(201,111,74,0.3)",
          background: "radial-gradient(circle at var(--spot-x) var(--spot-y), rgba(253,232,234,0.5), transparent 70%)",
        }}
      />

      {/* Actual content lifted in 3D */}
      <div style={{ transform: "translateZ(30px)", transformStyle: "preserve-3d" }} className="relative z-10">
        {children}
      </div>
    </motion.div>
  );
}