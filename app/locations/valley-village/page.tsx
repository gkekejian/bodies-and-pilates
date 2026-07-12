import type { Metadata } from "next";
import { breadcrumbSchema } from "@/lib/breadcrumb";
import { LocationPage } from "@/components/sections/location-page";

export const metadata: Metadata = {
  title: "Pilates Studio Near Valley Village",
  description:
    "Boutique Pilates studio about 5 minutes from Valley Village in North Hollywood. Reformer, mat, and private sessions. $25 first class.",
  alternates: { canonical: "https://www.bodiesandpilates.com/locations/valley-village" },
  openGraph: {
    title: "Pilates Studio Near Valley Village | Bodies and Pilates",
    description:
      "Boutique Pilates studio about 5 minutes from Valley Village in North Hollywood. Reformer, mat, and private sessions. $25 first class.",
    url: "https://www.bodiesandpilates.com/locations/valley-village",
  },
};

const breadcrumb = breadcrumbSchema([
  { name: "Home", url: "https://www.bodiesandpilates.com/" },
  { name: "Locations", url: "https://www.bodiesandpilates.com/locations" },
  { name: "Valley Village", url: "https://www.bodiesandpilates.com/locations/valley-village" },
]);

const serviceSchema = {
  "@context": "https://schema.org",
  "@type": "Service",
  name: "Pilates Classes for Valley Village Residents",
  provider: { "@id": "https://www.bodiesandpilates.com/#organization" },
  serviceType: "Pilates Class",
  areaServed: { "@type": "Place", name: "Valley Village" },
  description:
    "Reformer, mat, and private Pilates sessions at Bodies and Pilates in North Hollywood, minutes from Valley Village.",
};

export default function ValleyVillageLocationPage() {
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
      <LocationPage
        locationName="Valley Village"
        eyebrow="Locations"
        intro="Bodies and Pilates sits right on the edge of Valley Village — our North Hollywood studio is about 5 minutes from most of the neighborhood. Reformer, mat, and private sessions for all levels, in a calm boutique setting."
        landmarks={[
          { name: "Colfax Meadows", driveTime: "~5 min" },
          { name: "NoHo West", driveTime: "~5 min" },
          { name: "Valley Village Park", driveTime: "~6 min" },
          { name: "Laurel Canyon & Magnolia", driveTime: "~6 min" },
        ]}
        body={[
          "For Valley Village neighbors, the studio is close enough to make Pilates an easy habit — a few minutes up Vineland and you're on the reformer. Free street parking is available on Weddington St, with metered spots in front of the studio on Vineland Ave.",
          "We keep classes small so every session feels personal. Your first class is $25 — book online in under a minute. Reformer, beginner-friendly mat, full-body, flexibility, and private one-on-one sessions all run on the same weekly schedule.",
        ]}
      />
    </>
  );
}
