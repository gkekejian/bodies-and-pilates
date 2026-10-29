/**
 * The class list: the one place class names live. Renaming a class is an
 * edit to this file; the pages, the FAQ, llms.txt and the team list read the
 * names from here. (Free text outside code still names classes: the One-Week
 * Unlimited detail in lib/pricing.ts and some blog posts. Search for the old
 * name there when renaming.)
 *
 * Every format is small-group reformer Pilates except Private (and its Duet
 * option). Group classes are 50 minutes (confirmed from the Mindbody
 * schedule).
 * TODO(owner): confirm the difficulty level and the "who it is for" line for
 * each format, and send a description for Abs and Assets.
 */
import { PRIVATE } from "@/lib/pricing";

export type ClassSlug = "beginner" | "fullbody" | "flexibility" | "private";

export interface ClassFormat {
  slug: ClassSlug;
  name: string;
  /** Kept from the existing site for SEO. Used as the detail page title tag + H1. */
  pageTitle: string;
  /** Optional title tag when "pageTitle | Bodies and Pilates" runs past about 60 characters. */
  seoTitle?: string;
  metaDescription: string;
  level: string;
  duration: string;
  oneLiner: string;
  /** The old site's class description: two or three plain sentences, in the studio's voice. */
  blurb: string;
  forWho: string;
  description: string;
  expect: string[];
}

export const CLASSES: ClassFormat[] = [
  {
    slug: "beginner",
    name: "Beginner",
    pageTitle: "Beginner Pilates Classes in North Hollywood",
    metaDescription:
      "Beginner reformer Pilates classes in North Hollywood. Small groups, real coaching on form, no experience needed. Book your $25 first class.",
    level: "Beginner",
    duration: "50 minutes",
    oneLiner: "The fundamentals of reformer Pilates at a steady pace, with detailed coaching on form.",
    blurb:
      "New to the reformer? Our Beginner class takes it slow and teaches you the basics: the springs, the footbar, and how to find your alignment. Your instructor coaches your form the whole way through.",
    forWho:
      "First-timers, anyone returning after time off, people working around restrictions, and regulars who want to sharpen the basics.",
    description:
      "Small-group reformer Pilates built on the fundamentals. A slower-paced, full-body class that teaches you how the reformer works, how to find your alignment, and how to move with control before the work gets more complex.",
    expect: [
      "Your instructor sets you up on the reformer and explains the springs and footbar.",
      "Foundational footwork, core, and arm work at a steady pace.",
      "Coaching on your form throughout, with modifications whenever you need them.",
      "A short stretch to close, so you leave knowing what you worked and why.",
    ],
  },
  {
    slug: "fullbody",
    name: "Full Body",
    // Previously "Mat Pilates Classes in North Hollywood". Changed because the
    // studio does not run mat classes; every group class is on the reformer.
    pageTitle: "Full Body Reformer Pilates Classes in North Hollywood",
    seoTitle: "Full Body Reformer Pilates, North Hollywood | Bodies and Pilates",
    metaDescription:
      "Full Body reformer Pilates in North Hollywood: lower body, upper body, and core in one small-group class. Start with a $25 first class.",
    level: "Moderate to challenging, best after a few Beginner classes",
    duration: "50 minutes",
    oneLiner: "The classic class: resistance training for legs, arms, and core on the reformer and props.",
    blurb:
      "This is our classic class. We work your legs, arms, and core on the reformer, with props when you want more. If you know the basics, start here.",
    forWho:
      "Clients who know the reformer basics and want a complete strength workout. Brand new? Start with Beginner.",
    description:
      "Small-group reformer Pilates that works the whole body. Resistance training on the reformer, plus props, targets the lower body, upper body, and core in a single class.",
    expect: [
      "A warm-up that wakes up breath, core, and hips.",
      "Lower body, upper body, and core sequences on the reformer, with props for added challenge.",
      "Spring changes and modifications so the work fits your level.",
      "A cool-down stretch before you step off the reformer.",
    ],
  },
  {
    slug: "flexibility",
    name: "Flexibility",
    pageTitle: "Pilates for Flexibility in North Hollywood",
    metaDescription:
      "Flexibility-focused reformer Pilates in North Hollywood. Restorative stretching with spring support in a small group. Your first class is $25.",
    level: "All levels, gentle",
    duration: "50 minutes",
    oneLiner: "Restorative reformer work and active stretching to release tightness.",
    blurb:
      "Feeling tight? Our Flexibility class is slower and restorative, with the springs supporting every stretch. Expect work for your hips, spine, and shoulders, and a calm finish.",
    forWho:
      "Anyone feeling tight, recovering from a hard week of training, or wanting to move more easily day to day.",
    description:
      "Small-group reformer Pilates with a restorative focus. The springs support your stretches, so you can lengthen safely, improve mobility, and let go of stress.",
    expect: [
      "Breath work to slow down and settle in.",
      "Active stretches on the reformer, with spring support to ease you deeper.",
      "Mobility work for the hips, spine, and shoulders.",
      "A calm finish that leaves you looser than you arrived.",
    ],
  },
  {
    slug: "private",
    name: "Private",
    pageTitle: "Private Pilates Sessions in North Hollywood",
    metaDescription:
      "Private reformer Pilates sessions in North Hollywood: $100 for 55 minutes 1:1, or $70 per person for duets. Book a private session today.",
    level: "All levels",
    duration: "55 minutes",
    oneLiner: "One-on-one reformer Pilates built entirely around your body and goals.",
    blurb:
      "One-on-one with your instructor for 55 minutes. We plan every exercise and spring setting around you. Want to bring a friend or partner? Book a duet.",
    forWho:
      "Beginners who want a head start, clients working around an injury with their doctor's OK, and anyone who prefers individual attention.",
    description:
      "A 55-minute private reformer session with your instructor. Every exercise, spring setting, and cue is chosen for you. Duets are available if you want to train with a friend or partner.",
    expect: [
      "A conversation about your goals, history, and any injuries.",
      "A session planned around you, on the reformer and with props as needed.",
      "Continuous coaching on form, at your pace.",
      "Clear next steps, whether that is group classes or more private work.",
    ],
  },
];

export const GROUP_CLASSES = CLASSES.filter((c) => c.slug !== "private");

/** On the weekly schedule; no detail page yet (it has a block on /classes). */
export const ABS_AND_ASSETS = {
  slug: "abs-and-assets",
  name: "Abs and Assets",
  duration: "50 minutes",
  oneLiner: "A 50-minute reformer class on our weekly schedule.",
} as const;

/** The four group classes by name, in schedule order. */
export const GROUP_CLASS_NAMES = [...GROUP_CLASSES.map((c) => c.name), ABS_AND_ASSETS.name];

/** "A, B, C, and D" */
export const listWithAnd = (items: string[]) =>
  items.length < 3 ? items.join(" and ") : `${items.slice(0, -1).join(", ")}, and ${items[items.length - 1]}`;

const duetOffer = PRIVATE.find((o) => o.id === "duet")!;

export interface LineupEntry {
  key: string;
  name: string;
  /** The class's detail page (or its block on /classes). */
  href: string;
  /** The description the codebase already uses for it. */
  description: string;
}

/**
 * The six ways in, as the Home carousel shows them: the four group classes,
 * then Private and its Duet option (which shares the Private page). Names and
 * descriptions come from the entries above and the Duet offer.
 */
export const CLASS_LINEUP: LineupEntry[] = [
  ...GROUP_CLASSES.map((c) => ({ key: c.slug, name: c.name, href: `/classes/${c.slug}`, description: c.oneLiner })),
  { key: ABS_AND_ASSETS.slug, name: ABS_AND_ASSETS.name, href: `/classes#${ABS_AND_ASSETS.slug}`, description: ABS_AND_ASSETS.oneLiner },
  ...CLASSES.filter((c) => c.slug === "private").map((c) => ({
    key: c.slug,
    name: c.name,
    href: `/classes/${c.slug}`,
    description: c.oneLiner,
  })),
  { key: duetOffer.id, name: duetOffer.name, href: "/classes/private", description: duetOffer.detail },
];

export const classBySlug = (slug: ClassSlug) => {
  const c = CLASSES.find((k) => k.slug === slug);
  if (!c) throw new Error(`Unknown class: ${slug}`);
  return c;
};
