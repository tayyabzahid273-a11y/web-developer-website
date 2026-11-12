import { useState, useEffect } from "react";
import AIChatWidget from "./AIChatWidget";
import { Link, NavLink, Outlet, useLocation } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";

const ease = [0.22, 1, 0.36, 1];

const navLinks = [
  { label: "Home", to: "/" },
  { label: "About", to: "/about" },
  { label: "Portfolio", to: "/portfolio" },
];

/* ----------------------------- Navbar ----------------------------- */

function Navbar() {
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const { pathname } = useLocation();

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20);
    onScroll();
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // Close the mobile menu whenever the page changes
  useEffect(() => {
    setOpen(false);
  }, [pathname]);

  return (
    <motion.header
      initial={{ y: -80, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.7, ease }}
      className={`fixed inset-x-0 top-0 z-50 transition-all duration-300 ${
        scrolled ? "bg-cream-50/80 shadow-card backdrop-blur-md" : "bg-transparent"
      }`}
    >
      <nav className="mx-auto flex max-w-6xl items-center justify-between px-6 py-4">
        <Link to="/" className="flex items-center gap-3">
          <img src="/logo.png" alt="Web Developer" className="h-10 w-auto rounded-md" />
        </Link>

        {/* Desktop links */}
        <ul className="hidden items-center gap-8 md:flex">
          {navLinks.map((link) => (
            <li key={link.to}>
              <NavLink to={link.to} end={link.to === "/"} className="group relative text-sm font-medium transition">
                {({ isActive }) => (
                  <>
                    <span className={isActive ? "text-terracotta-600" : "text-ink/80 group-hover:text-terracotta-600"}>
                      {link.label}
                    </span>
                    <span
                      className={`absolute -bottom-1 left-0 h-0.5 bg-terracotta-400 transition-all duration-300 ${
                        isActive ? "w-full" : "w-0 group-hover:w-full"
                      }`}
                    />
                  </>
                )}
              </NavLink>
            </li>
          ))}
        </ul>

        <Link to="/order" className="btn-primary hidden !px-5 !py-2.5 text-sm md:inline-flex">
          Start an Order
        </Link>

        {/* Mobile toggle */}
        <button
          onClick={() => setOpen((o) => !o)}
          aria-label="Toggle menu"
          className="flex h-10 w-10 flex-col items-center justify-center gap-1.5 md:hidden"
        >
          <motion.span animate={open ? { rotate: 45, y: 8 } : { rotate: 0, y: 0 }} className="h-0.5 w-6 bg-ink" />
          <motion.span animate={{ opacity: open ? 0 : 1 }} className="h-0.5 w-6 bg-ink" />
          <motion.span animate={open ? { rotate: -45, y: -8 } : { rotate: 0, y: 0 }} className="h-0.5 w-6 bg-ink" />
        </button>
      </nav>

      {/* Mobile menu */}
      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.25 }}
            className="mx-4 mb-4 rounded-3xl bg-cream-50 p-6 shadow-card md:hidden"
          >
            <ul className="flex flex-col gap-4">
              {navLinks.map((link) => (
                <li key={link.to}>
                  <NavLink
                    to={link.to}
                    end={link.to === "/"}
                    className={({ isActive }) =>
                      `block font-medium ${isActive ? "text-terracotta-600" : "text-ink/80 hover:text-terracotta-600"}`
                    }
                  >
                    {link.label}
                  </NavLink>
                </li>
              ))}
              <li>
                <Link to="/order" className="btn-primary w-full">
                  Start an Order
                </Link>
              </li>
            </ul>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.header>
  );
}

/* ------------------------------ Footer ------------------------------ */

function Footer() {
  return (
    <footer id="contact" className="bg-ink text-cream-100">
      <div className="mx-auto max-w-6xl px-6 py-16">
        <div className="grid gap-12 md:grid-cols-4">
          <div className="md:col-span-2">
            <div className="mb-4 flex items-center gap-3">
              <img src="/logo.png" alt="Web Developer" className="h-10 w-auto rounded-md" />
              <span className="font-heading text-xl font-semibold text-cream-100">Web Developer</span>
            </div>
            <p className="max-w-sm text-cream-100/60">
              A cozy web design studio making thoughtful, beautiful websites for brands that care about the details.
            </p>
          </div>

          <div>
            <h4 className="mb-4 font-heading text-lg">Explore</h4>
            <ul className="space-y-2 text-cream-100/60">
              {[...navLinks, { label: "Order", to: "/order" }].map((l) => (
                <li key={l.to}>
                  <Link to={l.to} className="transition hover:text-blush-300">
                    {l.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h4 className="mb-4 font-heading text-lg">Say hello</h4>
            <ul className="space-y-2 text-cream-100/60">
              <li>hello@yourdomain.com</li>
              <li>+92 300 0000000</li>
              <li>Mon–Fri, 9am–6pm</li>
            </ul>
          </div>
        </div>

        <div className="mt-12 flex flex-col items-center justify-between gap-4 border-t border-cream-100/10 pt-6 text-sm text-cream-100/50 sm:flex-row">
          <p>© {new Date().getFullYear()} Web Developer. All rights reserved.</p>
          <p>Made with 🌸 and a lot of pastel.</p>
        </div>
      </div>
    </footer>
  );
}

/* ------------------------------ Layout ------------------------------ */

export default function Layout() {
  const { pathname } = useLocation();

  // Start every page at the top
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);

  return (
    <div className="flex min-h-screen flex-col">
      <Navbar />
      <motion.main
        key={pathname}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.4 }}
        className="flex-1"
      >
        <Outlet />
      </motion.main>
      <Footer />
      <AIChatWidget />
    </div>
  );
}