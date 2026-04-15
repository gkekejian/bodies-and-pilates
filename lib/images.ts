/**
 * Central image registry.
 * Swap any URL here to update site-wide without hunting through pages.
 * All Unsplash images are free for commercial use (Unsplash License).
 * Replace with your own photos when ready — just update the URL.
 */

const UNS = "https://images.unsplash.com";

export const IMAGES = {
  // ── Hero & Studio ──────────────────────────────────────────────────────────
  hero: `${UNS}/photo-1518611012118-696072aa579a?w=1920&h=1080&q=80&auto=format&fit=crop`,
  studio: `${UNS}/photo-1545205597-3d9d02c29597?w=1200&h=800&q=80&auto=format&fit=crop`,
  aboutStudio: `${UNS}/photo-1593079831268-3381b0db4a77?w=1200&h=800&q=80&auto=format&fit=crop`,

  // ── Instructors ────────────────────────────────────────────────────────────
  // TODO: Replace with actual studio photos of each instructor
  instructorNaira: `${UNS}/photo-1494790108377-be9c29b29330?w=600&h=750&q=80&auto=format&fit=crop`,
  instructorTheresia: `${UNS}/photo-1438761681033-6461ffad8d80?w=600&h=750&q=80&auto=format&fit=crop`,
  instructorHannah: `${UNS}/photo-1534528741775-53994a69daeb?w=600&h=750&q=80&auto=format&fit=crop`,
  instructorMarlyn: `${UNS}/photo-1580489944761-15a19d654956?w=600&h=750&q=80&auto=format&fit=crop`,
  instructorEnrika: `${UNS}/photo-1487412720507-e7ab37603c6f?w=600&h=750&q=80&auto=format&fit=crop`,
  instructorSita: `${UNS}/photo-1529626455594-4ff0802cfb7e?w=600&h=750&q=80&auto=format&fit=crop`,

  // ── Classes ────────────────────────────────────────────────────────────────
  classBeginner: `${UNS}/photo-1574680096145-d05b474e2155?w=800&h=600&q=80&auto=format&fit=crop`,
  classFullbody: `${UNS}/photo-1571019613454-1cb2f99b2d8b?w=800&h=600&q=80&auto=format&fit=crop`,
  classFlexibility: `${UNS}/photo-1599901860904-17e6ed7083a0?w=800&h=600&q=80&auto=format&fit=crop`,
  classPrivate: `${UNS}/photo-1601422407692-ec4eeec1d9b3?w=800&h=600&q=80&auto=format&fit=crop`,

  // ── Logo ───────────────────────────────────────────────────────────────────
  // Drop your logo at /public/images/logo.png (or .svg)
  // Recommended size: 300 × 80 px, transparent background, PNG or SVG
  logo: "/images/logo.png",
} as const;
