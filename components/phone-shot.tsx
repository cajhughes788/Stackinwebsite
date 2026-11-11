export type Screenshot = { src: string; alt: string; width: number; height: number };

// A real screen from the 521 app, presented the way the hero mockup is: a dark
// bezel with a status bar, a soft green glow behind, and the bottom fading out
// as if the phone carries on below. Short, wide crops (a single card) would
// look squashed in a phone, so they float as a glass card instead.
//
// Every screenshot ships as a 720px WebP with a 360px twin ("-360"), so 1x
// screens fetch about a third of the bytes. The frame is at most 22rem wide.
export function PhoneShot({ shot, className = "" }: { shot: Screenshot; className?: string }) {
  const isPhone = shot.height / shot.width > 1;

  const img = (
    // Static export: images are served as-is, so a plain img is right here.
    // eslint-disable-next-line @next/next/no-img-element
    <img
      src={shot.src}
      alt={shot.alt}
      srcSet={`${shot.src.replace(/\.webp$/, "-360.webp")} 360w, ${shot.src} 720w`}
      sizes="(min-width: 384px) 330px, calc(100vw - 54px)"
      width={shot.width}
      height={shot.height}
      loading="lazy"
      decoding="async"
      className="block h-auto w-full"
    />
  );

  return (
    <figure className={`relative isolate w-full max-w-[22rem] ${className}`}>
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-x-[-15%] top-[15%] -z-10 h-[70%] rounded-full bg-primary/[0.13] blur-[70px]"
      />

      {isPhone ? (
        <div className="rounded-t-[2.75rem] border border-b-0 border-white/[0.09] bg-gradient-to-b from-[#232a2e] to-[#0e1214] p-2.5 pb-0 shadow-[0_50px_120px_-50px_rgba(0,0,0,0.9)] [mask-image:linear-gradient(to_bottom,#000_78%,transparent)]">
          <div className="overflow-hidden rounded-t-[2.25rem] bg-background">
            <div className="flex items-center justify-between px-6 pb-2 pt-3.5 text-[11px] font-medium tabular-nums text-foreground/80">
              <span>9:41</span>
              <span className="h-[22px] w-[84px] rounded-full bg-[#0e1214]" />
              <span className="tracking-widest">•••</span>
            </div>
            {img}
            {/* Empty screen below the shot, so the fade never eats real content. */}
            <div className="h-20" />
          </div>
        </div>
      ) : (
        <div className="overflow-hidden rounded-[1.75rem] border border-white/[0.09] bg-gradient-to-b from-[#20272b] to-[#14191c] p-2 shadow-[0_40px_100px_-45px_rgba(0,0,0,0.9)]">
          <div className="overflow-hidden rounded-[1.35rem]">{img}</div>
        </div>
      )}
    </figure>
  );
}
