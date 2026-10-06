import type { Metadata } from "next";
import { CtaLink } from "@/components/ui/cta-link";
import { eyebrowClass } from "@/components/sections/section-heading";
import { FIRST_CLASS_CTA, introBookingHref } from "@/lib/site";

export const metadata: Metadata = {
  title: { absolute: "Page Not Found | Bodies and Pilates" },
  description: "This page has moved. Explore reformer Pilates classes in North Hollywood, or book your $25 first class.",
  robots: { index: false, follow: true },
};

export default function NotFound() {
  return (
    <section className="bg-cream-100 py-24 sm:py-32">
      <div className="mx-auto max-w-3xl px-4 text-center sm:px-6 lg:px-8">
        <p className={`${eyebrowClass} mb-6`}>404</p>
        <h1 className="font-serif text-4xl leading-[1.1] text-charcoal-900 sm:text-5xl">
          This page has stepped off the reformer.
        </h1>
        <p className="mx-auto mt-7 max-w-xl font-sans text-lg leading-[1.7] text-charcoal-800/85">
          The page you are looking for has moved or no longer exists. The studio is right where it was, and your first
          class is still $25.
        </p>
        <div className="mt-10 flex flex-col items-center justify-center gap-4 sm:flex-row">
          <CtaLink href={introBookingHref()}>{FIRST_CLASS_CTA}</CtaLink>
          <CtaLink href="/classes" variant="outline">
            Explore classes
          </CtaLink>
        </div>
      </div>
    </section>
  );
}
