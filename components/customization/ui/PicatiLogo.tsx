type PicatiLogoProps = {
  className?: string;
};

/** Rounded bubbly “Picati” — Fredoka + cat-ear “c” + paw in “a” */
export function PicatiLogo({ className = "" }: PicatiLogoProps) {
  return (
    <div
      className={`picati-logo relative mx-auto w-fit select-none ${className}`}
      aria-label="Picati"
      role="img"
    >
      <span className="picati-logo__text inline-flex items-end gap-0 text-[56px] font-bold leading-[0.82] tracking-[-0.05em] text-[var(--petity-sky)]">
        <span>Pi</span>
        <span className="relative inline-block">
          <span
            className="pointer-events-none absolute -top-[12px] left-[2px] block h-[10px] w-[12px]"
            aria-hidden
          >
            <span className="absolute left-0 top-0 h-[10px] w-[5px] rotate-[-32deg] rounded-full bg-[var(--petity-sky)]" />
            <span className="absolute right-0 top-0 h-[10px] w-[5px] rotate-[32deg] rounded-full bg-[var(--petity-sky)]" />
          </span>
          c
        </span>
        <span className="relative inline-block w-[1.05em]">
          a
          <svg
            viewBox="0 0 20 18"
            className="pointer-events-none absolute left-[6px] top-[15px] h-[18px] w-[19px] text-[var(--petity-sky)]"
            aria-hidden
            fill="currentColor"
          >
            <ellipse cx="10" cy="12.5" rx="4.8" ry="4.2" />
            <circle cx="4.5" cy="5.5" r="3" />
            <circle cx="8.8" cy="2.8" r="3" />
            <circle cx="13" cy="3.2" r="3" />
            <circle cx="15.8" cy="6.8" r="2.8" />
          </svg>
        </span>
        <span>ti</span>
      </span>
    </div>
  );
}
