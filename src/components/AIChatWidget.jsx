import { useState, useEffect, useRef } from "react";
import { Link } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";

/* ----------------------------- Settings ----------------------------- */

const WHATSAPP_NUMBER = "923143422692";
const ease = [0.22, 1, 0.36, 1];

const GREETING = "Hi! I'm the AI assistant. How can I help you with your website today?";

const quickReplies = [
  { label: "View Pricing", key: "pricing" },
  { label: "How does it work?", key: "how" },
  { label: "Talk to a human", key: "human" },
  { label: "See our work", key: "portfolio" },
];

// Keep these prices in sync with the services in OrderForm.jsx
const replies = {
  pricing: {
    text:
      "Here are our starting prices:\n" +
      "• Landing Page: $299\n" +
      "• Brand Identity: $499\n" +
      "• UI/UX Design: $649\n" +
      "• Custom Web Design: $799\n" +
      "• E-commerce Design: $1,199\n" +
      "• Care & Maintenance: $99/mo\n\n" +
      "The final price depends on your pages and features, and you'll see your total before you order.",
    actions: [{ label: "Place an order", to: "/order" }],
  },
  how: {
    text:
      "It's simple:\n" +
      "1. Choose a service and tell us about your project.\n" +
      "2. Place your order. It only takes a couple of minutes.\n" +
      "3. Send the payment via JazzCash/Easypaisa and share the receipt on WhatsApp.\n" +
      "4. We start designing and share a first draft in about a week.",
    actions: [{ label: "Start your order", to: "/order" }],
  },
  human: {
    text: "Of course! You can chat with a real person on WhatsApp. Tap the button below to start the conversation.",
    actions: [
      {
        label: "Chat on WhatsApp",
        href: `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent("Hi! I'd like to talk to someone about a website.")}`,
      },
    ],
  },
  portfolio: {
    text: "We'd love to show you around! Browse our recent websites, AI applications and brand projects, and open any one to see a live preview.",
    actions: [{ label: "View portfolio", to: "/portfolio" }],
  },
  order: {
    text: "Great, let's get started! Pick a service, tell us about your project and you're done. It takes about two minutes.",
    actions: [{ label: "Place an order", to: "/order" }],
  },
  greet: {
    text: "Hello! 👋 I can help with pricing, explain how ordering works, or connect you with a real person. What would you like to know?",
  },
  fallback: {
    text: "I'm still learning, but I can help with pricing, how ordering works, or connect you with a human. What would you like to know?",
  },
};

// Simple keyword matching for typed questions
function match(text) {
  const t = text.toLowerCase();
  if (/(price|pricing|cost|how much|rate|package|cheap|afford)/.test(t)) return "pricing";
  if (/(human|person|agent|whatsapp|contact|call|support|talk)/.test(t)) return "human";
  if (/(portfolio|project|example|sample|demo|work)/.test(t)) return "portfolio";
  if (/(how|process|step|work|start)/.test(t)) return "how";
  if (/(order|buy|hire|book)/.test(t)) return "order";
  if (/\b(hi|hello|hey|salam)\b/.test(t)) return "greet";
  return "fallback";
}

/* ----------------------------- Component ----------------------------- */

export default function AIChatWidget() {
  const [open, setOpen] = useState(false);
  const [seen, setSeen] = useState(false);
  const [showTip, setShowTip] = useState(false);
  const [messages, setMessages] = useState([{ id: 0, from: "bot", text: GREETING }]);
  const [typing, setTyping] = useState(false);
  const [input, setInput] = useState("");

  const idRef = useRef(1);
  const timerRef = useRef(null);
  const listRef = useRef(null);

  // Show a small "Need help?" bubble after a few seconds
  useEffect(() => {
    const t = setTimeout(() => setShowTip(true), 3000);
    return () => clearTimeout(t);
  }, []);

  useEffect(() => () => clearTimeout(timerRef.current), []);

  // Keep the newest message in view
  useEffect(() => {
    const el = listRef.current;
    if (el) el.scrollTo({ top: el.scrollHeight, behavior: "smooth" });
  }, [messages, typing, open]);

  const toggle = () => {
    setOpen((o) => !o);
    setSeen(true);
    setShowTip(false);
  };

  const ask = (text, key) => {
    const clean = text.trim();
    if (!clean || typing) return;

    setMessages((m) => [...m, { id: idRef.current++, from: "user", text: clean }]);
    setInput("");
    setTyping(true);

    const reply = replies[key || match(clean)];
    timerRef.current = setTimeout(() => {
      setMessages((m) => [...m, { id: idRef.current++, from: "bot", ...reply }]);
      setTyping(false);
    }, 900);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    ask(input);
  };

  return (
    <>
      {/* Chat window */}
      <AnimatePresence>
        {open && (
          <motion.div
            role="dialog"
            aria-label="AI assistant chat"
            initial={{ opacity: 0, y: 30, scale: 0.92 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 20, scale: 0.95 }}
            transition={{ duration: 0.35, ease }}
            className="fixed bottom-24 right-4 z-[60] flex h-[34rem] max-h-[calc(100vh-8rem)] w-[calc(100vw-2rem)] max-w-sm origin-bottom-right flex-col overflow-hidden rounded-4xl border border-blush-100 bg-cream-50 shadow-soft sm:right-6"
          >
            {/* Header */}
            <div className="flex items-center gap-3 bg-gradient-to-r from-terracotta-500 to-terracotta-400 px-5 py-4 text-cream-50">
              <span className="flex h-10 w-10 items-center justify-center rounded-full bg-cream-50/20 text-xl">🤖</span>
              <div className="flex-1">
                <p className="font-heading text-lg font-semibold leading-tight">AI Assistant</p>
                <p className="flex items-center gap-1.5 text-xs text-cream-100/80">
                  <span className="h-2 w-2 rounded-full bg-green-300" />
                  Online
                </p>
              </div>
              <button
                type="button"
                onClick={toggle}
                aria-label="Close chat"
                className="flex h-8 w-8 items-center justify-center rounded-full text-lg transition hover:bg-cream-50/20"
              >
                ✕
              </button>
            </div>

            {/* Messages */}
            <div ref={listRef} className="flex-1 space-y-3 overflow-y-auto px-4 py-4">
              {messages.map((m) => (
                <motion.div
                  key={m.id}
                  initial={{ opacity: 0, y: 12 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.3, ease }}
                  className={m.from === "user" ? "flex justify-end" : "flex justify-start"}
                >
                  <div className="max-w-[85%]">
                    <p
                      className={`whitespace-pre-line px-4 py-2.5 text-sm leading-relaxed ${
                        m.from === "user"
                          ? "rounded-2xl rounded-br-md bg-terracotta-500 text-cream-50"
                          : "rounded-2xl rounded-bl-md bg-blush-100 text-ink"
                      }`}
                    >
                      {m.text}
                    </p>

                    {m.actions && (
                      <div className="mt-2 flex flex-wrap gap-2">
                        {m.actions.map((a) =>
                          a.to ? (
                            <Link
                              key={a.label}
                              to={a.to}
                              onClick={() => setOpen(false)}
                              className="rounded-full bg-terracotta-500 px-4 py-2 text-xs font-semibold text-cream-50 shadow-soft transition hover:bg-terracotta-600"
                            >
                              {a.label} →
                            </Link>
                          ) : (
                            <a
                              key={a.label}
                              href={a.href}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="rounded-full bg-sage-500 px-4 py-2 text-xs font-semibold text-cream-50 shadow-soft transition hover:bg-sage-600"
                            >
                              💬 {a.label}
                            </a>
                          )
                        )}
                      </div>
                    )}
                  </div>
                </motion.div>
              ))}

              {/* Typing indicator */}
              {typing && (
                <div className="flex justify-start">
                  <div className="flex gap-1.5 rounded-2xl rounded-bl-md bg-blush-100 px-4 py-3.5">
                    {[0, 1, 2].map((i) => (
                      <motion.span
                        key={i}
                        animate={{ y: [0, -4, 0] }}
                        transition={{ duration: 0.6, repeat: Infinity, delay: i * 0.15 }}
                        className="h-2 w-2 rounded-full bg-terracotta-400"
                      />
                    ))}
                  </div>
                </div>
              )}
            </div>

            {/* Quick replies */}
            <div className="flex flex-wrap gap-2 px-4 pb-3">
              {quickReplies.map((q) => (
                <button
                  key={q.key}
                  type="button"
                  disabled={typing}
                  onClick={() => ask(q.label, q.key)}
                  className="rounded-full border border-sage-300 bg-sage-50 px-3 py-1.5 text-xs font-medium text-sage-600 transition hover:bg-sage-100 disabled:cursor-not-allowed disabled:opacity-50"
                >
                  {q.label}
                </button>
              ))}
            </div>

            {/* Input */}
            <form onSubmit={handleSubmit} className="flex items-center gap-2 border-t border-blush-100 bg-cream-50 px-4 py-3">
              <label htmlFor="chat-input" className="sr-only">
                Type your message
              </label>
              <input
                id="chat-input"
                value={input}
                onChange={(e) => setInput(e.target.value)}
                placeholder="Type your question..."
                className="flex-1 rounded-full border border-blush-200 bg-cream-50 px-4 py-2.5 text-sm outline-none placeholder:text-ink/40 focus:border-terracotta-400 focus:ring-2 focus:ring-blush-300"
              />
              <button
                type="submit"
                disabled={!input.trim() || typing}
                aria-label="Send message"
                className="flex h-10 w-10 items-center justify-center rounded-full bg-terracotta-500 text-cream-50 transition hover:bg-terracotta-600 disabled:cursor-not-allowed disabled:opacity-50"
              >
                ➤
              </button>
            </form>
          </motion.div>
        )}
      </AnimatePresence>

      {/* "Need help?" bubble */}
      <AnimatePresence>
        {showTip && !open && !seen && (
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: 20 }}
            transition={{ duration: 0.4, ease }}
            className="fixed bottom-8 right-24 z-[60] hidden rounded-2xl bg-cream-50 px-4 py-2.5 text-sm font-medium shadow-card sm:block"
          >
            👋 Need help? Ask me anything
          </motion.div>
        )}
      </AnimatePresence>

      {/* Floating button */}
      <motion.button
        type="button"
        onClick={toggle}
        aria-label={open ? "Close AI chat" : "Open AI chat"}
        whileHover={{ scale: 1.08 }}
        whileTap={{ scale: 0.93 }}
        initial={{ scale: 0 }}
        animate={{ scale: 1 }}
        transition={{ type: "spring", stiffness: 260, damping: 18, delay: 0.6 }}
        className="fixed bottom-6 right-4 z-[60] flex h-14 w-14 items-center justify-center rounded-full bg-terracotta-500 text-2xl text-cream-50 shadow-soft sm:right-6"
      >
        {!open && <span className="absolute inset-0 animate-ping rounded-full bg-terracotta-400/40" />}
        {!seen && !open && <span className="absolute -right-0.5 -top-0.5 h-3.5 w-3.5 rounded-full border-2 border-cream-50 bg-blush-400" />}
        <AnimatePresence mode="wait" initial={false}>
          <motion.span
            key={open ? "close" : "bot"}
            initial={{ rotate: -90, opacity: 0 }}
            animate={{ rotate: 0, opacity: 1 }}
            exit={{ rotate: 90, opacity: 0 }}
            transition={{ duration: 0.2 }}
            className="relative"
          >
            {open ? "✕" : "🤖"}
          </motion.span>
        </AnimatePresence>
      </motion.button>
    </>
  );
}