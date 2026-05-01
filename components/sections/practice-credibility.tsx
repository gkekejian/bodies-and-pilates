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

export function PracticeCredibility() {
  return (
    <section className="bg-cream-50 py-28 sm:py-36">
      <div className="max-w-5xl mx-auto px-6 sm:px-8 lg:px-12">
        <motion.div
          variants={container}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, margin: "-100px" }}
        >
          <motion.p
            variants={fadeUp}
            className="text-sage-500 font-sans text-xs tracking-[0.3em] uppercase mb-10"
          >
            07 &mdash; The Practice
          </motion.p>

          <motion.h2
            variants={fadeUp}
            className="font-serif text-4xl sm:text-5xl lg:text-6xl leading-[1.1] text-charcoal-900 mb-12 max-w-3xl"
          >
            Real Pilates, real training.
          </motion.h2>

          <motion.div
            variants={fadeUp}
            aria-hidden="true"
            className="w-12 h-px bg-sage-500 mb-12"
          />

          <motion.div
            variants={fadeUp}
            className="space-y-6 max-w-2xl font-sans text-base sm:text-lg leading-[1.7] text-charcoal-800/85"
          >
            <p>
              Pilates is a method, not a trend. The work we teach is the work
              Joseph Pilates designed nearly a century ago &mdash; refined,
              demanding, and built to make your body move better for the rest of
              your life.
            </p>
            <p>
              Every instructor at Bodies and Pilates has completed a full
              comprehensive certification &mdash; roughly 600 hours of training
              across mat, reformer, cadillac, chair, and barrels. Not a weekend
              course. Not a quick branded workout dressed up as Pilates. The
              real method, taught by teachers who trained for years to teach it.
            </p>
          </motion.div>

          <motion.p
            variants={fadeUp}
            className="mt-12 font-sans text-xs tracking-[0.22em] uppercase text-sage-700 max-w-2xl"
          >
            Certified through STOTT Pilates (Merrithew), Classical Pilates
            lineages, and BASI Pilates programs.
          </motion.p>
        </motion.div>
      </div>
    </section>
  );
}
