"use client";

type WelcomeStepProps = {
  onStart: () => void;
};

const FULL_FRAME =
  "pointer-events-none absolute inset-0 h-full w-full object-cover object-top";

const SOURCE_HAN =
  'var(--font-source-han-sans), "Source Han Sans SC", "Noto Sans SC", sans-serif';

/**
 * Picati welcome — layered PNGs + HTML copy in Source Han Sans.
 * Logo PNG keeps Picoti lettering; all other text is HTML.
 */
export function WelcomeStep({ onStart }: WelcomeStepProps) {
  return (
    <div className="absolute inset-0 overflow-hidden bg-[#A3D9FF]">
      {/* layer 1: torn paper background */}
      <img
        src="/welcome-layers/layer-1-bg.png"
        alt=""
        className={`${FULL_FRAME} z-0`}
        draggable={false}
      />

      {/* layer 2: Picoti logo only (keep original lettering) */}
      <img
        src="/welcome-layers/layer-2-logo.png"
        alt=""
        className={`${FULL_FRAME} z-[1] mix-blend-multiply`}
        draggable={false}
      />

      {/* layer 3: headline image (yellow brush + text) */}
      <img
        src="/welcome-layers/layer-3-headline.png"
        alt=""
        className={`${FULL_FRAME} z-[2] mix-blend-multiply`}
        draggable={false}
      />

      <div
        className="pointer-events-none absolute z-[2] text-center text-[#81D5FA]"
        style={{
          left: "17.8%",
          right: "17.6%",
          top: "47.2%",
          fontFamily: SOURCE_HAN,
        }}
      >
        <p className="text-[14px] font-normal leading-relaxed">
          只需要简单几步，即可为您的宠物打造
        </p>
        <p className="mt-1 flex items-center justify-center gap-1 text-[14px] font-normal leading-relaxed">
          独一无二的产品
          <img
            src="/paw.png"
            alt=""
            width={16}
            height={16}
            className="inline-block"
            draggable={false}
          />
        </p>
      </div>

      {/* CTA button */}
      <button
        type="button"
        onClick={onStart}
        aria-label="开始产品定制"
        className="absolute z-10 flex items-center justify-center rounded-lg bg-[#FFF176] text-[20px] font-normal text-[#81D5FA] transition-opacity hover:opacity-90 active:scale-[0.99]"
        style={{
          left: "18.58%",
          right: "13.49%",
          top: "84.62%",
          bottom: "9.62%",
          fontFamily: SOURCE_HAN,
        }}
      >
        开始产品定制
      </button>
    </div>
  );
}
