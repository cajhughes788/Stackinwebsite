export type Screenshot = { src: string; alt: string; width: number; height: number };

/**
 * A moment on the screenshot the Features journey points at (a button being
 * pressed, a row being tapped): a green ring over `rect` (percent of the
 * image: left, top, width, height) that the scene lights while clip `at`
 * plays ("clip:from-to", the clip's own progress 0–1).
 */
export type ShotCue = { rect: [number, number, number, number]; at: string; round?: boolean };

// A real screen from the 521 app, presented the way the hero mockup is: a dark
// bezel with a status bar, a soft green glow behind, and the bottom fading out
// as if the phone carries on below. Short, wide crops (a single card) would
// look squashed in a phone, so they float as a glass card instead.
//
// Every screenshot ships as a 720px WebP with a 360px twin ("-360"), so 1x
// screens fetch about a third of the bytes. The frame is at most 22rem wide.
/**
 * Ties to the Features journey (components/features/scene/journey-scene.tsx):
 * `morph` names the screen so a piece of it can lift off into the scene,
 * `hole` is the patch left where it lifted from (percent rect and the
 * screen's colour there), and `overlay` is a second screen the phone switches
 * to at a point in the journey ("clip:at"), like Charge showing its QR.
 */
export type ShotMorph = {
  morph?: string;
  hole?: { rect: [number, number, number, number]; color: string };
  overlay?: { src: string; at: string };
};

export function PhoneShot({
  shot,
  cue,
  morph,
  className = "",
}: {
  shot: Screenshot;
  cue?: ShotCue;
  morph?: ShotMorph;
  className?: string;
}) {
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
  const ring = cue ? (
    <span
      aria-hidden="true"
      data-scene-cue={cue.at}
      className={`scene-ring pointer-events-none absolute ${cue.round ? "rounded-full" : "rounded-[0.9rem]"}`}
      style={{ left: `${cue.rect[0]}%`, top: `${cue.rect[1]}%`, width: `${cue.rect[2]}%`, height: `${cue.rect[3]}%` }}
    />
  ) : null;
  const shotWithCue = (
    <div className="relative" data-morph-shot={morph?.morph}>
      {img}
      {morph?.overlay ? (
        // eslint-disable-next-line @next/next/no-img-element
        <img
          src={morph.overlay.src}
          srcSet={`${morph.overlay.src.replace(/\.webp$/, "-360.webp")} 360w, ${morph.overlay.src} 720w`}
          sizes="(min-width: 384px) 330px, calc(100vw - 54px)"
          alt=""
          aria-hidden="true"
          loading="lazy"
          data-scene-hold={morph.overlay.at}
          className="scene-overlay absolute inset-0 h-full w-full"
        />
      ) : null}
      {morph?.hole ? (
        <span
          aria-hidden="true"
          className="scene-hole pointer-events-none absolute rounded-[0.9rem]"
          style={{
            left: `${morph.hole.rect[0]}%`,
            top: `${morph.hole.rect[1]}%`,
            width: `${morph.hole.rect[2]}%`,
            height: `${morph.hole.rect[3]}%`,
            background: morph.hole.color,
          }}
        />
      ) : null}
      {ring}
    </div>
  );

  return (
    <figure className={`relative isolate w-full max-w-[22rem] ${className}`}>
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-x-[-15%] top-[15%] -z-10 h-[70%] rounded-full bg-primary/[0.13] blur-[70px]"
      />

      {isPhone ? (
        <div className="rounded-t-[2.75rem] border border-b-0 border-white/[0.09] bg-gradient-to-b from-[#232a2e] to-[#0e1214] p-2.5 pb-0 shadow-raised [mask-image:linear-gradient(to_bottom,#000_78%,transparent)]">
          <div className="overflow-hidden rounded-t-[2.25rem] bg-background">
            <div className="flex items-center justify-between px-6 pb-2 pt-3.5 text-[11px] font-medium tabular-nums text-foreground/80">
              <span>9:41</span>
              <span className="h-[22px] w-[84px] rounded-full bg-[#0e1214]" />
              <span className="tracking-widest">•••</span>
            </div>
            {shotWithCue}
            {/* Empty screen below the shot, so the fade never eats real content. */}
            <div className="h-20" />
          </div>
        </div>
      ) : (
        <div className="overflow-hidden rounded-[1.75rem] border border-white/[0.09] bg-gradient-to-b from-[#20272b] to-[#14191c] p-2 shadow-raised">
          <div className="overflow-hidden rounded-[1.35rem]">{shotWithCue}</div>
        </div>
      )}
    </figure>
  );
}
