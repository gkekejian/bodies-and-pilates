import Image from "next/image";
import { cn } from "@/lib/utils";
import type { Media, PhotoMedia } from "@/lib/media";
import { MediaClip } from "@/components/ui/media-clip";

/**
 * Studio photo through next/image. Lazy by default; pass `priority` only for
 * the above-the-fold hero. Renders nothing when the asset is not imported.
 */
export function MediaPhoto({
  media,
  sizes,
  priority,
  eager,
  aspectClassName = "aspect-[4/5]",
  className,
  imgClassName,
}: {
  media: PhotoMedia | null;
  sizes: string;
  priority?: boolean;
  /** Load immediately at high fetch priority, without a preload hint. */
  eager?: boolean;
  aspectClassName?: string;
  className?: string;
  /** Extra classes for the <img>, e.g. an object-position for a crop. */
  imgClassName?: string;
}) {
  if (!media) return null;
  return (
    <div className={cn("relative overflow-hidden bg-cream-200", aspectClassName, className)}>
      <Image
        src={media.src}
        alt={media.alt}
        fill
        sizes={sizes}
        priority={priority}
        loading={eager ? "eager" : undefined}
        fetchPriority={eager ? "high" : undefined}
        className={cn("object-cover object-center", imgClassName)}
      />
    </div>
  );
}

/** Photo or clip, whichever the asset is. Renders nothing when absent. */
export function MediaItem({
  media,
  sizes,
  priority,
  aspectClassName,
  className,
  autoPlay,
  fit,
}: {
  media: Media | null;
  sizes: string;
  priority?: boolean;
  aspectClassName?: string;
  className?: string;
  /** Clips only. Defaults to playing while in view. */
  autoPlay?: boolean;
  /** Clips only: "contain" keeps the whole frame visible. */
  fit?: "cover" | "contain";
}) {
  if (!media) return null;
  if (media.kind === "video") {
    return (
      <MediaClip
        media={media}
        aspectClassName={aspectClassName}
        className={className}
        autoPlay={autoPlay}
        sizes={sizes}
        priority={priority}
        fit={fit}
      />
    );
  }
  return (
    <MediaPhoto media={media} sizes={sizes} priority={priority} aspectClassName={aspectClassName} className={className} />
  );
}
