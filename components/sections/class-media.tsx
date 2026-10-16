import { MediaItem, MediaPhoto } from "@/components/ui/media";
import { MEDIA, present, type Media, type PhotoMedia } from "@/lib/media";
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

/** One studio photo per class for the old site's tall "The Classes" cards. */
export const CLASS_CARD_PHOTO: Record<string, PhotoMedia | null> = {
  beginner: MEDIA.classPlankWide,
  fullbody: MEDIA.classKneelingLegPress,
  flexibility: MEDIA.mermaidStretch,
  "abs-and-assets": MEDIA.supineBridge,
  private: MEDIA.duetOnChair,
};

/**
 * The old site's "The Classes" band: tall photo cards with the class name set
 * in white serif. Each card links to the class.
 */
export function ClassCards({
  items,
  headingId,
  title = "The Classes",
  intro = "We teach classes for every level, and private sessions are planned around you.",
  headingLevel = "h2",
}: {
  items: { key: string; name: string; href: string }[];
  headingId: string;
  title?: string;
  intro?: string;
  headingLevel?: "h2" | "h3";
}) {
  const Heading = headingLevel;
  return (
    <section aria-labelledby={headingId} className="bg-mauve-600 py-16 text-cream-50 sm:py-24">
      <div className="mx-auto max-w-6xl px-4 text-center sm:px-6 lg:px-8">
        <Heading id={headingId} className="font-serif text-5xl font-normal sm:text-6xl">
          {title}
        </Heading>
        <p className="mx-auto mt-5 max-w-xl font-accent text-base leading-relaxed text-cream-50 sm:text-lg">{intro}</p>
        <ul
          className={cn(
            "mt-12 grid gap-4 sm:gap-6",
            items.length === 3 ? "sm:grid-cols-3" : "grid-cols-2 lg:grid-cols-4",
            items.length > 3 && "max-sm:gap-3"
          )}
        >
          {items.map((c) => {
            const photo = CLASS_CARD_PHOTO[c.key];
            return (
              <li key={c.key}>
                <a href={c.href} className="group relative block overflow-hidden bg-sage-900 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-cream-50 focus-visible:ring-offset-2 focus-visible:ring-offset-mauve-600">
                  {photo && (
                    <MediaPhoto
                      media={photo}
                      sizes={items.length === 3 ? "(max-width: 640px) 100vw, 33vw" : "(max-width: 1024px) 50vw, 25vw"}
                      aspectClassName={items.length === 3 ? "aspect-[3/4] sm:aspect-[2/3]" : "aspect-[2/3]"}
                      className="transition-transform duration-500 group-hover:scale-[1.03]"
                    />
                  )}
                  <span aria-hidden="true" className="absolute inset-0 bg-gradient-to-t from-charcoal-900/70 via-charcoal-900/10 to-transparent" />
                  <span className="banner-text absolute inset-x-0 bottom-0 p-5 font-serif text-3xl text-cream-50 sm:text-4xl">
                    {c.name}
                  </span>
                </a>
              </li>
            );
          })}
        </ul>
      </div>
    </section>
  );
}
