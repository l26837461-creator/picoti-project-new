"use client";

import { useId } from "react";
import { TORN_BOTTOM_PATH, TORN_TOP_PATH } from "./torn-paths";

type TornPaperEdgeProps = {
  position: "top" | "bottom";
  className?: string;
};

export function TornPaperEdge({
  position,
  className = "block h-7 w-full shrink-0",
}: TornPaperEdgeProps) {
  const uid = useId().replace(/:/g, "");
  const filterId = `torn-fray-${position}-${uid}`;
  const path = position === "top" ? TORN_TOP_PATH : TORN_BOTTOM_PATH;

  return (
    <svg
      viewBox="0 0 375 28"
      preserveAspectRatio="none"
      className={className}
      aria-hidden
    >
      <defs>
        <filter
          id={filterId}
          x="-3%"
          y="-25%"
          width="106%"
          height="150%"
          colorInterpolationFilters="sRGB"
        >
          <feTurbulence
            type="fractalNoise"
            baseFrequency="0.16 0.9"
            numOctaves={4}
            seed={position === "top" ? 8 : 14}
            result="noise"
          />
          <feDisplacementMap
            in="SourceGraphic"
            in2="noise"
            scale={2.8}
            xChannelSelector="R"
            yChannelSelector="G"
          />
        </filter>
      </defs>
      <path d={path} fill="#ffffff" filter={`url(#${filterId})`} />
    </svg>
  );
}
