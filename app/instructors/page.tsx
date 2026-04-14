import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { IMAGES } from "@/lib/images";

export const metadata: Metadata = {
  title: "Our Instructors",
  description:
    "Meet the certified Pilates instructors at Bodies and Pilates in North Hollywood: Naira Sarkian (owner), Theresia, and Hannah.",
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
  ],
};

const instructors = [
  {
    name: "Naira Sarkian",
    slug: "naira",
    imageSrc: IMAGES.instructorNaira,
    title: "Owner & Lead Instructor",
    bio: "Naira is the heart of Bodies and Pilates. As owner and lead instructor, she brings a passion for personalized Pilates practice to every session, guiding students of all levels toward strength, flexibility, and body awareness.",
    detailHref: "/instructors/naira",
  },
  {
    name: "Theresia",
    slug: "theresia",
    imageSrc: IMAGES.instructorTheresia,
    title: "Instructor (Wednesdays)",
    // TODO: Add Theresia's biography
    bio: null,
    detailHref: null,
  },
  {
    name: "Hannah",
    slug: "hannah",
    imageSrc: IMAGES.instructorHannah,
    title: "Instructor",
    // TODO: Add Hannah's biography
    bio: null,
    detailHref: null,
  },
];

export default function InstructorsPage() {
  return (
    <>
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
              <li className="text-charcoal-800" aria-current="page">
                Instructors
              </li>
            </ol>
          </nav>

          {/* Page heading */}
          <h1 className="font-serif text-4xl font-semibold text-charcoal-800 sm:text-5xl mb-12">
            Meet Our Instructors
          </h1>

          {/* Instructor cards grid */}
          <div className="grid grid-cols-1 gap-10 sm:grid-cols-2 lg:grid-cols-3">
            {instructors.map((instructor) => (
              <div
                key={instructor.slug}
                className="flex flex-col bg-cream-100 rounded-2xl overflow-hidden shadow-sm"
              >
                {/* Photo */}
                <div className="relative aspect-[3/4] w-full bg-cream-200">
                  <Image
                    src={instructor.imageSrc}
                    alt={`${instructor.name}, ${instructor.title} at Bodies and Pilates`}
                    fill
                    sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                    className="object-cover object-top"
                  />
                </div>

                {/* Card body */}
                <div className="flex flex-col flex-1 p-6 gap-3">
                  <div>
                    <h2 className="font-serif text-xl font-semibold text-charcoal-800">
                      {instructor.name}
                    </h2>
                    <p className="font-sans text-sm text-sage-500 mt-0.5">
                      {instructor.title}
                    </p>
                  </div>

                  <p className="font-sans text-sm leading-relaxed text-charcoal-800/70 flex-1">
                    {instructor.bio ?? (
                      <span className="italic text-charcoal-800/40">
                        {/* TODO: Add bio */}
                        Bio coming soon.
                      </span>
                    )}
                  </p>

                  {instructor.detailHref && (
                    <Link
                      href={instructor.detailHref}
                      className="mt-2 inline-flex items-center gap-1.5 font-sans text-sm font-medium text-sage-700 underline underline-offset-4 transition-colors hover:text-sage-500"
                    >
                      Learn more about {instructor.name.split(" ")[0]}
                      <span aria-hidden="true">→</span>
                    </Link>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </>
  );
}
