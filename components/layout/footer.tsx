import Link from "next/link";

// Inline Instagram SVG — lucide-react v1.x removed brand icons
function InstagramIcon({ className }: { className?: string }) {
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

const internalLinks = [
  { label: "Classes", href: "/classes" },
  { label: "Schedule", href: "/schedule" },
  { label: "Pricing", href: "/pricing" },
  { label: "About", href: "/about" },
  { label: "FAQ", href: "/faq" },
  { label: "Contact", href: "/contact" },
  { label: "Blog", href: "/blog" },
];

const hours = [
  { days: "Mon / Wed", time: "7:00 am – 8:00 pm" },
  { days: "Tue / Thu", time: "8:30 am – 8:30 pm" },
  { days: "Fri", time: "7:30 am – 11:30 am" },
  { days: "Sat / Sun", time: "9:00 am – 12:00 pm" },
];

export function Footer() {
  return (
    <footer className="bg-charcoal-900 text-cream-100">
      <div className="mx-auto max-w-7xl px-4 py-14 sm:px-6 lg:px-8">
        {/* Main grid */}
        <div className="grid grid-cols-1 gap-10 sm:grid-cols-2 lg:grid-cols-3">
          {/* Column 1: Logo + Contact */}
          <div className="flex flex-col gap-5">
            <div>
              <Link
                href="/"
                className="font-serif text-2xl font-semibold tracking-wide text-cream-50 transition-opacity hover:opacity-80"
              >
                Bodies &amp; Pilates
              </Link>
              <p className="mt-1 font-sans text-sm italic text-taupe-300">
                Empower Your Essence
              </p>
            </div>

            <address className="not-italic">
              <ul className="flex flex-col gap-2 font-sans text-sm text-cream-100/80">
                <li>
                  <a
                    href="https://maps.google.com/?q=5251+Vineland+Ave+Suite+6+North+Hollywood+CA+91601"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="leading-relaxed transition-colors hover:text-cream-50"
                  >
                    5251 Vineland Ave Suite 6
                    <br />
                    North Hollywood, CA 91601
                  </a>
                </li>
                <li>
                  <a
                    href="tel:+18186533883"
                    className="transition-colors hover:text-cream-50"
                  >
                    (818) 653-3883
                  </a>
                </li>
                <li>
                  <a
                    href="mailto:Naira@bodiesandpilates.com"
                    className="transition-colors hover:text-cream-50"
                  >
                    Naira@bodiesandpilates.com
                  </a>
                </li>
              </ul>
            </address>

            {/* Social links */}
            <div className="flex items-center gap-4">
              <a
                href="https://www.instagram.com/bodiesandpilates/"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Bodies and Pilates on Instagram"
                className="text-cream-100/70 transition-colors hover:text-cream-50"
              >
                <InstagramIcon className="size-5" />
              </a>
              <a
                href="https://www.facebook.com/people/Bodies-and-Pilates/61567392958788/"
                target="_blank"
                rel="noopener noreferrer"
                className="font-sans text-sm text-cream-100/70 transition-colors hover:text-cream-50"
              >
                Facebook
              </a>
              <a
                href="https://classpass.com/studios/bodies-and-pilates-los-angeles"
                target="_blank"
                rel="noopener noreferrer"
                className="font-sans text-sm text-cream-100/70 transition-colors hover:text-cream-50"
              >
                ClassPass
              </a>
            </div>
          </div>

          {/* Column 2: Hours */}
          <div>
            <h3 className="mb-4 font-serif text-base font-semibold uppercase tracking-widest text-taupe-300">
              Studio Hours
            </h3>
            <ul className="flex flex-col gap-3">
              {hours.map(({ days, time }) => (
                <li key={days} className="flex flex-col gap-0.5 font-sans text-sm">
                  <span className="font-medium text-cream-50">{days}</span>
                  <span className="text-cream-100/70">{time}</span>
                </li>
              ))}
            </ul>
          </div>

          {/* Column 3: Links */}
          <div>
            <h3 className="mb-4 font-serif text-base font-semibold uppercase tracking-widest text-taupe-300">
              Quick Links
            </h3>
            <ul className="flex flex-col gap-2">
              {internalLinks.map(({ label, href }) => (
                <li key={href}>
                  <Link
                    href={href}
                    className="font-sans text-sm text-cream-100/70 transition-colors hover:text-cream-50"
                  >
                    {label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Divider + copyright */}
        <div className="mt-12 border-t border-cream-100/10 pt-6">
          <p className="text-center font-sans text-xs text-cream-100/40">
            &copy; 2024 Bodies and Pilates. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
}
