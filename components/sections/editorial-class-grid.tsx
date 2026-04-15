"use client";

import { motion, type Variants } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import { IMAGES } from "@/lib/images";

const fadeUp: Variants = {
  hidden: { opacity: 0, y: 30 },
  show: { opacity: 1, y: 0, transition: { duration: 0.9, ease: "easeOut" } },
};

type Klass = {
  n: string;
  title: string;
  tagline: string;
  slug: string;
  image: string;
};

const CLASSES: Klass[] = [
  {
    n: "01",
    title: "Beginner",
    tagline: "Foundations, alignment, breath.",
    slug: "beginner",
    image: IMAGES.classBeginner,
  },
  {
    n: "02",
    title: "Full Body",
    tagline: "Reformer + mat, every muscle.",
    slug: "fullbody",
    image: IMAGES.classFullbody,
  },
  {
    n: "03",
    title: "Flexibility",
    tagline: "Lengthen, restore, release.",
    slug: "flexibility",
    image: IMAGES.classFlexibility,
  },
  {
    n: "04",
    title: "Private",
    tagline: "One-on-one, fully bespoke.",
    slug: "private",
    image: IMAGES.classPrivate,
  },
];

export function EditorialClassGrid() {
  return (
    <section className="relative bg-cream-50 py-28 sm:py-40">
      <div className="max-w-7xl mx-auto px-6 sm:px-8 lg:px-12">
        {/* Header */}
        <motion.div
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, margin: "-100px" }}
          variants={{ show: { transition: { staggerChildren: 0.15 } } }}
          className="flex flex-col lg:flex-row lg:items-end lg:justify-between gap-10 mb-20"
        >
          <div>
            <motion.p
              variants={fadeUp}
              className="text-sage-500 font-sans text-xs tracking-[0.25em] uppercase mb-8"
            >
              03 &mdash; Our Classes
            </motion.p>
            <motion.h2
              variants={fadeUp}
              className="font-serif text-4xl sm:text-5xl lg:text-6xl leading-[1.1] text-charcoal-900"
            >
              Find your practice.
            </motion.h2>
          </div>
          <motion.div variants={fadeUp}>
            <Link
              href="/classes"
              className="font-sans text-xs tracking-[0.25em] uppercase text-sage-700 border-b border-sage-700 pb-1 hover:text-sage-500 hover:border-sage-500 transition-colors"
            >
              View All Classes &rarr;
            </Link>
          </motion.div>
        </motion.div>

        {/* Staggered asymmetric grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-12 gap-x-6 gap-y-12 lg:gap-y-24">
          {CLASSES.map((c, i) => {
            // Asymmetric placement: alternate columns + vertical offsets
            const colSpan =
              i === 0
                ? "lg:col-span-5 lg:col-start-1"
                : i === 1
                ? "lg:col-span-6 lg:col-start-7 lg:mt-24"
                : i === 2
                ? "lg:col-span-6 lg:col-start-1"
                : "lg:col-span-5 lg:col-start-8 lg:-mt-24";
            return (
              <motion.div
                key={c.slug}
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-80px" }}
                transition={{
                  duration: 1,
                  ease: "easeOut",
                  delay: (i % 2) * 0.1,
                }}
                className={colSpan}
              >
                <ClassCardEditorial klass={c} />
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}

function ClassCardEditorial({ klass }: { klass: Klass }) {
  return (
    <Link
      href={`/classes/${klass.slug}`}
      className="group block"
      aria-label={`Explore ${klass.title} class`}
    >
      <div className="relative overflow-hidden aspect-[4/5] bg-cream-200 mb-6">
        <Image
          src={klass.image}
          alt={`${klass.title} Pilates class at Bodies and Pilates`}
          fill
          sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 40vw"
          className="object-cover object-center transition-transform duration-[1200ms] ease-out group-hover:scale-105"
        />
        {/* Base tint for legibility + hover darken */}
        <div className="absolute inset-0 bg-charcoal-900/0 group-hover:bg-charcoal-900/30 transition-colors duration-500" />

        {/* Number badge top-left */}
        <div className="absolute top-6 left-6 text-cream-50 font-sans text-xs tracking-[0.3em]">
          {klass.n}
        </div>

        {/* Hover reveal: Explore cta bottom-right */}
        <div className="absolute bottom-6 right-6 opacity-0 group-hover:opacity-100 transition-opacity duration-500 text-cream-50 font-sans text-xs tracking-[0.3em] uppercase">
          Explore &rarr;
        </div>
      </div>

      {/* Caption below image */}
      <div className="flex items-baseline justify-between gap-4">
        <div>
          <h3 className="font-serif text-2xl sm:text-3xl text-charcoal-900 leading-tight">
            {klass.title}
          </h3>
          <p className="font-sans text-sm text-charcoal-800/70 mt-1.5">
            {klass.tagline}
          </p>
        </div>
      </div>
    </Link>
  );
}
