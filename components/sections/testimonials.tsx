import { CLASSPASS_RATING_LINE, CLASSPASS_URL } from "@/lib/site";
import { HOME_TESTIMONIALS, type Testimonial } from "@/lib/testimonials";
import { SectionHeading } from "@/components/sections/section-heading";
import { cn } from "@/lib/utils";

export function Testimonials({
  items = HOME_TESTIMONIALS,
  headingId = "testimonials-heading",
}: {
  items?: Testimonial[];
  headingId?: string;
}) {
  return (
    <section aria-labelledby={headingId} className="bg-charcoal-900 py-20 sm:py-28">
      <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
        <SectionHeading
          id={headingId}
          eyebrow="Kind Words"
          title="What clients say"
          tone="dark"
          intro={
            <p>
              <a
                href={CLASSPASS_URL}
                target="_blank"
                rel="noopener noreferrer"
                className="underline decoration-sage-300 underline-offset-4 hover:text-cream-50"
              >
                {CLASSPASS_RATING_LINE}
              </a>
            </p>
          }
        />
        <ul className={cn("grid gap-6", items.length > 3 ? "md:grid-cols-2 lg:grid-cols-3" : "md:grid-cols-3")}>
          {items.map((t) => (
            <li key={t.id} className="flex">
              <figure className="flex flex-1 flex-col justify-between gap-8 border border-cream-50/10 p-7">
                <blockquote className="font-serif text-xl italic leading-[1.5] text-cream-50">
                  &ldquo;{t.quote}&rdquo;
                </blockquote>
                <figcaption className="font-sans text-xs uppercase tracking-[0.2em] text-sage-300">{t.attribution}</figcaption>
              </figure>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
