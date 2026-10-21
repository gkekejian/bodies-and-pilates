# Old Site Hero Video: Implementation Notes

Files in this package:
- hero-video-original.mov: the old homepage hero video, downloaded from the Wix Media Manager (original file name: pilates-fitness-trainer-doing-back-strengthening-e-2023-11-27-04-59-47-utc.mov). H.264, 1920x1080, 19 seconds, 24.3 MB. Note: like the class-card photos, this is a stock clip, not footage of the studio. The owners have chosen fidelity to the old site.
- hero-poster.jpg: frame at 5 seconds. Use as the video poster and the mobile / reduced-motion fallback.
- frame-11s.jpg: alternate frame at 11 seconds, if a clearer profile is preferred.

How the old site presented it (from the Wix editor's own settings):
- Hero background is this video, set to play in a loop at normal speed.
- Video opacity 25, with "Color behind video" at 90: in practice the footage sits faintly over a dark backing, producing the muted wash visible in the home-1-hero.png capture. Reproduce that wash with the dark overlay treatment used elsewhere in the restore, so the white headline and outlined button stay legible.
- Headline "Empower Your Essense" centered in white Fraunces over it, round logo top-center over the media, nav top-right, thin outlined BOOK A SESSION button under the headline.

Implementation requirements:
- Compress the video for the web (MP4 and WebM renditions at a sane bitrate for a 19-second muted background loop; the 24 MB original is a master, not a deliverable). Keep the original file in the repo's design reference, not in the page payload.
- autoplay, muted, loop, playsInline. Poster = hero-poster.jpg. Respect prefers-reduced-motion (show the poster).
- The hero must not tank the speed checks: report the hero's weight and the Lighthouse result for / with the video in place, like every other change.
