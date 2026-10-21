import { CtaLink } from "@/components/ui/cta-link";
import { MediaItem, MediaPhoto } from "@/components/ui/media";
import { ClassCards } from "@/components/sections/class-media";
import { InstagramIcon } from "@/components/layout/footer";
import { Testimonials } from "@/components/sections/testimonials";
import { pageMetadata } from "@/lib/metadata";
import { MEDIA, STOCK, present, type Media } from "@/lib/media";
import { INSTAGRAM } from "@/lib/site";

export const metadata = pageMetadata({
  title: "Reformer Pilates in North Hollywood | Bodies and Pilates",
  description:
    "Reformer Pilates in North Hollywood, 7 people max on Merrithew reformers. Rated 4.9 on ClassPass. First class $25. Call 818-813-4446.",
  path: "/",
});

// Layout measured from design-reference/old-site (home-1 to home-5): a 980px
// centered column, 515px photos with the section name set on them, and the
// paragraph centered in a 360px column beside each photo.
const column = "mx-auto max-w-[980px] px-4 sm:px-6";

/** The old site's two-up row: a photo with the section name on it, and a centered serif paragraph. */
function TwoUp({
  id,
  title,
  media,
  reverse,
  children,
}: {
  id: string;
  title: string;
  media: Media | null;
  reverse?: boolean;
  children: React.ReactNode;
}) {
  return (
    <div className="grid items-center gap-10 md:grid-cols-[515fr_465fr] md:gap-0">
      <div className={reverse ? "relative md:order-2" : "relative"}>
        <MediaItem media={media} aspectClassName="aspect-[515/444]" sizes="(max-width: 768px) 100vw, 515px" />
        <h2
          id={id}
          className="banner-text pointer-events-none absolute inset-x-0 top-[14%] text-center font-serif text-5xl font-semibold tracking-[-0.015em] text-white sm:text-6xl lg:text-[4.25rem]"
        >
          {title}
        </h2>
      </div>
      <div className={reverse ? "md:order-1 md:pr-[52px]" : "md:pl-[52px]"}>
        <div className="mx-auto max-w-[360px] space-y-7 text-center font-serif text-[1.45rem] font-light leading-[1.22] text-theme-ink sm:text-[1.6rem]">
          {children}
        </div>
      </div>
    </div>
  );
}

// The video strip under The Classes.
const strip = present([MEDIA.classMoodyBacklit, MEDIA.classStandingWork, MEDIA.partnerSideStretch]);

// Let's Be Friends: the old site ran its Instagram feed here; these are real
// studio photos, each linking to the account.
const friends = present([
  MEDIA.receptionWall,
  MEDIA.matchaCup,
  MEDIA.sunglassesPose,
  MEDIA.gripSocksFlatLay,
  MEDIA.entryBench,
  MEDIA.artisticPose,
]);

export default function HomePage() {
  return (
    <>
      {/* 1. Hero (home-1-hero.png): full-bleed photo under a dark overlay, the
          logo and nav on the photo, a white serif headline, a thin outlined
          button. The photo is the old hero: a still from its stock video. */}
      <section data-hero className="relative isolate -mt-[var(--header-h)] overflow-hidden bg-theme-dark text-white">
        {STOCK.heroCadillac && (
          <>
            {/* Above the fold on every screen and the LCP element: prioritized.
                The crop keeps her in frame on narrow screens. */}
            <MediaPhoto
              media={STOCK.heroCadillac}
              priority
              sizes="100vw"
              aspectClassName=""
              className="absolute inset-0 -z-20 h-full w-full"
              imgClassName="object-[68%_50%]"
            />
            <div aria-hidden="true" className="absolute inset-0 -z-10 bg-theme-dark/60" />
          </>
        )}
        <div className="banner-text mx-auto flex min-h-[36rem] max-w-5xl flex-col items-center justify-center px-4 pb-16 pt-[calc(var(--header-h)+3rem)] text-center sm:min-h-[44rem] sm:px-6">
          <h1 className="smallcaps text-[15px] text-white sm:text-base">Reformer Pilates in North Hollywood</h1>
          {/* TODO(owner): "Essense" is the old site's own spelling. Confirm keep, or correct to "Essence". */}
          <p className="mt-5 font-serif text-[3.4rem] font-semibold leading-[1.02] tracking-[-0.015em] sm:text-7xl lg:text-[5.25rem]">
            Empower Your Essense
          </p>
          <div className="mt-9">
            <CtaLink href="/schedule" variant="ghost-light" className="min-w-[254px]">
              Book a Session
            </CtaLink>
          </div>
        </div>
      </section>

      {/* 2. Welcome band, theme dark brown (old site, verbatim). */}
      <section aria-label="Welcome" className="bg-theme-dark px-4 py-16 text-theme-cream sm:py-[4.5rem]">
        <p className="mx-auto max-w-[780px] text-center font-serif text-[1.55rem] font-light leading-[1.3] sm:text-[1.85rem]">
          Welcome to our curated studio, where we offer boutique Pilates classes in a warm and inviting setting. Join us
          on the journey to sculpt, balance, and grow together.
        </p>
      </section>

      {/* 3 and 4. The Space and The Practice on the theme cream (old site; Practice adapted). */}
      <section aria-labelledby="space-heading" className="bg-theme-cream pb-16 pt-6 sm:pb-24">
        <div className={`${column} space-y-12 md:space-y-12`}>
          <TwoUp id="space-heading" title="The Space" media={MEDIA.studioBrightRows}>
            <p>
              At Bodies and Pilates, we pride ourselves in providing a luxurious, tranquil environment combined with
              cutting-edge fitness. Our boutique studio is equipped with state-of-the-art equipment, while our small class
              sizes allow for personalized attention and guidance throughout your workout.
            </p>
          </TwoUp>
          <TwoUp id="reformer-heading" title="The Practice" media={MEDIA.classLungeInSync} reverse>
              <p>
                Pilates is a versatile exercise system that strengthens muscles, improves flexibility, and enhances
                overall body alignment. We combine the best of low-impact movements with high-intensity focus to isolate
                and fatigue each muscle group for maximum effectiveness.
              </p>
              <p>Our aim is not just for physical strength but also for a harmonious balance between mind and body.</p>
            </TwoUp>
        </div>
      </section>

      {/* 5. The Classes (home-3-practice-classes.png): the old band, its intro
          line and the three cards. Abs and Assets and the rest of the schedule
          are one click away on /classes. */}
      <ClassCards
        headingId="class-types-heading"
        items={[
          { key: "beginner", name: "Beginner", href: "/classes/beginner", photo: STOCK.groupSideBend },
          { key: "flexibility", name: "Flexibility", href: "/classes/flexibility", photo: STOCK.groupLegStraps },
          { key: "fullbody", name: "Fullbody", href: "/classes/fullbody", photo: STOCK.lungeOnReformer },
        ]}
      />

      {/* 6. The video strip: three studio clips edge to edge. Only the middle
          one plays on its own; the others wait for a tap. */}
      {strip.length > 0 && (
        <section aria-label="Classes at the studio" className="bg-theme-dark p-[5px]">
          <ul className="grid grid-cols-3 gap-[5px]">
            {strip.map((m, i) => (
              <li key={m.file}>
                <MediaItem
                  media={m}
                  aspectClassName="aspect-[3/4] sm:aspect-[4/5]"
                  autoPlay={i === 1}
                  sizes="33vw"
                />
              </li>
            ))}
          </ul>
        </section>
      )}

      {/* 7. The Reviews: a photo beside the slideshow. */}
      <Testimonials photo={STOCK.yogaStandingPose} />

      {/* 8. Let's Be Friends (home-5-friends-footer.png): a darkened photo band,
          the title, the Instagram handle, and a row of photos edge to edge. */}
      <section aria-labelledby="friends-heading" className="relative isolate overflow-hidden bg-theme-dark pb-16 pt-14 text-white sm:pb-20 sm:pt-16">
        {MEDIA.studioLogoWall && (
          <>
            <MediaPhoto
              media={MEDIA.studioLogoWall}
              sizes="100vw"
              aspectClassName=""
              className="absolute inset-0 -z-20 h-full w-full"
            />
            <div aria-hidden="true" className="absolute inset-0 -z-10 bg-theme-dark/80" />
          </>
        )}
        <div className="banner-text px-4 text-center">
          <h2 id="friends-heading" className="font-serif text-5xl font-semibold tracking-[-0.015em] sm:text-6xl lg:text-[4.25rem]">
            Let&apos;s Be Friends
          </h2>
          <a
            href={INSTAGRAM.url}
            target="_blank"
            rel="noopener noreferrer"
            className="mt-6 inline-flex flex-col items-center gap-2 py-1 font-serif text-2xl font-light text-white/90 underline-offset-4 hover:underline"
          >
            <InstagramIcon className="size-8 text-theme-sand" />
            {INSTAGRAM.handle}
          </a>
        </div>
        {friends.length > 0 && (
          <ul className="mt-8 grid grid-cols-2 gap-3 px-3 sm:grid-cols-3 lg:grid-cols-6">
            {friends.map((m) => (
              <li key={m.file}>
                <a
                  href={INSTAGRAM.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={`${m.alt}. See more on Instagram`}
                  className="block transition-opacity hover:opacity-85 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white"
                >
                  <MediaPhoto media={m} aspectClassName="aspect-square" sizes="(max-width: 640px) 50vw, (max-width: 1024px) 33vw, 16vw" />
                </a>
              </li>
            ))}
          </ul>
        )}
      </section>
    </>
  );
}
