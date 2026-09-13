"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { REEL_MARKUP } from "./reel-markup";
import "./reel.css";

type Particle = {
  x: number;
  y: number;
  vx: number;
  vy: number;
  text: string;
  size: number;
  alpha: number;
};

export default function ReelPage() {
  const router = useRouter();

  useEffect(() => {
    router.prefetch("/");
  }, [router]);

  useEffect(() => {
    const embedded = (() => {
      try {
        return window.self !== window.top;
      } catch {
        return true;
      }
    })();

    const reel = document.getElementById("reel");
    const stage = document.getElementById("stage");
    const progressBar = document.getElementById("progress");
    const scenes = Array.from(document.querySelectorAll<HTMLElement>(".scene"));
    const segs = Array.from(document.querySelectorAll<HTMLElement>(".seg"));
    const replayBtn = document.getElementById("replayBtn");
    const closeBtn = document.querySelector<HTMLAnchorElement>(".close-btn");
    const ctaButton = document.querySelector<HTMLAnchorElement>(".cta-button");
    const canvas = document.getElementById("chaosCanvas") as HTMLCanvasElement | null;

    if (!reel || !stage || !progressBar || !canvas || scenes.length === 0) return;

    const reelEl = reel;
    const stageEl = stage;
    const progressBarEl = progressBar;
    const canvasEl = canvas;

    if (embedded) reelEl.classList.add("embedded");
    const ctx = canvasEl.getContext("2d");
    const prefersReduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    let current = 0;
    let timer: ReturnType<typeof setTimeout> | null = null;
    let segStart = 0;
    let remaining = 0;
    let paused = false;
    let chaosRunning = false;
    let rafId: number | null = null;
    let closing = false;

    function duration(i: number) {
      return parseInt(scenes[i].dataset.duration || "", 10) || 4000;
    }

    function clearTimer() {
      if (timer) {
        clearTimeout(timer);
        timer = null;
      }
    }

    function scheduleAdvance(ms: number) {
      clearTimer();
      segStart = Date.now();
      remaining = ms;
      timer = setTimeout(() => goTo(current + 1), ms);
    }

    function setSegments(i: number) {
      segs.forEach((seg) => seg.classList.remove("filled", "active"));
      void progressBarEl.offsetWidth;
      segs.forEach((seg, idx) => {
        if (idx < i) seg.classList.add("filled");
        if (idx === i) {
          seg.style.setProperty("--dur", duration(i) + "ms");
          seg.classList.add("active");
        }
      });
    }

    function formatMoney(n: number) {
      return "$" + n.toLocaleString("en-US");
    }

    function countUp(el: HTMLElement, target: number, dur: number) {
      if (prefersReduced) {
        el.textContent = formatMoney(target);
        return;
      }
      const start = performance.now();
      function frame(now: number) {
        const t = Math.min(1, (now - start) / dur);
        const eased = 1 - Math.pow(1 - t, 3);
        el.textContent = formatMoney(Math.round(target * eased));
        if (t < 1) requestAnimationFrame(frame);
      }
      requestAnimationFrame(frame);
    }

    function runSceneEffects(i: number) {
      scenes[i].querySelectorAll<HTMLElement>("[data-countup]").forEach((el, idx) => {
        setTimeout(() => countUp(el, parseInt(el.dataset.countup || "", 10), 1300), idx * 150);
      });
      chaosRunning = i === 0 && !prefersReduced;
      if (chaosRunning) rafId = requestAnimationFrame(chaosFrame);
      else drawChaosStatic();
    }

    function goTo(i: number, opts?: { silent?: boolean }) {
      const silent = opts?.silent ?? false;
      current = ((i % scenes.length) + scenes.length) % scenes.length;
      scenes.forEach((s) => s.classList.remove("active"));
      void stageEl.offsetWidth;
      scenes[current].classList.add("active");
      setSegments(current);
      runSceneEffects(current);
      if (!silent) scheduleAdvance(duration(current));
    }

    function next() {
      goTo(current + 1);
    }
    function prev() {
      goTo(current - 1);
    }

    function pause() {
      if (paused) return;
      paused = true;
      reelEl.classList.add("paused");
      clearTimer();
      remaining = Math.max(300, remaining - (Date.now() - segStart));
    }

    function resume() {
      if (!paused) return;
      paused = false;
      reelEl.classList.remove("paused");
      segStart = Date.now();
      timer = setTimeout(() => goTo(current + 1), remaining);
    }

    let downX = 0;
    let longPress = false;
    let holdTimer: ReturnType<typeof setTimeout> | null = null;

    function onPointerDown(e: PointerEvent) {
      if ((e.target as HTMLElement | null)?.closest("a,button")) return;
      downX = e.clientX;
      longPress = false;
      holdTimer = setTimeout(() => {
        longPress = true;
        pause();
      }, 200);
    }

    function onPointerUp(e: PointerEvent) {
      if ((e.target as HTMLElement | null)?.closest("a,button")) return;
      if (holdTimer) clearTimeout(holdTimer);
      if (longPress) {
        resume();
        return;
      }
      const rect = stageEl.getBoundingClientRect();
      const half = rect.left + rect.width / 2;
      if (downX < half) prev();
      else next();
    }

    function onPointerCancel() {
      if (holdTimer) clearTimeout(holdTimer);
      if (paused) resume();
    }

    stageEl.addEventListener("pointerdown", onPointerDown);
    stageEl.addEventListener("pointerup", onPointerUp);
    stageEl.addEventListener("pointercancel", onPointerCancel);

    function onReplayClick(e: Event) {
      e.stopPropagation();
      goTo(0);
    }
    replayBtn?.addEventListener("click", onReplayClick);

    function beginClosing() {
      closing = true;
      clearTimer();
      chaosRunning = false;
      reelEl.classList.add("closing");
    }

    function closeToHome(e: Event) {
      e.preventDefault();
      if (closing) return;
      beginClosing();
      router.push("/");
    }
    closeBtn?.addEventListener("click", closeToHome);

    function onCtaClick(e: Event) {
      if (embedded) {
        window.parent.postMessage({ type: "stackin-reelEl:start-free" }, window.location.origin);
        return;
      }
      e.preventDefault();
      if (closing) return;
      beginClosing();
      router.push("/#pricing");
    }
    ctaButton?.addEventListener("click", onCtaClick);

    function onKeyDown(e: KeyboardEvent) {
      if (e.key === "ArrowRight") next();
      else if (e.key === "ArrowLeft") prev();
      else if (e.key === " ") {
        e.preventDefault();
        if (paused) resume();
        else pause();
      } else if (e.key === "Escape" && !embedded) {
        closeToHome(e);
      }
    }
    reelEl.addEventListener("keydown", onKeyDown);

    function onVisibilityChange() {
      if (document.hidden) pause();
      else resume();
    }
    document.addEventListener("visibilitychange", onVisibilityChange);

    const chaosItems = ["$1,204.50", "47", "0.00", "Q3", "?", "12%", "$842", "--", "$0.00", "x3"];
    let particles: Particle[] = [];

    function spawnParticle(rect: DOMRect): Particle {
      return {
        x: Math.random() * rect.width,
        y: Math.random() * rect.height,
        vx: (Math.random() - 0.5) * 0.12,
        vy: 0.08 + Math.random() * 0.1,
        text: chaosItems[Math.floor(Math.random() * chaosItems.length)],
        size: 12 + Math.random() * 8,
        alpha: 0.06 + Math.random() * 0.09,
      };
    }

    function sizeCanvas() {
      const rect = scenes[0].getBoundingClientRect();
      const dpr = window.devicePixelRatio || 1;
      canvasEl.width = Math.max(1, rect.width * dpr);
      canvasEl.height = Math.max(1, rect.height * dpr);
      canvasEl.style.width = rect.width + "px";
      canvasEl.style.height = rect.height + "px";
      particles = Array.from({ length: 16 }, () => spawnParticle(rect));
      drawChaosStatic();
    }

    function paintParticle(p: Particle) {
      if (!ctx) return;
      ctx.font = p.size + "px 'IBM Plex Mono', monospace";
      ctx.fillStyle = "rgba(243,238,224," + p.alpha + ")";
      ctx.fillText(p.text, p.x, p.y);
    }

    function drawChaosStatic() {
      if (!ctx) return;
      const rect = scenes[0].getBoundingClientRect();
      const dpr = window.devicePixelRatio || 1;
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
      ctx.clearRect(0, 0, rect.width, rect.height);
      particles.forEach(paintParticle);
    }

    function chaosFrame() {
      if (!chaosRunning || !ctx) return;
      const rect = scenes[0].getBoundingClientRect();
      const dpr = window.devicePixelRatio || 1;
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
      ctx.clearRect(0, 0, rect.width, rect.height);
      particles.forEach((p) => {
        p.x += p.vx;
        p.y += p.vy;
        if (p.y > rect.height + 10) {
          p.y = -10;
          p.x = Math.random() * rect.width;
        }
        if (p.x < -40) p.x = rect.width + 40;
        if (p.x > rect.width + 40) p.x = -40;
        paintParticle(p);
      });
      rafId = requestAnimationFrame(chaosFrame);
    }

    window.addEventListener("resize", sizeCanvas);
    sizeCanvas();
    goTo(0, { silent: false });

    return () => {
      clearTimer();
      chaosRunning = false;
      if (rafId) cancelAnimationFrame(rafId);
      if (holdTimer) clearTimeout(holdTimer);
      stageEl.removeEventListener("pointerdown", onPointerDown);
      stageEl.removeEventListener("pointerup", onPointerUp);
      stageEl.removeEventListener("pointercancel", onPointerCancel);
      replayBtn?.removeEventListener("click", onReplayClick);
      closeBtn?.removeEventListener("click", closeToHome);
      ctaButton?.removeEventListener("click", onCtaClick);
      reelEl.removeEventListener("keydown", onKeyDown);
      document.removeEventListener("visibilitychange", onVisibilityChange);
      window.removeEventListener("resize", sizeCanvas);
    };
  }, [router]);

  return (
    <>
      <link rel="preconnect" href="https://fonts.googleapis.com" />
      <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
      <link
        href="https://fonts.googleapis.com/css2?family=Fraunces:opsz,wght@9..144,500;9..144,600;9..144,700&family=Inter:wght@400;500;600;700&family=IBM+Plex+Mono:wght@400;500;600&display=swap"
        rel="stylesheet"
      />
      <div dangerouslySetInnerHTML={{ __html: REEL_MARKUP }} />
    </>
  );
}
