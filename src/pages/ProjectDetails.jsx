import { Link, useParams } from "react-router-dom";
import { motion } from "framer-motion";
import { projects } from "../data/projects";

const ease = [0.22, 1, 0.36, 1];

const stagger = {
  hidden: {},
  show: { transition: { staggerChildren: 0.12, delayChildren: 0.1 } },
};

const fadeUp = {
  hidden: { opacity: 0, y: 30 },
  show: { opacity: 1, y: 0, transition: { duration: 0.7, ease } },
};

function NotFound() {
  return (
    <section className="flex min-h-[70vh] flex-col items-center justify-center bg-gradient-to-b from-blush-50 to-cream-100 px-6 pt-24 text-center">
      <p className="text-5xl">🔍</p>
      <h1 className="mt-4 font-heading text-3xl font-semibold">Project not found</h1>
      <p className="mt-3 text-ink/70">We couldn't find the project you're looking for.</p>
      <Link to="/portfolio" className="btn-primary mt-8">
        Back to portfolio
      </Link>
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
      {/* Header + large preview */}
      <section className="relative overflow-hidden bg-gradient-to-b from-blush-50 via-cream-100 to-cream-100 pb-16 pt-32">
        <div aria-hidden="true" className="pointer-events-none absolute -left-20 top-24 h-64 w-64 rounded-full bg-blush-200/60 blur-2xl" />
        <div aria-hidden="true" className="pointer-events-none absolute -right-20 top-10 h-64 w-64 rounded-full bg-sage-200/60 blur-2xl" />

        <div className="relative mx-auto max-w-5xl px-6">
          <motion.div variants={stagger} initial="hidden" animate="show">
            <motion.div variants={fadeUp}>
              <Link
                to="/portfolio"
                className="group inline-flex items-center gap-2 text-sm font-medium text-ink/70 transition hover:text-terracotta-600"
              >
                <span className="transition-transform duration-300 group-hover:-translate-x-1">←</span>
                Back to portfolio
              </Link>
            </motion.div>

            <motion.span
              variants={fadeUp}
              className="mt-6 inline-block rounded-full bg-sage-100 px-4 py-1.5 text-sm font-medium text-sage-600"
            >
              {project.category}
            </motion.span>

            <motion.h1 variants={fadeUp} className="mt-4 font-heading text-5xl font-semibold leading-[1.1] sm:text-6xl">
              {project.title}
            </motion.h1>

            <motion.p variants={fadeUp} className="mt-4 max-w-2xl text-lg leading-relaxed text-ink/70">
              {project.desc}
            </motion.p>
          </motion.div>

          {/* Large image placeholder: swap for an <img> when you have real screenshots */}
          <motion.div
            initial={{ opacity: 0, scale: 0.96, y: 40 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            transition={{ duration: 0.9, delay: 0.3, ease }}
            className={`relative mt-12 aspect-[16/9] overflow-hidden rounded-4xl bg-gradient-to-br shadow-soft ${project.gradient}`}
          >
            <div className="absolute inset-4 flex flex-col overflow-hidden rounded-3xl bg-cream-50/90 shadow-card sm:inset-8">
              {/* Browser bar */}
              <div className="flex items-center gap-2 border-b border-blush-100 px-4 py-3">
                <span className="h-2.5 w-2.5 rounded-full bg-blush-300" />
                <span className="h-2.5 w-2.5 rounded-full bg-cream-300" />
                <span className="h-2.5 w-2.5 rounded-full bg-sage-300" />
                <span className="ml-3 h-5 flex-1 rounded-full bg-cream-200" />
              </div>

              {/* Fake page content */}
              <div className="flex flex-1 flex-col items-center justify-center gap-3 p-6">
                <motion.span
                  animate={{ y: [0, -10, 0] }}
                  transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
                  className="text-6xl sm:text-7xl"
                >
                  {project.icon}
                </motion.span>
                <span className="h-3 w-40 rounded-full bg-ink/10 sm:w-56" />
                <span className="h-3 w-28 rounded-full bg-ink/5 sm:w-40" />
                <div className="mt-4 grid w-full max-w-md grid-cols-3 gap-3">
                  {[0, 1, 2].map((n) => (
                    <span key={n} className="h-12 rounded-2xl bg-blush-100 sm:h-16" />
                  ))}
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Details */}
      <section className="bg-cream-100 pb-24 pt-8">
        <div className="mx-auto grid max-w-5xl gap-12 px-6 lg:grid-cols-3">
          <div className="lg:col-span-2">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-60px" }}
              transition={{ duration: 0.7, ease }}
            >
              <h2 className="font-heading text-3xl font-semibold">About this project</h2>
              <div className="mt-5 space-y-4 leading-relaxed text-ink/70">
                {project.about.map((para, i) => (
                  <p key={i}>{para}</p>
                ))}
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-60px" }}
              transition={{ duration: 0.7, ease }}
              className="mt-12"
            >
              <h2 className="font-heading text-3xl font-semibold">Highlights</h2>
              <ul className="mt-5 space-y-3">
                {project.highlights.map((h, i) => (
                  <motion.li
                    key={h}
                    initial={{ opacity: 0, x: -20 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.5, delay: i * 0.12, ease }}
                    className="flex items-center gap-3 rounded-2xl bg-cream-50 px-5 py-4 shadow-card"
                  >
                    <span className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-sage-200 text-sm text-sage-600">
                      ✓
                    </span>
                    <span className="font-medium">{h}</span>
                  </motion.li>
                ))}
              </ul>
            </motion.div>
          </div>

          {/* Sidebar */}
          <aside className="lg:sticky lg:top-28 lg:self-start">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.7, delay: 0.1, ease }}
              className="card"
            >
              <h3 className="mb-5 font-heading text-xl font-semibold">Project info</h3>
              <dl className="space-y-4 text-sm">
                <div>
                  <dt className="text-ink/50">Category</dt>
                  <dd className="mt-1 font-medium">{project.category}</dd>
                </div>
                <div>
                  <dt className="text-ink/50">Timeline</dt>
                  <dd className="mt-1 font-medium">{project.duration}</dd>
                </div>
                <div>
                  <dt className="text-ink/50">What we did</dt>
                  <dd className="mt-2 flex flex-wrap gap-2">
                    {project.services.map((s) => (
                      <span key={s} className="rounded-full bg-blush-100 px-3 py-1 text-xs font-medium text-ink/70">
                        {s}
                      </span>
                    ))}
                  </dd>
                </div>
              </dl>

              <motion.div whileHover={{ scale: 1.03 }} whileTap={{ scale: 0.97 }} className="mt-8">
                <Link to="/order" className="btn-primary w-full">
                  Start a similar project
                </Link>
              </motion.div>
            </motion.div>
          </aside>
        </div>
      </section>

      {/* Previous / next */}
      <section className="bg-blush-50 py-16">
        <div className="mx-auto grid max-w-5xl gap-6 px-6 sm:grid-cols-2">
          {[
            { label: "← Previous project", item: prev },
            { label: "Next project →", item: next },
          ].map(({ label, item }, i) => (
            <motion.div
              key={label}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: i * 0.12, ease }}
              whileHover={{ y: -6 }}
            >
              <Link
                to={`/project/${item.id}`}
                className={`block rounded-4xl bg-cream-50 p-6 shadow-card transition-shadow duration-300 hover:shadow-soft ${
                  i === 1 ? "sm:text-right" : ""
                }`}
              >
                <p className="text-sm font-medium text-terracotta-500">{label}</p>
                <p className="mt-2 font-heading text-xl font-semibold">
                  <span className="mr-2">{item.icon}</span>
                  {item.title}
                </p>
                <p className="mt-1 text-sm text-ink/60">{item.category}</p>
              </Link>
            </motion.div>
          ))}
        </div>
      </section>
    </div>
  );
}