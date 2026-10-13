import type { BlogFaq } from "@/lib/blog";

/**
 * The $25 first-class CTA block that closes every post. Its text lives in the
 * post's MDX exactly as written by the owner (link and closing period
 * included); this only frames it.
 */
export function PostCta({ children }: { children: React.ReactNode }) {
  return (
    <aside
      aria-label="Your first class"
      className="not-prose mt-14 border border-sage-700/30 bg-cream-100 p-8 text-center font-serif text-2xl leading-snug text-charcoal-900 sm:p-10 sm:text-3xl [&_a]:whitespace-nowrap [&_a]:text-sage-700 [&_a]:underline [&_a]:decoration-1 [&_a]:underline-offset-[6px] hover:[&_a]:text-sage-500 [&_p]:mx-auto [&_p]:max-w-2xl"
    >
      {children}
    </aside>
  );
}

/** Visible FAQ block for question-format posts. Mirrors the FAQPage JSON-LD. */
export function PostFaq({ faqs }: { faqs: BlogFaq[] }) {
  if (faqs.length === 0) return null;
  return (
    <section aria-labelledby="post-faq-heading" className="not-prose mt-14">
      <h2 id="post-faq-heading" className="font-serif text-3xl text-charcoal-900">
        Frequently asked questions
      </h2>
      <dl className="mt-6 divide-y divide-taupe-300/60 border-y border-taupe-300/60">
        {faqs.map((f) => (
          <div key={f.q} className="py-5">
            <dt className="font-serif text-xl text-charcoal-900">{f.q}</dt>
            <dd className="mt-2 font-sans text-base leading-[1.75] text-charcoal-800/85">{f.a}</dd>
          </div>
        ))}
      </dl>
    </section>
  );
}
