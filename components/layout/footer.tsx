import Link from "next/link";
import Image from "next/image";
import { MindbodyAccountLink } from "@/components/mindbody/account-link";
import { CookieSettingsButton } from "@/components/analytics/cookie-banner";
import { Camera, Mail, MapPin, Phone } from "lucide-react";
import { CtaLink } from "@/components/ui/cta-link";
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

const heading = "mb-4 smallcaps text-sm text-sage-300";
const muted = "inline-block py-1 text-cream-100/80 transition-colors hover:text-cream-50";
const row = "flex items-start gap-4 font-accent text-[15px] leading-snug text-cream-50";
const icon = "mt-0.5 size-5 shrink-0 text-taupe-300";

const newTab = { target: "_blank", rel: "noopener noreferrer" } as const;

/** The old site's quiet "Get in Touch" footer, with the new site's links kept below it. */
export function Footer() {
  return (
    <footer className="bg-sage-900 text-cream-100">
      <div className="mx-auto max-w-6xl px-4 py-16 sm:px-6 sm:py-20 lg:px-8">
        <div className="grid grid-cols-1 items-start gap-12 md:grid-cols-12">
          <Link
            href="/"
            className="inline-flex w-fit justify-self-center transition-opacity hover:opacity-80 md:col-span-3 md:justify-self-start"
            aria-label="Bodies and Pilates, home"
          >
            {/* Official round logo, light version for the sage footer. */}
            <Image
              src="/images/bodies-and-pilates-logo-round-light.png"
              alt="Bodies and Pilates logo"
              width={1342}
              height={1376}
              sizes="176px"
              className="h-36 w-auto object-contain sm:h-44"
            />
          </Link>

          {/* Get in Touch */}
          <div className="md:col-span-5">
            <h2 className="inline-block border-b border-taupe-300/70 pb-2 pr-10 font-serif text-3xl text-cream-50 sm:text-4xl">
              Get in Touch
            </h2>
            <address className="mt-7 not-italic">
              <ul className="flex flex-col gap-5">
                <li>
                  <a href={`mailto:${EMAIL}`} className={`${row} break-all hover:text-cream-100`}>
                    <Mail aria-hidden="true" className={icon} />
                    <span><span className="sr-only">Email: </span>{EMAIL}</span>
                  </a>
                </li>
                <li>
                  <a href={MAPS_URL} {...newTab} className={`${row} hover:text-cream-100`}>
                    <MapPin aria-hidden="true" className={icon} />
                    <span>
                      <span className="sr-only">Address: </span>
                      {ADDRESS.street}
                      <br />
                      {ADDRESS.city}, {ADDRESS.region} {ADDRESS.zip}
                    </span>
                  </a>
                </li>
                <li>
                  <a href={INSTAGRAM.url} {...newTab} className={`${row} hover:text-cream-100`}>
                    <Camera aria-hidden="true" className={icon} />
                    <span><span className="sr-only">Instagram: </span>{INSTAGRAM.handle}</span>
                  </a>
                </li>
                <li>
                  <a href={PHONE.tel} className={`${row} hover:text-cream-100`}>
                    <Phone aria-hidden="true" className={icon} />
                    <span><span className="sr-only">Phone: </span>{PHONE.display}</span>
                  </a>
                </li>
              </ul>
            </address>
          </div>

          {/* Book + hours */}
          <div className="flex flex-col gap-8 md:col-span-4">
            {/* Mindbody booking stays in the same tab. */}
            <CtaLink href={MINDBODY.classesUrl} variant="ghost-light" className="w-full sm:w-auto">
              Book a Session
            </CtaLink>
            <div>
              <h2 className={heading}>Studio Hours</h2>
              <ul className="flex flex-col gap-1.5 font-sans text-sm">
                {HOURS.map((h) => (
                  <li key={h.day} className="flex justify-between gap-4">
                    <span className="text-cream-50">{h.short}</span>
                    <span className="text-cream-100/80">{h.label}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>

        <div className="mt-14 grid gap-10 border-t border-cream-100/15 pt-10 sm:grid-cols-2">
          <nav aria-label="Footer navigation">
            <h2 className={heading}>Explore</h2>
            <ul className="grid grid-cols-2 gap-x-6 gap-y-1 font-sans text-sm">
              {quickLinks.map(({ label, href }) => (
                <li key={href}>
                  <Link href={href} className={muted}>
                    {label}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>

          <div>
            <h2 className={heading}>Find Us Online</h2>
            <ul className="flex flex-col gap-1 font-sans text-sm">
              <li className="py-1 text-cream-100/80">
                Rated {GOOGLE_REVIEWS.rating} on Google ({GOOGLE_REVIEWS.count} reviews)
              </li>
              <li>
                <a href={googleReviewsHref()} {...newTab} className={muted}>
                  Review us on Google
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
                <MindbodyAccountLink className="[&_a]:text-cream-100/80 [&_a]:transition-colors [&_a:hover]:text-cream-50" />
              </li>
            </ul>
          </div>
        </div>

        <div className="mt-12 flex flex-col items-center gap-3 border-t border-cream-100/15 pt-6 text-xs text-cream-100/75 sm:flex-row sm:justify-between">
          <p className="font-accent text-sm">
            &copy; {new Date().getFullYear()} {SITE_NAME}. All rights reserved.
          </p>
          <nav aria-label="Legal" className="flex flex-wrap items-center justify-center gap-x-5 gap-y-2 font-sans">
            <Link href="/privacy" className={muted}>
              Privacy Policy
            </Link>
            <Link href="/terms" className={muted}>
              Terms of Use
            </Link>
            <CookieSettingsButton className={`${muted} underline-offset-2 hover:underline`} />
          </nav>
        </div>
      </div>
    </footer>
  );
}
