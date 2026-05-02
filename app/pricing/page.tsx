import type { Metadata } from "next";
import { breadcrumbSchema } from "@/lib/breadcrumb";
import { PricingTabs } from "@/components/sections/pricing-tabs";
import { TrackedBuyLink } from "@/components/sections/tracked-buy-link";

export const metadata: Metadata = {
  title: {
    absolute: "Pilates Class Pricing in North Hollywood | $25 First Class",
  },
  description:
    "Pilates class pricing in North Hollywood. $25 first class. Single classes from $35, 5-packs, 10-packs, and unlimited memberships. Buy online.",
};

const breadcrumb = breadcrumbSchema([
  { name: "Home", url: "https://www.bodiesandpilates.com/" },
  { name: "Pricing", url: "https://www.bodiesandpilates.com/pricing" },
]);

const firstClassOffer = {
  "@context": "https://schema.org",
  "@type": "Offer",
  name: "First Pilates Class",
  description:
    "$25 first Pilates class for new clients in North Hollywood",
  price: "25",
  priceCurrency: "USD",
  availability: "https://schema.org/InStock",
  url: "https://www.bodiesandpilates.com/pricing",
  seller: {
    "@type": "LocalBusiness",
    name: "Bodies and Pilates",
  },
};

export default function PricingPage() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumb) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(firstClassOffer) }}
      />

      <div className="bg-cream-100 min-h-screen">
        {/* Hero */}
        <section className="bg-cream-200 py-14 sm:py-20">
          <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <h1 className="font-serif text-4xl sm:text-5xl text-charcoal-800 mb-4">
              Transparent Pricing
            </h1>
            <p className="font-sans text-lg text-charcoal-800/70 max-w-xl mx-auto">
              Start with a $25 first class, then find the membership or pack
              that fits your practice.
            </p>
          </div>
        </section>

        {/* Pinned $25 first-class hero card */}
        <section className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 pt-10 sm:pt-14">
          <div className="bg-cream-50 border-2 border-sage-500 rounded-2xl p-7 sm:p-10 shadow-sm flex flex-col md:flex-row md:items-center md:justify-between gap-6">
            <div className="flex-1">
              <p className="font-sans text-xs tracking-[0.22em] uppercase text-sage-700 mb-3">
                New Client Offer
              </p>
              <h2 className="font-serif text-3xl sm:text-4xl text-charcoal-900 leading-tight">
                Your first class is $25.
              </h2>
              <p className="font-sans text-base text-charcoal-800/80 mt-3 max-w-xl">
                One class, any format &mdash; reformer, mat, full body, or
                flexibility. No experience needed.
              </p>
            </div>
            <div className="flex flex-col items-stretch sm:items-start md:items-end gap-2 md:min-w-[16rem]">
              <TrackedBuyLink
                href="https://clients.mindbodyonline.com/classic/ws?studioid=5739427&stype=43&prodid=100010"
                itemName="First Class"
                price={25}
                className="inline-flex items-center justify-center bg-sage-700 hover:bg-sage-500 text-cream-50 font-sans font-semibold text-base px-7 py-4 rounded-lg transition-colors duration-200"
              >
                Buy Now &mdash; $25
              </TrackedBuyLink>
              <p className="font-sans text-xs text-charcoal-800/60 text-center md:text-right">
                Secure checkout via Mindbody.
              </p>
            </div>
          </div>
        </section>

        {/* Pricing tabs */}
        <section className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <PricingTabs />
        </section>

        {/* Policy note */}
        <section className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 pb-16">
          <div className="bg-cream-200 border border-taupe-300 rounded-xl p-6 text-center">
            <p className="font-sans text-sm text-charcoal-800/70">
              All sales are final. Classes are non-transferable or refundable.
              Membership credits must be used within the billing cycle and do
              not roll over.
            </p>
          </div>
        </section>
      </div>
    </>
  );
}
