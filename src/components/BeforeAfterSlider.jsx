import React, { useState, useRef, useCallback, useEffect } from "react";
import { motion, useMotionValue, useSpring, useTransform } from "framer-motion";
import AnimatedDemo from "../pages/AnimatedDemo"; // <-- Naya Page Import kiya

export default function BeforeAfterSlider() {
  const [sliderPosition, setSliderPosition] = useState(50);
  const [isDragging, setIsDragging] = useState(false);
  const [containerWidth, setContainerWidth] = useState(0);
  const containerRef = useRef(null);

  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);
  const springConfig = { stiffness: 100, damping: 20 };
  const rotateX = useSpring(useTransform(mouseY, [-0.5, 0.5], [5, -5]), springConfig);
  const rotateY = useSpring(useTransform(mouseX, [-0.5, 0.5], [-5, 5]), springConfig);

  useEffect(() => {
    if (!containerRef.current) return;
    const el = containerRef.current;
    const updateWidth = () => setContainerWidth(el.offsetWidth);
    updateWidth();
    const resizeObserver = new ResizeObserver(updateWidth);
    resizeObserver.observe(el);
    return () => resizeObserver.disconnect();
  }, []);

  const updatePosition = useCallback((clientX) => {
    if (!containerRef.current) return;
    const rect = containerRef.current.getBoundingClientRect();
    let percent = ((clientX - rect.left) / rect.width) * 100;
    percent = Math.max(0, Math.min(100, percent));
    setSliderPosition(percent);
  }, []);

  const handleMouseMove = useCallback((e) => {
      if (!containerRef.current) return;
      const rect = containerRef.current.getBoundingClientRect();
      mouseX.set((e.clientX - rect.left) / rect.width - 0.5);
      mouseY.set((e.clientY - rect.top) / rect.height - 0.5);
      if (!isDragging) return;
      updatePosition(e.clientX);
    }, [isDragging, updatePosition, mouseX, mouseY]);

  const handleTouchMove = useCallback((e) => {
      if (!isDragging) return;
      e.preventDefault();
      updatePosition(e.touches[0].clientX);
    }, [isDragging, updatePosition]);

  const stopDragging = useCallback(() => setIsDragging(false), []);

  useEffect(() => {
    if (!isDragging) return;
    window.addEventListener("mousemove", handleMouseMove);
    window.addEventListener("mouseup", stopDragging);
    window.addEventListener("touchmove", handleTouchMove, { passive: false });
    window.addEventListener("touchend", stopDragging);
    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
      window.removeEventListener("mouseup", stopDragging);
      window.removeEventListener("touchmove", handleTouchMove);
      window.removeEventListener("touchend", stopDragging);
    };
  }, [isDragging, handleMouseMove, handleTouchMove, stopDragging]);

  return (
    <div className="w-full max-w-5xl mx-auto select-none px-4 sm:px-0 py-16">
      <div className="text-center mb-10">
        <h2 className="font-heading text-3xl font-semibold sm:text-4xl md:text-5xl text-ink mb-3">
          Code to <span className="italic text-terracotta-500">Magic</span>
        </h2>
        <p className="text-sm text-ink/70 sm:text-base">Drag the slider to see the difference.</p>
      </div>

      <div
        ref={containerRef}
        onMouseMove={handleMouseMove}
        onMouseLeave={() => { setIsDragging(false); mouseX.set(0); mouseY.set(0); }}
        className="relative w-full h-[400px] sm:h-[500px] rounded-3xl overflow-hidden shadow-2xl border border-gray-800"
      >
        {/* RIGHT SIDE — NAYA ANIMATED DEMO */}
        <div className="absolute inset-0 h-full w-full">
          <AnimatedDemo />
        </div>

        {/* LEFT SIDE — CODE EDITOR */}
        <div
          className="absolute inset-0 h-full overflow-hidden shadow-[10px_0_30px_rgba(0,0,0,0.8)] z-10"
          style={{ width: `${sliderPosition}%` }}
        >
          <div className="absolute inset-0 h-full" style={{ width: containerWidth ? `${containerWidth}px` : "100%" }}>
            <CodeEditor />
          </div>
        </div>

        {/* Divider line */}
        <div
          className="pointer-events-none absolute top-0 h-full w-[3px] bg-terracotta-500 shadow-[0_0_20px_rgba(201,111,74,1)] z-20"
          style={{ left: `${sliderPosition}%`, transform: "translateX(-50%)" }}
        />

        {/* Handle */}
        <motion.div
          whileHover={{ scale: 1.1 }} whileTap={{ scale: 0.95 }}
          className="absolute top-1/2 z-30 flex h-12 w-12 sm:h-16 sm:w-16 cursor-ew-resize items-center justify-center rounded-full border-2 border-terracotta-500 bg-[#0d1117] shadow-[0_0_20px_rgba(201,111,74,0.6)]"
          style={{ left: `${sliderPosition}%`, transform: "translate(-50%, -50%)" }}
          onMouseDown={(e) => { e.preventDefault(); setIsDragging(true); }}
          onTouchStart={() => setIsDragging(true)}
        >
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" className="h-5 w-5 sm:h-6 sm:w-6 text-terracotta-500 animate-pulse">
            <path d="M9 6l-6 6 6 6" /><path d="M15 6l6 6-6 6" />
          </svg>
        </motion.div>
      </div>

      <div className="mt-4 flex justify-between px-2 text-xs font-medium sm:text-sm">
        <span className="flex items-center gap-1.5 text-ink/50">
          <span className="h-2 w-2 rounded-full bg-ink/30" /> Developer View
        </span>
        <span className="flex items-center gap-1.5 text-terracotta-600">
          Designer View <span className="h-2 w-2 rounded-full bg-gradient-to-r from-blush-400 to-sage-400" />
        </span>
      </div>
    </div>
  );
}

/* ---------------- CODE EDITOR (LEFT SIDE) ---------------- */
function CodeEditor() {
  const codeLines = [
    { n: 1, content: <><span className="text-pink-400">&lt;motion.div</span></> },
    { n: 2, content: <>&nbsp;&nbsp;<span className="text-emerald-400">animate</span>=<span className="text-amber-300">{"{{ scale: [1, 1.2, 1] }}"}</span></> },
    { n: 3, content: <>&nbsp;&nbsp;<span className="text-emerald-400">transition</span>=<span className="text-amber-300">{"{{ duration: 3 }}"}</span></> },
    { n: 4, content: <>&nbsp;&nbsp;<span className="text-emerald-400">className</span>=<span className="text-amber-300">"bg-gradient-to-r"</span></> },
    { n: 5, content: <><span className="text-pink-400">&gt;</span></> },
    { n: 6, content: <>&nbsp;&nbsp;<span className="text-pink-400">&lt;h1</span> <span className="text-emerald-400">className</span>=<span className="text-amber-300">"text-transparent"</span><span className="text-pink-400">&gt;</span></> },
    { n: 7, content: <>&nbsp;&nbsp;&nbsp;&nbsp;Experience Magic<span className="text-pink-400">&lt;/h1&gt;</span></> },
    { n: 8, content: <>&nbsp;&nbsp;<span className="text-pink-400">&lt;GlowingCards</span> <span className="text-emerald-400">count</span>=<span className="text-amber-300">{"{3}"}</span> <span className="text-pink-400">/&gt;</span></> },
    { n: 9, content: <>&nbsp;&nbsp;<span className="text-pink-400">&lt;FloatingOrbs</span> <span className="text-emerald-400">blur</span>=<span className="text-amber-300">"xl"</span> <span className="text-pink-400">/&gt;</span></> },
    { n: 10, content: <><span className="text-pink-400">&lt;/motion.div&gt;</span></> },
    { n: 11, content: <></> },
    { n: 12, content: <><span className="text-slate-500">{"// CSS for 3D cards"}</span></> },
    { n: 13, content: <><span className="text-purple-400">.card</span> <span className="text-slate-400">{"{"}</span></> },
    { n: 14, content: <>&nbsp;&nbsp;<span className="text-sky-400">backdrop-filter</span>: <span className="text-amber-300">blur(10px)</span>;</> },
    { n: 15, content: <>&nbsp;&nbsp;<span className="text-sky-400">box-shadow</span>: <span className="text-amber-300">0 0 20px rgba(255,255,255,0.1)</span>;</> },
    { n: 16, content: <><span className="text-slate-400">{"}"}</span></> },
  ];

  return (
    <div className="flex h-full w-full flex-col bg-[#0d1117] font-mono text-[11px] sm:text-[13px] relative">
      <div className="absolute top-0 right-0 w-1 h-full bg-gradient-to-b from-emerald-400 via-sky-500 to-purple-500 opacity-50" />
      <div className="flex items-center gap-2 border-b border-white/10 bg-[#161b22] px-4 py-3">
        <span className="h-2.5 w-2.5 rounded-full bg-[#ff5f56]" />
        <span className="h-2.5 w-2.5 rounded-full bg-[#ffbd2e]" />
        <span className="h-2.5 w-2.5 rounded-full bg-[#27c93f]" />
        <span className="ml-3 rounded-t bg-[#0d1117] px-3 py-1 text-[10px] text-slate-300 border-t border-x border-white/10">
          Magic.jsx
        </span>
      </div>
      <div className="flex-1 overflow-hidden px-2 py-4 sm:px-4">
        <pre className="leading-6 text-slate-300">
          <code>
            {codeLines.map((line, index) => (
              <motion.div key={line.n} initial={{ opacity: 0, x: -10 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: 0.4, delay: index * 0.1 }} className="flex">
                <span className="mr-4 w-5 select-none text-right text-slate-600">{line.n}</span>
                <span className="whitespace-pre">{line.content}</span>
              </motion.div>
            ))}
          </code>
        </pre>
      </div>
    </div>
  );
}