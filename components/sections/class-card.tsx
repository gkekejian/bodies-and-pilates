"use client";

import { motion } from "framer-motion";
import Link from "next/link";

interface ClassCardProps {
  title: string;
  description: string;
  slug: string;
  level?: string;
}

export function ClassCard({ title, description, slug, level }: ClassCardProps) {
  return (
    <motion.div
      whileHover={{ y: -4, boxShadow: "0 12px 32px rgba(90,107,74,0.12)" }}
      transition={{ duration: 0.25 }}
      className="bg-cream-50 rounded-sm border border-taupe-300/50 p-8 flex flex-col h-full"
    >
      {level && (
        <span className="text-sage-500 font-sans text-xs tracking-[0.18em] uppercase mb-3 block">
          {level}
        </span>
      )}
      <h3 className="font-serif text-2xl text-charcoal-900 mb-3">{title}</h3>
      <p className="font-sans text-charcoal-800 text-sm leading-relaxed mb-6 flex-1">
        {description}
      </p>
      <Link
        href={`/classes/${slug}`}
        className="font-sans text-sage-700 text-sm font-semibold tracking-wider uppercase border-b border-sage-700 pb-0.5 self-start hover:text-sage-500 hover:border-sage-500 transition-colors duration-200"
      >
        Learn More
      </Link>
    </motion.div>
  );
}
