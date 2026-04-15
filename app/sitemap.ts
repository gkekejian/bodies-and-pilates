import type { MetadataRoute } from "next";
import { getAllPosts } from "@/lib/blog";

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = "https://www.bodiesandpilates.com";
  const now = new Date();

  const staticRoutes: MetadataRoute.Sitemap = [
    { url: baseUrl, lastModified: now, changeFrequency: "weekly", priority: 1 },
    { url: `${baseUrl}/about`, lastModified: now, changeFrequency: "monthly", priority: 0.8 },
    { url: `${baseUrl}/classes`, lastModified: now, changeFrequency: "monthly", priority: 0.9 },
    { url: `${baseUrl}/classes/beginner`, lastModified: now, changeFrequency: "monthly", priority: 0.8 },
    { url: `${baseUrl}/classes/fullbody`, lastModified: now, changeFrequency: "monthly", priority: 0.8 },
    { url: `${baseUrl}/classes/flexibility`, lastModified: now, changeFrequency: "monthly", priority: 0.8 },
    { url: `${baseUrl}/classes/private`, lastModified: now, changeFrequency: "monthly", priority: 0.8 },
    { url: `${baseUrl}/pricing`, lastModified: now, changeFrequency: "weekly", priority: 0.9 },
    { url: `${baseUrl}/schedule`, lastModified: now, changeFrequency: "daily", priority: 0.9 },
    { url: `${baseUrl}/instructors`, lastModified: now, changeFrequency: "monthly", priority: 0.7 },
    { url: `${baseUrl}/instructors/naira`, lastModified: now, changeFrequency: "monthly", priority: 0.7 },
    { url: `${baseUrl}/faq`, lastModified: now, changeFrequency: "monthly", priority: 0.7 },
    { url: `${baseUrl}/contact`, lastModified: now, changeFrequency: "monthly", priority: 0.8 },
    { url: `${baseUrl}/blog`, lastModified: now, changeFrequency: "weekly", priority: 0.8 },
  ];

  // Only include published blog posts
  const blogRoutes: MetadataRoute.Sitemap = getAllPosts()
    .filter((p) => !p.draft)
    .map((p) => ({
      url: `${baseUrl}/blog/${p.slug}`,
      lastModified: p.publishDate ? new Date(p.publishDate) : now,
      changeFrequency: "monthly",
      priority: 0.6,
    }));

  return [...staticRoutes, ...blogRoutes];
}
