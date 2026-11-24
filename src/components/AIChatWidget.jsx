import { useState, useEffect, useRef, useCallback } from "react";
import { Link } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";

const WHATSAPP_NUMBER = "923143422692"; // Apna number yahan daalein
const ease = [0.22, 1, 0.36, 1];
const STORAGE_KEY = "tayyab-chat-v1";
const MAX_STORED_MESSAGES = 50;
const MAX_INPUT_LENGTH = 300;

const GREETING =
  "Hello! 👋 I'm Tayyab's AI assistant. Tayyab is a highly skilled web developer from Sargodha. I can tell you about his website, services, or answer any questions you have. How can I help you today?";

const quickReplies = [
  { label: "Tell me about this website", key: "praise" },
  { label: "What is your pricing?", key: "pricing" },
  { label: "Talk about AI & Tech", key: "world_tech" },
  { label: "Talk to Human", key: "human" },
];

const replies = {
  praise: {
    en: "This website is truly impressive! 🌸 It features a modern pastel design, a unique '4D Magic Slider' that reveals the code behind the design, and smooth animations. Built with React, Tailwind CSS, and integrated with an AI Chatbot. It's fully responsive on mobile too!",
    ru: "Yeh website waqai kamaal ki hai! 🌸 Iska design bilkul modern aur pastel theme mein hai. Sab se achi baat iski '4D Magic Slider' hai jisme code se website banti hui dikhti hai. Iske ilawa isme AI Chatbot, smooth animations, aur ek professional order system bhi hai. Tayyab ne isko React aur Tailwind CSS se banaya hai, jo ke sabse latest technology hai. Iska har page mobile par bhi bilkul perfect chalta hai!",
    actions: [{ label: "Explore Home Page", to: "/" }],
  },
  pricing: {
    en: "Our starting prices are:\n• Landing Page: $299\n• Brand Identity: $499\n• UI/UX Design: $649\n• Custom Web Design: $799\n• E-commerce: $1,199\n• Maintenance: $99/mo\n\nFinal price depends on your requirements. You can see exact quote on the Order page.",
    ru: "Hamari services ke starting prices yeh hain:\n• Landing Page: $299\n• Brand Identity: $499\n• UI/UX Design: $649\n• Custom Web Design: $799\n• E-commerce: $1,199\n• Maintenance: $99/mo\n\nFinal price aapki requirements par depend karti hai. Aap Order page par ja kar exact quote dekh sakte hain.",
    actions: [{ label: "View Pricing", to: "/order" }],
  },
  world_tech: {
    en: "Technology is evolving rapidly! 🚀 AI, React, and Next.js are the future of web development. Tayyab uses these modern tools to build websites that are not just beautiful, but lightning fast. Worldwide, people prefer modern, animated, and interactive websites just like this one.",
    ru: "Technology aaj kal bohot tezi se badal rahi hai! 🚀 AI, React, aur Next.js jaisi cheezein web development ka future hain. Tayyab bhi inhi modern tools ka use karte hain, isliye unki banayi websites na sirf khoobsurat hoti hain, balke bijli ki tarah fast hoti hain. Duniya bhar mein log ab aisi hi modern aur animated websites pasand karte hain!",
    actions: [{ label: "View Portfolio", to: "/portfolio" }],
  },
  about: {
    en: "Tayyab is a passionate freelance web developer from Sargodha with over 5 years of experience. He specializes in React, Node.js, and AI. His goal is to build modern, fast, and beautiful websites. His dedication makes him stand out!",
    ru: "Tayyab bhai Sargodha se hain aur pichle 5 saal se web development kar rahe hain. Woh ek bohot talented freelance developer hain jo React, Node.js, aur AI mein expert hain. Unka maqsad hai duniya ko modern aur khoobsurat websites dena. Unki mehnat aur lagan unhe baqi developers se alag banati hai!",
    actions: [{ label: "Read About Tayyab", to: "/about" }],
  },
  services: {
    en: "Tayyab offers:\n• Custom Web Design (React/Tailwind)\n• Landing Pages\n• E-commerce Stores\n• UI/UX Design\n• Brand Identity\n• AI Chatbots & Animations\n\nYou can see live demos on the Portfolio page!",
    ru: "Tayyab yeh sab kaam karte hain:\n• Custom Web Design (React/Tailwind)\n• Landing Pages\n• E-commerce Stores\n• UI/UX Design\n• Brand Identity\n• AI Chatbots aur Animations\n\nAap Portfolio page par ja kar live demos dekh sakte hain!",
    actions: [{ label: "View Services", to: "/portfolio" }],
  },
  order: {
    en: "Ordering is easy:\n1. Click 'Start an Order'\n2. Select a service\n3. Fill your details\n4. Choose payment method\n\nIt takes just 2 minutes!",
    ru: "Order karna bohot aasan hai:\n1. 'Start an Order' par click karein\n2. Service select karein\n3. Apni details bharein\n4. Payment method choose karein\n\nBas 2 minute mein order ho jayega!",
    actions: [{ label: "Start an Order", to: "/order" }],
  },
  human: {
    en: "Sure! You can chat directly with Tayyab on WhatsApp. Click the button below.",
    ru: "Bilkul! Aap Tayyab se directly WhatsApp par baat kar sakte hain. Neeche button dabayein.",
    actions: [
      {
        label: "Chat on WhatsApp",
        href: `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent("Hello! I'd like to discuss a website project.")}`,
      },
    ],
  },
  greeting: {
    en: "Hi there! 😊 I can help with pricing, services, how to place an order, or anything about Tayyab's work. What would you like to know?",
    ru: "Assalam o Alaikum! 😊 Main pricing, services, order karne ke tareeqay, ya Tayyab ke kaam ke baare mein madad kar sakta hoon. Aap kya jaanna chahte hain?",
  },
  thanks: {
    en: "You're very welcome! 🌸 If you have more questions, I'm right here.",
    ru: "Bohot shukriya! 🌸 Agar koi aur sawal ho to main yahin hoon.",
  },
  bye: {
    en: "Goodbye! 👋 Have a wonderful day, and come back anytime.",
    ru: "Khuda hafiz! 👋 Aap ka din acha guzre, jab chahein wapas aayein.",
  },
  fallback: {
    en: "I'm not sure about that, but I can tell you about Tayyab's website, pricing, or services. Or click 'Talk to Human' to chat on WhatsApp.",
    ru: "Maaf kijiye, main yeh sawal theek se nahi samajh paya. Aap mujhse website, pricing, ya services ke baare mein pooch sakte hain. Ya 'Talk to Human' par click karein.",
  },
};

/* ------------------------------------------------------------------ */
/*  Intent engine: tokenised, weighted, typo-tolerant scoring          */
/* ------------------------------------------------------------------ */

// Listed in priority order (used to break ties).
const INTENTS = [
  {
    key: "human",
    words: { human: 3, insan: 3, banda: 3, whatsapp: 3, contact: 3, rabta: 3, call: 2, phone: 2, number: 2, agent: 3, support: 2, person: 2, talk: 1, baat: 1, representative: 2 },
    phrases: { "talk to": 2, "speak to": 2, "real person": 3 },
  },
  {
    key: "pricing",
    words: { price: 3, prices: 3, pricing: 3, cost: 3, costs: 3, rate: 2, rates: 2, kitna: 3, kitne: 3, kitni: 3, paisa: 3, paise: 3, fees: 3, fee: 3, charge: 2, charges: 2, package: 2, packages: 2, dollar: 2, dollars: 2, rupay: 2, rupees: 2, quote: 2, budget: 2, expensive: 2, cheap: 2, qeemat: 3, keemat: 3 },
    phrases: { "how much": 4 },
  },
  {
    key: "order",
    words: { order: 3, buy: 3, book: 2, shuru: 2, start: 1, place: 1, form: 1, payment: 2, pay: 2, hire: 3, purchase: 3, kaise: 1, kese: 1, kaisay: 1, banwana: 3, banwani: 3 },
    phrases: { "get started": 3, "how to order": 4, "place an order": 4, "website banwana": 3 },
  },
  {
    key: "services",
    words: { service: 3, services: 3, kaam: 2, ecommerce: 3, store: 2, shop: 2, landing: 3, ui: 2, ux: 2, brand: 2, branding: 2, animation: 2, animations: 2, chatbot: 2, offer: 2, offers: 2, maintenance: 2 },
    phrases: { "what do you do": 4, "kya karte": 3, "kya kya": 2 },
  },
  {
    key: "about",
    words: { tayyab: 2, about: 2, sargodha: 3, experience: 3, tajurba: 3, freelance: 2, freelancer: 2, developer: 2, kaun: 2, kon: 2, who: 1 },
    phrases: { "who is": 3, "kahan se": 3, "kaun hain": 3 },
  },
  {
    key: "world_tech",
    words: { ai: 3, tech: 3, technology: 3, world: 2, dunya: 2, future: 2, react: 2, node: 2, nodejs: 2, nextjs: 3, modern: 1, trend: 2, trends: 2, coding: 2, programming: 2, artificial: 2, intelligence: 2 },
    phrases: {},
  },
  {
    key: "praise",
    words: { website: 2, site: 2, design: 2, praise: 3, tareef: 3, achi: 2, acha: 2, kamaal: 3, zabardast: 3, look: 2, dekh: 1, kaisi: 2, kaisa: 2, impressive: 3, beautiful: 3, slider: 3, magic: 2, "4d": 3, wow: 2, nice: 2, amazing: 2 },
    phrases: { "this website": 2, "this site": 2 },
  },
  {
    key: "greeting",
    words: { hi: 3, hello: 3, hey: 3, hii: 3, salam: 3, salaam: 3, assalam: 3, assalamualaikum: 3, aoa: 3, hola: 2, namaste: 2 },
    phrases: { "good morning": 3, "good evening": 3 },
  },
  {
    key: "thanks",
    words: { thanks: 4, thank: 4, thx: 4, shukriya: 4, shukria: 4, jazakallah: 4, mehrbani: 3 },
    phrases: {},
  },
  {
    key: "bye",
    words: { bye: 4, goodbye: 4, hafiz: 4, allah: 1, alvida: 4 },
    phrases: { "see you": 3, "khuda hafiz": 4 },
  },
];

const URDU_WORDS = new Set(
  ("hai hain kya kaise kese kaisa kaisi kaisay kaysay kaun kon kitna kitne kitni karo karein kar kuch koi mujhe muje tum aap ap nahi nahin nah haan han kab kahan kyun kyu acha achi thek theek bhai salam assalam shukriya paisa paise chahiye chahye banwana banwani karna karni karwana dikhao batao samjhao tareef baat bata kaam mein se ka ki ke ko ho hoon hun aur ya lekin magar bohot bahut zaroor shayad abhi pehle baad").split(" ")
);

const ENGLISH_WORDS = new Set(
  ("the is are was what how why when where who which your you can could would do does did i my me we our a an of and or to for with about tell please this that it in on at have has will want need").split(" ")
);

const URDU_SCRIPT = /[\u0600-\u06FF]/;

function normalize(text) {
  return text
    .toLowerCase()
    .replace(/e-commerce/g, "ecommerce")
    .replace(/next\.?js/g, "nextjs")
    .replace(/node\.?js/g, "nodejs")
    .replace(/[^a-z0-9\u0600-\u06FF\s]/g, " ")
    .replace(/\s+/g, " ")
    .trim();
}

function tokenize(text) {
  const n = normalize(text);
  return { normalized: n, tokens: n ? n.split(" ") : [] };
}

// Levenshtein distance with early exit (bounded to max 1 for our use).
function withinOneEdit(a, b) {
  if (a === b) return true;
  const la = a.length;
  const lb = b.length;
  if (Math.abs(la - lb) > 1) return false;
  let i = 0;
  let j = 0;
  let edits = 0;
  while (i < la && j < lb) {
    if (a[i] === b[j]) {
      i++;
      j++;
      continue;
    }
    if (++edits > 1) return false;
    if (la > lb) i++;
    else if (lb > la) j++;
    else {
      i++;
      j++;
    }
  }
  return edits + (la - i) + (lb - j) <= 1;
}

function scoreIntent(intent, tokens, normalized) {
  let score = 0;
  const padded = ` ${normalized} `;
  for (const [phrase, w] of Object.entries(intent.phrases)) {
    if (padded.includes(` ${phrase} `)) score += w;
  }
  const entries = Object.entries(intent.words);
  for (const token of tokens) {
    const exact = intent.words[token];
    if (exact !== undefined) {
      score += exact;
      continue;
    }
    if (token.length < 5) continue;
    for (const [word, w] of entries) {
      if (word.length >= 5 && withinOneEdit(token, word)) {
        score += w * 0.7; // typo tolerance, slightly discounted
        break;
      }
    }
  }
  return score;
}

function match(text) {
  const { normalized, tokens } = tokenize(text);
  if (!tokens.length) return "fallback";
  let best = "fallback";
  let bestScore = 0;
  for (const intent of INTENTS) {
    const s = scoreIntent(intent, tokens, normalized);
    if (s > bestScore) {
      best = intent.key;
      bestScore = s;
    }
  }
  return bestScore >= 1.5 ? best : "fallback";
}

// Returns "ru", "en", or null (not enough signal – keep the current language).
function detectLang(text) {
  if (URDU_SCRIPT.test(text)) return "ru";
  const { tokens } = tokenize(text);
  let urdu = 0;
  let en = 0;
  for (const t of tokens) {
    if (URDU_WORDS.has(t)) urdu++;
    else if (ENGLISH_WORDS.has(t)) en++;
  }
  if (urdu > 0 && urdu >= en) return "ru";
  if (en > 0 && urdu === 0) return "en";
  return null;
}

/* ------------------------------------------------------------------ */
/*  Session persistence (safe against blocked / corrupt storage)       */
/* ------------------------------------------------------------------ */

function isValidMessage(m) {
  return (
    m &&
    typeof m === "object" &&
    Number.isInteger(m.id) &&
    (m.from === "bot" || m.from === "user") &&
    typeof m.text === "string"
  );
}

function loadState() {
  const fresh = { messages: [{ id: 0, from: "bot", text: GREETING }], lang: "en", nextId: 1 };
  try {
    const raw = typeof window !== "undefined" ? window.sessionStorage.getItem(STORAGE_KEY) : null;
    if (!raw) return fresh;
    const data = JSON.parse(raw);
    if (!data || !Array.isArray(data.messages)) return fresh;
    const messages = data.messages.filter(isValidMessage).slice(-MAX_STORED_MESSAGES);
    if (!messages.length) return fresh;
    const nextId = messages.reduce((mx, m) => Math.max(mx, m.id), 0) + 1;
    return { messages, lang: data.lang === "ru" ? "ru" : "en", nextId };
  } catch {
    return fresh;
  }
}

function saveState(messages, lang) {
  try {
    window.sessionStorage.setItem(
      STORAGE_KEY,
      JSON.stringify({ messages: messages.slice(-MAX_STORED_MESSAGES), lang })
    );
  } catch {
    /* storage unavailable – chat still works in memory */
  }
}

/* ------------------------------------------------------------------ */
/*  Component                                                          */
/* ------------------------------------------------------------------ */

export default function AIChatWidget() {
  const [initial] = useState(loadState);
  const [open, setOpen] = useState(false);
  const [seen, setSeen] = useState(false);
  const [showTip, setShowTip] = useState(false);
  const [messages, setMessages] = useState(initial.messages);
  const [typing, setTyping] = useState(false);
  const [input, setInput] = useState("");

  const idRef = useRef(initial.nextId);
  const langRef = useRef(initial.lang);
  const timerRef = useRef(null);
  const listRef = useRef(null);
  const inputRef = useRef(null);

  useEffect(() => {
    const t = setTimeout(() => setShowTip(true), 3000);
    return () => clearTimeout(t);
  }, []);

  useEffect(() => () => clearTimeout(timerRef.current), []);

  useEffect(() => {
    saveState(messages, langRef.current);
  }, [messages]);

  useEffect(() => {
    const el = listRef.current;
    if (!el) return;
    const reduce =
      typeof window !== "undefined" &&
      window.matchMedia &&
      window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    el.scrollTo({ top: el.scrollHeight, behavior: reduce ? "auto" : "smooth" });
  }, [messages, typing, open]);

  // Close with Escape; focus the input on desktop-class pointers (avoids popping the mobile keyboard).
  useEffect(() => {
    if (!open) return undefined;
    const onKey = (e) => {
      if (e.key === "Escape") setOpen(false);
    };
    window.addEventListener("keydown", onKey);
    const focusTimer = setTimeout(() => {
      if (window.matchMedia && window.matchMedia("(pointer: fine)").matches) {
        inputRef.current?.focus();
      }
    }, 380);
    return () => {
      window.removeEventListener("keydown", onKey);
      clearTimeout(focusTimer);
    };
  }, [open]);

  const toggle = useCallback(() => {
    setOpen((o) => !o);
    setSeen(true);
    setShowTip(false);
  }, []);

  const ask = useCallback(
    (text, key) => {
      const clean = text.trim().slice(0, MAX_INPUT_LENGTH);
      if (!clean || typing) return;

      // Typed messages can switch language; quick replies keep the current one.
      if (!key) {
        const detected = detectLang(clean);
        if (detected) langRef.current = detected;
      }
      const lang = langRef.current;

      setMessages((m) => [...m, { id: idRef.current++, from: "user", text: clean }]);
      setInput("");
      setTyping(true);

      const intent = key && replies[key] ? key : match(clean);
      const replyData = replies[intent] || replies.fallback;
      const finalText = replyData[lang] || replyData.en;
      const delay = Math.min(1600, Math.max(700, 500 + finalText.length * 3));

      clearTimeout(timerRef.current);
      timerRef.current = setTimeout(() => {
        setMessages((m) => [
          ...m,
          { id: idRef.current++, from: "bot", text: finalText, actions: replyData.actions },
        ]);
        setTyping(false);
      }, delay);
    },
    [typing]
  );

  const handleSubmit = (e) => {
    e.preventDefault();
    ask(input);
  };

  return (
    <>
      <AnimatePresence>
        {open && (
          <motion.div
            role="dialog"
            aria-label="Chat with Tayyab's AI assistant"
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
              <button onClick={toggle} aria-label="Close chat" className="flex h-8 w-8 items-center justify-center rounded-full text-lg transition hover:bg-cream-50/20">✕</button>
            </div>

            <div ref={listRef} role="log" aria-live="polite" className="flex-1 space-y-4 overflow-y-auto px-4 py-4">
              {messages.map((m) => (
                <motion.div key={m.id} initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} className={m.from === "user" ? "flex justify-end" : "flex justify-start"}>
                  <div className={`max-w-[85%] ${m.from === "user" ? "text-right" : "text-left"}`}>
                    <p className={`whitespace-pre-line break-words px-4 py-2.5 text-sm leading-relaxed ${m.from === "user" ? "rounded-2xl rounded-br-sm bg-terracotta-500 text-cream-50" : "rounded-2xl rounded-bl-sm bg-blush-100 text-ink"}`}>
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
                <div className="flex justify-start" aria-label="Assistant is typing">
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
                ref={inputRef}
                value={input}
                onChange={(e) => setInput(e.target.value)}
                maxLength={MAX_INPUT_LENGTH}
                autoComplete="off"
                aria-label="Type your question"
                placeholder="Type your question..."
                className="flex-1 rounded-full border border-blush-200 bg-cream-50 px-4 py-2 text-sm outline-none placeholder:text-ink/40 focus:border-terracotta-400 focus:ring-2 focus:ring-blush-300"
              />
              <button type="submit" aria-label="Send message" disabled={!input.trim() || typing} className="flex h-10 w-10 items-center justify-center rounded-full bg-terracotta-500 text-cream-50 transition hover:bg-terracotta-600 disabled:opacity-50">
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
        aria-label={open ? "Close chat" : "Open chat"}
        aria-expanded={open}
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