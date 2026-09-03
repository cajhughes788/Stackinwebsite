"use client";

export function ReelPreview() {
  return (
    <div className="relative">
      <div className="absolute -inset-4 rounded-3xl bg-primary/20 blur-2xl" />

      <div className="relative rounded-3xl border border-border bg-card/80 p-3 shadow-2xl backdrop-blur-xl">
        <div className="relative aspect-[1242/2147] overflow-hidden rounded-[1.65rem] bg-[#0d1512]">
          <iframe
            src="/reel/"
            title="StackIn promo reel"
            className="absolute inset-0 h-full w-full border-0"
          />
        </div>
      </div>
    </div>
  );
}
