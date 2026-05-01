import type { Metadata } from "next";
import { breadcrumbSchema } from "@/lib/breadcrumb";
import { PricingTabs } from "@/components/sections/pricing-tabs";

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
