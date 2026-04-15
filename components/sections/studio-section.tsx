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

export function StudioSection() {
  return (
    <section className="relative bg-cream-200 py-28 sm:py-40 overflow-hidden">
      <div className="max-w-7xl mx-auto px-6 sm:px-8 lg:px-12">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center">
          {/* Image — 7/12 left (≈60%) */}
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 1.1, ease: "easeOut" }}
            className="lg:col-span-7 order-1"
          >
            <div className="relative aspect-[4/5] lg:aspect-[5/6] overflow-hidden">
              <Image
                src={IMAGES.studio}
                alt="Interior of the Bodies and Pilates boutique studio"
                fill
                sizes="(max-width: 1024px) 100vw, 60vw"
                className="object-cover object-center"
              />
            </div>
          </motion.div>

          {/* Text — 5/12 right */}
          <motion.div
            variants={container}
            initial="hidden"
            whileInView="show"
            viewport={{ once: true, margin: "-100px" }}
            className="lg:col-span-5 order-2 lg:pl-6"
          >
            <motion.p
              variants={fadeUp}
              className="text-sage-500 font-sans text-xs tracking-[0.25em] uppercase mb-8"
            >
              04 &mdash; The Space
            </motion.p>

            <motion.h2
              variants={fadeUp}
              className="font-serif text-4xl sm:text-5xl lg:text-6xl leading-[1.1] text-charcoal-900 mb-10"
            >
              Luxury meets
              <br />
              cutting-edge fitness.
            </motion.h2>

            <motion.div
              variants={fadeUp}
              aria-hidden="true"
              className="w-12 h-px bg-sage-500 mb-10"
            />

            <motion.p
              variants={fadeUp}
              className="font-sans text-lg leading-[1.7] text-charcoal-800/85"
            >
              At Bodies and Pilates, we pride ourselves in providing a
              luxurious, tranquil environment combined with cutting-edge
              fitness. Our boutique studio is equipped with state-of-the-art
              equipment, while our small class sizes allow for personalized
              attention and guidance throughout your workout.
            </motion.p>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
