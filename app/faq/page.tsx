import { PageHero } from "@/components/sections/section-heading";
import { FinalCta } from "@/components/sections/final-cta";
import { pageMetadata } from "@/lib/metadata";
import { breadcrumbSchema, jsonLd } from "@/lib/schema";
import { FAQS, faqPageSchema } from "@/lib/faqs";
import { MEDIA } from "@/lib/media";

export const metadata = pageMetadata({
  title: "Pilates FAQs | Bodies and Pilates North Hollywood",
  description:
    "New to reformer Pilates? Answers on pricing, what to wear, grip socks, parking, cancellations, and your first visit to our North Hollywood studio.",
  path: "/faq",
});

const breadcrumb = breadcrumbSchema([
  { name: "Home", path: "/" },
  { name: "FAQ", path: "/faq" },
]);

export default function FaqPage() {
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: jsonLd(faqPageSchema()) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: jsonLd(breadcrumb) }} />

      <PageHero
        display="FAQs"
        title="Pilates Questions, Answered"
        banner={MEDIA.studioEmptyRoom}
        tone="sage"
        intro={
          <p>
            What to know before your first class with us: prices, what to wear, parking, cancellations, and what
            happens on the reformer.
          </p>
        }
      />

      <section className="bg-cream-50 pb-16 sm:pb-24">
        <div className="mx-auto max-w-3xl px-4 sm:px-6 lg:px-8">
          {/* Native details/summary: zero JS and every answer is in the HTML, matching the FAQPage schema. */}
          <div className="divide-y divide-sage-700/25 border-y border-sage-700/25">
            {FAQS.filter((faq) => faq.answer).map((faq) => (
              <details key={faq.id} id={faq.id} className="group scroll-mt-28 py-1">
                <summary className="flex cursor-pointer list-none items-start justify-between gap-6 py-6 font-serif text-xl text-sage-900 sm:text-2xl [&::-webkit-details-marker]:hidden">
                  <span>{faq.question}</span>
                  <span
                    aria-hidden="true"
                    className="mt-1 font-poppins text-2xl font-extralight leading-none text-sage-700 transition-transform duration-200 group-open:rotate-45"
                  >
                    +
                  </span>
                </summary>
                <div className="pb-6 pr-10">
                  <p className="font-sans text-base leading-[1.75] text-charcoal-800/85">{faq.answer}</p>
                </div>
              </details>
            ))}
          </div>
        </div>
      </section>

      <FinalCta />
    </>
  );
}
