"use client";

import { useEffect, useRef, useState } from "react";
import { usePathname } from "next/navigation";
import { Check, Copy, X } from "lucide-react";
import { Button } from "@/components/ui/button";

// Launch promo. Flip PROMO_ACTIVE to false (or change the code) when it ends.
// Bumping DISMISS_KEY shows the popup again to people who closed an older one.
const PROMO_ACTIVE = true;
const PROMO_CODE = "FIRST50";
const DISMISS_KEY = "521-promo-first50-dismissed";
const SHOW_DELAY_MS = 1500;

// Pages where an interruption would get in the way.
const HIDDEN_PATHS = ["/checkout", "/login", "/signup", "/privacy", "/terms"];

function readDismissed() {
  try {
    return window.localStorage.getItem(DISMISS_KEY) === "1";
  } catch {
    return false;
  }
}

function writeDismissed() {
  try {
    window.localStorage.setItem(DISMISS_KEY, "1");
  } catch {
    // Private mode or blocked storage: the popup just shows again next visit.
  }
}

export function PromoPopup() {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);
  const [copied, setCopied] = useState(false);
  const closeRef = useRef<HTMLButtonElement>(null);

  const hiddenHere = HIDDEN_PATHS.some((p) => pathname?.startsWith(p));

  function dismiss() {
    writeDismissed();
    setOpen(false);
  }

  useEffect(() => {
    if (!PROMO_ACTIVE || hiddenHere || readDismissed()) return;
    const timer = window.setTimeout(() => setOpen(true), SHOW_DELAY_MS);
    return () => window.clearTimeout(timer);
  }, [hiddenHere]);

  useEffect(() => {
    if (!open) return;
    closeRef.current?.focus();
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") dismiss();
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [open]);

  async function copyCode() {
    try {
      await navigator.clipboard.writeText(PROMO_CODE);
      setCopied(true);
      window.setTimeout(() => setCopied(false), 2000);
    } catch {
      // Clipboard blocked; the code is still visible to type by hand.
    }
  }

  function claim() {
    dismiss();
    if (pathname === "/") {
      document.getElementById("pricing")?.scrollIntoView({ behavior: "smooth" });
    } else {
      window.location.href = "/#pricing";
    }
  }

  if (!open) return null;

  return (
    <div
      className="fixed inset-0 z-[100] flex items-end justify-center bg-black/60 p-4 backdrop-blur-sm animate-in fade-in duration-300 sm:items-center"
      onClick={dismiss}
    >
      <div
        role="dialog"
        aria-modal="true"
        aria-labelledby="promo-title"
        aria-describedby="promo-desc"
        className="relative w-full max-w-md rounded-2xl border border-border bg-card p-8 shadow-2xl animate-in slide-in-from-bottom-4 duration-300"
        onClick={(e) => e.stopPropagation()}
      >
        <button
          ref={closeRef}
          type="button"
          onClick={dismiss}
          aria-label="Close"
          className="absolute right-4 top-4 rounded-full p-1.5 text-muted-foreground transition-colors hover:bg-secondary hover:text-foreground"
        >
          <X className="h-4 w-4" />
        </button>

        <span className="eyebrow section-label mb-4">Limited time</span>
        <h2 id="promo-title" className="mb-3 text-3xl font-normal leading-tight text-foreground">
          Get your first year free
        </h2>
        <p id="promo-desc" className="mb-6 text-sm text-muted-foreground">
          Use this code at checkout on Pro or Complete for a full year of 521, free. While it lasts.
        </p>

        <button
          type="button"
          onClick={copyCode}
          className="mb-6 flex w-full items-center justify-between rounded-xl border border-dashed border-primary/60 bg-background px-5 py-4 text-left transition-colors hover:border-primary"
          aria-label={`Copy promo code ${PROMO_CODE}`}
        >
          <span className="font-mono text-2xl tracking-[0.2em] text-foreground">{PROMO_CODE}</span>
          <span className="flex items-center gap-1.5 text-xs text-muted-foreground">
            {copied ? (
              <>
                <Check className="h-4 w-4 text-primary" /> Copied
              </>
            ) : (
              <>
                <Copy className="h-4 w-4" /> Copy
              </>
            )}
          </span>
        </button>

        <Button onClick={claim} className="h-11 w-full">
          Claim my free year
        </Button>
        <button
          type="button"
          onClick={dismiss}
          className="mt-3 w-full text-center text-xs text-muted-foreground hover:text-foreground"
        >
          No thanks
        </button>
      </div>
    </div>
  );
}
