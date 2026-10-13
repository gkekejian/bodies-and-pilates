/**
 * Client testimonials, owner-supplied October 12, 2026.
 *
 * Excerpts are verbatim and attributions are exactly as provided. The
 * ClassPass reviews are public reviews on the studio's ClassPass page. Do not
 * edit a quote; replace it with another real review instead.
 *
 * Visible content only: no aggregateRating or Review schema is built from
 * these or from the ClassPass rating.
 */

export interface Testimonial {
  id: string;
  quote: string;
  attribution: string;
}

const CLIENT_REVIEW: Testimonial = {
  id: "client-naira",
  quote:
    "Naira is a 10 out of 10. She is a genuine instructor. She is friendly and really cares about everyone in the class. I felt like I got my money's worth.",
  attribution: "Client review",
};

const CLASSPASS_REVIEWS: Testimonial[] = [
  {
    id: "sasha",
    quote:
      "Such a great workout! Definitely a hard class but totally worth it. The instructor was so kind and came around helping to fix form. Since it's a small studio, you get personalized attention.",
    attribution: "Sasha, via ClassPass",
  },
  {
    id: "penny",
    quote:
      "Absolutely phenomenal class. I have never felt more worked in a flexibility class, and I loved it. She brings something new every time.",
    attribution: "Penny, via ClassPass",
  },
  {
    id: "lori",
    quote: "This class is very challenging but the teacher is great. She's patient and knowledgeable and really instructive.",
    attribution: "Lori, via ClassPass",
  },
  {
    id: "jason",
    quote: "The best ever. She helps with men learning and really pushes you to your limits.",
    attribution: "Jason, via ClassPass",
  },
  {
    id: "taylor",
    quote: "Best instructor. The flow is sooo good. I love this studio!!",
    attribution: "Taylor, via ClassPass",
  },
];

/** Home: three cards. */
export const HOME_TESTIMONIALS: Testimonial[] = CLASSPASS_REVIEWS.slice(0, 3);

/** About: all six, the client review first. */
export const ABOUT_TESTIMONIALS: Testimonial[] = [CLIENT_REVIEW, ...CLASSPASS_REVIEWS];
