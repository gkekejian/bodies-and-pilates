import type { Metadata } from "next";
import { breadcrumbSchema } from "@/lib/breadcrumb";
import { PricingTabs } from "@/components/sections/pricing-tabs";

export const metadata: Metadata = {
  title: {
    absolute: "Pilates Class Pricing | North Hollywood | Bodies and Pilates",
  },
  description:
    "Transparent pricing for boutique Pilates classes in North Hollywood. First class $25, class packs from $36, unlimited memberships from $280/month.",
};

const breadcrumb = breadcrumbSchema([
  { name: "Home", url: "https://www.bodiesandpilates.com/" },
  { name: "Pricing", url: "https://www.bodiesandpilates.com/pricing" },
]);

export default function PricingPage() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumb) }}
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
