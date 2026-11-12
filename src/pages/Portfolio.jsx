import { useState } from "react";
import { Link } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { projects } from "../data/projects";
import { buildDemoPage } from "../components/buildDemoPage";

const ease = [0.22, 1, 0.36, 1];
const categories = ["All", "AI", "Landing Page", "E-commerce", "Branding", "UI/UX", "Full-Stack", "Portfolio"];

function ProjectCard({ project }) {
  return (
    <motion.article layout initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }} exit={{ opacity: 0, scale: 0.9 }}
      transition={{ duration: 0.4, ease }} whileHover={{ y: -8 }}
      className="group overflow-hidden rounded-[2rem] bg-cream-50 shadow-card transition-all duration-500 hover:shadow-soft border border-blush-100 sm:rounded-[2.5rem]"
    >
      <Link to={`/project/${project.id}`} className="block">
        <div className={`relative aspect-[4/3] p-3 sm:p-5 md:p-6 ${project.gradient}`}>
          <div className="absolute inset-0 flex flex-col overflow-hidden rounded-xl bg-white shadow-lg transition-transform duration-700 group-hover:scale-105 m-3 sm:m-5 md:m-6 border border-blush-100 sm:rounded-2xl">
            <div className="flex items-center gap-1 border-b border-blush-100 bg-cream-50/80 px-2 py-1.5 sm:gap-1.5 sm:px-4 sm:py-3">
              <span className="h-1.5 w-1.5 rounded-full bg-blush-300 sm:h-2.5 sm:w-2.5" />
              <span className="h-1.5 w-1.5 rounded-full bg-cream-300 sm:h-2.5 sm:w-2.5" />
              <span className="h-1.5 w-1.5 rounded-full bg-sage-300 sm:h-2.5 sm:w-2.5" />
            </div>
            <div className="relative flex-1 overflow-hidden pointer-events-none bg-white">
              <iframe title={`${project.title} Preview`} srcDoc={buildDemoPage(project)} className="w-full h-[150%] border-0 origin-top absolute inset-0 scale-[1.01]" sandbox="allow-scripts" tabIndex="-1" />
            </div>
          </div>
          <div className="absolute inset-0 flex items-center justify-center bg-ink/20 opacity-0 backdrop-blur-[2px] transition-opacity duration-300 group-hover:opacity-100 z-10 m-3 sm:m-5 md:m-6 rounded-xl sm:rounded-2xl">
            <span className="rounded-full bg-cream-50 px-4 py-2 text-xs font-bold text-terracotta-600 shadow-xl transform translate-y-4 group-hover:translate-y-0 transition-transform duration-300 sm:px-6 sm:py-2.5 sm:text-sm">
              View Live Demo →
            </span>
          </div>
        </div>
        <div className="p-5 sm:p-8">
          <div className="flex items-center justify-between mb-2 sm:mb-3">
            <span className="rounded-full bg-sage-100 px-2.5 py-1 text-[10px] font-semibold text-sage-700 sm:px-3.5 sm:py-1.5 sm:text-xs">{project.category}</span>
            <span className="text-[10px] font-medium text-ink/40 sm:text-xs">{project.duration}</span>
          </div>
          <h3 className="text-xl font-heading font-semibold group-hover:text-terracotta-500 transition-colors sm:text-2xl">{project.title}</h3>
          <p className="mt-1 text-xs leading-relaxed text-ink/60 line-clamp-2 sm:mt-2 sm:text-sm">{project.desc}</p>
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
      <section className="relative overflow-hidden bg-gradient-to-b from-blush-50 via-cream-100 to-cream-100 pb-12 pt-28 sm:pb-16 sm:pt-40">
        <div aria-hidden="true" className="pointer-events-none absolute -left-20 top-24 h-48 w-48 rounded-full bg-blush-200/50 blur-3xl sm:h-72 sm:w-72" />
        <div aria-hidden="true" className="pointer-events-none absolute -right-20 top-10 h-48 w-48 rounded-full bg-sage-200/50 blur-3xl sm:h-72 sm:w-72" />
        <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.7, ease }} className="relative mx-auto max-w-3xl px-6 text-center z-10">
          <span className="inline-block rounded-full bg-sage-100 px-3 py-1 text-xs font-medium text-sage-600 mb-4 sm:px-4 sm:py-1.5 sm:text-sm sm:mb-6">🌸 Handcrafted with love</span>
          <h1 className="font-heading text-3xl font-semibold leading-[1.1] sm:text-4xl md:text-5xl lg:text-6xl text-ink">
            Beautiful Websites & <br className="hidden sm:block"/> <span className="italic text-terracotta-500">AI Apps</span>
          </h1>
          <p className="mt-4 text-sm leading-relaxed text-ink/70 max-w-xl mx-auto sm:mt-6 sm:text-lg">
            Take a look at the digital experiences we've crafted for our amazing clients around the world.
          </p>
        </motion.div>
      </section>

      <section className="bg-cream-100 pb-16 pt-4 relative z-20 sm:pb-24">
        <div className="mx-auto max-w-7xl px-4 sm:px-6">
          <div className="mb-10 flex flex-wrap justify-center gap-2 bg-cream-50/80 backdrop-blur-md p-1.5 rounded-full w-fit mx-auto border border-blush-100 shadow-sm sm:mb-16 sm:gap-3 sm:p-2">
            {categories.map((c) => (
              <button key={c} onClick={() => setActive(c)}
                className={`rounded-full px-3 py-1.5 text-xs font-semibold transition-all duration-300 sm:px-6 sm:py-2.5 sm:text-sm ${
                  active === c ? "bg-terracotta-500 text-cream-50 shadow-soft" : "text-ink/60 hover:bg-blush-100"
                }`}
              >
                {c}
              </button>
            ))}
          </div>
          <motion.div layout className="grid gap-6 sm:grid-cols-2 sm:gap-8 lg:grid-cols-3">
            <AnimatePresence mode="popLayout">
              {filtered.map((p) => <ProjectCard key={p.id} project={p} />)}
            </AnimatePresence>
          </motion.div>
        </div>
      </section>

      <section className="bg-blush-50 py-16 rounded-t-[2rem] sm:py-24 sm:rounded-t-[3rem]">
        <motion.div initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.7, ease }} className="mx-auto max-w-2xl px-6 text-center">
          <h2 className="font-heading text-2xl font-semibold mb-3 text-ink sm:text-3xl sm:mb-4 md:text-4xl">Like what you see?</h2>
          <p className="text-ink/70 text-sm mb-6 sm:text-lg sm:mb-8">Let's create something beautiful for your brand too.</p>
          <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.97 }} className="inline-block">
            <Link to="/order" className="btn-primary !px-6 !py-3 text-sm shadow-soft sm:!px-8 sm:!py-4 sm:text-lg">Start your project</Link>
          </motion.div>
        </motion.div>
      </section>
    </div>
  );
}