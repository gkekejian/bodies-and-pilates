import type { MetadataRoute } from "next";
import { getAllPosts } from "@/lib/blog";
import { CLASSES } from "@/lib/classes";
import { SITE_URL } from "@/lib/site";

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
  ];

  // Drafts are noindexed outlines; list only published posts.
  const blogRoutes: MetadataRoute.Sitemap = getAllPosts()
    .filter((p) => !p.draft)
    .map((p) => ({
      url: `${SITE_URL}/blog/${p.slug}`,
      lastModified: p.publishDate ? new Date(p.publishDate) : now,
      changeFrequency: "monthly",
      priority: 0.6,
    }));

  return [...staticRoutes, ...blogRoutes];
}
