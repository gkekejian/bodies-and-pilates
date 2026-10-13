import { MediaPhoto } from "@/components/ui/media";
import { eyebrowClass } from "@/components/sections/section-heading";
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

      <section className="bg-cream-100 py-14 sm:py-20">
        <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
          <div className="grid items-end gap-10 lg:grid-cols-12">
            <div className="lg:col-span-7">
              <p className={`${eyebrowClass} mb-6`}>New Client Offer &middot; North Hollywood</p>
              <h1 className="font-serif text-4xl leading-[1.08] text-charcoal-900 sm:text-5xl lg:text-6xl">
                Your First Reformer Class Is $25
              </h1>
              <p className="mt-7 max-w-xl font-sans text-lg leading-[1.65] text-charcoal-800/85">
                Small-group reformer Pilates on Vineland Ave, coached by an instructor who watches your form the whole
                time. No experience needed. Choose one class, or a full week to find your rhythm.
              </p>
            </div>
            {MEDIA.classKneelingLegPress && (
              <div className="hidden lg:col-span-5 lg:block">
                <MediaPhoto media={MEDIA.classKneelingLegPress} sizes="40vw" />
              </div>
            )}
          </div>

          <div className="mt-12 grid gap-8 md:grid-cols-2">
            {TRY.map((offer, i) => (
              <OfferCard key={offer.id} offer={offer} highlight={i === 0} headingLevel="h2" />
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
