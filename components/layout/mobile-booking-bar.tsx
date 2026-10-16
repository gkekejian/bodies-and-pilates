import { CtaLink } from "@/components/ui/cta-link";
import { FIRST_CLASS_CTA, introBookingHref } from "@/lib/site";

/**
 * Sticky booking bar on mobile, every page. Pure CSS so it costs no JS.
 * The root layout reserves matching bottom padding (see .pb-mobile-bar).
 */
export function MobileBookingBar() {
  return (
    <aside aria-label="Book your first class" className="fixed inset-x-0 bottom-0 z-40 border-t border-sage-900 bg-sage-700 px-4 pb-[calc(0.75rem+env(safe-area-inset-bottom))] pt-3 backdrop-blur-md md:hidden">
      <CtaLink href={introBookingHref()} variant="light" className="h-12 w-full">
        {FIRST_CLASS_CTA}
      </CtaLink>
    </aside>
  );
}
