import type { Metadata } from "next";
import { breadcrumbSchema } from "@/lib/breadcrumb";
import { LocationPage } from "@/components/sections/location-page";

export const metadata: Metadata = {
  title: "Pilates Studio Near Toluca Lake",
  description:
    "Boutique Pilates studio 5 minutes from Toluca Lake in North Hollywood. Reformer, mat, and private sessions. $25 first class.",
  alternates: { canonical: "https://www.bodiesandpilates.com/locations/toluca-lake" },
  openGraph: {
    title: "Pilates Studio Near Toluca Lake | Bodies and Pilates",
    description:
      "Boutique Pilates studio 5 minutes from Toluca Lake in North Hollywood. Reformer, mat, and private sessions. $25 first class.",
    url: "https://www.bodiesandpilates.com/locations/toluca-lake",
  },
};

const breadcrumb = breadcrumbSchema([
  { name: "Home", url: "https://www.bodiesandpilates.com/" },
  { name: "Locations", url: "https://www.bodiesandpilates.com/locations" },
  { name: "Toluca Lake", url: "https://www.bodiesandpilates.com/locations/toluca-lake" },
]);

export default function TolucaLakeLocationPage() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumb) }}
      />
      <LocationPage
        locationName="Toluca Lake"
        eyebrow="Locations"
        intro="Bodies and Pilates is a boutique Pilates studio in North Hollywood, about 5 minutes from Toluca Lake. We offer reformer, mat, and private sessions for all levels."
        landmarks={[
          { name: "Toluca Lake village", driveTime: "~5 min" },
          { name: "Riverside Drive", driveTime: "~6 min" },
          { name: "Lakeside Golf Club", driveTime: "~7 min" },
          { name: "Universal Studios", driveTime: "~8 min" },
        ]}
        body={[
          "If you live or work in Toluca Lake, our studio is a quick hop over the 134 — usually under 10 minutes door-to-door at most times of day. Free street parking is available on Weddington and across the street on Vineland.",
          "We keep classes small so every reformer or mat session feels personal. Your first class is $25, and you can book online in under a minute. Reformer, beginner-friendly mat, full-body, flexibility, and private one-on-one sessions all run on the same weekly schedule.",
        ]}
      />
    </>
  );
}
