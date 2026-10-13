import { MediaItem } from "@/components/ui/media";
import { MEDIA, present, type Media } from "@/lib/media";
import { cn } from "@/lib/utils";

/**
 * Owner photo mapping (October 12, 2026), translated to the studio's actual
 * class names: "Reformer Foundations" is Beginner, "Signature Flow" is Full
 * Body, "Stretch and Restore" is Flexibility. "Athletic Reformer" has no
 * matching class, so its shots illustrate "What is reformer Pilates?".
 */
export const CLASS_MEDIA: Record<string, (Media | null)[]> = {
  beginner: [MEDIA.legsInStraps, MEDIA.springsCloseUp],
  fullbody: [MEDIA.classPlankRow],
  flexibility: [MEDIA.mermaidStretch, MEDIA.partnerSideStretch],
  private: [MEDIA.duetOnChair],
  "abs-and-assets": [MEDIA.supineBridge, MEDIA.boxAbs],
  "what-is-reformer": [MEDIA.standingSplit, MEDIA.classLungeInSync],
};

export const hasClassMedia = (key: string) => present(CLASS_MEDIA[key] ?? []).length > 0;

/**
 * One item, or two side by side. On large screens the column stretches to the
 * height of the text beside it and the media fills it (object-cover), so no
 * class block is left with an empty band under its photo. Renders nothing
 * when empty.
 */
export function ClassMedia({ mediaKey, className }: { mediaKey: string; className?: string }) {
  const items = present(CLASS_MEDIA[mediaKey] ?? []);
  if (items.length === 0) return null;
  // Only the first clip in a group plays on its own; any second clip waits for a tap.
  const firstClip = items.findIndex((m) => m.kind === "video");
  return (
    <div className={cn("grid gap-4 lg:h-full", items.length > 1 && "grid-cols-2", className)}>
      {items.map((m, i) => (
        <MediaItem
          key={m.file}
          media={m}
          autoPlay={i === firstClip}
          aspectClassName={cn(items.length > 1 ? "aspect-[3/4]" : "aspect-[4/5]", "lg:aspect-auto lg:h-full lg:min-h-[28rem]")}
          sizes={items.length > 1 ? "(max-width: 1024px) 50vw, 20vw" : "(max-width: 1024px) 100vw, 40vw"}
        />
      ))}
    </div>
  );
}

/**
 * Private and duet visuals (classes and pricing pages): the landscape ring
 * clip leads, with the hands-on assist clips and the duet photo beside it.
 */
export function PrivateShowcase({ includeDuet = true }: { includeDuet?: boolean }) {
  const main = MEDIA.privateRingLandscape;
  const supporting = present([
    MEDIA.privateKneelingAssist,
    MEDIA.privateChairAssist,
    MEDIA.privateShoulderAssist,
    includeDuet ? MEDIA.duetOnChair : null,
  ]);
  if (!main && supporting.length === 0) return null;
  return (
    <div className="mt-12 space-y-4">
      {main && <MediaItem media={main} aspectClassName="aspect-video" sizes="(max-width: 1024px) 100vw, 70vw" />}
      {supporting.length > 0 && (
        <ul className="grid grid-cols-2 gap-4 lg:grid-cols-4">
          {supporting.map((m) => (
            <li key={m.file}>
              <MediaItem media={m} aspectClassName="aspect-[4/5]" sizes="(max-width: 1024px) 50vw, 25vw" autoPlay={false} />
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
