import { MediaItem, MediaPhoto } from "@/components/ui/media";
import { CtaLink } from "@/components/ui/cta-link";
import { PageHero, SectionHeading } from "@/components/sections/section-heading";
import { FinalCta } from "@/components/sections/final-cta";
import { ClassPassRating } from "@/components/sections/classpass-rating";
import { Testimonials } from "@/components/sections/testimonials";
import { ABOUT_TESTIMONIALS } from "@/lib/testimonials";
import { pageMetadata } from "@/lib/metadata";
import { breadcrumbSchema, jsonLd } from "@/lib/schema";
import { MEDIA, present } from "@/lib/media";
import { TEAM, SHOW_TEAM, SHOW_BIOS, bioEntries, type Instructor } from "@/lib/team";
import { ADDRESS, INSTAGRAM } from "@/lib/site";

export const metadata = pageMetadata({
  title: "About Bodies and Pilates | North Hollywood Pilates Studio",
  description:
    "An independent reformer Pilates studio in North Hollywood, near Toluca Lake, Studio City, and Burbank. Meet the team, then book your $25 first class.",
  path: "/about",
});

const breadcrumb = breadcrumbSchema([
  { name: "Home", path: "/" },
  { name: "About", path: "/about" },
]);

// TODO(owner): verify each route and landmark below reads right to a local.
// No drive times (owner rule, 2026-10-13): directions and parking only.
const neighborhoods = [
  {
    name: "North Hollywood",
    body: `We are at ${ADDRESS.street}. Park on Weddington St or at the metered spots in front of the studio on Vineland Ave.`,
  },
  {
    name: "Toluca Lake",
    body: "Head west along Riverside Dr, then north on Vineland Ave. Street parking on Weddington St is right by the studio.",
  },
  {
    name: "Valley Village",
    body: "Magnolia Blvd brings you east toward Vineland Ave. Street parking on Weddington St is a short walk from the door.",
  },
  {
    name: "Studio City",
    body: "Vineland Ave runs north from Ventura Blvd straight to the studio, so it is one road most of the way.",
  },
  {
    name: "Burbank",
    body: "Magnolia Blvd runs west from Burbank's Magnolia Park into North Hollywood. Arrive 10 minutes early for your first class to park and settle in.",
  },
];

const label = "smallcaps text-[15px] text-sage-700";

function InstructorCard({ person }: { person: Instructor }) {
  // Only fields with real content render; an empty label never shows.
  const fields = [
    ...(person.teaches.length > 0 ? [{ label: "Teaches", value: person.teaches.join(", ") }] : []),
    ...(SHOW_BIOS ? bioEntries(person.bio) : []),
  ];
  return (
    <article className="flex flex-col bg-cream-50 shadow-[0_1px_3px_rgba(43,42,39,0.10),0_8px_24px_rgba(43,42,39,0.05)]">
      <MediaPhoto
        media={person.photo}
        aspectClassName="aspect-[4/5]"
        sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw"
      />
      <div className="flex flex-1 flex-col gap-5 p-6">
        <div>
          <h3 className="font-serif text-3xl text-sage-900">{person.name}</h3>
          {person.role && <p className="mt-1 font-sans text-sm text-sage-700">{person.role}</p>}
        </div>
        {fields.length > 0 && (
          <dl className="space-y-4">
            {fields.map((f) => (
              <div key={f.label}>
                <dt className={label}>{f.label}</dt>
                <dd className="mt-1.5 font-sans text-sm leading-relaxed text-charcoal-800/85">{f.value}</dd>
              </div>
            ))}
          </dl>
        )}
        <div className="mt-auto pt-2">
          <CtaLink href="/schedule" variant="text">
            Book with {person.firstName}
          </CtaLink>
        </div>
      </div>
    </article>
  );
}

const container = "mx-auto max-w-6xl px-4 sm:px-6 lg:px-8";

const studioGallery = present([
  MEDIA.studioEmptyRoom,
  MEDIA.studioLogoWall,
  MEDIA.studioTour,
  MEDIA.studioReformersBoxes,
  MEDIA.studioLogoWallChair,
  MEDIA.entryBench,
]);

const community = present([MEDIA.matchaCup, MEDIA.sunglassesPose, MEDIA.logoMedallion]);

export default function AboutPage() {
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: jsonLd(breadcrumb) }} />

      <PageHero
        eyebrow="Our Story"
        title="About Bodies and Pilates"
        banner={MEDIA.studioLogoWallChair}
        tone="sage"
        intro={<p>We are an independent reformer Pilates studio on Vineland Ave in North Hollywood.</p>}
      />

      {/* Founder. TODO(owner): Naira's founder story in her own words. Until it
          arrives the block shows her photos, name, and title only. */}
      <section aria-labelledby="founder-heading" className="bg-cream-50 py-20 sm:py-28">
        <div className={`${container} grid items-center gap-12 lg:grid-cols-12 lg:gap-16`}>
          {(MEDIA.nairaMain || MEDIA.nairaSecondary) && (
            <div className="grid grid-cols-5 items-end gap-4 lg:col-span-7">
              <MediaPhoto
                media={MEDIA.nairaMain}
                eager
                aspectClassName="aspect-[4/5]"
                className="col-span-3"
                sizes="(max-width: 1024px) 60vw, 35vw"
              />
              <MediaPhoto
                media={MEDIA.nairaSecondary}
                aspectClassName="aspect-[3/4]"
                className="col-span-2"
                sizes="(max-width: 1024px) 40vw, 22vw"
              />
            </div>
          )}
          <div className="lg:col-span-5">
            <p className={label}>Founder</p>
            <h2 id="founder-heading" className="mt-4 font-serif text-5xl font-light leading-[1.05] text-sage-900 sm:text-6xl">
              Naira Sarkian
            </h2>
            <p className="mt-3 font-sans text-base text-charcoal-800/85">Founder and Owner</p>
          </div>
        </div>
      </section>

      {/* Social proof, next to the founder: ClassPass rating, then all six
          reviews with the client review on Naira first. */}
      <ClassPassRating className="bg-cream-50 pt-0 sm:pt-0" />
      <Testimonials items={ABOUT_TESTIMONIALS} />

      {/* Studio */}
      {/* TODO(owner): review the studio copy below and adjust it to your own words. */}
      <section aria-labelledby="story-heading" className="bg-cream-100 py-20 sm:py-28">
        <div className={container}>
          <div className="max-w-3xl">
            <SectionHeading id="story-heading" eyebrow="The Studio" title="A calm room and a small class" />
            <div className="space-y-5 font-accent text-lg leading-[1.85] text-charcoal-800">
              <p>
                Naira Sarkian founded Bodies and Pilates as a small reformer studio in North Hollywood. We keep it
                simple: no more than 7 people in a class, professional Merrithew reformers, and an instructor who
                watches how you move.
              </p>
              <p>
                The room is calm and unhurried. Your instructor sets your springs and coaches your form on the reformer
                through every exercise, on your first class and your hundredth.
              </p>
            </div>
          </div>
          {studioGallery.length > 0 && (
            <ul aria-label="Inside the studio" className="mt-14 grid grid-cols-2 gap-4 lg:grid-cols-3">
              {studioGallery.map((m) => (
                <li key={m.file}>
                  <MediaItem media={m} aspectClassName="aspect-[4/5]" sizes="(max-width: 1024px) 50vw, 33vw" />
                </li>
              ))}
            </ul>
          )}
        </div>
      </section>

      {/* Team */}
      {SHOW_TEAM && (
        <section id="team" aria-labelledby="team-heading" className="scroll-mt-24 bg-cream-200 py-20 sm:py-28">
          <div className={container}>
            <SectionHeading
              id="team-heading"
              eyebrow="Meet the Team"
              title="Your instructors"
              intro={<p>These are the people who teach our classes. Come say hello before your first one.</p>}
            />
            <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-4">
              {TEAM.map((person) => (
                <InstructorCard key={person.name} person={person} />
              ))}
            </div>
          </div>
        </section>
      )}

      {/* Neighborhoods */}
      <section id="neighborhoods" aria-labelledby="neighborhoods-heading" className="scroll-mt-24 bg-cream-50 py-20 sm:py-28">
        <div className={container}>
          <SectionHeading
            id="neighborhoods-heading"
            eyebrow="Getting Here"
            title="Neighborhoods we serve"
            intro={
              <p>
                Most clients come from North Hollywood and the neighborhoods around it. Here is the way in from each,
                and where to park.
              </p>
            }
          />
          <dl className="max-w-4xl divide-y divide-sage-700/25 border-y border-sage-700/25">
            {neighborhoods.map((n) => (
              <div key={n.name} className="grid gap-2 py-6 sm:grid-cols-[11rem_1fr] sm:gap-6">
                <dt className="font-serif text-2xl text-sage-900">{n.name}</dt>
                <dd className="font-sans text-base leading-relaxed text-charcoal-800/85">{n.body}</dd>
              </div>
            ))}
          </dl>
        </div>
      </section>

      {/* Community */}
      {community.length > 0 && (
        <section aria-labelledby="community-heading" className="bg-cream-100 py-20 sm:py-28">
          <div className={`${container} grid items-center gap-12 lg:grid-cols-12 lg:gap-16`}>
            <div className="lg:col-span-5">
              <SectionHeading
                id="community-heading"
                eyebrow="Community"
                title="Let's Be Friends"
                intro={<p>We post studio moments and schedule news on Instagram.</p>}
              />
              <CtaLink href={INSTAGRAM.url} variant="outline" newTab>
                {INSTAGRAM.handle}
              </CtaLink>
            </div>
            <ul className="grid grid-cols-3 gap-3 sm:gap-4 lg:col-span-7">
              {community.map((m) => (
                <li key={m.file}>
                  <MediaItem media={m} aspectClassName="aspect-[3/4]" sizes="(max-width: 1024px) 33vw, 20vw" />
                </li>
              ))}
            </ul>
          </div>
        </section>
      )}

      <FinalCta />
    </>
  );
}
