"use client";

import { useEffect, useState } from "react";
import { createPortal } from "react-dom";
import { Maximize2, X } from "lucide-react";

export function ReelPreview() {
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

  return (
    <>
      <div className="relative">
        <div className="absolute -inset-4 rounded-3xl bg-primary/20 blur-2xl" />

        <div className="relative rounded-3xl border border-border bg-card/80 p-3 shadow-2xl backdrop-blur-xl">
          <button
            type="button"
            onClick={() => setIsFullscreen(true)}
            className="absolute right-5 top-5 z-10 flex h-9 w-9 items-center justify-center rounded-full border border-border bg-background/70 text-foreground backdrop-blur-sm transition-colors hover:bg-background"
            aria-label="View reel full screen"
          >
            <Maximize2 className="h-4 w-4" />
          </button>

          <div className="relative aspect-[1242/2147] overflow-hidden rounded-[1.65rem] bg-[#0d1512]">
            <iframe
              src="/reel/"
              title="StackIn promo reel"
              className="absolute inset-0 h-full w-full border-0"
            />
          </div>
        </div>
      </div>

      {isFullscreen &&
        createPortal(
          <div className="fixed inset-0 z-[100] bg-[#0d1512]">
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
              title="StackIn promo reel, full screen"
              className="h-full w-full border-0"
            />
          </div>,
          document.body
        )}
    </>
  );
}
