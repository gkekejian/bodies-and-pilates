import { IMAGES } from "@/lib/images";
import type { Metadata } from "next";
import { breadcrumbSchema } from "@/lib/breadcrumb";
import { ClassDetailClient } from "@/components/sections/class-page-client";

export const metadata: Metadata = {
  title: "Full Body Pilates Class | North Hollywood",
  description:
    "Challenge your entire body with our Full Body Pilates class in North Hollywood. Resistance training on reformers and props targeting lower body, upper body, and core. Book from $25.",
  alternates: { canonical: "https://www.bodiesandpilates.com/classes/fullbody" },
  openGraph: {
    title: "Full Body Pilates Class | North Hollywood | Bodies and Pilates",
    description:
      "Challenge your entire body with our Full Body Pilates class in North Hollywood. Resistance training on reformers and props targeting lower body, upper body, and core. Book from $25.",
    url: "https://www.bodiesandpilates.com/classes/fullbody",
  },
};

const breadcrumb = breadcrumbSchema([
  { name: "Home", url: "https://www.bodiesandpilates.com" },
  { name: "Classes", url: "https://www.bodiesandpilates.com/classes" },
  { name: "Full Body", url: "https://www.bodiesandpilates.com/classes/fullbody" },
]);

const serviceSchema = {
  "@context": "https://schema.org",
  "@type": "Service",
  name: "Full Body Pilates Class",
  provider: { "@id": "https://www.bodiesandpilates.com/#organization" },
  description:
    "Full Body Pilates class combining resistance training on multiple apparatuses at Bodies and Pilates in North Hollywood.",
  areaServed: { "@type": "City", name: "North Hollywood" },
  serviceType: "Pilates Class",
  offers: {
    "@type": "Offer",
    price: "36",
    priceCurrency: "USD",
    url: "https://clients.mindbodyonline.com/classic/ws?studioid=5739427&stype=43&prodid=100003",
  },
};

export default function FullBodyPage() {
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
        title="Full Body Pilates"
        tagline="Work every muscle group — one energizing class at a time."
        description="Our classic full body class combining resistance training on different apparatuses and props! Designed to provide a full body workout targeting lower body, upper body, and core."
        imageSrc={IMAGES.classFullbody}
        imageAlt="Full Body Pilates class at Bodies and Pilates in North Hollywood"
        whatToExpect={[
          "A dynamic, energizing session using reformers and Pilates props",
          "Exercises targeting lower body, upper body, and core in a single class",
          "Resistance-based training that builds long, lean muscle",
          "Small class sizes with attentive instructor guidance",
          "Movements scaled to your current fitness level",
          "A balanced workout that leaves you feeling strong and accomplished",
        ]}
        benefits={[
          {
            heading: "Total Body Strength",
            body: "Every session targets multiple muscle groups simultaneously, creating balanced strength from head to toe.",
          },
          {
            heading: "Lean Muscle Definition",
            body: "Pilates resistance training elongates and defines muscles without adding bulk.",
          },
          {
            heading: "Improved Posture",
            body: "Strengthening the core and stabilizing muscles naturally corrects postural imbalances over time.",
          },
          {
            heading: "Variety of Equipment",
            body: "Working across reformers, chairs, and props keeps your body guessing and your progress consistent.",
          },
          {
            heading: "Efficient Workout",
            body: "Get a comprehensive full-body session in under an hour — perfect for busy schedules.",
          },
          {
            heading: "Scalable Intensity",
            body: "Whether you're just getting started or are an experienced mover, resistance levels adjust to challenge you appropriately.",
          },
        ]}
        ctas={[
          {
            label: "Book Full Body Class — $25 First Class",
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
