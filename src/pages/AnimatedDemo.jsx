import React, { useRef, useState } from "react";
import { motion, useMotionValue, useSpring, useTransform } from "framer-motion";

// 4D Interactive Card Component
function MagicCard({ item }) {
  const ref = useRef(null);
  const [isHovered, setIsHovered] = useState(false);

  const x = useMotionValue(0);
  const y = useMotionValue(0);

  // Magnetic Effect & 3D Tilt
  const mouseXSpring = useSpring(x, { stiffness: 150, damping: 15 });
  const mouseYSpring = useSpring(y, { stiffness: 150, damping: 15 });

  const rotateX = useTransform(mouseYSpring, [-0.5, 0.5], ["17.5deg", "-17.5deg"]);
  const rotateY = useTransform(mouseXSpring, [-0.5, 0.5], ["-17.5deg", "17.5deg"]);

  const handleMouseMove = (e) => {
    if (!ref.current) return;
    const rect = ref.current.getBoundingClientRect();
    const width = rect.width;
    const height = rect.height;
    const mouseX = e.clientX - rect.left;
    const mouseY = e.clientY - rect.top;
    const xPct = mouseX / width - 0.5;
    const yPct = mouseY / height - 0.5;
    x.set(xPct);
    y.set(yPct);
  };

  const handleMouseLeave = () => {
    setIsHovered(false);
    x.set(0);
    y.set(0);
  };

  return (
    <motion.div
      ref={ref}
      onMouseMove={handleMouseMove}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={handleMouseLeave}
      style={{
        rotateX,
        rotateY,
        transformStyle: "preserve-3d",
      }}
      animate={{
        y: isHovered ? -10 : [0, -5, 0], // Floating animation jab hover na ho
      }}
      transition={{
        y: { duration: 3, repeat: Infinity, ease: "easeInOut" }
      }}
      className="relative w-28 h-32 sm:w-36 sm:h-44 bg-white/5 backdrop-blur-xl border border-white/10 rounded-2xl flex flex-col items-center justify-center gap-3 shadow-[0_0_30px_rgba(255,255,255,0.05)] cursor-pointer group"
    >
      {/* Glowing Aura inside card */}
      <div className="absolute inset-0 bg-gradient-to-br from-terracotta-500/20 to-purple-500/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300 rounded-2xl" />
      
      <motion.span 
        style={{ transform: "translateZ(50px)" }} 
        className="text-4xl sm:text-5xl drop-shadow-[0_0_15px_rgba(255,255,255,0.8)]"
      >
        {item.icon}
      </motion.span>
      
      <motion.span 
        style={{ transform: "translateZ(30px)" }} 
        className="text-xs sm:text-sm font-bold text-white/90 tracking-wide"
      >
        {item.text}
      </motion.span>

      {/* Magic border line */}
      <div className="absolute bottom-0 left-0 h-1 w-0 bg-gradient-to-r from-terracotta-400 to-purple-400 group-hover:w-full transition-all duration-500 rounded-b-2xl" />
    </motion.div>
  );
}

export default function AnimatedDemo() {
  return (
    <div className="relative w-full h-full bg-[#050505] overflow-hidden flex flex-col items-center justify-center font-sans">
      
      {/* 4D Animated Background */}
      <motion.div 
        animate={{ 
          backgroundPosition: ["0% 50%", "100% 50%", "0% 50%"],
          scale: [1, 1.1, 1] 
        }}
        transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
        className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-purple-900/30 via-[#050505] to-terracotta-900/20"
        style={{ backgroundSize: "200% 200%" }}
      />
      
      {/* Floating Light Orbs in Background */}
      <motion.div 
        animate={{ y: [0, -50, 0], x: [0, 30, 0], scale: [1, 1.2, 1] }} 
        transition={{ duration: 10, repeat: Infinity, ease: "easeInOut" }}
        className="absolute top-1/4 left-1/4 w-64 h-64 bg-terracotta-500/20 rounded-full blur-[100px]" 
      />
      <motion.div 
        animate={{ y: [0, 60, 0], x: [0, -40, 0], scale: [1, 1.3, 1] }} 
        transition={{ duration: 12, repeat: Infinity, ease: "easeInOut" }}
        className="absolute bottom-1/4 right-1/4 w-72 h-72 bg-purple-500/20 rounded-full blur-[100px]" 
      />

      {/* Main Content */}
      <div className="relative z-10 text-center px-6 perspective-1000">
        <motion.div
          initial={{ opacity: 0, y: 30, scale: 0.9 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          transition={{ duration: 1, type: "spring" }}
        >
          <span className="inline-block py-1.5 px-4 rounded-full bg-white/5 text-white/80 text-xs font-semibold border border-white/10 mb-6 backdrop-blur-md shadow-[0_0_15px_rgba(255,255,255,0.1)]">
            ✨ Step into the Future
          </span>
          <h1 className="text-4xl md:text-6xl font-black text-transparent bg-clip-text bg-gradient-to-r from-terracotta-300 via-pink-300 to-purple-300 mb-4 tracking-tighter drop-shadow-lg">
            Experience True <br /> Motion Magic.
          </h1>
          <p className="text-gray-400 max-w-md mx-auto text-sm md:text-base font-light">
            We build websites that don't just look good. They react, move, and captivate your audience in 4D.
          </p>
        </motion.div>

        {/* 4D Interactive Cards */}
        <div className="mt-14 flex flex-wrap gap-6 justify-center perspective-1000">
          {[
            { icon: "⚡", text: "Blazing Fast" },
            { icon: "🎨", text: "Pixel Perfect" },
            { icon: "🌌", text: "3D Effects" }
          ].map((item, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 50 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.5 + (i * 0.15), duration: 0.8, type: "spring" }}
            >
              <MagicCard item={item} />
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );
}