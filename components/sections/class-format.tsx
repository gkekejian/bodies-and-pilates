import { CtaLink } from "@/components/ui/cta-link";
import { VideoSlot } from "@/components/ui/video-slot";
import { eyebrowClass } from "@/components/sections/section-heading";
import { CLIPS } from "@/lib/photos";
import { PRIVATE, offerHref } from "@/lib/pricing";
import { FIRST_CLASS_CTA, introBookingHref } from "@/lib/site";
import type { ClassFormat } from "@/lib/classes";
import { cn } from "@/lib/utils";

const privateSession = PRIVATE[0];

export function classCta(c: ClassFormat) {
  return c.slug === "private"
    ? { label: privateSession.cta, href: offerHref(privateSession) }
    : { label: FIRST_CLASS_CTA, href: introBookingHref() };
}

/**
 * One class format: who it is for, level, what to expect, vertical clip.
 * Used on /classes (headingLevel h2) and on each detail page.
 */
export function ClassFormatBlock({
  format,
  headingLevel = "h2",
  showHeading = true,
  detailLink = true,
  reverse,
}: {
  format: ClassFormat;
  headingLevel?: "h2" | "h3";
  showHeading?: boolean;
  detailLink?: boolean;
  reverse?: boolean;
}) {
  const Heading = headingLevel;
  const cta = classCta(format);
  const expectHeading = `What to expect in ${format.duration}`;

  return (
    <article id={format.slug} className="grid scroll-mt-28 items-start gap-10 lg:grid-cols-12 lg:gap-16">
      <div className={cn("lg:col-span-8", reverse && "lg:order-2")}>
        <p className={`${eyebrowClass} mb-4`}>
          {format.level} &middot; {format.duration}
        </p>
        {showHeading && (
          <Heading className="font-serif text-3xl leading-tight text-charcoal-900 sm:text-4xl">{format.name}</Heading>
        )}
        <p className="mt-5 font-sans text-base leading-[1.75] text-charcoal-800/85 sm:text-lg">{format.description}</p>

        <dl className="mt-8 grid gap-8 sm:grid-cols-2">
          <div>
            <dt className="font-sans text-[11px] font-medium uppercase tracking-[0.2em] text-sage-700">Who it is for</dt>
            <dd className="mt-3 font-sans text-sm leading-relaxed text-charcoal-800/85">{format.forWho}</dd>
            <dt className="mt-6 font-sans text-[11px] font-medium uppercase tracking-[0.2em] text-sage-700">
              Difficulty
            </dt>
            <dd className="mt-3 font-sans text-sm leading-relaxed text-charcoal-800/85">{format.level}</dd>
          </div>
          <div>
            <dt className="font-sans text-[11px] font-medium uppercase tracking-[0.2em] text-sage-700">
              {expectHeading}
            </dt>
            <dd className="mt-3">
              <ul className="space-y-2.5 font-sans text-sm leading-relaxed text-charcoal-800/85">
                {format.expect.map((item) => (
                  <li key={item} className="flex gap-3">
                    <span aria-hidden="true" className="mt-2 h-1 w-1 shrink-0 rounded-full bg-sage-500" />
                    {item}
                  </li>
                ))}
              </ul>
            </dd>
          </div>
        </dl>

        <div className="mt-9 flex flex-wrap items-center gap-6">
          <CtaLink href={cta.href}>{cta.label}</CtaLink>
          {detailLink && (
            <CtaLink href={`/classes/${format.slug}`} variant="text">
              More about {format.name}
            </CtaLink>
          )}
        </div>
      </div>
      <div className={cn("mx-auto w-full max-w-[260px] lg:col-span-4 lg:max-w-none", reverse && "lg:order-1")}>
        <VideoSlot clip={CLIPS[format.slug]} />
      </div>
    </article>
  );
}
