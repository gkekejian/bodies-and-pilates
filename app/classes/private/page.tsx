import type { Metadata } from "next";
import { breadcrumbSchema } from "@/lib/breadcrumb";
import { ClassDetailClient } from "@/components/sections/class-page-client";
import { PrivatePricingBlock } from "@/components/sections/private-pricing-block";

export const metadata: Metadata = {
  title: "Private Pilates Sessions | North Hollywood",
  description:
    "Book a private 55-minute Pilates session in North Hollywood for personalized, one-on-one instruction. From $100. Duet sessions available at $140.",
  alternates: { canonical: "https://www.bodiesandpilates.com/classes/private" },
  openGraph: {
    title: "Private Pilates Sessions | North Hollywood | Bodies and Pilates",
    description:
      "Book a private 55-minute Pilates session in North Hollywood for personalized, one-on-one instruction. From $100. Duet sessions available at $140.",
    url: "https://www.bodiesandpilates.com/classes/private",
  },
};

const breadcrumb = breadcrumbSchema([
  { name: "Home", url: "https://www.bodiesandpilates.com" },
  { name: "Classes", url: "https://www.bodiesandpilates.com/classes" },
  { name: "Private Sessions", url: "https://www.bodiesandpilates.com/classes/private" },
]);

const serviceSchema = {
  "@context": "https://schema.org",
  "@type": "Service",
  name: "Private Pilates Session",
  provider: { "@id": "https://www.bodiesandpilates.com/#organization" },
  description:
    "55-minute one-on-one private Pilates session with personalized instruction at Bodies and Pilates in North Hollywood.",
  areaServed: { "@type": "City", name: "North Hollywood" },
  serviceType: "Private Pilates Session",
  offers: {
    "@type": "Offer",
    price: "100",
    priceCurrency: "USD",
    url: "https://clients.mindbodyonline.com/classic/ws?studioid=5739427&stype=43&prodid=100011",
  },
};

export default function PrivatePage() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumb) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(serviceSchema) }}
      />
      <ClassDetailClient
        title="Private Sessions"
        tagline="Entirely yours — instruction tailored to your body, your goals."
        description="Our 55-minute private sessions offer one-on-one personalized instruction tailored to your specific goals and needs. Ideal for injury rehabilitation, accelerated progress, or those who prefer individual attention."
        imageSrc="/images/class-private.jpg"
        imageAlt="Private Pilates session at Bodies and Pilates in North Hollywood"
        whatToExpect={[
          "A full 55-minute session dedicated exclusively to you",
          "Instructor designs the workout around your specific goals",
          "Detailed movement corrections and real-time feedback",
          "Full access to all reformers, apparatus, and props",
          "Programming tailored for rehabilitation or high-performance goals",
          "Flexible scheduling to fit your calendar",
        ]}
        benefits={[
          {
            heading: "100% Personalized",
            body: "Every exercise, set, and rep is chosen with your unique body and objectives in mind — not a group curriculum.",
          },
          {
            heading: "Accelerated Progress",
            body: "Undivided attention means faster technique improvements and quicker results compared to group classes.",
          },
          {
            heading: "Injury Rehabilitation",
            body: "Work safely around limitations with a program specifically built to support your recovery and rebuild strength.",
          },
          {
            heading: "Flexible Scheduling",
            body: "Book at a time that works for you — ideal for those with unpredictable schedules or specific time windows.",
          },
          {
            heading: "Duet Option",
            body: "Bring a friend or partner for a semi-private session — all the personalization of private training at a shared cost.",
          },
          {
            heading: "Expert Instruction",
            body: "Your instructor's full focus is on you, catching and correcting subtle form issues that group classes can miss.",
          },
        ]}
        pricingBlock={<PrivatePricingBlock />}
        ctas={[
          {
            label: "Book Private Session — $100",
            href: "https://clients.mindbodyonline.com/classic/ws?studioid=5739427&stype=43&prodid=100011",
            variant: "primary",
            external: true,
          },
          {
            label: "Book Duet Session — $140",
            href: "https://clients.mindbodyonline.com/classic/ws?studioid=5739427&stype=43&prodid=100016",
            variant: "outline",
            external: true,
          },
        ]}
      />
    </>
  );
}
