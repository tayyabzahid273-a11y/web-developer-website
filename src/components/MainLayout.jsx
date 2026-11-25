// src/components/MainLayout.jsx

import { useEffect, useState } from "react";
import { Link, NavLink, Outlet, useLocation } from "react-router-dom";
import { AnimatePresence, motion } from "framer-motion";
import AIChatWidget from "./AIChatWidget";

const ease = [0.22, 1, 0.36, 1];

const navLinks = [
  { label: "Home", to: "/" },
  { label: "About", to: "/about" },
  { label: "Portfolio", to: "/portfolio" },
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
      className={`fixed inset-x-0 top-0 z-50 w-full max-w-full transition-all duration-300 ${
        scrolled || open
          ? "bg-cream-50/90 shadow-card backdrop-blur-md"
          : "bg-cream-50/70 backdrop-blur-sm"
      }`}
    >
      <nav className="mx-auto flex w-full max-w-6xl items-center justify-between gap-3 px-4 py-4 sm:px-6">
        {/* Brand */}
        <Link
          to="/"
          className="flex min-w-0 shrink items-center gap-2 sm:gap-3"
          aria-label="Web Developer home"
        >
          <span
            aria-hidden="true"
            className="flex h-9 w-9 shrink-0 items-center justify-center rounded-xl bg-terracotta-500 text-xl text-white"
          >
            ✿
          </span>
          <span className="truncate font-heading text-sm font-semibold text-ink sm:text-xl">
            Web Developer
          </span>
        </Link>

        {/* Desktop links */}
        <ul className="hidden items-center gap-8 md:flex">
          {navLinks.map((link) => (
            <li key={link.to}>
              <NavLink
                to={link.to}
                end={link.to === "/"}
                className="group relative text-sm font-medium transition"
              >
                {({ isActive }) => (
                  <>
                    <span
                      className={
                        isActive
                          ? "text-terracotta-600"
                          : "text-ink/80 group-hover:text-terracotta-600"
                      }
                    >
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

        {/* Desktop CTA */}
        <Link
          to="/order"
          className="btn-primary hidden !px-5 !py-2.5 text-sm md:inline-flex"
        >
          Start an Order
        </Link>

        {/* Mobile menu button */}
        <button
          type="button"
          onClick={() => setOpen((current) => !current)}
          aria-label={open ? "Close navigation menu" : "Open navigation menu"}
          aria-expanded={open}
          aria-controls="mobile-navigation"
          className="relative z-[60] flex h-10 w-10 shrink-0 flex-col items-center justify-center gap-1.5 rounded-lg md:hidden"
        >
          <motion.span
            animate={open ? { rotate: 45, y: 8 } : { rotate: 0, y: 0 }}
            className="h-0.5 w-6 bg-ink"
          />
          <motion.span
            animate={{ opacity: open ? 0 : 1 }}
            className="h-0.5 w-6 bg-ink"
          />
          <motion.span
            animate={open ? { rotate: -45, y: -8 } : { rotate: 0, y: 0 }}
            className="h-0.5 w-6 bg-ink"
          />
        </button>
      </nav>

      {/* Mobile menu */}
      <AnimatePresence>
        {open && (
          <motion.div
            id="mobile-navigation"
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.3 }}
            className="absolute left-0 right-0 top-full w-full max-w-full overflow-hidden border-t border-blush-100 bg-cream-50 shadow-xl md:hidden"
          >
            <ul className="flex flex-col gap-2 p-4">
              {navLinks.map((link) => (
                <li key={link.to}>
                  <NavLink
                    to={link.to}
                    end={link.to === "/"}
                    className={({ isActive }) =>
                      `block rounded-xl px-4 py-3 text-base font-medium transition-colors ${
                        isActive
                          ? "bg-blush-100 text-terracotta-600"
                          : "text-ink/80 hover:bg-blush-50"
                      }`
                    }
                  >
                    {link.label}
                  </NavLink>
                </li>
              ))}

              <li className="mt-2">
                <Link
                  to="/order"
                  className="btn-primary w-full py-3 text-center"
                >
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

function Footer() {
  return (
    <footer
      id="contact"
      className="w-full max-w-full overflow-hidden bg-ink text-cream-100"
    >
      <div className="mx-auto max-w-6xl px-4 py-12 sm:px-6 sm:py-16">
        <div className="grid grid-cols-1 gap-10 sm:grid-cols-2 md:grid-cols-4 md:gap-12">
          <div className="sm:col-span-2">
            <div className="mb-4 flex items-center gap-3">
              <span
                aria-hidden="true"
                className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-terracotta-500 text-xl text-white"
              >
                ✿
              </span>
              <span className="font-heading text-xl font-semibold text-cream-100">
                Web Developer
              </span>
            </div>

            <p className="max-w-sm text-cream-100/60">
              A cozy web design studio making thoughtful, beautiful websites
              for brands that care about the details.
            </p>
          </div>

          <div>
            <h4 className="mb-4 font-heading text-lg">Explore</h4>
            <ul className="space-y-2 text-cream-100/60">
              {[...navLinks, { label: "Order", to: "/order" }].map((link) => (
                <li key={link.to}>
                  <Link
                    to={link.to}
                    className="transition hover:text-blush-300"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h4 className="mb-4 font-heading text-lg">Say hello</h4>
            <ul className="space-y-2 break-words text-cream-100/60">
              <li>hello@webdeveloper.com</li>
              <li>+92 300 0000000</li>
              <li>Mon–Fri, 9am–6pm</li>
            </ul>
          </div>
        </div>

        <div className="mt-10 flex flex-col items-center justify-between gap-4 border-t border-cream-100/10 pt-6 text-center text-sm text-cream-100/50 sm:mt-12 sm:flex-row sm:text-left">
          <p>
            © {new Date().getFullYear()} Web Developer. All rights reserved.
          </p>
          <p>Made with 🌸 and a lot of pastel.</p>
        </div>
      </div>
    </footer>
  );
}

export default function Layout() {
  const { pathname } = useLocation();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);

  return (
    <div className="relative flex min-h-screen w-full max-w-full flex-col overflow-x-hidden">
      <Navbar />

      <motion.main
        key={pathname}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.4 }}
        className="w-full max-w-full flex-1 overflow-x-hidden"
      >
        <Outlet />
      </motion.main>

      <Footer />
      <AIChatWidget />
    </div>
  );
}