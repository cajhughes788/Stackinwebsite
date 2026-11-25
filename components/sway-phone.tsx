"use client";

import { useEffect, useRef, type ReactNode } from "react";
import { SWAY } from "@/lib/sway-track";
import { media } from "@/lib/media";

// A rendered phone that sways gently (a looping clip, public/media/phone/),
// with a real screen pinned to it. The clip was made with a green screen whose
// corners were tracked in every frame (work/phone/build.py writes them to
// lib/sway-track.ts); here the screen is laid out at a fixed design size and
// mapped onto that frame's corners with a perspective matrix, so the UI stays
// sharp HTML while the phone around it moves. The clip's background is black and
// it is blended with `lighten` over a box filled with the page colour, so the
// background is exactly the page in every browser (decoders shift dark video
// colours by a shade or two, which showed as a faint box).
//
// The video only plays while on screen. If the browser won't play it (iPhone in
// Low Power Mode blocks autoplay), the still first frame and the screen sway
// together with a CSS 3D rotation instead (data-sway="css"). With reduced
// motion it holds the first frame, which faces straight on.

/** Design size of the screen in CSS px (the tracked screen's aspect). */
export const SCREEN_W = 320;
const F0 = SWAY.frames[0];
export const SCREEN_H = Math.round(
  (SCREEN_W * (F0[5] - F0[1] + (F0[7] - F0[3]))) /
    2 /
    ((F0[2] - F0[0] + (F0[4] - F0[6])) / 2),
);
/** Screen corner radius in CSS px, measured from the clip. */
const RADIUS = Math.round(SCREEN_W * 0.118);

// The matrix3d that maps a w×h box onto the quad p (TL, TR, BR, BL), scaled by k.
function quadMatrix(w: number, h: number, p: readonly number[], k: number) {
  const [x0, y0, x1, y1, x2, y2, x3, y3] = p.map((n) => n * k);
  const dx1 = x1 - x2,
    dx2 = x3 - x2,
    dx3 = x0 - x1 + x2 - x3;
  const dy1 = y1 - y2,
    dy2 = y3 - y2,
    dy3 = y0 - y1 + y2 - y3;
  const det = dx1 * dy2 - dx2 * dy1;
  const g = (dx3 * dy2 - dx2 * dy3) / det;
  const hh = (dx1 * dy3 - dx3 * dy1) / det;
  const a = x1 - x0 + g * x1,
    b = x3 - x0 + hh * x3,
    c = x0;
  const d = y1 - y0 + g * y1,
    e = y3 - y0 + hh * y3,
    f = y0;
  const m = [
    a / w,
    d / w,
    0,
    g / w,
    b / h,
    e / h,
    0,
    hh / h,
    0,
    0,
    1,
    0,
    c,
    f,
    0,
    1,
  ];
  return `matrix3d(${m.map((n) => +n.toFixed(6)).join(",")})`;
}

export function SwayPhone({
  bg,
  label,
  className = "",
  children,
}: {
  /** Page colour behind the phone (hex without #). */
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
    const box = boxRef.current,
      video = videoRef.current,
      screen = screenRef.current;
    if (!box || !video || !screen) return;
    const still = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const n = SWAY.frames.length;
    let k = box.clientWidth / SWAY.width;
    let last = -1;

    const place = (i: number, force = false) => {
      if (i === last && !force) return;
      last = i;
      screen.style.transform = quadMatrix(
        SCREEN_W,
        SCREEN_H,
        SWAY.frames[i],
        k,
      );
    };
    const frameAt = (t: number) =>
      Math.min(n - 1, Math.max(0, Math.round(t * SWAY.fps))) % n;

    place(0, true);
    screen.style.opacity = "1";

    const ro = new ResizeObserver(() => {
      k = box.clientWidth / SWAY.width;
      place(last < 0 ? 0 : last, true);
    });
    ro.observe(box);
    // Nothing far down the page loads up front (sites-engine rule): the clip and its
    // poster load once the phone is a screen and a half away; with reduced motion,
    // only the poster, the first frame, facing straight on.
    const near = new IntersectionObserver(
      ([entry]) => {
        if (!entry.isIntersecting) return;
        near.disconnect();
        // A clip with a transparent background where the browser can play one:
        // HEVC with alpha in Safari (every iPhone browser is Safari underneath),
        // VP9 with alpha elsewhere. Only the plain clip leans on the `lighten`
        // blend, which Safari drops once the video is composited on scroll.
        const ua = navigator.userAgent;
        const kind =
          /AppleWebKit/.test(ua) && !/Chrome\/|Chromium|Edg\//.test(ua)
            ? "mov"
            : video.canPlayType('video/webm; codecs="vp9"')
              ? "webm"
              : "";
        if (kind) box.dataset.alpha = "";
        video.poster = (kind ? video.dataset.still : video.dataset.poster) ?? "";
        if (still) return;
        video.preload = "auto";
        video.src = (kind === "mov" ? video.dataset.mov : kind === "webm" ? video.dataset.webm : video.dataset.src) ?? "";
      },
      { rootMargin: "150% 0px" },
    );
    near.observe(box);
    if (still)
      return () => {
        ro.disconnect();
        near.disconnect();
      };

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

    // Autoplay blocked, or no frame after a while on screen: sway with CSS instead.
    let playing = false;
    let fallback = false;
    let check = 0;
    const swayWithCss = () => {
      if (fallback || playing) return;
      fallback = true;
      stop = true;
      cancelAnimationFrame(raf);
      video.pause();
      place(0, true);
      box.dataset.sway = "css";
    };
    // Loaded enough to play but still not moving: the browser is holding it back.
    // Still loading (slow connection): look again shortly.
    const stalled = () => {
      if (fallback || playing) return;
      if (video.readyState >= 3) swayWithCss();
      else check = window.setTimeout(stalled, 1500);
    };
    const onPlaying = () => {
      if (video.currentTime > 0) playing = true;
    };
    video.addEventListener("timeupdate", onPlaying);

    const io = new IntersectionObserver(([entry]) => {
      if (fallback) return;
      if (entry.isIntersecting) {
        video.play().catch((e: DOMException) => {
          if (e.name === "NotAllowedError") swayWithCss();
        });
        clearTimeout(check);
        check = window.setTimeout(stalled, 2500);
      } else {
        clearTimeout(check);
        video.pause();
      }
    });
    io.observe(box);

    return () => {
      stop = true;
      cancelAnimationFrame(raf);
      clearTimeout(check);
      near.disconnect();
      video.removeEventListener("timeupdate", onPlaying);
      io.disconnect();
      ro.disconnect();
    };
  }, []);

  return (
    <div
      ref={boxRef}
      role={label ? "img" : undefined}
      aria-label={label}
      className={`relative isolate w-full ${className}`}
      style={{
        aspectRatio: `${SWAY.width} / ${SWAY.height}`,
        background: `#${bg}`,
      }}
    >
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-x-[22%] top-[25%] h-[50%] rounded-full bg-primary/[0.12] blur-[60px]"
      />
      {/* The plain clip is blended with lighten as a group, so its black background
          takes the page colour; the alpha clips need no blend (globals.css). */}
      <div className="sway-video sway-stage absolute inset-0">
        <video
          ref={videoRef}
          data-src={media("/media/phone/sway.mp4")}
          data-mov={media("/media/phone/sway-alpha.mov")}
          data-webm={media("/media/phone/sway-alpha.webm")}
          data-poster={media("/media/phone/sway.webp")}
          data-still={media("/media/phone/sway-still.webp")}
          muted
          loop
          playsInline
          preload="none"
          aria-hidden="true"
          className="absolute inset-0 h-full w-full"
        />
      </div>
      {/* The CSS fallback rotates in 3D, where the blend above stops working and the
          video's black box would show; it swaps in this cut-out still instead. */}
      <div className="sway-still sway-stage absolute inset-0">
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src={media("/media/phone/sway-still.webp")}
          loading="lazy"
          decoding="async"
          alt=""
          aria-hidden="true"
          className="absolute inset-0 h-full w-full"
        />
      </div>
      <div className="sway-stage absolute inset-0">
        <div
          ref={screenRef}
          aria-hidden={label ? true : undefined}
          className="absolute left-0 top-0 origin-top-left overflow-hidden bg-background opacity-0 transition-opacity duration-300 [backface-visibility:hidden]"
          style={{ width: SCREEN_W, height: SCREEN_H, borderRadius: RADIUS }}
        >
          {children}
        </div>
      </div>
    </div>
  );
}

/** A status bar like the one on the app's screens. */
export function StatusBar({ className = "" }: { className?: string }) {
  return (
    <div
      className={`flex items-center justify-between px-7 pb-2 pt-4 text-[11px] font-medium tabular-nums text-foreground/80 ${className}`}
    >
      <span>9:41</span>
      <span className="h-[22px] w-[84px] rounded-full bg-[#0e1214]" />
      <span className="tracking-widest">•••</span>
    </div>
  );
}
