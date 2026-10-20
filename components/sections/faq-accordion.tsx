import { ChevronDown } from "lucide-react";
import type { Faq } from "@/lib/faqs";
import { FaqHashOpener } from "@/components/sections/faq-hash-opener";

/**
 * The old FAQs page's dark accordion: theme dark brown, cream type, a rule
 * between questions, a chevron on each, one open at a time. Built on
 * <details name>, so every answer stays in the HTML (matching the FAQPage
 * schema) and it works without JavaScript.
 */
export function FaqAccordion({ faqs }: { faqs: Faq[] }) {
  return (
    <div className="divide-y divide-theme-cream/25 border-y border-theme-cream/25">
      {faqs.map((faq) => (
        <details key={faq.id} id={faq.id} name="faq" className="group scroll-mt-32">
          <summary className="flex min-h-[44px] cursor-pointer list-none items-center justify-between gap-6 py-6 text-left font-serif text-[1.45rem] font-semibold leading-snug text-theme-cream focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-theme-cream focus-visible:ring-offset-2 focus-visible:ring-offset-theme-dark sm:text-2xl [&::-webkit-details-marker]:hidden">
            {faq.question}
            <ChevronDown aria-hidden="true" className="size-6 shrink-0 text-theme-sand transition-transform duration-200 group-open:rotate-180" />
          </summary>
          <p className="max-w-[640px] pb-7 font-accent text-lg leading-[1.6] text-theme-cream/90">{faq.answer}</p>
        </details>
      ))}
      <FaqHashOpener />
    </div>
  );
}
