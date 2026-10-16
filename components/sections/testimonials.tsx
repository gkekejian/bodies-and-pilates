import { GOOGLE_REVIEWS, googleReviewsHref } from "@/lib/site";
import { HOME_TESTIMONIALS, type Testimonial } from "@/lib/testimonials";
import { ReviewCarousel } from "@/components/sections/review-carousel";

/**
 * The old site's "The Reviews": italic serif, one review at a time, lots of
 * air. Every quote stays in the HTML; the carousel only changes which one shows.
 */
export function Testimonials({
  items = HOME_TESTIMONIALS,
  headingId = "testimonials-heading",
}: {
  items?: Testimonial[];
  headingId?: string;
}) {
  return (
    <section aria-labelledby={headingId} className="bg-cream-200 py-20 sm:py-28">
      <div className="mx-auto max-w-3xl px-4 text-center sm:px-6 lg:px-8">
        <p className="smallcaps mb-4 text-[15px] text-sage-700">Kind Words</p>
        <h2 id={headingId} className="font-serif text-5xl font-light text-sage-900 sm:text-6xl">
          The Reviews
        </h2>
        <p className="mt-5 font-sans text-base text-charcoal-800/85">
          <a
            href={googleReviewsHref()}
            target="_blank"
            rel="noopener noreferrer"
            className="underline decoration-sage-700/50 underline-offset-4 hover:text-sage-700"
          >
            Rated {GOOGLE_REVIEWS.rating} on Google from {GOOGLE_REVIEWS.count} reviews
          </a>
        </p>
        <div aria-hidden="true" className="mx-auto my-10 h-px w-16 bg-sage-700/50" />
        <ReviewCarousel items={items} />
      </div>
    </section>
  );
}
