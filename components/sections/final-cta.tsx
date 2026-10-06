import { CtaLink } from "@/components/ui/cta-link";
import { FIRST_CLASS_CTA, introBookingHref } from "@/lib/site";

export function FinalCta({
  title = "Your first class is $25.",
  body = "Small-group reformer Pilates on Vineland Ave in North Hollywood. Come see the studio, meet your instructor, and feel the difference real coaching makes.",
  cta = FIRST_CLASS_CTA,
  href,
}: {
  title?: string;
  body?: string;
  cta?: string;
  href?: string;
}) {
  return (
    <section aria-labelledby="final-cta-heading" className="bg-cream-200 py-24 sm:py-32">
      <div className="mx-auto max-w-4xl px-4 text-center sm:px-6 lg:px-8">
        <h2 id="final-cta-heading" className="font-serif text-4xl leading-[1.1] text-charcoal-900 sm:text-5xl lg:text-6xl">
          {title}
        </h2>
        <p className="mx-auto mt-8 max-w-xl font-sans text-base leading-[1.75] text-charcoal-800/85 sm:text-lg">{body}</p>
        <div className="mt-10">
          <CtaLink href={href ?? introBookingHref()}>{cta}</CtaLink>
        </div>
      </div>
    </section>
  );
}
