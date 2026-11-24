"use client";

import { useEffect, type RefObject } from "react";

const clamp = (n: number, lo: number, hi: number) => Math.min(Math.max(n, lo), hi);

type Options = {
  /** Also lean toward the mouse (fine pointers only; never on touch). */
  pointer?: boolean;
  /** Element that listens for the mouse, when wider than the one that moves. */
  pointerTarget?: RefObject<HTMLElement | null>;
};

// Drives the site's 3D with three CSS variables on `ref`:
//   --p   where the element sits: 1 entering from below, 0 centred, -1 leaving at the top
//   --in  how far it has risen into view: 0 at the bottom edge, 1 once its top is at 55%
//   --tx / --ty  the mouse across it, -1..1 (pointer option)
// Each value eases toward its goal every frame so wheel steps glide, and the
// loop only runs while the element is near the screen. With reduced motion
// nothing is set, and the CSS defaults (flat, fully in) apply.
export function useDepth(ref: RefObject<HTMLElement | null>, { pointer = false, pointerTarget }: Options = {}) {
  useEffect(() => {
    const el = ref.current;
    if (!el || window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    const goal = { p: 0, in: 0, tx: 0, ty: 0 };
    const now = { p: 0, in: 0, tx: 0, ty: 0 };

    const measure = () => {
      const r = el.getBoundingClientRect();
      const vh = window.innerHeight;
      goal.p = clamp((r.top + r.height / 2 - vh / 2) / (vh / 2 + r.height / 2), -1, 1);
      goal.in = clamp((vh - r.top) / (vh * 0.45), 0, 1);
    };

    const write = () => {
      el.style.setProperty("--p", now.p.toFixed(4));
      el.style.setProperty("--in", now.in.toFixed(4));
      if (pointer) {
        el.style.setProperty("--tx", now.tx.toFixed(4));
        el.style.setProperty("--ty", now.ty.toFixed(4));
      }
    };

    let frame = 0;
    const tick = () => {
      let moving = false;
      for (const k of ["p", "in", "tx", "ty"] as const) {
        const d = goal[k] - now[k];
        if (Math.abs(d) < 0.0005) now[k] = goal[k];
        else {
          now[k] += d * 0.14;
          moving = true;
        }
      }
      write();
      frame = moving ? requestAnimationFrame(tick) : 0;
    };
    const schedule = () => {
      if (!frame) frame = requestAnimationFrame(tick);
    };

    // First paint lands on the right pose without easing in from zero.
    measure();
    Object.assign(now, goal);
    write();

    let near = false;
    const io = new IntersectionObserver(([entry]) => {
      near = entry.isIntersecting;
      if (near) {
        measure();
        schedule();
      }
    }, { rootMargin: "25% 0px" });
    io.observe(el);

    const onScroll = () => {
      if (!near) return;
      measure();
      schedule();
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll);

    const fine = pointer && window.matchMedia("(hover: hover) and (pointer: fine)").matches;
    const target = pointerTarget?.current ?? el;
    const onMove = (e: PointerEvent) => {
      const r = target.getBoundingClientRect();
      goal.tx = clamp(((e.clientX - r.left) / r.width) * 2 - 1, -1, 1);
      goal.ty = clamp(((e.clientY - r.top) / r.height) * 2 - 1, -1, 1);
      schedule();
    };
    const onLeave = () => {
      goal.tx = 0;
      goal.ty = 0;
      schedule();
    };
    if (fine) {
      target.addEventListener("pointermove", onMove);
      target.addEventListener("pointerleave", onLeave);
    }

    return () => {
      cancelAnimationFrame(frame);
      io.disconnect();
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
      if (fine) {
        target.removeEventListener("pointermove", onMove);
        target.removeEventListener("pointerleave", onLeave);
      }
    };
  }, [ref, pointer, pointerTarget]);
}
