/**
 * Class formats. Every format is small-group reformer Pilates except Private.
 *
 * TODO(owner): confirm the difficulty level and the "who it is for" line for
 * each format, and the 50-minute class length for group classes.
 */

export type ClassSlug = "beginner" | "fullbody" | "flexibility" | "private";

export interface ClassFormat {
  slug: ClassSlug;
  name: string;
  /** Kept from the existing site for SEO. Used as the detail page title tag + H1. */
  pageTitle: string;
  metaDescription: string;
  level: string;
  duration: string;
  oneLiner: string;
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
    metaDescription:
      "Full Body reformer Pilates in North Hollywood: lower body, upper body, and core in one small-group class. Start with a $25 first class.",
    level: "All levels, moderate to challenging",
    duration: "50 minutes",
    oneLiner: "The classic class: resistance training for legs, arms, and core on the reformer and props.",
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
    forWho:
      "Beginners who want a head start, clients working around injuries, prenatal clients with clearance, and anyone who prefers individual attention.",
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

export const classBySlug = (slug: ClassSlug) => {
  const c = CLASSES.find((k) => k.slug === slug);
  if (!c) throw new Error(`Unknown class: ${slug}`);
  return c;
};
