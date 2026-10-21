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
 * The old site's "The Classes" band (home-3-practice-classes.png): the theme medium brown, the
 * white serif title, its one-line subline, and tall photo cards with the class
 * name set on each.
 */
export function ClassCards({
  items,
  headingId,
  title = "The Classes",
  intro = "We offer classes for all fitness levels and private sessions can be tailored to meet your individual needs.",
  headingLevel = "h2",
}: {
  /** `photo` overrides the class photo (the Home cards use the old site's stock photos). */
  items: { key: string; name: string; href: string; photo?: PhotoMedia | null }[];
  headingId: string;
  title?: string;
  intro?: string;
  headingLevel?: "h2" | "h3";
}) {
  const Heading = headingLevel;
  return (
    <section aria-labelledby={headingId} className="bg-theme-brown pb-16 pt-10 text-white sm:pb-20 sm:pt-12">
      <div className="mx-auto max-w-[1160px] px-4 text-center sm:px-6">
        <Heading id={headingId} className="font-serif text-5xl font-semibold tracking-[-0.015em] sm:text-6xl lg:text-[4.25rem]">
          {title}
        </Heading>
        {/* 24px keeps white on the theme brown at the 3:1 large-text minimum. */}
        <p className="mx-auto mt-3 max-w-3xl font-serif text-2xl font-light leading-snug text-white">{intro}</p>
        {/* Three cards: the old row, 285px cards 5px apart (865px). */}
        <ul className={cn("mt-8 grid gap-[5px]", items.length === 3 ? "mx-auto max-w-[865px] sm:grid-cols-3" : "grid-cols-2 lg:grid-cols-4")}>
          {items.map((c) => {
            const photo = c.photo !== undefined ? c.photo : CLASS_CARD_PHOTO[c.key];
            return (
              <li key={c.key}>
                <a
                  href={c.href}
                  className="group relative block overflow-hidden bg-theme-dark focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-offset-2 focus-visible:ring-offset-theme-brown"
                >
                  {photo && (
                    <MediaPhoto
                      media={photo}
                      sizes={items.length === 3 ? "(max-width: 640px) 100vw, 290px" : "(max-width: 1024px) 50vw, 290px"}
                      aspectClassName="aspect-[285/430]"
                      className="transition-transform duration-500 group-hover:scale-[1.03]"
                    />
                  )}
                  {/* The old cards carry a soft warm wash. */}
                  <span aria-hidden="true" className="absolute inset-0 bg-theme-tan/30" />
                  <span className="banner-text absolute inset-x-0 top-1/2 -translate-y-1/2 px-3 font-serif text-3xl font-semibold tracking-[-0.01em] text-white sm:text-[2.75rem] sm:leading-none">
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
