"use client";

import type { ReactNode } from "react";
import type { CustomizationFormData, Gender } from "@/lib/customization";

type InfoStepProps = {
  formData: CustomizationFormData;
  onFormDataChange: (patch: Partial<CustomizationFormData>) => void;
  onPrevious: () => void;
  onNext: () => void;
};

const sx = (value: number) => `${(value / 393) * 100}%`;
const sy = (value: number) => `${(value / 852) * 100}%`;

const SOURCE_HAN =
  'var(--font-source-han-sans), "Source Han Sans SC", "Noto Sans SC", sans-serif';

/** 与第三页「上传宠物照片」标题色调一致 */
const TEXT_PRIMARY = "#2C5282";
const TEXT_SECONDARY = "rgb(74 144 196 / 0.85)";

const inputClass =
  "w-full rounded-lg border border-[#81D5FA] bg-[#FFFEF8] px-3 py-2 text-[13px] outline-none placeholder:text-[#4A90C4]/85 focus:border-[#4A90C4]";

type FieldProps = {
  label: string;
  children: ReactNode;
};

function Field({ label, children }: FieldProps) {
  return (
    <div className="space-y-1">
      <label
        className="block text-[13px] font-semibold"
        style={{ fontFamily: SOURCE_HAN, color: TEXT_PRIMARY }}
      >
        {label}
      </label>
      {children}
    </div>
  );
}

/**
 * Step 4 — fill in pet info
 * layer1 bg -> layer2 header -> HTML form -> CSS buttons
 */
export function InfoStep({
  formData,
  onFormDataChange,
  onPrevious,
  onNext,
}: InfoStepProps) {
  return (
    <div className="absolute inset-0 overflow-hidden">
      {/* layer 1: composite bg */}
      <div className="absolute inset-0 z-0" aria-hidden>
        <img
          src="/info-layers/layer-1-bg.png"
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

      {/* interactive form */}
      <div
        className="absolute z-[3] overflow-y-auto"
        style={{
          left: sx(52),
          right: sx(59),
          top: sy(200),
          bottom: sy(108),
          fontFamily: SOURCE_HAN,
        }}
      >
        <div className="text-center">
          <p
            className="text-[20px] font-bold leading-tight"
            style={{ color: TEXT_PRIMARY }}
          >
            填写信息
          </p>
          <p
            className="mt-0.5 text-[14px] leading-snug"
            style={{ color: TEXT_SECONDARY }}
          >
            请填写宠物的基本信息
          </p>
        </div>

        <div className="mt-4 space-y-3">
          <Field label="宠物名字">
            <input
              type="text"
              placeholder="请输入宠物的名字"
              className={inputClass}
              style={{ color: TEXT_PRIMARY }}
              value={formData.petName}
              onChange={(event) =>
                onFormDataChange({ petName: event.target.value })
              }
            />
          </Field>

          <Field label="性别">
            <div className="grid grid-cols-2 gap-2">
              {(
                [
                  ["male", "男"],
                  ["female", "女"],
                ] as const
              ).map(([value, label]) => (
                <button
                  key={value}
                  type="button"
                  aria-pressed={formData.gender === value}
                  onClick={() => onFormDataChange({ gender: value as Gender })}
                  className={`flex items-center gap-2 rounded-lg border px-3 py-2 text-[13px] transition-colors ${
                    formData.gender === value
                      ? "border-[#4A90C4] bg-[#F0FAFF]"
                      : "border-[#81D5FA] bg-[#FFFEF8]"
                  }`}
                  style={{
                    color:
                      formData.gender === value ? TEXT_PRIMARY : TEXT_SECONDARY,
                  }}
                >
                  <span
                    className={`flex h-[16px] w-[16px] items-center justify-center rounded-full border ${
                      formData.gender === value
                        ? "border-[#4A90C4] bg-[#4A90C4]"
                        : "border-[#81D5FA] bg-white"
                    }`}
                    aria-hidden
                  >
                    {formData.gender === value ? (
                      <span className="h-[6px] w-[6px] rounded-full bg-white" />
                    ) : null}
                  </span>
                  {label}
                </button>
              ))}
            </div>
          </Field>

          <Field label="生日">
            <input
              type="text"
              placeholder="年/月/日"
              className={inputClass}
              style={{ color: TEXT_PRIMARY }}
              value={formData.birthday}
              onChange={(event) =>
                onFormDataChange({ birthday: event.target.value })
              }
            />
          </Field>

          <Field label="主人电话">
            <input
              type="tel"
              placeholder="请输入主人电话"
              className={inputClass}
              style={{ color: TEXT_PRIMARY }}
              value={formData.ownerPhone}
              onChange={(event) =>
                onFormDataChange({ ownerPhone: event.target.value })
              }
            />
          </Field>

          <Field label="主人名字">
            <input
              type="text"
              placeholder="请输入主人的名字"
              className={inputClass}
              style={{ color: TEXT_PRIMARY }}
              value={formData.ownerName}
              onChange={(event) =>
                onFormDataChange({ ownerName: event.target.value })
              }
            />
          </Field>
        </div>
      </div>

      <button
        type="button"
        aria-label="上一步"
        onClick={onPrevious}
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
        aria-label="下一步"
        onClick={onNext}
        className="absolute z-10 flex items-center justify-center rounded-full bg-[#81D5FA] text-[15px] font-medium text-white shadow-sm transition-opacity hover:opacity-90 active:scale-[0.99]"
        style={{
          left: "53.69%",
          right: "11.45%",
          top: "86.62%",
          bottom: "9.15%",
          fontFamily: SOURCE_HAN,
        }}
      >
        下一步
      </button>

      <p
        className="pointer-events-none absolute z-10 w-full text-center text-[12px] font-medium text-[#4A90C4]"
        style={{ bottom: sy(28), fontFamily: SOURCE_HAN }}
      >
        第3步 · 共4步
      </p>
    </div>
  );
}
