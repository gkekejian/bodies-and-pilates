import type { Metadata } from "next";
import { breadcrumbSchema } from "@/lib/breadcrumb";
import { LocationPage } from "@/components/sections/location-page";

export const metadata: Metadata = {
  title: "Pilates Studio Near Burbank",
  description:
    "Boutique Pilates studio about 10 minutes from Burbank in North Hollywood. Reformer, mat, and private sessions. $25 first class.",
  alternates: { canonical: "https://www.bodiesandpilates.com/locations/burbank" },
  openGraph: {
    title: "Pilates Studio Near Burbank | Bodies and Pilates",
    description:
      "Boutique Pilates studio about 10 minutes from Burbank in North Hollywood. Reformer, mat, and private sessions. $25 first class.",
    url: "https://www.bodiesandpilates.com/locations/burbank",
  },
};

const breadcrumb = breadcrumbSchema([
  { name: "Home", url: "https://www.bodiesandpilates.com/" },
  { name: "Locations", url: "https://www.bodiesandpilates.com/locations/burbank" },
  { name: "Burbank", url: "https://www.bodiesandpilates.com/locations/burbank" },
]);

export default function BurbankLocationPage() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumb) }}
      />
      <LocationPage
        locationName="Burbank"
        eyebrow="Locations"
        intro="Bodies and Pilates is a boutique Pilates studio in North Hollywood, about 10 minutes from Burbank. We offer reformer, mat, and private sessions for all levels."
        landmarks={[
          { name: "Downtown Burbank / Magnolia Blvd", driveTime: "~10 min" },
          { name: "Burbank Town Center", driveTime: "~12 min" },
          { name: "Warner Bros. Studios", driveTime: "~9 min" },
          { name: "Bob Hope Airport (BUR)", driveTime: "~12 min" },
        ]}
        body={[
          "From most of Burbank, our studio is a quick run down Magnolia or Olive — under 15 minutes outside of rush hour. Free street parking is available on Weddington, with metered spots in front of the studio on Vineland.",
          "We keep class sizes small so every reformer or mat session feels personal. Your first class is $25 — book online in under a minute. Reformer, beginner mat, full-body, flexibility, and private one-on-one sessions all run on the same weekly schedule.",
        ]}
      />
    </>
  );
}
