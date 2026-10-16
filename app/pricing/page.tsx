import { CtaLink } from "@/components/ui/cta-link";
import { PrivateShowcase } from "@/components/sections/class-media";
import { PageHero, SectionHeading } from "@/components/sections/section-heading";
import { OfferCard } from "@/components/sections/offer-card";
import { ClassPassStrip } from "@/components/sections/classpass-strip";
import { FirstTimerGuide } from "@/components/sections/first-timer-guide";
import { FinalCta } from "@/components/sections/final-cta";
import { pageMetadata } from "@/lib/metadata";
import { breadcrumbSchema, jsonLd } from "@/lib/schema";
import { COMMIT, FLEX, POLICY, PRICE_GROUPS, PRIVATE, TRY, offerHref } from "@/lib/pricing";
import { SITE_URL } from "@/lib/site";
import { MEDIA } from "@/lib/media";

export const metadata = pageMetadata({
  title: "Pilates Pricing & Memberships | Bodies and Pilates NoHo",
  description:
    "Pilates pricing in North Hollywood: $25 first class, $36 single, packs from $160, memberships from $130/month. No hidden fees. See every option.",
  path: "/pricing",
});

const firstClass = TRY[0];
const privateSession = PRIVATE.find((o) => o.id === "private")!;
const duet = PRIVATE.find((o) => o.id === "duet")!;
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

const container = "mx-auto max-w-5xl px-4 sm:px-6 lg:px-8";

/** The old site's pricing section title: a large light serif, left on a narrow centered column. */
function GroupHeading({ id, children, className }: { id: string; children: React.ReactNode; className?: string }) {
  return (
    <h2 id={id} className={`font-serif text-5xl font-light leading-[1.05] text-sage-900 sm:text-6xl ${className ?? ""}`}>
      {children}
    </h2>
  );
}

function GroupNote({ children }: { children: React.ReactNode }) {
  return <p className="mt-4 max-w-xl font-sans text-base leading-[1.8] text-charcoal-800/85">{children}</p>;
}

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
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: jsonLd(breadcrumb) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: jsonLd(firstClassOffer) }} />

      <PageHero
        display="Pricing"
        title="Pilates Pricing in North Hollywood"
        banner={MEDIA.studioReformersBoxes}
        action={<CtaLink href={offerHref(firstClass)}>{START_CTA}</CtaLink>}
        intro={
          <p>
            Every class is 50 minutes on a Merrithew reformer, with no more than 7 people in the room. New here? Start
            with an intro offer. After that, pick a class pack or a monthly membership. Private sessions and duets are
            at the bottom of the page.
          </p>
        }
      />

      {/* INTRO OFFERS */}
      <section aria-labelledby="try-heading" className="bg-cream-100 py-16 sm:py-20">
        <div className={container}>
          <GroupHeading id="try-heading">Intro Offers</GroupHeading>
          <GroupNote>For your first visit. Pick one.</GroupNote>
          <div className="mt-10 grid gap-6 sm:grid-cols-2 lg:max-w-[42rem]">
            {TRY.map((offer) => (
              <OfferCard key={offer.id} offer={offer} accent="mauve" />
            ))}
          </div>
          <p className="mt-8 font-sans text-sm leading-relaxed text-charcoal-800/80">
            Never tried reformer Pilates?{" "}
            <CtaLink href="/intro-offer" variant="text" className="ml-1">
              See how the $25 first class works
            </CtaLink>
          </p>
        </div>
      </section>

      {/* CLASS PACKS */}
      <section aria-labelledby="flex-heading" className="bg-cream-100 pb-16 sm:pb-20">
        <div className={container}>
          <GroupHeading id="flex-heading">Class Packs</GroupHeading>
          <GroupNote>No monthly commitment. Buy a pack and book when it suits you.</GroupNote>
          <div className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {FLEX.map((offer) => (
              <OfferCard key={offer.id} offer={offer} accent="sage" />
            ))}
          </div>
          <PolicyNotes lines={[POLICY.cancellation]} />
          {/*
            TODO(owner): confirm how long packs last after purchase and add one
            plain sentence here (e.g. "Packs expire N months after purchase.").
          */}
        </div>
      </section>

      {/* AUTO RENEW MEMBERSHIPS */}
      <section aria-labelledby="commit-heading" className="bg-cream-100 pb-16 sm:pb-24">
        <div className={container}>
          <GroupHeading id="commit-heading">Auto Renew Memberships</GroupHeading>
          <GroupNote>Renews each month. The best value if Pilates is part of your week.</GroupNote>
          <div className="mt-10 grid gap-6 pt-3 sm:grid-cols-2 lg:grid-cols-4">
            {COMMIT.map((offer) => (
              <OfferCard key={offer.id} offer={offer} accent="cocoa" />
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

      <ClassPassStrip showClassPassBooking />

      {/* DUETS AND PRIVATE SESSIONS */}
      <section aria-label="Duets and private sessions" className="bg-cream-100 py-16 sm:py-24">
        <div className={container}>
          <div className="grid gap-14 md:grid-cols-2 md:gap-10">
            {[
              { offer: duet, id: "duet-heading", title: "Duets", note: "Bring a friend or partner and share a session.", accent: "tan" as const, color: "text-taupe-700" },
              { offer: privateSession, id: "private-heading", title: "Private Sessions", note: "One-on-one on the reformer, built around you.", accent: "sage" as const, color: "" },
            ].map((g) => (
              <section key={g.id} aria-labelledby={g.id}>
                <GroupHeading id={g.id} className={g.color}>
                  {g.title}
                </GroupHeading>
                <GroupNote>{g.note}</GroupNote>
                <div className="mt-10 max-w-[20rem]">
                  <OfferCard offer={g.offer} accent={g.accent} />
                </div>
              </section>
            ))}
          </div>
          <PrivateShowcase />
        </div>
      </section>

      {/* All prices in one semantic table: easy for people to scan and for search and AI engines to extract. */}
      <section aria-labelledby="price-table-heading" className="bg-cream-50 py-20 sm:py-24">
        <div className={container}>
          <SectionHeading id="price-table-heading" eyebrow="At a Glance" title="All reformer Pilates prices" />
          <div className="overflow-x-auto" tabIndex={0} role="region" aria-label="Price table. Scroll sideways on small screens.">
            <table className="w-full min-w-[520px] border-collapse text-left font-sans text-sm">
              <caption className="sr-only">Bodies and Pilates prices in North Hollywood</caption>
              <thead>
                <tr className="border-b border-sage-700/40 text-xs uppercase tracking-[0.15em] text-charcoal-800/75">
                  <th scope="col" className="py-3 pr-4 font-medium">Option</th>
                  <th scope="col" className="py-3 pr-4 font-medium">Type</th>
                  <th scope="col" className="py-3 pr-4 font-medium">Price</th>
                  <th scope="col" className="py-3 font-medium">Per class</th>
                </tr>
              </thead>
              <tbody>
                {PRICE_GROUPS.flatMap(({ type, offers }) =>
                  offers.map((o) => (
                    <tr key={o.id} className="border-b border-taupe-300/70">
                      <th scope="row" className="py-3 pr-4 font-medium text-charcoal-900">
                        {o.name}
                      </th>
                      <td className="py-3 pr-4 text-charcoal-800/80">{type}</td>
                      <td className="py-3 pr-4 text-charcoal-900">
                        {o.price}
                        {o.unit ? ` ${o.unit}` : ""}
                      </td>
                      <td className="py-3 text-charcoal-800/80">{o.perClass ?? ""}</td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>
        </div>
      </section>

      <FirstTimerGuide />

      <FinalCta
        title="Start with the $25 first class."
        body="Meet the reformer and your instructor, and see what a class of 7 feels like. Then pick the plan that fits your week."
        cta={START_CTA}
        href={offerHref(firstClass)}
      />
    </>
  );
}
