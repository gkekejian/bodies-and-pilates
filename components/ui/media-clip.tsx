"use client";

import Image from "next/image";
import { useEffect, useRef, useState } from "react";
import { cn } from "@/lib/utils";
import type { VideoMedia } from "@/lib/media";

/**
 * Muted, looping studio clip.
 *
 * Performance: the poster is an optimized, responsive next/image (lazy unless
 * `priority`), so it can be the page's fast first paint. The video itself
 * loads only once the clip is within 300px of the viewport. It plays only while at least 40% visible and pauses
 * when scrolled away. Secondary clips pass autoPlay={false} and wait for a
 * tap, so a section never runs a wall of video at once.
 *
 * Accessibility (WCAG 2.2.2): no autoplay when the visitor prefers reduced
 * motion, and a visible pause/play control on every clip.
 */
export function MediaClip({
  media,
  className,
  aspectClassName,
  autoPlay = true,
  sizes = "(max-width: 1024px) 100vw, 40vw",
  priority,
}: {
  media: VideoMedia;
  /** next/image sizes for the poster. */
  sizes?: string;
  /** Above-the-fold clip: load the poster eagerly. */
  priority?: boolean;
  className?: string;
  /** Tailwind aspect class. Defaults to the clip's own ratio. */
  aspectClassName?: string;
  /** false: shows the poster and plays only on tap (for secondary clips). */
  autoPlay?: boolean;
}) {
  const box = useRef<HTMLDivElement>(null);
  const video = useRef<HTMLVideoElement>(null);
  const [near, setNear] = useState(false);
  const [playing, setPlaying] = useState(false);
  const [userPaused, setUserPaused] = useState(!autoPlay);

  useEffect(() => {
    const el = box.current;
    if (!el) return;
    const io = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setNear(true);
          io.disconnect();
        }
      },
      { rootMargin: "300px 0px" }
    );
    io.observe(el);
    return () => io.disconnect();
  }, []);

  useEffect(() => {
    const el = video.current;
    if (!near || !el) return;
    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const io = new IntersectionObserver(
      ([entry]) => {
        if (entry.intersectionRatio >= 0.4 && !reduced && !userPaused) {
          el.play().then(() => setPlaying(true)).catch(() => setPlaying(false));
        } else if (!el.paused) {
          el.pause();
          setPlaying(false);
        }
      },
      { threshold: [0, 0.4] }
    );
    io.observe(el);
    return () => io.disconnect();
  }, [near, userPaused]);

  const toggle = () => {
    const el = video.current;
    if (!el) return;
    if (el.paused) {
      setUserPaused(false);
      el.play().then(() => setPlaying(true)).catch(() => undefined);
    } else {
      setUserPaused(true);
      el.pause();
      setPlaying(false);
    }
  };

  const style = aspectClassName ? undefined : { aspectRatio: `${media.width} / ${media.height}` };

  return (
    <div ref={box} className={cn("relative overflow-hidden bg-cream-200", aspectClassName, className)} style={style}>
      <Image src={media.poster} alt="" fill sizes={sizes} priority={priority} className="object-cover object-center" />
      {near && (
        <video
          ref={video}
          className="absolute inset-0 h-full w-full object-cover"
          src={media.src}
          aria-label={media.label}
          muted
          loop
          playsInline
          preload="metadata"
        />
      )}
      <button
        type="button"
        onClick={toggle}
        aria-label={playing ? `Pause video: ${media.label}` : `Play video: ${media.label}`}
        className="absolute bottom-3 right-3 flex h-10 w-10 items-center justify-center rounded-full bg-charcoal-900/70 text-cream-50 hover:bg-charcoal-900 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-cream-50"
      >
        <svg viewBox="0 0 24 24" className="h-4 w-4" fill="currentColor" aria-hidden="true">
          {playing ? <path d="M7 5h4v14H7zM13 5h4v14h-4z" /> : <path d="M8 5v14l11-7z" />}
        </svg>
      </button>
    </div>
  );
}
