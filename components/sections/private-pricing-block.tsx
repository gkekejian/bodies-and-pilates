"use client";

import { motion } from "framer-motion";

const fadeUp = {
  hidden: { opacity: 0, y: 24 },
  visible: (i: number = 0) => ({
    opacity: 1,
    y: 0,
    transition: { delay: i * 0.12, duration: 0.5, ease: "easeOut" as const },
  }),
};

const pricingTiers = [
  {
    label: "Private Session",
    duration: "55 minutes",
    price: "$100",
    perLabel: "per session",
    description:
      "One-on-one with your instructor. Every exercise curated entirely around your body and goals.",
    href: "https://clients.mindbodyonline.com/classic/ws?studioid=5739427&stype=43&prodid=100011",
    ctaLabel: "Book Private — $100",
    highlight: true,
  },
  {
    label: "Duet Session",
    duration: "55 minutes",
    price: "$140",
    perLabel: "per session (2 people)",
    description:
      "Bring a friend or partner and share the cost. Semi-private instruction with personalized cues for both participants.",
    href: "https://clients.mindbodyonline.com/classic/ws?studioid=5739427&stype=43&prodid=100016",
    ctaLabel: "Book Duet — $140",
    highlight: false,
  },
];

export function PrivatePricingBlock() {
  return (
    <div>
      <motion.h2
        variants={fadeUp}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true }}
        custom={0}
        className="font-serif text-3xl text-charcoal-800 mb-3"
      >
        Session Pricing
      </motion.h2>
      <motion.p
        variants={fadeUp}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true }}
        custom={1}
        className="font-sans text-sage-500 mb-10 max-w-xl"
      >
        No packages required — book a single session whenever you need it. Multi-session
        packages are also available on the{" "}
        <a href="/pricing" className="underline underline-offset-2 hover:text-sage-700 transition-colors">
          pricing page
        </a>
        .
      </motion.p>

      <div className="grid sm:grid-cols-2 gap-6">
        {pricingTiers.map((tier, i) => (
          <motion.div
            key={tier.label}
            variants={fadeUp}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            custom={i + 1}
            className={[
              "flex flex-col rounded-2xl p-8 shadow-sm",
              tier.highlight
                ? "bg-sage-700 text-cream-50"
                : "bg-cream-100 text-charcoal-800 border border-taupe-300/60",
            ].join(" ")}
          >
            <p
              className={[
                "font-sans text-xs font-semibold uppercase tracking-widest mb-1",
                tier.highlight ? "text-cream-100/70" : "text-sage-500",
              ].join(" ")}
            >
              {tier.duration}
            </p>
            <h3 className="font-serif text-2xl mb-1">{tier.label}</h3>
            <div className="flex items-baseline gap-1 mb-4">
              <span className="font-serif text-4xl font-semibold">{tier.price}</span>
              <span
                className={[
                  "font-sans text-sm",
                  tier.highlight ? "text-cream-100/70" : "text-sage-500",
                ].join(" ")}
              >
                {tier.perLabel}
              </span>
            </div>
            <p
              className={[
                "font-sans text-sm leading-relaxed flex-1 mb-6",
                tier.highlight ? "text-cream-100/80" : "text-charcoal-800/70",
              ].join(" ")}
            >
              {tier.description}
            </p>
            <a
              href={tier.href}
              target="_blank"
              rel="noopener noreferrer"
              className={[
                "inline-flex items-center justify-center rounded-lg font-sans text-sm font-semibold px-6 py-3 transition-colors",
                tier.highlight
                  ? "bg-cream-50 text-sage-700 hover:bg-cream-100"
                  : "bg-sage-500 text-cream-50 hover:bg-sage-700",
              ].join(" ")}
            >
              {tier.ctaLabel}
            </a>
          </motion.div>
        ))}
      </div>
    </div>
  );
}
