import { CtaLink } from "@/components/ui/cta-link";
import { CLASSPASS_RATING, CLASSPASS_URL } from "@/lib/site";
import { cn } from "@/lib/utils";

/**
 * ClassPass rating band (verified October 12, 2026). Visible text only:
 * deliberately no aggregateRating or Review schema.
 */
export function ClassPassRating({ className }: { className?: string }) {
  return (
    <section aria-labelledby="classpass-rating-heading" className={cn("py-10 sm:py-14", className)}>
      <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col items-center gap-6 border-y border-taupe-300/60 py-8 text-center sm:flex-row sm:justify-between sm:py-10 sm:text-left">
          <div>
            <h2 id="classpass-rating-heading" className="font-serif text-3xl leading-tight text-charcoal-900 sm:text-4xl">
              Rated {CLASSPASS_RATING.rating} on ClassPass
            </h2>
            <p className="mt-3 font-sans text-xs uppercase tracking-[0.2em] text-taupe-700">
              {CLASSPASS_RATING.ratings} ratings · {CLASSPASS_RATING.reviews} reviews
            </p>
          </div>
          <CtaLink href={CLASSPASS_URL} variant="text" newTab className="shrink-0">
            Read our reviews on ClassPass
          </CtaLink>
        </div>
      </div>
    </section>
  );
}
