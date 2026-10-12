"use client";

import { useEffect, useRef, useState } from "react";
import { cn } from "@/lib/utils";
import type { ClipSpec } from "@/lib/photos";

/**
 * Vertical (9:16) class clip, or a labeled placeholder until the owner
 * delivers it (photo slot 9, see CLIPS in lib/photos.ts).
 *
 * Accessibility (WCAG 2.2.2): looping video autoplays only when the visitor
 * has not asked for reduced motion, and always has a visible pause/play
 * control.
 */
export function VideoSlot({ clip, className }: { clip: ClipSpec; className?: string }) {
  const ref = useRef<HTMLVideoElement>(null);
  const [playing, setPlaying] = useState(false);

  useEffect(() => {
    const video = ref.current;
    if (!video) return;
    if (!window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      video.play().then(() => setPlaying(true)).catch(() => setPlaying(false));
    }
  }, []);

  if (clip.src) {
    const toggle = () => {
      const video = ref.current;
      if (!video) return;
      if (video.paused) {
        video.play().then(() => setPlaying(true)).catch(() => undefined);
      } else {
        video.pause();
        setPlaying(false);
      }
    };
    return (
      <div className={cn("relative", className)}>
        <video
          ref={ref}
          className="aspect-[9/16] w-full bg-cream-200 object-cover"
          src={clip.src}
          poster={clip.poster ?? undefined}
          aria-label={clip.label}
          muted
          loop
          playsInline
          preload="none"
        />
        <button
          type="button"
          onClick={toggle}
          aria-label={playing ? `Pause video: ${clip.label}` : `Play video: ${clip.label}`}
          className="absolute bottom-3 right-3 flex h-10 w-10 items-center justify-center rounded-full bg-charcoal-900/70 text-cream-50 hover:bg-charcoal-900 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-cream-50"
        >
          <svg viewBox="0 0 24 24" className="h-4 w-4" fill="currentColor" aria-hidden="true">
            {playing ? <path d="M7 5h4v14H7zM13 5h4v14h-4z" /> : <path d="M8 5v14l11-7z" />}
          </svg>
        </button>
      </div>
    );
  }

  return (
    <div
      role="img"
      aria-label={`Video coming soon: ${clip.label}`}
      data-placeholder="video"
      className={cn(
        "relative flex aspect-[9/16] w-full items-center justify-center overflow-hidden border border-taupe-300/70 bg-cream-200",
        className
      )}
    >
      <div className="max-w-[80%] text-center">
        <span
          aria-hidden="true"
          className="mx-auto mb-4 flex h-11 w-11 items-center justify-center rounded-full border border-taupe-500/60 text-taupe-700"
        >
          <svg viewBox="0 0 24 24" className="ml-0.5 h-4 w-4" fill="currentColor">
            <path d="M8 5v14l11-7z" />
          </svg>
        </span>
        <p className="font-sans text-[10px] font-medium uppercase tracking-[0.25em] text-taupe-700">
          Video slot 9
        </p>
        <p className="mt-2 font-serif text-base leading-snug text-charcoal-800/70">{clip.brief}</p>
      </div>
    </div>
  );
}
