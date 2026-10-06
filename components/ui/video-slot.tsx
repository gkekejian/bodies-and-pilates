import { cn } from "@/lib/utils";
import type { ClipSpec } from "@/lib/photos";

/**
 * Vertical (9:16) class clip, or a labeled placeholder until the owner
 * delivers it (photo slot 9, see CLIPS in lib/photos.ts).
 */
export function VideoSlot({ clip, className }: { clip: ClipSpec; className?: string }) {
  if (clip.src) {
    return (
      <video
        className={cn("aspect-[9/16] w-full bg-cream-200 object-cover", className)}
        src={clip.src}
        poster={clip.poster ?? undefined}
        aria-label={clip.label}
        muted
        loop
        playsInline
        autoPlay
        preload="none"
      />
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
