"use client";

import { useEffect, useRef } from "react";
import { media } from "@/lib/media";

// The Features journey (docs/features-journey.md): twelve generated clips
// (public/media/journey/c1–c12) that play behind the page as one scene,
// driven by the scroll. Clip n ends on the frame clip n+1 starts on, so the
// scene is continuous.
//
// Where each clip plays is set by invisible marks in the sections
// (<SceneMark name="…" />): a segment runs from its first mark reaching the
// middle of the screen to its second. Between Income and Business a shadow
// sweeps down and the scene changes behind it.
//
// The scene is tied to the page in three ways:
//   Morphs   a piece of a real screenshot (or a payment chip) lifts off the
//            page and flies to where that object sits in the scene, then
//            hands over to the video: the Sample Client appointment becomes
//            the green bar, the QR leaves the Charge phone, the Invoices and
//            Payment streams screens fly into the scene, the chips become
//            the glass pills. (MORPHS below; sources are
//            [data-morph-shot] wrappers in PhoneShot.)
//   Cues     [data-scene-cue="clip:from-to"] gets --cue 0→1→0 while that
//            clip is between those points (rings on the screenshots, chips).
//   Holds    [data-scene-hold="clip:at"] gets --hold 0→1 once the scene
//            passes that point (the Charge phone switching to its QR screen).
// Captions in the scene are placed in the clips' 1280×720 frame coordinates.
//
// Videos are all-keyframe encodes, so any frame is one seek away, and load
// ahead of the reader. With reduced motion there is no scene and the
// sections keep their solid backgrounds.

// A segment runs between two marks, or a stretch of that distance (a–b), and
// plays a clip from t0 to t1. A "hold" segment keeps its clip still on one
// frame while a morph hands a piece of the page over to it.
type Segment = { id: string; from: string; to: string; a?: number; b?: number; clip: number | "shadow"; t0?: number; t1?: number };

const SEGMENTS: Segment[] = [
  // The Sample Client appointment lifts off the booking screenshot into the scene.
  { id: "lift", from: "booking-lift", to: "booking-start", clip: 1, t0: 0, t1: 0 },
  { id: "c1", from: "booking-start", to: "booking-end", clip: 1 },
  // C2 plays in the first half; in the second the scene holds on the QR card
  // while the Charge phone's QR lifts off and settles onto it.
  { id: "c2", from: "booking-end", to: "charge-qr", b: 0.35, clip: 2 },
  { id: "h2", from: "booking-end", to: "charge-qr", a: 0.35, clip: 2, t0: 1, t1: 1 },
  { id: "c3", from: "charge-qr", to: "charge-end", clip: 3 },
  { id: "c4", from: "charge-end", to: "invoicing-row", b: 0.35, clip: 4 },
  { id: "h4", from: "charge-end", to: "invoicing-row", a: 0.35, clip: 4, t0: 1, t1: 1 },
  { id: "c5", from: "invoicing-row", to: "invoicing-end", clip: 5 },
  { id: "c6", from: "invoicing-end", to: "income-start", clip: 6 },
  { id: "c7", from: "income-start", to: "income-chips", b: 0.35, clip: 7 },
  { id: "h7", from: "income-start", to: "income-chips", a: 0.35, clip: 7, t0: 1, t1: 1 },
  { id: "c8", from: "income-chips", to: "income-phone", b: 0.5, clip: 8 },
  { id: "h8", from: "income-chips", to: "income-phone", a: 0.5, clip: 8, t0: 1, t1: 1 },
  { id: "shadow", from: "income-phone", to: "business-start", clip: "shadow" },
  { id: "c9", from: "business-start", to: "business-end", clip: 9 },
  { id: "hold10", from: "business-end", to: "paychecks-start", clip: 10, t0: 0, t1: 0 },
  { id: "c10", from: "paychecks-start", to: "paychecks-stub", clip: 10 },
  { id: "c11", from: "paychecks-stub", to: "organize-mid", clip: 11 },
  { id: "c12", from: "organize-mid", to: "voice-start", clip: 12 },
];
const CLIPS = 12;
const FRAME_W = 1280;
const FRAME_H = 720;

type Rect = [number, number, number, number];
type Morph = {
  /** The hold segment it plays in, and its stretch of it (0–1). */
  seg: string;
  t0: number;
  t1: number;
  /** A solid colour it turns into while it settles, to match the frame it lands on. */
  tint?: string;
  /** Where it starts: a [data-morph-shot] wrapper and the part of its image (percent), or the nth payment chip. */
  shot?: string;
  crop?: Rect;
  src?: string;
  chip?: number;
  /** Where it lands, in frame pixels (1280×720), and its corner radius there. */
  to: Rect;
  radius: number;
  /** Leave a hole where it lifted from (the shot's hole layer). */
  lift?: boolean;
  /** Once it has landed, its phone steps aside and the section's text closes in ([data-aside-grid]). */
  aside?: string;
  /** Fade the screenshot it came from over this stretch of its timeline (default PHONE_FADE). */
  fade?: [number, number];
  /** Fade the piece itself out over this stretch, for when what it lands on in the
   *  scene doesn't match it (the Charge QR is a different code), so the two never blur together. */
  out?: [number, number];
};

// Frame positions measured on the clips' own frames (work/journey/*.json).
const PILLS: Rect[] = [
  [270, 455, 72, 94], [367, 451, 71, 94], [463, 447, 71, 94], [559, 452, 71, 94],
  [655, 455, 71, 94], [751, 456, 71, 94], [847, 457, 70, 94], [943, 459, 70, 94],
];
const MORPHS: Morph[] = [
  { seg: "lift", t0: 0, t1: 1, shot: "booking", crop: [18.1, 81.1, 76.4, 12.3], src: "/images/app/booking.webp", to: [487, 327, 307, 67], radius: 7, lift: true, tint: "rgb(48, 168, 102)", fade: [0.14, 0.46] },
  { seg: "h2", t0: 0, t1: 1, shot: "charge", crop: [22.2, 35.9, 55.6, 50.9], src: "/images/app/charge-qr.webp", to: [481, 190, 318, 314], radius: 22, aside: "charge", out: [0.26, 0.42] },
  { seg: "h4", t0: 0, t1: 1, shot: "invoicing", crop: [0, 0, 100, 100], src: "/images/app/invoices.webp", to: [485, 155.8, 310, 382.3], radius: 18, aside: "invoicing" },
  ...PILLS.map((to, i): Morph => ({ seg: "h7", t0: i * 0.04, t1: 0.72 + i * 0.04, chip: i, to, radius: 34, tint: "rgb(30, 92, 62)" })),
  { seg: "h8", t0: 0, t1: 1, shot: "income", crop: [0, 0, 100, 100], src: "/images/app/payment-streams.webp", to: [564.5, 371.6, 149, 227.7], radius: 14, aside: "income" },
];
// A morph's own timeline (0–1): it lifts off the page, travels, settles on its
// spot in the frame (turning into the tint, if any), then melts into the video.
const LIFT = 0.16;
const FLY = 0.6;
const SETTLE = 0.76;
// The screenshot a piece leaves fades over this stretch of the piece's timeline.
const PHONE_FADE: [number, number] = [0, 0.42];
// How strongly the video shows (.journey-video.is-shown in globals.css).
const SCENE_STRENGTH = 0.55;

const clamp01 = (n: number) => Math.min(Math.max(n, 0), 1);
const range = (t: number, a: number, b: number) => clamp01((t - a) / (b - a || 1));
const ease = (t: number) => (t < 0.5 ? 4 * t * t * t : 1 - Math.pow(-2 * t + 2, 3) / 2);
const lerp = (a: number, b: number, t: number) => a + (b - a) * t;
const easeOut = (t: number) => 1 - Math.pow(1 - t, 3);

// Captions in the scene: real text where the video carries none.
const CAPTIONS = [
  // Beside the Payment streams phone, on the floor under each city.
  { at: "8:0.75-1", x: 840, y: 480, text: "One ledger" },
  { at: "9:0.7-1", x: 640, y: 610, text: "Profit by month · last 12 months" },
  { at: "11:0.6-1", x: 640, y: 610, text: "This month, together · $5,024.17", strong: true },
];

/** An invisible point on the page where a segment starts or ends (see SEGMENTS). */
export function SceneMark({ name, className = "" }: { name: string; className?: string }) {
  return <span aria-hidden="true" data-scene-mark={name} className={`pointer-events-none block h-0 w-0 ${className}`} />;
}

export function JourneyScene() {
  const layerRef = useRef<HTMLDivElement>(null);
  const frameRef = useRef<HTMLDivElement>(null);
  const shadowRef = useRef<HTMLDivElement>(null);
  const ghostLayerRef = useRef<HTMLDivElement>(null);
  const ghostSceneRef = useRef<HTMLDivElement>(null);
  const videoRefs = useRef<(HTMLVideoElement | null)[]>([]);

  useEffect(() => {
    const layer = layerRef.current;
    const frame = frameRef.current;
    const shadow = shadowRef.current;
    const ghostLayer = ghostLayerRef.current;
    const ghostScene = ghostSceneRef.current;
    if (!layer || !frame || !shadow || !ghostLayer || !ghostScene) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    const root = document.documentElement;
    // The journey plays once, for readers who scroll down from the top. Once
    // it has played through, or if they arrive at a section by its link
    // (#invoicing), the page is the plain page for the rest of the visit.
    let active = !window.location.hash || window.location.hash === "#";
    if (active) root.classList.add("scene-on");
    const small = window.matchMedia("(max-width: 767px)");
    const videos = videoRefs.current;

    /* ---- Marks: where each one sits on the page ---- */
    const markY = new Map<string, number>();
    const measure = () => {
      markY.clear();
      document.querySelectorAll<HTMLElement>("[data-scene-mark]").forEach((el) => {
        // A mark can exist twice, one per layout (phones / desktop); the hidden one doesn't count.
        if (!el.getClientRects().length) return;
        markY.set(el.dataset.sceneMark!, el.getBoundingClientRect().top + window.scrollY);
      });
      sizeFrame();
    };

    /* ---- The frame: cover the screen on wide screens; on phones, wide enough to keep the middle of every shot ---- */
    let box = { left: 0, top: 0, w: 0, h: 0 };
    const sizeFrame = () => {
      const vw = window.innerWidth;
      const vh = layer.clientHeight;
      const w = vw / vh < 1 ? vw * 1.6 : Math.max(vw, vh * (FRAME_W / FRAME_H));
      const h = w * (FRAME_H / FRAME_W);
      box = { left: (vw - w) / 2, top: (vh - h) / 2, w, h };
      frame.style.cssText = `left:${box.left}px;top:${box.top}px;width:${w}px;height:${h}px`;
    };
    const toScreen = (r: Rect) => {
      const k = box.w / FRAME_W;
      return { x: box.left + r[0] * k, y: box.top + r[1] * k, w: r[2] * k, h: r[3] * k, k };
    };

    /* ---- Videos: load ahead; seek without piling up seeks ---- */
    const loaded = new Set<number>();
    const load = (clip: number) => {
      if (clip < 1 || clip > CLIPS || loaded.has(clip)) return;
      const v = videos[clip - 1];
      if (!v) return;
      loaded.add(clip);
      v.src = media(`/media/journey/c${clip}${small.matches ? "-m" : ""}.mp4`);
      v.load();
      // iOS only lets a muted inline video seek after it has played once.
      v.play().then(() => v.pause()).catch(() => {});
    };
    // Once the scene is showing, fetch the rest ahead of the reader, one at a time.
    let prefetching = false;
    const prefetch = (from: number) => {
      prefetching = true;
      const next = () => {
        let c = from;
        while (c <= CLIPS && loaded.has(c)) c++;
        if (c > CLIPS) return;
        load(c);
        videos[c - 1]?.addEventListener("canplaythrough", next, { once: true });
      };
      next();
    };
    const want = new Map<HTMLVideoElement, number>();
    const seek = (v: HTMLVideoElement, t: number) => {
      want.set(v, t);
      if (v.seeking || !v.duration) return;
      const target = Math.min(t, v.duration - 0.04);
      if (Math.abs(v.currentTime - target) > 1 / 60) v.currentTime = target;
    };
    videos.forEach((v) => v?.addEventListener("seeked", () => { const t = want.get(v); if (t !== undefined) seek(v, t); }));
    videos.forEach((v) => v?.addEventListener("loadeddata", () => { const t = want.get(v); if (t !== undefined) seek(v, t); schedule(); }));

    /* ---- Cues, holds and captions ---- */
    const parseAt = (s: string) => {
      const [c, r] = s.split(":");
      const [a, b] = r.split("-").map(Number);
      return { clip: Number(c), a, b };
    };
    const cues = Array.from(document.querySelectorAll<HTMLElement>("[data-scene-cue]")).map((el) => ({ el, ...parseAt(el.dataset.sceneCue!) }));
    const holds = Array.from(document.querySelectorAll<HTMLElement>("[data-scene-hold]")).map((el) => ({ el, ...parseAt(el.dataset.sceneHold!) }));
    const caps = Array.from(layer.querySelectorAll<HTMLElement>("[data-scene-cap]")).map((el) => ({ el, ...parseAt(el.dataset.sceneCap!), x: Number(el.dataset.x), y: Number(el.dataset.y) }));
    // 0 → 1 over the first 25% of the window, 1 → 0 over the last 25%.
    const envelope = (p: number, a: number, b: number, holdEnd = false) => {
      if (p < a || p > b) return 0;
      const k = (p - a) / (b - a || 1);
      return Math.min(1, k / 0.25, holdEnd ? 1 : (1 - k) / 0.25);
    };

    /* ---- Morphs: one ghost element each, built from the page ---- */
    const chips = Array.from(document.querySelectorAll<HTMLElement>(".scene-chip"));
    const ghosts = MORPHS.map((m) => {
      const g = document.createElement("div");
      g.className = "morph-ghost";
      if (m.tint) {
        const tint = document.createElement("span");
        tint.className = "morph-tint";
        tint.style.background = m.tint;
        g.appendChild(tint);
      }
      if (m.chip !== undefined) {
        const chip = chips[m.chip];
        const label = document.createElement("span");
        label.className = "morph-label";
        label.textContent = chip?.textContent ?? "";
        g.appendChild(label);
        g.classList.add("morph-chip");
      } else if (m.src && m.crop) {
        const [, , cw, ch] = m.crop;
        g.style.backgroundImage = `url(${media(m.src)})`;
        g.style.backgroundSize = `${(100 / cw) * 100}% ${(100 / ch) * 100}%`;
        g.style.backgroundPosition = `${cw < 100 ? (m.crop[0] / (100 - cw)) * 100 : 0}% ${ch < 100 ? (m.crop[1] / (100 - ch)) * 100 : 0}%`;
      }
      ghostLayer.appendChild(g);
      return g;
    });
    const sourceRect = (m: Morph) => {
      if (m.chip !== undefined) {
        const r = chips[m.chip]?.getBoundingClientRect();
        return r ? { x: r.left, y: r.top, w: r.width, h: r.height, r: r.height / 2 } : null;
      }
      const el = document.querySelector<HTMLElement>(`[data-morph-shot="${m.shot}"]`);
      if (!el || !m.crop) return null;
      const r = el.getBoundingClientRect();
      const [cx, cy, cw, ch] = m.crop;
      return { x: r.left + (cx / 100) * r.width, y: r.top + (cy / 100) * r.height, w: (cw / 100) * r.width, h: (ch / 100) * r.height, r: Math.min(18, r.width * 0.04) };
    };

    /* ---- Step aside: as a phone fades (fadePhone, scroll-linked), the other
       columns each move toward it by half its width plus the gap, which centres them. */
    const setAside = (name: string, on: boolean) => {
      const grid = document.querySelector<HTMLElement>(`[data-aside-grid="${name}"]`);
      if (!grid || (grid.dataset.aside === "1") === on) return;
      grid.dataset.aside = on ? "1" : "0";
      const phone = grid.querySelector<HTMLElement>("[data-aside-phone]");
      if (!phone) return;
      const p = phone.getBoundingClientRect();
      const gap = parseFloat(getComputedStyle(grid).columnGap) || 0;
      // Two columns flanking the phone keep a little air between them.
      const cols = grid.querySelectorAll(":scope > .aside-col").length;
      const d = (phone.offsetWidth + gap) / 2 - (cols > 1 ? 32 : 0);
      grid.querySelectorAll<HTMLElement>(":scope > .aside-col").forEach((col) => {
        const c = col.getBoundingClientRect();
        col.style.setProperty("--aside-x", `${c.left + c.width / 2 < p.left ? d : -d}px`);
      });
    };
    // The phone a screenshot sits in: its step-aside wrapper, or the phone frame itself.
    const fadePhone = (shotName: string, gone: number) => {
      const shot = document.querySelector<HTMLElement>(`[data-morph-shot="${shotName}"]`);
      const phone = shot?.closest<HTMLElement>("[data-aside-phone]") ?? shot?.closest<HTMLElement>("figure");
      if (!phone) return;
      const o = (1 - gone).toFixed(3);
      if (phone.style.opacity === o) return;
      phone.style.opacity = o;
      phone.style.transform = gone > 0 ? `scale(${(1 - 0.04 * gone).toFixed(4)})` : "";
      phone.style.pointerEvents = gone > 0.5 ? "none" : "";
    };
    const clearAsides = () => {
      document.querySelectorAll<HTMLElement>("[data-aside-grid]").forEach((g) => (g.dataset.aside = "0"));
      document.querySelectorAll<HTMLElement>("[data-aside-phone], figure:has([data-morph-shot])").forEach((p) => {
        p.style.opacity = "";
        p.style.transform = "";
        p.style.pointerEvents = "";
      });
    };

    /* ---- Where the page is: segment and progress at a scroll position ---- */
    const segRange = (sg: Segment) => {
      const a = markY.get(sg.from), b = markY.get(sg.to);
      if (a === undefined || b === undefined) return null;
      return [a + (b - a) * (sg.a ?? 0), a + (b - a) * (sg.b ?? 1)] as const;
    };
    const stateAt = (y: number) => {
      const line = y + window.innerHeight * 0.5;
      const first = segRange(SEGMENTS[0]);
      const last = segRange(SEGMENTS[SEGMENTS.length - 1]);
      if (!first || !last) return null;
      if (line < first[0]) return { index: 0, seg: SEGMENTS[0], t: 0, before: true, line };
      if (line >= last[1]) return { index: SEGMENTS.length - 1, seg: SEGMENTS[SEGMENTS.length - 1], t: 1, before: false, line };
      for (let i = 0; i < SEGMENTS.length; i++) {
        const r = segRange(SEGMENTS[i]);
        if (r && line >= r[0] && line < r[1]) return { index: i, seg: SEGMENTS[i], t: (line - r[0]) / (r[1] - r[0] || 1), before: false, line };
      }
      return null;
    };

    /* ---- One frame: the video follows the eased scroll; morphs follow the page itself ---- */
    let shown = -1;
    const draw = (y: number) => {
      if (!active) return;
      const vh = window.innerHeight;
      const st = stateAt(y);
      const live = stateAt(window.scrollY);
      const end = markY.get("scene-end");
      if (!st || !live) return;
      const { seg, t, before, line } = st;
      // Played through: the scene has faded out at the closing section.
      if (end !== undefined && live.line >= end) {
        finish();
        return;
      }

      // The scene appears as the appointment lands in it, and fades out at the closing section.
      let opacity = live.before ? 0 : live.seg.id === "lift" ? ease(range(live.t, 0.3, FLY)) : 1;
      if (end !== undefined) opacity *= 1 - clamp01((line - (end - vh * 0.6)) / (vh * 0.4));
      layer.style.opacity = opacity.toFixed(3);
      // Hidden, not just transparent, until it shows: Chrome counts a transparent
      // video's first frame as the page's main content.
      layer.style.visibility = opacity > 0 ? "visible" : "hidden";

      // Clip and time. In the shadow's first half it sweeps down over clip 8's
      // last frame; in the second, clip 9's empty studio is behind it and it lifts.
      let clip: number;
      let ct: number;
      if (seg.clip === "shadow") {
        const down = t < 0.5;
        clip = down ? 8 : 9;
        ct = down ? 1 : 0;
        shadow.style.transform = `translate3d(0, ${down ? -100 * (1 - t / 0.5) : 0}%, 0)`;
        shadow.style.opacity = down ? "1" : (1 - (t - 0.5) / 0.5).toFixed(3);
      } else {
        clip = seg.clip;
        const t0 = seg.t0 ?? 0, t1 = seg.t1 ?? 1;
        ct = t0 + (t1 - t0) * t;
        shadow.style.transform = "translate3d(0, -100%, 0)";
        shadow.style.opacity = "0";
      }

      // Load this clip, the one before and the next two; the rest follow in the background.
      // Not before the visitor first scrolls, taps or types (or arrives part way down):
      // Chrome counts a clip's first frame as the page's main content even while the
      // scene is hidden, and that measurement stops at the first input.
      if (woke) {
        load(clip); load(clip - 1); load(clip + 1); load(clip + 2);
        if (!prefetching && !before) prefetch(clip);
      }

      layer.dataset.at = `${clip}:${ct.toFixed(2)}`;
      layer.dataset.seg = live.before ? "before" : live.seg.id;
      const v = videos[clip - 1];
      if (v) {
        if (v.duration) seek(v, ct * v.duration); else want.set(v, ct);
        // Swap only once the new clip has a frame to show, so nothing flashes.
        if (shown !== clip && v.readyState >= 2) {
          videos.forEach((o, i) => o?.classList.toggle("is-shown", i === clip - 1));
          shown = clip;
        }
      }

      // Where the scene is in the whole journey, for cues, holds and captions.
      const progress = before ? 0 : clip + ct;
      const at = (c: number) => (c === clip ? ct : c < clip ? 1.0001 : -1);
      for (const q of cues) q.el.style.setProperty("--cue", envelope(at(q.clip), q.a, q.b).toFixed(3));
      for (const h of holds) h.el.style.setProperty("--hold", clamp01((progress - (h.clip + h.a)) / 0.08).toFixed(3));
      for (const c of caps) {
        c.el.style.opacity = envelope(at(c.clip), c.a, c.b, true).toFixed(3);
        c.el.style.left = `${box.left + (c.x / FRAME_W) * box.w}px`;
        c.el.style.top = `${box.top + (c.y / FRAME_H) * box.h}px`;
      }

      // Morphs: driven by the page's own scroll (not the eased one), so a piece
      // leaves its screenshot exactly where it sits, with no drift.
      MORPHS.forEach((m, i) => {
        const g = ghosts[i];
        const mi = SEGMENTS.findIndex((sg) => sg.id === m.seg);
        const local = live.before || mi > live.index ? -1 : mi < live.index ? 2 : live.t;
        const k = range(local, m.t0, m.t1);
        const shot = m.shot ? document.querySelector<HTMLElement>(`[data-morph-shot="${m.shot}"]`) : null;
        // The patch it lifted from stays empty through its own segment and the next one.
        if (m.lift && shot) {
          const lifted = !live.before && live.index >= mi && live.index <= mi + 1 && (live.index > mi || local >= m.t0);
          shot.style.setProperty("--lift", lifted ? "1" : "0");
        }
        // The screenshot it came from fades as the piece lifts out of it, so the
        // two never show side by side: gone by about a third of the way through
        // the flight, following the scroll both ways. The text starts closing in
        // as it fades (desktop).
        if (m.aside || m.fade) {
          const [f0, f1] = m.fade ?? PHONE_FADE;
          const gone = local < m.t0 ? 0 : mi < live.index ? 1 : ease(range(k, f0, f1));
          if (m.shot) fadePhone(m.shot, gone);
          if (m.aside) setAside(m.aside, gone >= 0.35);
        }
        if (local < m.t0 || k >= 1) {
          if (g.style.opacity !== "0") g.style.opacity = "0";
          return;
        }
        const from = sourceRect(m);
        if (!from) return;
        const to = toScreen(m.to);
        // Lift: rise a little off the page. Fly: travel there. Settle: sit, still.
        const up = easeOut(range(k, 0, LIFT));
        const fly = ease(range(k, LIFT, FLY));
        const x = lerp(from.x, to.x, fly);
        const y2 = lerp(from.y, to.y, fly) - up * (1 - fly) * 10 - Math.sin(Math.PI * fly) * 36;
        const w = lerp(from.w, to.w, fly), h = lerp(from.h, to.h, fly);
        const pop = 1 + 0.04 * up * (1 - fly);
        // The element is sized to where it lands; the flight is all transform.
        if (g.dataset.size !== `${to.w}x${to.h}`) {
          g.style.width = `${to.w}px`;
          g.style.height = `${to.h}px`;
          g.dataset.size = `${to.w}x${to.h}`;
        }
        g.style.transform = `translate3d(${x}px, ${y2}px, 0) scale(${((w / to.w) * pop).toFixed(4)}, ${((h / to.h) * pop).toFixed(4)})`;
        g.style.borderRadius = `${lerp(from.r * (to.w / w), m.radius * to.k, fly)}px`;
        g.style.setProperty("--shadow", (up * (1 - range(k, FLY, SETTLE))).toFixed(3));
        g.style.setProperty("--tint", ease(range(k, FLY - 0.1, SETTLE)).toFixed(3));
        // A chip's words leave as it lifts, so they never stretch in flight.
        g.style.setProperty("--label", (1 - range(k, LIFT * 0.5, LIFT + 0.1)).toFixed(3));
        // On the way in it dims to the scene's own strength; once there it
        // moves behind the page's words (into the scene, under its scrim) and melts in.
        const arrived = k >= FLY;
        const home = arrived ? ghostScene : ghostLayer;
        if (g.parentElement !== home) home.appendChild(g);
        const dim = lerp(1, SCENE_STRENGTH, ease(range(k, LIFT + (FLY - LIFT) * 0.4, FLY)));
        const away = m.out ? 1 - ease(range(k, m.out[0], m.out[1])) : 1;
        g.style.opacity = ((arrived ? SCENE_STRENGTH * (1 - ease(range(k, SETTLE, 1))) : dim) * away).toFixed(3);
      });
    };

    /* ---- Loop: ease toward the scroll, run only while easing ---- */
    let eased = window.scrollY;
    let frameId = 0;
    const tick = () => {
      const goal = window.scrollY;
      eased += (goal - eased) * 0.18;
      if (Math.abs(goal - eased) < 0.5) eased = goal;
      draw(eased);
      frameId = eased !== goal ? requestAnimationFrame(tick) : 0;
    };
    const schedule = () => {
      if (!frameId) frameId = requestAnimationFrame(tick);
    };
    const onResize = () => {
      measure();
      schedule();
    };

    const deactivate = () => {
      if (!active) return;
      active = false;
      // The journey's extra room comes out of the page above; keep what the
      // reader is looking at exactly where it is.
      const keep = document.elementFromPoint(window.innerWidth / 2, window.innerHeight / 2) ?? document.body;
      const before = keep.getBoundingClientRect().top;
      root.classList.remove("scene-on");
      const shift = keep.getBoundingClientRect().top - before;
      if (Math.abs(shift) > 0.5) window.scrollBy(0, shift);
      layer.style.opacity = "0";
      layer.style.visibility = "hidden";
      ghosts.forEach((g) => (g.style.opacity = "0"));
      document.querySelectorAll<HTMLElement>("[data-morph-shot]").forEach((el) => el.style.setProperty("--lift", "0"));
      document.querySelectorAll<HTMLElement>("[data-scene-hold]").forEach((el) => el.style.setProperty("--hold", "0"));
      document.querySelectorAll<HTMLElement>("[data-scene-cue]").forEach((el) => el.style.setProperty("--cue", "0"));
      clearAsides();
    };
    function finish() {
      deactivate();
    }
    // A link to a section on this page: turn the journey off before the browser
    // scrolls, so the page it lands on is laid out without the journey's room.
    const onClick = (e: MouseEvent) => {
      const a = (e.target as HTMLElement | null)?.closest?.("a[href*='#']") as HTMLAnchorElement | null;
      if (!a) return;
      const url = new URL(a.href, window.location.href);
      if (url.pathname.replace(/\/$/, "") !== window.location.pathname.replace(/\/$/, "") || !url.hash) return;
      deactivate();
    };
    const onHash = () => {
      if (window.location.hash) deactivate();
    };
    document.addEventListener("click", onClick, true);
    window.addEventListener("hashchange", onHash);

    let woke = window.scrollY > 0;
    const wake = () => {
      if (woke) return;
      woke = true;
      wakeEvents.forEach((e) => window.removeEventListener(e, wake));
      schedule();
    };
    const wakeEvents = ["scroll", "pointerdown", "keydown", "touchstart"] as const;
    if (!woke) wakeEvents.forEach((e) => window.addEventListener(e, wake, { passive: true }));

    measure();
    draw(eased);
    window.addEventListener("scroll", schedule, { passive: true });
    window.addEventListener("resize", onResize);
    // Images and fonts move the marks as they load.
    const ro = new ResizeObserver(onResize);
    ro.observe(document.body);

    return () => {
      cancelAnimationFrame(frameId);
      wakeEvents.forEach((e) => window.removeEventListener(e, wake));
      window.removeEventListener("scroll", schedule);
      window.removeEventListener("resize", onResize);
      ro.disconnect();
      document.removeEventListener("click", onClick, true);
      window.removeEventListener("hashchange", onHash);
      clearAsides();
      ghosts.forEach((g) => g.remove());
      root.classList.remove("scene-on");
    };
  }, []);

  return (
    <>
      <div ref={layerRef} aria-hidden="true" className="journey-scene pointer-events-none invisible fixed inset-x-0 top-0 z-0 h-[100lvh] overflow-hidden opacity-0">
        <div ref={frameRef} className="journey-frame absolute">
          {Array.from({ length: CLIPS }, (_, i) => (
            <video
              key={i}
              ref={(el) => {
                videoRefs.current[i] = el;
              }}
              muted
              playsInline
              preload="none"
              className="journey-video absolute inset-0 h-full w-full"
            />
          ))}
        </div>
        {/* Pieces that have arrived from the page sit here, in the scene, until they melt in. */}
        <div ref={ghostSceneRef} className="absolute inset-0" />
        {/* Keeps the scene behind the words: darker where text sits, open in the middle. */}
        <div className="journey-scrim absolute inset-0" />
        <div ref={shadowRef} className="journey-shadow absolute inset-0" />
        {CAPTIONS.map((c) => (
          <p
            key={c.text}
            data-scene-cap={c.at}
            data-x={c.x}
            data-y={c.y}
            className={`journey-cap absolute -translate-x-1/2 -translate-y-1/2 whitespace-nowrap font-mono text-[11px] uppercase tracking-[0.22em] sm:text-[13px] ${c.strong ? "text-primary" : "text-foreground/80"}`}
            style={{ opacity: 0 }}
          >
            {c.text}
          </p>
        ))}
      </div>
      {/* Morph ghosts fly above the page, from a screenshot into the scene. */}
      <div ref={ghostLayerRef} aria-hidden="true" className="morph-layer pointer-events-none fixed inset-0 z-[25] overflow-hidden" />
    </>
  );
}
