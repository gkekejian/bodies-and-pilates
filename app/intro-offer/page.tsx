import { PageHero } from "@/components/sections/section-heading";
import { OfferCard } from "@/components/sections/offer-card";
import { ClassPassStrip } from "@/components/sections/classpass-strip";
import { Testimonials } from "@/components/sections/testimonials";
import { FaqTeaser } from "@/components/sections/faq-teaser";
import { FinalCta } from "@/components/sections/final-cta";
import { pageMetadata } from "@/lib/metadata";
import { breadcrumbSchema, jsonLd } from "@/lib/schema";
import { MEDIA } from "@/lib/media";
import { POLICY, TRY, offerHref, priceOf } from "@/lib/pricing";
import { CLASSPASS_RATING_LINE, CLASSPASS_URL, FIRST_CLASS_CTA } from "@/lib/site";
import { CtaLink } from "@/components/ui/cta-link";
import { SectionHeading } from "@/components/sections/section-heading";

/**
 * Landing page for all paid ad traffic (UTM-tagged links land here) and the
 * "pilates intro offer north hollywood" search. Booking buttons go straight
 * to the offer, never back to this page.
 */
export const metadata = pageMetadata({
  title: "$25 First Reformer Class in North Hollywood | Bodies and Pilates",
  description:
    "Try reformer Pilates in North Hollywood for $25: one 50-minute class, 7 people max, no experience needed. Grip socks required.",
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
            Come try a full class with us. It is 50 minutes on a professional Merrithew reformer, in a room of never
            more than 7, on Vineland Ave. An experienced instructor watches your form the whole time, so you do not
            need any experience. Take one class, or take a week and come as often as you like.
          </p>
          <p className="mt-5 text-center font-sans text-sm font-medium text-sage-700">
            <a href={CLASSPASS_URL} target="_blank" rel="noopener noreferrer" className="underline underline-offset-4 hover:text-sage-900">
              {CLASSPASS_RATING_LINE}
            </a>
          </p>
          <div className="mx-auto mt-12 grid max-w-[42rem] gap-6 sm:grid-cols-2">
            {TRY.map((offer) => (
              <OfferCard key={offer.id} offer={offer} accent="mauve" headingLevel="h2" />
            ))}
          </div>
          <p className="mx-auto mt-6 max-w-[42rem] text-center font-sans text-sm text-charcoal-800/80">{POLICY.cancellation}</p>
        </div>
      </section>

      <section aria-labelledby="after-intro-heading" className="bg-cream-50 py-16 sm:py-20">
        <div className="mx-auto max-w-4xl px-4 text-center sm:px-6 lg:px-8">
          <SectionHeading
            id="after-intro-heading"
            eyebrow="Next"
            title="After your intro"
            align="center"
            className="mb-8"
            intro={
              <p>
                Memberships start at {priceOf("membership-5")} a month for 5 classes. Our most popular is 8 classes for{" "}
                {priceOf("membership-8")}. {POLICY.membership}
              </p>
            }
          />
          <CtaLink href="/pricing" variant="outline">
            See every plan
          </CtaLink>
        </div>
      </section>

      <ClassPassStrip showClassPassBooking />
      <Testimonials />
      <FaqTeaser />
      <FinalCta href={offerHref(TRY[0])} cta={FIRST_CLASS_CTA} />
    </>
  );
}
