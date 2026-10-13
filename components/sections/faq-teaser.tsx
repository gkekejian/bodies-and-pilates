import { CtaLink } from "@/components/ui/cta-link";
import { SectionHeading } from "@/components/sections/section-heading";
import { faqById, TEASER_FAQ_IDS } from "@/lib/faqs";

export function FaqTeaser() {
  const faqs = TEASER_FAQ_IDS.map(faqById);
  return (
    <section aria-labelledby="faq-teaser-heading" className="bg-cream-50 py-20 sm:py-28">
      <div className="mx-auto grid max-w-6xl gap-12 px-4 sm:px-6 lg:grid-cols-12 lg:px-8">
        <div className="lg:col-span-4">
          <SectionHeading id="faq-teaser-heading" eyebrow="Questions" title="Before your first class" />
          <CtaLink href="/faq" variant="text">
            Read all FAQs
          </CtaLink>
        </div>
        <dl className="divide-y divide-taupe-300/60 border-y border-taupe-300/60 lg:col-span-8">
          {faqs.map((f) => (
            <div key={f.id} className="py-6">
              <dt className="font-serif text-xl text-charcoal-900">{f.question}</dt>
              <dd className="mt-3 font-sans text-base leading-[1.75] text-charcoal-800/85">{f.answer}</dd>
            </div>
          ))}
        </dl>
      </div>
    </section>
  );
}
