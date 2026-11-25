# Handoff: branch `3d-scroll` (Nov 25, 2026)

Everything here is on `origin/3d-scroll`. Nothing is merged into `main` (the
live site deploys only from `main`, via `.github/workflows/deploy-pages.yml`).

## What's on the branch

- **Features page** in the order of a worker's week (Booking, Charge, Invoicing,
  Income, Business, Paychecks, Organization, Voice) with "Say it" mic chips.
- **The Features journey** (`docs/features-journey.md`): twelve generated clips
  play behind the page as one scroll-driven scene
  (`components/features/scene/journey-scene.tsx`, clips in
  `public/media/journey/`). Pieces of the real screenshots morph into the scene
  with a pause each; once a piece lands, its phone steps aside and the text
  recentres (desktop). The journey plays once, scrolling down from the top;
  arriving by a section link, or after it has played through, the page is the
  plain page for the rest of the visit.
- **08 / Voice on Features** is the "Just say it" sticky stage
  (`components/features/voice-section.tsx`). It is no longer on the homepage.
- **Homepage**: the 3D effects on the screens were removed (stream tiles float
  in flat; hero phone, Get paid and cards are flat). Security fold-up and
  Pricing fan are still 3D. Sections: 01 Get paid, 02 Security, 03 Pricing.

## Where the raw files are

`work/` is git-ignored, so it is **not** in the repo: `work/journey/` (frames
F0–F14, every take, `*.json` positions) and `work/phone/`. Copy that folder by
hand if a new machine needs it. The final encodes the site uses are committed
in `public/media/journey/`.

Prompts used for the journey: `docs/features-journey-prompts.md` (needs an
update to match what was made: merged clips, the charcoal Paid tile, the
Payment streams ending).

## Next: the rocking phone for the homepage (ElevenLabs)

Plan: generate a phone with a **pure green screen**, track the screen's corners
in every frame, and place the real app screen on it, so the UI stays sharp.
One rocking clip can carry the hero screen and the three Get paid screens.
Files go in `work/phone/`. Label exclusion lists "Avoid".

**P0, the phone facing straight at you** (image, 16:9, 2K), save as `P0.png`:
> Cinematic photoreal 3D product render of a modern smartphone with no logos or branding, floating at the center of a seamless, softly lit dark charcoal background (#161B1E) that is perfectly plain, with no floor, horizon or spotlight. The phone stands upright and faces the camera perfectly straight on, its screen exactly parallel to the viewer, not turned or tilted at all. A slim brushed graphite metal frame with rounded corners and a thin black bezel. Its screen is completely filled with flat, evenly lit pure green (#00FF00), with no reflections, no glare and no interface. Soft studio light from the upper left, with a faint emerald-green rim light along the frame. The phone fills about 70% of the frame's height. Calm, premium, sharp focus.

Avoid:
> turned, angled, tilted, perspective, text, letters, numbers, logos, Apple logo, notch, interface, icons, reflections on the screen, glare, hands, people, floor, horizon, spotlight, extra objects

**C-rock, the gentle rock** (clip, 1080p, 6 s), start frame and end frame both `P0.png`:
> Cinematic photoreal 3D render on a plain dark charcoal background. Locked camera. The phone starts facing the camera straight on, then gently rocks: it slowly turns about 15 degrees to the right so its left edge and thickness catch the light, eases back through center, turns about 15 degrees to the left so its right edge and thickness show, and returns to facing the camera straight on. A slight soft rise and fall as it moves. The screen stays flat, evenly lit pure green the whole time. Smooth, calm and unhurried, ending exactly on the end frame.

Avoid:
> text, logos, interface, reflections on the screen, glare, screen changing color, hands, people, camera movement, zoom, pan, cuts, flicker, warping, melting, extra objects, spinning all the way around

Check P0's green is clean and even before generating the clip.

## Before merging to `main`

- Check the Features journey on a real iPhone in Safari (video scrubbing).
- Voice and Siri content waits until the app's voice build is in the App Store.
- Dev server tip: if new CSS doesn't show, `rm -rf .next` and restart.
