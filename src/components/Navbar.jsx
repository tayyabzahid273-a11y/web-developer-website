import { useState, useEffect } from "react";
import { Link, NavLink, useLocation } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";

const ease = [0.22, 1, 0.36, 1];

const links = [
  { to: "/", label: "Home" },
  { to: "/about", label: "About" },
  { to: "/portfolio", label: "Demos" },
];

function Logo() {
  return (
    <Link to="/" className="flex items-center gap-3 shrink-0 relative z-50">
      <img 
        src="/logo.png" 
        alt="Web Developer" 
        className="h-10 w-10 object-contain rounded-md" 
      />
      <span className="font-heading text-lg font-semibold text-ink sm:text-xl">
        Web Developer
      </span>
    </Link>
  );
}

function HamburgerIcon({ open }) {
  return (
    <div className="relative flex h-5 w-6 flex-col justify-between">
      <motion.span animate={open ? { rotate: 45, y: 9 } : { rotate: 0, y: 0 }} transition={{ duration: 0.3, ease }} className="h-0.5 w-full rounded-full bg-ink" />
      <motion.span animate={open ? { opacity: 0 } : { opacity: 1 }} transition={{ duration: 0.2 }} className="h-0.5 w-full rounded-full bg-ink" />
      <motion.span animate={open ? { rotate: -45, y: -9 } : { rotate: 0, y: 0 }} transition={{ duration: 0.3, ease }} className="h-0.5 w-full rounded-full bg-ink" />
    </div>
  );
}

const menuVariants = {
  hidden: { opacity: 0 },
  show: { opacity: 1, transition: { duration: 0.3, ease, staggerChildren: 0.08, delayChildren: 0.15 } },
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

  useEffect(() => setIsOpen(false), [location.pathname]);

  useEffect(() => {
    document.body.style.overflow = isOpen ? "hidden" : "";
    return () => { document.body.style.overflow = ""; };
  }, [isOpen]);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 10);
    onScroll();
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <>
      <header className={`fixed top-0 left-0 right-0 z-50 w-full overflow-x-hidden transition-all duration-300 ${
          scrolled ? "bg-cream-100/90 backdrop-blur-xl shadow-card border-b border-blush-100" : "bg-cream-100/40 backdrop-blur-md border-b border-transparent"
        }`}
      >
        <nav className="mx-auto flex max-w-7xl items-center justify-between px-4 py-3 sm:px-6 sm:py-4">
          <Logo />

          <div className="hidden items-center gap-4 md:flex">
            {links.map((link) => (
              <NavLink key={link.to} to={link.to} end={link.to === "/"}
                className={({ isActive }) => `relative rounded-full px-4 py-2 text-sm font-medium transition-colors duration-300 ${isActive ? "text-terracotta-600" : "text-ink/70 hover:text-ink"}`}
              >
                {({ isActive }) => (
                  <>
                    {link.label}
                    {isActive && <motion.span layoutId="navbar-active-pill" className="absolute inset-0 -z-10 rounded-full bg-blush-100" transition={{ duration: 0.3, ease }} />}
                  </>
                )}
              </NavLink>
            ))}
            <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.97 }} className="ml-2">
              <Link to="/order" className="btn-primary !px-5 !py-2.5 text-sm shadow-soft">
                Start an Order
              </Link>
            </motion.div>
          </div>

          <button aria-label="Toggle menu" onClick={() => setIsOpen((p) => !p)} className="relative z-50 flex h-10 w-10 items-center justify-center rounded-full bg-cream-50 shadow-card md:hidden">
            <HamburgerIcon open={isOpen} />
          </button>
        </nav>
      </header>

      <AnimatePresence>
        {isOpen && (
          <motion.div variants={menuVariants} initial="hidden" animate="show" exit="exit" className="fixed inset-0 z-40 flex flex-col bg-cream-100/98 backdrop-blur-2xl md:hidden">
            <div className="flex items-center justify-between px-4 py-3 mt-16 sm:px-6">
              <Logo />
              <button aria-label="Close menu" onClick={() => setIsOpen(false)} className="flex h-10 w-10 items-center justify-center rounded-full bg-cream-50 text-xl font-light text-ink shadow-card">
                ✕
              </button>
            </div>
            <div className="relative z-10 flex flex-1 flex-col items-center justify-center gap-2 px-6">
              {links.map((link) => (
                <motion.div key={link.to} variants={linkVariants} className="overflow-hidden">
                  <NavLink to={link.to} end={link.to === "/"}
                    className={({ isActive }) => `block py-3 text-center font-heading text-4xl font-semibold transition-colors duration-300 sm:text-5xl ${isActive ? "text-terracotta-500 italic" : "text-ink"}`}
                  >
                    {link.label}
                  </NavLink>
                </motion.div>
              ))}
              <motion.div variants={linkVariants} className="mt-8">
                <Link to="/order" className="btn-primary text-base shadow-soft">
                  Start an Order →
                </Link>
              </motion.div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}