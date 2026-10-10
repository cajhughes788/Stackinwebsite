"use client";

import { useEffect, useState } from "react";
import { createPortal } from "react-dom";
import { Play, X } from "lucide-react";

// Opens the promo reel full screen. The iframe only loads once someone asks for it.
export function ReelTour() {
  const [isFullscreen, setIsFullscreen] = useState(false);

  useEffect(() => {
    if (!isFullscreen) return;

    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";

    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") setIsFullscreen(false);
    };
    window.addEventListener("keydown", onKeyDown);

    return () => {
      document.body.style.overflow = previousOverflow;
      window.removeEventListener("keydown", onKeyDown);
    };
  }, [isFullscreen]);

  useEffect(() => {
    const onMessage = (event: MessageEvent) => {
      if (event.origin !== window.location.origin) return;
      if (event.data?.type === "521-reel:start-free") {
        setIsFullscreen(false);
      }
    };
    window.addEventListener("message", onMessage);
    return () => window.removeEventListener("message", onMessage);
  }, []);

  return (
    <>
      <button
        type="button"
        onClick={() => setIsFullscreen(true)}
        className="group inline-flex items-center gap-3 text-sm text-muted-foreground transition-colors hover:text-foreground"
      >
        <span className="flex h-9 w-9 items-center justify-center rounded-full border border-border transition-colors group-hover:border-foreground/40">
          <Play className="h-3.5 w-3.5 translate-x-px fill-current" />
        </span>
        Watch the tour
      </button>

      {isFullscreen &&
        createPortal(
          <div className="fixed inset-0 z-[100] bg-[#070a10]">
            <button
              type="button"
              onClick={() => setIsFullscreen(false)}
              className="absolute right-4 z-10 flex h-9 w-9 items-center justify-center rounded-full border border-white/20 bg-black/40 text-white backdrop-blur-sm transition-colors hover:bg-black/60"
              style={{ top: "calc(env(safe-area-inset-top, 0px) + 16px)" }}
              aria-label="Exit full screen"
            >
              <X className="h-5 w-5" />
            </button>

            <iframe
              src="/reel/"
              title="521 tour"
              className="h-full w-full border-0"
            />
          </div>,
          document.body
        )}
    </>
  );
}
