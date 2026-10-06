import { PhotoSlot } from "@/components/ui/photo-slot";
import { OwnerPlaceholder } from "@/components/ui/placeholder";
import { PageHero, SectionHeading, eyebrowClass } from "@/components/sections/section-heading";
import { FinalCta } from "@/components/sections/final-cta";
import { pageMetadata } from "@/lib/metadata";
import { breadcrumbSchema } from "@/lib/schema";
import { PHOTOS } from "@/lib/photos";
import { SHOW_TEAM, TEAM, type Instructor } from "@/lib/team";
import { ADDRESS } from "@/lib/site";

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
// Drive times are approximate and owner-supplied.
const neighborhoods = [
  {
    name: "North Hollywood",
    time: "Home",
    body: `We are at ${ADDRESS.street}, a short drive from the NoHo Arts District. Park on Weddington St or at the metered spots in front of the studio on Vineland Ave.`,
  },
  {
    name: "Toluca Lake",
    time: "About 5 min",
    body: "Head west along Riverside Dr, then north on Vineland Ave. Street parking on Weddington St is right by the studio.",
  },
  {
    name: "Valley Village",
    time: "About 8 min",
    body: "Magnolia Blvd brings you east toward Vineland Ave. Street parking on Weddington St is a short walk from the door.",
  },
  {
    name: "Studio City",
    time: "About 10 min",
    body: "Vineland Ave runs north from Ventura Blvd straight to the studio, so it is one road most of the way.",
  },
  {
    name: "Burbank",
    time: "About 10 min",
    body: "Magnolia Blvd runs west from Burbank's Magnolia Park into North Hollywood. Arrive 10 minutes early for your first class to park and settle in.",
  },
];

const label = "font-sans text-[11px] font-medium uppercase tracking-[0.2em] text-sage-700";

function Field({ title, value, pending }: { title: string; value: string | null; pending: string }) {
  return (
    <div>
      <dt className={label}>{title}</dt>
      <dd className="mt-1.5">
        {value ? (
          <span className="font-sans text-sm leading-relaxed text-charcoal-800/85">{value}</span>
        ) : (
          <OwnerPlaceholder label={pending} />
        )}
      </dd>
    </div>
  );
}

function InstructorCard({ person }: { person: Instructor }) {
  return (
    <article className="flex flex-col border border-taupe-300/70 bg-cream-50">
      <PhotoSlot photo={person.photo} aspectClassName="aspect-[4/5]" sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw" />
      <div className="flex flex-1 flex-col gap-5 p-6">
        <div>
          <h3 className="font-serif text-2xl text-charcoal-900">{person.name}</h3>
          <p className="mt-1 font-sans text-sm text-sage-700">{person.role}</p>
        </div>
        <dl className="space-y-4">
          <Field title="Credentials" value={person.credentials} pending="credentials" />
          <Field title="Specialties" value={person.specialties} pending="specialties" />
        </dl>
        {person.philosophy ? (
          <p className="mt-auto border-t border-taupe-300/60 pt-4 font-serif text-lg italic leading-snug text-charcoal-800">
            &ldquo;{person.philosophy}&rdquo;
          </p>
        ) : (
          <OwnerPlaceholder label="one-line philosophy" className="mt-auto" />
        )}
      </div>
    </article>
  );
}

const container = "mx-auto max-w-6xl px-4 sm:px-6 lg:px-8";

export default function AboutPage() {
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumb) }} />

      <PageHero
        eyebrow="Our Story"
        title="About Bodies and Pilates"
        intro={<p>An independent reformer Pilates studio on Vineland Ave in North Hollywood, open since 2024.</p>}
      />

      {/* Story */}
      {/* TODO(owner): review the story copy below and adjust it to your own words. */}
      <section aria-labelledby="story-heading" className="bg-cream-50 py-20 sm:py-28">
        <div className={`${container} grid items-center gap-12 lg:grid-cols-12 lg:gap-16`}>
          <div className="lg:col-span-7">
            <SectionHeading id="story-heading" eyebrow="The Studio" title="A calm room, a small class, a coach who knows you" />
            <div className="space-y-5 font-sans text-base leading-[1.8] text-charcoal-800/85 sm:text-lg">
              <p>
                Bodies and Pilates opened in North Hollywood in 2024, led by owner and lead instructor Naira Sarkian.
                It is a boutique reformer studio with a simple promise: small classes, a consistent coaching team, and
                real attention to how you move.
              </p>
              <p>
                The space is calm and unhurried. Classes stay small so your instructor can see you, adjust your
                springs, and coach your form on the reformer through every exercise. Whether it is your first class
                or your hundredth, you are seen, coached, and challenged at the right level.
              </p>
            </div>
          </div>
          <div className="lg:col-span-5">
            <PhotoSlot photo={PHOTOS.postClass} aspectClassName="aspect-[4/5]" sizes="(max-width: 1024px) 100vw, 40vw" />
          </div>
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
              intro={<p>One consistent coaching team. You get to know your instructor, and they get to know your body.</p>}
            />
            <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
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
                Most clients come from North Hollywood and the neighborhoods around it. Here is how long the drive
                usually takes, and where to park.
              </p>
            }
          />
          <div className="grid gap-12 lg:grid-cols-12 lg:gap-16">
            <dl className="divide-y divide-taupe-300/60 border-y border-taupe-300/60 lg:col-span-7">
              {neighborhoods.map((n) => (
                <div key={n.name} className="grid gap-2 py-6 sm:grid-cols-[11rem_1fr] sm:gap-6">
                  <dt>
                    <span className="block font-serif text-xl text-charcoal-900">{n.name}</span>
                    <span className={`${eyebrowClass} mt-1 block text-[11px]`}>{n.time}</span>
                  </dt>
                  <dd className="font-sans text-base leading-relaxed text-charcoal-800/85">{n.body}</dd>
                </div>
              ))}
            </dl>
            <div className="grid gap-6 sm:grid-cols-2 lg:col-span-5 lg:grid-cols-1">
              <PhotoSlot photo={PHOTOS.entrance} sizes="(max-width: 1024px) 50vw, 40vw" />
              <PhotoSlot photo={PHOTOS.parking} sizes="(max-width: 1024px) 50vw, 40vw" />
            </div>
          </div>
        </div>
      </section>

      <FinalCta />
    </>
  );
}
