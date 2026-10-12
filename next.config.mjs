import createMDX from "@next/mdx";

// All redirects are 301 (statusCode) rather than Next's default 308.
const moved = (source, destination) => ({ source, destination, statusCode: 301 });

// Target policy, report-only for now (see headers() below).
const CSP_REPORT_ONLY = [
  "default-src 'self'",
  "script-src 'self' 'unsafe-inline' https://www.googletagmanager.com https://connect.facebook.net https://*.mindbodyonline.com https://*.healcode.com",
  "style-src 'self' 'unsafe-inline' https://*.mindbodyonline.com https://*.healcode.com",
  "img-src 'self' data: blob: https:",
  "font-src 'self' data: https://*.mindbodyonline.com",
  "connect-src 'self' https://*.google-analytics.com https://*.analytics.google.com https://www.googletagmanager.com https://*.facebook.com https://*.mindbodyonline.com https://*.healcode.com",
  "frame-src https://*.mindbodyonline.com https://*.healcode.com https://www.google.com https://maps.google.com",
  "form-action 'self' https://*.mindbodyonline.com",
  "frame-ancestors 'none'",
  "base-uri 'self'",
  "object-src 'none'",
].join("; ");

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
      "/llms-full.txt": ["./content/blog/**/*"],
    },
  },
  // No remote image hosts: all stock photography was removed. Real studio
  // photos live in /public/photos (see lib/photos.ts).
  // Security headers on every response. The full Content-Security-Policy runs
  // in report-only mode first: MindBody's widgets load third-party scripts and
  // frames that cannot be verified from the build sandbox. Check the browser
  // console on the preview for violations, then promote it to enforcing.
  async headers() {
    return [
      {
        source: "/:path*",
        headers: [
          { key: "Strict-Transport-Security", value: "max-age=63072000" },
          { key: "X-Content-Type-Options", value: "nosniff" },
          { key: "X-Frame-Options", value: "DENY" },
          { key: "Referrer-Policy", value: "strict-origin-when-cross-origin" },
          {
            key: "Permissions-Policy",
            value: "camera=(), microphone=(), geolocation=(), usb=(), browsing-topics=()",
          },
          // Enforced: safe directives that cannot break third-party embeds.
          {
            key: "Content-Security-Policy",
            value: "frame-ancestors 'none'; base-uri 'self'; object-src 'none'; upgrade-insecure-requests",
          },
          { key: "Content-Security-Policy-Report-Only", value: CSP_REPORT_ONLY },
        ],
      },
    ];
  },
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
