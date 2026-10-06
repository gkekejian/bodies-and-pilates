/**
 * Real studio photography slots. All stock photography has been removed.
 *
 * TODO(owner): deliver each shot below. To fill a slot, drop the file in
 * /public/photos/ and set `src` (for example "/photos/reformer-room.jpg").
 * Until `src` is set, <PhotoSlot> renders a labeled placeholder of the same
 * size, so the layout does not shift when the real photo lands.
 *
 * The alt text is written for the final photo and is used as soon as the
 * slot is filled. Adjust it if the delivered shot differs.
 */

export interface PhotoSpec {
  slot: number;
  /** Short brief shown on the placeholder: exactly what to shoot. */
  brief: string;
  alt: string;
  src: string | null;
  width: number;
  height: number;
}

const photo = (spec: PhotoSpec) => spec;

export const PHOTOS = {
  // 1. Wide hero of the reformer room in daylight, no people.
  reformerRoom: photo({
    slot: 1,
    brief: "Wide shot of the reformer room in daylight, no people",
    alt: "Sunlit reformer Pilates room at Bodies and Pilates in North Hollywood, reformers lined up and ready for class",
    src: null,
    width: 1600,
    height: 2000,
  }),
  // 2. Real class in motion, instructor cueing.
  classInMotion: photo({
    slot: 2,
    brief: "Real class in motion, instructor cueing a client",
    alt: "Instructor cueing form during a small-group reformer Pilates class in North Hollywood",
    src: null,
    width: 1600,
    height: 1200,
  }),
  // 4. Close-up of hands and feet on the reformer straps and footbar.
  strapsCloseUp: photo({
    slot: 4,
    brief: "Close-up of hands and feet on reformer straps and footbar",
    alt: "Close-up of hands on reformer straps and feet on the footbar during a Pilates class at Bodies and Pilates",
    src: null,
    width: 1200,
    height: 1500,
  }),
  // 5. Entrance and signage from the Vineland Ave sidewalk.
  entrance: photo({
    slot: 5,
    brief: "Entrance and signage from the Vineland Ave sidewalk",
    alt: "Bodies and Pilates entrance and signage at 5251 Vineland Ave, Suite 6, North Hollywood",
    src: null,
    width: 1200,
    height: 900,
  }),
  // 6. Parking on Weddington St and metered spots.
  parking: photo({
    slot: 6,
    brief: "Street parking on Weddington St and metered spots on Vineland Ave",
    alt: "Street parking on Weddington St near the Bodies and Pilates reformer studio in North Hollywood",
    src: null,
    width: 1200,
    height: 900,
  }),
  // 7. Props flat-lay.
  propsFlatLay: photo({
    slot: 7,
    brief: "Props flat-lay: grip socks, bands, rings, balls",
    alt: "Flat-lay of Pilates props: grip socks, resistance bands, Pilates ring, and small balls",
    src: null,
    width: 1200,
    height: 1200,
  }),
  // 8. Warm post-class lifestyle shot.
  postClass: photo({
    slot: 8,
    brief: "Warm post-class lifestyle shot",
    alt: "Clients relaxing after a reformer Pilates class at Bodies and Pilates in North Hollywood",
    src: null,
    width: 1600,
    height: 1200,
  }),
} satisfies Record<string, PhotoSpec>;

// 3. Instructor headshots, same backdrop. See lib/team.ts (`photo` per person).
export const headshot = (name: string): PhotoSpec => ({
  slot: 3,
  brief: `Headshot of ${name}, same backdrop as the rest of the team`,
  alt: `${name}, reformer Pilates instructor at Bodies and Pilates in North Hollywood`,
  src: null,
  width: 900,
  height: 1125,
});

// 10. Testimonial portraits with first name and neighborhood. See lib/testimonials.ts.
export const testimonialPortrait = (): PhotoSpec => ({
  slot: 10,
  brief: "Client portrait (with permission)",
  alt: "Bodies and Pilates client portrait",
  src: null,
  width: 400,
  height: 400,
});

/**
 * 9. Vertical 15 to 30 second clips, one per class format.
 * TODO(owner): deliver each clip (9:16, MP4/H.264, under 8 MB, no audio
 * required). Drop it in /public/video/ and set `src` (and a poster frame).
 */
export interface ClipSpec {
  brief: string;
  label: string;
  src: string | null;
  poster: string | null;
}

export const CLIPS: Record<"beginner" | "fullbody" | "flexibility" | "private", ClipSpec> = {
  beginner: {
    brief: "15 to 30s vertical clip of a Beginner class",
    label: "Beginner reformer Pilates class at Bodies and Pilates",
    src: null,
    poster: null,
  },
  fullbody: {
    brief: "15 to 30s vertical clip of a Full Body class",
    label: "Full Body reformer Pilates class at Bodies and Pilates",
    src: null,
    poster: null,
  },
  flexibility: {
    brief: "15 to 30s vertical clip of a Flexibility class",
    label: "Flexibility reformer Pilates class at Bodies and Pilates",
    src: null,
    poster: null,
  },
  private: {
    brief: "15 to 30s vertical clip of a Private session",
    label: "Private reformer Pilates session at Bodies and Pilates",
    src: null,
    poster: null,
  },
};
