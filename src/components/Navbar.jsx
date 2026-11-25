import { useState, useEffect } from "react";
import { Link, NavLink, useLocation } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";

const ease = [0.22, 1, 0.36, 1];

const links = [
  { to: "/", label: "Home" },
  { to: "/about", label: "About" },
  { to: "/portfolio", label: "Demos" },
];

function Logo({ onClick }) {
  return (
    <Link
      to="/"
      onClick={onClick}
      className="relative z-50 flex min-w-0 shrink items-center gap-2"
    >
      {/* Yahan image ko chote box mein fit kiya hai */}
      <div className="h-10 w-10 shrink-0 overflow-hidden rounded-full border border-blush-200 bg-cream-50 flex items-center justify-center">
        <img
          src="/logo.png"
          alt="Web Developer"
          className="h-16 w-auto object-contain -mt-3"
        />
      </div>
      <span className="truncate font-heading text-base font-semibold text-ink sm:text-lg lg:text-xl">
        Web Developer
      </span>
    </Link>
  );
}

function HamburgerIcon({ open }) {
  return (
    <div className="relative flex h-5 w-5 flex-col justify-between">
      <motion.span
        animate={open ? { rotate: 45, y: 8 } : { rotate: 0, y: 0 }}
        transition={{ duration: 0.3, ease }}
        className="h-0.5 w-full rounded-full bg-ink"
      />
      <motion.span
        animate={open ? { opacity: 0 } : { opacity: 1 }}
        transition={{ duration: 0.2 }}
        className="h-0.5 w-full rounded-full bg-ink"
      />
      <motion.span
        animate={open ? { rotate: -45, y: -8 } : { rotate: 0, y: 0 }}
        transition={{ duration: 0.3, ease }}
        className="h-0.5 w-full rounded-full bg-ink"
      />
    </div>
  );
}

const menuVariants = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: { duration: 0.3, ease, staggerChildren: 0.08, delayChildren: 0.15 },
  },
  exit: { opacity: 0, transition: { duration: 0.25, ease } },
};

const linkVariants = {
  hidden: { opacity: 0, y: 24 },
  show: { opacity: 1, y: 0, transition: { duration: 0.5, ease } },
  exit: { opacity: 0, y: 12, transition: { duration: 0.2 } },
};

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const location = useLocation();

  useEffect(() => {
    setIsOpen(false);
  }, [location.pathname]);

  useEffect(() => {
    document.body.style.overflow = isOpen ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [isOpen]);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 10);
    onScroll();
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <>
      <header
        className={`fixed inset-x-0 top-0 z-50 w-full transition-all duration-300 ${
          scrolled
            ? "border-b border-blush-100 bg-cream-100/90 shadow-card backdrop-blur-xl"
            : "border-b border-transparent bg-cream-100/40 backdrop-blur-md"
        }`}
      >
        <nav className="mx-auto flex min-h-14 max-w-7xl items-center justify-between gap-3 px-3 py-2.5 sm:min-h-16 sm:px-6 sm:py-3 lg:px-8">
          <Logo onClick={() => setIsOpen(false)} />

          <div className="hidden items-center gap-2 lg:flex xl:gap-4">
            {links.map((link) => (
              <NavLink
                key={link.to}
                to={link.to}
                end={link.to === "/"}
                className={({ isActive }) =>
                  `relative rounded-full px-3 py-2 text-sm font-medium transition-colors duration-300 xl:px-4 ${
                    isActive
                      ? "text-terracotta-600"
                      : "text-ink/70 hover:text-ink"
                  }`
                }
              >
                {({ isActive }) => (
                  <>
                    {link.label}
                    {isActive && (
                      <motion.span
                        layoutId="navbar-active-pill"
                        className="absolute inset-0 -z-10 rounded-full bg-blush-100"
                        transition={{ duration: 0.3, ease }}
                      />
                    )}
                  </>
                )}
              </NavLink>
            ))}

            <motion.div
              whileHover={{ scale: 1.04 }}
              whileTap={{ scale: 0.97 }}
              className="ml-1"
            >
              <Link
                to="/order"
                className="btn-primary whitespace-nowrap !px-4 !py-2.5 text-sm shadow-soft xl:!px-5"
              >
                Start an Order
              </Link>
            </motion.div>
          </div>

          <button
            type="button"
            aria-label={isOpen ? "Close menu" : "Open menu"}
            aria-expanded={isOpen}
            onClick={() => setIsOpen((previous) => !previous)}
            className="relative z-50 flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-cream-50 shadow-card focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-terracotta-600 lg:hidden"
          >
            <HamburgerIcon open={isOpen} />
          </button>
        </nav>
      </header>

      <AnimatePresence>
        {isOpen && (
          <motion.div
            variants={menuVariants}
            initial="hidden"
            animate="show"
            exit="exit"
            className="fixed inset-0 z-40 flex flex-col overflow-y-auto bg-cream-100/98 pt-14 backdrop-blur-2xl sm:pt-16 lg:hidden"
          >
            <div className="flex items-center justify-between gap-3 px-3 py-3 sm:px-6">
              <Logo onClick={() => setIsOpen(false)} />
              <button
                type="button"
                aria-label="Close menu"
                onClick={() => setIsOpen(false)}
                className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-cream-50 text-xl font-light text-ink shadow-card focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-terracotta-600"
              >
                ×
              </button>
            </div>

            <div className="flex flex-1 flex-col items-center justify-center gap-1 px-5 py-8">
              {links.map((link) => (
                <motion.div key={link.to} variants={linkVariants}>
                  <NavLink
                    to={link.to}
                    end={link.to === "/"}
                    className={({ isActive }) =>
                      `block py-2 text-center font-heading text-3xl font-semibold transition-colors duration-300 sm:text-4xl ${
                        isActive
                          ? "text-terracotta-500 italic"
                          : "text-ink"
                      }`
                    }
                  >
                    {link.label}
                  </NavLink>
                </motion.div>
              ))}

              <motion.div variants={linkVariants} className="mt-6">
                <Link
                  to="/order"
                  className="btn-primary whitespace-nowrap text-sm shadow-soft sm:text-base"
                >
                  Start an Order
                </Link>
              </motion.div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}