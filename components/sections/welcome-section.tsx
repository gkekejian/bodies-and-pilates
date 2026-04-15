"use client";

import { motion, type Variants } from "framer-motion";

const fadeUp: Variants = {
  hidden: { opacity: 0, y: 30 },
  show: { opacity: 1, y: 0, transition: { duration: 0.9, ease: "easeOut" } },
};

const container: Variants = {
  hidden: {},
  show: { transition: { staggerChildren: 0.15 } },
};

export function WelcomeSection() {
  return (
    <section className="relative bg-cream-50 py-28 sm:py-40 overflow-hidden">
      {/* Decorative oversized numeral */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute -top-6 right-6 sm:right-12 lg:right-20 select-none"
      >
        <span className="font-serif text-[10rem] sm:text-[14rem] lg:text-[18rem] leading-none text-sage-500/15">
          01
        </span>
      </div>

      <motion.div
        variants={container}
        initial="hidden"
        whileInView="show"
        viewport={{ once: true, margin: "-100px" }}
        className="relative max-w-6xl mx-auto px-6 sm:px-8 lg:px-12"
      >
        <motion.p
          variants={fadeUp}
          className="text-sage-500 font-sans text-xs tracking-[0.25em] uppercase mb-10"
        >
          01 &mdash; Welcome
        </motion.p>

        <motion.div variants={fadeUp} className="max-w-4xl">
          <h2 className="font-serif text-4xl sm:text-5xl lg:text-6xl leading-[1.1] text-charcoal-900 mb-12">
            A sanctuary for intentional movement.
          </h2>
        </motion.div>

        <motion.div
          variants={fadeUp}
          aria-hidden="true"
          className="w-12 h-px bg-sage-500 mb-12"
        />

        <motion.p
          variants={fadeUp}
          className="font-sans text-lg leading-[1.7] text-charcoal-800/85 max-w-2xl"
        >
          Welcome to our curated studio, where we offer boutique Pilates
          classes in a warm and inviting setting. Join us on the journey to
          sculpt, balance, and grow together.
        </motion.p>
      </motion.div>
    </section>
  );
}
