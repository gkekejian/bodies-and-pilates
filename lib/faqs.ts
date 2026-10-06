/**
 * FAQ content. Rendered on /faq and used to generate FAQPage JSON-LD.
 * Entries with `answer: null` render a labeled placeholder and are left out
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
      "Your first class is $25 and a one-week unlimited intro is $105. After that: single class $36, 5-pack $160, 10-pack $300. Memberships are $170/month for 8 classes or $280/month unlimited. Private sessions are $100.",
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
      "No. Beginner classes are built for first-timers, class sizes stay small, and your instructor coaches your form throughout. Most new clients start with the $25 first class.",
  },
  {
    id: "wear",
    question: "What should I wear?",
    answer:
      "Form-fitting workout clothes you can move in, plus grip socks, which are required on the reformer and available at the front desk. Skip loose clothing and jewelry.",
  },
  {
    id: "how-often",
    question: "How often should I do Pilates?",
    answer:
      "Twice a week is the sweet spot for visible results, which is why our most popular plan is 8 classes a month. Once a week maintains; three or more accelerates.",
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
      "Yes. If you love it, coming direct is the better deal: the $105 one-week unlimited, then a membership with perks ClassPass cannot give you, like the same instructor each week and a saved reformer.",
  },
  {
    id: "cancellation",
    question: "What is your cancellation policy?",
    // TODO(owner): confirm the exact late-cancel and no-show terms and paste
    // the final text here. For reference only (do not publish unconfirmed),
    // the old site said: 12-hour cancellation window, late cancels forfeit the
    // class, no-shows are charged a $35 fee.
    answer: null,
    pending: "Owner to provide the confirmed late-cancel and no-show policy text.",
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
    // TODO(owner): confirm the exact membership pause and cancellation terms
    // (notice period, how to request, any fees) and paste the text here.
    answer: null,
    pending: "Owner to provide the confirmed membership pause and cancellation terms.",
  },
  {
    id: "private",
    question: "Do you offer private sessions?",
    answer:
      "Yes. 1:1 sessions are $100 for 55 minutes; duets are $70 per person. Ideal for beginners, injuries, or prenatal with clearance.",
  },
  {
    id: "age",
    question: "Is there an age limit?",
    answer:
      "Classes welcome adults of all ages. Teens 14+ may attend with a parent. Mention injuries or conditions when you book.",
  },
  {
    id: "club-pilates",
    question: "How is Bodies and Pilates different from Club Pilates?",
    answer:
      "We are an independent boutique studio: small classes, one consistent coaching team, no franchise script. You get to know your instructor, and they get to know your body.",
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
    id: "nearby",
    question: "Is the studio near Toluca Lake, Studio City, or Burbank?",
    answer:
      "We are on Vineland Ave in North Hollywood: about 5 minutes from Toluca Lake, 8 from Valley Village, 10 from Studio City and Burbank, with street parking nearby.",
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
