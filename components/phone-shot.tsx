export type Screenshot = { src: string; alt: string; width: number; height: number };

// A real screen from the 521 app in a rounded frame. Every screenshot ships as
// a 720px WebP with a 360px twin ("-360"), so 1x screens fetch about a third of
// the bytes. The frame is at most 22rem wide, minus its padding and border.
export function PhoneShot({ shot, className = "" }: { shot: Screenshot; className?: string }) {
  return (
    <figure
      className={`w-full max-w-[22rem] overflow-hidden rounded-[1.75rem] border border-border bg-card p-2 shadow-[0_30px_80px_-40px_rgba(0,0,0,0.8)] ${className}`}
    >
      {/* Static export: images are served as-is, so a plain img is right here. */}
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img
        src={shot.src}
        alt={shot.alt}
        srcSet={`${shot.src.replace(/\.webp$/, "-360.webp")} 360w, ${shot.src} 720w`}
        sizes="(min-width: 384px) 334px, calc(100vw - 50px)"
        width={shot.width}
        height={shot.height}
        loading="lazy"
        decoding="async"
        className="h-auto w-full rounded-[1.25rem]"
      />
    </figure>
  );
}
