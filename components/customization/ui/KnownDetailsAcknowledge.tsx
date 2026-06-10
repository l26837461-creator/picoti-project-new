"use client";

const SOURCE_HAN =
  'var(--font-source-han-sans), "Source Han Sans SC", "Noto Sans SC", sans-serif';

const TEXT_PRIMARY = "#2C5282";

type KnownDetailsAcknowledgeProps = {
  checked: boolean;
  onChange: (checked: boolean) => void;
  disabled?: boolean;
  label?: string;
};

/** 第五页 — 勾选「已知详情」后方可提交 */
export function KnownDetailsAcknowledge({
  checked,
  onChange,
  disabled = false,
  label = "我已知晓以上详情",
}: KnownDetailsAcknowledgeProps) {
  return (
    <label
      className={`mt-6 flex cursor-pointer items-center justify-center gap-2.5 select-none ${
        disabled ? "cursor-not-allowed opacity-60" : ""
      }`}
      style={{ fontFamily: SOURCE_HAN }}
    >
      <input
        type="checkbox"
        checked={checked}
        disabled={disabled}
        onChange={(event) => onChange(event.target.checked)}
        className="peer sr-only"
      />
      <span
        className={`flex h-[20px] w-[20px] shrink-0 items-center justify-center rounded border-2 transition-colors peer-focus-visible:ring-2 peer-focus-visible:ring-[#81D5FA] peer-focus-visible:ring-offset-1 ${
          checked
            ? "border-[#4A90C4] bg-[#4A90C4]"
            : "border-[#81D5FA] bg-white"
        }`}
        aria-hidden
      >
        {checked ? (
          <svg
            width="12"
            height="10"
            viewBox="0 0 12 10"
            fill="none"
            aria-hidden
          >
            <path
              d="M1 5L4.5 8.5L11 1.5"
              stroke="white"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
        ) : null}
      </span>
      <span
        className="text-[13px] font-medium leading-snug"
        style={{ color: TEXT_PRIMARY }}
      >
        {label}
      </span>
    </label>
  );
}
