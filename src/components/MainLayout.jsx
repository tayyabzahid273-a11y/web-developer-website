import { useEffect } from "react";
import AIChatWidget from "./AIChatWidget";
import { Link, Outlet, useLocation } from "react-router-dom";
import { motion } from "framer-motion";
import Navbar from "./Navbar";

const navLinks = [
  { label: "Home", to: "/" },
  { label: "About", to: "/about" },
  { label: "Portfolio", to: "/portfolio" },
];

function Footer() {
  return (
    <footer id="contact" className="bg-ink text-cream-100">
      <div className="mx-auto max-w-6xl px-6 py-16">
        <div className="grid gap-12 md:grid-cols-4">
          <div className="md:col-span-2">
            <div className="mb-4 flex items-center gap-3">
              <img src="/logo.png" alt="Web Developer" className="h-10 w-10 object-contain rounded-md" />
              <span className="font-heading text-xl font-semibold text-cream-100">Web Developer</span>
            </div>
            <p className="max-w-sm text-cream-100/60 text-sm sm:text-base">
              A cozy web design studio making thoughtful, beautiful websites for brands that care about the details.
            </p>
          </div>

          <div>
            <h4 className="mb-4 font-heading text-lg font-semibold text-cream-100">Explore</h4>
            <ul className="space-y-2 text-cream-100/60 text-sm sm:text-base">
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
            <h4 className="mb-4 font-heading text-lg font-semibold text-cream-100">Say hello</h4>
            <ul className="space-y-2 text-cream-100/60 text-sm sm:text-base">
              <li>hello@webdeveloper.com</li>
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

export default function Layout() {
  const { pathname } = useLocation();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);

  return (
    <div className="flex min-h-screen w-full max-w-full flex-col overflow-x-hidden bg-cream-50">
      <Navbar />
      <motion.main
        key={pathname}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.4 }}
        className="flex-1 w-full max-w-full overflow-x-hidden"
      >
        <Outlet />
      </motion.main>
      <Footer />
      <AIChatWidget />
    </div>
  );
}