"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import Link from "next/link";

// ─── Shared animation variants ───────────────────────────────────────────────
const fadeUp = {
  hidden: { opacity: 0, y: 28 },
  visible: (i: number = 0) => ({
    opacity: 1,
    y: 0,
    transition: { delay: i * 0.1, duration: 0.55, ease: "easeOut" as const },
  }),
};

const fadeIn = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: { duration: 0.6, ease: "easeOut" as const } },
};

// ─── Classes index – hero + cards grid ───────────────────────────────────────
export interface ClassCardData {
  name: string;
  slug: string;
  description: string;
  imageSrc: string;
  imageAlt: string;
}

interface ClassesHeroProps {
  cards: ClassCardData[];
}

export function ClassesHeroSection({ cards }: ClassesHeroProps) {
  return (
    <>
      {/* Hero */}
      <section className="bg-cream-100 py-20 md:py-28">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <motion.h1
            variants={fadeUp}
            initial="hidden"
            animate="visible"
            custom={0}
            className="font-serif text-4xl md:text-5xl lg:text-6xl text-charcoal-800 mb-6"
          >
            Our Classes
          </motion.h1>
          <motion.p
            variants={fadeUp}
            initial="hidden"
            animate="visible"
            custom={1}
            className="font-sans text-lg md:text-xl text-sage-500 max-w-2xl mx-auto leading-relaxed"
          >
            Every session is led with personalized attention in small class sizes, so
            you&apos;ll never feel lost. Whether you&apos;re brand new or deepening an
            existing practice, there&apos;s a class for you.
          </motion.p>
        </div>
      </section>

      {/* Cards grid */}
      <section className="bg-cream-50 py-16 md:py-24">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-4">
            {cards.map((card, i) => (
              <motion.article
                key={card.slug}
                variants={fadeUp}
                initial="hidden"
                animate="visible"
                custom={i + 1}
                className="flex flex-col bg-cream-100 rounded-2xl overflow-hidden shadow-sm hover:shadow-md transition-shadow"
              >
                {/* Image */}
                <div className="relative w-full h-52 overflow-hidden bg-taupe-300/30">
                  <Image
                    src={card.imageSrc}
                    alt={card.imageAlt}
                    fill
                    sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw"
                    className="object-cover object-center transition-transform duration-500 hover:scale-105"
                  />
                </div>

                {/* Body */}
                <div className="flex flex-col flex-1 p-6 gap-4">
                  <h2 className="font-serif text-xl text-charcoal-800">{card.name}</h2>
                  <p className="font-sans text-sm text-sage-500 leading-relaxed flex-1">
                    {card.description}
                  </p>

                  <div className="flex flex-col gap-2 pt-2">
                    <Link
                      href={`/classes/${card.slug}`}
                      className="inline-flex items-center justify-center rounded-lg border border-sage-500 text-sage-700 font-sans text-sm font-medium px-4 py-2 transition-colors hover:bg-sage-500 hover:text-cream-50"
                    >
                      Learn More
                    </Link>
                    <Link
                      href="/pricing"
                      className="inline-flex items-center justify-center rounded-lg bg-sage-500 text-cream-50 font-sans text-sm font-medium px-4 py-2 transition-colors hover:bg-sage-700"
                    >
                      Book Now
                    </Link>
                  </div>
                </div>
              </motion.article>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}

// ─── Shared class detail page layout ─────────────────────────────────────────
interface DetailCTA {
  label: string;
  href: string;
  variant?: "primary" | "outline";
  external?: boolean;
}

interface BenefitItem {
  heading: string;
  body: string;
}

export interface ClassDetailProps {
  /** Page heading */
  title: string;
  /** One-sentence tag line shown below heading */
  tagline: string;
  /** Full description paragraph(s) */
  description: string;
  /** Hero image path */
  imageSrc: string;
  imageAlt: string;
  /** "What to expect" bullet list */
  whatToExpect: string[];
  /** Benefit cards */
  benefits: BenefitItem[];
  /** Primary CTA buttons */
  ctas: DetailCTA[];
  /** Optional pricing callout (used on private page) */
  pricingBlock?: React.ReactNode;
}

export function ClassDetailClient({
  title,
  tagline,
  description,
  imageSrc,
  imageAlt,
  whatToExpect,
  benefits,
  ctas,
  pricingBlock,
}: ClassDetailProps) {
  return (
    <>
      {/* ── Hero ─────────────────────────────────────────────────── */}
      <section className="bg-cream-100 py-20 md:py-28">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            {/* Text */}
            <div>
              <motion.h1
                variants={fadeUp}
                initial="hidden"
                animate="visible"
                custom={0}
                className="font-serif text-4xl md:text-5xl text-charcoal-800 mb-4"
              >
                {title}
              </motion.h1>
              <motion.p
                variants={fadeUp}
                initial="hidden"
                animate="visible"
                custom={1}
                className="font-sans text-lg text-sage-500 mb-6 leading-relaxed"
              >
                {tagline}
              </motion.p>
              <motion.p
                variants={fadeUp}
                initial="hidden"
                animate="visible"
                custom={2}
                className="font-sans text-base text-charcoal-800/80 leading-loose"
              >
                {description}
              </motion.p>

              {/* CTAs */}
              <motion.div
                variants={fadeUp}
                initial="hidden"
                animate="visible"
                custom={3}
                className="flex flex-wrap gap-3 mt-8"
              >
                {ctas.map((cta) =>
                  cta.external ? (
                    <a
                      key={cta.label}
                      href={cta.href}
                      target="_blank"
                      rel="noopener noreferrer"
                      className={
                        cta.variant === "outline"
                          ? "inline-flex items-center justify-center rounded-lg border border-sage-500 text-sage-700 font-sans text-sm font-medium px-6 py-3 transition-colors hover:bg-sage-500 hover:text-cream-50"
                          : "inline-flex items-center justify-center rounded-lg bg-sage-500 text-cream-50 font-sans text-sm font-semibold px-6 py-3 transition-colors hover:bg-sage-700"
                      }
                    >
                      {cta.label}
                    </a>
                  ) : (
                    <Link
                      key={cta.label}
                      href={cta.href}
                      className={
                        cta.variant === "outline"
                          ? "inline-flex items-center justify-center rounded-lg border border-sage-500 text-sage-700 font-sans text-sm font-medium px-6 py-3 transition-colors hover:bg-sage-500 hover:text-cream-50"
                          : "inline-flex items-center justify-center rounded-lg bg-sage-500 text-cream-50 font-sans text-sm font-semibold px-6 py-3 transition-colors hover:bg-sage-700"
                      }
                    >
                      {cta.label}
                    </Link>
                  )
                )}
              </motion.div>
            </div>

            {/* Image */}
            <motion.div
              variants={fadeIn}
              initial="hidden"
              animate="visible"
              className="relative rounded-2xl overflow-hidden shadow-md"
            >
              <Image
                src={imageSrc}
                alt={imageAlt}
                width={600}
                height={480}
                priority
                className="w-full object-cover"
              />
            </motion.div>
          </div>
        </div>
      </section>

      {/* ── What to Expect ───────────────────────────────────────── */}
      <section className="bg-cream-50 py-16 md:py-20">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.h2
            variants={fadeUp}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            custom={0}
            className="font-serif text-3xl text-charcoal-800 mb-8"
          >
            What to Expect
          </motion.h2>
          <ul className="grid sm:grid-cols-2 gap-4">
            {whatToExpect.map((item, i) => (
              <motion.li
                key={i}
                variants={fadeUp}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true }}
                custom={i * 0.5}
                className="flex items-start gap-3 bg-cream-100 rounded-xl p-4"
              >
                <span
                  className="mt-0.5 flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-sage-500 text-cream-50 text-xs font-bold"
                  aria-hidden="true"
                >
                  ✓
                </span>
                <span className="font-sans text-sm text-charcoal-800/80 leading-relaxed">
                  {item}
                </span>
              </motion.li>
            ))}
          </ul>
        </div>
      </section>

      {/* ── Benefits ─────────────────────────────────────────────── */}
      <section className="bg-cream-200 py-16 md:py-20">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.h2
            variants={fadeUp}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            custom={0}
            className="font-serif text-3xl text-charcoal-800 mb-10 text-center"
          >
            Benefits
          </motion.h2>
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {benefits.map((benefit, i) => (
              <motion.div
                key={benefit.heading}
                variants={fadeUp}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true }}
                custom={i * 0.4}
                className="bg-cream-50 rounded-2xl p-6 shadow-sm"
              >
                <h3 className="font-serif text-lg text-charcoal-800 mb-2">
                  {benefit.heading}
                </h3>
                <p className="font-sans text-sm text-sage-500 leading-relaxed">
                  {benefit.body}
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Optional pricing block ────────────────────────────────── */}
      {pricingBlock && (
        <section className="bg-cream-50 py-16 md:py-20">
          <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">{pricingBlock}</div>
        </section>
      )}

      {/* ── Bottom CTA banner ─────────────────────────────────────── */}
      <section className="bg-sage-700 py-14 md:py-20">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <motion.h2
            variants={fadeUp}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            custom={0}
            className="font-serif text-3xl text-cream-50 mb-4"
          >
            Ready to get started?
          </motion.h2>
          <motion.p
            variants={fadeUp}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            custom={1}
            className="font-sans text-cream-100/80 mb-8 max-w-xl mx-auto"
          >
            Your first class is just $25. No experience needed — just show up ready
            to move.
          </motion.p>
          <motion.div
            variants={fadeUp}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            custom={2}
            className="flex flex-wrap justify-center gap-4"
          >
            {ctas.map((cta) =>
              cta.external ? (
                <a
                  key={cta.label + "-bottom"}
                  href={cta.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className={
                    cta.variant === "outline"
                      ? "inline-flex items-center justify-center rounded-lg border border-cream-50 text-cream-50 font-sans text-sm font-medium px-6 py-3 transition-colors hover:bg-cream-50/10"
                      : "inline-flex items-center justify-center rounded-lg bg-cream-50 text-sage-700 font-sans text-sm font-semibold px-6 py-3 transition-colors hover:bg-cream-100"
                  }
                >
                  {cta.label}
                </a>
              ) : (
                <Link
                  key={cta.label + "-bottom"}
                  href={cta.href}
                  className={
                    cta.variant === "outline"
                      ? "inline-flex items-center justify-center rounded-lg border border-cream-50 text-cream-50 font-sans text-sm font-medium px-6 py-3 transition-colors hover:bg-cream-50/10"
                      : "inline-flex items-center justify-center rounded-lg bg-cream-50 text-sage-700 font-sans text-sm font-semibold px-6 py-3 transition-colors hover:bg-cream-100"
                  }
                >
                  {cta.label}
                </Link>
              )
            )}
          </motion.div>
        </div>
      </section>
    </>
  );
}
