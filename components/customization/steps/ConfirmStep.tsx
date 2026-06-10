"use client";

import { useState } from "react";
import { KnownDetailsAcknowledge } from "../ui/KnownDetailsAcknowledge";

type ConfirmStepProps = {
  onPrevious: () => void;
  onSubmit: () => void;
  isSubmitting: boolean;
  submitError: string | null;
  submitSuccess: boolean;
};

const sx = (value: number) => `${(value / 393) * 100}%`;
const sy = (value: number) => `${(value / 852) * 100}%`;

const SOURCE_HAN =
  'var(--font-source-han-sans), "Source Han Sans SC", "Noto Sans SC", sans-serif';

/** 与第三页标题色调一致 */
const TEXT_PRIMARY = "#2C5282";
const TEXT_SECONDARY = "rgb(74 144 196 / 0.85)";

const TERMS = [
  "定制内容一经提交，无法修改",
  "文字 / 电话错误由买家自行承担",
  "刻字内容不超过 12 个字符",
  "定制产品非质量问题不退不换",
] as const;

/**
 * Step 5 — confirm submission
 */
export function ConfirmStep({
  onPrevious,
  onSubmit,
  isSubmitting,
  submitError,
  submitSuccess,
}: ConfirmStepProps) {
  const [termsAcknowledged, setTermsAcknowledged] = useState(false);
  const canSubmit = termsAcknowledged && !isSubmitting && !submitSuccess;

  return (
    <div className="absolute inset-0 overflow-hidden">
      <div className="absolute inset-0 z-0" aria-hidden>
        <img
          src="/confirm-layers/layer-1-bg.png"
          alt=""
          className="h-full w-full object-cover object-top"
          draggable={false}
        />
      </div>

      {/* page header */}
      <div
        className="pointer-events-none absolute z-[2] w-full text-center text-[#81D5FA]"
        style={{ top: sy(96), fontFamily: SOURCE_HAN }}
      >
        <p className="text-[22px] font-medium leading-tight">定制宠物产品</p>
        <p className="mt-0.5 text-[13px] leading-snug">为您的宠物打造专属产品</p>
      </div>

      <div
        className="absolute z-[3]"
        style={{
          left: sx(52),
          right: sx(59),
          top: sy(270),
          bottom: sy(108),
          fontFamily: SOURCE_HAN,
        }}
      >
        <div className="text-center">
          <p
            className="text-[20px] font-bold leading-tight"
            style={{ color: TEXT_PRIMARY }}
          >
            定制详情
          </p>
          <p
            className="mt-0.5 text-[14px] leading-snug"
            style={{ color: TEXT_SECONDARY }}
          >
            请仔细阅读以下须知
          </p>
        </div>

        <div className="mt-5 flex justify-center">
          <ol className="space-y-4">
            {TERMS.map((term, index) => (
              <li key={term} className="flex items-center gap-3">
                <span
                  className="flex h-[22px] w-[22px] shrink-0 items-center justify-center rounded-full bg-[#81D5FA] text-[12px] font-semibold leading-none text-white"
                  aria-hidden
                >
                  {index + 1}
                </span>
                <span
                  className="text-left text-[13px] leading-[22px]"
                  style={{ color: TEXT_PRIMARY }}
                >
                  {term}
                </span>
              </li>
            ))}
          </ol>
        </div>

        <KnownDetailsAcknowledge
          checked={termsAcknowledged}
          onChange={setTermsAcknowledged}
          disabled={isSubmitting || submitSuccess}
        />

        {submitSuccess ? (
          <p
            className="mt-4 text-center text-[13px] font-medium text-[#16A34A]"
            role="status"
          >
            提交成功！我们会尽快为您制作。
          </p>
        ) : null}

        {submitError ? (
          <p
            className="mt-4 text-center text-[13px] text-[#EF4444]"
            role="alert"
          >
            {submitError}
          </p>
        ) : null}
      </div>

      <button
        type="button"
        aria-label="上一步"
        onClick={onPrevious}
        disabled={isSubmitting}
        className="absolute z-10 flex items-center justify-center rounded-full border-2 border-[#81D5FA] bg-white text-[15px] font-medium text-[#81D5FA] shadow-sm transition-opacity hover:opacity-90 active:scale-[0.99]"
        style={{
          left: "11.70%",
          right: "53.44%",
          top: "86.62%",
          bottom: "9.15%",
          fontFamily: SOURCE_HAN,
        }}
      >
        上一步
      </button>
      <button
        type="button"
        aria-label="确定提交"
        onClick={onSubmit}
        disabled={!canSubmit}
        aria-disabled={!canSubmit}
        className="absolute z-10 flex items-center justify-center rounded-full bg-[#81D5FA] text-[15px] font-medium text-white shadow-sm transition-opacity hover:opacity-90 active:scale-[0.99] disabled:cursor-not-allowed disabled:opacity-50"
        style={{
          left: "53.69%",
          right: "11.45%",
          top: "86.62%",
          bottom: "9.15%",
          fontFamily: SOURCE_HAN,
        }}
      >
        {isSubmitting ? "提交中…" : submitSuccess ? "已提交" : "确定提交"}
      </button>

      <p
        className="pointer-events-none absolute z-10 w-full text-center text-[12px] font-medium text-[#4A90C4]"
        style={{ bottom: sy(28), fontFamily: SOURCE_HAN }}
      >
        第4步 · 共4步
      </p>
    </div>
  );
}
