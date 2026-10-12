import { headshot, type PhotoSpec } from "@/lib/photos";

/**
 * Instructor cards for /about ("Meet the Team"), story-driven: photo, name,
 * credential, specialty, one-line philosophy, and a 2 to 3 sentence origin
 * story (how they found Pilates, why they teach). Naira first, as founder.
 *
 * Names, backgrounds, and origin stories are carried over from the existing
 * site's bios. Never invent instructor details.
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
  /** 2 to 3 sentences: how they found Pilates, why they teach. */
  origin: string | null;
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
    // TODO(owner): Naira's origin story in 2 to 3 sentences (how she found
    // Pilates, why she founded the studio and teaches).
    origin: null,
    photo: headshot("Naira Sarkian"),
  },
  {
    name: "Theresia Bunch",
    role: "Instructor",
    credentials: "BS in Kinesiology, pre-physical therapy emphasis. 15 years as a classical ballerina.",
    specialties: "Challenging, creative flows grounded in movement science",
    philosophy: "Pilates should feel welcoming for every body, whatever your background.",
    // TODO(owner): confirm, and add how Theresia found Pilates.
    origin:
      "Theresia spent 15 years as a classical ballerina, so intentional, precise movement has been central to her life for as long as she can remember. Her kinesiology degree grounds her teaching in anatomy and movement science.",
    photo: headshot("Theresia Bunch"),
  },
  {
    name: "Hannah Pink",
    role: "Instructor",
    credentials: "Certified through Integrated Movement and Wellness. Professional dancer.",
    specialties: "Breathwork, anatomical awareness, post-injury support alongside physical therapists",
    // TODO(owner): Hannah's one-line philosophy, in her words.
    philosophy: null,
    // TODO(owner): confirm, and add why Hannah teaches.
    origin:
      "Hannah was raised by a Pilates master teacher, and movement has shaped her entire life. Alongside teaching, she works as a professional dancer across music videos, live performance, film, and television.",
    photo: headshot("Hannah Pink"),
  },
  {
    name: "Marlyn Ortiz",
    role: "Instructor",
    credentials: "Trained at the SUNY Purchase Dance Conservatory. 20+ years as a dancer, choreographer, and aerialist.",
    specialties: "Precise, dance-informed technique with a collaborative teaching style",
    // TODO(owner): Marlyn's one-line philosophy, in her words.
    philosophy: null,
    // TODO(owner): confirm, and add how Marlyn found Pilates.
    origin:
      "Marlyn brings more than two decades as a dancer, choreographer, and aerialist, with work spanning Broadway, film, television, and tours. That range, from classical to contemporary, shapes every session she leads.",
    photo: headshot("Marlyn Ortiz"),
  },
  {
    name: "Enrika Navikaite",
    role: "Instructor",
    credentials: "Certified through Karen Lord Pilates Movement.",
    specialties: "Warm, high-energy sessions that challenge mind and body",
    // TODO(owner): Enrika's one-line philosophy, in her words.
    philosophy: null,
    // TODO(owner): confirm, and add why Enrika teaches.
    origin:
      "Born and raised in Lithuania, Enrika grew up drawn to dance and physical expression. After moving to Los Angeles she explored a number of fitness practices before finding Pilates, which combined the strength and mindfulness she had been missing.",
    photo: headshot("Enrika Navikaite"),
  },
  {
    name: "Sita Acevedo",
    role: "Instructor",
    credentials: "Certified movement instructor in Pilates and GYROTONIC. Aerialist and aerial choreographer.",
    specialties: "Core stability, creative sequencing, and prop work",
    // TODO(owner): Sita's one-line philosophy, in her words.
    philosophy: null,
    // TODO(owner): confirm, and add how Sita found Pilates.
    origin:
      "Sita is an LA-based aerialist and aerial dance choreographer. That performance background shows up in her Pilates: fluid, precise, and often inventive with props.",
    photo: headshot("Sita Acevedo"),
  },
];
