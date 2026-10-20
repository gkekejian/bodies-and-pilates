import { cn } from "@/lib/utils";
import { MediaPhoto } from "@/components/ui/media";
import type { PhotoMedia } from "@/lib/media";

/** Small-caps, letter-spaced serif kicker (the old site's INTRO OFFERS style). */
export const eyebrowClass = "smallcaps text-[15px] text-brown-700";

export function SectionHeading({
  eyebrow,
  title,
  intro,
  align = "left",
  tone = "light",
  id,
  className,
}: {
  eyebrow?: string;
  title: React.ReactNode;
  intro?: React.ReactNode;
  align?: "left" | "center";
  tone?: "light" | "dark";
  id?: string;
  className?: string;
}) {
  return (
    <div className={cn("mb-10 max-w-3xl", align === "center" && "mx-auto text-center", className)}>
      {eyebrow && (
        <p className={cn(eyebrowClass, "mb-4", tone === "dark" && "text-brown-300")}>{eyebrow}</p>
      )}
      <h2
        id={id}
        className={cn(
          "font-serif text-4xl font-semibold leading-[1.1] tracking-[-0.015em] sm:text-5xl",
          tone === "dark" ? "text-cream-50" : "text-brown-900"
        )}
      >
        {title}
      </h2>
      <div
        aria-hidden="true"
        className={cn("my-7 h-px w-16", align === "center" && "mx-auto", tone === "dark" ? "bg-tan-300/70" : "bg-brown-700/50")}
      />
      {intro && (
        <div
          className={cn(
            "font-sans text-base leading-[1.8] sm:text-[17px]",
            tone === "dark" ? "text-cream-100/90" : "text-charcoal-800/85"
          )}
        >
          {intro}
        </div>
      )}
    </div>
  );
}

/**
 * Page banner in the old site's style: a full-bleed studio photo under a tan
 * wash or a dark overlay, with an oversized serif title set straight on it.
 *
 * `display` is the oversized word the old site used ("Pricing", "FAQs").
 * When it is set, the page's SEO H1 (`title`) runs under it as a small-caps
 * line, so heading targets stay exactly as they were. Without it, the H1 is
 * the oversized title.
 */
export function PageHero({
  eyebrow,
  display,
  title,
  intro,
  children,
  banner,
  tone = "tan",
  media,
  action,
  focus,
}: {
  eyebrow?: string;
  display?: string;
  title: React.ReactNode;
  intro?: React.ReactNode;
  children?: React.ReactNode;
  /** Full-bleed studio photo behind the title. Falls back to the dark band. */
  banner?: PhotoMedia | null;
  /** Photo wash: the theme tan (Pricing, Book Your Session) or a dark overlay (FAQs and the rest). */
  tone?: "tan" | "dark";
  /** Optional photo or clip beside the intro on large screens. */
  media?: React.ReactNode;
  /** One button set on the banner itself, under the title. */
  action?: React.ReactNode;
  /** object-position for the banner photo crop. */
  focus?: string;
}) {
  return (
    <>
      {/* The old site's banner: the header sits on the photo (data-hero), then an
          oversized white serif title, and at most one button. */}
      <section
        data-hero
        className={cn(
          "relative isolate -mt-[var(--header-h)] overflow-hidden bg-theme-dark pt-[calc(var(--header-h)+1.5rem)] text-white",
          action ? "pb-11 sm:pb-12" : "pb-9 sm:pb-10"
        )}
      >
        {banner && (
          <>
            <MediaPhoto
              media={banner}
              eager
              sizes="100vw"
              aspectClassName=""
              className="absolute inset-0 -z-20 h-full w-full"
              imgClassName={focus}
            />
            <div
              aria-hidden="true"
              className={cn("absolute inset-0 -z-10", tone === "tan" ? "bg-theme-tan/80" : "bg-theme-dark/60")}
            />
          </>
        )}
        <div className="banner-text mx-auto max-w-5xl px-4 text-center sm:px-6 lg:px-8">
          {eyebrow && !display && <p className="smallcaps mb-3 text-[15px] text-white">{eyebrow}</p>}
          {display ? (
            <>
              <p aria-hidden="true" className="font-serif text-6xl font-semibold leading-[1] tracking-[-0.015em] sm:text-7xl lg:text-[5.25rem]">
                {display}
              </p>
              <h1 className="smallcaps mt-3 text-[15px] text-white sm:text-base">{title}</h1>
            </>
          ) : (
            <h1 className="font-serif text-5xl font-semibold leading-[1.05] tracking-[-0.015em] sm:text-6xl lg:text-7xl">{title}</h1>
          )}
          {action && <div className="mt-6 flex justify-center">{action}</div>}
        </div>
      </section>
      {(intro || children || media) && (
        <section className="bg-cream-50 py-14 sm:py-20">
          <div
            className={cn(
              "mx-auto px-4 sm:px-6 lg:px-8",
              media ? "grid max-w-6xl items-center gap-10 lg:grid-cols-12 lg:gap-14" : "max-w-2xl text-center"
            )}
          >
            <div className={cn(media && "lg:col-span-7")}>
              {intro && <div className="font-sans text-base leading-[1.8] text-charcoal-800/85 sm:text-lg">{intro}</div>}
              {children && <div className={cn("mt-8", !media && "flex flex-col items-center")}>{children}</div>}
            </div>
            {media && <div className="lg:col-span-5">{media}</div>}
          </div>
        </section>
      )}
    </>
  );
}
