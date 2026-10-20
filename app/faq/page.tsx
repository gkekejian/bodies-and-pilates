import { PageHero } from "@/components/sections/section-heading";
import { FaqAccordion } from "@/components/sections/faq-accordion";
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

      <PageHero display="FAQs" title="Pilates Questions, Answered" banner={MEDIA.studioEmptyRoom} tone="dark" />

      {/* faqs-top.png: the dark accordion straight under the banner, then the
          dark footer, as on the old page. */}
      <section aria-label="Frequently asked questions" className="bg-theme-dark pb-16 pt-10 sm:pb-24 sm:pt-14">
        <div className="mx-auto max-w-[860px] px-4 sm:px-6">
          <FaqAccordion faqs={FAQS.filter((faq) => faq.answer)} />
        </div>
      </section>
    </>
  );
}
