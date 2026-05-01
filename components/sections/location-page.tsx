import Link from "next/link";

export interface Landmark {
  name: string;
  driveTime: string;
}

export interface LocationPageProps {
  /** Locality name as it should appear in the H1 (e.g. "Toluca Lake") */
  locationName: string;
  /** Custom H1 override. Defaults to "Pilates Studio Near {locationName}". */
  heading?: string;
  /** Optional small eyebrow above the H1 */
  eyebrow?: string;
  /** Lead paragraph, opens the page. */
  intro: string;
  /** Drive-time landmarks to surface as a list */
  landmarks: Landmark[];
  /** Body paragraphs after landmarks (1–3 short paragraphs). */
  body: string[];
  /** Google Maps embed query (e.g. "5251 Vineland Ave, North Hollywood"). */
  mapQuery?: string;
}

const DEFAULT_MAP_QUERY = "5251 Vineland Ave Suite 6, North Hollywood, CA 91601";

const mapsUrl = (q: string) =>
  `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(q)}`;

const embedUrl = (q: string) =>
  `https://maps.google.com/maps?q=${encodeURIComponent(q)}&t=&z=14&ie=UTF8&iwloc=&output=embed`;

export function LocationPage({
  locationName,
  heading,
  eyebrow,
  intro,
  landmarks,
  body,
  mapQuery = DEFAULT_MAP_QUERY,
}: LocationPageProps) {
  const h1 = heading ?? `Pilates Studio Near ${locationName}`;

  return (
    <>
      {/* Hero */}
      <section className="bg-cream-200 py-16 sm:py-20">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          <nav aria-label="Breadcrumb" className="mb-6">
            <ol className="flex items-center gap-2 font-sans text-sm text-charcoal-800/60">
              <li>
                <Link href="/" className="transition-colors hover:text-sage-700">
                  Home
                </Link>
              </li>
              <li aria-hidden="true" className="select-none text-taupe-300">
                /
              </li>
              <li className="text-charcoal-800" aria-current="page">
                {locationName}
              </li>
            </ol>
          </nav>

          {eyebrow && (
            <p className="text-sage-500 font-sans text-xs tracking-[0.22em] uppercase mb-4">
              {eyebrow}
            </p>
          )}
          <h1 className="font-serif text-4xl sm:text-5xl text-charcoal-900 mb-4">
            {h1}
          </h1>
          <div className="w-12 h-px bg-sage-500" aria-hidden="true" />
        </div>
      </section>

      {/* Intro + body */}
      <section className="bg-cream-50 py-16 sm:py-20">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 grid grid-cols-1 lg:grid-cols-2 gap-12 items-start">
          <div className="font-sans text-base text-charcoal-800/85 leading-relaxed space-y-5">
            <p className="text-lg text-charcoal-800">{intro}</p>
            {body.map((p, i) => (
              <p key={i}>{p}</p>
            ))}

            <div className="pt-4 flex flex-wrap gap-3">
              <Link
                href="/pricing"
                className="inline-flex items-center justify-center rounded-lg bg-sage-700 text-cream-50 font-sans text-sm font-semibold px-6 py-3 transition-colors hover:bg-sage-500"
              >
                Book Your $25 First Class
              </Link>
              <Link
                href="/schedule"
                className="inline-flex items-center justify-center rounded-lg border border-sage-700 text-sage-700 font-sans text-sm font-medium px-6 py-3 transition-colors hover:bg-sage-700 hover:text-cream-50"
              >
                View Schedule
              </Link>
            </div>
          </div>

          <aside className="bg-cream-100 border border-taupe-300 rounded-2xl p-6 space-y-5">
            <div>
              <h2 className="font-serif text-xl text-charcoal-800 mb-3">
                Drive Times from {locationName}
              </h2>
              <ul className="divide-y divide-taupe-300/60">
                {landmarks.map((l) => (
                  <li
                    key={l.name}
                    className="flex items-center justify-between py-2.5 font-sans text-sm"
                  >
                    <span className="text-charcoal-800">{l.name}</span>
                    <span className="text-charcoal-800/70">{l.driveTime}</span>
                  </li>
                ))}
              </ul>
            </div>

            <div>
              <h2 className="font-serif text-xl text-charcoal-800 mb-2">
                Studio Address
              </h2>
              <p className="font-sans text-sm text-charcoal-800/80">
                5251 Vineland Ave Suite 6
                <br />
                North Hollywood, CA 91601
              </p>
              <a
                href={mapsUrl(mapQuery)}
                target="_blank"
                rel="noopener noreferrer"
                className="font-sans text-xs text-sage-700 underline underline-offset-2 hover:text-sage-500 mt-1 inline-block"
              >
                Open in Google Maps →
              </a>
            </div>

            <a
              href="tel:+18186533883"
              className="block font-sans text-sm text-sage-700 hover:text-sage-500"
            >
              (818) 653-3883
            </a>
          </aside>
        </div>
      </section>

      {/* Embedded map */}
      <section className="bg-cream-100 pb-20">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="bg-cream-50 border border-taupe-300 rounded-2xl overflow-hidden">
            <iframe
              title={`Bodies and Pilates — directions from ${locationName}`}
              src={embedUrl(mapQuery)}
              width="100%"
              height="360"
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
              className="block w-full border-0"
              allowFullScreen
            />
          </div>
        </div>
      </section>
    </>
  );
}
