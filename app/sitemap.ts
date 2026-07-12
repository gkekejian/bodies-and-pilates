import type { MetadataRoute } from "next";
import { getAllPosts } from "@/lib/blog";

// Bump these when a page's content meaningfully changes — stable dates are a
// stronger freshness signal than stamping every URL with the build time.
const SITE_LAUNCH = new Date("2026-04-20");
const LAST_CONTENT_UPDATE = new Date("2026-07-12");

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = "https://www.bodiesandpilates.com";

  const staticRoutes: MetadataRoute.Sitemap = [
    { url: baseUrl, lastModified: LAST_CONTENT_UPDATE, changeFrequency: "weekly", priority: 1 },
    { url: `${baseUrl}/about`, lastModified: SITE_LAUNCH, changeFrequency: "monthly", priority: 0.8 },
    { url: `${baseUrl}/classes`, lastModified: SITE_LAUNCH, changeFrequency: "monthly", priority: 0.9 },
    { url: `${baseUrl}/classes/beginner`, lastModified: SITE_LAUNCH, changeFrequency: "monthly", priority: 0.8 },
    { url: `${baseUrl}/classes/fullbody`, lastModified: SITE_LAUNCH, changeFrequency: "monthly", priority: 0.8 },
    { url: `${baseUrl}/classes/flexibility`, lastModified: SITE_LAUNCH, changeFrequency: "monthly", priority: 0.8 },
    { url: `${baseUrl}/classes/private`, lastModified: SITE_LAUNCH, changeFrequency: "monthly", priority: 0.8 },
    { url: `${baseUrl}/classes/reformer`, lastModified: LAST_CONTENT_UPDATE, changeFrequency: "monthly", priority: 0.8 },
    { url: `${baseUrl}/locations`, lastModified: LAST_CONTENT_UPDATE, changeFrequency: "monthly", priority: 0.7 },
    { url: `${baseUrl}/locations/glendale`, lastModified: LAST_CONTENT_UPDATE, changeFrequency: "monthly", priority: 0.7 },
    { url: `${baseUrl}/locations/valley-village`, lastModified: LAST_CONTENT_UPDATE, changeFrequency: "monthly", priority: 0.7 },
    { url: `${baseUrl}/locations/toluca-lake`, lastModified: SITE_LAUNCH, changeFrequency: "monthly", priority: 0.7 },
    { url: `${baseUrl}/locations/studio-city`, lastModified: SITE_LAUNCH, changeFrequency: "monthly", priority: 0.7 },
    { url: `${baseUrl}/locations/burbank`, lastModified: SITE_LAUNCH, changeFrequency: "monthly", priority: 0.7 },
    { url: `${baseUrl}/locations/hollywood`, lastModified: SITE_LAUNCH, changeFrequency: "monthly", priority: 0.7 },
    { url: `${baseUrl}/pricing`, lastModified: LAST_CONTENT_UPDATE, changeFrequency: "weekly", priority: 0.9 },
    { url: `${baseUrl}/schedule`, lastModified: LAST_CONTENT_UPDATE, changeFrequency: "daily", priority: 0.9 },
    { url: `${baseUrl}/instructors`, lastModified: SITE_LAUNCH, changeFrequency: "monthly", priority: 0.7 },
    { url: `${baseUrl}/instructors/naira`, lastModified: SITE_LAUNCH, changeFrequency: "monthly", priority: 0.7 },
    { url: `${baseUrl}/faq`, lastModified: LAST_CONTENT_UPDATE, changeFrequency: "monthly", priority: 0.7 },
    { url: `${baseUrl}/contact`, lastModified: SITE_LAUNCH, changeFrequency: "monthly", priority: 0.8 },
    { url: `${baseUrl}/blog`, lastModified: LAST_CONTENT_UPDATE, changeFrequency: "weekly", priority: 0.8 },
  ];

  // Only include published blog posts
  const blogRoutes: MetadataRoute.Sitemap = getAllPosts()
    .filter((p) => !p.draft)
    .map((p) => ({
      url: `${baseUrl}/blog/${p.slug}`,
      lastModified: p.publishDate ? new Date(p.publishDate) : LAST_CONTENT_UPDATE,
      changeFrequency: "monthly",
      priority: 0.6,
    }));

  return [...staticRoutes, ...blogRoutes];
}
