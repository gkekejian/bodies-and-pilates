import { headshot, type PhotoSpec } from "@/lib/photos";

/**
 * Instructor cards for /about ("Meet the Team").
 *
 * Names and backgrounds are carried over from the existing site.
 * TODO(owner): confirm every name, credential, and specialty below is current
 * and accurate, deliver a headshot for each (photo slot 3, same backdrop), and
 * fill each null field. Any null renders a labeled placeholder.
 *
 * Launch rule: this section is either complete or hidden. If it cannot be
 * completed before launch, set SHOW_TEAM to false.
 */
export const SHOW_TEAM = true;

export interface Instructor {
  name: string;
  role: string;
  credentials: string | null;
  specialties: string | null;
  philosophy: string | null;
  photo: PhotoSpec;
}

export const TEAM: Instructor[] = [
  {
    name: "Naira Sarkian",
    role: "Owner and Lead Instructor",
    // TODO(owner): Naira's certification(s) and training.
    credentials: null,
    // TODO(owner): Naira's specialties.
    specialties: null,
    // TODO(owner): Naira's one-line teaching philosophy, in her words.
    philosophy: null,
    photo: headshot("Naira Sarkian"),
  },
  {
    name: "Theresia Bunch",
    role: "Instructor",
    credentials: "BS in Kinesiology, pre-physical therapy emphasis. 15 years as a classical ballerina.",
    specialties: "Challenging, creative flows grounded in movement science",
    philosophy: "Pilates should feel welcoming for every body, whatever your background.",
    photo: headshot("Theresia Bunch"),
  },
  {
    name: "Hannah Pink",
    role: "Instructor",
    credentials: "Certified through Integrated Movement and Wellness. Professional dancer.",
    specialties: "Breathwork, anatomical awareness, post-injury support alongside physical therapists",
    // TODO(owner): Hannah's one-line philosophy, in her words.
    philosophy: null,
    photo: headshot("Hannah Pink"),
  },
  {
    name: "Marlyn Ortiz",
    role: "Instructor",
    credentials: "Trained at the SUNY Purchase Dance Conservatory. 20+ years as a dancer, choreographer, and aerialist.",
    specialties: "Precise, dance-informed technique with a collaborative teaching style",
    // TODO(owner): Marlyn's one-line philosophy, in her words.
    philosophy: null,
    photo: headshot("Marlyn Ortiz"),
  },
  {
    name: "Enrika Navikaite",
    role: "Instructor",
    credentials: "Certified through Karen Lord Pilates Movement.",
    specialties: "Warm, high-energy sessions that challenge mind and body",
    // TODO(owner): Enrika's one-line philosophy, in her words.
    philosophy: null,
    photo: headshot("Enrika Navikaite"),
  },
  {
    name: "Sita Acevedo",
    role: "Instructor",
    credentials: "Certified movement instructor in Pilates and GYROTONIC. Aerialist and aerial choreographer.",
    specialties: "Core stability, creative sequencing, and prop work",
    // TODO(owner): Sita's one-line philosophy, in her words.
    philosophy: null,
    photo: headshot("Sita Acevedo"),
  },
];
