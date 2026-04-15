/**
 * Central image registry.
 * Swap any URL here to update site-wide without hunting through pages.
 * All Pexels images are free for commercial use (Pexels License).
 * Replace with your own photos when ready — just update the URL.
 */

// Pexels CDN — verified Pilates-specific photos
const PX = "https://images.pexels.com/photos";
const PX_OPTS = "auto=compress&cs=tinysrgb";

export const IMAGES = {
  // ── Hero & Studio ──────────────────────────────────────────────────────────
  // Woman exercising on a Pilates reformer — cinematic studio shot
  hero: `${PX}/31509828/pexels-photo-31509828.jpeg?${PX_OPTS}&w=1920&h=1080&fit=crop`,
  // Pilates reformer machine in a studio
  studio: `${PX}/25599821/pexels-photo-25599821.jpeg?${PX_OPTS}&w=1200&h=1500&fit=crop`,
  // The interior of a Pilates studio
  aboutStudio: `${PX}/11036673/pexels-photo-11036673.jpeg?${PX_OPTS}&w=1200&h=800&fit=crop`,

  // ── Instructors ────────────────────────────────────────────────────────────
  // TODO: Replace with actual studio photos of each instructor.
  // These are Pexels Pilates-specific stock photos (all free, commercial use).
  instructorNaira: `${PX}/25596671/pexels-photo-25596671.jpeg?${PX_OPTS}&w=600&h=750&fit=crop`,
  instructorTheresia: `${PX}/31509827/pexels-photo-31509827.jpeg?${PX_OPTS}&w=600&h=750&fit=crop`,
  instructorHannah: `${PX}/25599839/pexels-photo-25599839.jpeg?${PX_OPTS}&w=600&h=750&fit=crop`,
  instructorMarlyn: `${PX}/25599825/pexels-photo-25599825.jpeg?${PX_OPTS}&w=600&h=750&fit=crop`,
  instructorEnrika: `${PX}/18136885/pexels-photo-18136885.jpeg?${PX_OPTS}&w=600&h=750&fit=crop`,
  instructorSita: `${PX}/31509828/pexels-photo-31509828.jpeg?${PX_OPTS}&w=600&h=750&fit=crop`,

  // ── Classes ────────────────────────────────────────────────────────────────
  classBeginner: `${PX}/25596671/pexels-photo-25596671.jpeg?${PX_OPTS}&w=800&h=1000&fit=crop`,
  classFullbody: `${PX}/31509827/pexels-photo-31509827.jpeg?${PX_OPTS}&w=800&h=1000&fit=crop`,
  classFlexibility: `${PX}/25599825/pexels-photo-25599825.jpeg?${PX_OPTS}&w=800&h=1000&fit=crop`,
  classPrivate: `${PX}/25599839/pexels-photo-25599839.jpeg?${PX_OPTS}&w=800&h=1000&fit=crop`,

  // ── Logo ───────────────────────────────────────────────────────────────────
  // Drop your logo at /public/images/logo.png (or .svg).
  // Header reads /images/logo.svg by default — update in header.tsx + footer.tsx.
  logo: "/images/logo.svg",
} as const;
