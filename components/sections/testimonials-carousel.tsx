"use client";

import { AnimatePresence, motion } from "framer-motion";
import { useEffect, useState } from "react";

type Testimonial = {
  quote: string;
  author: string;
};

interface Props {
  testimonials: Testimonial[];
}

export function TestimonialsCarousel({ testimonials }: Props) {
  const [index, setIndex] = useState(0);

  useEffect(() => {
    if (testimonials.length <= 1) return;
    const id = setInterval(() => {
      setIndex((i) => (i + 1) % testimonials.length);
    }, 7000);
    return () => clearInterval(id);
  }, [testimonials.length]);

  const current = testimonials[index];

  return (
    <section className="relative bg-sage-700 text-cream-50 py-28 sm:py-40 overflow-hidden">
      <div className="max-w-5xl mx-auto px-6 sm:px-8 lg:px-12 text-center relative">
        {/* Label */}
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.9, ease: "easeOut" }}
          className="text-sage-300 font-sans text-xs tracking-[0.3em] uppercase mb-14"
        >
          05 &mdash; Kind Words
        </motion.p>

        {/* Big decorative quote mark */}
        <div
          aria-hidden="true"
          className="font-serif text-[9rem] sm:text-[12rem] leading-none text-sage-300/40 select-none mb-[-2.5rem] sm:mb-[-3.5rem]"
        >
          &ldquo;
        </div>

        {/* Rotating quote */}
        <div className="min-h-[260px] sm:min-h-[240px] flex items-center justify-center">
          <AnimatePresence mode="wait">
            <motion.figure
              key={index}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.8, ease: "easeOut" }}
              className="max-w-3xl mx-auto"
            >
              <blockquote className="font-serif italic text-2xl sm:text-3xl lg:text-4xl leading-[1.35] text-cream-50">
                {current.quote}
              </blockquote>
              <figcaption className="mt-10 font-sans text-xs tracking-[0.3em] uppercase text-sage-300">
                &mdash; {current.author}
              </figcaption>
            </motion.figure>
          </AnimatePresence>
        </div>

        {/* Pagination dots */}
        <div
          className="flex items-center justify-center gap-3 mt-14"
          role="tablist"
          aria-label="Testimonials pagination"
        >
          {testimonials.map((_, i) => (
            <button
              key={i}
              type="button"
              role="tab"
              aria-selected={i === index}
              aria-label={`Show testimonial ${i + 1}`}
              onClick={() => setIndex(i)}
              className={`h-1.5 rounded-full transition-all duration-500 ${
                i === index
                  ? "w-8 bg-cream-50"
                  : "w-1.5 bg-cream-50/40 hover:bg-cream-50/70"
              }`}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
