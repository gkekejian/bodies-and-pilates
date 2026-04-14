"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import Link from "next/link";

export function HeroSection() {
  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden bg-cream-200">
      {/* Background image */}
      <div className="absolute inset-0">
        <Image
          src="/images/hero.jpg"
          alt="Bodies and Pilates studio"
          fill
          className="object-cover object-center"
          priority
        />
        {/* Gradient overlay */}
        <div className="absolute inset-0 bg-gradient-to-b from-cream-200/70 via-cream-200/50 to-cream-200/80" />
      </div>

      {/* Content */}
      <div className="relative z-10 max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          <p className="text-sage-500 font-sans text-sm tracking-[0.2em] uppercase mb-4">
            Boutique Pilates Studio
          </p>
          <h1 className="font-serif text-5xl sm:text-6xl lg:text-7xl text-charcoal-900 mb-6 leading-tight">
            Empower Your Essence
          </h1>
          <p className="font-sans text-lg sm:text-xl text-charcoal-800 mb-10 max-w-xl mx-auto">
            Boutique Pilates studio in North Hollywood.
          </p>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <Link
              href="/pricing"
              className="inline-block bg-sage-700 text-cream-50 font-sans font-semibold text-sm tracking-widest uppercase px-8 py-4 rounded-sm hover:bg-sage-500 transition-colors duration-200 min-w-[180px] text-center"
            >
              Book a Session
            </Link>
            <Link
              href="/classes"
              className="inline-block border-2 border-sage-700 text-sage-700 font-sans font-semibold text-sm tracking-widest uppercase px-8 py-4 rounded-sm hover:bg-sage-700 hover:text-cream-50 transition-colors duration-200 min-w-[180px] text-center"
            >
              View Classes
            </Link>
          </div>
        </motion.div>
      </div>

      {/* Scroll indicator */}
      <motion.div
        className="absolute bottom-8 left-1/2 -translate-x-1/2 z-10"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.2, duration: 0.6 }}
        aria-hidden="true"
      >
        <div className="w-px h-12 bg-sage-500 mx-auto animate-pulse" />
      </motion.div>
    </section>
  );
}
