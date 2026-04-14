import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { breadcrumbSchema } from "@/lib/breadcrumb";

// ─── Metadata ────────────────────────────────────────────────────────────────

export const metadata: Metadata = {
  title: "About Us",
  description:
    "Learn about Bodies and Pilates, a boutique Pilates studio in North Hollywood led by owner and instructor Naira Sarkian.",
};

// ─── Structured data ─────────────────────────────────────────────────────────

const schema = breadcrumbSchema([
  { name: "Home", url: "https://www.bodiesandpilates.com/" },
  { name: "About", url: "https://www.bodiesandpilates.com/about" },
]);

// ─── Instructor data ─────────────────────────────────────────────────────────

const instructors = [
  {
    name: "Naira Sarkian",
    role: "Owner & Lead Instructor",
    image: "/images/instructor-naira.jpg",
    href: "/instructors/naira",
    bio: "TODO: Add Naira's bio.",
    schedule: "All classes",
  },
  {
    name: "Theresia",
    role: "Instructor",
    image: "/images/instructor-theresia.jpg",
    href: "/instructors",
    bio: "TODO: Add Theresia's bio.",
    schedule: "Wednesdays",
  },
  {
    name: "Hannah",
    role: "Instructor",
    image: "/images/instructor-hannah.jpg",
    href: "/instructors",
    bio: "TODO: Add Hannah's bio.",
    schedule: "Select classes",
  },
];

// ─── Page ─────────────────────────────────────────────────────────────────────

export default function AboutPage() {
  return (
    <>
      {/* JSON-LD */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
      />

      {/* 1. Page Header */}
      <section className="bg-cream-200 py-16 sm:py-20">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Breadcrumb */}
          <nav aria-label="Breadcrumb" className="mb-6">
            <ol className="flex items-center gap-2 font-sans text-sm text-taupe-500">
              <li>
                <Link href="/" className="hover:text-sage-700 transition-colors duration-200">
                  Home
                </Link>
              </li>
              <li aria-hidden="true" className="text-taupe-300">
                /
              </li>
              <li className="text-charcoal-800 font-medium" aria-current="page">
                About
              </li>
            </ol>
          </nav>

          <p className="text-sage-500 font-sans text-xs tracking-[0.22em] uppercase mb-4">
            Our Story
          </p>
          <h1 className="font-serif text-5xl sm:text-6xl text-charcoal-900 mb-4">
            About Us
          </h1>
          <div className="w-12 h-px bg-sage-500" aria-hidden="true" />
        </div>
      </section>

      {/* 2. Studio Story — The Space */}
      <section className="bg-cream-50 py-20 sm:py-28">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20 items-center">
            <div>
              <p className="text-sage-500 font-sans text-xs tracking-[0.22em] uppercase mb-4">
                Our Environment
              </p>
              <h2 className="font-serif text-4xl sm:text-5xl text-charcoal-900 mb-6">
                About Bodies and Pilates
              </h2>
              <div className="w-12 h-px bg-sage-500 mb-8" aria-hidden="true" />
              <p className="font-sans text-charcoal-800 text-base leading-relaxed mb-8">
                At Bodies and Pilates, we pride ourselves in providing a luxurious,
                tranquil environment combined with cutting-edge fitness. Our boutique
                studio is equipped with state-of-the-art equipment, while our small
                class sizes allow for personalized attention and guidance throughout
                your workout.
              </p>
              <p className="font-sans text-charcoal-800 text-base leading-relaxed">
                Pilates is a versatile exercise system that strengthens muscles,
                improves flexibility, and enhances overall body alignment. We combine
                the best of low-impact movements with high-intensity focus to isolate
                and fatigue each muscle group for maximum effectiveness. Our aim is
                not just for physical strength but also for a harmonious balance
                between mind and body, leaving you rejuvenated and strong.
              </p>
            </div>

            <div className="relative aspect-[4/3] rounded-sm overflow-hidden shadow-lg">
              <Image
                src="/images/studio.jpg"
                alt="Bodies and Pilates studio interior"
                fill
                className="object-cover object-center"
                sizes="(max-width: 1024px) 100vw, 50vw"
              />
            </div>
          </div>
        </div>
      </section>

      {/* 3. Mission */}
      <section className="bg-cream-100 py-20 sm:py-28">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-3xl mx-auto text-center">
            <p className="text-sage-500 font-sans text-xs tracking-[0.22em] uppercase mb-4">
              Why We Exist
            </p>
            <h2 className="font-serif text-4xl sm:text-5xl text-charcoal-900 mb-6">
              Our Mission
            </h2>
            <div className="w-12 h-px bg-sage-500 mx-auto mb-10" aria-hidden="true" />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              {
                title: "Wellness",
                icon: (
                  <svg
                    className="w-6 h-6 text-sage-700"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth={1.5}
                    viewBox="0 0 24 24"
                    aria-hidden="true"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M12 21.593c-5.63-5.539-11-10.297-11-14.402C1 3.518 3.52 1 6.5 1c1.924 0 3.623 1.004 4.5 2.484C11.877 2.004 13.576 1 15.5 1 18.48 1 21 3.518 21 7.191c0 4.105-5.37 8.863-9 12.402z"
                    />
                  </svg>
                ),
                description:
                  "We believe movement is medicine. Every class is designed to nourish your body and mind, leaving you stronger and more at ease.",
              },
              {
                title: "Community",
                icon: (
                  <svg
                    className="w-6 h-6 text-sage-700"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth={1.5}
                    viewBox="0 0 24 24"
                    aria-hidden="true"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M18 18.72a9.094 9.094 0 003.741-.479 3 3 0 00-4.682-2.72m.94 3.198l.001.031c0 .225-.012.447-.037.666A11.944 11.944 0 0112 21c-2.17 0-4.207-.576-5.963-1.584A6.062 6.062 0 016 18.719m12 0a5.971 5.971 0 00-.941-3.197m0 0A5.995 5.995 0 0012 12.75a5.995 5.995 0 00-5.058 2.772m0 0a3 3 0 00-4.681 2.72 8.986 8.986 0 003.74.477m.94-3.197a5.971 5.971 0 00-.94 3.197M15 6.75a3 3 0 11-6 0 3 3 0 016 0zm6 3a2.25 2.25 0 11-4.5 0 2.25 2.25 0 014.5 0zm-13.5 0a2.25 2.25 0 11-4.5 0 2.25 2.25 0 014.5 0z"
                    />
                  </svg>
                ),
                description:
                  "Bodies and Pilates is more than a studio — it is a community. We foster genuine connections and celebrate every milestone together.",
              },
              {
                title: "Personalized Attention",
                icon: (
                  <svg
                    className="w-6 h-6 text-sage-700"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth={1.5}
                    viewBox="0 0 24 24"
                    aria-hidden="true"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M9.813 15.904L9 18.75l-.813-2.846a4.5 4.5 0 00-3.09-3.09L2.25 12l2.846-.813a4.5 4.5 0 003.09-3.09L9 5.25l.813 2.846a4.5 4.5 0 003.09 3.09L15.75 12l-2.846.813a4.5 4.5 0 00-3.09 3.09z"
                    />
                  </svg>
                ),
                description:
                  "Our intentionally small class sizes mean your instructor knows your name, your goals, and your body — guiding every session with care.",
              },
            ].map(({ title, icon, description }) => (
              <div
                key={title}
                className="bg-cream-50 border border-taupe-300/50 rounded-sm p-8 text-center"
              >
                <div className="w-12 h-12 rounded-full bg-sage-700/10 flex items-center justify-center mx-auto mb-5">
                  {icon}
                </div>
                <h3 className="font-serif text-xl text-charcoal-900 mb-3">{title}</h3>
                <p className="font-sans text-charcoal-800 text-sm leading-relaxed">
                  {description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 4. Instructors */}
      <section className="bg-cream-200 py-20 sm:py-28">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-14">
            <p className="text-sage-500 font-sans text-xs tracking-[0.22em] uppercase mb-4">
              Meet the Team
            </p>
            <h2 className="font-serif text-4xl sm:text-5xl text-charcoal-900 mb-4">
              Our Instructors
            </h2>
            <div className="w-12 h-px bg-sage-500 mx-auto" aria-hidden="true" />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {instructors.map((instructor) => (
              <Link
                key={instructor.name}
                href={instructor.href}
                className="group bg-cream-50 rounded-sm border border-taupe-300/50 overflow-hidden block hover:shadow-lg transition-shadow duration-300"
              >
                {/* Photo */}
                <div className="relative aspect-[3/4] overflow-hidden bg-cream-200">
                  <Image
                    src={instructor.image}
                    alt={`${instructor.name}, ${instructor.role}`}
                    fill
                    className="object-cover object-top group-hover:scale-105 transition-transform duration-500"
                    sizes="(max-width: 768px) 100vw, 33vw"
                  />
                </div>

                {/* Info */}
                <div className="p-6">
                  <h3 className="font-serif text-xl text-charcoal-900 mb-1">
                    {instructor.name}
                  </h3>
                  <p className="font-sans text-sage-700 text-sm font-medium mb-2">
                    {instructor.role}
                  </p>
                  <p className="font-sans text-taupe-500 text-xs tracking-wide uppercase mb-4">
                    {instructor.schedule}
                  </p>
                  <p className="font-sans text-charcoal-800 text-sm leading-relaxed">
                    {instructor.bio}
                  </p>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* 5. CTA */}
      <section className="bg-sage-700 py-20 sm:py-28">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <p className="text-sage-300 font-sans text-xs tracking-[0.22em] uppercase mb-4">
            Your Journey Starts Here
          </p>
          <h2 className="font-serif text-4xl sm:text-5xl text-cream-50 mb-6">
            Begin Your Journey
          </h2>
          <div className="w-12 h-px bg-sage-300 mx-auto mb-8" aria-hidden="true" />
          <p className="font-sans text-cream-100 text-lg mb-10 max-w-lg mx-auto">
            Ready to discover the transformative power of Pilates? Join our community
            and take the first step toward a stronger, more balanced you.
          </p>
          <Link
            href="/pricing"
            className="inline-block bg-cream-50 text-sage-700 font-sans font-semibold text-sm tracking-widest uppercase px-10 py-4 rounded-sm hover:bg-cream-200 transition-colors duration-200"
          >
            View Pricing
          </Link>
        </div>
      </section>
    </>
  );
}
