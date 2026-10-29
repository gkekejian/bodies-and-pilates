# Design reference

- `old-site/`: the owner's screenshot set of the old Wix site (October 16, 2026) and its
  `README-design-reference.md`. This is the design ground truth for the restyle.
  The old footer's personal phone number has been painted out of five screenshots
  (`home-5-friends-footer`, `home-social-footer`, `pricing-3-bottom`, `booking-2-bottom`,
  `faqs-footer`). The only number the site uses is 818-813-4446.
- `restyle-2026-10-16/before` and `/after`: full-page captures of every sitemap URL before
  the restyle (35 URLs, master before PR #7) and after it (32 URLs, recaptured after PR #8
  was refreshed onto the post-PR #7 master), at 1440px (scaled to 640px wide) and 390px (scaled to 312px wide).
  The MindBody widget, maps and video are blocked in the capture sandbox, so those areas
  render empty in both sets. The fixed mobile booking bar can show mid-page in full-page
  captures; on a phone it sits at the bottom of the screen.

## Restyle decisions

- Tokens: every palette color is a CSS variable in `app/globals.css` (`--bp-*`), read by
  `tailwind.config.ts`. Fonts are `--font-display` (Fraunces), `--font-accent` (Libre
  Baskerville), `--font-sans` (Montserrat), `--font-light` (Poppins).
- Display font: Fraunces, not The Seasons. The Seasons is a commercial face with no web
  license on file, and the old site's CSS already uses Fraunces as its working serif.
  Fraunces is loaded with its optical-size axis so large titles get the high-contrast cut.
- Only the display serif is preloaded. All four families use `font-display: swap`.
- `pr-flexibility-*.jpg` and `pr-post-*.jpg` in both sets are copies of the `/classes/flexibility`
  and `/blog/what-is-reformer-pilates` captures under shorter names. GitHub rewrites the
  original file names inside PR descriptions, so the PR table links these copies.

## Theme palette pass (2026-10-20)

- The Wix editor's theme palette replaces the sampled colors: `--theme-*` in
  `app/globals.css` (#FFFFFF, #534745, #CCAE93, #A2876E, #EBD0B7, #FFFCF0), no sage. The
  scale names the components use (`cream-*`, `brown-*`, `tan-300`) map onto it.
- `--font-accent` is now Times New Roman, the old theme's paragraph font, a system font with
  nothing to download. Fraunces is pinned at optical size 120, display headlines semibold.
- Captures and old-vs-new pairs: `theme-2026-10-20/`.

## Homepage redesign, FAQ edits and SEO pass (2026-10-28)

- `homepage-2026-10-28/pairs/h*-{1440,390}.jpg`: the current homepage (master after PR #14) beside
  the new one, section by section: hero, welcome, services (new, no counterpart), classes,
  space and practice, the video strip (removed), and the rest (reviews, friends, footer). Video
  is blocked in these captures, so the hero shows its poster. File names stay under 18
  characters because longer image names in PR descriptions get escaped.
- `homepage-2026-10-28/pairs/faq-*.jpg`: the `/faq` entries Part B changed, opened (pregnancy and
  equipment), and the spot where "How much does Pilates cost in North Hollywood?" was removed.
- `homepage-2026-10-28/new/`: full-page captures of the new homepage (1440 scaled to 640 wide,
  390 scaled to 312 wide) and `video-*.jpg`, two frames of the hero with the studio video playing
  at each width.
- Hero video: the owners' `hero-video-studio-original.mp4` (53.5 s, 1,605 frames), encoded uncut
  and muted by `scripts/encode_hero_video.sh` to 1280x720 and 640x360 in WebM and MP4. The
  poster is the owners' `hero-poster.jpg`. The section stills (`class-in-session-window-light`,
  `instructor-hands-on-correction`, `instructor-cueing-class-with-mic`) are frames of that video.

## Hero video fix (2026-10-29)

- `hero-fix-2026-10-29/hero-{390,1440}.jpg`: the hero with the video playing at 26 s, before
  (left, PR #15: 640 and 1280 renditions, 640px-tall portrait hero) and after (right: 1080 and
  1920 renditions, portrait hero capped at min(80svh, 28rem)).
