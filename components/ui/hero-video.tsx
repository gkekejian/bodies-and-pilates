"use client";

import { useEffect, useRef, useState } from "react";
import { MediaPhoto } from "@/components/ui/media";
import type { PhotoMedia } from "@/lib/media";
import { cn } from "@/lib/utils";

export interface VideoSource {
  src: string;
  type: string;
}

/**
 * Looping, muted background video for a hero, the old site's playback (loop,
 * normal speed, under a dark wash).
 *
 * Performance: the poster is a prioritized next/image, so it stays the LCP
 * element. The video is only requested after the page has loaded, the same
 * file at every screen size, and is skipped entirely when the visitor
 * prefers reduced motion or has Save-Data on (the poster stays). It fades in
 * once frames are playing, so the switch from the poster is soft, and pauses
 * while the hero is off screen.
 *
 * Accessibility (WCAG 2.2.2): the clip loops for more than five seconds, so a
 * visible pause/play control is always offered. The video is decorative.
 */
export function HeroVideo({
  poster,
  sources: clip,
  imgClassName,
}: {
  poster: PhotoMedia | null;
  /** Video sources in order of preference, used at every screen size. */
  sources: VideoSource[];
  /** object-position for the poster and the video, e.g. "object-[68%_50%]". */
  imgClassName?: string;
}) {
  const box = useRef<HTMLDivElement>(null);
  const video = useRef<HTMLVideoElement>(null);
  const [sources, setSources] = useState<VideoSource[] | null>(null);
  const [showing, setShowing] = useState(false);
  const [playing, setPlaying] = useState(false);
  const [userPaused, setUserPaused] = useState(false);

  // Choose and start loading the clip once the page itself has loaded.
  useEffect(() => {
    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const saveData = (navigator as Navigator & { connection?: { saveData?: boolean } }).connection?.saveData;
    if (reduced || saveData) return;
    const start = () => setSources(clip);
    if (document.readyState === "complete") start();
    else {
      window.addEventListener("load", start, { once: true });
      return () => window.removeEventListener("load", start);
    }
  }, [clip]);

  // Play while the hero is on screen, unless the visitor paused it.
  useEffect(() => {
    const el = video.current;
    const area = box.current;
    if (!sources || !el || !area) return;
    const io = new IntersectionObserver(([entry]) => {
      if (entry.isIntersecting && !userPaused) {
        el.play().catch(() => setPlaying(false));
      } else if (!el.paused) {
        el.pause();
      }
    });
    io.observe(area);
    return () => io.disconnect();
  }, [sources, userPaused]);

  const toggle = () => {
    const el = video.current;
    if (!el) return;
    if (el.paused) {
      setUserPaused(false);
      el.play().catch(() => undefined);
    } else {
      setUserPaused(true);
      el.pause();
    }
  };

  // Two layers: the media under the section's wash (-z-20), and the control
  // above everything else in the section (z-10), so it can be reached.
  return (
    <>
      <div ref={box} className="absolute inset-0 -z-20">
        <MediaPhoto
          media={poster}
          priority
          sizes="100vw"
          aspectClassName=""
          className="absolute inset-0 h-full w-full"
          imgClassName={imgClassName}
        />
        {sources && (
          <video
            ref={video}
            aria-hidden="true"
            tabIndex={-1}
            muted
            loop
            playsInline
            autoPlay
            preload="auto"
            onPlaying={() => {
              setShowing(true);
              setPlaying(true);
            }}
            onPause={() => setPlaying(false)}
            className={cn(
              "absolute inset-0 h-full w-full object-cover transition-opacity duration-1000",
              imgClassName,
              showing ? "opacity-100" : "opacity-0"
            )}
          >
            {sources.map((s) => (
              <source key={s.src} src={s.src} type={s.type} />
            ))}
          </video>
        )}
      </div>
      {sources && (
        <button
          type="button"
          onClick={toggle}
          aria-label={playing ? "Pause background video" : "Play background video"}
          className="absolute bottom-4 right-4 z-10 flex h-11 w-11 items-center justify-center rounded-full border border-white/60 bg-theme-dark/50 text-white transition-colors hover:bg-theme-dark/80 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white"
        >
          <svg viewBox="0 0 24 24" className="h-4 w-4" fill="currentColor" aria-hidden="true">
            {playing ? <path d="M7 5h4v14H7zM13 5h4v14h-4z" /> : <path d="M8 5v14l11-7z" />}
          </svg>
        </button>
      )}
    </>
  );
}
