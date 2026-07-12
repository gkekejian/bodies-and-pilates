/**
 * Central image registry.
 * Swap any URL here to update site-wide without hunting through pages.
 * All Pexels images are free for commercial use (Pexels License).
 * Replace with your own photos when ready — just update the URL.
 *
 * NOTE: every image below has been visually verified to contain no
 * third-party studio branding. If you swap one in, check the photo for
 * other studios' logos/wordmarks before shipping it.
 */

// Pexels CDN — verified Pilates-specific photos
const PX = "https://images.pexels.com/photos";
const PX_OPTS = "auto=compress&cs=tinysrgb";

export const IMAGES = {
  // ── Hero & Studio ──────────────────────────────────────────────────────────
  // Deep reformer stretch in warm cream/beige tones — matches brand palette
  hero: `${PX}/18136885/pexels-photo-18136885.jpeg?${PX_OPTS}&w=1920&h=1080&fit=crop`,
  // Pilates tower/reformer in a bright studio
  studio: `${PX}/25599821/pexels-photo-25599821.jpeg?${PX_OPTS}&w=1200&h=1500&fit=crop`,
  // Moody brick-and-glass reformer studio interior
  aboutStudio: `${PX}/11036673/pexels-photo-11036673.jpeg?${PX_OPTS}&w=1200&h=800&fit=crop`,

  // ── Instructors ────────────────────────────────────────────────────────────
  // TODO: Replace with actual studio photos of each instructor.
  // These are Pexels Pilates-specific stock photos (all free, commercial use).
  instructorNaira: `${PX}/25596671/pexels-photo-25596671.jpeg?${PX_OPTS}&w=600&h=750&fit=crop`,
  instructorTheresia: `${PX}/25599830/pexels-photo-25599830.jpeg?${PX_OPTS}&w=600&h=750&fit=crop`,
  instructorHannah: `${PX}/25599834/pexels-photo-25599834.jpeg?${PX_OPTS}&w=600&h=750&fit=crop`,
  instructorMarlyn: `${PX}/25599825/pexels-photo-25599825.jpeg?${PX_OPTS}&w=600&h=750&fit=crop`,
  instructorEnrika: `${PX}/25596675/pexels-photo-25596675.jpeg?${PX_OPTS}&w=600&h=750&fit=crop`,
  instructorSita: `${PX}/25599838/pexels-photo-25599838.jpeg?${PX_OPTS}&w=600&h=750&fit=crop`,

  // ── Classes ────────────────────────────────────────────────────────────────
  classBeginner: `${PX}/25599825/pexels-photo-25599825.jpeg?${PX_OPTS}&w=800&h=1000&fit=crop`,
  classFullbody: `${PX}/25599838/pexels-photo-25599838.jpeg?${PX_OPTS}&w=800&h=1000&fit=crop`,
  classFlexibility: `${PX}/18136885/pexels-photo-18136885.jpeg?${PX_OPTS}&w=800&h=1000&fit=crop`,
  classPrivate: `${PX}/25599826/pexels-photo-25599826.jpeg?${PX_OPTS}&w=800&h=1000&fit=crop`,
  classReformer: `${PX}/25599839/pexels-photo-25599839.jpeg?${PX_OPTS}&w=800&h=1000&fit=crop`,

  // ── Logo ───────────────────────────────────────────────────────────────────
  // Drop your logo at /public/images/logo.png (or .svg).
  // Header reads /images/logo.svg by default — update in header.tsx + footer.tsx.
  logo: "/images/logo.svg",
} as const;
