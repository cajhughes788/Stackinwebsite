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

### Redo, Nov 25 2026: a fold a real sheet could make (C8a + C8b)

The first C8 opened the sheet outward into panels as if it were printed on both
sides, piled on more paper than one sheet has, and drew "PAID" on several
panels. F8 stays: a real dart folded from this invoice puts the stamp (lower
right of the sheet) on top of one wing near its tail, the printed front inside
the body, and blank paper on the nose flaps. The fold is now two clips through a
new middle frame, F7a; the site joins them into one clip (`c6`).

Rules in every prompt below: the sheet is printed on the **front only**, so any
flap that folds over shows **blank** paper; it is **one thin sheet** that only
ever gets smaller as it folds; there is **one stamp**, which moves with its
corner of the paper.

**F7a, the corners folded** (Claude, built from F7: `work/journey/make_f7a.py`)
F7 with its two top corners folded forward and down to the vertical center line,
exact geometry: the point sits where the top edge's center was, the shoulders half
the sheet's width below it, the flaps show blank paper with the sheet's own light,
and the folded-away corners show the empty studio (S0). The rest of the invoice
and the one stamp are untouched. (A generated F7a, kept as `F7a-generated.png`,
grew a taller point than the sheet allows.)

**C8a (F7 → F7a), 4 s**
> [CLIP STYLE] A single sheet of thin off-white printer paper floats upright facing the camera. It is printed on its front only; its back is plain blank paper. With no hands, its two top corners fold, one after the other: the top-left corner folds forward and down until its edge lies along the vertical center line, then the top-right corner does the same and meets it there, making a pointed top like a house roof. Each corner turns over as it folds, so the triangle that ends up facing the camera is the blank back of the paper. The point is exactly where the middle of the top edge was; nothing rises above the sheet's original top edge. Creases are sharp and straight, the paper stays thin and never gets bigger, and the lower part of the sheet, with its single green stamp mark, stays flat and still. Slow, deliberate and smooth, ending exactly on the end frame.

Avoid:
> [AVOID, clips], the sheet opening outward, panels unfolding like doors, the sheet splitting, the sheet getting taller or wider, extra paper appearing, extra layers, thick paper, printing on the folded corners, printing on the back, second stamp, duplicate stamp, stamp moving, stamp changing shape, new text

**F7b, the edges folded** (Claude, built from F7a: `work/journey/make_f7b.py`)
Each slanted edge of the roof folded forward onto the center line. The crease runs
from the point at 22.5° off vertical and meets the side edge near the bottom, so the
sheet becomes a long narrow point; the flaps cover all but a small triangle of the
invoice at the bottom, and the stamp's lower right corner tucks under the right flap.

**F8, the plane, no stamp** (yours, Nov 25; `F8-nostamp.png`). In a standard dart
the half fold goes backward, so the corner flaps and the printed front stay outside
the body and end up under the wings: the wing tops are blank and the stamp is
underneath. (The first take, `C8b-take1.mp4`, made a real rocket point but bent the
sheet like a cone on the way, and the wings appeared without folding; hence F7b.)

**C8b (F7a → F7b), 4 s**
> [CLIP STYLE] The folded paper from the start frame floats upright facing the camera. With no hands, its two slanted top edges fold forward to the vertical center line, one after the other: the left one first, then the right. Each fold is a flat flap turning on a straight crease that runs from the top point down to the side edge near the bottom; the flap turns over toward the camera and lays flat on the front of the sheet, showing the blank back of the paper. Only the flaps move: the rest of the sheet stays flat and still, its bottom edge and bottom corners stay straight and square, and nothing curls, bends or rolls. The lower right corner of the green stamp mark slips under the right flap; there is still only one stamp. The paper stays one thin sheet and never gets bigger. Slow, deliberate and smooth, ending exactly on the end frame.

Avoid:
> [AVOID, clips], curling, rolling, bending, cone shape, rounded corners, bottom edge moving, the sheet getting taller or wider, extra paper appearing, extra layers, thick paper, printing on the flaps, second stamp, duplicate stamp, stamp moving, new text

**C8c (F7b → F8 no stamp), 6 s**
> [CLIP STYLE] The folded paper from the start frame becomes a classic dart paper airplane, with no hands, in three clear steps. First it folds in half along its vertical center line like closing a book: the left half swings back, away from the camera, behind the right half until the two halves lie together, leaving a flat narrow triangle with its point at the top. Second, it turns a quarter turn so its point faces right and it lies level, seen from the side: a flat narrow triangle with the fold along its bottom edge; its side shows the folded flaps and part of the green stamp. Third, the near side folds down and outward along a straight line parallel to the bottom fold, turning over to become the near wing and opening out level, and then the far side does the same to become the far wing; once the wings are down, their tops are plain blank paper and the stamp is underneath, out of sight. It is the same single sheet the whole time: the finished plane is as long as the sheet was tall and only a few paper layers thick, with crisp creases and thin paper edges, and it settles hovering at the center pointing right. Slow, deliberate and smooth, ending exactly on the end frame.

Avoid:
> [AVOID, clips], wings appearing without folding, wings growing out, twisting paper, curling, bending, extra paper appearing, extra layers, thick or puffy paper, cardboard, the plane bigger than the sheet, stamp on top of a wing, second stamp, duplicate stamp, invoice lines or numbers on the plane, new text, spinning, tumbling

Check before keeping. In each take,
step through the frames: one stamp in every frame, no frame where the sheet is
wider than it started, and no printing on a flap that has just turned over.

## C9 Invoicing → Income: the flight (4 s)

**F9, above the streams** (from F8)
> [STYLE] The paper airplane hovers low at the center, just above a neat horizontal row of eight small rounded frosted-glass tiles resting on the glossy floor. A thin luminous green trail curves down behind it from the upper right.

**C9 (F8 → F9)**
> [CLIP STYLE] The paper airplane glides in a gentle descending curve across the frame, leaving a thin luminous green trail that stays visible, and comes to hover low at the center just above a row of eight small frosted-glass tiles that fade up on the floor. Smooth and unhurried, ending exactly on the end frame.

On the site: the eight payment chips on the page light up as the plane arrives.

### Redo, Nov 25 2026: no stamp, and a real descent (F9 new + C9)

The old flight started and ended at the same height (plane centre y 322 in F8, 328 in
F9), so the generator climbed and looped to fill it. Now the end frame has the plane
lower, and the clip only ever goes down, at an even pace, so it descends as you
scroll. Edit F9 itself so the eight tiles keep their exact places (the site's
payment chips fly to them; `F9-pills.json`). C10 then needs regenerating from the
new F9 (its plane moves and loses the stamp); its prompt below is unchanged.

**F9 new** (image edit of F9, 16:9, 2K; save as `F9-nostamp.png`)
> [STYLE] Keep everything in the reference exactly the same: the studio, the light, the camera, and the row of eight small frosted-glass tiles on the floor in exactly the same positions and sizes. Change only the paper airplane and its trail. Remove the green stamp mark from the wing, so the airplane is plain blank paper everywhere. Move the airplane lower, so it hovers just above the middle of the row of tiles with its nose angled gently down toward them, the same size and shape as before. Replace the green trail with a thin luminous emerald-green trail that comes down from the upper middle of the frame in one smooth descending curve to the airplane's tail.

Avoid:
> stamp, green mark on the airplane, PAID, text, letters, numbers, moving the tiles, changing the tiles, extra tiles, extra airplanes, second trail, loops in the trail, hands, people, extra objects

**C9 (F8-nostamp → F9 new), 4 s**
> [CLIP STYLE] The paper airplane from the start frame, plain white paper with no markings, glides steadily downward in one smooth, continuous descending curve, nose tipping gently down, from its place at the center to hover just above a row of eight small frosted-glass tiles that fade up on the floor as it comes down. It only ever moves down and slightly forward, never rising, looping or circling back, at an even, unhurried speed, like a real paper plane gliding in to land. A thin luminous emerald-green trail draws itself behind it along the path it flew and stays visible. Ending exactly on the end frame.

Avoid:
> [AVOID, clips], climbing, rising, loops, circling, swooping up, sudden turns, speeding up, slowing down, stamp, green mark on the airplane, PAID, text on the airplane, the airplane changing shape, extra airplanes, tiles moving

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
