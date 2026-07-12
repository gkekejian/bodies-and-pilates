import type { Metadata } from "next";
import { breadcrumbSchema } from "@/lib/breadcrumb";
import { LocationPage } from "@/components/sections/location-page";

export const metadata: Metadata = {
  title: "Pilates Studio Near Glendale",
  description:
    "Boutique Pilates studio about 15 minutes from Glendale in North Hollywood. Reformer, mat, and private sessions. $25 first class.",
  alternates: { canonical: "https://www.bodiesandpilates.com/locations/glendale" },
  openGraph: {
    title: "Pilates Studio Near Glendale | Bodies and Pilates",
    description:
      "Boutique Pilates studio about 15 minutes from Glendale in North Hollywood. Reformer, mat, and private sessions. $25 first class.",
    url: "https://www.bodiesandpilates.com/locations/glendale",
  },
};

const breadcrumb = breadcrumbSchema([
  { name: "Home", url: "https://www.bodiesandpilates.com/" },
  { name: "Locations", url: "https://www.bodiesandpilates.com/locations" },
  { name: "Glendale", url: "https://www.bodiesandpilates.com/locations/glendale" },
]);

const serviceSchema = {
  "@context": "https://schema.org",
  "@type": "Service",
  name: "Pilates Classes for Glendale Residents",
  provider: { "@id": "https://www.bodiesandpilates.com/#organization" },
  serviceType: "Pilates Class",
  areaServed: { "@type": "City", name: "Glendale" },
  description:
    "Reformer, mat, and private Pilates sessions at Bodies and Pilates in North Hollywood, a short drive from Glendale via the SR-134.",
};

export default function GlendaleLocationPage() {
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
        locationName="Glendale"
        eyebrow="Locations"
        intro="Bodies and Pilates is a boutique Pilates studio in North Hollywood, an easy drive from Glendale via the SR-134. We offer reformer, mat, and private sessions for all levels — with class sizes small enough that your instructor knows your name."
        landmarks={[
          { name: "Kenneth Village", driveTime: "~12 min" },
          { name: "Downtown Glendale / Brand Blvd", driveTime: "~15 min" },
          { name: "The Americana at Brand", driveTime: "~15 min" },
          { name: "Adams Hill", driveTime: "~17 min" },
        ]}
        body={[
          "From most of Glendale, the studio is one straight run west on the 134 — usually 12 to 17 minutes outside of rush hour, and an easy reverse commute if you work in the Valley. Free street parking is available on Weddington St, with metered spots in front of the studio on Vineland Ave and McCormick St.",
          "If the big-box reformer studios around Brand Blvd feel like a conveyor belt, we're the opposite: a quiet, boutique room where every reformer, mat, and private session is coached hands-on. Your first class is $25 — book online in under a minute and see the difference small classes make.",
        ]}
      />
    </>
  );
}
