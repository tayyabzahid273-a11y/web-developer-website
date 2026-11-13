import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import BeforeAfterSlider from "../components/BeforeAfterSlider";
import TiltCard from "../components/TiltCard"; // <-- TiltCard yahan import kiya

const services = [
  { icon: "🎨", title: "Custom Web Design", desc: "Bespoke, pixel-perfect websites crafted around your brand and your audience.", tint: "bg-blush-100" },
  { icon: "🚀", title: "Landing Pages", desc: "High-converting single pages built to launch products and campaigns fast.", tint: "bg-sage-100" },
  { icon: "🛍️", title: "E-commerce Design", desc: "Beautiful storefronts and checkout flows that turn browsers into buyers.", tint: "bg-cream-200" },
  { icon: "✨", title: "Brand Identity", desc: "Logos, palettes and type systems that make your studio instantly recognizable.", tint: "bg-terracotta-300/30" },
  { icon: "📱", title: "UI/UX Design", desc: "Intuitive, research-backed interfaces that feel effortless on every device.", tint: "bg-blush-100" },
  { icon: "🛠️", title: "Care & Maintenance", desc: "Ongoing updates, performance tuning and support so your site stays fresh.", tint: "bg-sage-100" },
];

const ease = [0.22, 1, 0.36, 1];
const staggerContainer = { hidden: {}, show: { transition: { staggerChildren: 0.12, delayChildren: 0.2 } } };
const fadeUp = { hidden: { opacity: 0, y: 30 }, show: { opacity: 1, y: 0, transition: { duration: 0.7, ease } } };
const wordReveal = { hidden: { y: "110%" }, show: { y: 0, transition: { duration: 0.8, ease } } };

function AnimatedLine({ text, className = "" }) {
  return (
    <span className="block">
      {text.split(" ").map((word, i) => (
        <span key={i} className="inline-block overflow-hidden pb-2 align-bottom">
          <motion.span variants={wordReveal} className={`inline-block ${className}`}>{word}&nbsp;</motion.span>
        </span>
      ))}
    </span>
  );
}

function FloatingShape({ className, duration = 8, delay = 0, y = 25, rotate = 8 }) {
  return (
    <motion.div
      aria-hidden="true"
      className={`pointer-events-none absolute ${className}`}
      initial={{ opacity: 0, scale: 0.6 }}
      animate={{ opacity: 1, scale: 1, y: [0, -y, 0, y, 0], rotate: [0, rotate, 0, -rotate, 0] }}
      transition={{
        opacity: { duration: 1, delay }, scale: { duration: 1, delay },
        y: { duration, repeat: Infinity, ease: "easeInOut", delay },
        rotate: { duration: duration * 1.2, repeat: Infinity, ease: "easeInOut", delay },
      }}
    />
  );
}

function Hero() {
  return (
    <section id="home" className="relative flex min-h-screen items-center overflow-hidden bg-gradient-to-b from-blush-50 via-cream-100 to-cream-100 pt-24">
      <FloatingShape className="-left-16 top-24 h-64 w-64 rounded-full bg-blush-200/70 blur-sm" duration={9} />
      <FloatingShape className="right-[8%] top-32 h-40 w-40 rounded-[42%_58%_63%_37%/45%_40%_60%_55%] bg-sage-200/80" duration={7} delay={0.3} rotate={14} />
      <FloatingShape className="bottom-24 left-[12%] h-16 w-16 rounded-full bg-terracotta-300/60" duration={6} delay={0.6} y={18} />
      <FloatingShape className="-bottom-16 right-[6%] h-72 w-72 rounded-[60%_40%_30%_70%/60%_30%_70%_40%] bg-blush-300/50" duration={10} delay={0.2} rotate={10} />
      <FloatingShape className="right-[30%] top-[55%] h-24 w-24 rounded-full border-4 border-sage-300/70" duration={8} delay={0.8} />

      <div className="relative z-10 mx-auto w-full max-w-6xl px-6 py-20">
        <motion.div variants={staggerContainer} initial="hidden" animate="show" className="max-w-3xl">
          <motion.span variants={fadeUp} className="mb-6 inline-block rounded-full bg-sage-100 px-4 py-1.5 text-sm font-medium text-sage-600">
            🌸 Web design studio · Orders open
          </motion.span>

          <h1 className="font-heading text-4xl font-semibold leading-[1.05] sm:text-5xl md:text-6xl lg:text-7xl">
            <AnimatedLine text="We design websites" />
            <AnimatedLine text="people fall in love" className="italic text-terracotta-500" />
            <AnimatedLine text="with." />
          </h1>

          <motion.p variants={fadeUp} className="mt-6 max-w-xl text-base leading-relaxed text-ink/70 sm:mt-8 sm:text-lg">
            Choose a package, tell us about your brand, and track your project from first sketch to launch day, all in one place.
          </motion.p>

          <motion.div variants={fadeUp} className="mt-8 flex flex-wrap gap-3 sm:mt-10 sm:gap-4">
            <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.97 }}>
              <Link to="/order" className="btn-primary text-sm sm:text-base">Place an Order</Link>
            </motion.div>
            <motion.a whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.97 }} href="#services" className="btn-secondary text-sm sm:text-base">
              Explore Services
            </motion.a>
          </motion.div>

          <motion.div variants={fadeUp} className="mt-10 flex gap-6 text-xs text-ink/60 sm:mt-14 sm:gap-10 sm:text-sm">
            {[["120+", "Sites launched"], ["4.9★", "Client rating"], ["7 days", "Avg. first draft"]].map(([num, label]) => (
              <div key={label}>
                <p className="font-heading text-xl font-semibold text-ink sm:text-2xl">{num}</p>
                <p>{label}</p>
              </div>
            ))}
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}

function Services() {
  return (
    <section id="services" className="bg-cream-100 py-16 sm:py-24">
      <div className="mx-auto max-w-6xl px-6">
        <motion.div
          initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.7, ease }} className="mx-auto mb-10 max-w-2xl text-center sm:mb-16"
        >
          <p className="mb-3 text-sm font-semibold uppercase tracking-widest text-terracotta-500">What we do</p>
          <h2 className="font-heading text-3xl font-semibold sm:text-4xl md:text-5xl">Services crafted with care</h2>
          <p className="mt-4 text-sm text-ink/70 sm:text-base">Everything you need to launch a beautiful, high-performing website.</p>
        </motion.div>

        <div className="grid gap-6 sm:grid-cols-2 sm:gap-8 lg:grid-cols-3">
          {services.map((service, i) => (
            <motion.div
              key={service.title}
              initial={{ opacity: 0, y: 40 }} 
              whileInView={{ opacity: 1, y: 0 }} 
              viewport={{ once: true, margin: "-60px" }}
              transition={{ duration: 0.6, delay: (i % 3) * 0.12, ease }}
            >
              {/* Yahan TiltCard laga diya hai */}
              <TiltCard>
                <div className={`mb-5 flex h-12 w-12 items-center justify-center rounded-2xl text-xl sm:h-14 sm:w-14 sm:text-2xl ${service.tint}`}>
                  {service.icon}
                </div>
                <h3 className="mb-2 text-lg font-semibold sm:text-xl">{service.title}</h3>
                <p className="text-sm leading-relaxed text-ink/70 sm:text-base">{service.desc}</p>
                
                <Link to="/order" className="mt-4 inline-flex items-center gap-1 text-sm font-medium text-terracotta-500 transition-colors hover:text-terracotta-600 sm:mt-5">
                  Learn more <span className="transition-transform duration-300 group-hover:translate-x-1.5">→</span>
                </Link>
              </TiltCard>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

export default function Home() {
  return (
    <>
      <Hero />
      <div className="bg-cream-100 pb-10">
        <BeforeAfterSlider />
      </div>
      <Services />
    </>
  );
}