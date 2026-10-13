import Link from "next/link";
import { MediaPhoto } from "@/components/ui/media";
import { CtaLink } from "@/components/ui/cta-link";
import { eyebrowClass } from "@/components/sections/section-heading";
import { MEDIA } from "@/lib/media";
import { FIRST_CLASS_CTA, GRIP_SOCKS_LINE, introBookingHref } from "@/lib/site";

/**
 * The first-timer's guide, on the page instead of behind an email form.
 * Launch fallback (2026-10-13): no form webhook was supplied, and a form that
 * submits nowhere does not ship. Every line below is an owner-confirmed fact
 * already used elsewhere on the site.
 */
const POINTS = [
  {
    title: "Which class to take",
    body: "Start with Beginner. It is built for first-timers, anyone returning after time off, and people working around restrictions.",
    href: "/classes/beginner",
    link: "About the Beginner class",
  },
  {
    title: "What to wear",
    body: `Form-fitting clothes you can move in. ${GRIP_SOCKS_LINE}`,
    href: "/faq#wear",
    link: "What to wear, in detail",
  },
  {
    title: "Where to park",
    body: "Street parking on Weddington St and metered spots in front of the studio on Vineland Ave.",
    href: "/contact",
    link: "Directions",
  },
  {
    title: "When to arrive",
    body: "Arrive 10 minutes early so your instructor can meet you and set you up on the reformer.",
    href: "/schedule",
    link: "See class times",
  },
] as const;

export function FirstTimerGuide({ id = "first-timers-guide" }: { id?: string }) {
  return (
    <section id={id} aria-labelledby={`${id}-heading`} className="scroll-mt-24 bg-cream-100 py-20 sm:py-28">
      <div className="mx-auto grid max-w-6xl items-start gap-12 px-4 sm:px-6 lg:grid-cols-12 lg:px-8">
        <div className={MEDIA.gripSocksFlatLay ? "lg:col-span-7" : "lg:col-span-12"}>
          <p className={`${eyebrowClass} mb-5`}>First-Timer&apos;s Guide</p>
          <h2 id={`${id}-heading`} className="font-serif text-3xl leading-[1.2] text-charcoal-900 sm:text-4xl">
            What to wear, where to park, which class to take
          </h2>
          <ol className="mt-10 divide-y divide-taupe-300/60 border-y border-taupe-300/60">
            {POINTS.map((p, i) => (
              <li key={p.title} className="flex gap-5 py-5">
                <span aria-hidden="true" className="font-serif text-xl text-sage-700">
                  {String(i + 1).padStart(2, "0")}
                </span>
                <div>
                  <h3 className="font-serif text-xl text-charcoal-900">{p.title}</h3>
                  <p className="mt-1.5 font-sans text-base leading-relaxed text-charcoal-800/85">{p.body}</p>
                  <Link
                    href={p.href}
                    className="mt-2 inline-block py-1 font-sans text-sm text-sage-700 underline-offset-4 hover:text-sage-500 hover:underline"
                  >
                    {p.link}
                  </Link>
                </div>
              </li>
            ))}
          </ol>
          <div className="mt-10">
            <CtaLink href={introBookingHref()}>{FIRST_CLASS_CTA}</CtaLink>
          </div>
        </div>
        {MEDIA.gripSocksFlatLay && (
          <div className="lg:col-span-5">
            <MediaPhoto media={MEDIA.gripSocksFlatLay} sizes="(max-width: 1024px) 100vw, 40vw" />
          </div>
        )}
      </div>
    </section>
  );
}
