import { Link } from "react-router-dom";
import { motion } from "framer-motion";

const ease = [0.22, 1, 0.36, 1];
const stagger = { hidden: {}, show: { transition: { staggerChildren: 0.12, delayChildren: 0.15 } } };
const fadeUp = { hidden: { opacity: 0, y: 30 }, show: { opacity: 1, y: 0, transition: { duration: 0.7, ease } } };

const stats = [
  { num: "120+", label: "Websites launched", tint: "bg-blush-100" },
  { num: "4.9★", label: "Average client rating", tint: "bg-sage-100" },
  { num: "7 days", label: "Average first draft", tint: "bg-cream-200" },
  { num: "5 yrs", label: "Designing for the web", tint: "bg-terracotta-300/30" },
];

const values = [
  { icon: "💡", title: "Thoughtful design", desc: "Every colour, font and pixel has a reason. We design with your customers in mind, not just trends." },
  { icon: "🤝", title: "Honest communication", desc: "Clear timelines, fair prices and regular updates. You always know where your project stands." },
  { icon: "🌱", title: "Built to last", desc: "Fast, accessible and easy to maintain, so your website keeps growing with your business." },
];

const process = [
  { num: "01", title: "Discover", desc: "We learn about your brand, goals and audience." },
  { num: "02", title: "Design", desc: "Wireframes and a first draft in about a week." },
  { num: "03", title: "Build", desc: "We bring the approved design to life, fully responsive." },
  { num: "04", title: "Launch", desc: "Testing, launch and support so you're never on your own." },
];

function Blob({ className, duration = 8, delay = 0 }) {
  return (
    <motion.div aria-hidden="true" className={`pointer-events-none absolute ${className}`}
      animate={{ y: [0, -20, 0, 20, 0], rotate: [0, 8, 0, -8, 0] }}
      transition={{ duration, repeat: Infinity, ease: "easeInOut", delay }}
    />
  );
}

function Reveal({ children, delay = 0, className = "" }) {
  return (
    <motion.div initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, margin: "-60px" }}
      transition={{ duration: 0.7, delay, ease }} className={className}
    >
      {children}
    </motion.div>
  );
}

export default function About() {
  return (
    <div>
      <section className="relative overflow-hidden bg-gradient-to-b from-blush-50 via-cream-100 to-cream-100 pb-16 pt-32 sm:pb-20 sm:pt-36">
        <Blob className="-left-16 top-24 h-56 w-56 rounded-full bg-blush-200/70 blur-sm" duration={9} />
        <Blob className="right-[8%] top-28 h-32 w-32 rounded-[42%_58%_63%_37%/45%_40%_60%_55%] bg-sage-200/80" duration={7} delay={0.3} />
        <Blob className="bottom-10 left-[20%] h-12 w-12 rounded-full bg-terracotta-300/60" duration={6} delay={0.6} />

        <motion.div variants={stagger} initial="hidden" animate="show" className="relative z-10 mx-auto max-w-4xl px-6 text-center">
          <motion.p variants={fadeUp} className="mb-4 text-sm font-semibold uppercase tracking-widest text-terracotta-500">About us</motion.p>
          <motion.h1 variants={fadeUp} className="font-heading text-3xl font-semibold leading-[1.1] sm:text-4xl md:text-5xl lg:text-6xl">
            Designers who sweat the <span className="italic text-terracotta-500">little</span> things
          </motion.h1>
          <motion.p variants={fadeUp} className="mx-auto mt-5 max-w-2xl text-base leading-relaxed text-ink/70 sm:mt-6 sm:text-lg">
            We're a small, friendly web design studio that turns ideas into calm, beautiful and easy-to-use websites.
          </motion.p>
        </motion.div>
      </section>

      <section className="bg-cream-100 py-16 sm:py-20">
        <div className="mx-auto grid max-w-6xl items-center gap-10 px-6 sm:gap-14 lg:grid-cols-2">
          <Reveal>
            <p className="mb-3 text-sm font-semibold uppercase tracking-widest text-terracotta-500">Our story</p>
            <h2 className="font-heading text-3xl font-semibold sm:text-4xl">From a side project to a studio</h2>
            <p className="mt-4 text-sm leading-relaxed text-ink/70 sm:mt-5 sm:text-base">
              It started with a website for a friend's bakery. That one small project grew into a studio that has helped over a hundred brands find their place online.
            </p>
            <p className="mt-4 text-sm leading-relaxed text-ink/70 sm:text-base">
              We believe a great website should feel like a warm welcome: clear, inviting and effortless. So we keep our process simple, our communication honest and our designs thoughtful.
            </p>
            <Link to="/portfolio" className="btn-secondary mt-6 sm:mt-8">See our work</Link>
          </Reveal>

          <div className="grid grid-cols-2 gap-4 sm:gap-5">
            {stats.map((s, i) => (
              <motion.div key={s.label} initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, margin: "-40px" }}
                transition={{ duration: 0.6, delay: i * 0.1, ease }} whileHover={{ y: -6, rotate: i % 2 ? 1 : -1 }}
                className={`rounded-3xl p-5 shadow-card sm:rounded-4xl sm:p-6 ${s.tint} ${i % 2 ? "mt-4 sm:mt-6" : ""}`}
              >
                <p className="font-heading text-3xl font-semibold text-ink sm:text-4xl">{s.num}</p>
                <p className="mt-1 text-xs text-ink/70 sm:mt-2 sm:text-sm">{s.label}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      <section className="bg-blush-50 py-16 sm:py-24">
        <div className="mx-auto max-w-6xl px-6">
          <Reveal className="mx-auto mb-10 max-w-2xl text-center sm:mb-14">
            <p className="mb-3 text-sm font-semibold uppercase tracking-widest text-terracotta-500">What we believe</p>
            <h2 className="font-heading text-3xl font-semibold sm:text-4xl md:text-5xl">Our values</h2>
          </Reveal>

          <div className="grid gap-6 sm:gap-8 md:grid-cols-3">
            {values.map((v, i) => (
              <motion.article key={v.title} initial={{ opacity: 0, y: 40 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, margin: "-60px" }}
                transition={{ duration: 0.6, delay: i * 0.12, ease }} whileHover={{ y: -10 }}
                className="card p-6 transition-shadow duration-300 hover:shadow-soft sm:p-8"
              >
                <motion.div whileHover={{ scale: 1.15, rotate: 8 }} transition={{ type: "spring", stiffness: 300 }}
                  className="mb-4 flex h-12 w-12 items-center justify-center rounded-2xl bg-sage-100 text-xl sm:mb-5 sm:h-14 sm:w-14 sm:text-2xl"
                >
                  {v.icon}
                </motion.div>
                <h3 className="mb-2 text-lg font-semibold sm:text-xl">{v.title}</h3>
                <p className="text-sm leading-relaxed text-ink/70 sm:text-base">{v.desc}</p>
              </motion.article>
            ))}
          </div>
        </div>
      </section>

      <section className="bg-cream-100 py-16 sm:py-24">
        <div className="mx-auto max-w-6xl px-6">
          <Reveal className="mx-auto mb-10 max-w-2xl text-center sm:mb-14">
            <p className="mb-3 text-sm font-semibold uppercase tracking-widest text-terracotta-500">How we work</p>
            <h2 className="font-heading text-3xl font-semibold sm:text-4xl md:text-5xl">A simple four-step process</h2>
          </Reveal>

          <div className="grid gap-5 sm:grid-cols-2 sm:gap-6 lg:grid-cols-4">
            {process.map((p, i) => (
              <motion.div key={p.num} initial={{ opacity: 0, y: 40 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, margin: "-60px" }}
                transition={{ duration: 0.6, delay: i * 0.12, ease }} whileHover={{ y: -8 }}
                className="rounded-3xl border border-blush-200 bg-cream-50 p-5 transition-colors duration-300 hover:border-terracotta-300 sm:rounded-4xl sm:p-6"
              >
                <span className="font-heading text-3xl font-semibold text-terracotta-400 sm:text-4xl">{p.num}</span>
                <h3 className="mb-2 mt-2 text-lg font-semibold sm:mt-3 sm:text-xl">{p.title}</h3>
                <p className="text-xs leading-relaxed text-ink/70 sm:text-sm">{p.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      <section className="bg-cream-100 pb-16 sm:pb-24">
        <div className="mx-auto max-w-6xl px-6">
          <Reveal>
            <div className="relative overflow-hidden rounded-3xl bg-terracotta-500 px-6 py-12 text-center text-cream-50 sm:rounded-4xl sm:px-8 sm:py-16">
              <Blob className="-left-10 -top-10 h-40 w-40 rounded-full bg-cream-50/10" duration={9} />
              <Blob className="-bottom-12 -right-8 h-52 w-52 rounded-full bg-blush-300/20" duration={11} delay={0.4} />
              <div className="relative">
                <h2 className="font-heading text-2xl font-semibold sm:text-3xl md:text-4xl">Ready to start your project?</h2>
                <p className="mx-auto mt-3 max-w-xl text-sm text-cream-100/80 sm:mt-4 sm:text-base">Tell us what you need and we'll take it from there.</p>
                <div className="mt-6 flex flex-wrap justify-center gap-3 sm:mt-8 sm:gap-4">
                  <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.97 }}>
                    <Link to="/order" className="inline-flex items-center justify-center rounded-full bg-cream-50 px-5 py-2.5 text-sm font-medium text-terracotta-600 shadow-soft transition hover:bg-cream-100 sm:px-6 sm:py-3 sm:text-base">Place an Order</Link>
                  </motion.div>
                  <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.97 }}>
                    <Link to="/portfolio" className="inline-flex items-center justify-center rounded-full border border-cream-50/60 px-5 py-2.5 text-sm font-medium text-cream-50 transition hover:bg-cream-50/10 sm:px-6 sm:py-3 sm:text-base">View Portfolio</Link>
                  </motion.div>
                </div>
              </div>
            </div>
          </Reveal>
        </div>
      </section>
    </div>
  );
}