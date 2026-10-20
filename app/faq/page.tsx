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

      <PageHero display="FAQs" title="Pilates Questions, Answered" banner={MEDIA.studioEmptyRoom} tone="sage" />

      {/* faqs-top.png: each question with its answer under it, in one narrow
          column. Every answer is in the HTML, matching the FAQPage schema. */}
      <section className="bg-wix-offwhite py-14 sm:py-20">
        <div className="mx-auto max-w-[760px] px-4 sm:px-6">
          <dl className="divide-y divide-sage-700/20">
            {FAQS.filter((faq) => faq.answer).map((faq) => (
              <div key={faq.id} id={faq.id} className="scroll-mt-32 py-7 first:pt-0">
                <dt className="font-serif text-2xl leading-snug text-wix-footer">{faq.question}</dt>
                <dd className="mt-3 font-sans text-base leading-[1.8] text-charcoal-800/85">{faq.answer}</dd>
              </div>
            ))}
          </dl>
        </div>
      </section>

      <FinalCta />
    </>
  );
}
