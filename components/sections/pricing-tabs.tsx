"use client";

import { useState } from "react";

const STUDIO_ID = "5739427";

function mbUrl(stype: number, prodid: number): string {
  return `https://clients.mindbodyonline.com/classic/ws?studioid=${STUDIO_ID}&stype=${stype}&prodid=${prodid}`;
}

// ── Shared primitives ──────────────────────────────────────────────────────

function BuyButton({
  href,
  label = "Buy Now",
}: {
  href: string;
  label?: string;
}) {
  return (
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      className="block w-full text-center bg-sage-700 hover:bg-sage-500 active:bg-sage-700 text-cream-50 font-sans font-medium text-sm py-3 px-4 rounded-lg transition-colors duration-200"
    >
      {label}
    </a>
  );
}

function Badge({
  label,
  variant,
}: {
  label: string;
  variant: "blush" | "sage";
}) {
  return (
    <span
      className={`inline-block text-xs font-sans font-semibold px-3 py-1 rounded-full ${
        variant === "blush"
          ? "bg-blush-500 text-cream-50"
          : "bg-sage-500 text-cream-50"
      }`}
    >
      {label}
    </span>
  );
}

// ── Tab panels ─────────────────────────────────────────────────────────────

function IntroOffers() {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
      {[
        {
          name: "First Class",
          price: "$25",
          note: null,
          desc: "The perfect introduction to our studio, equipment, and teaching style.",
          prodid: 100010,
          badge: { label: "Best for First-Timers", variant: "blush" as const },
        },
        {
          name: "1 Week Unlimited",
          price: "$105",
          note: null,
          desc: "Seven days of unlimited classes to explore everything we offer.",
          prodid: 100014,
          badge: null,
        },
      ].map((o) => (
        <div
          key={o.prodid}
          className="bg-white border border-taupe-300 rounded-2xl p-7 flex flex-col gap-5 shadow-sm"
        >
          {o.badge && <Badge label={o.badge.label} variant={o.badge.variant} />}
          <div>
            <h3 className="font-serif text-xl text-charcoal-800">{o.name}</h3>
            <p className="font-sans text-4xl font-bold text-sage-700 mt-2 leading-none">
              {o.price}
            </p>
          </div>
          <p className="font-sans text-sm text-charcoal-800/70 flex-1">
            {o.desc}
          </p>
          <BuyButton href={mbUrl(43, o.prodid)} />
        </div>
      ))}
    </div>
  );
}

function ClassPacks() {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
      {[
        {
          name: "Single Class",
          price: "$36",
          per: null,
          desc: "Drop in whenever you like.",
          prodid: 100003,
        },
        {
          name: "5 Class Pack",
          price: "$160",
          per: "$32 / class",
          desc: "Great for building a consistent weekly practice.",
          prodid: 100004,
        },
        {
          name: "10 Class Pack",
          price: "$300",
          per: "$30 / class",
          desc: "Best per-class value in our pack options.",
          prodid: 100005,
        },
      ].map((p) => (
        <div
          key={p.prodid}
          className="bg-white border border-taupe-300 rounded-2xl p-7 flex flex-col gap-5 shadow-sm"
        >
          <div>
            <h3 className="font-serif text-xl text-charcoal-800">{p.name}</h3>
            <p className="font-sans text-4xl font-bold text-sage-700 mt-2 leading-none">
              {p.price}
            </p>
            {p.per && (
              <p className="font-sans text-sm text-sage-500 mt-1">{p.per}</p>
            )}
          </div>
          <p className="font-sans text-sm text-charcoal-800/70 flex-1">
            {p.desc}
          </p>
          <BuyButton href={mbUrl(43, p.prodid)} />
        </div>
      ))}
    </div>
  );
}

function Memberships() {
  const plans = [
    {
      name: "5 / Month",
      price: "$130",
      per: "$26 / class",
      prodid: 100,
      popular: false,
      features: ["5 credits per billing cycle", "Add-on classes at $25", "All group formats", "Auto-renews monthly"],
    },
    {
      name: "8 / Month",
      price: "$170",
      per: "$21.25 / class",
      prodid: 102,
      popular: false,
      features: ["8 credits per billing cycle", "Add-on classes at $25", "All group formats", "Auto-renews monthly"],
    },
    {
      name: "12 / Month",
      price: "$220",
      per: "$18.33 / class",
      prodid: 103,
      popular: false,
      features: ["12 credits per billing cycle", "Add-on classes at $25", "All group formats", "Auto-renews monthly"],
    },
    {
      name: "Unlimited",
      price: "$280",
      per: "Best rate per visit",
      prodid: 101,
      popular: true,
      features: ["Unlimited classes per cycle", "All group formats", "Priority waitlist access", "Auto-renews monthly"],
    },
  ];

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
      {plans.map((m) => (
        <div
          key={m.prodid}
          className={`relative bg-white rounded-2xl p-7 flex flex-col gap-5 shadow-sm border-2 ${
            m.popular ? "border-sage-500" : "border-taupe-300"
          }`}
        >
          {m.popular && (
            <div>
              <Badge label="Most Popular" variant="sage" />
            </div>
          )}
          <div>
            <h3 className="font-serif text-lg text-charcoal-800">{m.name}</h3>
            <p className="font-sans text-4xl font-bold text-sage-700 mt-2 leading-none">
              {m.price}
              <span className="text-base font-normal text-charcoal-800/50">
                /mo
              </span>
            </p>
            <p className="font-sans text-sm text-sage-500 mt-1">{m.per}</p>
          </div>
          <ul className="font-sans text-sm text-charcoal-800/80 space-y-2 flex-1">
            {m.features.map((f) => (
              <li key={f} className="flex items-start gap-2">
                <span className="text-sage-500 shrink-0 mt-0.5">✓</span>
                <span>{f}</span>
              </li>
            ))}
          </ul>
          <BuyButton href={mbUrl(40, m.prodid)} label="Get Membership" />
        </div>
      ))}
    </div>
  );
}

function Specialty() {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
      {[
        {
          name: "55-min Private Session",
          price: "$100",
          desc: "One-on-one session tailored entirely to your goals, technique, and pace.",
          prodid: 100011,
        },
        {
          name: "Duet Session",
          price: "$140",
          desc: "Share a semi-private session with a friend or partner. Personalized attention at a shared cost.",
          prodid: 100016,
        },
      ].map((s) => (
        <div
          key={s.prodid}
          className="bg-white border border-taupe-300 rounded-2xl p-7 flex flex-col gap-5 shadow-sm"
        >
          <div>
            <h3 className="font-serif text-xl text-charcoal-800">{s.name}</h3>
            <p className="font-sans text-4xl font-bold text-sage-700 mt-2 leading-none">
              {s.price}
            </p>
          </div>
          <p className="font-sans text-sm text-charcoal-800/70 flex-1">
            {s.desc}
          </p>
          <BuyButton href={mbUrl(43, s.prodid)} label="Book Session" />
        </div>
      ))}
    </div>
  );
}

// ── Tab bar ────────────────────────────────────────────────────────────────

const TABS = [
  { id: "intro", label: "Intro Offers" },
  { id: "packs", label: "Class Packs" },
  { id: "memberships", label: "Memberships" },
  { id: "specialty", label: "Specialty" },
] as const;

type TabId = (typeof TABS)[number]["id"];

export function PricingTabs() {
  const [active, setActive] = useState<TabId>("intro");

  return (
    <div>
      {/* Tab bar */}
      <div
        role="tablist"
        aria-label="Pricing categories"
        className="flex flex-wrap gap-2 mb-8"
      >
        {TABS.map((t) => (
          <button
            key={t.id}
            role="tab"
            aria-selected={active === t.id}
            onClick={() => setActive(t.id)}
            className={`font-sans text-sm font-medium px-5 py-2.5 rounded-full border transition-colors duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-sage-500 ${
              active === t.id
                ? "bg-sage-700 text-cream-50 border-sage-700"
                : "bg-white text-charcoal-800 border-taupe-300 hover:border-sage-500 hover:text-sage-700"
            }`}
          >
            {t.label}
          </button>
        ))}
      </div>

      {/* Panels */}
      <div role="tabpanel">
        {active === "intro" && <IntroOffers />}
        {active === "packs" && <ClassPacks />}
        {active === "memberships" && <Memberships />}
        {active === "specialty" && <Specialty />}
      </div>
    </div>
  );
}
