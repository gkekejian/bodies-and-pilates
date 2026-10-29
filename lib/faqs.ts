
/**
 * FAQ content. Rendered on /faq and used to generate FAQPage JSON-LD.
 * Entries with `answer: null` are not rendered and are left out
 * of the schema until the owner supplies the text.
 */

import { GROUP_CLASS_NAMES, listWithAnd } from "@/lib/classes";

export interface Faq {
  id: string;
  question: string;
  /** Plain text; `**text**` marks bold, as the old site set it. */
  answer: string | null;
  /** What the owner must provide when `answer` is null. */
  pending?: string;
}

export const FAQS: Faq[] = [
  // The old site's FAQs page, in its order and its words (design-reference/old-site/faqs-top.png).
  // Fact-sheet overrides: no-show $15 with no credit kept (the old page printed a dead fee and said a no-show keeps the
  // credit), metered parking (PR #9), arrive at least 10 minutes early (PR #9), the PR #7 pregnancy entry, no $25 member add-on
  // (not on the locked menu). The late-arrival and age entries are the old site's, owner-confirmed as current policy.
  {
    id: "signed-up",
    question: "I just signed up, what do I need for my first class?",
    answer:
      "Welcome! Please arrive at least 10 minutes prior to class starting to allow ample time to get settled. A waiver signature will be required upon arrival. Every class requires the use of grip socks. If you forget, we have grip socks available for purchase at the studio.",
  },
  {
    id: "wear",
    question: "What should I wear?",
    answer:
      "We recommend form fitting workout clothes that allow you to move freely. This helps instructors see and correct your form more easily. Loose clothing may hinder your exercise performance and cause potential dangers. Grip socks are required for safety and hygienic purposes.",
  },
  {
    id: "parking",
    question: "Where can I park?",
    answer:
      "Metered street parking is available on Weddington St and Vineland Ave.",
  },
  {
    id: "cancellation",
    question: "What is your cancellation policy?",
    answer:
      "Cancellations for classes must be made with a 12 hour notice of class start time. If you cancel within 12 hours of the scheduled class, you will be considered “Late cancel” and will forfeit that class with no additional charge. Absence to class without a cancellation will result in a $15 No Show fee.",
  },
  {
    id: "late",
    question: "If I am running late, will I still be able to join the class?",
    answer:
      "We ask that you try your best to be on time to prevent distractions, and to allow proper warm up time during the beginning of class. If you arrive **within 5 minutes of the start time**, you will be allowed to join the class. Unfortunately, anything past that will result in a “late cancel” and your class credit will be forfeited.",
  },
  {
    id: "pregnant",
    question: "Can I take a class while pregnant?",
    answer:
      "Talk to your doctor or midwife before taking any class, and tell your instructor before class. This is general information, not medical advice.",
  },
  {
    id: "age",
    question: "Is there an age limit for classes?",
    answer:
      "Clients 16-17 years old must receive instructor approval prior to joining. The parent or guardian must sign the liability waiver on behalf of the client. Any clients under 16 years of age must be accompanied by a parent or guardian during the entirety of class.",
  },
  {
    id: "pack-vs-membership",
    question: "What is the difference between a class pack and an auto-renew membership?",
    answer:
      "Packages are a set number of classes to be used within three months. Once all classes are used up or expired, you will need to purchase more. Membership classes are to be used within the billing period, and new credits will automatically be applied during the next billing cycle. Memberships offer discounted rates on classes.",
  },
  {
    id: "refunds",
    question: "Do you offer refunds or transfers?",
    answer:
      "All sales are final. Classes are non-transferable and non-refundable.",
  },
  {
    id: "rollover",
    question: "Do auto-renew classes roll over?",
    answer:
      "Membership credits must be used within that billing cycle. Any unused credits will not rollover.",
  },
  // The rebuild's questions the old page did not have.
  {
    id: "cost",
    question: "How much does Pilates cost in North Hollywood?",
    answer:
      "Your first class is $25 and the One-Week Unlimited is $105. After that: single class $36, 5-pack $160, 10-pack $300. Memberships run from $130/month for 5 classes to $280/month unlimited. Private sessions are $100.",
  },
  {
    id: "what-is-reformer",
    question: "What is reformer Pilates?",
    answer:
      "Strength and mobility training on a spring-loaded machine called the reformer. The springs add resistance to classic Pilates movements, building lean strength, flexibility, and control with low impact on your joints.",
  },
  {
    id: "experience",
    question: "Do I need experience to take a class?",
    answer:
      "No. Beginner classes are built for first-timers, and your instructor coaches your form throughout. Most new clients start with the $25 first class.",
  },
  {
    id: "how-often",
    question: "How often should I do Pilates?",
    answer:
      "Twice a week fits most schedules, and our most popular plan is 8 classes a month for $170.",
  },
  {
    id: "back-pain",
    question: "Is Pilates good for back pain?",
    answer:
      "Many clients come for the core strength that supports the back. Tell your instructor about any injuries before class. For medical conditions, check with your doctor first.",
  },
  {
    id: "classpass",
    question: "Do you take ClassPass?",
    answer:
      "Yes. If you love it, coming direct is the better deal: the One-Week Unlimited ($105), then a membership from $130 a month that you can pause anytime and cancel with 7 days' notice, no fees.",
  },
  {
    id: "pause-cancel",
    question: "Can I pause or cancel my membership?",
    answer: "Yes. Pause anytime. Cancel with 7 days' notice. No fees.",
  },
  {
    id: "pack-expiry",
    question: "Do class packs expire?",
    answer: "Yes. Class packs expire 3 months after purchase.",
  },
  {
    // Old-site Search Console showed "mat pilates near me" impressions. Answer
    // honestly rather than chase mat terms the studio does not offer.
    id: "mat",
    question: "Do you offer mat Pilates?",
    answer:
      "Every group class at Bodies and Pilates is taught on the reformer. Mat Pilates uses your body weight on the floor; the reformer adds springs, so each exercise can be made more supportive or more challenging. New to the reformer? Start with a Beginner class or the $25 first class.",
  },
  {
    id: "private",
    question: "Do you offer private sessions?",
    answer:
      "Yes. 1:1 sessions are $100 for 55 minutes; duets are $70 per person. Good for beginners. Working around an injury? Get your doctor's OK, then tell your instructor before your session.",
  },
  {
    id: "club-pilates",
    question: "How is Bodies and Pilates different from Club Pilates?",
    answer:
      "We are an independent, woman-owned boutique studio with experienced instructors and no franchise script.",
  },
  {
    id: "lagree",
    question: "What is the difference between Lagree and reformer Pilates?",
    answer:
      "Lagree is a high-intensity method taught on its own machine. Class length and format vary by studio. Reformer Pilates is controlled strength, mobility, and flexibility work on the reformer, with more emphasis on form and posture. Both are low-impact. Pilates is the better starting point if you are new or want flexibility alongside strength.",
  },
  {
    id: "men",
    question: "Do men do Pilates?",
    answer: "Absolutely. The reformer is strength training; it does not care about gender.",
  },
  {
    id: "first-class",
    question: "What happens in my first class?",
    answer:
      "Arrive at least 10 minutes early, meet your instructor, get set up on your reformer. Fifty minutes of guided, low-impact strength work with coaching on your form the whole time.",
  },
  {
    id: "class-size",
    question: "How many people are in a class?",
    answer: "Never more than 7 people per class, so your instructor can coach your form the whole 50 minutes.",
  },
  {
    id: "equipment",
    question: "What equipment do you use?",
    answer: "Every class runs on professional Merrithew reformers.",
  },
  {
    id: "classes",
    question: "What classes do you offer?",
    answer:
      `Four 50-minute group classes, all on the reformer: ${listWithAnd(GROUP_CLASS_NAMES)}. Plus private sessions ($100 for 55 minutes) and duets ($70 per person).`,
  },
  {
    id: "nearby",
    question: "Is the studio near Toluca Lake, Studio City, or Burbank?",
    answer:
      "Yes. We are on Vineland Ave in North Hollywood, close to Toluca Lake, Valley Village, Studio City, and Burbank. Metered street parking is available on Weddington St and Vineland Ave.",
  },
];

export const faqById = (id: string) => {
  const faq = FAQS.find((f) => f.id === id);
  if (!faq) throw new Error(`Unknown FAQ id: ${id}`);
  return faq;
};

/** The three questions used by the FAQ teasers on Home and /intro-offer. */
export const TEASER_FAQ_IDS = ["experience", "first-class", "parking"] as const;

/** An answer without its bold markers, for schema and other plain-text uses. */
export const plainAnswer = (answer: string) => answer.replace(/\*\*(.+?)\*\*/g, "$1");

export function faqPageSchema() {
  return {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: FAQS.filter((f) => f.answer).map((f) => ({
      "@type": "Question",
      name: f.question,
      acceptedAnswer: { "@type": "Answer", text: plainAnswer(f.answer!) },
    })),
  };
}
