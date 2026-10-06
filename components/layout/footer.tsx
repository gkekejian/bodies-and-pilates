import Link from "next/link";
import Image from "next/image";
import { MindbodyAccountLink } from "@/components/mindbody/account-link";
import {
  ADDRESS,
  CLASSPASS_URL,
  EMAIL,
  GOOGLE_REVIEWS,
  HOURS,
  INSTAGRAM,
  MAPS_URL,
  MINDBODY,
  PHONE,
  SITE_NAME,
  googleReviewsHref,
} from "@/lib/site";

// Inline Instagram glyph (lucide-react v1 removed brand icons).
export function InstagramIcon({ className }: { className?: string }) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.75"
      strokeLinecap="round"
      strokeLinejoin="round"
      className={className}
      aria-hidden="true"
    >
      <rect width="20" height="20" x="2" y="2" rx="5" ry="5" />
      <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" />
      <line x1="17.5" x2="17.51" y1="6.5" y2="6.5" />
    </svg>
  );
}

const quickLinks = [
  { label: "Intro Offer", href: "/intro-offer" },
  { label: "Classes", href: "/classes" },
  { label: "Pricing", href: "/pricing" },
  { label: "Schedule", href: "/schedule" },
  { label: "About", href: "/about" },
  { label: "FAQ", href: "/faq" },
  { label: "Contact", href: "/contact" },
  { label: "Blog", href: "/blog" },
];

const heading = "mb-4 font-sans text-[11px] font-medium uppercase tracking-[0.22em] text-taupe-300";
const muted = "text-cream-100/75 transition-colors hover:text-cream-50";

const newTab = { target: "_blank", rel: "noopener noreferrer" } as const;

export function Footer() {
  return (
    <footer className="bg-charcoal-900 text-cream-100">
      <div className="mx-auto max-w-7xl px-4 py-14 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 gap-10 sm:grid-cols-2 lg:grid-cols-4">
          {/* NAP */}
          <div className="flex flex-col gap-5">
            <Link href="/" className="inline-flex items-center gap-3 transition-opacity hover:opacity-80" aria-label="Bodies and Pilates, home">
              <Image src="/images/logo.svg" alt="" width={48} height={48} className="h-12 w-12 opacity-90 brightness-0 invert" />
              <span className="font-serif text-xl text-cream-50">{SITE_NAME}</span>
            </Link>
            <address className="not-italic">
              <ul className="flex flex-col gap-2 font-sans text-sm">
                <li>
                  <a href={MAPS_URL} target="_blank" rel="noopener noreferrer" className={muted}>
                    {ADDRESS.street}
                    <br />
                    {ADDRESS.city}, {ADDRESS.region} {ADDRESS.zip}
                  </a>
                </li>
                <li>
                  <a href={PHONE.tel} className={muted}>
                    {PHONE.display}
                  </a>
                </li>
                <li>
                  <a href={`mailto:${EMAIL}`} className={`${muted} break-all`}>
                    {EMAIL}
                  </a>
                </li>
              </ul>
            </address>
          </div>

          {/* Hours */}
          <div>
            <h2 className={heading}>Studio Hours</h2>
            <ul className="flex flex-col gap-1.5 font-sans text-sm">
              {HOURS.map((h) => (
                <li key={h.day} className="flex justify-between gap-4 sm:max-w-[15rem]">
                  <span className="text-cream-50">{h.short}</span>
                  <span className="text-cream-100/75">{h.label}</span>
                </li>
              ))}
            </ul>
          </div>

          {/* Reviews + social */}
          <div>
            <h2 className={heading}>Find Us Online</h2>
            <ul className="flex flex-col gap-3 font-sans text-sm">
              <li className="text-cream-100/75">
                Rated {GOOGLE_REVIEWS.rating} on Google ({GOOGLE_REVIEWS.count} reviews)
              </li>
              <li>
                <a href={googleReviewsHref()} {...newTab} className={muted}>
                  Review us on Google
                </a>
              </li>
              <li>
                <a href={INSTAGRAM.url} {...newTab} className={`${muted} inline-flex items-center gap-2`}>
                  <InstagramIcon className="size-4" />
                  {INSTAGRAM.handle}
                </a>
              </li>
              {/* MindBody booking stays in the same tab; the app smart link opens a new one. */}
              <li>
                <a href={MINDBODY.classesUrl} className={muted}>
                  Book on MindBody
                </a>
              </li>
              <li>
                <a href={MINDBODY.appUrl} {...newTab} className={muted}>
                  Get the Mindbody app
                </a>
              </li>
              <li>
                <a href={CLASSPASS_URL} {...newTab} className={muted}>
                  Book on ClassPass
                </a>
              </li>
              <li>
                <MindbodyAccountLink className="[&_a]:text-cream-100/75 [&_a]:transition-colors [&_a:hover]:text-cream-50" />
              </li>
            </ul>
          </div>

          {/* Quick nav */}
          <nav aria-label="Footer navigation">
            <h2 className={heading}>Explore</h2>
            <ul className="grid grid-cols-2 gap-x-6 gap-y-2 font-sans text-sm">
              {quickLinks.map(({ label, href }) => (
                <li key={href}>
                  <Link href={href} className={muted}>
                    {label}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>
        </div>

        <div className="mt-12 border-t border-cream-100/10 pt-6">
          <p className="text-center font-sans text-xs text-cream-100/50">
            &copy; {new Date().getFullYear()} {SITE_NAME}. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
}
