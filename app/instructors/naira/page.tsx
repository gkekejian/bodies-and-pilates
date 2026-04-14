import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Naira Sarkian | Lead Instructor & Owner",
  description:
    "Meet Naira Sarkian, owner and lead Pilates instructor at Bodies and Pilates in North Hollywood. Certified instructor with a passion for personalized Pilates practice.",
};

const personSchema = {
  "@context": "https://schema.org",
  "@type": "Person",
  name: "Naira Sarkian",
  jobTitle: "Pilates Instructor",
  worksFor: {
    "@id": "https://www.bodiesandpilates.com/#organization",
  },
  email: "Naira@bodiesandpilates.com",
  sameAs: ["https://www.instagram.com/nairasarkian/"],
};

const breadcrumbSchema = {
  "@context": "https://schema.org",
  "@type": "BreadcrumbList",
  itemListElement: [
    {
      "@type": "ListItem",
      position: 1,
      name: "Home",
      item: "https://www.bodiesandpilates.com",
    },
    {
      "@type": "ListItem",
      position: 2,
      name: "Instructors",
      item: "https://www.bodiesandpilates.com/instructors",
    },
    {
      "@type": "ListItem",
      position: 3,
      name: "Naira Sarkian",
      item: "https://www.bodiesandpilates.com/instructors/naira",
    },
  ],
};

// Inline Instagram SVG — matching the pattern used in footer.tsx
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

export default function NairaPage() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(personSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }}
      />

      <div className="bg-cream-50 py-16 sm:py-20">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Breadcrumb */}
          <nav aria-label="Breadcrumb" className="mb-8">
            <ol className="flex items-center gap-2 font-sans text-sm text-charcoal-800/60">
              <li>
                <Link href="/" className="transition-colors hover:text-sage-500">
                  Home
                </Link>
              </li>
              <li aria-hidden="true" className="select-none">
                /
              </li>
              <li>
                <Link
                  href="/instructors"
                  className="transition-colors hover:text-sage-500"
                >
                  Instructors
                </Link>
              </li>
              <li aria-hidden="true" className="select-none">
                /
              </li>
              <li className="text-charcoal-800" aria-current="page">
                Naira Sarkian
              </li>
            </ol>
          </nav>

          {/* Main content */}
          <div className="grid grid-cols-1 gap-12 lg:grid-cols-2 lg:gap-16 items-start">
            {/* Large photo */}
            <div className="relative aspect-[3/4] w-full max-w-md mx-auto lg:mx-0 bg-cream-200 rounded-2xl overflow-hidden shadow-md">
              <Image
                src="/images/instructor-naira.jpg"
                alt="Naira Sarkian, Owner and Lead Instructor at Bodies and Pilates"
                fill
                sizes="(max-width: 1024px) 100vw, 50vw"
                className="object-cover object-top"
                priority
              />
            </div>

            {/* Profile details */}
            <div className="flex flex-col gap-6">
              {/* Name and title */}
              <div>
                <h1 className="font-serif text-4xl font-semibold text-charcoal-800 sm:text-5xl">
                  Naira Sarkian
                </h1>
                <p className="mt-2 font-sans text-lg text-sage-500">
                  Owner &amp; Lead Instructor
                </p>
              </div>

              {/* Bio */}
              <div className="prose prose-sm max-w-none font-sans text-charcoal-800/80 leading-relaxed">
                <p>
                  Naira Sarkian is the owner and lead instructor at Bodies and
                  Pilates.{" "}
                  <span className="italic text-charcoal-800/40">
                    {/* TODO: Add full biography */}
                    [TODO: Add full biography]
                  </span>
                </p>
              </div>

              {/* Contact & social */}
              <div className="flex flex-col gap-3 pt-2">
                <a
                  href="mailto:Naira@bodiesandpilates.com"
                  className="inline-flex items-center gap-2 font-sans text-sm text-charcoal-800/70 transition-colors hover:text-sage-500"
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="1.75"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    className="size-4 shrink-0"
                    aria-hidden="true"
                  >
                    <rect width="20" height="16" x="2" y="4" rx="2" />
                    <path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7" />
                  </svg>
                  Naira@bodiesandpilates.com
                </a>

                <a
                  href="https://www.instagram.com/nairasarkian/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 font-sans text-sm text-charcoal-800/70 transition-colors hover:text-sage-500"
                >
                  <InstagramIcon className="size-4 shrink-0" />
                  @nairasarkian
                </a>
              </div>

              {/* CTA */}
              <div className="pt-2">
                <Link
                  href="/schedule"
                  className="inline-flex h-11 items-center justify-center rounded-lg bg-sage-700 px-6 font-sans text-sm font-medium text-cream-50 transition-colors hover:bg-sage-500 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-sage-500 focus-visible:ring-offset-2"
                >
                  Book a class with Naira
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
