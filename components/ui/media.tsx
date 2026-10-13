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
}: {
  media: PhotoMedia | null;
  sizes: string;
  priority?: boolean;
  /** Load immediately at high fetch priority, without a preload hint. */
  eager?: boolean;
  aspectClassName?: string;
  className?: string;
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
        className="object-cover object-center"
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
}: {
  media: Media | null;
  sizes: string;
  priority?: boolean;
  aspectClassName?: string;
  className?: string;
  /** Clips only. Defaults to playing while in view. */
  autoPlay?: boolean;
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
      />
    );
  }
  return (
    <MediaPhoto media={media} sizes={sizes} priority={priority} aspectClassName={aspectClassName} className={className} />
  );
}
