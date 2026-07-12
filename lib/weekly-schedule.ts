/**
 * Server-rendered weekly class schedule.
 *
 * The Healcode widget is client-only, so search engines and AI crawlers can't
 * read it. Entries listed here render as a plain HTML table on /schedule
 * (with Schedule structured data) that crawlers CAN read.
 *
 * OWNER TODO: fill in the real weekly schedule from Mindbody. Until entries
 * are added the table simply doesn't render — never publish guessed times.
 */

export interface WeeklyClass {
  day:
    | "Monday"
    | "Tuesday"
    | "Wednesday"
    | "Thursday"
    | "Friday"
    | "Saturday"
    | "Sunday";
  /** e.g. "7:00 AM" (Pacific Time) */
  time: string;
  /** e.g. "Reformer", "Beginner", "Fullbody", "Flexibility" */
  className: string;
  instructor?: string;
}

export const WEEKLY_SCHEDULE: WeeklyClass[] = [
  // Example:
  // { day: "Monday", time: "7:00 AM", className: "Fullbody", instructor: "Naira" },
];
