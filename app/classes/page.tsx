import { MediaItem } from "@/components/ui/media";
import { CLASS_MEDIA, ClassCards, ClassMedia } from "@/components/sections/class-media";
import { CtaLink } from "@/components/ui/cta-link";
import { PageHero, SectionHeading } from "@/components/sections/section-heading";
import { classCta } from "@/components/sections/class-format";
import { FinalCta } from "@/components/sections/final-cta";
import { pageMetadata } from "@/lib/metadata";
import { breadcrumbSchema, jsonLd } from "@/lib/schema";
import { ABS_AND_ASSETS, CLASSES, GROUP_CLASSES, GROUP_CLASS_NAMES } from "@/lib/classes";
import { MEDIA, type Media } from "@/lib/media";
import { CLASSPASS_RATING_LINE, CLASSPASS_URL, FIRST_CLASS_CTA, introBookingHref } from "@/lib/site";
import { priceOf } from "@/lib/pricing";

export const metadata = pageMetadata({
  title: "Reformer Pilates Classes in North Hollywood | Bodies and Pilates",
  description:
    `Reformer Pilates classes in North Hollywood: ${GROUP_CLASS_NAMES.join(", ")}, privates and duets. 50 minutes, 7 people max.`,
  path: "/classes",
});

const breadcrumb = breadcrumbSchema([
  { name: "Home", path: "/" },
  { name: "Classes", path: "/classes" },
]);

const container = "mx-auto max-w-6xl px-4 sm:px-6 lg:px-8";

/**
 * One class on /classes. Every class uses this same pattern so the page reads
 * as one list: media on the left (first on phones), then the name, the
 * overview, the details and the buttons.
 */
function ClassBlock({
  id,
  name,
  media,
  fit,
  overview,
  details,
  tone,
  children,
}: {
  id: string;
  name: string;
  media: Media | null;
  /** "contain" for a clip whose subject fills its whole frame. */
  fit?: "cover" | "contain";
  overview: string;
  details: { term: string; detail: string | string[] }[];
  tone: string;
  children: React.ReactNode;
}) {
  return (
    <section id={id} aria-labelledby={`${id}-heading`} className={`scroll-mt-28 py-20 sm:py-24 ${tone}`}>
      <div className={`${container} grid items-start gap-10 lg:grid-cols-12 lg:gap-16`}>
        <MediaItem
          media={media}
          fit={fit}
          aspectClassName="aspect-[3/4]"
          className={`mx-auto w-full max-w-md lg:col-span-5 lg:max-w-none ${fit === "contain" ? "bg-theme-dark" : ""}`}
          sizes="(max-width: 1024px) 100vw, 40vw"
        />
        <div className="lg:col-span-7">
          <h2 id={`${id}-heading`} className="font-serif text-4xl font-light leading-tight text-brown-900 sm:text-5xl">
            {name}
          </h2>
          <p className="mt-5 font-sans text-base leading-[1.75] text-charcoal-800/85 sm:text-lg">{overview}</p>
          <dl className="mt-8 grid gap-x-8 gap-y-6 sm:grid-cols-2">
            {details.map((d) => (
              <div key={d.term} className={Array.isArray(d.detail) ? "sm:col-span-2" : undefined}>
                <dt className="smallcaps text-[15px] text-brown-700">{d.term}</dt>
                <dd className="mt-2 font-sans text-sm leading-relaxed text-charcoal-800/85">
                  {Array.isArray(d.detail) ? (
                    <ul className="space-y-2.5">
                      {d.detail.map((item) => (
                        <li key={item} className="flex gap-3">
                          <span aria-hidden="true" className="mt-2 h-1 w-1 shrink-0 rounded-full bg-brown-500" />
                          {item}
                        </li>
                      ))}
                    </ul>
                  ) : (
                    d.detail
                  )}
                </dd>
              </div>
            ))}
          </dl>
          <div className="mt-9 flex flex-wrap items-center gap-6">{children}</div>
        </div>
      </div>
    </section>
  );
}

export default function ClassesPage() {
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: jsonLd(breadcrumb) }} />

      <PageHero
        eyebrow="Small-Group Reformer Pilates"
        title="Reformer Pilates Classes"
        banner={MEDIA.studioBrightRows}
        tone="dark"
        media={
          MEDIA.classMoodyBacklit && (
            <MediaItem
              media={MEDIA.classMoodyBacklit}
              aspectClassName="aspect-[4/5]"
              className="mx-auto max-w-sm lg:max-w-none"
              sizes="(max-width: 1024px) 100vw, 40vw"
            />
          )
        }
        intro={
          <p>
            Every group class we teach is 50 minutes on a professional Merrithew reformer, with no more than 7 people
            in the room. An experienced instructor watches your form from start to finish. Pick a class by how you
            want to feel, or start with Beginner if the reformer is new to you.
          </p>
        }
      >
        <p className="mb-6 font-sans text-sm font-medium text-brown-700">
          <a href={CLASSPASS_URL} target="_blank" rel="noopener noreferrer" className="underline underline-offset-4 hover:text-brown-900">
            {CLASSPASS_RATING_LINE}
          </a>
        </p>
        <nav aria-label="Class formats" className="flex flex-wrap justify-center gap-x-6 gap-y-3">
          {CLASSES.map((c) => (
            <a
              key={c.slug}
              href={`#${c.slug}`}
              className="smallcaps inline-block py-1 text-[15px] text-brown-700 underline-offset-4 hover:underline"
            >
              {c.name}
            </a>
          ))}
          <a
            href={`#${ABS_AND_ASSETS.slug}`}
            className="smallcaps inline-block py-1 text-[15px] text-brown-700 underline-offset-4 hover:underline"
          >
            {ABS_AND_ASSETS.name}
          </a>
        </nav>
      </PageHero>

      <ClassCards
        headingId="the-classes"
        items={[
          ...GROUP_CLASSES.map((c) => ({ key: c.slug, name: c.name, href: `#${c.slug}` })),
          { key: ABS_AND_ASSETS.slug, name: ABS_AND_ASSETS.name, href: `#${ABS_AND_ASSETS.slug}` },
        ]}
      />

      {/* What is reformer Pilates? */}
      <section aria-labelledby="what-is-reformer" className="bg-cream-50 py-20 sm:py-24">
        <div className={`${container} grid items-center gap-12 lg:grid-cols-12 lg:gap-16`}>
          <div className="lg:col-span-7">
            <SectionHeading
              id="what-is-reformer"
              eyebrow="The Apparatus"
              title="What is reformer Pilates?"
              intro={
                <>
                  <p>
                    The reformer is a sliding carriage on a frame, with springs, a footbar, and straps for your hands
                    and feet. The springs add resistance to classic Pilates movements, and they are easy on your
                    joints.
                  </p>
                  <p className="mt-4">
                    Your instructor changes the springs to make each exercise harder or more supportive, so the same
                    machine works for you on your first day and every class after.
                  </p>
                </>
              }
            />
            <CtaLink href={introBookingHref()}>{FIRST_CLASS_CTA}</CtaLink>
          </div>
          <ClassMedia mediaKey="what-is-reformer" className="lg:col-span-5" />
        </div>
      </section>

      {/* Every class in the same pattern: one 3:4 photo or clip, the name, the
          overview, the details, then the buttons (owner request, October 29, 2026). */}
      {CLASSES.map((c, i) => {
        const cta = classCta(c);
        return (
          <ClassBlock
            key={c.slug}
            id={c.slug}
            name={c.name}
            media={CLASS_MEDIA[c.slug]?.[0] ?? null}
            overview={c.blurb}
            details={[
              { term: "Difficulty", detail: c.level },
              { term: "Length", detail: c.duration },
              ...(c.slug === "private"
                ? [{ term: "Price", detail: `${priceOf("private")} for 55 minutes. Duets ${priceOf("duet")} per person.` }]
                : []),
              { term: "Who it is for", detail: c.forWho },
              { term: `What to expect in ${c.duration}`, detail: c.expect },
            ]}
            tone={i % 2 === 0 ? "bg-cream-100" : "bg-cream-50"}
          >
            <CtaLink href={cta.href}>{cta.label}</CtaLink>
            {c.slug !== "private" && (
              <CtaLink href="/schedule" variant="text">
                See {c.name} class times
              </CtaLink>
            )}
            <CtaLink href={`/classes/${c.slug}`} variant="text">
              More about {c.name}
            </CtaLink>
          </ClassBlock>
        );
      })}

      <ClassBlock
        id={ABS_AND_ASSETS.slug}
        name={ABS_AND_ASSETS.name}
        media={CLASS_MEDIA[ABS_AND_ASSETS.slug]?.[0] ?? null}
        fit="contain"
        overview={`${ABS_AND_ASSETS.name} is a 50-minute reformer class on our weekly schedule.`}
        details={[{ term: "Length", detail: ABS_AND_ASSETS.duration }]}
        tone={CLASSES.length % 2 === 0 ? "bg-cream-100" : "bg-cream-50"}
      >
        {/* TODO(owner): add a 1 to 2 sentence description, level, and who it is for. */}
        <CtaLink href="/schedule">{`See ${ABS_AND_ASSETS.name} class times`}</CtaLink>
      </ClassBlock>

      <FinalCta />
    </>
  );
}
