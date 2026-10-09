"use client";

export type StackInLoaderWebProps = {
  className?: string;
  label?: string;
  showLabel?: boolean;
  size?: number;
  background?: string;
  cardBackground?: string;
  textColor?: string;
};

// The StackIn mark: three stacked bars, each a short left cap and a long body.
const MARK_BARS = [
  {
    fill: "#FFFFFF",
    d: "M26 75H17A7 7 0 0 0 10 82V103A7 7 0 0 0 17 110H26ZM31 75H145A7 7 0 0 1 152 82V103A7 7 0 0 1 145 110H31Z",
  },
  {
    fill: "#C5CCD5",
    d: "M19 38H7A7 7 0 0 0 0 45V66A7 7 0 0 0 7 73H19ZM24 38H133A7 7 0 0 1 140 45V66A7 7 0 0 1 133 73H24Z",
  },
  {
    fill: "#2BAE8A",
    d: "M30 0H18A7 7 0 0 0 11 7V28A7 7 0 0 0 18 35H30ZM35 0H148A7 7 0 0 1 155 7V28A7 7 0 0 1 148 35H35Z",
  },
];

const WRAPPER_STYLE = `
.stackin-loader-web__shell {
  display: inline-flex;
  width: 100%;
  justify-content: center;
}

.stackin-loader-web {
  width: 100%;
  max-width: var(--stackin-loader-size);
  position: relative;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 0.75rem;
  border-radius: 2rem;
  padding: 1.5rem 2rem;
}

.stackin-loader-web__art {
  position: relative;
  z-index: 1;
  display: flex;
  width: 45%;
  aspect-ratio: 155 / 150;
  align-items: flex-end;
  justify-content: center;
}

.stackin-loader-web__svg {
  width: 100%;
  height: 100%;
  overflow: visible;
}

.stackin-loader-web__label {
  position: relative;
  z-index: 1;
  margin: 0;
  font-size: 0.875rem;
  font-weight: 500;
}

.stackin-loader-web__bar {
  opacity: 0;
  animation: stackin-loader-web-stack 2.4s cubic-bezier(0.3, 1.3, 0.5, 1) infinite;
}

.stackin-loader-web__bar--1 {
  animation-delay: 0s;
}

.stackin-loader-web__bar--2 {
  animation-delay: 0.15s;
}

.stackin-loader-web__bar--3 {
  animation-delay: 0.3s;
}

@keyframes stackin-loader-web-stack {
  0% {
    opacity: 0;
    transform: translateY(-40px);
  }
  18% {
    opacity: 1;
    transform: translateY(0);
  }
  78% {
    opacity: 1;
    transform: translateY(0);
  }
  90%,
  100% {
    opacity: 0;
    transform: translateY(0);
  }
}

@media (prefers-reduced-motion: reduce) {
  .stackin-loader-web__bar {
    opacity: 1;
    animation: none;
  }
}
`;

export default function StackInLoaderWeb({
  className,
  label = "Loading StackIn...",
  showLabel = true,
  size = 260,
  background = "transparent",
  cardBackground = "#000000",
  textColor = "#2BAE8A",
}: StackInLoaderWebProps) {
  return (
    <div
      className={["stackin-loader-web__shell", className].filter(Boolean).join(" ")}
      style={{
        background,
        ["--stackin-loader-size" as string]: `${size}px`,
      }}
    >
      <style>{WRAPPER_STYLE}</style>

      <div className="stackin-loader-web" style={{ background: cardBackground }}>
        <div className="stackin-loader-web__art">
          <svg
            viewBox="0 -40 155 150"
            role="img"
            aria-label={label}
            className="stackin-loader-web__svg"
          >
            {MARK_BARS.map((bar, index) => (
              <path
                key={bar.fill}
                d={bar.d}
                fill={bar.fill}
                className={`stackin-loader-web__bar stackin-loader-web__bar--${index + 1}`}
              />
            ))}
          </svg>
        </div>

        {showLabel ? (
          <p
            className="stackin-loader-web__label"
            style={{
              color: textColor,
              textShadow: "0 0 10px rgba(43,174,138,0.22)",
            }}
          >
            {label}
          </p>
        ) : null}
      </div>
    </div>
  );
}
