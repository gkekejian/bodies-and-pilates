import { CtaLink } from "@/components/ui/cta-link";
import { offerHref, type Offer } from "@/lib/pricing";
import { cn } from "@/lib/utils";

/** One pricing tier, exactly one CTA. */
export function OfferCard({
  offer,
  highlight,
  headingLevel = "h3",
}: {
  offer: Offer;
  highlight?: boolean;
  headingLevel?: "h2" | "h3";
}) {
  const Heading = headingLevel;
  const featured = highlight ?? Boolean(offer.badge);
  return (
    <article
      className={cn(
        "relative flex h-full flex-col gap-5 rounded-sm border bg-cream-50 p-7 sm:p-8",
        featured ? "border-sage-700 shadow-[0_12px_40px_rgba(90,107,74,0.12)]" : "border-taupe-300/70"
      )}
    >
      {offer.badge && (
        <span className="absolute -top-3 left-7 rounded-full bg-sage-700 px-3 py-1 font-sans text-[10px] font-semibold uppercase tracking-[0.2em] text-cream-50">
          {offer.badge}
        </span>
      )}
      <div>
        <Heading className="font-serif text-2xl text-charcoal-900">{offer.name}</Heading>
        <p className="mt-3 flex flex-wrap items-baseline gap-x-2 gap-y-1">
          <span className="font-serif text-5xl leading-none text-sage-700">{offer.price}</span>
          {offer.unit && <span className="font-sans text-sm text-charcoal-800/70">{offer.unit}</span>}
        </p>
        {offer.perClass && <p className="mt-2 font-sans text-sm text-sage-700">{offer.perClass}</p>}
      </div>
      <p className="flex-1 font-sans text-sm leading-relaxed text-charcoal-800/80">{offer.detail}</p>
      <CtaLink href={offerHref(offer)} variant={featured ? "primary" : "outline"} className="w-full">
        {offer.cta}
      </CtaLink>
    </article>
  );
}
