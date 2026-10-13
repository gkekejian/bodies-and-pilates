import { MEDIA, type PhotoMedia } from "@/lib/media";

/**
 * Team on /about. Owner-confirmed October 12, 2026: exactly four instructors
 * at launch, Naira first as Founder and Owner, each with an owner-identified
 * photo. Classes taught come from the current schedule.
 *
 * The five-bullet bio block (specialty, years teaching, certifications,
 * teaching style, what to expect) renders only for the bullets that hold real
 * data. The owner has asked each instructor for this; until it arrives every
 * bullet is null and the card shows photo, name, classes, and a booking link.
 * Never invent a specialty, a years count, or a certification.
 *
 * TODO(owner): send each instructor's five bullets.
 *
 * Not on the site until the owner identifies their photos (see BUILD-NOTES):
 * Marlyn Ortiz, Altara Michelle, McKinsey Shea, Ashley Aldred, Deanna Garzillo,
 * Enrika Navikaite. A former instructor in the photo set gets no profile or
 * mention anywhere. Earlier draft bios for the four below (from the old site)
 * are in BUILD-NOTES for the instructors to confirm or replace.
 */
export const SHOW_TEAM = true;

export type ClassType = "Beginner" | "Full Body" | "Flexibility" | "Abs and Assets";

export interface InstructorBio {
  specialty: string | null;
  yearsTeaching: string | null;
  certifications: string | null;
  teachingStyle: string | null;
  whatToExpect: string | null;
}

export interface Instructor {
  name: string;
  firstName: string;
  /** Only Naira carries a role title. */
  role: string | null;
  teaches: ClassType[];
  photo: PhotoMedia | null;
  bio: InstructorBio;
}

const noBio: InstructorBio = {
  specialty: null,
  yearsTeaching: null,
  certifications: null,
  teachingStyle: null,
  whatToExpect: null,
};

export const TEAM: Instructor[] = [
  {
    name: "Naira Sarkian",
    firstName: "Naira",
    role: "Founder and Owner",
    teaches: ["Full Body"],
    // The main photo leads the founder block; the card uses her third photo
    // so the same shot does not appear twice on /about.
    photo: MEDIA.nairaThird ?? MEDIA.nairaMain,
    bio: noBio,
  },
  {
    name: "Sita Acevedo",
    firstName: "Sita",
    role: null,
    teaches: ["Full Body", "Flexibility"],
    photo: MEDIA.sitaHeadshot,
    bio: noBio,
  },
  {
    name: "Theresia Bunch",
    firstName: "Theresia",
    role: null,
    teaches: ["Full Body"],
    photo: MEDIA.theresiaHeadshot,
    bio: noBio,
  },
  {
    name: "Hannah Pink",
    firstName: "Hannah",
    role: null,
    teaches: ["Full Body"],
    photo: MEDIA.hannahHeadshot,
    bio: noBio,
  },
];

export const BIO_LABELS: [keyof InstructorBio, string][] = [
  ["specialty", "Specialty"],
  ["yearsTeaching", "Years teaching"],
  ["certifications", "Certifications"],
  ["teachingStyle", "Teaching style"],
  ["whatToExpect", "What to expect"],
];

export const bioEntries = (bio: InstructorBio) =>
  BIO_LABELS.flatMap(([key, label]) => (bio[key] ? [{ label, value: bio[key] as string }] : []));
