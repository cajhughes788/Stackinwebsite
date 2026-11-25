# The Features journey

One object travels down the Features page and changes shape at each section.
The idea under all of it is the opener's: **many things come together into one**.
Agreed Nov 24, 2026; a first full pass is built (`components/features/journey/`), with edits to come.

## Section order

The page follows a worker's week: a client books, you get paid, the money
lands, you see what you made.

| # | Section | Why it's here |
|---|---|---|
| 01 | **Booking** | Where the money starts: a client books and pays a deposit. |
| 02 | **Charge** | They're in the chair, so you get paid on the spot. |
| 03 | **Invoicing** | Or they pay later. |
| 04 | **Income** | Every way you got paid lands in one ledger. |
| 05 | **Business** | Expenses come out, and you see real profit. |
| 06 | **Paychecks** | The W-2 side: what your day job really pays. |
| 07 | **Organization** | Both sides of your income, together. |
| 08 | **Voice** | Ask 521 and Siri / Action Button, short, linking to the homepage's "Just say it". |

People who only have a paycheck jump straight to 06 from the hero's "Features
for paychecks" link and the section nav. The homepage's Get paid tabs change to
match: Book · Charge · Invoice.

## The story

| Section | What happens as you scroll |
|---|---|
| **01 Booking** | A **calendar cube** turns through the week, one appointment per face (Mon cut, Tue full color, Wed beard trim…), and stops on **Thursday: Haircut, 2:00 PM**. |
| **→ 02 Charge** | The haircut is done. Thursday's face flies off the cube and sinks into the real Charge screen at $45. A QR card lifts off the glass toward you, flips, and becomes **Paid · $45 + $9 tip**. |
| **→ 03 Invoicing** | The next client pays later. The phone's screen peels off as a paper invoice; its lines and total write themselves; a green **PAID** stamp comes down with a small shake. The invoice folds itself in three readable creases into a **paper plane**. |
| **→ 04 Income** | The plane glides down and unravels into a ribbon of light. The other payments arrive as ribbons too: the eight chips (Bank deposits, Zelle, Venmo, Cash, Card, Apple Pay, Checks, POS) stretch into streams, braid together, and land in **one ledger**. |
| **→ 05 Business** | The ledger's monthly totals rise as the **12-month profit skyline**, the **Studio** district. The camera pulls back and glides across it, with a lit line tracing profit along the rooftops. |
| **→ 06 Paychecks** | A paystub flies in and floats apart in layers: gross pay at the back, then federal, state, Social Security, Medicare and 401(k). As you scroll, the layers snap together and **take-home** glows at the front. Its take-home columns build a second district beside the first: **Day job**. |
| **→ 07 Organization** | The camera rises; the two districts slide together into one city, and the total appears: **This month, together**. |

Example numbers stay consistent with the rest of the site: $45 + $9 tip
(Charge), $3,482.17 (Studio, the hero total), $1,542.00 (Day job, direct
deposit), $5,024.17 together, and this page's paystub (gross $3,068.16,
take-home $1,518.44).

## Voice

Each section gets a small **"Say it"** chip with a real sentence from the app's
voice test sheets. As the traveling object passes, the chip's words light up;
voice is never a beat of its own.

| Section | Say it |
|---|---|
| Booking | "Book Jenna Thursday at 2 for a cut" |
| Charge | none: voice never charges a card (the app's voice rules) |
| Invoicing | "Invoice Jenna Morales 120 for a cut and color, due Friday" |
| Income | "Made 270 today, worked 9 to 5" |
| Business | "Spent 42 on gas at Shell yesterday" |
| Paychecks | "9 to 5, 40 in card tips" |
| Organization | "Ask 521: how much did I make this week?" |

08 / Voice then covers Ask 521 and the Siri phrases ("Log my tips in 521",
"Add an expense in 521", "Book in 521", "Ask 521"; iOS 16 and later).

**Before publishing:** voice and Siri ship in the app's `invoicing` branch
(commit `f164e4e`). The site shows them only once that build is in the App Store.

## Rules

- Every change is driven by scroll, starting from the first pixel. No timers, no holds, no pinned stretch where nothing moves.
- The real app screenshots stay; the journey happens beside and in front of them, never in place of them.
- The section text stays normal HTML on top, readable at every moment.
- Phones and tablets (below 1024px) get the plain page, as with reduced motion: real screenshots on solid sections, no scene. Stacked, the scene could only play behind the cards, and iPhone Safari lags scrubbing it (recording, Nov 25 2026). Never scroll sideways.
- With reduced motion turned on, each section shows its finished picture (cube, Paid, paid invoice, ledger, skyline, paystub, total) with no travel.

## How it's built (Nov 25, 2026)

- **Twelve clips**, made in ElevenLabs from matched start and end frames
  (prompts: `docs/features-journey-prompts.md`; raw frames and takes in the
  git-ignored `work/journey/`). Where a clip lands on real text (the Invoices
  screen, invoice #0007, Payment streams), its last half-second crossfades
  into the exact frame, so the words are right.
- **Encodes** in `public/media/journey/`: `cN.mp4` (1280 wide) and `cN-m.mp4`
  (854 wide, phones), all-keyframe so any frame is one seek away. 10 MB and
  4.5 MB in total; each loads as its stretch of the page nears.
- **The scene**: `components/features/scene/journey-scene.tsx`, one fixed
  layer behind the Features page. Invisible `<SceneMark>`s in the sections
  decide where each clip runs (its `SEGMENTS` list); the scroll sets the
  frame. A shadow sweeps down between Income and Business while the scene
  changes behind it.
- **Hand-offs on the real screenshots**: a green ring on Sample Client
  (Booking), "Show QR" (Charge) and invoice #0007 (Invoicing), and the
  payment chips light up as the streams leave them (`data-scene-cue`).
- **Captions** in the scene: "One ledger", "Profit by month · last 12
  months", "This month, together · $5,024.17".
- **Readability**: the video plays at about half strength under a scrim,
  and each section heading gets a soft dark halo while it runs.
- **Phones** see a wider crop of the same scene from the lighter encodes.
  **Reduced motion**: no scene, solid section backgrounds.
- **Phone stills** (Nov 25, 2026): below 1024px the scene doesn't run; five
  sections show its finished picture instead (`JourneyStill` in
  `components/features/blocks.tsx`, 720-wide WebP in `public/images/journey/`,
  cut from each clip's last frame): Charge (Paid · $45 + $9 tip), Invoicing
  (the stamped invoice), Income ("One ledger"), Business ("Profit by month"),
  Organization ("This month, together · $5,024.17"). Booking and Paychecks
  have none: their clips' end frames say nothing without the motion.
- **Invoicing pan** (desktop): the text column stays put and the scene glides
  right during clip 4, so the Invoices screen lands where its phone was, beside
  the words; it glides back as the plane flies on to Income (`panAt`). The
  frame's side edges fade so the pan never shows where it ends.
- **The orb keeps swirling**: from the end of clip 12 its core
  (`orb-core.webp`, cut from the last frame) turns over the video, a fainter
  copy turning the other way, rim left to the video. The journey ends at the
  foot of the page (`scene-end` after the footer), so the orb stays behind Voice,
  the closing section and the footer.
