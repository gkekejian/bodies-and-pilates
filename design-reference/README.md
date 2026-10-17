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
