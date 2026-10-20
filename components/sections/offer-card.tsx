import { CtaLink } from "@/components/ui/cta-link";
import { offerHref, type Offer } from "@/lib/pricing";
import { cn } from "@/lib/utils";

/**
 * One pricing tier in the old site's card style (pricing-1 to pricing-3, theme
 * colors from the Wix editor): a light tan face, a darker top strip, the name
 * and price centered in light Poppins, and a dark brown "Book Now" strip along
 * the bottom. The offer name rides along for screen readers and the booking
 * event label.
 */
export function OfferCard({
  offer,
  headingLevel = "h3",
  showDetail = false,
  className,
}: {
  offer: Offer;
  headingLevel?: "h2" | "h3";
  /** The old cards carry no description; pages that need one opt in. */
  showDetail?: boolean;
  className?: string;
}) {
  const Heading = headingLevel;
  const monthly = offer.unit === "/month";
  return (
    <article className={cn("flex h-full flex-col bg-theme-sand text-center text-theme-dark shadow-[0_1px_4px_rgba(0,0,0,0.16)]", className)}>
      {/* The badge is set bold at 19px: large text, where white on the strip passes 3:1. */}
      <div aria-hidden={offer.badge ? undefined : true} className="flex min-h-[24px] items-center justify-center bg-theme-brown">
        {offer.badge && <span className="py-1 font-accent text-[19px] font-bold leading-tight text-white">{offer.badge}</span>}
      </div>
      <div className="flex flex-1 flex-col items-center px-3 pb-6 pt-5">
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
        {offer.perClass && <p className="mt-2 font-poppins text-base">{offer.perClass}</p>}
        {offer.intro && <p className="mt-2 font-poppins text-sm">First-timers only</p>}
        {showDetail && <p className="mt-4 font-sans text-sm leading-relaxed text-theme-ink/80">{offer.detail}</p>}
      </div>
      <CtaLink href={offerHref(offer)} variant="cocoa" className="min-h-[40px] w-full px-3 py-2 text-[15px]">
        Book Now<span className="sr-only">: {offer.name}</span>
      </CtaLink>
    </article>
  );
}
