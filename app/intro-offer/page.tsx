import { PageHero } from "@/components/sections/section-heading";
import { OfferCard } from "@/components/sections/offer-card";
import { ClassPassStrip } from "@/components/sections/classpass-strip";
import { Testimonials } from "@/components/sections/testimonials";
import { FaqTeaser } from "@/components/sections/faq-teaser";
import { FinalCta } from "@/components/sections/final-cta";
import { pageMetadata } from "@/lib/metadata";
import { breadcrumbSchema, jsonLd } from "@/lib/schema";
import { MEDIA } from "@/lib/media";
import { TRY, offerHref } from "@/lib/pricing";
import { FIRST_CLASS_CTA } from "@/lib/site";

/**
 * Landing page for all paid ad traffic (UTM-tagged links land here) and the
 * "pilates intro offer north hollywood" search. Booking buttons go straight
 * to the offer, never back to this page.
 */
export const metadata = pageMetadata({
  title: "First Pilates Class $25 | Bodies and Pilates",
  description:
    "Try reformer Pilates in North Hollywood for $25. One full 50-minute small-group class, no experience needed. Grip socks required. Book your first class today.",
  path: "/intro-offer",
});

const breadcrumb = breadcrumbSchema([
  { name: "Home", path: "/" },
  { name: "Intro Offer", path: "/intro-offer" },
]);

export default function IntroOfferPage() {
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: jsonLd(breadcrumb) }} />

      <PageHero
        eyebrow="New Client Offer · North Hollywood"
        title="Your First Reformer Class Is $25"
        banner={MEDIA.classPlankRow}
        tone="sage"
      />

      <section aria-label="Intro offers" className="bg-cream-100 py-16 sm:py-20">
        <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8">
          <p className="mx-auto max-w-2xl text-center font-sans text-base leading-[1.8] text-charcoal-800/85 sm:text-lg">
            Come try a full class with us. It is 50 minutes on a Merrithew reformer, in a room of no more than 7, on
            Vineland Ave. Your instructor watches your form the whole time, so you do not need any experience. Take one
            class, or take a week and come as often as you like.
          </p>
          <div className="mx-auto mt-12 grid max-w-[42rem] gap-6 sm:grid-cols-2">
            {TRY.map((offer) => (
              <OfferCard key={offer.id} offer={offer} accent="mauve" headingLevel="h2" />
            ))}
          </div>
        </div>
      </section>

      <ClassPassStrip showClassPassBooking />
      <Testimonials />
      <FaqTeaser />
      <FinalCta href={offerHref(TRY[0])} cta={FIRST_CLASS_CTA} />
    </>
  );
}
