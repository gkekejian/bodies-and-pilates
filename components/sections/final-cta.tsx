"use client";

import { motion, type Variants } from "framer-motion";
import Link from "next/link";

const fadeUp: Variants = {
  hidden: { opacity: 0, y: 30 },
  show: { opacity: 1, y: 0, transition: { duration: 0.9, ease: "easeOut" } },
};

const container: Variants = {
  hidden: {},
  show: { transition: { staggerChildren: 0.15 } },
};

export function FinalCta() {
  return (
    <section className="bg-cream-50 py-32 sm:py-40">
      <div className="max-w-5xl mx-auto px-6 sm:px-8 lg:px-12">
        {/* Top hairline */}
        <div aria-hidden="true" className="w-full h-px bg-sage-500/40 mb-20" />

        <motion.div
          variants={container}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, margin: "-100px" }}
          className="text-center"
        >
          <motion.p
            variants={fadeUp}
            className="text-sage-500 font-sans text-xs tracking-[0.3em] uppercase mb-10"
          >
            06 &mdash; Begin
          </motion.p>

          <motion.h2
            variants={fadeUp}
            className="font-serif text-5xl sm:text-6xl lg:text-7xl leading-[1.05] text-charcoal-900 mb-10 max-w-3xl mx-auto"
          >
            Your first class is $25.
          </motion.h2>

          <motion.p
            variants={fadeUp}
            className="font-sans text-lg sm:text-xl text-charcoal-800/80 leading-[1.6] max-w-xl mx-auto mb-14"
          >
            Book a session and experience the studio.
          </motion.p>

          <motion.div variants={fadeUp}>
            <Link
              href="/pricing"
              className="inline-block bg-sage-700 text-cream-50 font-sans text-xs tracking-[0.25em] uppercase px-10 py-5 rounded-full hover:bg-sage-500 transition-colors duration-300"
            >
              Claim Your First Class
            </Link>
          </motion.div>
        </motion.div>

        {/* Bottom hairline */}
        <div aria-hidden="true" className="w-full h-px bg-sage-500/40 mt-20" />
      </div>
    </section>
  );
}
