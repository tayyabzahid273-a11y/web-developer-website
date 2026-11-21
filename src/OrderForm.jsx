import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

/* ----------------------------- Config ----------------------------- */

// Yahan aapka live Vercel backend URL hai
const API_URL = "https://web-developer-website-v3c1.vercel.app/api/orders";
const PAYMENT_NUMBER = "0314-3422692"; // Apna JazzCash/Easypaisa number yahan daalein
const WHATSAPP_NUMBER = "923143422692"; // Apna WhatsApp number yahan daalein
const CURRENCY = "$"; // change to "Rs. " if your prices are in PKR

/* ----------------------------- Data ----------------------------- */

const ease = [0.22, 1, 0.36, 1];

const services = [
  { id: "custom", icon: "🎨", title: "Custom Web Design", desc: "Bespoke, pixel-perfect website built around your brand.", price: 799, time: "2–3 weeks" },
  { id: "landing", icon: "🚀", title: "Landing Page", desc: "A high-converting single page for a product or campaign.", price: 299, time: "5–7 days" },
  { id: "ecommerce", icon: "🛍️", title: "E-commerce Design", desc: "A beautiful storefront with a smooth checkout flow.", price: 1199, time: "3–4 weeks" },
  { id: "brand", icon: "✨", title: "Brand Identity", desc: "Logo, color palette and type system for your brand.", price: 499, time: "1–2 weeks" },
  { id: "uiux", icon: "📱", title: "UI/UX Design", desc: "Research-backed interface design for web or mobile apps.", price: 649, time: "2 weeks" },
  { id: "care", icon: "🛠️", title: "Care & Maintenance", desc: "Ongoing updates, performance tuning and support.", price: 99, unit: "/mo", time: "Monthly" },
];

const timelines = ["Flexible", "1 month", "2 weeks", "ASAP"];

const paymentMethods = [
  { id: "card", icon: "💳", title: "Credit / Debit Card", desc: "Visa, Mastercard and more." },
  { id: "jazzcash", icon: "📱", title: "JazzCash / Easypaisa", desc: "Manual transfer. Instant confirmation." },
];

const stepLabels = ["Service", "Details", "Payment"];

const initialData = {
  service: "",
  name: "",
  email: "",
  phone: "",
  brand: "",
  timeline: "Flexible",
  website: "",
  description: "",
  payment: "",
  cardName: "",
  cardNumber: "",
  expiry: "",
  cvc: "",
};

/* ---------------------------- Helpers ---------------------------- */

const slide = {
  enter: (dir) => ({ x: dir > 0 ? 60 : -60, opacity: 0 }),
  center: { x: 0, opacity: 1, transition: { duration: 0.45, ease } },
  exit: (dir) => ({ x: dir > 0 ? -60 : 60, opacity: 0, transition: { duration: 0.3, ease } }),
};

const formatAmount = (n) => `${CURRENCY}${n.toLocaleString()}`;

const priceLabel = (s) => `${formatAmount(s.price)}${s.unit || ""}`;

/* --------------------------- UI pieces --------------------------- */

function Stepper({ step }) {
  return (
    <div className="relative mb-10">
      <div className="absolute left-12 right-12 top-5">
        <div className="h-1 rounded-full bg-blush-100" />
        <motion.div
          className="absolute left-0 top-0 h-1 rounded-full bg-terracotta-400"
          animate={{ width: `${(step / (stepLabels.length - 1)) * 100}%` }}
          transition={{ duration: 0.5, ease }}
        />
      </div>

      <ol className="relative flex justify-between">
        {stepLabels.map((label, i) => {
          const done = i < step;
          const active = i === step;
          return (
            <li key={label} className="flex w-24 flex-col items-center gap-2">
              <motion.span
                animate={{ scale: active ? 1.12 : 1 }}
                transition={{ type: "spring", stiffness: 300 }}
                className={`flex h-11 w-11 items-center justify-center rounded-full border-4 border-cream-50 font-semibold transition-colors duration-300 ${
                  done || active ? "bg-terracotta-500 text-cream-50" : "bg-blush-100 text-ink/50"
                } ${active ? "shadow-soft" : ""}`}
              >
                {done ? "✓" : i + 1}
              </motion.span>
              <span className={`text-sm font-medium transition-colors ${done || active ? "text-ink" : "text-ink/40"}`}>
                {label}
              </span>
            </li>
          );
        })}
      </ol>
    </div>
  );
}

function Field({ label, optional, children }) {
  return (
    <label className="block">
      <span className="mb-2 block text-sm font-medium text-ink/80">
        {label}
        {optional && <span className="ml-1 text-ink/40">(optional)</span>}
      </span>
      {children}
    </label>
  );
}

function Choice({ selected, onClick, icon, title, desc, meta }) {
  return (
    <motion.button
      type="button"
      onClick={onClick}
      whileHover={{ y: -4 }}
      whileTap={{ scale: 0.98 }}
      className={`relative w-full rounded-3xl border-2 p-5 text-left transition-colors duration-300 ${
        selected ? "border-terracotta-400 bg-blush-50 shadow-soft" : "border-blush-100 bg-cream-50 hover:border-blush-300"
      }`}
    >
      <AnimatePresence>
        {selected && (
          <motion.span
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            exit={{ scale: 0 }}
            className="absolute right-4 top-4 flex h-6 w-6 items-center justify-center rounded-full bg-terracotta-500 text-xs text-cream-50"
          >
            ✓
          </motion.span>
        )}
      </AnimatePresence>
      <span className="mb-3 flex h-12 w-12 items-center justify-center rounded-2xl bg-cream-200 text-2xl">{icon}</span>
      <span className="block font-heading text-lg font-semibold">{title}</span>
      <span className="mt-1 block text-sm leading-relaxed text-ink/70">{desc}</span>
      {meta && <span className="mt-3 block text-sm font-medium text-terracotta-600">{meta}</span>}
    </motion.button>
  );
}

function StepHeader({ title, subtitle }) {
  return (
    <div className="mb-8">
      <h2 className="font-heading text-2xl font-semibold sm:text-3xl">{title}</h2>
      <p className="mt-2 text-ink/70">{subtitle}</p>
    </div>
  );
}

function Spinner() {
  return (
    <motion.span
      aria-hidden="true"
      animate={{ rotate: 360 }}
      transition={{ duration: 0.8, repeat: Infinity, ease: "linear" }}
      className="mr-2 inline-block h-4 w-4 rounded-full border-2 border-cream-50/40 border-t-cream-50"
    />
  );
}

/* ----------------------------- Steps ----------------------------- */

function ServiceStep({ data, update }) {
  return (
    <>
      <StepHeader title="What do you need?" subtitle="Pick the service that fits your project best." />
      <div className="grid gap-4 sm:grid-cols-2">
        {services.map((s) => (
          <Choice
            key={s.id}
            selected={data.service === s.id}
            onClick={() => update("service", s.id)}
            icon={s.icon}
            title={s.title}
            desc={s.desc}
            meta={`From ${priceLabel(s)} · ${s.time}`}
          />
        ))}
      </div>
    </>
  );
}

function DetailsStep({ data, update }) {
  return (
    <>
      <StepHeader title="Tell us about your project" subtitle="The more we know, the better we can design." />
      <div className="space-y-5">
        <div className="grid gap-5 sm:grid-cols-2">
          <Field label="Full name">
            <input
              className="input-field"
              placeholder="Jane Doe"
              value={data.name}
              onChange={(e) => update("name", e.target.value)}
            />
          </Field>
          <Field label="Email address">
            <input
              type="email"
              className="input-field"
              placeholder="jane@example.com"
              value={data.email}
              onChange={(e) => update("email", e.target.value)}
            />
          </Field>
        </div>

        <div className="grid gap-5 sm:grid-cols-2">
          <Field label="Phone number">
            <input
              type="tel"
              className="input-field"
              placeholder="+92 300 1234567"
              value={data.phone}
              onChange={(e) => update("phone", e.target.value)}
            />
          </Field>
          <Field label="Business / brand name" optional>
            <input
              className="input-field"
              placeholder="Sunny Bakery"
              value={data.brand}
              onChange={(e) => update("brand", e.target.value)}
            />
          </Field>
        </div>

        <Field label="Existing website" optional>
          <input
            className="input-field"
            placeholder="https://"
            value={data.website}
            onChange={(e) => update("website", e.target.value)}
          />
        </Field>

        <div>
          <span className="mb-2 block text-sm font-medium text-ink/80">Preferred timeline</span>
          <div className="flex flex-wrap gap-3">
            {timelines.map((t) => (
              <motion.button
                key={t}
                type="button"
                whileTap={{ scale: 0.95 }}
                onClick={() => update("timeline", t)}
                className={`rounded-full border px-5 py-2 text-sm font-medium transition-colors duration-300 ${
                  data.timeline === t
                    ? "border-sage-400 bg-sage-400 text-cream-50"
                    : "border-sage-200 bg-sage-50 text-sage-600 hover:bg-sage-100"
                }`}
              >
                {t}
              </motion.button>
            ))}
          </div>
        </div>

        <Field label="Project description">
          <textarea
            rows={5}
            className="input-field resize-none"
            placeholder="Tell us about your goals, audience, style you love, pages you need..."
            value={data.description}
            onChange={(e) => update("description", e.target.value)}
          />
        </Field>
      </div>
    </>
  );
}

function PaymentStep({ data, update }) {
  return (
    <>
      <StepHeader title="How would you like to pay?" subtitle="Choose a payment method to finish your order." />
      <div className="grid gap-4 sm:grid-cols-2">
        {paymentMethods.map((m) => (
          <Choice
            key={m.id}
            selected={data.payment === m.id}
            onClick={() => update("payment", m.id)}
            icon={m.icon}
            title={m.title}
            desc={m.desc}
          />
        ))}
      </div>
    </>
  );
}

/* ---------------------------- Summary ---------------------------- */

function Summary({ service, payment }) {
  const method = paymentMethods.find((m) => m.id === payment);

  return (
    <aside className="card lg:sticky lg:top-28">
      <h3 className="mb-5 font-heading text-xl font-semibold">Order summary</h3>
      <AnimatePresence mode="wait">
        {service ? (
          <motion.div
            key={service.id}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.3 }}
          >
            <div className="mb-5 flex items-center gap-3">
              <span className="flex h-12 w-12 items-center justify-center rounded-2xl bg-cream-200 text-2xl">{service.icon}</span>
              <div>
                <p className="font-semibold">{service.title}</p>
                <p className="text-sm text-ink/60">{service.time}</p>
              </div>
            </div>
            <dl className="space-y-3 text-sm">
              <div className="flex justify-between">
                <dt className="text-ink/60">Starting price</dt>
                <dd className="font-medium">{priceLabel(service)}</dd>
              </div>
              <div className="flex justify-between">
                <dt className="text-ink/60">Payment</dt>
                <dd className="font-medium">{method ? method.title : "Not selected"}</dd>
              </div>
            </dl>
            <div className="mt-5 flex items-center justify-between border-t border-blush-100 pt-5">
              <span className="font-medium">Total</span>
              <span className="font-heading text-2xl font-semibold text-terracotta-600">{priceLabel(service)}</span>
            </div>
          </motion.div>
        ) : (
          <motion.p
            key="empty"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="text-sm text-ink/60"
          >
            Pick a service to see your summary here.
          </motion.p>
        )}
      </AnimatePresence>
    </aside>
  );
}

/* ----------------------------- Success ----------------------------- */

function Success({ order, service, onReset }) {
  const [copied, setCopied] = useState(false);

  const orderId = `#WD-${order.id}`;
  const amount = formatAmount(order.amount);

  const message =
    `Hello! I've placed order ${orderId} (${service?.title}) and I'm sending the payment of ${amount} now. ` +
    `Name: ${order.customerName}.`;
  const waLink = `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(message)}`;

  const copyNumber = async () => {
    try {
      await navigator.clipboard.writeText(PAYMENT_NUMBER);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch {
      /* clipboard unavailable, the number is still shown on screen */
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.6, ease }}
      className="card mx-auto max-w-xl py-12 text-center"
    >
      <motion.div
        initial={{ scale: 0, rotate: -45 }}
        animate={{ scale: 1, rotate: 0 }}
        transition={{ type: "spring", stiffness: 200, delay: 0.2 }}
        className="mx-auto mb-6 flex h-20 w-20 items-center justify-center rounded-full bg-sage-200 text-4xl"
      >
        🌸
      </motion.div>

      <h2 className="font-heading text-3xl font-semibold">Order placed! One last step</h2>

      <div className="mt-4 flex flex-wrap items-center justify-center gap-2 text-sm">
        <span className="font-semibold text-terracotta-600">{orderId}</span>
        <span className="rounded-full bg-cream-200 px-3 py-1 font-medium text-ink/70">Payment pending</span>
      </div>

      {/* Payment instructions */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.35, ease }}
        className="mx-6 mt-8 rounded-3xl bg-blush-50 p-6 sm:mx-10"
      >
        <p className="leading-relaxed text-ink/80">
          Please send the payment of <span className="font-semibold text-ink">{amount}</span> to our JazzCash/Easypaisa
          number:
        </p>

        <p className="mt-3 font-heading text-3xl font-semibold tracking-wide text-terracotta-600">{PAYMENT_NUMBER}</p>

        <motion.button
          type="button"
          onClick={copyNumber}
          whileTap={{ scale: 0.95 }}
          className="mt-3 rounded-full border border-blush-300 bg-cream-50 px-4 py-1.5 text-sm font-medium text-ink/70 transition hover:bg-blush-100"
        >
          {copied ? "✓ Copied" : "Copy number"}
        </motion.button>

        <p className="mt-5 text-sm leading-relaxed text-ink/60">
          After paying, send us a screenshot of the receipt on WhatsApp so we can confirm your order and get started.
        </p>
      </motion.div>

      {/* Actions */}
      <div className="mt-8 flex flex-col items-center justify-center gap-4 px-6 sm:flex-row">
        <motion.a
          href={waLink}
          target="_blank"
          rel="noopener noreferrer"
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.97 }}
          className="inline-flex items-center justify-center gap-2 rounded-full bg-sage-500 px-6 py-3 font-medium text-cream-50 shadow-soft transition hover:bg-sage-600 focus:outline-none focus:ring-2 focus:ring-sage-300"
        >
          <span aria-hidden="true">💬</span>
          Send receipt on WhatsApp
        </motion.a>
        <button type="button" onClick={onReset} className="btn-secondary">
          Place another order
        </button>
      </div>
    </motion.div>
  );
}

/* ----------------------------- Main ----------------------------- */

export default function OrderForm() {
  const [step, setStep] = useState(0);
  const [direction, setDirection] = useState(1);
  const [data, setData] = useState(initialData);
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState("");
  const [order, setOrder] = useState(null); // order returned by the API

  const update = (key, value) => {
    setError("");
    setData((d) => ({ ...d, [key]: value }));
  };

  const service = services.find((s) => s.id === data.service);
  const isLast = step === stepLabels.length - 1;

  const canNext = Boolean(
    [
      data.service,
      data.name.trim().length >= 2 &&
        /\S+@\S+\.\S+/.test(data.email) &&
        data.phone.trim().length >= 7 &&
        data.description.trim().length >= 10,
      data.payment,
    ][step]
  );

  const goBack = () => {
    setError("");
    setDirection(-1);
    setStep((s) => Math.max(0, s - 1));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!canNext || submitting) return;

    if (!isLast) {
      setDirection(1);
      setStep((s) => s + 1);
      return;
    }

    setSubmitting(true);
    setError("");

    try {
      const res = await fetch(API_URL, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          customerName: data.name.trim(),
          email: data.email.trim(),
          phone: data.phone.trim(),
          service: data.service,
          amount: service.price,
        }),
      });

      const body = await res.json().catch(() => ({}));

      if (!res.ok) {
        throw new Error(body.error || "Something went wrong. Please try again.");
      }

      setOrder(body.order); // success screen only appears after the API confirms
    } catch (err) {
      setError(err.message);
    } finally {
      setSubmitting(false);
    }
  };

  const reset = () => {
    setData(initialData);
    setStep(0);
    setDirection(1);
    setError("");
    setOrder(null);
  };

  const steps = [
    <ServiceStep data={data} update={update} />,
    <DetailsStep data={data} update={update} />,
    <PaymentStep data={data} update={update} />,
  ];

  return (
    <section
      id="order"
      className="relative overflow-hidden bg-gradient-to-b from-cream-100 via-blush-50 to-cream-100 px-6 pb-24 pt-28"
    >
      <div aria-hidden="true" className="pointer-events-none absolute -left-24 top-40 h-72 w-72 rounded-full bg-blush-200/50 blur-2xl" />
      <div aria-hidden="true" className="pointer-events-none absolute -right-24 bottom-20 h-80 w-80 rounded-full bg-sage-200/50 blur-2xl" />

      <div className="relative mx-auto max-w-6xl">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, ease }}
          className="mx-auto mb-12 max-w-2xl text-center"
        >
          <p className="mb-3 text-sm font-semibold uppercase tracking-widest text-terracotta-500">Place your order</p>
          <h1 className="font-heading text-4xl font-semibold sm:text-5xl">Let's build something lovely</h1>
          <p className="mt-4 text-ink/70">Three quick steps and your project is on its way.</p>
        </motion.div>

        {order ? (
          <Success order={order} service={service} onReset={reset} />
        ) : (
          <div className="grid gap-8 lg:grid-cols-3">
            <motion.form
              onSubmit={handleSubmit}
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.15, ease }}
              className="card overflow-hidden p-6 sm:p-10 lg:col-span-2"
            >
              <Stepper step={step} />

              <AnimatePresence mode="wait" custom={direction}>
                <motion.div key={step} custom={direction} variants={slide} initial="enter" animate="center" exit="exit">
                  {steps[step]}
                </motion.div>
              </AnimatePresence>

              <AnimatePresence>
                {error && (
                  <motion.div
                    role="alert"
                    initial={{ opacity: 0, height: 0 }}
                    animate={{ opacity: 1, height: "auto" }}
                    exit={{ opacity: 0, height: 0 }}
                    transition={{ duration: 0.3, ease }}
                    className="overflow-hidden"
                  >
                    <p className="mt-6 rounded-2xl bg-terracotta-300/30 px-4 py-3 text-sm font-medium text-terracotta-700">
                      {error}
                    </p>
                  </motion.div>
                )}
              </AnimatePresence>

              <div className="mt-10 flex items-center justify-between">
                {step > 0 ? (
                  <button
                    type="button"
                    onClick={goBack}
                    disabled={submitting}
                    className="btn-secondary disabled:cursor-not-allowed disabled:opacity-50"
                  >
                    ← Back
                  </button>
                ) : (
                  <span />
                )}
                <motion.button
                  type="submit"
                  disabled={!canNext || submitting}
                  whileHover={canNext && !submitting ? { scale: 1.04 } : {}}
                  whileTap={canNext && !submitting ? { scale: 0.97 } : {}}
                  className="btn-primary disabled:cursor-not-allowed disabled:opacity-50"
                >
                  {submitting ? (
                    <>
                      <Spinner />
                      Placing order...
                    </>
                  ) : isLast ? (
                    "Place Order"
                  ) : (
                    "Continue →"
                  )}
                </motion.button>
              </div>
            </motion.form>

            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.3, ease }}
            >
              <Summary service={service} payment={data.payment} />
            </motion.div>
          </div>
        )}
      </div>
    </section>
  );
}