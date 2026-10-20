import { CLASSPASS_RATING_LINE, CLASSPASS_URL } from "@/lib/site";
import { HOME_TESTIMONIALS, type Testimonial } from "@/lib/testimonials";
import { ReviewCarousel } from "@/components/sections/review-carousel";
import { MediaPhoto } from "@/components/ui/media";
import type { PhotoMedia } from "@/lib/media";
import { cn } from "@/lib/utils";

/**
 * The old site's "The Reviews": italic serif, one review at a time, lots of
 * air, and on Home a photo beside it. Every quote stays in the HTML; the
 * carousel only changes which one shows.
 */
export function Testimonials({
  items = HOME_TESTIMONIALS,
  headingId = "testimonials-heading",
  photo,
}: {
  items?: Testimonial[];
  headingId?: string;
  /** Home only: the photo the old section set beside the slideshow. */
  photo?: PhotoMedia | null;
}) {
  const body = (
    <div className="text-center">
      <h2 id={headingId} className="font-serif text-5xl font-semibold tracking-[-0.015em] text-theme-dark sm:text-6xl lg:text-[4.25rem]">
        The Reviews
      </h2>
      <p className="mt-5 font-sans text-base text-charcoal-800/85">
        <a
          href={CLASSPASS_URL}
          target="_blank"
          rel="noopener noreferrer"
          className="underline decoration-brown-700/50 underline-offset-4 hover:text-brown-700"
        >
          {CLASSPASS_RATING_LINE}
        </a>
      </p>
      <div aria-hidden="true" className="mx-auto my-10 h-px w-16 bg-brown-700/50" />
      <ReviewCarousel items={items} />
    </div>
  );
  return (
    <section aria-labelledby={headingId} className="bg-theme-cream py-20 sm:py-28">
      <div
        className={cn(
          "mx-auto px-4 sm:px-6 lg:px-8",
          photo ? "grid max-w-[1100px] items-center gap-12 lg:grid-cols-[440fr_560fr] lg:gap-16" : "max-w-3xl"
        )}
      >
        {photo && (
          <MediaPhoto media={photo} aspectClassName="aspect-[4/5]" className="mx-auto w-full max-w-sm lg:max-w-none" sizes="(max-width: 1024px) 384px, 440px" />
        )}
        {body}
      </div>
    </section>
  );
}
