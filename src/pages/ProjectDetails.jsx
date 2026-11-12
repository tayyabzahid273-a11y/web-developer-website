import { Link, useParams } from "react-router-dom";
import { motion } from "framer-motion";
import { projects } from "../data/projects";
import { buildDemoPage } from "../components/buildDemoPage";

const ease = [0.22, 1, 0.36, 1];
const stagger = { hidden: {}, show: { transition: { staggerChildren: 0.12, delayChildren: 0.1 } } };
const fadeUp = { hidden: { opacity: 0, y: 30 }, show: { opacity: 1, y: 0, transition: { duration: 0.7, ease } } };

function NotFound() {
  return (
    <section className="flex min-h-[70vh] flex-col items-center justify-center bg-gradient-to-b from-blush-50 to-cream-100 px-6 pt-24 text-center">
      <p className="text-4xl sm:text-5xl">🔍</p>
      <h1 className="mt-4 font-heading text-2xl font-semibold sm:text-3xl">Project not found</h1>
      <p className="mt-3 text-sm text-ink/70 sm:text-base">We couldn't find the project you're looking for.</p>
      <Link to="/portfolio" className="btn-primary mt-8 text-sm sm:text-base">Back to portfolio</Link>
    </section>
  );
}

export default function ProjectDetails() {
  const { id } = useParams();
  const index = projects.findIndex((p) => String(p.id) === id);
  const project = projects[index];

  if (!project) return <NotFound />;
  const next = projects[(index + 1) % projects.length];
  const prev = projects[(index - 1 + projects.length) % projects.length];

  return (
    <div>
      <section className="relative overflow-hidden bg-gradient-to-b from-blush-50 via-cream-100 to-cream-100 pb-12 pt-28 sm:pb-16 sm:pt-32">
        <div aria-hidden="true" className="pointer-events-none absolute -left-20 top-24 h-48 w-48 rounded-full bg-blush-200/60 blur-2xl sm:h-64 sm:w-64" />
        <div aria-hidden="true" className="pointer-events-none absolute -right-20 top-10 h-48 w-48 rounded-full bg-sage-200/60 blur-2xl sm:h-64 sm:w-64" />

        <div className="relative mx-auto max-w-5xl px-4 sm:px-6">
          <motion.div variants={stagger} initial="hidden" animate="show">
            <motion.div variants={fadeUp}>
              <Link to="/portfolio" className="group inline-flex items-center gap-2 text-xs font-medium text-ink/70 transition hover:text-terracotta-600 sm:text-sm">
                <span className="transition-transform duration-300 group-hover:-translate-x-1">←</span> Back to portfolio
              </Link>
            </motion.div>
            <motion.span variants={fadeUp} className="mt-4 inline-block rounded-full bg-sage-100 px-3 py-1 text-xs font-medium text-sage-600 sm:mt-6 sm:px-4 sm:py-1.5 sm:text-sm">
              {project.category}
            </motion.span>
            <motion.h1 variants={fadeUp} className="mt-3 font-heading text-3xl font-semibold leading-[1.1] sm:mt-4 sm:text-5xl md:text-6xl">
              {project.title}
            </motion.h1>
            <motion.p variants={fadeUp} className="mt-3 max-w-2xl text-sm leading-relaxed text-ink/70 sm:mt-4 sm:text-lg">
              {project.desc}
            </motion.p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, scale: 0.96, y: 40 }} animate={{ opacity: 1, scale: 1, y: 0 }} transition={{ duration: 0.9, delay: 0.3, ease }}
            className={`relative mt-8 aspect-[4/3] overflow-hidden rounded-3xl bg-gradient-to-br shadow-soft sm:mt-12 sm:aspect-[16/9] sm:rounded-4xl ${project.gradient}`}
          >
            <div className="absolute inset-1 overflow-hidden rounded-2xl bg-white shadow-card sm:inset-2 md:inset-4 md:rounded-3xl">
              <iframe title={`${project.title} Live Demo`} srcDoc={buildDemoPage(project)} className="h-full w-full border-0" sandbox="allow-scripts allow-same-origin" />
            </div>
          </motion.div>
        </div>
      </section>

      <section className="bg-cream-100 pb-16 pt-8 sm:pb-24">
        <div className="mx-auto grid max-w-5xl gap-8 px-4 sm:gap-12 sm:px-6 lg:grid-cols-3">
          <div className="lg:col-span-2">
            <motion.div initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, margin: "-60px" }} transition={{ duration: 0.7, ease }}>
              <h2 className="font-heading text-2xl font-semibold sm:text-3xl">About this project</h2>
              <div className="mt-4 space-y-3 text-sm leading-relaxed text-ink/70 sm:mt-5 sm:space-y-4 sm:text-base">
                {project.about.map((para, i) => <p key={i}>{para}</p>)}
              </div>
            </motion.div>

            <motion.div initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, margin: "-60px" }} transition={{ duration: 0.7, ease }} className="mt-8 sm:mt-12">
              <h2 className="font-heading text-2xl font-semibold sm:text-3xl">Highlights</h2>
              <ul className="mt-4 space-y-2.5 sm:mt-5 sm:space-y-3">
                {project.highlights.map((h, i) => (
                  <motion.li key={h} initial={{ opacity: 0, x: -20 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} transition={{ duration: 0.5, delay: i * 0.12, ease }}
                    className="flex items-center gap-3 rounded-2xl bg-cream-50 px-4 py-3 text-sm shadow-card sm:px-5 sm:py-4 sm:text-base"
                  >
                    <span className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-sage-200 text-xs text-sage-600 sm:h-7 sm:w-7 sm:text-sm">✓</span>
                    <span className="font-medium">{h}</span>
                  </motion.li>
                ))}
              </ul>
            </motion.div>
          </div>

          <aside className="lg:sticky lg:top-28 lg:self-start">
            <motion.div initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.7, delay: 0.1, ease }} className="card p-5 sm:p-6">
              <h3 className="mb-4 font-heading text-lg font-semibold sm:mb-5 sm:text-xl">Project info</h3>
              <dl className="space-y-3 text-xs sm:space-y-4 sm:text-sm">
                <div>
                  <dt className="text-ink/50">Category</dt>
                  <dd className="mt-1 font-medium">{project.category}</dd>
                </div>
                <div>
                  <dt className="text-ink/50">Timeline</dt>
                  <dd className="mt-1 font-medium">{project.duration}</dd>
                </div>
                <div>
                  <dt className="text-ink/50">Tech stack</dt>
                  <dd className="mt-2 flex flex-wrap gap-1.5 sm:gap-2">
                    {project.services.map((s) => (
                      <span key={s} className="rounded-full bg-blush-100 px-2.5 py-1 text-[10px] font-medium text-ink/70 sm:px-3 sm:text-xs">{s}</span>
                    ))}
                  </dd>
                </div>
              </dl>

              <motion.div whileHover={{ scale: 1.03 }} whileTap={{ scale: 0.97 }} className="mt-6 sm:mt-8">
                <Link to="/order" className="btn-secondary w-full text-sm sm:text-base">Start a similar project</Link>
              </motion.div>
            </motion.div>
          </aside>
        </div>
      </section>

      <section className="bg-blush-50 py-12 sm:py-16">
        <div className="mx-auto grid max-w-5xl gap-4 px-4 sm:grid-cols-2 sm:gap-6 sm:px-6">
          {[{ label: "← Previous project", item: prev }, { label: "Next project →", item: next }].map(({ label, item }, i) => (
            <motion.div key={label} initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.6, delay: i * 0.12, ease }} whileHover={{ y: -6 }}>
              <Link to={`/project/${item.id}`}
                className={`block rounded-3xl bg-cream-50 p-5 shadow-card transition-shadow duration-300 hover:shadow-soft sm:rounded-4xl sm:p-6 ${i === 1 ? "sm:text-right" : ""}`}
              >
                <p className="text-xs font-medium text-terracotta-500 sm:text-sm">{label}</p>
                <p className="mt-1.5 font-heading text-lg font-semibold sm:mt-2 sm:text-xl"><span className="mr-2">{item.icon}</span>{item.title}</p>
                <p className="mt-1 text-xs text-ink/60 sm:text-sm">{item.category}</p>
              </Link>
            </motion.div>
          ))}
        </div>
      </section>
    </div>
  );
}