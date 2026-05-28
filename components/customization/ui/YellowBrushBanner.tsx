"use client";

import { useId } from "react";
import { YELLOW_BRUSH_PATH } from "./torn-paths";

type YellowBrushBannerProps = {
  children: React.ReactNode;
};

export function YellowBrushBanner({ children }: YellowBrushBannerProps) {
  const filterId = `yellow-brush-${useId().replace(/:/g, "")}`;

  return (
    <div className="relative mx-auto mt-6 h-[44px] w-[292px]">
      <svg
        viewBox="0 0 292 44"
        preserveAspectRatio="none"
        className="absolute inset-0 h-full w-full"
        aria-hidden
      >
        <defs>
          <filter
            id={filterId}
            x="-4%"
            y="-18%"
            width="108%"
            height="136%"
            colorInterpolationFilters="sRGB"
          >
            <feTurbulence
              type="fractalNoise"
              baseFrequency="0.12 0.75"
              numOctaves={3}
              seed={21}
              result="noise"
            />
            <feDisplacementMap
              in="SourceGraphic"
              in2="noise"
              scale={2}
              xChannelSelector="R"
              yChannelSelector="G"
            />
          </filter>
        </defs>
        <path
          d={YELLOW_BRUSH_PATH}
          fill="var(--petity-yellow-bright)"
          filter={`url(#${filterId})`}
        />
      </svg>
      <p className="relative z-10 flex h-full items-center justify-center px-5 text-center text-[15px] font-bold leading-tight tracking-wide text-[var(--petity-sky)]">
        {children}
      </p>
    </div>
  );
}
