import { CtaLink } from "@/components/ui/cta-link";
import { FIRST_CLASS_CTA, introBookingHref } from "@/lib/site";

export function FinalCta({
  title = "Your first class is $25.",
  body = "Small-group reformer Pilates on Vineland Ave in North Hollywood. Come see the studio, meet your instructor, and take a class with no more than 7 people.",
  cta = FIRST_CLASS_CTA,
  href,
}: {
  title?: string;
  body?: string;
  cta?: string;
  href?: string;
}) {
  // Top padding is 8px shy of the bottom to offset the headline's half-leading,
  // so the visible content (cap height to button edge) sits optically centered.
  return (
    <section aria-labelledby="final-cta-heading" className="bg-cream-200 pb-24 pt-[5.5rem] sm:pb-32 sm:pt-[7.5rem]">
      <div className="mx-auto max-w-4xl px-4 text-center sm:px-6 lg:px-8">
        <h2 id="final-cta-heading" className="font-serif text-5xl font-light leading-[1.05] text-sage-900 sm:text-6xl lg:text-7xl">
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
