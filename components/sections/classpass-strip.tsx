import { CtaLink } from "@/components/ui/cta-link";
import { offerHref, TRY } from "@/lib/pricing";

const introWeek = TRY.find((o) => o.id === "intro-week")!;

export function ClassPassStrip() {
  return (
    <section aria-labelledby="classpass-heading" className="bg-sage-700 py-16 text-cream-50 sm:py-20">
      <div className="mx-auto grid max-w-6xl items-center gap-8 px-4 sm:px-6 lg:grid-cols-12 lg:px-8">
        <div className="lg:col-span-8">
          <h2 id="classpass-heading" className="font-serif text-3xl leading-tight sm:text-4xl">
            Coming from ClassPass?
          </h2>
          <p className="mt-5 max-w-2xl font-sans text-base leading-[1.75] text-cream-100/90 sm:text-lg">
            Booked us on ClassPass and loved it? Coming direct is the better deal. Start with the $105 one-week
            unlimited, then pick the plan that fits. Members get the same instructor each week, a saved reformer,
            progress tracking, and priority booking. ClassPass cannot give you any of that.
          </p>
        </div>
        <div className="lg:col-span-4 lg:text-right">
          <CtaLink href={offerHref(introWeek)} variant="light">
            Start the $105 Intro Week
          </CtaLink>
        </div>
      </div>
    </section>
  );
}
