import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { projects } from "../data/projects"; 

const ease = [0.22, 1, 0.36, 1];
const categories = ["All", "AI", "Landing Page", "E-commerce", "Branding", "UI/UX", "Full-Stack", "Portfolio", "Restaurant", "Agency", "Real Estate", "Fitness", "Travel", "Photography", "Blog", "Education", "Event", "Medical", "Startup", "Architecture"];

function ProjectCard({ project, onClick }) {
  return (
    <motion.article 
      layout 
      initial={{ opacity: 0, scale: 0.9 }} 
      animate={{ opacity: 1, scale: 1 }} 
      exit={{ opacity: 0, scale: 0.9 }}
      transition={{ duration: 0.4, ease }} 
      whileHover={{ y: -8 }}
      onClick={() => onClick(project)}
      className="group overflow-hidden rounded-[2rem] bg-cream-50 shadow-card transition-all duration-500 hover:shadow-soft border border-blush-100 sm:rounded-[2.5rem] flex flex-col w-full cursor-pointer"
    >
      <div className="relative w-full aspect-[4/3] bg-white border-b border-blush-100 overflow-hidden">
        
        {/* Browser Top Bar */}
        <div className="absolute top-0 left-0 right-0 h-6 bg-[#f1f1f1] flex items-center px-3 gap-1.5 z-20 border-b border-gray-200">
          <div className="h-2 w-2 rounded-full bg-[#ff5f56]"></div>
          <div className="h-2 w-2 rounded-full bg-[#ffbd2e]"></div>
          <div className="h-2 w-2 rounded-full bg-[#27c93f]"></div>
          <div className="ml-2 h-3 w-1/2 bg-white rounded-sm border border-gray-300 text-[6px] text-gray-400 flex items-center px-1 overflow-hidden whitespace-nowrap">
            {project.demoUrl}
          </div>
        </div>

        {/* Live Preview Iframe (FIXED PATH) */}
        <div className="absolute inset-0 top-6 w-[200%] h-[200%] scale-50 origin-top-left pointer-events-none overflow-hidden">
          <iframe 
            src={window.location.origin + project.demoUrl} 
            title={project.title} 
            className="w-full h-full border-0"
            scrolling="no"
            loading="lazy"
          />
        </div>

        {/* Hover Overlay */}
        <div className="absolute inset-0 bg-ink/40 opacity-0 backdrop-blur-[2px] transition-opacity duration-300 group-hover:opacity-100 z-30 flex items-center justify-center">
          <span className="rounded-full bg-cream-50 px-6 py-2.5 text-sm font-bold text-terracotta-600 shadow-xl transform translate-y-4 group-hover:translate-y-0 transition-transform duration-300 flex items-center gap-2">
            View Live Demo <span className="text-lg">↗</span>
          </span>
        </div>
      </div>

      <div className="p-5 sm:p-6 flex flex-col flex-1">
        <div className="flex items-center justify-between mb-2 sm:mb-3">
          <span className="rounded-full bg-sage-100 px-2.5 py-1 text-[10px] font-semibold text-sage-700 sm:px-3 sm:py-1.5 sm:text-xs">
            {project.category}
          </span>
          <span className="text-[10px] font-medium text-ink/40 sm:text-xs">{project.duration}</span>
        </div>
        
        <h3 className="text-lg font-heading font-semibold group-hover:text-terracotta-500 transition-colors sm:text-xl">
          {project.title}
        </h3>
        <p className="mt-1 text-xs leading-relaxed text-ink/60 line-clamp-2 sm:text-sm flex-1">
          {project.desc}
        </p>
      </div>
    </motion.article>
  );
}

export default function Portfolio() {
  const [active, setActive] = useState("All");
  const [selectedDemo, setSelectedDemo] = useState(null); 
  
  const filtered = active === "All" ? projects : projects.filter((p) => p.category === active);

  return (
    <div className="bg-cream-100 min-h-screen w-full max-w-full overflow-x-hidden relative">
      
      {/* MODAL POPUP (FIXED PATH) */}
      <AnimatePresence>
        {selectedDemo && (
          <motion.div 
            initial={{ opacity: 0 }} 
            animate={{ opacity: 1 }} 
            exit={{ opacity: 0 }} 
            className="fixed inset-0 z-[100] flex items-center justify-center bg-ink/80 p-2 sm:p-6 backdrop-blur-sm"
          >
            <motion.div 
              initial={{ scale: 0.95, y: 20 }} 
              animate={{ scale: 1, y: 0 }} 
              exit={{ scale: 0.95, y: 20 }} 
              className="relative w-full max-w-6xl h-[90vh] bg-white rounded-2xl overflow-hidden shadow-2xl flex flex-col"
            >
              <div className="flex items-center justify-between px-4 py-3 bg-cream-50 border-b border-blush-100">
                <h3 className="font-heading font-semibold text-lg">{selectedDemo.title} - Live Preview</h3>
                <button 
                  onClick={() => setSelectedDemo(null)} 
                  className="flex h-8 w-8 items-center justify-center rounded-full bg-blush-100 text-ink hover:bg-terracotta-500 hover:text-white transition-colors"
                >
                  ✕
                </button>
              </div>
              
              <div className="flex-1 w-full bg-gray-100">
                <iframe 
                  src={window.location.origin + selectedDemo.demoUrl} 
                  title={selectedDemo.title} 
                  className="w-full h-full border-0"
                />
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* HERO */}
      <section className="relative overflow-hidden bg-gradient-to-b from-blush-50 via-cream-100 to-cream-100 pb-12 pt-28 sm:pb-16 sm:pt-40">
        <div className="relative mx-auto max-w-3xl px-6 text-center z-10">
          <span className="inline-block rounded-full bg-sage-100 px-3 py-1 text-xs font-medium text-sage-600 mb-4 sm:px-4 sm:py-1.5 sm:text-sm sm:mb-6">🌸 Handcrafted with love</span>
          <h1 className="font-heading text-3xl font-semibold leading-[1.1] sm:text-4xl md:text-5xl lg:text-6xl text-ink">
            Beautiful Websites & <br className="hidden sm:block"/> <span className="italic text-terracotta-500">Live Demos</span>
          </h1>
          <p className="mt-4 text-sm leading-relaxed text-ink/70 max-w-xl mx-auto sm:mt-6 sm:text-lg">
            Click on any card to preview the real website inside our platform.
          </p>
        </div>
      </section>

      {/* GRID SECTION */}
      <section className="bg-cream-100 pb-16 pt-4 relative z-20 sm:pb-24 w-full">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 w-full">
          
          <div className="mb-8 flex flex-wrap justify-center gap-2 bg-cream-50/80 backdrop-blur-md p-1.5 rounded-full w-fit mx-auto border border-blush-100 shadow-sm sm:mb-12 sm:gap-3 sm:p-2">
            {categories.map((c) => (
              <button key={c} onClick={() => setActive(c)}
                className={`rounded-full px-3 py-1.5 text-xs font-semibold transition-all duration-300 sm:px-5 sm:py-2 sm:text-sm ${
                  active === c ? "bg-terracotta-500 text-cream-50 shadow-soft" : "text-ink/60 hover:bg-blush-100"
                }`}
              >
                {c}
              </button>
            ))}
          </div>

          <motion.div layout className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5 sm:gap-6 lg:gap-8 w-full">
            <AnimatePresence mode="popLayout">
              {filtered.map((p) => (
                <ProjectCard key={p.id} project={p} onClick={setSelectedDemo} />
              ))}
            </AnimatePresence>
          </motion.div>

        </div>
      </section>
    </div>
  );
}