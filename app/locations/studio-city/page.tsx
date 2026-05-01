import type { Metadata } from "next";
import { breadcrumbSchema } from "@/lib/breadcrumb";
import { LocationPage } from "@/components/sections/location-page";

export const metadata: Metadata = {
  title: "Pilates Studio Near Studio City",
  description:
    "Boutique Pilates studio about 7 minutes from Studio City in North Hollywood. Reformer, mat, and private sessions. $25 first class.",
  alternates: { canonical: "https://www.bodiesandpilates.com/locations/studio-city" },
  openGraph: {
    title: "Pilates Studio Near Studio City | Bodies and Pilates",
    description:
      "Boutique Pilates studio about 7 minutes from Studio City in North Hollywood. Reformer, mat, and private sessions. $25 first class.",
    url: "https://www.bodiesandpilates.com/locations/studio-city",
  },
};

const breadcrumb = breadcrumbSchema([
  { name: "Home", url: "https://www.bodiesandpilates.com/" },
  { name: "Locations", url: "https://www.bodiesandpilates.com/locations/studio-city" },
  { name: "Studio City", url: "https://www.bodiesandpilates.com/locations/studio-city" },
]);

export default function StudioCityLocationPage() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumb) }}
      />
      <LocationPage
        locationName="Studio City"
        eyebrow="Locations"
        intro="Bodies and Pilates is a boutique Pilates studio in North Hollywood, about 7 minutes from Studio City. We offer reformer, mat, and private sessions for all levels."
        landmarks={[
          { name: "Ventura Blvd at Laurel Canyon", driveTime: "~7 min" },
          { name: "CBS Studio Center", driveTime: "~8 min" },
          { name: "Tujunga Village", driveTime: "~6 min" },
          { name: "Beeman Park", driveTime: "~5 min" },
        ]}
        body={[
          "From most of Studio City, our studio is a straight shot up Vineland or Laurel Canyon. We're tucked into a quiet block off Magnolia in NoHo, with free parking on Weddington and metered spots on Vineland and Mccormick.",
          "Classes stay small so every session feels personal. Your first class is $25 — book online in under a minute. We run reformer, beginner mat, full-body, flexibility, and private one-on-one sessions every week.",
        ]}
      />
    </>
  );
}
