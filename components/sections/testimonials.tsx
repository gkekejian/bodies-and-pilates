import Image from "next/image";
import { OwnerPlaceholder } from "@/components/ui/placeholder";
import { GOOGLE_REVIEWS, googleReviewsHref } from "@/lib/site";
import { TESTIMONIALS, type Testimonial } from "@/lib/testimonials";
import { SectionHeading } from "@/components/sections/section-heading";

function Attribution({ t }: { t: Testimonial }) {
  if (t.firstName && t.neighborhood) {
    return (
      <figcaption className="flex items-center gap-3">
        {t.portrait.src && (
          <Image
            src={t.portrait.src}
            alt={`${t.firstName}, Bodies and Pilates client from ${t.neighborhood}`}
            width={48}
            height={48}
            className="h-12 w-12 rounded-full object-cover"
          />
        )}
        <span className="font-sans text-xs uppercase tracking-[0.2em] text-sage-300">
          {t.firstName}, {t.neighborhood}
        </span>
      </figcaption>
    );
  }
  return (
    <figcaption>
      <OwnerPlaceholder label="client first name and neighborhood" tone="dark">
        Owner to provide (with permission), plus an optional portrait for photo slot 10.
      </OwnerPlaceholder>
    </figcaption>
  );
}

export function Testimonials() {
  return (
    <section aria-labelledby="testimonials-heading" className="bg-charcoal-900 py-20 sm:py-28">
      <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
        <SectionHeading
          id="testimonials-heading"
          eyebrow="Kind Words"
          title="What clients say"
          tone="dark"
          intro={
            <p>
              <a
                href={googleReviewsHref()}
                target="_blank"
                rel="noopener noreferrer"
                className="underline decoration-sage-300 underline-offset-4 hover:text-cream-50"
              >
                Rated {GOOGLE_REVIEWS.rating} on Google from {GOOGLE_REVIEWS.count} reviews
              </a>
            </p>
          }
        />
        <div className="grid gap-6 md:grid-cols-3">
          {TESTIMONIALS.map((t, i) => (
            <figure key={i} className="flex flex-col justify-between gap-8 border border-cream-50/10 p-7">
              <blockquote className="font-serif text-xl italic leading-[1.5] text-cream-50">
                &ldquo;{t.quote}&rdquo;
              </blockquote>
              <Attribution t={t} />
            </figure>
          ))}
        </div>
      </div>
    </section>
  );
}
