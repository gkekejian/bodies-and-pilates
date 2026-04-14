import type { Metadata } from "next";
import { breadcrumbSchema } from "@/lib/breadcrumb";
import { ClassDetailClient } from "@/components/sections/class-page-client";

export const metadata: Metadata = {
  title: "Beginner Pilates Classes | North Hollywood",
  description:
    "Start your Pilates journey with our beginner class in North Hollywood. Fundamental exercises, slow-paced full body workout, perfect for newcomers. Book from $25.",
  alternates: { canonical: "https://www.bodiesandpilates.com/classes/beginner" },
  openGraph: {
    title: "Beginner Pilates Classes | North Hollywood | Bodies and Pilates",
    description:
      "Start your Pilates journey with our beginner class in North Hollywood. Fundamental exercises, slow-paced full body workout, perfect for newcomers. Book from $25.",
    url: "https://www.bodiesandpilates.com/classes/beginner",
  },
};

const breadcrumb = breadcrumbSchema([
  { name: "Home", url: "https://www.bodiesandpilates.com" },
  { name: "Classes", url: "https://www.bodiesandpilates.com/classes" },
  { name: "Beginner", url: "https://www.bodiesandpilates.com/classes/beginner" },
]);

const serviceSchema = {
  "@context": "https://schema.org",
  "@type": "Service",
  name: "Beginner Pilates Class",
  provider: { "@id": "https://www.bodiesandpilates.com/#organization" },
  description:
    "Beginner Pilates class with fundamental exercises at Bodies and Pilates in North Hollywood.",
  areaServed: { "@type": "City", name: "North Hollywood" },
  serviceType: "Pilates Class",
  offers: {
    "@type": "Offer",
    price: "36",
    priceCurrency: "USD",
    url: "https://clients.mindbodyonline.com/classic/ws?studioid=5739427&stype=43&prodid=100003",
  },
};

export default function BeginnerPage() {
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
        title="Beginner Pilates"
        tagline="The perfect starting point — no experience needed."
        description="Our beginner class is curated with the fundamental pilates exercises. A more slow paced, full body workout that focuses on the basics. Great for those new to the Pilates practice, individuals who may have restrictions, or those who wish to deepen their existing practice."
        imageSrc="/images/class-beginner.jpg"
        imageAlt="Beginner Pilates class at Bodies and Pilates in North Hollywood"
        whatToExpect={[
          "A welcoming, judgment-free environment for all fitness levels",
          "Introduction to core Pilates equipment and apparatus",
          "Slow-paced instruction with detailed form cues",
          "Small class sizes for hands-on instructor guidance",
          "Modifications offered for any restrictions or injuries",
          "A full-body workout that builds your Pilates foundation",
        ]}
        benefits={[
          {
            heading: "Build a Strong Foundation",
            body: "Master the fundamental movements before progressing to more advanced work, ensuring proper form and reducing injury risk.",
          },
          {
            heading: "Accessible for Everyone",
            body: "Whether you have physical restrictions or simply want to start fresh, this class meets you where you are.",
          },
          {
            heading: "Deepen Your Practice",
            body: "Even seasoned movers benefit from revisiting the basics — often discovering new depth in familiar exercises.",
          },
          {
            heading: "Personalized Attention",
            body: "Our small class sizes mean your instructor can observe and correct your form throughout every session.",
          },
          {
            heading: "Improve Body Awareness",
            body: "Develop a connection between mind and muscle that will serve you in every class — and in daily life.",
          },
          {
            heading: "Stress Relief",
            body: "The mindful, intentional pace of beginner Pilates helps calm the nervous system and reduce stress.",
          },
        ]}
        ctas={[
          {
            label: "Book Beginner Class — $25 First Class",
            href: "https://clients.mindbodyonline.com/classic/ws?studioid=5739427&stype=43&prodid=100010",
            variant: "primary",
            external: true,
          },
          {
            label: "View Class Packages",
            href: "/pricing",
            variant: "outline",
            external: false,
          },
        ]}
      />
    </>
  );
}
