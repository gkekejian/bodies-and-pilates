import type { Metadata } from "next";
import { HeroSection } from "@/components/sections/hero-section";
import { TrustStrip } from "@/components/sections/trust-strip";
import { WelcomeSection } from "@/components/sections/welcome-section";
import { PracticeSection } from "@/components/sections/practice-section";
import { EditorialClassGrid } from "@/components/sections/editorial-class-grid";
import { StudioSection } from "@/components/sections/studio-section";
import { PracticeCredibility } from "@/components/sections/practice-credibility";
import { TestimonialsCarousel } from "@/components/sections/testimonials-carousel";
import { FinalCta } from "@/components/sections/final-cta";

export const metadata: Metadata = {
  title: { absolute: "Pilates Studio in North Hollywood | Bodies and Pilates" },
  description:
    "Boutique Pilates studio in North Hollywood. Reformer, mat, and private classes for all levels. Your first class is $25. Book online today.",
};

// ─── Data ────────────────────────────────────────────────────────────────────

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

// ─── Page ─────────────────────────────────────────────────────────────────────

export default function HomePage() {
  return (
    <>
      <HeroSection />
      <TrustStrip />
      <WelcomeSection />
      <PracticeSection />
      <EditorialClassGrid />
      <StudioSection />
      <PracticeCredibility />
      <TestimonialsCarousel testimonials={testimonials} />
      <FinalCta />
    </>
  );
}
