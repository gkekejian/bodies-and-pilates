import createMDX from "@next/mdx";

// All redirects are 301 (statusCode) rather than Next's default 308.
const moved = (source, destination) => ({ source, destination, statusCode: 301 });

/** @type {import('next').NextConfig} */
const nextConfig = {
  pageExtensions: ["js", "jsx", "ts", "tsx", "md", "mdx"],
  // Trailing slashes are stripped with a 301 in middleware.ts instead of
  // Next's default 308.
  skipTrailingSlashRedirect: true,
  // Blog pages read content/blog at runtime when they regenerate (ISR), so the
  // MDX files must ship with those serverless functions.
  experimental: {
    outputFileTracingIncludes: {
      "/blog": ["./content/blog/**/*"],
      "/blog/[slug]": ["./content/blog/**/*"],
      "/blog/page/[page]": ["./content/blog/**/*"],
      "/sitemap.xml": ["./content/blog/**/*"],
    },
  },
  // No remote image hosts: all stock photography was removed. Real studio
  // photos live in /public/photos (see lib/photos.ts).
  async redirects() {
    return [
      // Bare domain to the canonical www host. Also add the bare domain to the
      // Vercel project (Settings > Domains) so requests reach this rule.
      {
        source: "/:path*",
        has: [{ type: "host", value: "bodiesandpilates.com" }],
        destination: "https://www.bodiesandpilates.com/:path*",
        statusCode: 301,
      },

      // Legacy Wix URLs
      moved("/bookings", "/schedule"),
      moved("/book-online", "/schedule"),
      moved("/faqs", "/faq"),
      moved("/post/:slug", "/blog/:slug"),
      moved("/blog/what-is-reformer-pilates-beginners-guide", "/blog/what-is-reformer-pilates"),

      // Pricing normalization (old Wix pricing slugs). Uppercase and trailing
      // slash variants (/Pricing, /pricing/) are handled by middleware.ts.
      moved("/plans-pricing", "/pricing"),
      moved("/pricing-plans", "/pricing"),
      moved("/pricing-plans/:path*", "/pricing"),
      moved("/category/all-products", "/pricing"),

      // Consolidated pages (no doorway pages, one team section)
      moved("/classes/reformer", "/classes"),
      moved("/instructors", "/about#team"),
      moved("/instructors/:slug", "/about#team"),
      moved("/locations", "/about#neighborhoods"),
      moved("/locations/:slug", "/about#neighborhoods"),
    ];
  },
};

const withMDX = createMDX({
  options: {
    remarkPlugins: [],
    rehypePlugins: [],
  },
});

export default withMDX(nextConfig);
