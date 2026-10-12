import { CtaLink } from "@/components/ui/cta-link";
import { OwnerPlaceholder } from "@/components/ui/placeholder";
import { PageHero, SectionHeading } from "@/components/sections/section-heading";
import { OfferCard } from "@/components/sections/offer-card";
import { ClassPassStrip } from "@/components/sections/classpass-strip";
import { LeadCapture } from "@/components/sections/lead-capture";
import { FinalCta } from "@/components/sections/final-cta";
import { pageMetadata } from "@/lib/metadata";
import { breadcrumbSchema } from "@/lib/schema";
import { COMMIT, FLEX, POLICY, PRIVATE, TRY, offerHref } from "@/lib/pricing";
import { SITE_URL } from "@/lib/site";

export const metadata = pageMetadata({
  title: "Pilates Class Pricing in North Hollywood | $25 First Class",
  description:
    "Reformer Pilates pricing in North Hollywood: $25 first class, $105 intro week, packs from $36, memberships from $130/month. Start with the $25 first class.",
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

function PolicyNotes({ lines }: { lines: string[] }) {
  return (
    <ul className="mt-8 space-y-1.5 font-sans text-sm text-charcoal-800/80">
      {lines.map((line) => (
        <li key={line}>{line}</li>
      ))}
    </ul>
  );
}

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
          <div className="grid gap-8 pt-3 sm:grid-cols-2">
            {COMMIT.map((offer) => (
              <OfferCard key={offer.id} offer={offer} />
            ))}
          </div>
          <PolicyNotes lines={[POLICY.membership, POLICY.cancellation]} />
          <p className="mt-6 font-sans text-sm leading-relaxed text-charcoal-800/80">
            Not sure yet?{" "}
            <CtaLink href={offerHref(firstClass)} variant="text" className="ml-1">
              {START_CTA}
            </CtaLink>
          </p>
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
          <PolicyNotes lines={[POLICY.cancellation]} />
          {/*
            TODO(owner): confirm how long packs last after purchase and replace
            this placeholder with one plain sentence (e.g. "Packs expire N
            months after purchase.").
          */}
          <OwnerPlaceholder label="class pack expiry" className="mt-6 max-w-xl">
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
