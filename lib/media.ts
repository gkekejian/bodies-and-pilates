import manifestJson from "./media-manifest.json";

/**
 * Real studio photography and video, owner-selected (October 12, 2026).
 *
 * Files are imported with `python3 scripts/import_media.py`, which writes
 * public/media/ and lib/media-manifest.json. An asset that is not in the
 * manifest resolves to null and its slot renders nothing: there are no
 * placeholders and no AI imagery anywhere on the site. The only stock images
 * are the four the old Wix site used, kept by owner decision (October 21,
 * 2026) in the old slots only (STOCK below).
 *
 * Filenames are final (they carry SEO value). Alt text describes what is in
 * the frame. Instructor photos follow "[Full Name], instructor at Bodies and
 * Pilates in North Hollywood".
 */

interface Manifest {
  og: string | null;
  photos: Record<string, { width: number; height: number }>;
  videos: Record<string, { width: number; height: number; seconds: number; poster: string }>;
}

const manifest = manifestJson as Manifest;

export interface PhotoMedia {
  kind: "photo";
  file: string;
  src: string;
  alt: string;
  width: number;
  height: number;
}

export interface VideoMedia {
  kind: "video";
  file: string;
  src: string;
  /** Poster frame: an owner-chosen photo when specified, else the clip's first frame. */
  poster: string;
  label: string;
  width: number;
  height: number;
}

export type Media = PhotoMedia | VideoMedia;

function photo(file: string, alt: string): PhotoMedia | null {
  const entry = manifest.photos[file];
  if (!entry) return null;
  return { kind: "photo", file, src: `/media/photos/${file}`, alt, ...entry };
}

function video(file: string, label: string, posterPhoto?: string): VideoMedia | null {
  const entry = manifest.videos[file];
  if (!entry) return null;
  const poster = posterPhoto && manifest.photos[posterPhoto] ? `/media/photos/${posterPhoto}` : entry.poster;
  return { kind: "video", file, src: `/media/video/${file}`, poster, label, width: entry.width, height: entry.height };
}

/** Drops missing assets, so callers can render whatever is present. */
export const present = <T,>(items: (T | null)[]): T[] => items.filter((x): x is T => x !== null);

const STUDIO = "Bodies and Pilates in North Hollywood";

export const MEDIA = {
  // Studio
  studioBrightRows: photo("studio-wide-bright-reformer-rows.jpg", `Bright reformer studio with rows of reformers at ${STUDIO}`),
  studioEmptyRoom: photo("studio-wide-empty-room.jpg", `Empty reformer studio ready for class at ${STUDIO}`),
  studioLogoWall: photo("studio-wide-logo-wall.jpg", `Reformer studio and the Bodies and Pilates logo wall in North Hollywood`),
  studioReformersBoxes: photo("studio-wide-reformers-and-boxes.jpg", `Reformers with sitting boxes set up at ${STUDIO}`),
  studioLogoWallChair: photo("studio-logo-wall-chair-interior.jpg", `Pilates chair in front of the logo wall at ${STUDIO}`),
  studioTour: video("studio-tour-logo-wall-video.mp4", `Walk through the reformer studio at ${STUDIO}`),
  clientsArriving: video("clients-arriving-studio-entrance.mp4", `Clients arriving at the studio entrance of ${STUDIO}`),

  // Group classes
  classPlankWide: photo("group-class-plank-wide.jpg", `Small-group reformer Pilates class holding a plank at ${STUDIO}`),
  classPlankRow: photo("group-class-plank-row.jpg", `Row of clients in a plank on the reformers during a group class at ${STUDIO}`),
  classKneelingLegPress: photo("group-class-kneeling-leg-press.jpg", `Clients kneeling on the reformers for leg work during a group class at ${STUDIO}`),
  classMoodyBacklit: video("group-class-moody-backlit.mp4", `Backlit group reformer Pilates class at ${STUDIO}`, "group-class-plank-row.jpg"),
  classLungeInSync: video("group-class-lunge-in-sync.mp4", `Group class lunging on the reformers in sync at ${STUDIO}`),
  classStandingWork: video("group-class-standing-work-video.mp4", `Standing work on the reformers during a group class at ${STUDIO}`),
  partnerSideStretch: video("partner-side-stretch-window-light.mp4", `Side stretch on the reformer in window light at ${STUDIO}`),

  // Exercise and detail
  standingSplit: photo("standing-split-reformer-logo-wall.jpg", `Standing split on the reformer in front of the logo wall at ${STUDIO}`),
  mermaidStretch: photo("mermaid-stretch-on-reformer.jpg", `Mermaid side stretch on the reformer at ${STUDIO}`),
  supineBridge: photo("supine-bridge-with-band.jpg", `Bridge on the reformer with a resistance band at ${STUDIO}`),
  legsInStraps: video("first-person-legs-in-straps.mp4", `First-person view of legs in the reformer straps at ${STUDIO}`),
  springsCloseUp: video("reformer-springs-close-up.mp4", `Close-up of reformer springs at ${STUDIO}`),
  boxAbs: video("reformer-box-abs-close-up.mp4", `Close-up of ab work on the reformer box at ${STUDIO}`),
  artisticPose: photo("artistic-black-and-white-reformer-pose.jpg", `Black and white photo of a Pilates pose on the reformer at ${STUDIO}`),

  // Private and duets
  privateRingLandscape: video(
    "private-coaching-with-ring-landscape.mp4",
    `Instructor coaching a private client with a Pilates ring at ${STUDIO}`,
    "studio-wide-logo-wall.jpg"
  ),
  privateKneelingAssist: video("private-hands-on-assist-kneeling.mp4", `Hands-on assist during a kneeling exercise in a private session at ${STUDIO}`),
  privateChairAssist: video("private-assisting-client-on-chair.mp4", `Instructor assisting a client on the Pilates chair at ${STUDIO}`),
  privateShoulderAssist: video("private-hands-on-shoulder-assist.mp4", `Hands-on shoulder assist during a private session at ${STUDIO}`),
  duetOnChair: photo("duet-two-clients-on-chair.jpg", `Two clients seated on Pilates chairs for a duet session at ${STUDIO}`),

  // Brand and details
  receptionWall: photo("reception-good-day-wall.jpg", `Reception wall reading "It's a good day to do Pilates" at ${STUDIO}`),
  entryBench: photo("entry-bench-patent-drawings.jpg", `Entry bench and Pilates patent drawings at ${STUDIO}`),
  gripSocksFlatLay: photo("flat-lay-grip-socks-and-essentials.jpg", `Flat lay of grip socks and class essentials on a reformer at ${STUDIO}`),
  logoMedallion: video("logo-medallion-close-up.mp4", `Close-up of the Bodies and Pilates logo medallion`, "studio-wide-logo-wall.jpg"),
  matchaCup: photo("branded-matcha-cup-logo.jpg", `Matcha in a Bodies and Pilates branded cup`),
  sunglassesPose: photo("social-sunglasses-pose-on-reformer.jpg", `Client posing on the reformer in sunglasses at ${STUDIO}`),

  // Naira Sarkian, owner-confirmed
  nairaMain: photo("instructor-portrait-with-ball-taupe-set.jpg", "Naira Sarkian, founder and owner of Bodies and Pilates in North Hollywood"),
  nairaSecondary: photo("instructor-portrait-standing-on-chair.jpg", "Naira Sarkian, founder and owner of Bodies and Pilates in North Hollywood"),
  nairaThird: photo("naira-sarkian-standing-chair-back.jpg", "Naira Sarkian, founder and owner of Bodies and Pilates in North Hollywood"),

  // Instructors, owner-confirmed
  sitaHeadshot: photo("instructor-headshot-black-tee.jpg", "Sita Acevedo, instructor at Bodies and Pilates in North Hollywood"),
  theresiaHeadshot: photo("instructor-headshot-black-cami.jpg", "Theresia Bunch, instructor at Bodies and Pilates in North Hollywood"),
  hannahHeadshot: photo("instructor-headshot-one-shoulder-top.jpg", "Hannah Pink, instructor at Bodies and Pilates in North Hollywood"),
} as const;

/**
 * The old Wix site's stock photos (not of this studio), self-hosted. Owner
 * decision, October 21, 2026: used only in the slots the old site used them,
 * the Home class cards for Beginner, Flexibility and Fullbody, the Home
 * reviews photo, and the Pricing, FAQs and Booking banners. Alt text
 * describes the frame and does not present it as the studio.
 */
export const STOCK = {
  groupSideBend: photo("stock-group-side-bend-on-reformers.jpg", "Group doing a side bend on Pilates reformers"),
  groupLegStraps: photo("stock-group-leg-straps-on-reformers.jpg", "Group lying on Pilates reformers with their legs in the straps"),
  lungeOnReformer: photo("stock-lunge-on-reformer.jpg", "Woman in a standing lunge on a Pilates reformer"),
  yogaStandingPose: photo("stock-yoga-standing-pose.jpg", "Woman in a standing yoga pose with her arms outstretched"),
} as const;

/** Default Open Graph / social share image: 1200x630 crop of the home hero. */
export const SHARE_IMAGE = manifest.og
  ? { url: manifest.og, width: 1200, height: 630, alt: MEDIA.classPlankWide?.alt ?? "Bodies and Pilates" }
  : null;
