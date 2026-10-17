import { GRIP_SOCKS_LINE } from "@/lib/site";

/**
 * FAQ content. Rendered on /faq and used to generate FAQPage JSON-LD.
 * Entries with `answer: null` are not rendered and are left out
 * of the schema until the owner supplies the text.
 */

export interface Faq {
  id: string;
  question: string;
  answer: string | null;
  /** What the owner must provide when `answer` is null. */
  pending?: string;
}

export const FAQS: Faq[] = [
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
      "No. Beginner classes are built for first-timers, classes are capped at 7, and your instructor coaches your form throughout. Most new clients start with the $25 first class.",
  },
  {
    id: "wear",
    question: "What should I wear?",
    answer:
      `Form-fitting workout clothes you can move in. Skip loose clothing and jewelry. ${GRIP_SOCKS_LINE}`,
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
    id: "cancellation",
    question: "What is your cancellation policy?",
    answer:
      "Cancel 12 or more hours before class for no charge. Cancel within 12 hours and the class credit is forfeited. No-shows are charged $15.",
  },
  {
    id: "parking",
    question: "Where do I park?",
    answer:
      "Street parking on Weddington St and metered spots in front of the studio on Vineland Ave. Arrive 10 minutes early for your first class.",
  },
  {
    id: "pause-cancel",
    question: "Can I pause or cancel my membership?",
    answer: "Yes. Pause anytime. Cancel with 7 days' notice. No fees.",
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
    id: "age",
    question: "Is there an age limit?",
    answer:
      "Classes welcome adults of all ages. Tell your instructor about any injuries or conditions before class.",
  },
  {
    id: "club-pilates",
    question: "How is Bodies and Pilates different from Club Pilates?",
    answer:
      "We are an independent, woman-owned boutique studio: classes capped at 7 people, professional Merrithew reformers, experienced instructors, and no franchise script.",
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
      "Arrive 10 minutes early, meet your instructor, get set up on your reformer. Fifty minutes of guided, low-impact strength work with coaching on your form the whole time.",
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
      "Four 50-minute group classes, all on the reformer: Beginner, Full Body, Flexibility, and Abs and Assets. Plus private sessions ($100 for 55 minutes) and duets ($70 per person).",
  },
  {
    id: "pregnant",
    question: "Can I take a class while pregnant?",
    answer:
      "Talk to your doctor or midwife before taking any class, and tell your instructor before class. This is general information, not medical advice.",
  },
  {
    id: "nearby",
    question: "Is the studio near Toluca Lake, Studio City, or Burbank?",
    answer:
      "Yes. We are on Vineland Ave in North Hollywood, close to Toluca Lake, Valley Village, Studio City, and Burbank, with street parking on Weddington St and metered spots in front of the studio.",
  },
];

export const faqById = (id: string) => {
  const faq = FAQS.find((f) => f.id === id);
  if (!faq) throw new Error(`Unknown FAQ id: ${id}`);
  return faq;
};

/** The three questions used by the FAQ teasers on Home and /intro-offer. */
export const TEASER_FAQ_IDS = ["experience", "first-class", "parking"] as const;

export function faqPageSchema() {
  return {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: FAQS.filter((f) => f.answer).map((f) => ({
      "@type": "Question",
      name: f.question,
      acceptedAnswer: { "@type": "Answer", text: f.answer },
    })),
  };
}
