import { IMAGES } from "@/lib/images";
import type { Metadata } from "next";
import { breadcrumbSchema } from "@/lib/breadcrumb";
import { ClassDetailClient } from "@/components/sections/class-page-client";

export const metadata: Metadata = {
  title: "Flexibility & Stretch Class | North Hollywood",
  description:
    "Release tension and restore your body with our Flexibility & Stretch Pilates class in North Hollywood. Active stretching to improve flexibility, prevent injury, and reduce stress. Book from $25.",
  alternates: { canonical: "https://www.bodiesandpilates.com/classes/flexibility" },
  openGraph: {
    title: "Flexibility & Stretch Class | North Hollywood | Bodies and Pilates",
    description:
      "Release tension and restore your body with our Flexibility & Stretch Pilates class in North Hollywood. Active stretching to improve flexibility, prevent injury, and reduce stress. Book from $25.",
    url: "https://www.bodiesandpilates.com/classes/flexibility",
  },
};

const breadcrumb = breadcrumbSchema([
  { name: "Home", url: "https://www.bodiesandpilates.com" },
  { name: "Classes", url: "https://www.bodiesandpilates.com/classes" },
  { name: "Flexibility", url: "https://www.bodiesandpilates.com/classes/flexibility" },
]);

const serviceSchema = {
  "@context": "https://schema.org",
  "@type": "Service",
  name: "Flexibility & Stretch Pilates Class",
  provider: { "@id": "https://www.bodiesandpilates.com/#organization" },
  description:
    "Restorative flexibility and stretch class designed to improve mobility, prevent injury, and alleviate stress at Bodies and Pilates in North Hollywood.",
  areaServed: { "@type": "City", name: "North Hollywood" },
  serviceType: "Pilates Class",
  offers: {
    "@type": "Offer",
    price: "36",
    priceCurrency: "USD",
    url: "https://clients.mindbodyonline.com/classic/ws?studioid=5739427&stype=43&prodid=100003",
  },
};

export default function FlexibilityPage() {
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
        title="Flexibility & Stretch"
        tagline="Restore, release, and move with ease."
        description="Feeling tight? Our flexibility class offers a restorative experience designed to improve flexibility, prevent injury, and alleviate stress. Allow your body to rest and restore as you flow through active stretches."
        imageSrc={IMAGES.classFlexibility}
        imageAlt="Flexibility and stretch Pilates class at Bodies and Pilates in North Hollywood"
        whatToExpect={[
          "A slower, restorative pace focused on active stretching",
          "Guided movements to increase range of motion in key muscle groups",
          "Breath-led sequences that calm the mind alongside the body",
          "Small class sizes for personalized alignment feedback",
          "Modifications for different levels of current flexibility",
          "A deeply rejuvenating session that leaves you feeling open and restored",
        ]}
        benefits={[
          {
            heading: "Increased Flexibility",
            body: "Regular practice progressively improves your range of motion, making everyday movement feel effortless.",
          },
          {
            heading: "Injury Prevention",
            body: "Supple muscles and mobile joints are far less susceptible to strains, tears, and overuse injuries.",
          },
          {
            heading: "Stress Relief",
            body: "Active stretching paired with mindful breathing activates the parasympathetic nervous system, releasing physical and mental tension.",
          },
          {
            heading: "Improved Posture",
            body: "Releasing chronically tight muscles allows the spine and joints to return to their natural, healthy alignment.",
          },
          {
            heading: "Faster Recovery",
            body: "Flexibility work enhances circulation and reduces muscle soreness, helping you recover faster between more intense sessions.",
          },
          {
            heading: "Mind-Body Connection",
            body: "The slow, intentional nature of this class deepens your awareness of your own body and its patterns of tension.",
          },
        ]}
        ctas={[
          {
            label: "Book Flexibility Class — $25 First Class",
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
