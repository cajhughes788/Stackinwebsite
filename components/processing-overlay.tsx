"use client";

import StackInLoaderWeb from "@/components/stackin-loader-web";

type ProcessingOverlayProps = {
  open: boolean;
  label: string;
  description?: string;
};

export function ProcessingOverlay({ open, label, description }: ProcessingOverlayProps) {
  if (!open) {
    return null;
  }

  return (
    <div className="absolute inset-0 z-20 flex items-center justify-center rounded-[inherit] bg-background/88 p-6 backdrop-blur-md">
      <div className="flex max-w-sm flex-col items-center text-center">
        <StackInLoaderWeb
          label={label}
          size={220}
          background="transparent"
          cardBackground="rgba(0,0,0,0)"
        />
        {description ? (
          <p className="-mt-1 text-sm text-muted-foreground">{description}</p>
        ) : null}
      </div>
    </div>
  );
}
