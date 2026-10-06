import { CtaLink } from "@/components/ui/cta-link";
import { OwnerPlaceholder } from "@/components/ui/placeholder";
import { PageHero, SectionHeading } from "@/components/sections/section-heading";
import { OfferCard } from "@/components/sections/offer-card";
import { ClassPassStrip } from "@/components/sections/classpass-strip";
import { LeadCapture } from "@/components/sections/lead-capture";
import { FinalCta } from "@/components/sections/final-cta";
import { pageMetadata } from "@/lib/metadata";
import { breadcrumbSchema } from "@/lib/schema";
import { COMMIT, FLEX, PRIVATE, TRY, offerHref } from "@/lib/pricing";
import { SITE_URL } from "@/lib/site";

export const metadata = pageMetadata({
  title: "Pilates Class Pricing in North Hollywood | $25 First Class",
  description:
    "Reformer Pilates pricing in North Hollywood: $25 first class, $105 intro week, packs from $36, memberships from $170/month. Start with the $25 first class.",
  path: "/pricing",
});

const firstClass = TRY[0];
const START_CTA = "Start with the $25 first class";

const breadcrumb = breadcrumbSchema([
  { name: "Home", path: "/" },
  { name: "Pricing", path: "/pricing" },
]);

const firstClassOffer = {
  "@context": "https://schema.org",
  "@type": "Offer",
  name: "First Reformer Pilates Class",
  description: "$25 first reformer Pilates class for new clients in North Hollywood",
  price: "25",
  priceCurrency: "USD",
  availability: "https://schema.org/InStock",
  url: `${SITE_URL}/pricing`,
  seller: { "@id": `${SITE_URL}/#gym` },
};

const container = "mx-auto max-w-6xl px-4 sm:px-6 lg:px-8";

export default function PricingPage() {
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumb) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(firstClassOffer) }} />

      <PageHero
        eyebrow="Pricing · North Hollywood"
        title="Reformer Pilates Pricing"
        intro={
          <p>
            Three simple paths: try the studio, commit with a membership, or stay flexible with a class pack. Private
            training is priced separately below.
          </p>
        }
      >
        <CtaLink href={offerHref(firstClass)}>{START_CTA}</CtaLink>
      </PageHero>

      {/* TRY */}
      <section aria-labelledby="try-heading" className="bg-cream-50 py-20 sm:py-24">
        <div className={container}>
          <SectionHeading
            id="try-heading"
            eyebrow="Try"
            title="New to the studio"
            intro={<p>For first-timers. Pick one.</p>}
          />
          <div className="grid gap-8 md:grid-cols-2">
            {TRY.map((offer, i) => (
              <OfferCard key={offer.id} offer={offer} highlight={i === 0} />
            ))}
          </div>
        </div>
      </section>

      <ClassPassStrip showClassPassBooking />

      {/* COMMIT */}
      <section aria-labelledby="commit-heading" className="bg-cream-100 py-20 sm:py-24">
        <div className={container}>
          <SectionHeading
            id="commit-heading"
            eyebrow="Commit"
            title="Memberships"
            intro={<p>Monthly auto-renew. The best value if Pilates is part of your week.</p>}
          />
          <div className="grid gap-8 lg:grid-cols-12">
            <div className="grid gap-8 pt-3 md:grid-cols-2 lg:col-span-8">
              {COMMIT.map((offer) => (
                <OfferCard key={offer.id} offer={offer} />
              ))}
            </div>
            <aside className="flex flex-col gap-5 lg:col-span-4 lg:pt-3">
              <div className="rounded-sm border border-taupe-300/70 bg-cream-50 p-7">
                <h3 className="font-serif text-xl text-charcoal-900">Pausing or canceling</h3>
                {/*
                  TODO(owner): confirm the exact membership pause and cancel
                  terms (notice period, how to request, any fees) and replace
                  this placeholder with plain-language text.
                */}
                <OwnerPlaceholder label="membership pause and cancel terms" className="mt-4">
                  Owner to confirm the exact terms, written in plain language.
                </OwnerPlaceholder>
              </div>
              <p className="font-sans text-sm leading-relaxed text-charcoal-800/80">
                Not sure yet?{" "}
                <CtaLink href={offerHref(firstClass)} variant="text" className="ml-1">
                  {START_CTA}
                </CtaLink>
              </p>
            </aside>
          </div>
        </div>
      </section>

      {/* FLEX */}
      <section aria-labelledby="flex-heading" className="bg-cream-50 py-20 sm:py-24">
        <div className={container}>
          <SectionHeading
            id="flex-heading"
            eyebrow="Flex"
            title="Class Packs"
            intro={<p>No monthly commitment. Buy a pack and book when it suits you.</p>}
          />
          <div className="grid gap-8 md:grid-cols-3">
            {FLEX.map((offer) => (
              <OfferCard key={offer.id} offer={offer} />
            ))}
          </div>
          {/*
            TODO(owner): confirm how long packs last after purchase and replace
            this placeholder with one plain sentence (e.g. "Packs expire N
            months after purchase.").
          */}
          <OwnerPlaceholder label="class pack expiry" className="mt-8 max-w-xl">
            Owner to confirm how long each pack is valid after purchase.
          </OwnerPlaceholder>
        </div>
      </section>

      {/* PRIVATE TRAINING */}
      <section aria-labelledby="private-heading" className="bg-cream-200 py-20 sm:py-24">
        <div className={container}>
          <SectionHeading
            id="private-heading"
            eyebrow="One-on-One"
            title="Private Training"
            intro={<p>Reformer sessions built entirely around you, solo or with a partner.</p>}
          />
          <div className="grid gap-8 md:grid-cols-2">
            {PRIVATE.map((offer) => (
              <OfferCard key={offer.id} offer={offer} highlight={false} />
            ))}
          </div>
        </div>
      </section>

      <LeadCapture source="pricing" />

      <FinalCta
        title="Start with the $25 first class."
        body="Meet the reformer, meet your instructor, and see how a small class feels. Then choose the plan that fits."
        cta={START_CTA}
        href={offerHref(firstClass)}
      />
    </>
  );
}
