import { IMAGES } from "@/lib/images";
import type { Metadata } from "next";
import { breadcrumbSchema } from "@/lib/breadcrumb";
import { ClassDetailClient } from "@/components/sections/class-page-client";

export const metadata: Metadata = {
  title: "Reformer Pilates in North Hollywood",
  description:
    "Reformer Pilates classes in North Hollywood. Small group sessions on premium reformers. Beginner to advanced. $25 first class.",
  alternates: { canonical: "https://www.bodiesandpilates.com/classes/reformer" },
  openGraph: {
    title: "Reformer Pilates in North Hollywood | Bodies and Pilates",
    description:
      "Reformer Pilates classes in North Hollywood. Small group sessions on premium reformers. Beginner to advanced. $25 first class.",
    url: "https://www.bodiesandpilates.com/classes/reformer",
  },
};

const breadcrumb = breadcrumbSchema([
  { name: "Home", url: "https://www.bodiesandpilates.com" },
  { name: "Classes", url: "https://www.bodiesandpilates.com/classes" },
  { name: "Reformer", url: "https://www.bodiesandpilates.com/classes/reformer" },
]);

const serviceSchema = {
  "@context": "https://schema.org",
  "@type": "Service",
  name: "Reformer Pilates Class",
  provider: { "@id": "https://www.bodiesandpilates.com/#organization" },
  description:
    "Small group reformer Pilates classes for all levels at Bodies and Pilates in North Hollywood.",
  areaServed: { "@type": "City", name: "North Hollywood" },
  serviceType: "Pilates Class",
  offers: {
    "@type": "Offer",
    price: "35",
    priceCurrency: "USD",
    url: "https://clients.mindbodyonline.com/classic/ws?studioid=5739427&stype=43&prodid=100003",
  },
};

export default function ReformerPage() {
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
        title="Reformer Pilates in North Hollywood"
        tagline="Spring-loaded resistance, refined movement, real results."
        description="Reformer Pilates uses a sliding carriage and spring resistance to deliver a low-impact, full-body workout that builds long, strong muscle and improves posture. Our small group sessions in North Hollywood are taught on premium reformers with personalized cues throughout — so you move with intention, not autopilot. Whether you're new to the reformer or have years of practice, our instructors meet you where you are and adjust spring tension, tempo, and modifications to match. Your first reformer class is $25 — book online and we'll see you on the carriage."
        imageSrc={IMAGES.classReformer}
        imageAlt="Reformer Pilates class at Bodies and Pilates in North Hollywood"
        methodNote="Reformer Pilates at Bodies and Pilates is taught by comprehensively certified instructors — full apparatus training, hundreds of hours of study, and a focus on the method as designed. Springs, straps, and carriage work the way Joseph Pilates intended, not as a high-intensity spin on the equipment."
        whatToExpect={[
          "A 50-minute small-group session on premium reformers",
          "Spring-loaded resistance scaled to your level and goals",
          "Hands-on cues and form corrections from a certified instructor",
          "Movements for full-body strength: legs, core, arms, and back",
          "Modifications for beginners and progressions for advanced movers",
          "Grip socks required (available for purchase if you forget)",
        ]}
        benefits={[
          {
            heading: "Long, Lean Strength",
            body: "Spring resistance builds endurance and definition without bulk — every rep lengthens as it strengthens.",
          },
          {
            heading: "Low-Impact, High-Efficacy",
            body: "The reformer's smooth carriage protects joints while delivering a serious full-body workout.",
          },
          {
            heading: "Better Posture & Alignment",
            body: "Reformer work strengthens deep stabilizers that hold the spine and pelvis in healthy alignment.",
          },
          {
            heading: "Core From Every Angle",
            body: "Almost every reformer exercise recruits the core — you'll build strength you actually use in daily life.",
          },
          {
            heading: "Scalable for Every Level",
            body: "Beginner-friendly classes and progressions for experienced movers — same equipment, different challenge.",
          },
          {
            heading: "Small Group Attention",
            body: "Class sizes stay small so your instructor can watch your form and adjust your springs throughout.",
          },
        ]}
        ctas={[
          {
            label: "Book Reformer Class — $25 First Class",
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
