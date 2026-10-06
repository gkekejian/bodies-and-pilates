import { testimonialPortrait, type PhotoSpec } from "@/lib/photos";

/**
 * Client testimonials. Quotes are real reviews from the existing site.
 *
 * TODO(owner): for each quote, provide the client's first name and
 * neighborhood (with their permission) and, ideally, a portrait (photo slot 10).
 * No anonymous "Studio Guest" attributions. Until both fields are set the
 * card shows a labeled placeholder where the attribution goes.
 */

export interface Testimonial {
  quote: string;
  firstName: string | null;
  neighborhood: string | null;
  portrait: PhotoSpec;
}

export const TESTIMONIALS: Testimonial[] = [
  {
    quote:
      "Naira is a 10 out of 10. She is a genuine instructor. She is friendly and really cares about everyone in the class. She has a lovely presence. I felt like I got my money's worth. I was very impressed and I look forward to taking another class there.",
    firstName: null,
    neighborhood: null,
    portrait: testimonialPortrait(),
  },
  {
    quote:
      "Naira is very charming and kind but works us to a sweat, while being accommodating to our particular circumstances. I really enjoy her sessions.",
    firstName: null,
    neighborhood: null,
    portrait: testimonialPortrait(),
  },
  {
    quote: "I LOVE her classes! She has the best energy, it's calm and yet the sessions are very challenging.",
    firstName: null,
    neighborhood: null,
    portrait: testimonialPortrait(),
  },
];
