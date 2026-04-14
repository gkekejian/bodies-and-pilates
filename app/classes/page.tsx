import type { Metadata } from "next";
import { breadcrumbSchema } from "@/lib/breadcrumb";
import { ClassesHeroSection, type ClassCardData } from "@/components/sections/class-page-client";

export const metadata: Metadata = {
  title: "Pilates Classes in North Hollywood",
  description:
    "Explore our boutique Pilates classes in North Hollywood: Beginner, Full Body, Flexibility, and Private sessions. Book your $25 first class today.",
  alternates: { canonical: "https://www.bodiesandpilates.com/classes" },
  openGraph: {
    title: "Pilates Classes in North Hollywood | Bodies and Pilates",
    description:
      "Explore our boutique Pilates classes in North Hollywood: Beginner, Full Body, Flexibility, and Private sessions. Book your $25 first class today.",
    url: "https://www.bodiesandpilates.com/classes",
  },
};

const breadcrumb = breadcrumbSchema([
  { name: "Home", url: "https://www.bodiesandpilates.com" },
  { name: "Classes", url: "https://www.bodiesandpilates.com/classes" },
]);

const classes: ClassCardData[] = [
  {
    name: "Beginner",
    slug: "beginner",
    description:
      "Our beginner class is curated with the fundamental pilates exercises. A more slow paced, full body workout that focuses on the basics. Great for those new to the Pilates practice, individuals who may have restrictions, or those who wish to deepen their existing practice.",
    imageSrc: "/images/class-beginner.jpg",
    imageAlt: "Beginner Pilates class at Bodies and Pilates in North Hollywood",
  },
  {
    name: "Full Body",
    slug: "fullbody",
    description:
      "Our classic full body class combining resistance training on different apparatuses and props! Designed to provide a full body workout targeting lower body, upper body, and core.",
    imageSrc: "/images/class-fullbody.jpg",
    imageAlt: "Full Body Pilates class at Bodies and Pilates in North Hollywood",
  },
  {
    name: "Flexibility",
    slug: "flexibility",
    description:
      "Feeling tight? Our flexibility class offers a restorative experience designed to improve flexibility, prevent injury, and alleviate stress. Allow your body to rest and restore as you flow through active stretches.",
    imageSrc: "/images/class-flexibility.jpg",
    imageAlt: "Flexibility and stretch Pilates class at Bodies and Pilates in North Hollywood",
  },
  {
    name: "Private",
    slug: "private",
    description:
      "Our 55-minute private sessions offer one-on-one personalized instruction tailored to your specific goals and needs. Ideal for injury rehabilitation, accelerated progress, or those who prefer individual attention.",
    imageSrc: "/images/class-private.jpg",
    imageAlt: "Private Pilates session at Bodies and Pilates in North Hollywood",
  },
];

export default function ClassesPage() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumb) }}
      />
      <ClassesHeroSection cards={classes} />
    </>
  );
}
