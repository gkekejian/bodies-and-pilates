import type { Metadata } from "next";
import { Playfair_Display, Inter } from "next/font/google";
import "./globals.css";
import { Header } from "@/components/layout/header";
import { Footer } from "@/components/layout/footer";
import CookieBanner from "@/components/analytics/cookie-banner";
import Analytics from "@/components/analytics/analytics";
import { MobileBookingBar } from "@/components/layout/mobile-booking-bar";

const playfair = Playfair_Display({
  subsets: ["latin"],
  variable: "--font-playfair",
  display: "swap",
});

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL("https://www.bodiesandpilates.com"),
  title: {
    template: "%s | Bodies and Pilates",
    default: "Pilates Studio in North Hollywood | Bodies and Pilates",
  },
  description:
    "Boutique Pilates studio in North Hollywood. Reformer, mat, and private classes for all levels. Your first class is $25. Book online today.",
  openGraph: {
    type: "website",
    locale: "en_US",
    siteName: "Bodies and Pilates",
    url: "https://www.bodiesandpilates.com",
    // og:image comes from app/opengraph-image.tsx (file convention)
  },
  robots: { index: true, follow: true },
  twitter: {
    card: "summary_large_image",
  },
};

const STUDIO_PHONE = "+1-818-653-3883";

const healthClubSchema = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": ["HealthClub", "ExerciseGym", "LocalBusiness"],
      "@id": "https://www.bodiesandpilates.com/#localbusiness",
      name: "Bodies and Pilates",
      alternateName: "Bodies & Pilates",
      description:
        "Located in North Hollywood, Bodies and Pilates provides high quality, personalized Pilates classes with state-of-the-art equipment.",
      url: "https://www.bodiesandpilates.com/",
      image: "https://www.bodiesandpilates.com/opengraph-image",
      telephone: STUDIO_PHONE,
      email: "Naira@bodiesandpilates.com",
      address: {
        "@type": "PostalAddress",
        streetAddress: "5251 Vineland Ave Suite 6",
        addressLocality: "North Hollywood",
        addressRegion: "CA",
        postalCode: "91601",
        addressCountry: "US",
      },
      geo: {
        "@type": "GeoCoordinates",
        latitude: 34.16893,
        longitude: -118.37313,
      },
      hasMap:
        "https://www.google.com/maps/search/?api=1&query=Bodies%20and%20Pilates%205251%20Vineland%20Ave%20Suite%206%20North%20Hollywood%20CA%2091601",
      openingHoursSpecification: [
        { "@type": "OpeningHoursSpecification", dayOfWeek: "Monday", opens: "07:00", closes: "20:00" },
        { "@type": "OpeningHoursSpecification", dayOfWeek: "Tuesday", opens: "08:30", closes: "20:30" },
        { "@type": "OpeningHoursSpecification", dayOfWeek: "Wednesday", opens: "07:00", closes: "20:00" },
        { "@type": "OpeningHoursSpecification", dayOfWeek: "Thursday", opens: "08:30", closes: "20:30" },
        { "@type": "OpeningHoursSpecification", dayOfWeek: "Friday", opens: "07:30", closes: "11:30" },
        { "@type": "OpeningHoursSpecification", dayOfWeek: "Saturday", opens: "09:00", closes: "12:00" },
        { "@type": "OpeningHoursSpecification", dayOfWeek: "Sunday", opens: "09:00", closes: "12:00" },
      ],
      priceRange: "$25-$300",
      makesOffer: [
        {
          "@type": "Offer",
          name: "First Class (New Clients)",
          price: "25",
          priceCurrency: "USD",
          url: "https://www.bodiesandpilates.com/pricing",
        },
        {
          "@type": "Offer",
          name: "1 Week Unlimited (Intro)",
          price: "105",
          priceCurrency: "USD",
          url: "https://www.bodiesandpilates.com/pricing",
        },
        {
          "@type": "Offer",
          name: "Single Class",
          price: "36",
          priceCurrency: "USD",
          url: "https://www.bodiesandpilates.com/pricing",
        },
        {
          "@type": "Offer",
          name: "5-Class Pack",
          price: "160",
          priceCurrency: "USD",
          url: "https://www.bodiesandpilates.com/pricing",
        },
        {
          "@type": "Offer",
          name: "10-Class Pack",
          price: "300",
          priceCurrency: "USD",
          url: "https://www.bodiesandpilates.com/pricing",
        },
        {
          "@type": "Offer",
          name: "Unlimited Monthly Membership",
          price: "280",
          priceCurrency: "USD",
          url: "https://www.bodiesandpilates.com/pricing",
        },
        {
          "@type": "Offer",
          name: "Private Session (55 min)",
          price: "100",
          priceCurrency: "USD",
          url: "https://www.bodiesandpilates.com/classes/private",
        },
        {
          "@type": "Offer",
          name: "Duet Session",
          price: "140",
          priceCurrency: "USD",
          url: "https://www.bodiesandpilates.com/classes/private",
        },
      ],
      sameAs: [
        "https://www.instagram.com/bodiesandpilates/",
        "https://www.facebook.com/people/Bodies-and-Pilates/61567392958788/",
        "https://classpass.com/studios/bodies-and-pilates-los-angeles",
      ],
      areaServed: [
        { "@type": "City", name: "North Hollywood" },
        { "@type": "Place", name: "Toluca Lake" },
        { "@type": "Place", name: "Studio City" },
        { "@type": "City", name: "Burbank" },
        { "@type": "City", name: "Glendale" },
        { "@type": "Place", name: "Valley Village" },
        { "@type": "Place", name: "Valley Glen" },
        { "@type": "City", name: "Hollywood" },
      ],
    },
    {
      "@type": "Organization",
      "@id": "https://www.bodiesandpilates.com/#organization",
      name: "Bodies and Pilates",
      url: "https://www.bodiesandpilates.com/",
    },
    {
      "@type": "WebSite",
      "@id": "https://www.bodiesandpilates.com/#website",
      url: "https://www.bodiesandpilates.com/",
      name: "Bodies and Pilates",
      publisher: { "@id": "https://www.bodiesandpilates.com/#organization" },
    },
  ],
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html
      lang="en"
      className={`${playfair.variable} ${inter.variable}`}
      suppressHydrationWarning
    >
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(healthClubSchema) }}
        />
      </head>
      <body className="min-h-screen flex flex-col">
        <Header />
        <main className="flex-1">{children}</main>
        <Footer />
        <MobileBookingBar />
        <CookieBanner />
        <Analytics />
      </body>
    </html>
  );
}
