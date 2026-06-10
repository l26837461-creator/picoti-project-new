"use client";

import { useRef, useState } from "react";

type UploadStepProps = {
  photos: File[];
  onPhotosChange: (photos: File[]) => void;
  onPrevious: () => void;
  onNext: () => void;
};

const MAX_PHOTOS = 8;
const MIN_PHOTOS = 5;

/** 393×852 设计稿 → 百分比定位 */
const sx = (value: number) => `${(value / 393) * 100}%`;
const sy = (value: number) => `${(value / 852) * 100}%`;

/** Rectangle 14 — Figma 393×852 */
const UPLOAD_BOX = {
  width: 267,
  height: 289,
  top: 325,
  radius: 15,
} as const;

/** 框内元素（相对 393×852 画板坐标换算） */
const UPLOAD_ICON = {
  size: 97,
  top: 406 - UPLOAD_BOX.top,
} as const;

const UPLOAD_PRIMARY = {
  top: 537 - UPLOAD_BOX.top,
  fontSize: 20,
  lineHeight: 30,
} as const;

const UPLOAD_SECONDARY = {
  top: 564 - UPLOAD_BOX.top,
  fontSize: 13,
  lineHeight: 20,
} as const;

const inBoxTop = (px: number) => `${(px / UPLOAD_BOX.height) * 100}%`;
const inBoxSize = (px: number) => `${(px / UPLOAD_BOX.width) * 100}%`;

const SOURCE_HAN =
  'var(--font-source-han-sans), "Source Han Sans SC", "Noto Sans SC", sans-serif';

const FIGMA_TEXT_COLOR = "#1E3C60";

/** 与手机框同宽缩放，避免 calc(px) 偏左 */
const UPLOAD_BOX_CENTER = {
  left: "50%",
  width: sx(UPLOAD_BOX.width),
  transform: "translateX(-50%)",
} as const;

function UploadIcon() {
  return (
    <svg
      width="32"
      height="32"
      viewBox="0 0 24 24"
      fill="none"
      aria-hidden
      className="text-[#1E3C60]"
    >
      <path
        d="M12 16V4m0 0l-4 4m4-4l4 4"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M4 17v2a2 2 0 002 2h12a2 2 0 002-2v-2"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
      />
    </svg>
  );
}

/**
 * 第 3 页 — 上传宠物照片
 * 布局对齐第二页；底图 PNG 缺失时用 GinghamBackground yellow 兜底
 */
export function UploadStep({
  photos,
  onPhotosChange,
  onPrevious,
  onNext,
}: UploadStepProps) {
  const inputRef = useRef<HTMLInputElement>(null);
  const [isDragging, setIsDragging] = useState(false);
  const photoCount = photos.length;
  const canProceed = photoCount >= MIN_PHOTOS;

  const handleFiles = (files: FileList | null) => {
    if (!files?.length) return;
    const incoming = Array.from(files).filter((file) =>
      file.type.startsWith("image/"),
    );
    onPhotosChange([...photos, ...incoming].slice(0, MAX_PHOTOS));
  };

  const openFilePicker = () => inputRef.current?.click();

  return (
    <div className="absolute inset-0 overflow-hidden">
      {/* 若 public/upload-layers/layer-1-bg.png 存在则显示合成底图 */}
      <div className="absolute inset-0 z-0" aria-hidden>
        <img
          src="/upload-layers/layer-1-bg.png"
          alt=""
          className="h-full w-full object-cover object-top"
          draggable={false}
          onError={(event) => {
            event.currentTarget.style.display = "none";
          }}
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

      {/* card title — 框外上方，与上传框左对齐 */}
      <div
        className="pointer-events-none absolute z-[5] flex flex-col gap-0 text-left"
        style={{
          ...UPLOAD_BOX_CENTER,
          top: sy(268),
        }}
      >
        <p
          className="text-[17px] font-bold leading-snug text-[#2C5282]"
          style={{ fontFamily: SOURCE_HAN }}
        >
          上传宠物照片
        </p>
        <p
          className="mt-0.5 text-[12px] leading-snug text-[#4A90C4]/85"
          style={{ fontFamily: SOURCE_HAN }}
        >
          上传您的宠物照片用于定制产品
        </p>
      </div>

      {/* Rectangle 14 */}
      <button
        type="button"
        aria-label="点击或拖拽上传宠物照片"
        className={`absolute z-[4] border-2 border-dashed bg-white transition-colors active:scale-[0.99] ${
          isDragging
            ? "border-[#81D5FA] bg-[#F0FAFF]"
            : "border-[#9CA3AF] hover:border-[#81D5FA]"
        }`}
        style={{
          ...UPLOAD_BOX_CENTER,
          top: sy(UPLOAD_BOX.top),
          height: sy(UPLOAD_BOX.height),
          borderRadius: UPLOAD_BOX.radius,
          fontFamily: SOURCE_HAN,
        }}
        onClick={openFilePicker}
        onDragEnter={(event) => {
          event.preventDefault();
          setIsDragging(true);
        }}
        onDragOver={(event) => event.preventDefault()}
        onDragLeave={() => setIsDragging(false)}
        onDrop={(event) => {
          event.preventDefault();
          setIsDragging(false);
          handleFiles(event.dataTransfer.files);
        }}
      >
        <span
          className="absolute left-1/2 flex -translate-x-1/2 items-center justify-center rounded-full"
          style={{
            top: inBoxTop(UPLOAD_ICON.top),
            width: inBoxSize(UPLOAD_ICON.size),
            aspectRatio: "1",
            background: "#C7C7C7",
          }}
          aria-hidden
        >
          <UploadIcon />
        </span>
        <span
          className="absolute left-1/2 w-max max-w-full -translate-x-1/2 whitespace-nowrap text-center font-bold"
          style={{
            top: inBoxTop(UPLOAD_PRIMARY.top),
            fontSize: UPLOAD_PRIMARY.fontSize,
            lineHeight: `${UPLOAD_PRIMARY.lineHeight}px`,
            color: FIGMA_TEXT_COLOR,
          }}
        >
          点击或拖拽上传
        </span>
        <span
          className="absolute left-1/2 w-max max-w-full -translate-x-1/2 whitespace-nowrap text-center font-normal"
          style={{
            top: inBoxTop(UPLOAD_SECONDARY.top),
            fontSize: UPLOAD_SECONDARY.fontSize,
            lineHeight: `${UPLOAD_SECONDARY.lineHeight}px`,
            color: FIGMA_TEXT_COLOR,
          }}
        >
          支持JPG PNG格式，可多选
        </span>
      </button>

      <input
        ref={inputRef}
        type="file"
        accept="image/jpeg,image/png,image/jpg"
        multiple
        className="hidden"
        onChange={(event) => {
          handleFiles(event.target.files);
          event.target.value = "";
        }}
      />

      <div
        className="pointer-events-none absolute z-[4] flex items-baseline justify-between"
        style={{
          ...UPLOAD_BOX_CENTER,
          top: sy(UPLOAD_BOX.top + UPLOAD_BOX.height + 12),
          fontFamily: SOURCE_HAN,
        }}
      >
        <span
          className="shrink-0 whitespace-nowrap text-[12px] leading-[12px]"
          style={{ color: FIGMA_TEXT_COLOR }}
        >
          已上传{photoCount}/{MAX_PHOTOS}张
        </span>
        <span className="shrink-0 whitespace-nowrap text-[12px] leading-[12px] text-[#EF4444]">
          至少需要五张照片
        </span>
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
        disabled={!canProceed}
        aria-disabled={!canProceed}
        className="absolute z-10 flex items-center justify-center rounded-full bg-[#81D5FA] text-[15px] font-medium text-white shadow-sm transition-opacity hover:opacity-90 active:scale-[0.99] disabled:cursor-not-allowed disabled:opacity-50"
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
        第2步 · 共4步
      </p>
    </div>
  );
}
