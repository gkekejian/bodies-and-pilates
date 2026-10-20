"use client";

import { useState } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import type { Testimonial } from "@/lib/testimonials";
import { cn } from "@/lib/utils";

const arrow =
  "inline-flex h-11 w-11 items-center justify-center border border-brown-700/40 text-brown-700 transition-colors hover:bg-brown-700 hover:text-cream-50 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brown-700 focus-visible:ring-offset-2";

/** One review at a time. Without JavaScript the first review shows. */
export function ReviewCarousel({ items }: { items: Testimonial[] }) {
  const [active, setActive] = useState(0);
  const go = (step: number) => setActive((i) => (i + step + items.length) % items.length);

  return (
    <div>
      <ul aria-live="polite" className="grid">
        {items.map((t, i) => (
          <li
            key={t.id}
            hidden={i !== active}
            aria-label={`Review ${i + 1} of ${items.length}`}
            className="[grid-area:1/1]"
          >
            <figure>
              <blockquote className="font-accent text-xl italic leading-[1.7] text-charcoal-800 sm:text-2xl sm:leading-[1.65]">
                &ldquo;{t.quote}&rdquo;
              </blockquote>
              <figcaption className="smallcaps mt-8 text-[15px] text-brown-700">{t.attribution}</figcaption>
            </figure>
          </li>
        ))}
      </ul>
      {items.length > 1 && (
        <div className="mt-10 flex items-center justify-center gap-5">
          <button type="button" onClick={() => go(-1)} className={arrow} aria-label="Previous review">
            <ChevronLeft aria-hidden="true" className="size-5" />
          </button>
          <div className="flex items-center gap-1" aria-hidden="true">
            {items.map((t, i) => (
              <span key={t.id} className={cn("h-1.5 w-1.5 rounded-full", i === active ? "bg-brown-700" : "bg-brown-700/30")} />
            ))}
          </div>
          <button type="button" onClick={() => go(1)} className={arrow} aria-label="Next review">
            <ChevronRight aria-hidden="true" className="size-5" />
          </button>
        </div>
      )}
    </div>
  );
}
