import { CtaLink } from "@/components/ui/cta-link";
import { PageHero } from "@/components/sections/section-heading";
import { HoursList } from "@/components/sections/hours-list";
import { InstagramIcon } from "@/components/layout/footer";
import { pageMetadata } from "@/lib/metadata";
import { breadcrumbSchema, jsonLd } from "@/lib/schema";
import { ADDRESS, EMAIL, INSTAGRAM, MAPS_EMBED_URL, MAPS_URL, PHONE } from "@/lib/site";

export const metadata = pageMetadata({
  title: "Contact | Bodies and Pilates North Hollywood",
  description:
    "Contact Bodies and Pilates at 5251 Vineland Ave, Suite 6, North Hollywood. Call or text 818-813-4446, or email us. First class $25.",
  path: "/contact",
});

const breadcrumb = breadcrumbSchema([
  { name: "Home", path: "/" },
  { name: "Contact", path: "/contact" },
]);

const card = "rounded-sm border border-taupe-300/70 bg-cream-50 p-6 sm:p-8";
const link = "text-sage-700 underline-offset-4 hover:text-sage-500 hover:underline";

export default function ContactPage() {
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: jsonLd(breadcrumb) }} />

      <PageHero
        eyebrow="Contact"
        title="Visit Us in North Hollywood"
        intro={<p>Questions about classes, pricing, or your first visit? Call, text, or send a message.</p>}
      />

      <div className="bg-cream-100 py-16 sm:py-20">
        <div className="mx-auto grid max-w-6xl gap-10 px-4 sm:px-6 lg:grid-cols-2 lg:px-8">
          <div className="space-y-8">
            <section className={card} aria-labelledby="get-in-touch">
              <h2 id="get-in-touch" className="font-serif text-2xl text-charcoal-900">
                Get in touch
              </h2>
              <dl className="mt-6 space-y-5 font-sans text-sm">
                <div>
                  <dt className="font-medium text-charcoal-800">Address</dt>
                  <dd className="mt-1 text-charcoal-800/75">
                    {ADDRESS.street}
                    <br />
                    {ADDRESS.city}, {ADDRESS.region} {ADDRESS.zip}
                    <br />
                    <a href={MAPS_URL} target="_blank" rel="noopener noreferrer" className={link}>
                      Open in Google Maps
                    </a>
                  </dd>
                </div>
                <div>
                  <dt className="font-medium text-charcoal-800">Call</dt>
                  <dd className="mt-1">
                    <a href={PHONE.tel} className={link}>
                      {PHONE.display}
                    </a>
                  </dd>
                </div>
                <div>
                  <dt className="font-medium text-charcoal-800">Text us</dt>
                  <dd className="mt-1">
                    <a href={PHONE.sms} className={link}>
                      Text {PHONE.display}
                    </a>
                  </dd>
                </div>
                <div>
                  <dt className="font-medium text-charcoal-800">Email</dt>
                  <dd className="mt-1">
                    <a href={`mailto:${EMAIL}`} className={`${link} break-all`}>
                      {EMAIL}
                    </a>
                  </dd>
                </div>
                <div>
                  <dt className="font-medium text-charcoal-800">Instagram</dt>
                  <dd className="mt-1">
                    <a
                      href={INSTAGRAM.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className={`${link} inline-flex items-center gap-2`}
                    >
                      <InstagramIcon className="size-4" />
                      {INSTAGRAM.handle}
                    </a>
                  </dd>
                </div>
              </dl>
            </section>

            <section className={card} aria-labelledby="hours-heading">
              <h2 id="hours-heading" className="mb-4 font-serif text-2xl text-charcoal-900">
                Studio hours
              </h2>
              <HoursList />
            </section>

            <section className={card} aria-labelledby="parking-heading">
              <h2 id="parking-heading" className="font-serif text-2xl text-charcoal-900">
                Parking
              </h2>
              <p className="mt-3 font-sans text-sm leading-relaxed text-charcoal-800/80">
                Street parking on Weddington St and metered spots in front of the studio on Vineland Ave. Arrive 10
                minutes early for your first class.
              </p>
            </section>
          </div>

          <div className="space-y-8">
            {/* No message form at launch: no form webhook was supplied, and a form
                that submits nowhere does not ship. Call, text, and email go
                straight to the studio. */}
            <section className={card} aria-labelledby="reach-heading">
              <h2 id="reach-heading" className="font-serif text-2xl text-charcoal-900">
                Call, text, or email
              </h2>
              <p className="mt-3 font-sans text-sm leading-relaxed text-charcoal-800/80">
                Questions about classes, pricing, or your first visit? Call, text, or email the studio.
              </p>
              <div className="mt-6 flex flex-col gap-3">
                <CtaLink href={PHONE.tel} className="w-full">
                  Call {PHONE.display}
                </CtaLink>
                <CtaLink href={PHONE.sms} variant="outline" className="w-full">
                  Text {PHONE.display}
                </CtaLink>
                <CtaLink href={`mailto:${EMAIL}`} variant="outline" className="w-full">
                  Email us
                </CtaLink>
              </div>
            </section>

            <div className="overflow-hidden rounded-sm border border-taupe-300/70 bg-cream-50">
              <iframe
                title={`Map: Bodies and Pilates, ${ADDRESS.oneLine}`}
                src={MAPS_EMBED_URL}
                width="100%"
                height="320"
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
                className="block w-full border-0"
                allowFullScreen
              />
              <div className="flex flex-wrap items-center justify-between gap-3 border-t border-taupe-300/70 px-4 py-3">
                <p className="font-sans text-xs text-charcoal-800/70">{ADDRESS.oneLine}</p>
                <a href={MAPS_URL} target="_blank" rel="noopener noreferrer" className={`${link} inline-block py-1 font-sans text-xs`}>
                  Get directions
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
