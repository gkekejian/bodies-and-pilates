"use client";

import { motion, type Variants } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import { IMAGES } from "@/lib/images";

const container: Variants = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: { staggerChildren: 0.15, delayChildren: 0.1 },
  },
};

const item: Variants = {
  hidden: { opacity: 0, y: 30 },
  show: { opacity: 1, y: 0, transition: { duration: 0.9, ease: "easeOut" } },
};

export function HeroSection() {
  return (
    <section className="relative min-h-screen flex items-center overflow-hidden bg-cream-100">
      {/* Background image */}
      <div className="absolute inset-0">
        <Image
          src={IMAGES.hero}
          alt="Bodies and Pilates studio — Pilates class in action"
          fill
          priority
          sizes="100vw"
          className="object-cover object-center"
        />
        {/* Editorial gradient overlay — creamy left-fade for readability */}
        <div className="absolute inset-0 bg-gradient-to-r from-cream-50/85 via-cream-50/55 to-transparent" />
        <div className="absolute inset-0 bg-gradient-to-t from-cream-50/40 via-transparent to-transparent" />
      </div>

      {/* Content */}
      <div className="relative z-10 w-full max-w-7xl mx-auto px-6 sm:px-8 lg:px-12 py-32 lg:py-0">
        <motion.div
          variants={container}
          initial="hidden"
          animate="show"
          className="max-w-2xl text-center lg:text-left"
        >
          <motion.p
            variants={item}
            className="text-sage-500 font-sans text-xs tracking-[0.3em] uppercase mb-8"
          >
            North Hollywood &middot; Est. 2024
          </motion.p>

          <motion.h1
            variants={item}
            className="font-serif text-6xl sm:text-7xl lg:text-8xl leading-[0.95] text-charcoal-900 mb-8"
          >
            Empower
            <br />
            Your Essence
          </motion.h1>

          <motion.p
            variants={item}
            className="font-sans text-lg sm:text-xl text-charcoal-800/80 leading-[1.6] max-w-lg mx-auto lg:mx-0 mb-12"
          >
            A boutique Pilates studio where movement meets intention.
          </motion.p>

          <motion.div
            variants={item}
            className="flex flex-col sm:flex-row items-center lg:items-start gap-4 justify-center lg:justify-start"
          >
            <Link
              href="/pricing"
              className="inline-block bg-sage-700 text-cream-50 font-sans text-xs tracking-[0.25em] uppercase px-8 py-4 rounded-full hover:bg-sage-500 transition-colors duration-300 min-w-[200px] text-center"
            >
              Book a Session
            </Link>
            <Link
              href="/classes"
              className="inline-block border border-sage-700 text-sage-700 font-sans text-xs tracking-[0.25em] uppercase px-8 py-4 rounded-full hover:bg-sage-700 hover:text-cream-50 transition-colors duration-300 min-w-[200px] text-center"
            >
              Explore Classes
            </Link>
          </motion.div>
        </motion.div>
      </div>

      {/* Scroll indicator */}
      <motion.div
        className="absolute bottom-10 left-1/2 -translate-x-1/2 z-10 flex flex-col items-center gap-3"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.4, duration: 0.8 }}
        aria-hidden="true"
      >
        <span className="text-sage-700 font-sans text-[10px] tracking-[0.3em] uppercase">
          Scroll
        </span>
        <motion.div
          className="w-px h-12 bg-sage-700/60 origin-top"
          animate={{ scaleY: [0.3, 1, 0.3] }}
          transition={{ duration: 2.4, repeat: Infinity, ease: "easeInOut" }}
        />
      </motion.div>
    </section>
  );
}
