"use client";

import { useEffect, useRef } from "react";

// The Features journey (docs/features-journey.md): twelve generated clips
// (public/media/journey/c1–c12) that play behind the page as one scene,
// driven by the scroll. Clip n ends on the frame clip n+1 starts on, so the
// scene is continuous.
//
// Where each clip plays is set by invisible marks in the sections
// (<SceneMark name="…" />): a clip runs from its first mark reaching the
// middle of the screen to its second. Between Income and Business a shadow
// sweeps down and the scene changes behind it.
//
// The page talks back through two attributes:
//   [data-scene-cue="clip:from-to"]  gets --cue 0→1→0 while that clip is
//                                    between those points (rings on the real
//                                    screenshots, the payment chips)
//   [data-scene-cap="clip:from-to"]  captions in the scene, placed in the
//                                    clips' own 1280×720 frame coordinates
//
// Videos are all-keyframe encodes, so any frame is one seek away, and load
// only as their stretch of the page comes near. With reduced motion there is
// no scene and the sections keep their solid backgrounds.

type Segment = { from: string; to: string; clip: number | "shadow"; t0?: number; t1?: number };

const SEGMENTS: Segment[] = [
  { from: "booking-start", to: "booking-end", clip: 1 },
  { from: "booking-end", to: "charge-qr", clip: 2 },
  { from: "charge-qr", to: "charge-end", clip: 3 },
  { from: "charge-end", to: "invoicing-row", clip: 4 },
  { from: "invoicing-row", to: "invoicing-end", clip: 5 },
  { from: "invoicing-end", to: "income-start", clip: 6 },
  { from: "income-start", to: "income-chips", clip: 7 },
  { from: "income-chips", to: "income-phone", clip: 8 },
  { from: "income-phone", to: "business-start", clip: "shadow" },
  { from: "business-start", to: "business-end", clip: 9 },
  { from: "business-end", to: "paychecks-start", clip: 10, t0: 0, t1: 0 },
  { from: "paychecks-start", to: "paychecks-stub", clip: 10 },
  { from: "paychecks-stub", to: "organize-mid", clip: 11 },
  { from: "organize-mid", to: "voice-start", clip: 12 },
];
const CLIPS = 12;
const FRAME_W = 1280;
const FRAME_H = 720;

const clamp01 = (n: number) => Math.min(Math.max(n, 0), 1);

// Captions in the scene: real text where the video carries none.
const CAPTIONS = [
  // Beside the Payment streams phone, on the floor under each city.
  { at: "8:0.75-1", x: 840, y: 480, text: "One ledger" },
  { at: "9:0.7-1", x: 640, y: 610, text: "Profit by month · last 12 months" },
  { at: "11:0.6-1", x: 640, y: 610, text: "This month, together · $5,024.17", strong: true },
];

/** An invisible point on the page where a clip starts or ends (see SEGMENTS). */
export function SceneMark({ name, className = "" }: { name: string; className?: string }) {
  return <span aria-hidden="true" data-scene-mark={name} className={`pointer-events-none block h-0 w-0 ${className}`} />;
}

export function JourneyScene() {
  const layerRef = useRef<HTMLDivElement>(null);
  const frameRef = useRef<HTMLDivElement>(null);
  const shadowRef = useRef<HTMLDivElement>(null);
  const videoRefs = useRef<(HTMLVideoElement | null)[]>([]);

  useEffect(() => {
    const layer = layerRef.current;
    const frame = frameRef.current;
    const shadow = shadowRef.current;
    if (!layer || !frame || !shadow) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    const root = document.documentElement;
    root.classList.add("scene-on");
    const small = window.matchMedia("(max-width: 767px)");
    const videos = videoRefs.current;

    /* ---- Marks: where each one sits on the page ---- */
    const markY = new Map<string, number>();
    const measure = () => {
      markY.clear();
      document.querySelectorAll<HTMLElement>("[data-scene-mark]").forEach((el) => {
        markY.set(el.dataset.sceneMark!, el.getBoundingClientRect().top + window.scrollY);
      });
      sizeFrame();
    };

    /* ---- The frame: cover the screen on wide screens; on phones, wide enough to keep the middle of every shot ---- */
    let box = { left: 0, top: 0, w: 0, h: 0 };
    const sizeFrame = () => {
      const vw = window.innerWidth;
      const vh = layer.clientHeight;
      let w: number;
      if (vw / vh < 1) w = vw * 1.6;
      else w = Math.max(vw, vh * (FRAME_W / FRAME_H));
      const h = w * (FRAME_H / FRAME_W);
      box = { left: (vw - w) / 2, top: (vh - h) / 2, w, h };
      frame.style.cssText = `left:${box.left}px;top:${box.top}px;width:${w}px;height:${h}px`;
    };

    /* ---- Videos: load as their stretch nears; seek without piling up seeks ---- */
    const loaded = new Set<number>();
    const load = (clip: number) => {
      if (clip < 1 || clip > CLIPS || loaded.has(clip)) return;
      const v = videos[clip - 1];
      if (!v) return;
      loaded.add(clip);
      v.src = `/media/journey/c${clip}${small.matches ? "-m" : ""}.mp4`;
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

    /* ---- Cues and captions on the page ---- */
    const parseAt = (s: string) => {
      const [c, r] = s.split(":");
      const [a, b] = r.split("-").map(Number);
      return { clip: Number(c), a, b };
    };
    const cues = Array.from(document.querySelectorAll<HTMLElement>("[data-scene-cue]")).map((el) => ({ el, ...parseAt(el.dataset.sceneCue!) }));
    const caps = Array.from(layer.querySelectorAll<HTMLElement>("[data-scene-cap]")).map((el) => ({ el, ...parseAt(el.dataset.sceneCap!), x: Number(el.dataset.x), y: Number(el.dataset.y) }));
    // 0 → 1 over the first 25% of the window, 1 → 0 over the last 25%.
    const envelope = (p: number, a: number, b: number, holdEnd = false) => {
      if (p < a || p > b) return 0;
      const k = (p - a) / (b - a || 1);
      return Math.min(1, k / 0.25, holdEnd ? 1 : (1 - k) / 0.25);
    };

    /* ---- One frame ---- */
    let shown = -1;
    const draw = (y: number) => {
      const vh = window.innerHeight;
      const line = y + vh * 0.5;
      const first = markY.get(SEGMENTS[0].from);
      const last = markY.get(SEGMENTS[SEGMENTS.length - 1].to);
      const end = markY.get("scene-end");
      if (first === undefined || last === undefined) return;

      // Which segment the middle of the screen is in.
      let seg = SEGMENTS[0];
      let t = 0;
      if (line >= last) {
        seg = SEGMENTS[SEGMENTS.length - 1];
        t = 1;
      } else {
        for (const s of SEGMENTS) {
          const a = markY.get(s.from), b = markY.get(s.to);
          if (a === undefined || b === undefined) continue;
          if (line >= a && line < b) { seg = s; t = (line - a) / (b - a || 1); break; }
          if (line < a) break;
        }
      }

      // The whole scene fades in as Booking arrives and out at the closing section.
      let opacity = clamp01((line - (first - vh * 0.35)) / (vh * 0.35));
      if (end !== undefined) opacity *= 1 - clamp01((line - (end - vh * 0.6)) / (vh * 0.4));
      layer.style.opacity = opacity.toFixed(3);

      // Clip and time (the shadow shows clip 8's end, then clip 9's start).
      // In the first half the shadow sweeps down over clip 8's last frame; in
      // the second, with the screen dark, clip 9's empty studio is behind it
      // and the shadow lifts.
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

      // Load this clip, the one before and the next two; the rest follow
      // one at a time in the background (see prefetch).
      load(clip); load(clip - 1); load(clip + 1); load(clip + 2);
      if (!prefetching) prefetch(clip);

      layer.dataset.at = `${clip}:${ct.toFixed(2)}`;
      const v = videos[clip - 1];
      if (v) {
        if (v.duration) seek(v, ct * v.duration); else want.set(v, ct);
        // Swap only once the new clip has a frame to show, so nothing flashes.
        if (shown !== clip && v.readyState >= 2) {
          videos.forEach((o, i) => o?.classList.toggle("is-shown", i === clip - 1));
          shown = clip;
        }
      }

      // Progress through the whole journey, as "clip.time", for cues and captions.
      const at = (c: number) => (c === clip ? ct : c < clip ? 1.0001 : -1);
      for (const q of cues) q.el.style.setProperty("--cue", envelope(at(q.clip), q.a, q.b).toFixed(3));
      for (const c of caps) {
        c.el.style.opacity = envelope(at(c.clip), c.a, c.b, true).toFixed(3);
        c.el.style.left = `${box.left + (c.x / FRAME_W) * box.w}px`;
        c.el.style.top = `${box.top + (c.y / FRAME_H) * box.h}px`;
      }
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

    measure();
    draw(eased);
    window.addEventListener("scroll", schedule, { passive: true });
    window.addEventListener("resize", onResize);
    // Images and fonts move the marks as they load.
    const ro = new ResizeObserver(onResize);
    ro.observe(document.body);

    return () => {
      cancelAnimationFrame(frameId);
      window.removeEventListener("scroll", schedule);
      window.removeEventListener("resize", onResize);
      ro.disconnect();
      root.classList.remove("scene-on");
    };
  }, []);

  return (
    <div ref={layerRef} aria-hidden="true" className="journey-scene pointer-events-none fixed inset-x-0 top-0 z-0 h-[100lvh] overflow-hidden opacity-0">
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
  );
}
