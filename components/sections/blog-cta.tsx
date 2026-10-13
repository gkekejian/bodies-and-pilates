import { CtaLink } from "@/components/ui/cta-link";

/** Identical on every blog post. Always points to /intro-offer. */
export function BlogCta() {
  return (
    <aside aria-label="Intro offer" className="mt-16 border border-sage-700/30 bg-cream-100 p-8 text-center sm:p-10">
      <p className="font-sans text-xs uppercase tracking-[0.25em] text-sage-700">New to reformer Pilates?</p>
      <p className="mt-4 font-serif text-3xl leading-tight text-charcoal-900">Try your first class for $25.</p>
      <p className="mx-auto mt-4 max-w-md font-sans text-base leading-relaxed text-charcoal-800/85">
        Small-group reformer Pilates in North Hollywood, with real coaching on your form from start to finish.
      </p>
      <div className="mt-8">
        <CtaLink href="/intro-offer">See the Intro Offer</CtaLink>
      </div>
    </aside>
  );
}
