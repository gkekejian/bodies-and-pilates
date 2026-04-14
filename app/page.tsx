import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { HeroSection } from "@/components/sections/hero-section";
import { ClassCard } from "@/components/sections/class-card";

export const metadata: Metadata = {
  title: "Pilates Studio in North Hollywood | Bodies and Pilates",
  description:
    "Boutique Pilates studio in North Hollywood offering reformer & mat classes, private sessions, and beginner-friendly group classes. Book your $25 first class.",
};

// ─── Data ────────────────────────────────────────────────────────────────────

const classes = [
  {
    title: "Beginner Pilates",
    slug: "beginner",
    level: "Beginner",
    description:
      "New to Pilates? Start here. We guide you through foundational movements, proper alignment, and breath work in a welcoming, judgment-free environment.",
  },
  {
    title: "Full Body Pilates",
    slug: "full-body",
    level: "All Levels",
    description:
      "A comprehensive class that targets every major muscle group. Combining reformer and mat work, you will leave feeling balanced, strong, and energized.",
  },
  {
    title: "Flexibility & Flow",
    slug: "flexibility",
    level: "All Levels",
    description:
      "Lengthen and restore with this mobility-focused session. Deepen your range of motion, release tension, and cultivate a supple, agile body.",
  },
];

const testimonials = [
  {
    quote:
      "Naira is a 10 out of 10. She is a genuine instructor. She is friendly and really cares about everyone in the class. She has a lovely presence. I felt like I got my moneys worth. I was very impressed and I look forward to taking another class there.",
    author: "Studio Guest",
  },
  {
    quote:
      "Naira is very charming and kind but works us to a sweat, while being accommodating to our particular circumstances. I really enjoy her sessions.",
    author: "Studio Guest",
  },
  {
    quote:
      "I LOVE her classes! She has the best energy, it\u2019s calm and yet the sessions are very challenging.",
    author: "Studio Guest",
  },
];

const benefits = [
  "Increased core strength",
  "Better posture",
  "Reduced stress",
  "Improved coordination and balance",
];

// ─── Page ─────────────────────────────────────────────────────────────────────

export default function HomePage() {
  return (
    <>
      {/* 1. Hero — client component (framer-motion) */}
      <HeroSection />

      {/* 2. Welcome */}
      <section className="bg-cream-100 py-20 sm:py-28">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <p className="text-sage-500 font-sans text-xs tracking-[0.22em] uppercase mb-4">
            North Hollywood, CA
          </p>
          <h2 className="font-serif text-4xl sm:text-5xl text-charcoal-900 mb-6">
            Welcome
          </h2>
          <div className="w-12 h-px bg-sage-500 mx-auto mb-8" aria-hidden="true" />
          <p className="font-sans text-charcoal-800 text-lg leading-relaxed max-w-2xl mx-auto">
            Welcome to our curated studio, where we offer boutique Pilates classes in
            a warm and inviting setting. Join us on the journey to sculpt, balance,
            and grow together.
          </p>
        </div>
      </section>

      {/* 3. Classes Preview */}
      <section className="bg-cream-50 py-20 sm:py-28">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-14">
            <p className="text-sage-500 font-sans text-xs tracking-[0.22em] uppercase mb-4">
              What We Offer
            </p>
            <h2 className="font-serif text-4xl sm:text-5xl text-charcoal-900 mb-4">
              Our Classes
            </h2>
            <div className="w-12 h-px bg-sage-500 mx-auto" aria-hidden="true" />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
            {classes.map((cls) => (
              <ClassCard
                key={cls.slug}
                title={cls.title}
                slug={cls.slug}
                level={cls.level}
                description={cls.description}
              />
            ))}
          </div>

          <div className="text-center">
            <Link
              href="/classes"
              className="inline-block bg-sage-700 text-cream-50 font-sans font-semibold text-sm tracking-widest uppercase px-8 py-4 rounded-sm hover:bg-sage-500 transition-colors duration-200"
            >
              View All Classes
            </Link>
          </div>
        </div>
      </section>

      {/* 4. The Space */}
      <section className="bg-cream-200 py-20 sm:py-28">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20 items-center">
            {/* Text */}
            <div>
              <p className="text-sage-500 font-sans text-xs tracking-[0.22em] uppercase mb-4">
                Our Environment
              </p>
              <h2 className="font-serif text-4xl sm:text-5xl text-charcoal-900 mb-6">
                The Space
              </h2>
              <div className="w-12 h-px bg-sage-500 mb-8" aria-hidden="true" />
              <p className="font-sans text-charcoal-800 text-base leading-relaxed">
                At Bodies and Pilates, we pride ourselves in providing a luxurious,
                tranquil environment combined with cutting-edge fitness. Our boutique
                studio is equipped with state-of-the-art equipment, while our small
                class sizes allow for personalized attention and guidance throughout
                your workout.
              </p>
            </div>

            {/* Image */}
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

      {/* 5. The Practice */}
      <section className="bg-cream-50 py-20 sm:py-28">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20 items-start">
            <div>
              <p className="text-sage-500 font-sans text-xs tracking-[0.22em] uppercase mb-4">
                The Method
              </p>
              <h2 className="font-serif text-4xl sm:text-5xl text-charcoal-900 mb-6">
                The Practice
              </h2>
              <div className="w-12 h-px bg-sage-500 mb-8" aria-hidden="true" />
              <p className="font-sans text-charcoal-800 text-base leading-relaxed">
                Pilates is a versatile exercise system that strengthens muscles,
                improves flexibility, and enhances overall body alignment. We combine
                the best of low-impact movements with high-intensity focus to isolate
                and fatigue each muscle group for maximum effectiveness. Our aim is
                not just for physical strength but also for a harmonious balance
                between mind and body, leaving you rejuvenated and strong.
              </p>
            </div>

            {/* Benefits */}
            <div className="lg:pt-20">
              <p className="font-sans text-charcoal-800 text-base font-semibold mb-6">
                Some benefits include:
              </p>
              <ul className="space-y-4" aria-label="Pilates benefits">
                {benefits.map((benefit) => (
                  <li key={benefit} className="flex items-start gap-3">
                    <span
                      className="flex-shrink-0 w-5 h-5 rounded-full bg-sage-700 flex items-center justify-center mt-0.5"
                      aria-hidden="true"
                    >
                      <svg
                        className="w-3 h-3 text-cream-50"
                        viewBox="0 0 12 12"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <path
                          d="M2 6l3 3 5-5"
                          stroke="currentColor"
                          strokeWidth="1.5"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                        />
                      </svg>
                    </span>
                    <span className="font-sans text-charcoal-800 text-base">
                      {benefit}
                    </span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* 6. Testimonials */}
      <section className="bg-sage-700 py-20 sm:py-28">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-14">
            <p className="text-sage-300 font-sans text-xs tracking-[0.22em] uppercase mb-4">
              What Our Clients Say
            </p>
            <h2 className="font-serif text-4xl sm:text-5xl text-cream-50 mb-4">
              Testimonials
            </h2>
            <div className="w-12 h-px bg-sage-300 mx-auto" aria-hidden="true" />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {testimonials.map((t, i) => (
              <figure
                key={i}
                className="bg-sage-500/30 border border-sage-500/50 rounded-sm p-8 flex flex-col"
              >
                <blockquote className="font-sans text-cream-100 text-sm leading-relaxed mb-6 flex-1">
                  <span
                    className="text-sage-300 font-serif text-3xl leading-none block mb-2"
                    aria-hidden="true"
                  >
                    &ldquo;
                  </span>
                  {t.quote}
                </blockquote>
                <figcaption className="font-sans text-sage-300 text-xs tracking-widest uppercase">
                  {t.author}
                </figcaption>
              </figure>
            ))}
          </div>
        </div>
      </section>

      {/* 7. Pricing CTA */}
      <section className="bg-cream-100 py-20 sm:py-28">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <p className="text-sage-500 font-sans text-xs tracking-[0.22em] uppercase mb-4">
            Get Started
          </p>
          <h2 className="font-serif text-4xl sm:text-5xl text-charcoal-900 mb-4">
            Ready to Start?
          </h2>
          <div className="w-12 h-px bg-sage-500 mx-auto mb-8" aria-hidden="true" />
          <p className="font-sans text-charcoal-800 text-lg mb-10 max-w-lg mx-auto">
            Experience your first class for just{" "}
            <span className="font-semibold text-sage-700">$25</span>. No commitment
            required — simply show up and let us take care of the rest.
          </p>
          <Link
            href="/pricing"
            className="inline-block bg-sage-700 text-cream-50 font-sans font-semibold text-sm tracking-widest uppercase px-10 py-4 rounded-sm hover:bg-sage-500 transition-colors duration-200"
          >
            View Pricing
          </Link>
        </div>
      </section>
    </>
  );
}
