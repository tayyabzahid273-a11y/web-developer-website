import { useState, useEffect } from "react";
import AIChatWidget from "./AIChatWidget";
import { Link, NavLink, Outlet, useLocation } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";

const ease = [0.22, 1, 0.36, 1];

const navLinks = [
  { label: "Home", to: "/" },
  { label: "About", to: "/about" },
  { label: "Demos", to: "/portfolio" },
];

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

  useEffect(() => {
    setOpen(false);
  }, [pathname]);

  return (
    <motion.header
      initial={{ y: -80, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.7, ease }}
      className={`fixed inset-x-0 top-0 z-50 transition-all duration-300 ${
        scrolled || open ? "bg-cream-50/90 shadow-card backdrop-blur-md" : "bg-transparent"
      }`}
    >
      <nav className="mx-auto flex max-w-6xl items-center justify-between px-4 py-4 sm:px-6">
        {/* Logo */}
        <Link to="/" className="flex items-center gap-2 sm:gap-3">
          <img src="/logo.png" alt="Web Developer" className="h-8 w-auto rounded-md sm:h-9" />
          <span className="font-heading text-lg font-semibold text-ink sm:text-xl">
            Web Developer
          </span>
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

        {/* Hamburger (Mobile) */}
        <button
          onClick={() => setOpen((o) => !o)}
          aria-label="Toggle menu"
          className="flex h-10 w-10 flex-col items-center justify-center gap-1.5 md:hidden z-50"
        >
          <motion.span animate={open ? { rotate: 45, y: 8 } : { rotate: 0, y: 0 }} className="h-0.5 w-6 bg-ink" />
          <motion.span animate={{ opacity: open ? 0 : 1 }} className="h-0.5 w-6 bg-ink" />
          <motion.span animate={open ? { rotate: -45, y: -8 } : { rotate: 0, y: 0 }} className="h-0.5 w-6 bg-ink" />
        </button>
      </nav>

      {/* Mobile Menu - FIXED SIZE */}
      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.3 }}
            className="absolute top-full left-0 right-0 bg-cream-50 border-t border-blush-100 shadow-xl md:hidden overflow-hidden"
          >
            <ul className="flex flex-col gap-2 p-4">
              {navLinks.map((link) => (
                <li key={link.to}>
                  <NavLink
                    to={link.to}
                    end={link.to === "/"}
                    className={({ isActive }) =>
                      `block rounded-xl px-4 py-3 text-base font-medium transition-colors ${
                        isActive ? "bg-blush-100 text-terracotta-600" : "text-ink/80 hover:bg-blush-50"
                      }`
                    }
                  >
                    {link.label}
                  </NavLink>
                </li>
              ))}
              <li className="mt-2">
                <Link to="/order" className="btn-primary w-full text-center py-3">
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

/* ... Footer aur Layout wahi purana rahega ... */