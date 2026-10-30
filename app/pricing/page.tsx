import Link from "next/link";
import { CtaLink } from "@/components/ui/cta-link";
import { PageHero } from "@/components/sections/section-heading";
import { OfferCard, type OldCardLabel } from "@/components/sections/offer-card";
import { pageMetadata } from "@/lib/metadata";
import { breadcrumbSchema, jsonLd } from "@/lib/schema";
import { COMMIT, FLEX, PRICE_GROUPS, PRIVATE, TRY } from "@/lib/pricing";
import { SITE_URL } from "@/lib/site";
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

// pricing-1 to pricing-3, mirrored: a 960px column on the theme cream, a
// large light serif title per group, and 226px cards 18px apart. Nothing sits
// between the groups, as on the old page.
const container = "mx-auto max-w-[992px] px-4";
const cards = "mt-6 grid grid-cols-2 gap-[18px] sm:grid-cols-[repeat(auto-fill,226px)]";

/**
 * The old cards' labels (pricing-1 to pricing-3), keyed by offer id. Display
 * only: prices, links and tracking come from lib/pricing.ts unchanged. The
 * Duets card led with the $140 for two, with the $70 per-person price under it.
 */
const OLD_LABEL: Record<string, OldCardLabel> = {
  "first-class": { name: "First Class" },
  "intro-week": { name: "1 Week Unlimited" },
  single: { name: "Single Class" },
  "pack-5": { name: "5 Pack" },
  "pack-10": { name: "10 Pack" },
  "membership-5": { name: "5 Classes", sub: "$26/class" },
  "membership-8": { name: "8 Classes", sub: "~$21/class" },
  "membership-12": { name: "12 Classes", sub: "~$18/class" },
  "membership-unlimited": { name: "Unlimited", sub: "~$10/class" },
  duet: { name: null, price: "$140", priceLabel: " for two", sub: ["$70", "Per-Person"] },
  private: { name: null, sub: ["55-min", "Sessions"] },
};

/** The old site's group title: a large light serif. */
function GroupHeading({ id, children }: { id: string; children: React.ReactNode }) {
  return (
    <h2 id={id} className="font-serif text-5xl font-light leading-[1.05] tracking-[-0.01em] text-theme-brown sm:text-[3.6rem]">
      {children}
    </h2>
  );
}

export default function PricingPage() {
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: jsonLd(breadcrumb) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: jsonLd(firstClassOffer) }} />

      <PageHero
        display="Pricing"
        title="Classes of seven or fewer on Merrithew reformers, starting with a $25 first class"
        banner={STOCK.groupSideBend}
        focus="object-[50%_62%]"
        action={
          <CtaLink href="/schedule" className="min-w-[206px] px-10 text-[19px]">
            Book Now
          </CtaLink>
        }
      />

      <div className="bg-theme-cream pb-16 pt-12 sm:pb-20">
        {[
          { id: "try-heading", title: "Intro Offers", offers: TRY },
          { id: "flex-heading", title: "Class Packs", offers: FLEX },
          { id: "commit-heading", title: "Auto Renew Memberships", offers: COMMIT },
        ].map((g, i) => (
          <section key={g.id} aria-labelledby={g.id} className={`${container} ${i ? "mt-14 sm:mt-16" : ""}`}>
            <GroupHeading id={g.id}>{g.title}</GroupHeading>
            <div className={cards}>
              {g.offers.map((offer) => (
                <OfferCard key={offer.id} offer={offer} old={OLD_LABEL[offer.id]} wholeCard />
              ))}
            </div>
          </section>
        ))}

        {/* Duets and Private Sessions side by side; the second column starts
            at the third card's position, as on pricing-3-bottom.png. */}
        <div className={`${container} mt-14 grid gap-14 sm:mt-16 md:grid-cols-[488px_1fr] md:gap-0`}>
          {[
            { offer: duet, id: "duet-heading", title: "Duets" },
            { offer: privateSession, id: "private-heading", title: "Private Sessions" },
          ].map((g) => (
            <section key={g.id} aria-labelledby={g.id}>
              <GroupHeading id={g.id}>{g.title}</GroupHeading>
              <div className="mt-6 w-[226px] max-w-full">
                <OfferCard offer={g.offer} old={OLD_LABEL[g.offer.id]} wholeCard />
              </div>
            </section>
          ))}
        </div>

        {/* Below Private Sessions, in the same style: the one line with no
            other home (first-timer eligibility, PR #9), a pointer to the FAQ
            for the policies, and every price in one table for people and
            for search and AI engines. */}
        <section aria-labelledby="price-table-heading" className={`${container} mt-20 sm:mt-24`}>
          <GroupHeading id="price-table-heading">All Prices</GroupHeading>
          <p className="mt-5 max-w-xl font-poppins text-base font-light leading-[1.7] text-theme-dark">
            New to the studio?{" "}
            <Link href="/intro-offer" className="underline underline-offset-4 hover:text-theme-brown">
              Start with the $25 first class
            </Link>
            . You can still take the $105 intro week after it.
          </p>
          <p className="mt-2 font-poppins text-base font-light leading-[1.7] text-theme-dark">
            Questions about cancelling, pack expiry or pausing a membership?{" "}
            <Link href="/faq" className="underline underline-offset-4 hover:text-theme-brown">
              Our FAQs have the answers
            </Link>
            .
          </p>
          <div className="mt-8 overflow-x-auto" tabIndex={0} role="region" aria-label="Price table. Scroll sideways on small screens.">
            <table className="w-full min-w-[520px] border-collapse text-left font-poppins text-[15px] font-light text-theme-dark">
              <caption className="sr-only">Bodies and Pilates prices in North Hollywood</caption>
              <thead>
                <tr className="border-b border-theme-dark/40 text-xs uppercase tracking-[0.15em]">
                  <th scope="col" className="py-3 pr-4 font-normal">Option</th>
                  <th scope="col" className="py-3 pr-4 font-normal">Type</th>
                  <th scope="col" className="py-3 pr-4 font-normal">Price</th>
                  <th scope="col" className="py-3 font-normal">Per class</th>
                </tr>
              </thead>
              <tbody>
                {PRICE_GROUPS.flatMap(({ type, offers }) =>
                  offers.map((o) => (
                    <tr key={o.id} className="border-b border-theme-tan/70">
                      <th scope="row" className="py-3 pr-4 font-normal">
                        {o.name}
                      </th>
                      <td className="py-3 pr-4">{type}</td>
                      <td className="py-3 pr-4">
                        {o.price}
                        {o.unit ? ` ${o.unit}` : ""}
                      </td>
                      <td className="py-3">{o.perClass ?? ""}</td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>
        </section>
      </div>
    </>
  );
}
