# Media, loading and SEO rules

Taken from `~/sites-engine` (its `CLAUDE.md` "Design" rules, `LESSONS.md`, `scripts/validate.mjs`,
`scripts/qa.mjs` and `src/lib/seo.ts`) and applied to this site. Follow them for anything new.

## Budgets (slow 4G phone, 4× slower CPU, 390×844)

| What | Target | Fails at |
|---|---|---|
| Main content shows (LCP) | under 2.5 s | 4 s |
| Layout shift (CLS) | under 0.1 | 0.25 |
| Page JavaScript, gzipped | under 300 KB | |
| Loaded before the first scroll | under 3.5 MB | |
| A photo | under 350 KB | |
| A clip | 720p under 3 MB, 1080p under 6 MB; poster under 300 KB | |

Measured Nov 25 2026 after these changes: Home 1.0 s, Features 0.9 s, Support and Privacy 0.9 s;
layout shift ≤ 0.002 everywhere; JavaScript 232–250 KB; ~400–515 KB loaded up front.

## Loading

- Nothing far down the page loads up front. Images are `loading="lazy"`; clips and their posters
  get their address only when they're near (the swaying phone: a screen and a half away).
- Nothing that appears on its own after load may become the page's largest paint: Chrome counts
  it until the visitor's first scroll, tap or key. So the promo popup opens on the first
  interaction, and the Features journey loads its clips on the first interaction (a hidden or
  transparent video still counts).
- Every file in `public/media` and `public/images` is addressed with its fingerprint
  (`media("/media/…")` from `lib/media.ts`; `scripts/media-versions.mjs` runs before every build
  and dev). Replace a file under the same name and its address changes, so no cache shows the old
  one. Never hard-code `/media/…` or `/images/app/…` in a component.
- Screenshots ship as 720px WebP with a 360px twin and a `srcset`; give every `<img>` its width
  and height.
- The page colour is inline in `<head>` so nothing flashes white before the stylesheet; fonts
  come from `next/font`, which preloads them.
- Clips that play by themselves need a plan for iPhone Low Power Mode, which refuses autoplay
  (the swaying phone falls back to a CSS rock of a cut-out still).

## Search and sharing

- Every page's metadata goes through `pageMetadata()` in `lib/seo.ts`: a title under ~60
  characters, a description of 120–160 that says what the page is, its own canonical address
  (with the trailing slash the export uses), and share cards that name that page.
- Pages search shouldn't list (log in, sign up, checkout) pass `index: false`.
- Structured data: the app (`SoftwareApplication`, root layout) and the Support questions
  (`FAQPage`, from `lib/support-faqs.ts`).
- `sitemap.xml`, `robots.txt` and `llms.txt` (a Markdown summary for AI tools) are generated at
  build; add a new public page to `app/sitemap.ts` and `app/llms.txt/route.ts`.
- Never invent facts in descriptions, structured data or `llms.txt`: say only what the site says.
