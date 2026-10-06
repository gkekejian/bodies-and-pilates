import { OwnerPlaceholder } from "@/components/ui/placeholder";
import { PageHero } from "@/components/sections/section-heading";
import { FinalCta } from "@/components/sections/final-cta";
import { pageMetadata } from "@/lib/metadata";
import { breadcrumbSchema } from "@/lib/schema";
import { FAQS, faqPageSchema } from "@/lib/faqs";

export const metadata = pageMetadata({
  title: "Pilates FAQ | Bodies and Pilates North Hollywood",
  description:
    "Reformer Pilates questions answered: pricing, what to wear, parking in North Hollywood, ClassPass, and your first class. Your first class is $25.",
  path: "/faq",
});

const breadcrumb = breadcrumbSchema([
  { name: "Home", path: "/" },
  { name: "FAQ", path: "/faq" },
]);

export default function FaqPage() {
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqPageSchema()) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumb) }} />

      <PageHero
        eyebrow="FAQ"
        title="Frequently Asked Questions"
        intro={
          <p>
            Everything to know before your first reformer Pilates class in North Hollywood, from pricing and parking
            to what happens on the reformer.
          </p>
        }
      />

      <section className="bg-cream-50 py-16 sm:py-20">
        <div className="mx-auto max-w-3xl px-4 sm:px-6 lg:px-8">
          {/* Native details/summary: zero JS and every answer is in the HTML, matching the FAQPage schema. */}
          <div className="divide-y divide-taupe-300/70 border-y border-taupe-300/70">
            {FAQS.map((faq) => (
              <details key={faq.id} id={faq.id} className="group scroll-mt-28 py-1">
                <summary className="flex cursor-pointer list-none items-start justify-between gap-6 py-5 font-serif text-lg text-charcoal-900 sm:text-xl [&::-webkit-details-marker]:hidden">
                  <span>{faq.question}</span>
                  <span
                    aria-hidden="true"
                    className="mt-1 font-sans text-xl leading-none text-sage-700 transition-transform duration-200 group-open:rotate-45"
                  >
                    +
                  </span>
                </summary>
                <div className="pb-6 pr-10">
                  {faq.answer ? (
                    <p className="font-sans text-base leading-[1.75] text-charcoal-800/85">{faq.answer}</p>
                  ) : (
                    <OwnerPlaceholder label="policy text">{faq.pending}</OwnerPlaceholder>
                  )}
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
