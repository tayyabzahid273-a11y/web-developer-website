import { useState, useEffect, useRef } from "react";
import { Link } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";

const WHATSAPP_NUMBER = "923143422692"; // Apna number yahan daalein
const ease = [0.22, 1, 0.36, 1];

const GREETING = "Assalam o Alaikum / Hello! 👋 Main Tayyab ka AI assistant hoon. Tayyab Sargodha se ek bohot zabardast web developer hain. Main aapko unki website, services, ya kisi bhi cheez ke baare mein bata sakta hoon. Aap kya jaanna chahte hain?";

const quickReplies = [
  { label: "Website ke bare mein batao", key: "praise" },
  { label: "Pricing kya hai?", key: "pricing" },
  { label: "AI ke bare mein batao", key: "world_tech" },
  { label: "Talk to Human", key: "human" },
];

const replies = {
  // Website ki Tareef (Praise)
  praise: {
    text: "Yeh website waqai kamaal ki hai! 🌸 Iska design bilkul modern aur pastel theme mein hai. Sab se achi baat iski '4D Magic Slider' hai jisme code se website banti hui dikhti hai. Iske ilawa isme AI Chatbot, smooth animations, aur ek professional order system bhi hai. Tayyab ne isko React aur Tailwind CSS se banaya hai, jo ke sabse latest technology hai. Iska har page mobile par bhi bilkul perfect chalta hai!",
    actions: [{ label: "Home Page Dekhein", to: "/" }],
  },

  // Pricing
  pricing: {
    text: "Tayyab ki services ke starting prices yeh hain:\n• Landing Page: $299\n• Brand Identity: $499\n• UI/UX Design: $649\n• Custom Web Design: $799\n• E-commerce: $1,199\n• Maintenance: $99/mo\n\nAapko jo chahiye uske hisaab se price change ho sakti hai. Order page par ja kar aap exact quote dekh sakte hain.",
    actions: [{ label: "Pricing Page", to: "/order" }],
  },

  // World / Tech Knowledge (Dunya ke baare mein)
  world_tech: {
    text: "Technology aaj kal bohot tezi se badal rahi hai! 🚀 AI (Artificial Intelligence), React, aur Next.js jaisi cheezein web development ka future hain. Tayyab bhi inhi modern tools ka use karte hain, isliye unki banayi websites na sirf khoobsurat hoti hain, balke bijli ki tarah fast hoti hain. Duniya bhar mein log ab aisi hi modern aur animated websites pasand karte hain!",
    actions: [{ label: "Portfolio Dekhein", to: "/portfolio" }],
  },

  // Tayyab ki Tareef (About)
  about: {
    text: "Tayyab bhai Sargodha se hain aur pichle 5 saal se web development kar rahe hain. Woh ek bohot talented freelance developer hain jo React, Node.js, aur AI mein expert hain. Unka maqsad hai duniya ko modern aur khoobsurat websites dena. Unki mehnat aur lagan unhe baqi developers se alag banati hai!",
    actions: [{ label: "About Tayyab", to: "/about" }],
  },

  // Services
  services: {
    text: "Tayyab kya kya karte hain? Dekhein:\n• Custom Web Design (React/Tailwind)\n• Landing Pages\n• E-commerce Stores\n• UI/UX Design\n• Brand Identity\n• AI Chatbots aur Animations\n\nHar service mein woh 100% mehnat aur modern technology use karte hain.",
    actions: [{ label: "Services Dekhein", to: "/portfolio" }],
  },

  // Order
  order: {
    text: "Order karna bohot aasan hai:\n1. 'Start an Order' par click karein\n2. Service select karein\n3. Apni details bharein\n4. Payment method choose karein\n\nBas 2 minute mein aapka order ho jayega! Tayyab aapse rabta karenge.",
    actions: [{ label: "Start Order", to: "/order" }],
  },

  // Human
  human: {
    text: "Bilkul! Agar aap Tayyab se directly baat karna chahte hain, toh aap WhatsApp par unse rabta kar sakte hain. Woh aapko foran jawab denge!",
    actions: [
      {
        label: "WhatsApp par Baat Karein",
        href: `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent("Assalam o Alaikum! Mujhe website banwani hai.")}`,
      },
    ],
  },

  // Fallback (Agar kuch samajh na aaye)
  fallback: {
    text: "Yeh sawal thora mushkil hai, lekin main aapko bata sakta hoon ke Tayyab ki website bohot modern aur fast hai! Aap mujhse 'Pricing', 'Services', ya 'Website' ke baare mein pooch sakte hain. Ya phir 'Talk to Human' par click karein taake aap Tayyab se baat kar sakein.",
  },
};

// Zubaan check karne ka function
function isRomanUrdu(text) {
  const t = text.toLowerCase();
  return /(hai|hain|kya|kaise|kese|kaisa|kaun|kon|kitna|kitne|karo|karein|kar|kuch|koi|mujhe|muje|tum|aap|ap|nahi|nah|haan|han|kab|kahan|kyun|kyu|acha|thek|bhai|salam|assalam|shukriya|paisa|paise|chahiye|chahye|banwana|banwani|karna|karni|karwana|dikhao|batao|samjhao|tareef|baat|bata|website|kaam|kaisay|kaysay)/.test(t);
}

// Smart Match Function (Keywords)
function match(text) {
  const t = text.toLowerCase();
  
  if (/(website|site|design|praise|tareef|achi|acha|kamaal|zabardast|look|dekh|kaisi|kaisa)/.test(t)) return "praise";
  if (/(price|pricing|cost|rate|kitna|kitne|paisa|paise|fees|charge|package|dollar|rupay)/.test(t)) return "pricing";
  if (/(ai|tech|technology|world|dunya|future|react|node|modern|trend|coding|programming)/.test(t)) return "world_tech";
  if (/(tayyab|kaun|kon|about|kahan se|sargodha|experience|tajurba|freelance|developer)/.test(t)) return "about";
  if (/(service|services|kaam|kya karte|ecommerce|store|landing|ui|ux|brand|animation|chatbot)/.test(t)) return "services";
  if (/(order|buy|book|kaise|kese|shuru|start|place|form|payment|pay)/.test(t)) return "order";
  if (/(human|insan|banda|baat|whatsapp|contact|rabta|call|phone|number|agent|support)/.test(t)) return "human";
  
  return "fallback";
}

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

  useEffect(() => {
    const t = setTimeout(() => setShowTip(true), 3000);
    return () => clearTimeout(t);
  }, []);

  useEffect(() => () => clearTimeout(timerRef.current), []);

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

    const userIsRoman = isRomanUrdu(clean);
    setMessages((m) => [...m, { id: idRef.current++, from: "user", text: clean }]);
    setInput("");
    setTyping(true);

    const replyData = replies[key || match(clean)];
    
    // AGAR key direct match ho jaye (quick reply se) toh usko priority do
    let finalText = replyData.text;
    if (replyData.en && replyData.ru) {
       finalText = userIsRoman ? replyData.ru : replyData.en;
    }

    timerRef.current = setTimeout(() => {
      setMessages((m) => [...m, { id: idRef.current++, from: "bot", text: finalText, actions: replyData.actions }]);
      setTyping(false);
    }, 1200); // Thora aur time diya taake AI sochta hua lage
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    ask(input);
  };

  return (
    <>
      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0, y: 30, scale: 0.92 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 20, scale: 0.95 }}
            transition={{ duration: 0.35, ease }}
            className="fixed bottom-24 right-4 z-[60] flex h-[32rem] max-h-[calc(100vh-8rem)] w-[calc(100vw-2rem)] max-w-sm origin-bottom-right flex-col overflow-hidden rounded-3xl border border-blush-100 bg-cream-50 shadow-soft sm:right-6"
          >
            <div className="flex items-center gap-3 bg-gradient-to-r from-terracotta-500 to-terracotta-400 px-5 py-4 text-cream-50">
              <span className="flex h-10 w-10 items-center justify-center rounded-full bg-cream-50/20 text-xl">🤖</span>
              <div className="flex-1">
                <p className="font-heading text-lg font-semibold leading-tight">Tayyab's AI</p>
                <p className="flex items-center gap-1.5 text-xs text-cream-100/80">
                  <span className="h-2 w-2 rounded-full bg-green-300" />
                  Online
                </p>
              </div>
              <button onClick={toggle} className="flex h-8 w-8 items-center justify-center rounded-full text-lg transition hover:bg-cream-50/20">✕</button>
            </div>

            <div ref={listRef} className="flex-1 space-y-4 overflow-y-auto px-4 py-4">
              {messages.map((m) => (
                <motion.div key={m.id} initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} className={m.from === "user" ? "flex justify-end" : "flex justify-start"}>
                  <div className={`max-w-[85%] ${m.from === "user" ? "text-right" : "text-left"}`}>
                    <p className={`whitespace-pre-line px-4 py-2.5 text-sm leading-relaxed ${m.from === "user" ? "rounded-2xl rounded-br-sm bg-terracotta-500 text-cream-50" : "rounded-2xl rounded-bl-sm bg-blush-100 text-ink"}`}>
                      {m.text}
                    </p>
                    {m.actions && (
                      <div className="mt-2 flex flex-wrap gap-2">
                        {m.actions.map((a) =>
                          a.to ? (
                            <Link key={a.label} to={a.to} onClick={() => setOpen(false)} className="rounded-full bg-terracotta-500 px-4 py-1.5 text-xs font-semibold text-cream-50 shadow-soft transition hover:bg-terracotta-600">
                              {a.label} →
                            </Link>
                          ) : (
                            <a key={a.label} href={a.href} target="_blank" rel="noopener noreferrer" className="rounded-full bg-sage-500 px-4 py-1.5 text-xs font-semibold text-cream-50 shadow-soft transition hover:bg-sage-600">
                              💬 {a.label}
                            </a>
                          )
                        )}
                      </div>
                    )}
                  </div>
                </motion.div>
              ))}
              {typing && (
                <div className="flex justify-start">
                  <div className="flex gap-1.5 rounded-2xl rounded-bl-sm bg-blush-100 px-4 py-3">
                    {[0, 1, 2].map((i) => (
                      <motion.span key={i} animate={{ y: [0, -4, 0] }} transition={{ duration: 0.6, repeat: Infinity, delay: i * 0.15 }} className="h-2 w-2 rounded-full bg-terracotta-400" />
                    ))}
                  </div>
                </div>
              )}
            </div>

            <div className="flex flex-wrap gap-2 px-4 pb-3">
              {quickReplies.map((q) => (
                <button key={q.key} disabled={typing} onClick={() => ask(q.label, q.key)} className="rounded-full border border-sage-300 bg-sage-50 px-3 py-1.5 text-xs font-medium text-sage-600 transition hover:bg-sage-100 disabled:opacity-50">
                  {q.label}
                </button>
              ))}
            </div>

            <form onSubmit={handleSubmit} className="flex items-center gap-2 border-t border-blush-100 bg-cream-50 px-4 py-3">
              <input
                value={input}
                onChange={(e) => setInput(e.target.value)}
                placeholder="Type your question..."
                className="flex-1 rounded-full border border-blush-200 bg-cream-50 px-4 py-2 text-sm outline-none placeholder:text-ink/40 focus:border-terracotta-400 focus:ring-2 focus:ring-blush-300"
              />
              <button type="submit" disabled={!input.trim() || typing} className="flex h-10 w-10 items-center justify-center rounded-full bg-terracotta-500 text-cream-50 transition hover:bg-terracotta-600 disabled:opacity-50">
                ➤
              </button>
            </form>
          </motion.div>
        )}
      </AnimatePresence>

      <AnimatePresence>
        {showTip && !open && !seen && (
          <motion.div initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: 20 }} className="fixed bottom-8 right-24 z-[60] hidden rounded-2xl bg-cream-50 px-4 py-2.5 text-sm font-medium shadow-card sm:block">
            👋 Need help? Ask me anything
          </motion.div>
        )}
      </AnimatePresence>

      <motion.button
        onClick={toggle}
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
          <motion.span key={open ? "close" : "bot"} initial={{ rotate: -90, opacity: 0 }} animate={{ rotate: 0, opacity: 1 }} exit={{ rotate: 90, opacity: 0 }} transition={{ duration: 0.2 }} className="relative">
            {open ? "✕" : "🤖"}
          </motion.span>
        </AnimatePresence>
      </motion.button>
    </>
  );
}