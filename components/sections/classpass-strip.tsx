import { CtaLink } from "@/components/ui/cta-link";
import { offerHref, TRY } from "@/lib/pricing";
import { CLASSPASS_URL } from "@/lib/site";

const introWeek = TRY.find((o) => o.id === "intro-week")!;

/** `showClassPassBooking` adds the "Book on ClassPass" button (/pricing and /intro-offer). */
export function ClassPassStrip({ showClassPassBooking = false }: { showClassPassBooking?: boolean }) {
  return (
    <section aria-labelledby="classpass-heading" className="bg-sage-700 py-16 text-cream-50 sm:py-24">
      <div className="mx-auto grid max-w-6xl items-center gap-8 px-4 sm:px-6 lg:grid-cols-12 lg:px-8">
        <div className="lg:col-span-8">
          <h2 id="classpass-heading" className="font-serif text-4xl font-light leading-tight sm:text-5xl">
            Coming from ClassPass?
          </h2>
          <p className="mt-5 max-w-2xl font-sans text-base leading-[1.8] text-cream-50 sm:text-lg">
            Found us on ClassPass and want to keep coming? Book with us directly. Start with the $105 one-week
            unlimited, then pick a class pack or a membership that fits your week.
          </p>
        </div>
        <div className="flex flex-col items-start gap-4 lg:col-span-4 lg:items-end">
          <CtaLink href={offerHref(introWeek)} variant="light">
            Start the $105 Intro Week
          </CtaLink>
          {showClassPassBooking && (
            <CtaLink href={CLASSPASS_URL} variant="ghost-light" newTab>
              Book on ClassPass
            </CtaLink>
          )}
        </div>
      </div>
    </section>
  );
}
