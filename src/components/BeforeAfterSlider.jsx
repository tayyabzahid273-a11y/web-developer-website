import React, { useState, useRef, useCallback, useEffect } from "react";

export default function BeforeAfterSlider() {
  const [sliderPosition, setSliderPosition] = useState(50);
  const [isDragging, setIsDragging] = useState(false);
  const [containerWidth, setContainerWidth] = useState(0);
  const containerRef = useRef(null);

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

  const handleMouseMove = useCallback(
    (e) => {
      if (!isDragging) return;
      updatePosition(e.clientX);
    },
    [isDragging, updatePosition]
  );

  const handleTouchMove = useCallback(
    (e) => {
      if (!isDragging) return;
      e.preventDefault();
      updatePosition(e.touches[0].clientX);
    },
    [isDragging, updatePosition]
  );

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
    <div className="w-full max-w-5xl mx-auto select-none px-4 sm:px-0 py-10">
      <div className="text-center mb-8">
        <h2 className="font-heading text-3xl font-semibold sm:text-4xl md:text-5xl text-ink mb-3">
          From Code to <span className="italic text-terracotta-500">Magic</span>
        </h2>
        <p className="text-sm text-ink/70 sm:text-base">Drag the slider to see how we bring designs to life.</p>
      </div>

      <div
        ref={containerRef}
        className="relative w-full h-[350px] sm:h-[480px] rounded-3xl overflow-hidden shadow-soft border border-blush-100"
      >
        {/* RIGHT SIDE — Colorful Website */}
        <div className="absolute inset-0 h-full w-full">
          <WebsitePreview />
        </div>

        {/* LEFT SIDE — Code Editor */}
        <div
          className="absolute inset-0 h-full overflow-hidden"
          style={{ width: `${sliderPosition}%` }}
        >
          <div
            className="absolute inset-0 h-full"
            style={{ width: containerWidth ? `${containerWidth}px` : "100%" }}
          >
            <CodeEditor />
          </div>
        </div>

        {/* Divider line */}
        <div
          className="pointer-events-none absolute top-0 h-full w-[2px] bg-terracotta-500 shadow-[0_0_8px_rgba(201,111,74,0.6)] z-10"
          style={{ left: `${sliderPosition}%`, transform: "translateX(-50%)" }}
        />

        {/* Draggable Handle */}
        <div
          className="absolute top-1/2 z-20 flex h-10 w-10 sm:h-14 sm:w-14 cursor-ew-resize items-center justify-center rounded-full border-2 border-terracotta-500 bg-cream-50 shadow-xl backdrop-blur transition-transform hover:scale-110 active:scale-95"
          style={{ left: `${sliderPosition}%`, transform: "translate(-50%, -50%)" }}
          onMouseDown={(e) => {
            e.preventDefault();
            setIsDragging(true);
          }}
          onTouchStart={() => setIsDragging(true)}
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2.5"
            strokeLinecap="round"
            strokeLinejoin="round"
            className="h-4 w-4 sm:h-6 sm:w-6 text-terracotta-600"
          >
            <path d="M9 6l-6 6 6 6" />
            <path d="M15 6l6 6-6 6" />
          </svg>
        </div>
      </div>

      {/* Labels */}
      <div className="mt-3 flex justify-between px-2 text-xs font-medium sm:text-sm">
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

function CodeEditor() {
  return (
    <div className="flex h-full w-full flex-col bg-[#1e1e2e] font-mono text-[11px] sm:text-[13px]">
      {/* Title bar */}
      <div className="flex items-center gap-2 border-b border-black/30 bg-[#181825] px-4 py-2.5">
        <span className="h-2.5 w-2.5 rounded-full bg-[#ff5f56] sm:h-3 sm:w-3" />
        <span className="h-2.5 w-2.5 rounded-full bg-[#ffbd2e] sm:h-3 sm:w-3" />
        <span className="h-2.5 w-2.5 rounded-full bg-[#27c93f] sm:h-3 sm:w-3" />
        <span className="ml-3 rounded-t bg-[#1e1e2e] px-3 py-1 text-[10px] text-slate-300 border-t border-x border-black/20 sm:text-xs">
          App.jsx
        </span>
      </div>

      {/* Code body */}
      <div className="flex-1 overflow-hidden px-2 py-3 sm:px-4 sm:py-4">
        <pre className="leading-5 sm:leading-6 text-slate-300">
          <code>
            {[
              { n: 1, content: <><span className="text-pink-400">&lt;div</span> <span className="text-emerald-400">className</span>=<span className="text-amber-300">"hero"</span><span className="text-pink-400">&gt;</span></> },
              { n: 2, content: <>&nbsp;&nbsp;<span className="text-pink-400">&lt;h1&gt;</span><span className="text-slate-200">We design websites</span><span className="text-pink-400">&lt;/h1&gt;</span></> },
              { n: 3, content: <>&nbsp;&nbsp;<span className="text-pink-400">&lt;p&gt;</span><span className="text-slate-200">People fall in love with.</span><span className="text-pink-400">&lt;/p&gt;</span></> },
              { n: 4, content: <><span className="text-pink-400">&lt;/div&gt;</span></> },
              { n: 5, content: <></> },
              { n: 6, content: <><span className="text-purple-400">.hero</span> <span className="text-slate-400">{"{"}</span></> },
              { n: 7, content: <>&nbsp;&nbsp;<span className="text-sky-400">display</span>: <span className="text-amber-300">flex</span>;</> },
              { n: 8, content: <>&nbsp;&nbsp;<span className="text-sky-400">background</span>: <span className="text-amber-300">linear-gradient</span>(<span className="text-emerald-400">135deg</span>,</> },
              { n: 9, content: <>&nbsp;&nbsp;&nbsp;&nbsp;<span className="text-amber-300">#fde8ea</span>, <span className="text-amber-300">#fdf8ee</span>);</> },
              { n: 10, content: <>&nbsp;&nbsp;<span className="text-sky-400">border-radius</span>: <span className="text-emerald-400">2rem</span>;</> },
              { n: 11, content: <><span className="text-slate-400">{"}"}</span></> },
              { n: 12, content: <></> },
              { n: 13, content: <><span className="text-slate-500">{"/* responsive */"}</span></> },
              { n: 14, content: <><span className="text-purple-400">@media</span> (<span className="text-sky-400">max-width</span>: <span className="text-emerald-400">768px</span>) {"{"}</> },
              { n: 15, content: <>&nbsp;&nbsp;<span className="text-purple-400">.hero</span> <span className="text-slate-400">{"{"}</span> <span className="text-sky-400">flex-direction</span>: <span className="text-amber-300">column</span>; <span className="text-slate-400">{"}"}</span></> },
              { n: 16, content: <><span className="text-slate-400">{"}"}</span></> },
            ].map((line) => (
              <div key={line.n} className="flex">
                <span className="mr-3 sm:mr-4 w-4 sm:w-5 select-none text-right text-slate-600">
                  {line.n}
                </span>
                <span className="whitespace-pre">{line.content}</span>
              </div>
            ))}
          </code>
        </pre>
      </div>
    </div>
  );
}

function WebsitePreview() {
  return (
    <div className="h-full w-full overflow-hidden bg-cream-100">
      {/* Nav */}
      <div className="flex items-center justify-between bg-cream-50 px-4 sm:px-6 py-4 shadow-sm border-b border-blush-100">
        <div className="flex items-center gap-2">
          <div className="h-6 w-6 sm:h-7 sm:w-7 rounded-lg bg-terracotta-500" />
          <span className="font-heading font-bold text-ink">Petal Studio</span>
        </div>
        <div className="hidden gap-6 text-xs sm:text-sm font-medium text-ink/70 sm:flex">
          <span>Home</span>
          <span>About</span>
          <span>Portfolio</span>
        </div>
        <button className="rounded-full bg-terracotta-500 px-3 py-1.5 text-xs sm:text-sm font-semibold text-cream-50 shadow">
          Start Order
        </button>
      </div>

      {/* Hero */}
      <div className="relative flex flex-col items-center justify-center gap-3 bg-gradient-to-br from-blush-200 via-cream-100 to-sage-100 px-4 sm:px-6 py-10 sm:py-14 text-center">
        <h1 className="font-heading text-xl sm:text-3xl font-semibold text-ink">
          We design websites <br/> people fall in love with.
        </h1>
        <p className="max-w-md text-xs sm:text-sm text-ink/60">
          Choose a package, tell us about your brand, and track your project from first sketch to launch day.
        </p>
        <button className="mt-2 rounded-full bg-terracotta-500 px-5 py-2 text-xs sm:text-sm font-bold text-cream-50 shadow-lg">
          Place an Order
        </button>
      </div>

      {/* Cards */}
      <div className="grid grid-cols-1 gap-3 sm:gap-4 px-4 sm:px-6 py-6 sm:grid-cols-3">
        {[
          { color: "bg-blush-100", title: "Custom Design" },
          { color: "bg-sage-100", title: "Landing Pages" },
          { color: "bg-cream-200", title: "E-commerce" },
        ].map((card) => (
          <div
            key={card.title}
            className="rounded-xl bg-cream-50 p-3 sm:p-4 shadow-card ring-1 ring-blush-100/50"
          >
            <div className={`mb-3 h-16 sm:h-20 w-full rounded-lg ${card.color}`} />
            <h3 className="font-heading text-sm sm:text-base font-semibold text-ink">{card.title}</h3>
            <p className="mt-1 text-[10px] sm:text-xs text-ink/60">
              Everything you need, nothing you don't.
            </p>
          </div>
        ))}
      </div>
    </div>
  );
}