import Image from "next/image";
import { cn } from "@/lib/utils";
import type { PhotoSpec } from "@/lib/photos";

interface PhotoSlotProps {
  photo: PhotoSpec;
  /** next/image sizes attribute. */
  sizes: string;
  /** Only for the above-the-fold hero image. */
  priority?: boolean;
  /** Tailwind aspect class. Defaults to the slot's own width/height ratio. */
  aspectClassName?: string;
  className?: string;
}

/**
 * Real studio photo, or a labeled placeholder of identical dimensions until
 * the owner delivers the shot (see lib/photos.ts). Reserving the box up front
 * keeps layout shift at zero either way.
 */
export function PhotoSlot({ photo, sizes, priority, aspectClassName, className }: PhotoSlotProps) {
  const style = aspectClassName ? undefined : { aspectRatio: `${photo.width} / ${photo.height}` };

  if (photo.src) {
    return (
      <div className={cn("relative overflow-hidden bg-cream-200", aspectClassName, className)} style={style}>
        <Image
          src={photo.src}
          alt={photo.alt}
          fill
          sizes={sizes}
          priority={priority}
          className="object-cover object-center"
        />
      </div>
    );
  }

  return (
    <div
      role="img"
      aria-label={`Photo coming soon: ${photo.alt}`}
      data-placeholder="photo"
      className={cn(
        "relative flex items-center justify-center overflow-hidden border border-taupe-300/70 bg-cream-200",
        aspectClassName,
        className
      )}
      style={style}
    >
      <div
        aria-hidden="true"
        className="absolute inset-0 opacity-60"
        style={{
          backgroundImage:
            "repeating-linear-gradient(135deg, transparent 0 22px, rgba(163,146,126,0.12) 22px 23px)",
        }}
      />
      <div className="relative max-w-[80%] text-center">
        <p className="font-sans text-[10px] font-medium uppercase tracking-[0.25em] text-taupe-700">
          Photo slot {photo.slot}
        </p>
        <p className="mt-2 font-serif text-base leading-snug text-charcoal-800/70 sm:text-lg">{photo.brief}</p>
        <p className="mt-2 font-sans text-[11px] text-charcoal-800/70">Real studio photography coming soon</p>
      </div>
    </div>
  );
}
