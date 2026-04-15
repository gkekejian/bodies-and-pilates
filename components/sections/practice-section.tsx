"use client";

import { motion, type Variants } from "framer-motion";
import Image from "next/image";
import { IMAGES } from "@/lib/images";

const fadeUp: Variants = {
  hidden: { opacity: 0, y: 30 },
  show: { opacity: 1, y: 0, transition: { duration: 0.9, ease: "easeOut" } },
};

const container: Variants = {
  hidden: {},
  show: { transition: { staggerChildren: 0.15 } },
};

const benefits = [
  { n: "01", title: "Core Strength" },
  { n: "02", title: "Better Posture" },
  { n: "03", title: "Reduced Stress" },
  { n: "04", title: "Coordination & Balance" },
];

export function PracticeSection() {
  return (
    <section className="relative bg-cream-100 py-28 sm:py-40 overflow-hidden">
      <div className="max-w-7xl mx-auto px-6 sm:px-8 lg:px-12">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-20 items-center">
          {/* Image — 5/12 left column */}
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 1.1, ease: "easeOut" }}
            className="lg:col-span-5 relative"
          >
            <div className="relative aspect-[4/5] overflow-hidden">
              <Image
                src={IMAGES.aboutStudio}
                alt="A Pilates reformer in the Bodies and Pilates studio"
                fill
                sizes="(max-width: 1024px) 100vw, 40vw"
                className="object-cover object-center"
              />
            </div>
          </motion.div>

          {/* Text — 7/12 right column */}
          <motion.div
            variants={container}
            initial="hidden"
            whileInView="show"
            viewport={{ once: true, margin: "-100px" }}
            className="lg:col-span-7"
          >
            <motion.p
              variants={fadeUp}
              className="text-sage-500 font-sans text-xs tracking-[0.25em] uppercase mb-8"
            >
              02 &mdash; The Practice
            </motion.p>

            <motion.h2
              variants={fadeUp}
              className="font-serif text-4xl sm:text-5xl lg:text-6xl leading-[1.1] text-charcoal-900 mb-10"
            >
              Low-impact,
              <br />
              high-intention.
            </motion.h2>

            <motion.div
              variants={fadeUp}
              aria-hidden="true"
              className="w-12 h-px bg-sage-500 mb-10"
            />

            <motion.p
              variants={fadeUp}
              className="font-sans text-lg leading-[1.7] text-charcoal-800/85 max-w-xl mb-6"
            >
              Pilates is a versatile exercise system that strengthens muscles,
              improves flexibility, and enhances overall body alignment.
            </motion.p>

            <motion.p
              variants={fadeUp}
              className="font-sans text-lg leading-[1.7] text-charcoal-800/85 max-w-xl mb-14"
            >
              We combine the best of low-impact movements with high-intensity
              focus to isolate and fatigue each muscle group for maximum
              effectiveness.
            </motion.p>

            {/* Benefits grid */}
            <motion.div
              variants={fadeUp}
              className="grid grid-cols-1 sm:grid-cols-2 gap-y-10 gap-x-8 max-w-xl"
            >
              {benefits.map((b) => (
                <div
                  key={b.n}
                  className="flex items-baseline gap-5 border-t border-sage-500/30 pt-5"
                >
                  <span className="font-serif text-3xl text-sage-500 leading-none">
                    {b.n}
                  </span>
                  <span className="font-sans text-base text-charcoal-900 tracking-wide">
                    {b.title}
                  </span>
                </div>
              ))}
            </motion.div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
