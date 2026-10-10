"use client";

export type BrandLoaderWebProps = {
  className?: string;
  label?: string;
  showLabel?: boolean;
  size?: number;
  background?: string;
  cardBackground?: string;
  textColor?: string;
};

// The 521 mark: three digits, the "1" lifted to make room for the green bar.
const MARK_DIGITS = [
  "M280.25 19.5Q193.25 19.5 130.375 -14.25Q67.5 -48 33.75 -104.75Q0 -161.5 0 -230.5H158.5Q158.5 -196.5 174.125 -171Q189.75 -145.5 217.75 -131.25Q245.75 -117 281.75 -117Q321.25 -117 349 -133.375Q376.75 -149.75 391.375 -178.375Q406 -207 406 -243.25Q406 -279.5 391.5 -308.25Q377 -337 349.625 -353.75Q322.25 -370.5 283.25 -370.5Q247.75 -370.5 218.75 -355.75Q189.75 -341 175 -318H21.75L58.75 -730H501.75V-589.5H123.75L186.75 -631.5L164.75 -395L126.75 -404.75Q156.5 -440.5 198.75 -465Q241 -489.5 310.5 -489.5Q390 -489.5 446.625 -457.25Q503.25 -425 533.875 -370.5Q564.5 -316 564.5 -248.75V-236.25Q564.5 -169 531.5 -110.75Q498.5 -52.5 435.125 -16.5Q371.75 19.5 280.25 19.5Z",
  "M609 0V-150Q609 -197 624.5 -232.125Q640 -267.25 674.375 -294.625Q708.75 -322 764.75 -346L882.25 -397Q927 -416.25 948.875 -444.125Q970.75 -472 970.75 -515Q970.75 -558.75 943.375 -586.875Q916 -615 864.5 -615Q812.5 -615 785.25 -586.125Q758 -557.25 758 -507.5H599.5Q599.5 -577.25 629.375 -632.5Q659.25 -687.75 718.125 -719.625Q777 -751.5 864.5 -751.5Q951.25 -751.5 1010 -720.75Q1068.75 -690 1099 -637.875Q1129.25 -585.75 1129.25 -521.25V-508.75Q1129.25 -425.25 1083.375 -370.5Q1037.5 -315.75 941.75 -274L824.25 -223Q794.75 -210.25 782.125 -196Q769.5 -181.75 769.5 -158V-108L730.75 -140.5H1130V0Z",
  "M1307.5 -127.75V-622L1351.5 -588H1165V-730H1471V-127.75Z",
];

const MARK_BAR = { x: 1185.7, y: -73.2, width: 285.3, height: 73.2 };

const WRAPPER_STYLE = `
.brand-loader-web__shell {
  display: inline-flex;
  width: 100%;
  justify-content: center;
}

.brand-loader-web {
  width: 100%;
  max-width: var(--brand-loader-size);
  position: relative;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 1rem;
  border-radius: 2rem;
  padding: 1.5rem 2rem;
}

.brand-loader-web__art {
  position: relative;
  z-index: 1;
  display: flex;
  width: 52%;
  aspect-ratio: 1471 / 771;
  align-items: flex-end;
  justify-content: center;
}

.brand-loader-web__svg {
  width: 100%;
  height: 100%;
  overflow: visible;
}

.brand-loader-web__label {
  position: relative;
  z-index: 1;
  margin: 0;
  font-size: 0.75rem;
  font-weight: 500;
  letter-spacing: 0.18em;
  text-transform: uppercase;
}

.brand-loader-web__digit {
  opacity: 0;
  animation: brand-loader-web-rise 2.4s cubic-bezier(0.3, 1.3, 0.5, 1) infinite;
}

.brand-loader-web__digit--1 {
  animation-delay: 0s;
}

.brand-loader-web__digit--2 {
  animation-delay: 0.12s;
}

.brand-loader-web__digit--3 {
  animation-delay: 0.24s;
}

.brand-loader-web__bar {
  transform-box: fill-box;
  transform-origin: left center;
  transform: scaleX(0);
  animation: brand-loader-web-bar 2.4s cubic-bezier(0.6, 0, 0.2, 1) infinite;
}

@keyframes brand-loader-web-rise {
  0% {
    opacity: 0;
    transform: translateY(160px);
  }
  18% {
    opacity: 1;
    transform: translateY(0);
  }
  80% {
    opacity: 1;
    transform: translateY(0);
  }
  92%,
  100% {
    opacity: 0;
    transform: translateY(0);
  }
}

@keyframes brand-loader-web-bar {
  0%,
  22% {
    transform: scaleX(0);
    opacity: 1;
  }
  40%,
  80% {
    transform: scaleX(1);
    opacity: 1;
  }
  92%,
  100% {
    transform: scaleX(1);
    opacity: 0;
  }
}

@media (prefers-reduced-motion: reduce) {
  .brand-loader-web__digit,
  .brand-loader-web__bar {
    opacity: 1;
    transform: none;
    animation: none;
  }
}
`;

export default function BrandLoaderWeb({
  className,
  label = "Loading 521...",
  showLabel = true,
  size = 260,
  background = "transparent",
  cardBackground = "#070a10",
  textColor = "#8b95a5",
}: BrandLoaderWebProps) {
  return (
    <div
      className={["brand-loader-web__shell", className].filter(Boolean).join(" ")}
      style={{
        background,
        ["--brand-loader-size" as string]: `${size}px`,
      }}
    >
      <style>{WRAPPER_STYLE}</style>

      <div className="brand-loader-web" style={{ background: cardBackground }}>
        <div className="brand-loader-web__art">
          <svg
            viewBox="0 -751.5 1471 771"
            role="img"
            aria-label={label}
            className="brand-loader-web__svg"
          >
            {MARK_DIGITS.map((d, index) => (
              <path
                key={index}
                d={d}
                fill="#ECEBE6"
                className={`brand-loader-web__digit brand-loader-web__digit--${index + 1}`}
              />
            ))}
            <rect {...MARK_BAR} fill="#2FA866" className="brand-loader-web__bar" />
          </svg>
        </div>

        {showLabel ? (
          <p className="brand-loader-web__label" style={{ color: textColor }}>
            {label}
          </p>
        ) : null}
      </div>
    </div>
  );
}
