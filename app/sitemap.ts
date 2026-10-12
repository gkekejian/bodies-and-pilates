import type { MetadataRoute } from "next";
import { getPublishedPosts, publishInstant } from "@/lib/blog";
import { CLASSES } from "@/lib/classes";
import { SITE_URL } from "@/lib/site";

// Regenerate hourly so posts enter the sitemap on their publish date.
export const revalidate = 3600;

export default function sitemap(): MetadataRoute.Sitemap {
  const now = new Date();
  const page = (
    path: string,
    priority: number,
    changeFrequency: MetadataRoute.Sitemap[number]["changeFrequency"] = "monthly"
  ) => ({ url: `${SITE_URL}${path}`, lastModified: now, changeFrequency, priority });

  const staticRoutes: MetadataRoute.Sitemap = [
    page("/", 1, "weekly"),
    page("/intro-offer", 0.9, "weekly"),
    page("/pricing", 0.9, "weekly"),
    page("/classes", 0.9),
    ...CLASSES.map((c) => page(`/classes/${c.slug}`, 0.8)),
    page("/schedule", 0.9, "daily"),
    page("/about", 0.8),
    page("/faq", 0.7),
    page("/contact", 0.8),
    page("/blog", 0.6, "weekly"),
    page("/privacy", 0.2, "yearly"),
    page("/terms", 0.2, "yearly"),
  ];

  // Published posts only: outline drafts and future-dated posts stay out.
  const blogRoutes: MetadataRoute.Sitemap = getPublishedPosts().map((p) => ({
    url: `${SITE_URL}/blog/${p.slug}`,
    lastModified: publishInstant(p.updatedDate || p.publishDate),
    changeFrequency: "monthly",
    priority: 0.6,
  }));

  return [...staticRoutes, ...blogRoutes];
}
