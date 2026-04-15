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
    "Boutique Pilates studio in North Hollywood offering reformer & mat classes, private sessions, and beginner-friendly group classes. Book your $25 first class.",
  openGraph: {
    type: "website",
    locale: "en_US",
    siteName: "Bodies and Pilates",
    url: "https://www.bodiesandpilates.com",
    images: [
      {
        url: "/images/og-image.jpg",
        width: 1200,
        height: 630,
        alt: "Bodies and Pilates — boutique Pilates studio in North Hollywood",
      },
    ],
  },
  robots: { index: true, follow: true },
  twitter: {
    card: "summary_large_image",
    images: ["/images/og-image.jpg"],
  },
};

const healthClubSchema = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "HealthClub",
      "@id": "https://www.bodiesandpilates.com/#organization",
      name: "Bodies and Pilates",
      alternateName: "Bodies & Pilates",
      description:
        "Located in North Hollywood, Bodies and Pilates provides high quality, personalized Pilates classes with state-of-the-art equipment.",
      url: "https://www.bodiesandpilates.com/",
      telephone: "+1-818-653-3883",
      email: "Naira@bodiesandpilates.com",
      address: {
        "@type": "PostalAddress",
        streetAddress: "5251 Vineland Ave, Ste 6",
        addressLocality: "North Hollywood",
        addressRegion: "CA",
        postalCode: "91601",
        addressCountry: "US",
      },
      geo: {
        "@type": "GeoCoordinates",
        latitude: "34.1689",
        longitude: "-118.3687",
      },
      openingHoursSpecification: [
        { "@type": "OpeningHoursSpecification", dayOfWeek: "Monday", opens: "07:00", closes: "20:00" },
        { "@type": "OpeningHoursSpecification", dayOfWeek: "Tuesday", opens: "08:30", closes: "20:30" },
        { "@type": "OpeningHoursSpecification", dayOfWeek: "Wednesday", opens: "07:00", closes: "20:00" },
        { "@type": "OpeningHoursSpecification", dayOfWeek: "Thursday", opens: "08:30", closes: "20:30" },
        { "@type": "OpeningHoursSpecification", dayOfWeek: "Friday", opens: "07:30", closes: "11:30" },
        { "@type": "OpeningHoursSpecification", dayOfWeek: "Saturday", opens: "09:00", closes: "12:00" },
        { "@type": "OpeningHoursSpecification", dayOfWeek: "Sunday", opens: "09:00", closes: "12:00" },
      ],
      priceRange: "$$",
      sameAs: [
        "https://www.instagram.com/bodiesandpilates/",
        "https://www.facebook.com/people/Bodies-and-Pilates/61567392958788/",
        "https://classpass.com/studios/bodies-and-pilates-los-angeles",
      ],
      areaServed: [
        { "@type": "City", name: "North Hollywood" },
        { "@type": "City", name: "Studio City" },
        { "@type": "City", name: "Burbank" },
        { "@type": "City", name: "Valley Village" },
        { "@type": "City", name: "Toluca Lake" },
      ],
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
