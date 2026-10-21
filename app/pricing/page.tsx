import { CtaLink } from "@/components/ui/cta-link";
import { PageHero, SectionHeading } from "@/components/sections/section-heading";
import { OfferCard } from "@/components/sections/offer-card";
import { ClassPassStrip } from "@/components/sections/classpass-strip";
import { FirstTimerGuide } from "@/components/sections/first-timer-guide";
import { pageMetadata } from "@/lib/metadata";
import { breadcrumbSchema, jsonLd } from "@/lib/schema";
import { COMMIT, FLEX, POLICY, PRICE_GROUPS, PRIVATE, TRY } from "@/lib/pricing";
import { CLASSPASS_RATING_LINE, CLASSPASS_URL, SITE_URL } from "@/lib/site";
import { STOCK } from "@/lib/media";

export const metadata = pageMetadata({
  title: "Reformer Pilates Prices, North Hollywood | Bodies and Pilates",
  description:
    "Reformer Pilates prices in North Hollywood: $25 first class, $36 single, packs from $160, memberships from $130/month. Pause anytime.",
  path: "/pricing",
});

const privateSession = PRIVATE.find((o) => o.id === "private")!;
const duet = PRIVATE.find((o) => o.id === "duet")!;

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

// pricing-1 to pricing-3: a 960px column on the theme cream, light serif
// group titles in the theme's medium brown (large text, 3:1), and 226px cards
// 18px apart.
const container = "mx-auto max-w-[992px] px-4 sm:px-4";
const cards = "mt-6 grid grid-cols-2 gap-[18px] sm:grid-cols-[repeat(auto-fill,226px)]";

/** The old site's group title: a large light serif. */
function GroupHeading({ id, children, className }: { id: string; children: React.ReactNode; className?: string }) {
  return (
    <h2 id={id} className={`font-serif text-5xl font-light leading-[1.05] tracking-[-0.01em] sm:text-[3.6rem] ${className ?? ""}`}>
      {children}
    </h2>
  );
}

function GroupNote({ children }: { children: React.ReactNode }) {
  return <p className="mt-3 max-w-xl font-sans text-sm leading-[1.7] text-charcoal-800/80">{children}</p>;
}

function PolicyNotes({ lines }: { lines: string[] }) {
  return (
    <ul className="mt-6 space-y-1 font-sans text-sm text-charcoal-800/80">
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
        banner={STOCK.groupSideBend}
        focus="object-[50%_62%]"
        action={
          <CtaLink href="/schedule" className="min-w-[206px] px-10 text-[19px]">
            Book Now
          </CtaLink>
        }
      />

      <div className="bg-theme-cream pb-20 pt-12 sm:pb-24 sm:pt-12">
        {/* INTRO OFFERS */}
        <section aria-labelledby="try-heading" className={container}>
          <GroupHeading id="try-heading" className="text-theme-brown">
            Intro Offers
          </GroupHeading>
          <GroupNote>
            For your first visit. Start with the $25 first class if you like. You can still take the $105 intro week after
            it.
          </GroupNote>
          <p className="mt-1 font-sans text-sm font-medium text-brown-700">
            <a href={CLASSPASS_URL} target="_blank" rel="noopener noreferrer" className="underline underline-offset-4 hover:text-brown-900">
              {CLASSPASS_RATING_LINE}
            </a>
          </p>
          <div className={cards}>
            {TRY.map((offer) => (
              <OfferCard key={offer.id} offer={offer} />
            ))}
          </div>
          <p className="mt-6 font-sans text-sm leading-relaxed text-charcoal-800/80">
            Never tried reformer Pilates?{" "}
            <CtaLink href="/intro-offer" variant="text" className="ml-1">
              See how the $25 first class works
            </CtaLink>
          </p>
        </section>

        {/* CLASS PACKS */}
        <section aria-labelledby="flex-heading" className={`${container} mt-16 sm:mt-20`}>
          <GroupHeading id="flex-heading" className="text-theme-brown">
            Class Packs
          </GroupHeading>
          <div className={cards}>
            {FLEX.map((offer) => (
              <OfferCard key={offer.id} offer={offer} />
            ))}
          </div>
          <PolicyNotes lines={[POLICY.cancellation, "Class packs expire 3 months after purchase."]} />
        </section>

        {/* AUTO RENEW MEMBERSHIPS */}
        <section aria-labelledby="commit-heading" className={`${container} mt-16 sm:mt-20`}>
          <GroupHeading id="commit-heading" className="text-theme-brown">
            Auto Renew Memberships
          </GroupHeading>
          <div className={`${cards} pt-2`}>
            {COMMIT.map((offer) => (
              <OfferCard key={offer.id} offer={offer} />
            ))}
          </div>
          <PolicyNotes lines={[POLICY.membership]} />
        </section>

        {/* DUETS AND PRIVATE SESSIONS, side by side as on pricing-3-bottom.png */}
        <div className={`${container} mt-16 grid gap-14 sm:mt-20 md:grid-cols-2 md:gap-6`}>
          {[
            { offer: duet, id: "duet-heading", title: "Duets" },
            { offer: privateSession, id: "private-heading", title: "Private Sessions" },
          ].map((g) => (
            <section key={g.id} aria-labelledby={g.id}>
              <GroupHeading id={g.id} className="text-theme-brown">
                {g.title}
              </GroupHeading>
              <div className="mt-6 w-[226px] max-w-full">
                <OfferCard offer={g.offer} />
              </div>
            </section>
          ))}
        </div>
      </div>

      <ClassPassStrip showClassPassBooking />

      {/* All prices in one semantic table: easy for people to scan and for search and AI engines to extract. */}
      <section aria-labelledby="price-table-heading" className="bg-cream-50 py-20 sm:py-24">
        <div className={container}>
          <SectionHeading id="price-table-heading" eyebrow="At a Glance" title="All reformer Pilates prices" />
          <div className="overflow-x-auto" tabIndex={0} role="region" aria-label="Price table. Scroll sideways on small screens.">
            <table className="w-full min-w-[520px] border-collapse text-left font-sans text-sm">
              <caption className="sr-only">Bodies and Pilates prices in North Hollywood</caption>
              <thead>
                <tr className="border-b border-brown-700/40 text-xs uppercase tracking-[0.15em] text-charcoal-800/75">
                  <th scope="col" className="py-3 pr-4 font-medium">Option</th>
                  <th scope="col" className="py-3 pr-4 font-medium">Type</th>
                  <th scope="col" className="py-3 pr-4 font-medium">Price</th>
                  <th scope="col" className="py-3 font-medium">Per class</th>
                </tr>
              </thead>
              <tbody>
                {PRICE_GROUPS.flatMap(({ type, offers }) =>
                  offers.map((o) => (
                    <tr key={o.id} className="border-b border-tan-300/70">
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


    </>
  );
}
