import type { ReactNode } from "react";
import { cn } from "@/lib/utils";

type AppFlowShellProps = {
  children: ReactNode;
  className?: string;
  contentClassName?: string;
};

export function AppFlowShell({
  children,
  className,
  contentClassName = "max-w-md",
}: AppFlowShellProps) {
  return (
    <main
      className={cn(
        "relative isolate flex min-h-dvh w-full items-center justify-center overflow-hidden bg-background px-4 sm:px-6",
        className,
      )}
      style={{
        paddingTop: "max(1.5rem, env(safe-area-inset-top))",
        paddingBottom: "max(1.5rem, env(safe-area-inset-bottom))",
      }}
    >
      <div
        className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_top,_rgba(201,255,99,0.14),_transparent_42%),linear-gradient(180deg,_rgba(255,255,255,0.02),_transparent_28%)]"
        aria-hidden="true"
      />
      <div
        className="pointer-events-none absolute left-1/2 top-0 h-72 w-72 -translate-x-1/2 rounded-full bg-primary/10 blur-3xl"
        aria-hidden="true"
      />
      <div className={cn("relative z-10 w-full", contentClassName)}>{children}</div>
    </main>
  );
}
