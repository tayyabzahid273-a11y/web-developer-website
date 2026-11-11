import { useState } from "react";
import { Link } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { projects } from "../data/projects";

const ease = [0.22, 1, 0.36, 1];

// Categories updated to match the new projects data
const categories = ["All", "Full-Stack", "UI/UX", "Frontend"];

function ProjectCard({ project }) {
  return (
    <motion.article
      layout
      initial={{ opacity: 0, scale: 0.9 }}
      animate={{ opacity: 1, scale: 1 }}
      exit={{ opacity: 0, scale: 0.9 }}
      transition={{ duration: 0.4, ease }}
      whileHover={{ y: -8 }}
      className="group overflow-hidden rounded-4xl bg-cream-50 shadow-card transition-shadow duration-300 hover:shadow-soft"
    >
      {/* The whole card is one link */}
      <Link to={`/project/${project.id}`} className="block">
        {/* Thumbnail */}
        <div className={`relative aspect-[4/3] overflow-hidden bg-gradient-to-br ${project.gradient}`}>
          <div className="absolute inset-4 flex flex-col overflow-hidden rounded-2xl bg-cream-50/90 shadow-card transition-transform duration-500 group-hover:scale-105">
            <div className="flex items-center gap-1.5 border-b border-blush-100 px-3 py-2">
              <span className="h-2 w-2 rounded-full bg-blush-300" />
              <span className="h-2 w-2 rounded-full bg-cream-300" />
              <span className="h-2 w-2 rounded-full bg-sage-300" />
            </div>
            <div className="flex flex-1 flex-col items-center justify-center gap-2 p-4">
              <span className="text-4xl">{project.icon}</span>
              <span className="h-2 w-24 rounded-full bg-ink/10" />
              <span className="h-2 w-16 rounded-full bg-ink/5" />
            </div>
          </div>

          {/* "View project" appears on hover */}
          <div className="absolute inset-0 flex items-center justify-center bg-ink/30 opacity-0 backdrop-blur-[2px] transition-opacity duration-300 group-hover:opacity-100">
            <span className="rounded-full bg-cream-50 px-5 py-2 text-sm font-medium text-terracotta-600">
              View project →
            </span>
          </div>
        </div>

        {/* Info */}
        <div className="p-6">
          <span className="rounded-full bg-sage-100 px-3 py-1 text-xs font-medium text-sage-600">
            {project.category}
          </span>
          <h3 className="mt-3 text-xl font-semibold">{project.title}</h3>
          <p className="mt-1 text-sm leading-relaxed text-ink/70">{project.desc}</p>
        </div>
      </Link>
    </motion.article>
  );
}

export default function Portfolio() {
  const [active, setActive] = useState("All");
  const filtered = active === "All" ? projects : projects.filter((p) => p.category === active);

  return (
    <div>
      {/* Header */}
      <section className="relative overflow-hidden bg-gradient-to-b from-blush-50 via-cream-100 to-cream-100 pb-12 pt-36">
        <div aria-hidden="true" className="pointer-events-none absolute -left-20 top-24 h-64 w-64 rounded-full bg-blush-200/60 blur-2xl" />
        <div aria-hidden="true" className="pointer-events-none absolute -right-20 top-10 h-64 w-64 rounded-full bg-sage-200/60 blur-2xl" />

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, ease }}
          className="relative mx-auto max-w-3xl px-6 text-center"
        >
          <p className="mb-4 text-sm font-semibold uppercase tracking-widest text-terracotta-500">Portfolio</p>
          <h1 className="font-heading text-5xl font-semibold leading-[1.1] sm:text-6xl">
            Work we're <span className="italic text-terracotta-500">proud</span> of
          </h1>
          <p className="mt-6 text-lg leading-relaxed text-ink/70">
            A peek at some of the websites, brands and interfaces we've made with our clients.
          </p>
        </motion.div>
      </section>

      {/* Filters + grid */}
      <section className="bg-cream-100 pb-24 pt-8">
        <div className="mx-auto max-w-6xl px-6">
          <div className="mb-12 flex flex-wrap justify-center gap-3">
            {categories.map((c) => (
              <motion.button
                key={c}
                type="button"
                whileTap={{ scale: 0.95 }}
                onClick={() => setActive(c)}
                className={`rounded-full border px-5 py-2 text-sm font-medium transition-colors duration-300 ${
                  active === c
                    ? "border-terracotta-500 bg-terracotta-500 text-cream-50 shadow-soft"
                    : "border-sage-200 bg-sage-50 text-sage-600 hover:bg-sage-100"
                }`}
              >
                {c}
              </motion.button>
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

      {/* CTA */}
      <section className="bg-blush-50 py-20">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7, ease }}
          className="mx-auto max-w-2xl px-6 text-center"
        >
          <h2 className="font-heading text-3xl font-semibold sm:text-4xl">Like what you see?</h2>
          <p className="mt-4 text-ink/70">Let's create something just as lovely for your brand.</p>
          <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.97 }} className="mt-8 inline-block">
            <Link to="/order" className="btn-primary">
              Start your project
            </Link>
          </motion.div>
        </motion.div>
      </section>
    </div>
  );
}