import { CtaLink } from "@/components/ui/cta-link";
import { offerHref, type Offer } from "@/lib/pricing";
import { cn } from "@/lib/utils";

/** Pricing group colors, sampled from the old pricing page (pricing-1 to pricing-3). */
export type OfferAccent = "mauve" | "sage" | "cocoa" | "tan";

const bar: Record<OfferAccent, string> = {
  mauve: "bg-wix-intro",
  sage: "bg-wix-sage",
  cocoa: "bg-wix-cocoa",
  tan: "bg-wix-duet",
};

// Name, price and unit use the group color, as on the old cards. All of them
// are set at 24px or more, where the sampled colors pass 3:1.
const ink: Record<OfferAccent, string> = {
  mauve: "text-wix-intro",
  sage: "text-wix-sage",
  cocoa: "text-wix-cocoa",
  tan: "text-wix-duet",
};

/**
 * One pricing tier in the old site's card style: a colored top bar, the name
 * and price centered in light Poppins, and a full-width "Book Now" bar. The
 * offer name rides along for screen readers and the booking event label.
 */
export function OfferCard({
  offer,
  accent = "sage",
  headingLevel = "h3",
  tint = "pricing",
  showDetail = false,
  className,
}: {
  offer: Offer;
  accent?: OfferAccent;
  /** Kept for call sites from before the restyle; the badge alone marks the featured tier. */
  highlight?: boolean;
  headingLevel?: "h2" | "h3";
  /** Card body: the pricing cream, or the blush the old duet and private cards use. */
  tint?: "pricing" | "blush";
  /** The old cards carry no description; pages that need one opt in. */
  showDetail?: boolean;
  className?: string;
}) {
  const Heading = headingLevel;
  const monthly = offer.unit === "/month";
  return (
    <article
      className={cn(
        "flex h-full flex-col text-center shadow-[0_1px_4px_rgba(0,0,0,0.16)]",
        tint === "blush" ? "bg-wix-blush" : "bg-wix-pricing",
        className
      )}
    >
      <div aria-hidden={offer.badge ? undefined : true} className={cn("flex min-h-[24px] items-center justify-center", bar[accent])}>
        {offer.badge && <span className="smallcaps py-1 text-[13px] text-white">{offer.badge}</span>}
      </div>
      <div className={cn("flex flex-1 flex-col items-center px-3 pb-6 pt-5", ink[accent])}>
        <Heading className="flex min-h-[2.9em] items-center text-balance font-poppins text-[1.6rem] font-light leading-[1.45] sm:text-[1.85rem]">
          {offer.name}
        </Heading>
        <p className="whitespace-nowrap pt-4 font-poppins text-[3.1rem] font-light leading-none sm:text-[3.5rem]">
          {offer.price}
          {monthly && (
            <>
              <span aria-hidden="true" className="text-[1.6rem]">/mo</span>
              <span className="sr-only"> per month</span>
            </>
          )}
        </p>
        {offer.unit && !monthly && <p className="mt-3 font-poppins text-[1.6rem] font-light leading-tight">{offer.unit}</p>}
        {offer.perClass && <p className="mt-2 font-poppins text-base text-wix-cocoa">{offer.perClass}</p>}
        {offer.intro && <p className="mt-2 font-poppins text-sm text-wix-cocoa">First-timers only</p>}
        {showDetail && <p className="mt-4 font-sans text-sm leading-relaxed text-charcoal-800/80">{offer.detail}</p>}
      </div>
      <CtaLink href={offerHref(offer)} variant="cocoa" className="min-h-[40px] w-full px-3 py-2 text-[15px]">
        Book Now<span className="sr-only">: {offer.name}</span>
      </CtaLink>
    </article>
  );
}
