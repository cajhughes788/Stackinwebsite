"use client";

import { useEffect, useRef, type ReactNode } from "react";
import { SWAY } from "@/lib/sway-track";

// A rendered phone that sways gently (a looping clip, public/media/phone/),
// with a real screen pinned to it. The clip was made with a green screen whose
// corners were tracked in every frame (work/phone/build.py writes them to
// lib/sway-track.ts); here the screen is laid out at a fixed design size and
// mapped onto that frame's corners with a perspective matrix, so the UI stays
// sharp HTML while the phone around it moves. The clip's background is baked
// to the page colour it sits on (`bg`), one encode per colour.
//
// The video only plays while on screen. With reduced motion it holds the first
// frame, which faces straight on.

/** Design size of the screen in CSS px (the tracked screen's aspect). */
export const SCREEN_W = 320;
const F0 = SWAY.frames[0];
export const SCREEN_H = Math.round(
  (SCREEN_W * (F0[5] - F0[1] + (F0[7] - F0[3])) / 2) / ((F0[2] - F0[0] + (F0[4] - F0[6])) / 2),
);
/** Screen corner radius in CSS px, measured from the clip. */
const RADIUS = Math.round(SCREEN_W * 0.118);

// The matrix3d that maps a w×h box onto the quad p (TL, TR, BR, BL), scaled by k.
function quadMatrix(w: number, h: number, p: readonly number[], k: number) {
  const [x0, y0, x1, y1, x2, y2, x3, y3] = p.map((n) => n * k);
  const dx1 = x1 - x2, dx2 = x3 - x2, dx3 = x0 - x1 + x2 - x3;
  const dy1 = y1 - y2, dy2 = y3 - y2, dy3 = y0 - y1 + y2 - y3;
  const det = dx1 * dy2 - dx2 * dy1;
  const g = (dx3 * dy2 - dx2 * dy3) / det;
  const hh = (dx1 * dy3 - dx3 * dy1) / det;
  const a = x1 - x0 + g * x1, b = x3 - x0 + hh * x3, c = x0;
  const d = y1 - y0 + g * y1, e = y3 - y0 + hh * y3, f = y0;
  const m = [a / w, d / w, 0, g / w, b / h, e / h, 0, hh / h, 0, 0, 1, 0, c, f, 0, 1];
  return `matrix3d(${m.map((n) => +n.toFixed(6)).join(",")})`;
}

export function SwayPhone({
  bg,
  label,
  className = "",
  children,
}: {
  /** Page colour behind the phone; picks the matching encode ("161b1e" or "1a2024"). */
  bg: "161b1e" | "1a2024";
  /** Accessible description of what the screen shows. */
  label?: string;
  className?: string;
  /** The screen, laid out at SCREEN_W × SCREEN_H. */
  children: ReactNode;
}) {
  const boxRef = useRef<HTMLDivElement>(null);
  const videoRef = useRef<HTMLVideoElement>(null);
  const screenRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const box = boxRef.current, video = videoRef.current, screen = screenRef.current;
    if (!box || !video || !screen) return;
    const still = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const n = SWAY.frames.length;
    let k = box.clientWidth / SWAY.width;
    let last = -1;

    const place = (i: number, force = false) => {
      if (i === last && !force) return;
      last = i;
      screen.style.transform = quadMatrix(SCREEN_W, SCREEN_H, SWAY.frames[i], k);
    };
    const frameAt = (t: number) => Math.min(n - 1, Math.max(0, Math.round(t * SWAY.fps))) % n;

    place(0, true);
    screen.style.opacity = "1";

    const ro = new ResizeObserver(() => {
      k = box.clientWidth / SWAY.width;
      place(last < 0 ? 0 : last, true);
    });
    ro.observe(box);
    if (still) return () => ro.disconnect();

    // Follow the frame actually on screen; requestVideoFrameCallback where it
    // exists (Chrome, Safari 15.4+), otherwise poll currentTime each paint.
    let stop = false;
    let raf = 0;
    const hasVfc = "requestVideoFrameCallback" in video;
    const onVfc = (_: number, meta: VideoFrameCallbackMetadata) => {
      if (stop) return;
      place(frameAt(meta.mediaTime));
      video.requestVideoFrameCallback(onVfc);
    };
    const onRaf = () => {
      if (stop) return;
      place(frameAt(video.currentTime));
      raf = requestAnimationFrame(onRaf);
    };
    if (hasVfc) video.requestVideoFrameCallback(onVfc);
    else raf = requestAnimationFrame(onRaf);

    const io = new IntersectionObserver(([entry]) => {
      if (entry.isIntersecting) video.play().catch(() => {});
      else video.pause();
    });
    io.observe(box);

    return () => {
      stop = true;
      cancelAnimationFrame(raf);
      io.disconnect();
      ro.disconnect();
    };
  }, []);

  return (
    <div
      ref={boxRef}
      role={label ? "img" : undefined}
      aria-label={label}
      className={`relative isolate w-full overflow-hidden ${className}`}
      style={{ aspectRatio: `${SWAY.width} / ${SWAY.height}` }}
    >
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-x-[10%] top-[20%] -z-10 h-[60%] rounded-full bg-primary/[0.12] blur-[70px]"
      />
      <video
        ref={videoRef}
        src={`/media/phone/sway-${bg}.mp4`}
        poster={`/media/phone/sway-${bg}.webp`}
        muted
        loop
        playsInline
        preload="auto"
        aria-hidden="true"
        className="sway-fade absolute inset-0 h-full w-full"
      />
      <div
        ref={screenRef}
        aria-hidden={label ? true : undefined}
        className="absolute left-0 top-0 origin-top-left overflow-hidden bg-background opacity-0 transition-opacity duration-300 [backface-visibility:hidden]"
        style={{ width: SCREEN_W, height: SCREEN_H, borderRadius: RADIUS }}
      >
        {children}
      </div>
    </div>
  );
}

/** A status bar like the one on the app's screens. */
export function StatusBar({ className = "" }: { className?: string }) {
  return (
    <div className={`flex items-center justify-between px-7 pb-2 pt-4 text-[11px] font-medium tabular-nums text-foreground/80 ${className}`}>
      <span>9:41</span>
      <span className="h-[22px] w-[84px] rounded-full bg-[#0e1214]" />
      <span className="tracking-widest">•••</span>
    </div>
  );
}
