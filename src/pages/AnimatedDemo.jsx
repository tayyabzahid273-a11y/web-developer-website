import React from "react";
import { motion } from "framer-motion";

export default function AnimatedDemo() {
  return (
    <div className="relative w-full h-full bg-[#0a0a0a] overflow-hidden flex flex-col items-center justify-center font-sans">
      {/* Animated Gradient Background */}
      <motion.div 
        animate={{ 
          backgroundPosition: ["0% 50%", "100% 50%", "0% 50%"],
          scale: [1, 1.2, 1],
          rotate: [0, 90, 0]
        }}
        transition={{ duration: 15, repeat: Infinity, ease: "linear" }}
        className="absolute inset-0 bg-gradient-to-br from-purple-900/40 via-[#0a0a0a] to-terracotta-900/40"
        style={{ backgroundSize: "200% 200%" }}
      />
      
      {/* Floating Orbs */}
      <motion.div 
        animate={{ y: [0, -30, 0], x: [0, 20, 0] }} 
        transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
        className="absolute top-10 left-10 w-32 h-32 bg-terracotta-500/30 rounded-full blur-2xl" 
      />
      <motion.div 
        animate={{ y: [0, 40, 0], x: [0, -20, 0] }} 
        transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
        className="absolute bottom-10 right-10 w-48 h-48 bg-purple-500/20 rounded-full blur-3xl" 
      />

      {/* Center Content */}
      <div className="relative z-10 text-center px-6">
        <motion.div
          initial={{ opacity: 0, y: 30, scale: 0.8 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          transition={{ duration: 0.8 }}
        >
          <span className="inline-block py-1 px-3 rounded-full bg-white/10 text-white/80 text-xs font-medium border border-white/20 mb-6 backdrop-blur-md">
            ✨ The Future of Web
          </span>
          <h1 className="text-4xl md:text-5xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-terracotta-300 via-pink-300 to-purple-300 mb-4 tracking-tight">
            Experience True <br /> Animation Magic.
          </h1>
          <p className="text-gray-400 max-w-md mx-auto text-sm md:text-base">
            We build websites that don't just look good, they move, breathe, and captivate your audience.
          </p>
        </motion.div>

        {/* Animated Cards Row */}
        <div className="mt-10 flex gap-4 justify-center perspective-1000">
          {[
            { icon: "⚡", text: "Blazing Fast" },
            { icon: "🎨", text: "Pixel Perfect" },
            { icon: "🌌", text: "3D Effects" }
          ].map((item, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, rotateY: 90 }}
              animate={{ opacity: 1, rotateY: 0 }}
              transition={{ delay: 0.5 + (i * 0.2), duration: 0.6 }}
              whileHover={{ scale: 1.1, rotateX: 10, rotateY: -10, z: 50 }}
              className="w-24 h-28 sm:w-28 sm:h-32 bg-white/5 backdrop-blur-lg border border-white/10 rounded-2xl flex flex-col items-center justify-center gap-2 shadow-[0_0_20px_rgba(255,255,255,0.05)] cursor-pointer"
            >
              <span className="text-3xl drop-shadow-[0_0_10px_rgba(255,255,255,0.5)]">{item.icon}</span>
              <span className="text-xs font-semibold text-white/80">{item.text}</span>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );
}