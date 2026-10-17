import { cn } from "@/lib/utils";
import { MediaPhoto } from "@/components/ui/media";
import type { PhotoMedia } from "@/lib/media";

/** Small-caps, letter-spaced serif kicker (the old site's INTRO OFFERS style). */
export const eyebrowClass = "smallcaps text-[15px] text-sage-700";

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
        <p className={cn(eyebrowClass, "mb-4", tone === "dark" && "text-sage-300")}>{eyebrow}</p>
      )}
      <h2
        id={id}
        className={cn(
          "font-serif text-4xl font-light leading-[1.1] sm:text-5xl",
          tone === "dark" ? "text-cream-50" : "text-sage-900"
        )}
      >
        {title}
      </h2>
      <div
        aria-hidden="true"
        className={cn("my-7 h-px w-16", align === "center" && "mx-auto", tone === "dark" ? "bg-taupe-300/70" : "bg-sage-700/50")}
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
 * Page banner in the old site's style: a full-bleed studio photo under a warm
 * wash, with an oversized serif title set straight on it.
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
  tone = "warm",
  media,
  action,
}: {
  eyebrow?: string;
  display?: string;
  title: React.ReactNode;
  intro?: React.ReactNode;
  children?: React.ReactNode;
  /** Full-bleed studio photo behind the title. Falls back to the sage band. */
  banner?: PhotoMedia | null;
  /** Photo wash: warm peach (Pricing, Book Your Session) or deep sage. */
  tone?: "warm" | "sage";
  /** Optional photo or clip beside the intro on large screens. */
  media?: React.ReactNode;
  /** One button set on the banner itself, under the title. */
  action?: React.ReactNode;
}) {
  return (
    <>
      <section className={cn("relative isolate overflow-hidden bg-sage-900 text-cream-50", banner ? "py-20 sm:py-28 lg:py-32" : "py-16 sm:py-20")}>
        {banner && (
          <>
            <MediaPhoto
              media={banner}
              eager
              sizes="100vw"
              aspectClassName=""
              className="absolute inset-0 -z-20 h-full w-full"
            />
            <div
              aria-hidden="true"
              className={cn("absolute inset-0 -z-10", tone === "warm" ? "bg-[#6b4f3f]/65" : "bg-sage-900/70")}
            />
          </>
        )}
        <div className="banner-text mx-auto max-w-5xl px-4 text-center sm:px-6 lg:px-8">
          {eyebrow && !display && <p className="smallcaps mb-4 text-[15px] text-cream-100">{eyebrow}</p>}
          {display ? (
            <>
              <p aria-hidden="true" className="font-serif text-6xl font-normal leading-[1] tracking-[-0.01em] sm:text-7xl lg:text-8xl">
                {display}
              </p>
              <h1 className="smallcaps mt-6 text-base text-cream-100 sm:text-lg">{title}</h1>
            </>
          ) : (
            <h1 className="font-serif text-5xl font-normal leading-[1.05] tracking-[-0.01em] sm:text-6xl lg:text-7xl">{title}</h1>
          )}
          {action && <div className="mt-9 flex justify-center">{action}</div>}
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
