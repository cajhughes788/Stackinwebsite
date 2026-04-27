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
      className={
        fullscreen
          ? "fixed inset-0 z-50 flex items-center justify-center bg-background/88 px-4 py-6 backdrop-blur-md sm:px-6"
          : "absolute inset-0 z-20 flex items-center justify-center rounded-[inherit] bg-background/88 px-4 py-6 backdrop-blur-md sm:px-6"
      }
    >
      <div className="flex w-full max-w-sm flex-col items-center text-center">
        <StackInLoaderWeb
          label={label}
          size={220}
          background="transparent"
          cardBackground="rgba(0,0,0,0)"
          className="max-w-[11.25rem] sm:max-w-[13.75rem]"
        />
        {description ? <p className="mt-2 text-sm text-muted-foreground">{description}</p> : null}
      </div>
    </div>
  );
}
