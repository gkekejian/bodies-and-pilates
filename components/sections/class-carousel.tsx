"use client";

import Link from "next/link";
import { useCallback, useEffect, useRef, useState } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { MediaPhoto } from "@/components/ui/media";
import type { LineupEntry } from "@/lib/classes";
import type { PhotoMedia } from "@/lib/media";
import { cn } from "@/lib/utils";

const arrow =
  "inline-flex h-12 w-12 items-center justify-center bg-theme-dark text-theme-cream transition-colors hover:bg-theme-ink disabled:cursor-default disabled:bg-theme-dark/30 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-theme-dark focus-visible:ring-offset-2";

/**
 * The six classes as one sideways row: scroll-snap cards, the next card
 * peeking in from the edge, arrows that move one card, and a filled bar for
 * how far along the row you are. Swipe, scroll or tab through it; without
 * script it is still a plain scrolling row of links.
 */
export function ClassCarousel({ items, photos }: { items: LineupEntry[]; photos: Record<string, PhotoMedia | null> }) {
  const track = useRef<HTMLUListElement>(null);
  const [state, setState] = useState({ start: true, end: false, progress: 0 });

  const measure = useCallback(() => {
    const el = track.current;
    if (!el) return;
    const max = el.scrollWidth - el.clientWidth;
    setState({
      start: el.scrollLeft <= 4,
      end: el.scrollLeft >= max - 4,
      progress: max > 0 ? el.clientWidth / el.scrollWidth + (el.scrollLeft / max) * (1 - el.clientWidth / el.scrollWidth) : 1,
    });
  }, []);

  useEffect(() => {
    measure();
    window.addEventListener("resize", measure);
    return () => window.removeEventListener("resize", measure);
  }, [measure]);

  const step = (dir: 1 | -1) => {
    const el = track.current;
    const card = el?.querySelector("li");
    if (!el || !card) return;
    el.scrollBy({ left: dir * (card.getBoundingClientRect().width + 16), behavior: "smooth" });
  };

  return (
    <div>
      <ul
        ref={track}
        onScroll={measure}
        className="-mx-5 flex snap-x snap-mandatory gap-4 overflow-x-auto scroll-px-5 px-5 pb-2 [scrollbar-width:none] sm:-mx-8 sm:scroll-px-8 sm:px-8 [&::-webkit-scrollbar]:hidden"
      >
        {items.map((c) => (
          <li key={c.key} className="w-[78%] shrink-0 snap-start sm:w-[44%] lg:w-[calc((100%-2rem)/3.25)]">
            <Link href={c.href} className="group block focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-theme-dark focus-visible:ring-offset-4">
              <div className="overflow-hidden">
                <MediaPhoto
                  media={photos[c.key] ?? null}
                  aspectClassName="aspect-[4/5]"
                  className="transition-transform duration-700 group-hover:scale-[1.03]"
                  sizes="(max-width: 640px) 78vw, (max-width: 1024px) 44vw, 380px"
                />
              </div>
              <h3 className="mt-5 font-serif text-[1.75rem] font-semibold leading-tight tracking-[-0.01em] text-theme-dark group-hover:underline group-hover:decoration-2 group-hover:underline-offset-4">
                {c.name}
              </h3>
              <p className="mt-2 max-w-[34ch] font-sans text-base leading-[1.55] text-theme-dark">{c.description}</p>
            </Link>
          </li>
        ))}
      </ul>
      <div className="mt-8 flex items-center gap-6">
        <div className="h-1 flex-1 bg-theme-sand" aria-hidden="true">
          <div className="h-full bg-theme-dark transition-[width] duration-300" style={{ width: `${Math.round(state.progress * 100)}%` }} />
        </div>
        <div className="flex gap-2">
          <button type="button" className={arrow} onClick={() => step(-1)} disabled={state.start} aria-label="Previous classes">
            <ChevronLeft aria-hidden="true" className="size-5" />
          </button>
          <button type="button" className={cn(arrow)} onClick={() => step(1)} disabled={state.end} aria-label="More classes">
            <ChevronRight aria-hidden="true" className="size-5" />
          </button>
        </div>
      </div>
    </div>
  );
}
