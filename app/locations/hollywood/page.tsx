import type { Metadata } from "next";
import { breadcrumbSchema } from "@/lib/breadcrumb";
import { LocationPage } from "@/components/sections/location-page";

export const metadata: Metadata = {
  title: { absolute: "Pilates Studio Near Hollywood | Bodies and Pilates (NoHo)" },
  description:
    "Boutique Pilates studio about 10 minutes from Hollywood, located in NoHo. Reformer, mat, and private sessions. $25 first class.",
  alternates: { canonical: "https://www.bodiesandpilates.com/locations/hollywood" },
  openGraph: {
    title: "Pilates Studio Near Hollywood | Bodies and Pilates (NoHo)",
    description:
      "Boutique Pilates studio about 10 minutes from Hollywood, located in NoHo. Reformer, mat, and private sessions. $25 first class.",
    url: "https://www.bodiesandpilates.com/locations/hollywood",
  },
};

const breadcrumb = breadcrumbSchema([
  { name: "Home", url: "https://www.bodiesandpilates.com/" },
  { name: "Locations", url: "https://www.bodiesandpilates.com/locations/hollywood" },
  { name: "Hollywood", url: "https://www.bodiesandpilates.com/locations/hollywood" },
]);

export default function HollywoodLocationPage() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumb) }}
      />
      <LocationPage
        locationName="Hollywood"
        heading="Pilates Studio Near Hollywood (Located in NoHo)"
        eyebrow="Locations"
        intro="Bodies and Pilates is a boutique Pilates studio in North Hollywood, about 10 minutes from Hollywood. We offer reformer, mat, and private sessions for all levels."
        landmarks={[
          { name: "Hollywood Bowl / Highland", driveTime: "~10 min" },
          { name: "Hollywood & Vine", driveTime: "~12 min" },
          { name: "Runyon Canyon", driveTime: "~10 min" },
          { name: "Universal City", driveTime: "~6 min" },
        ]}
        body={[
          "If you're coming from Hollywood, we're a short trip over the hill — usually around 10 minutes via the 101 or Cahuenga. We're tucked into a quiet block off Magnolia in NoHo, with free street parking on Weddington and metered spots on Vineland and Mccormick.",
          "Classes stay small so every reformer or mat session feels personal. Your first class is $25 — book online in under a minute. Reformer, beginner mat, full-body, flexibility, and private one-on-one sessions all run on the same weekly schedule.",
        ]}
      />
    </>
  );
}
