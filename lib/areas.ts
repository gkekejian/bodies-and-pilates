/**
 * Neighborhoods served, used by the home page "Areas We Serve" block,
 * ExerciseGym areaServed schema, and llms.txt.
 *
 * Lines describe direction and main roads only. No drive times anywhere on the
 * site (owner rule, 2026-10-13).
 * TODO(owner): read each line and confirm it matches how locals actually
 * get to the studio. Edit freely; nothing below is a quoted fact.
 */

export interface ServiceArea {
  name: string;
  line: string;
}

export const SERVICE_AREAS: ServiceArea[] = [
  {
    name: "Toluca Lake",
    line: "Just east of the studio. Riverside Dr connects Toluca Lake to Vineland Ave.",
  },
  {
    name: "Studio City",
    line: "Directly south. Vineland Ave runs north from Ventura Blvd to our door.",
  },
  {
    name: "Valley Village",
    line: "Just west. Magnolia Blvd crosses Vineland Ave a few blocks from the studio.",
  },
  {
    name: "Burbank",
    line: "East of North Hollywood. Magnolia Blvd runs west from Magnolia Park toward the studio.",
  },
  {
    name: "Sherman Oaks",
    line: "West along Riverside Dr or Ventura Blvd, then north on Vineland Ave.",
  },
  {
    name: "Universal City",
    line: "South across the 101. Lankershim Blvd and Vineland Ave both lead north into North Hollywood.",
  },
  {
    name: "Valley Glen",
    line: "Northwest of the studio. Burbank Blvd runs east from Valley Glen to Vineland Ave.",
  },
  {
    name: "Van Nuys",
    line: "Further west. Burbank Blvd or Victory Blvd brings you east toward North Hollywood.",
  },
];

/** North Hollywood first, then the surrounding neighborhoods. */
export const AREA_SERVED_NAMES = ["North Hollywood", ...SERVICE_AREAS.map((a) => a.name)];
