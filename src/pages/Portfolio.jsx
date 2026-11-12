import { useState } from "react";
import { Link } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { projects } from "../data/projects";
import { buildDemoPage } from "../components/buildDemoPage";

const ease = [0.22, 1, 0.36, 1];

const categories = ["All", "AI", "Landing Page", "E-commerce", "Branding", "UI/UX", "Full-Stack", "Portfolio"];

function ProjectCard({ project }) {
  return (
    <motion.article
      layout
      initial={{ opacity: 0, scale: 0.9 }}
      animate={{ opacity: 1, scale: 1 }}
      exit={{ opacity: 0, scale: 0.9 }}
      transition={{ duration: 0.4, ease }}
      whileHover={{ y: -8 }}
      className="group overflow-hidden rounded-[2.5rem] bg-cream-50 shadow-card transition-all duration-500 hover:shadow-soft border border-blush-100"
    >
      <Link to={`/project/${project.id}`} className="block">
        
        {/* Pyara sa Browser Frame */}
        <div className={`relative aspect-[4/3] p-4 sm:p-6 ${project.gradient}`}>
          <div className="absolute inset-0 flex flex-col overflow-hidden rounded-2xl bg-white shadow-lg transition-transform duration-700 group-hover:scale-105 m-4 sm:m-6 border border-blush-100">
            
            {/* Mac Dots */}
            <div className="flex items-center gap-1.5 border-b border-blush-100 bg-cream-50/80 px-4 py-3">
              <span className="h-2.5 w-2.5 rounded-full bg-blush-300" />
              <span className="h-2.5 w-2.5 rounded-full bg-cream-300" />
              <span className="h-2.5 w-2.5 rounded-full bg-sage-300" />
              <div className="ml-3 h-4 w-32 rounded-full bg-blush-100/50" />
            </div>

            {/* REAL LIVE DEMO INSIDE CARD */}
            <div className="relative flex-1 overflow-hidden pointer-events-none bg-white">
              <iframe
                title={`${project.title} Preview`}
                srcDoc={buildDemoPage(project)}
                className="w-full h-[150%] border-0 origin-top absolute inset-0 scale-[1.01]"
                sandbox="allow-scripts"
                tabIndex="-1"
              />
            </div>
          </div>

          {/* Hover Overlay */}
          <div className="absolute inset-0 flex items-center justify-center bg-ink/20 opacity-0 backdrop-blur-[2px] transition-opacity duration-300 group-hover:opacity-100 z-10 m-4 sm:m-6 rounded-2xl">
            <span className="rounded-full bg-cream-50 px-6 py-2.5 text-sm font-bold text-terracotta-600 shadow-xl transform translate-y-4 group-hover:translate-y-0 transition-transform duration-300">
              View Live Demo →
            </span>
          </div>
        </div>

        {/* Text Info */}
        <div className="p-8">
          <div className="flex items-center justify-between mb-3">
            <span className="rounded-full bg-sage-100 px-3.5 py-1.5 text-xs font-semibold text-sage-700">
              {project.category}
            </span>
            <span className="text-xs font-medium text-ink/40">{project.duration}</span>
          </div>
          <h3 className="text-2xl font-heading font-semibold group-hover:text-terracotta-500 transition-colors">{project.title}</h3>
          <p className="mt-2 text-sm leading-relaxed text-ink/60 line-clamp-2">{project.desc}</p>
        </div>
      </Link>
    </motion.article>
  );
}

export default function Portfolio() {
  const [active, setActive] = useState("All");
  const filtered = active === "All" ? projects : projects.filter((p) => p.category === active);

  return (
    <div className="bg-cream-100 min-h-screen">
      
      {/* Pyara aur Soft Header */}
      <section className="relative overflow-hidden bg-gradient-to-b from-blush-50 via-cream-100 to-cream-100 pb-16 pt-40">
        <div aria-hidden="true" className="pointer-events-none absolute -left-20 top-24 h-72 w-72 rounded-full bg-blush-200/50 blur-3xl" />
        <div aria-hidden="true" className="pointer-events-none absolute -right-20 top-10 h-72 w-72 rounded-full bg-sage-200/50 blur-3xl" />

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, ease }}
          className="relative mx-auto max-w-3xl px-6 text-center z-10"
        >
          <span className="inline-block rounded-full bg-sage-100 px-4 py-1.5 text-sm font-medium text-sage-600 mb-6">
            🌸 Handcrafted with love
          </span>
          <h1 className="font-heading text-5xl font-semibold leading-[1.1] sm:text-6xl text-ink">
            Beautiful Websites & <br className="hidden sm:block"/> <span className="italic text-terracotta-500">AI Apps</span>
          </h1>
          <p className="mt-6 text-lg leading-relaxed text-ink/70 max-w-xl mx-auto">
            Take a look at the digital experiences we've crafted for our amazing clients around the world.
          </p>
        </motion.div>
      </section>

      {/* Filters & Grid */}
      <section className="bg-cream-100 pb-24 pt-4 relative z-20">
        <div className="mx-auto max-w-7xl px-6">
          
          {/* Soft Filter Buttons */}
          <div className="mb-16 flex flex-wrap justify-center gap-3 bg-cream-50/80 backdrop-blur-md p-2 rounded-full w-fit mx-auto border border-blush-100 shadow-sm">
            {categories.map((c) => (
              <button
                key={c}
                onClick={() => setActive(c)}
                className={`rounded-full px-6 py-2.5 text-sm font-semibold transition-all duration-300 ${
                  active === c
                    ? "bg-terracotta-500 text-cream-50 shadow-soft"
                    : "text-ink/60 hover:bg-blush-100"
                }`}
              >
                {c}
              </button>
            ))}
          </div>

          <motion.div layout className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
            <AnimatePresence mode="popLayout">
              {filtered.map((p) => (
                <ProjectCard key={p.id} project={p} />
              ))}
            </AnimatePresence>
          </motion.div>
        </div>
      </section>

      {/* Pyara CTA */}
      <section className="bg-blush-50 py-24 rounded-t-[3rem]">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7, ease }}
          className="mx-auto max-w-2xl px-6 text-center"
        >
          <h2 className="font-heading text-4xl font-semibold mb-4 text-ink">Like what you see?</h2>
          <p className="text-ink/70 text-lg mb-8">Let's create something beautiful for your brand too.</p>
          <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.97 }} className="inline-block">
            <Link to="/order" className="btn-primary !px-8 !py-4 text-lg shadow-soft">
              Start your project
            </Link>
          </motion.div>
        </motion.div>
      </section>
    </div>
  );
}