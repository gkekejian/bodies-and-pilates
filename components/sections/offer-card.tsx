import { CtaLink } from "@/components/ui/cta-link";
import { offerHref, type Offer } from "@/lib/pricing";
import { cn } from "@/lib/utils";

/** Top-bar color per pricing group, matched to the old site's cards. */
export type OfferAccent = "mauve" | "sage" | "cocoa" | "tan";

const bar: Record<OfferAccent, string> = {
  mauve: "bg-mauve-600",
  sage: "bg-sage-700",
  cocoa: "bg-cocoa-700",
  tan: "bg-taupe-700",
};

/**
 * One pricing tier in the old site's card style: a colored top bar, the name
 * and price centered in light sans, and a full-width Book bar. One CTA.
 */
export function OfferCard({
  offer,
  accent = "sage",
  headingLevel = "h3",
  className,
}: {
  offer: Offer;
  accent?: OfferAccent;
  /** Kept for call sites from before the restyle; the badge alone marks the featured tier. */
  highlight?: boolean;
  headingLevel?: "h2" | "h3";
  className?: string;
}) {
  const Heading = headingLevel;
  return (
    <article
      className={cn(
        "flex h-full flex-col bg-cream-50 text-center shadow-[0_1px_3px_rgba(43,42,39,0.10),0_8px_24px_rgba(43,42,39,0.05)]",
        offer.badge && "ring-1 ring-sage-700",
        className
      )}
    >
      <div aria-hidden={offer.badge ? undefined : true} className={cn("flex min-h-6 items-center justify-center", bar[accent])}>
        {offer.badge && <span className="smallcaps py-1.5 text-[13px] text-cream-50">{offer.badge}</span>}
      </div>
      <div className="flex flex-1 flex-col items-center px-6 pb-7 pt-7">
        <Heading className="font-poppins text-2xl font-light leading-snug text-charcoal-800">{offer.name}</Heading>
        <p className="mt-5 whitespace-nowrap font-poppins text-[3.25rem] font-extralight leading-none text-sage-900">
          {offer.price}
          {/* The old site's short "/mo". The data keeps "/month" for the pricing guard. */}
          {offer.unit === "/month" && (
            <>
              <span aria-hidden="true" className="text-2xl">/mo</span>
              <span className="sr-only"> per month</span>
            </>
          )}
        </p>
        {offer.unit && offer.unit !== "/month" && (
          <p className="mt-2 font-poppins text-lg font-light text-charcoal-800/80">{offer.unit}</p>
        )}
        {offer.perClass && <p className="mt-2 font-sans text-sm text-charcoal-800/80">{offer.perClass}</p>}
        <p className="mt-5 flex-1 font-sans text-sm leading-relaxed text-charcoal-800/80">{offer.detail}</p>
      </div>
      <CtaLink
        href={offerHref(offer)}
        variant="cocoa"
        className="w-full px-4 font-accent text-[13px] normal-case tracking-[0.08em]"
      >
        {offer.cta}
      </CtaLink>
    </article>
  );
}
