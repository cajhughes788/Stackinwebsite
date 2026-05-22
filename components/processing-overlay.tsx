"use client";

import StackInLoaderWeb from "@/components/stackin-loader-web";

type ProcessingOverlayProps = {
  open: boolean;
  label: string;
  description?: string;
  fullscreen?: boolean;
};

export function ProcessingOverlay({
  open,
  label,
  description,
  fullscreen = false,
}: ProcessingOverlayProps) {
  if (!open) {
    return null;
  }

  return (
    <div
      style={
        fullscreen
          ? {
              paddingTop: "max(1.5rem, env(safe-area-inset-top))",
              paddingBottom: "max(1.5rem, env(safe-area-inset-bottom))",
            }
          : undefined
      }
      className={
        fullscreen
          ? "fixed inset-0 z-50 flex min-h-dvh items-center justify-center bg-background/88 px-4 backdrop-blur-md sm:px-6"
          : "absolute inset-0 z-20 flex items-center justify-center rounded-[inherit] bg-background/88 px-4 py-6 backdrop-blur-md sm:px-6"
      }
    >
      <div className="flex w-full max-w-xs flex-col items-center rounded-[1.75rem] border border-border/80 bg-card/85 px-5 py-6 text-center shadow-2xl shadow-black/25 sm:max-w-sm sm:px-6 sm:py-7">
        <StackInLoaderWeb
          label={label}
          size={200}
          background="transparent"
          cardBackground="rgba(0,0,0,0)"
          className="max-w-[10.5rem] sm:max-w-[12rem]"
        />
        {description ? <p className="mt-2 text-sm text-muted-foreground">{description}</p> : null}
      </div>
    </div>
  );
}
