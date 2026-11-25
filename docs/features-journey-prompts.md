# Features journey: ElevenLabs prompts

The background scene behind the Features page: 14 short clips that flow into
each other. One object carries the story. The Booking appointment becomes a
glass card, the card becomes the QR, the QR flips to Paid, Paid becomes the
Invoices screen, the invoice folds into a plane, and so on down the page.

Files live in `work/journey/` (git-ignored). Status as of Nov 24, 2026:
**S0, F0, F1, C1, F2 done**; next is C2.

## How it works

- **Each clip runs from one frame to the next.** Its start frame is the frame
  before it; its end frame is the frame after.
- **Each frame is made from the frame before it** (image edit with the previous
  frame as the reference), so the studio, light and camera never change.
- **Some frames are composited by Claude** instead of generated: wherever the
  video picks something up from a real screenshot on the page (the Sample Client
  box, the QR, the Invoices screen), the exact element is placed onto the frame
  so the hand-off on the site is seamless. Their positions are saved next to them
  (`F0-bar.json`, `F2-qr.json`, …).
- **Length:** the visitor's scroll sets the speed on the page, so a clip's length
  only decides how many frames it has. **4 seconds for one move, 6 seconds for a
  clip with several steps.** Longer clips tend to drift or pause.
- **Every clip:** Veo 3.1 (not Fast), 16:9, 1080p, audio off, prompt enhancement
  off, start and end frame. 2–3 takes; Claude checks each frame by frame.
- **Every image:** 16:9, 2K.
- **No words in the video.** "Sample Client", "Paid", "One ledger", the amounts
  and the invoice details are real text laid over it on the site. The QR is a
  real code in the app's style that points to https://the521app.com (never a
  live payment link).

| Clip | From → to | Length | Frames made by |
|---|---|---|---|
| C1 | Appointment bar → glass card | 4 s | F0 Claude (composite), F1 you |
| C2 | Glass card → QR card | 4 s | F2 Claude (composite on your F2a) |
| C3 | QR lifts and extrudes | 4 s | F3 you |
| C4 | Flip to Paid | 4 s | F4 you |
| C5 | Paid → Invoices screen | 4 s | F5 Claude (composite) |
| C6 | Invoice #0007 opens | 4 s | F6 you |
| C7 | Stamped Paid | 4 s | F7 you |
| C8 | Folds into a paper plane | 6 s | F8 you |
| C9 | The flight | 4 s | F9 you |
| C10 | Dust → streams → one ledger | 6 s | F10 you |
| C11 | The city rises | 6 s | F11 you |
| C12 | Paystub → second district | 6 s | F12 you |
| C13 | One city | 4 s | F13 you |
| C14 | The voice orb | 4 s | F14 you |

### Prompts used everywhere

**STYLE** (start of every frame prompt that has an object in it)
> Cinematic photoreal 3D product render in the same dark charcoal studio as the reference (#12171A, fading to near-black at the edges, no visible walls or horizon), with the same soft light from the upper left, the same subtle emerald-green (#2FA866) rim light, the same faint glossy floor and the same camera. Calm, premium, shallow depth of field, gentle film grain.

**CLIP STYLE** (start of every clip prompt)
> Cinematic photoreal 3D render in a dark charcoal studio with soft light from the upper left and a subtle emerald-green rim light. Locked camera.

**AVOID, frames**
> text, letters, numbers, words, logos, watermarks, labels, people, hands, extra objects, bright background, clutter

**AVOID, clips**
> text, letters, numbers, words, logos, watermarks, people, hands, fingers, camera movement, zoom, pan, dolly, cuts, scene change, flicker, strobing, sparkle, lens flare, warping, melting, extra objects

---

## Done

**S0, empty studio** (text to image)
> Cinematic photoreal render of an empty dark photography studio. Deep charcoal-slate backdrop (#12171A) that fades to near-black at the edges, seamless, with no visible walls, corners or horizon. A soft beam of light falls from the upper left onto a faint, glossy dark floor, leaving a gentle pool of light at the center of the frame. A very subtle emerald-green (#2FA866) glow at the edge of the light. Calm, premium, keynote-style lighting, gentle film grain. The space is completely empty.

**F0** (Claude): S0 with the Sample Client appointment as a plain green bar at the center, in its real shape and color (`F0-bar.json`).

**F1, the appointment made real** (from F0)
> [STYLE] The flat green bar becomes a solid slab of emerald-green glass (#2FA866) with the same width and the same rounded-rectangle outline, now about one-fifth as deep as it is tall. It is turned about 15 degrees to the left and tilted slightly toward the camera so its thickness and rounded edges show. The glass is smooth and slightly translucent, lit softly from within, with a crisp highlight along its top edge and a soft green reflection on the floor below. Its front face is plain and empty.

**C1 (F0 → F1), 4 s.** Kept take: the card tumbles once before settling (`C1.mp4`).
> [CLIP STYLE] The flat green bar at the center lifts gently and grows real depth, becoming a slab of emerald-green glass with rounded edges. It turns slowly about 15 degrees to the left as light glides across its surface, and settles floating with a soft green reflection on the floor. One continuous motion, ending exactly on the end frame.

**F2a, the blank QR card** (from F1)
> [STYLE] The green glass slab is gone. In the same spot at the center floats a square card of warm off-white (#ECEBE6) with gently rounded corners and the same slim thickness, standing upright and facing the camera straight on, not tilted. Its front face is completely plain and evenly lit, with a thin emerald-green edge catching the rim light, and a soft reflection on the floor below.

**F2** (Claude): F2a with the QR (to https://the521app.com) on its face (`F2-qr.json`).

---

## Next

## C2 Booking → Charge: the card becomes the QR (4 s)
On the site: "Show QR" is pressed on the real Charge screen.

**C2 (F1 → F2)**
> [CLIP STYLE] The emerald-green glass slab turns smoothly to face the camera straight on while it grows taller into a square card, its green glass clearing to warm off-white as a QR code fades up on its face. Steady and graceful, ending exactly on the end frame.

## C3 Charge: the QR comes off the page (4 s)

**F3, the QR in 3D** (from F2)
> [STYLE] The same off-white QR card, now raised toward the camera and tilted back about 10 degrees, its dark squares extruded into small solid 3D blocks of slightly different heights that catch the key light, casting tiny shadows on the card. The QR pattern is unchanged, only lifted into relief.

**C3 (F2 → F3)**
> [CLIP STYLE] The QR card lifts toward the camera and tilts back slightly while its dark squares rise out of the surface into small 3D blocks, a few at a time, like the code becoming three-dimensional. Ending exactly on the end frame.

## C4 Charge: it flips to Paid (4 s)

**F4, Paid** (from F3)
> [STYLE] In the same place stands a card of the same size and thickness, facing the camera straight on, now glossy emerald green on this side, with a softly embossed white checkmark in its upper center and plain space below it.

**C4 (F3 → F4)**
> [CLIP STYLE] The QR card turns over once around its vertical axis in a smooth 180-degree flip, its 3D blocks settling flat as it turns, revealing a glossy emerald-green back with an embossed white checkmark. One clean flip with a gentle settle, ending exactly on the end frame.

On the site: "Paid · $45.00 + $9.00 tip" is laid over the plain space.

## C5 Charge → Invoicing: Paid becomes the Invoices screen (4 s)

**F5** (Claude): the real Invoices screen from the site, placed at the center as a floating dark glass panel in the same studio. Its "Client #0007 · Emailed Oct 19" row is where C6 picks up.

**C5 (F4 → F5)**
> [CLIP STYLE] The green card stretches smoothly taller into a dark glass panel the shape of a phone screen, its green draining to dark as the rows of a list fade up on its face. Ending exactly on the end frame.

## C6 Invoicing: the invoice opens (4 s)
On the site: the #0007 row on the real Invoices screenshot is tapped just before this clip.

**F6, the invoice** (from F5)
> [STYLE] The glass panel is gone. At the center floats an upright sheet of warm off-white paper, facing the camera and turned slightly, with faint grey lines where writing would be and a thin rule near the bottom. No legible writing.

**C6 (F5 → F6)**
> [CLIP STYLE] The bottom row of the list lifts out of the glass panel toward the camera and unfolds into an upright sheet of warm off-white paper with faint grey lines, while the panel behind it fades away. Ending exactly on the end frame.

On the site: the invoice's details are laid over the paper (#0007, emailed Oct 19, the client, the lines and the total).

## C7 Invoicing: stamped Paid (4 s)

**F7, stamped** (from F6)
> [STYLE] The same sheet of paper, now with a crisp rectangular emerald-green stamp mark pressed onto its lower right, slightly rotated, with a rough ink texture and an empty center.

**C7 (F6 → F7)**
> [CLIP STYLE] An emerald-green rubber stamp comes down from above the frame, presses onto the lower right of the paper with a small bounce, and lifts away out of frame, leaving a crisp rectangular green stamp mark. Ending exactly on the end frame.

On the site: "PAID" is laid inside the stamp mark.

## C8 Invoicing: it folds into a paper plane (6 s)

**F8, the plane** (from F7)
> [STYLE] At the center hovers a neatly folded paper airplane made from the same off-white paper, a small green stamp mark visible on one wing, pointing to the right and slightly down.

**C8 (F7 → F8)**
> [CLIP STYLE] The sheet of paper folds itself crease by crease, each fold clear and deliberate (in half, the two top corners, then the wings), into a classic paper airplane that settles hovering at the center, pointing right. Ending exactly on the end frame.

## C9 Invoicing → Income: the flight (4 s)

**F9, above the streams** (from F8)
> [STYLE] The paper airplane hovers low at the center, just above a neat horizontal row of eight small rounded frosted-glass tiles resting on the glossy floor. A thin luminous green trail curves down behind it from the upper right.

**C9 (F8 → F9)**
> [CLIP STYLE] The paper airplane glides in a gentle descending curve across the frame, leaving a thin luminous green trail that stays visible, and comes to hover low at the center just above a row of eight small frosted-glass tiles that fade up on the floor. Smooth and unhurried, ending exactly on the end frame.

On the site: the eight payment chips on the page light up as the plane arrives.

## C10 Income: dust, streams, one ledger (6 s)

**F10, one ledger** (from F9)
> [STYLE] The paper airplane is gone. The eight frosted-glass tiles each glow green, and eight thin ribbons of green light rise from them and braid together above into one glowing, rounded slab floating at the center.

**C10 (F9 → F10)**
> [CLIP STYLE] The paper airplane dissolves into fine glowing dust that drifts down and settles into the eight glass tiles, which light up green one by one. Thin ribbons of green light then rise from each tile and braid together above into one glowing rounded slab. Ending exactly on the end frame.

On the site: "One ledger · $3,482.17" is laid over the slab.

## C11 Business: the city rises (6 s)

**F11, the year as a city** (from F10)
> [STYLE] The tiles, ribbons and slab are gone. On the glossy floor at the center stands a row of twelve emerald-green glass towers, their heights rising unevenly from left to right, like a bar chart of a growing year, catching the rim light.

**C11 (F10 → F11)**
> [CLIP STYLE] The glowing slab sinks smoothly into the glossy floor as the tiles and ribbons fade, and twelve emerald-green glass towers rise out of the floor one after another from left to right, their heights increasing unevenly. Ending exactly on the end frame.

## C12 Paychecks: the second district (6 s)

**F12, two districts** (from F11)
> [STYLE] The twelve green glass towers now stand on the left, and on the right stands a second group of twelve pale frosted-white towers of steady, even heights, with a small gap between the two groups.

**C12 (F11 → F12)**
> [CLIP STYLE] Above the green towers, a stack of six thin translucent sheets floats in, spreads apart in layers, then snaps back together into one. Its top layer turns bright green, glides down to the right, and touches the floor, where twelve pale frosted-white towers rise in a row beside the green ones as the green city slides a little to the left. Ending exactly on the end frame.

## C13 Organization: one city (4 s)

**F13, one city** (from F12)
> [STYLE] The green towers and the pale towers now stand together as one continuous city across the center, with no gap between them, lit by the same light.

**C13 (F12 → F13)**
> [CLIP STYLE] The two groups of towers slide smoothly toward each other and close the gap, becoming one continuous city. Slow and satisfying, ending exactly on the end frame.

On the site: "This month, together · $5,024.17" is laid over the city.

## C14 Voice: the city becomes a voice orb (4 s)

**F14, the voice orb** (from F13)
> [STYLE] The city is gone. At the center floats a glowing emerald-green glass sphere with soft concentric ripples of light moving across its surface like a sound wave.

**C14 (F13 → F14)**
> [CLIP STYLE] The towers gently draw together into the center and condense into a glowing emerald-green glass sphere whose surface ripples softly like a sound wave. Ending exactly on the end frame.

(Our own voice orb, not Apple's Siri icon, which is Apple's trademark.)

---

## Before keeping a take

- Its first and last frames match the frames it was given.
- The camera never moves, nothing melts, and nothing new pops in.
- Fine detail (the QR, the stamp mark) stays crisp and doesn't flicker; if it smears in 4 s, retry that clip at 6 s.
