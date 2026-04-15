import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { IMAGES } from "@/lib/images";

export const metadata: Metadata = {
  title: "Our Instructors",
  description:
    "Meet the certified Pilates instructors at Bodies and Pilates in North Hollywood: Naira Sarkian, Theresia Bunch, Hannah Pink, Marlyn Ortiz, Enrika Navikaite, and Sita Acevedo.",
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

interface Instructor {
  name: string;
  slug: string;
  imageSrc: string;
  title: string;
  bio: string[]; // array of paragraphs
  detailHref: string | null;
}

const instructors: Instructor[] = [
  {
    name: "Naira Sarkian",
    slug: "naira",
    imageSrc: IMAGES.instructorNaira,
    title: "Owner & Lead Instructor",
    bio: [
      "Naira is the heart of Bodies and Pilates. As owner and lead instructor, she brings a passion for personalized Pilates practice to every session, guiding students of all levels toward strength, flexibility, and body awareness.",
    ],
    detailHref: "/instructors/naira",
  },
  {
    name: "Theresia Bunch",
    slug: "theresia",
    imageSrc: IMAGES.instructorTheresia,
    title: "Instructor",
    bio: [
      "Theresia holds a BS in Kinesiology with a pre-physical therapy emphasis, which grounds her teaching in a working knowledge of anatomy and movement science. She also spent 15 years as a classical ballerina, so intentional, precise movement has been central to her life for as long as she can remember.",
      "Her classes are challenging, creative flows designed to leave you feeling strong and centered. Theresia believes Pilates should feel welcoming for every body — regardless of background or experience. She is also known around the studio for her Pilates playlists; ask her for the Spotify link.",
    ],
    detailHref: null,
  },
  {
    name: "Hannah Pink",
    slug: "hannah",
    imageSrc: IMAGES.instructorHannah,
    title: "Instructor",
    bio: [
      "Hannah is a certified Pilates instructor trained through Integrated Movement and Wellness (formerly Long Beach Dance Conditioning). Raised by a Pilates master teacher, movement has shaped her entire life. Alongside teaching, she is a working professional dancer with credits across music videos, live performance, film, and television.",
      "In her classes, Hannah emphasizes breathwork, anatomical awareness, and efficient movement patterns. She regularly collaborates with physical therapists so clients receive integrated support — whether the goal is post-injury rehabilitation or pure fitness. Her teaching draws on the connection between mind, body, and spirit cultivated through years of dance and Pilates.",
    ],
    detailHref: null,
  },
  {
    name: "Marlyn Ortiz",
    slug: "marlyn",
    imageSrc: IMAGES.instructorMarlyn,
    title: "Instructor",
    bio: [
      "Marlyn brings more than two decades of professional experience as a dancer, choreographer, and aerialist. Her career spans Broadway productions, film and television projects, and tours alongside some of the industry's most recognized artists.",
      "Trained at the SUNY Purchase Dance Conservatory with continued work in acting, Marlyn's technical range covers classical, contemporary, and several other movement disciplines. That breadth — paired with a collaborative teaching style — shapes every session she leads.",
    ],
    detailHref: null,
  },
  {
    name: "Enrika Navikaite",
    slug: "enrika",
    imageSrc: IMAGES.instructorEnrika,
    title: "Instructor",
    bio: [
      "Born and raised in Lithuania, Enrika grew up drawn to dance and physical expression. Her academic path took her through a degree in Food Science, but her love for movement never faded. After moving to Los Angeles she explored a number of fitness practices before finding Pilates — a discipline that combined the strength and mindfulness she had been missing.",
      "Her enthusiasm led her to certification through Karen Lord Pilates Movement. Enrika now teaches with warm, vibrant energy, guiding students through challenging sessions that push both mind and body.",
    ],
    detailHref: null,
  },
  {
    name: "Sita Acevedo",
    slug: "sita",
    imageSrc: IMAGES.instructorSita,
    title: "Instructor",
    bio: [
      "Sita is an LA-based aerialist and certified movement instructor specializing in Pilates and GYROTONIC. Her teaching spans the full range — from beginner-friendly foundations to advanced reformer sessions built around core stability and creative sequencing.",
      "Her background as an aerial dance choreographer and performer shows up in her Pilates style: fluid, precise, and often inventive with prop work that adds intensity without losing form.",
    ],
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
          <div className="mb-12 max-w-2xl">
            <p className="text-sage-500 font-sans text-xs tracking-[0.22em] uppercase mb-4">
              Our Team
            </p>
            <h1 className="font-serif text-4xl sm:text-5xl text-charcoal-900 mb-4">
              Meet Our Instructors
            </h1>
            <p className="font-sans text-charcoal-800/70">
              Certified Pilates instructors with backgrounds in dance,
              kinesiology, and movement therapy — each bringing a distinct
              teaching style to the studio.
            </p>
          </div>

          {/* Instructor cards grid */}
          <div className="grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-3">
            {instructors.map((instructor) => (
              <article
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

                  <div className="font-sans text-sm leading-relaxed text-charcoal-800/75 flex-1 space-y-3">
                    {instructor.bio.map((paragraph, i) => (
                      <p key={i}>{paragraph}</p>
                    ))}
                  </div>

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
              </article>
            ))}
          </div>
        </div>
      </div>
    </>
  );
}
