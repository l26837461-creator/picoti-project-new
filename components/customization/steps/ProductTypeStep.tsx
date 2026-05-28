"use client";

import Image from "next/image";
import { useState, type CSSProperties } from "react";

type ProductType = "pet" | "owner";

type ProductTypeStepProps = {
  onNext: () => void;
};

const FULL_FRAME =
  "pointer-events-none absolute inset-0 h-full w-full object-cover object-top";

/** 393×852 设计稿 → 百分比定位 */
const sx = (value: number) => `${(value / 393) * 100}%`;
const sy = (value: number) => `${(value / 852) * 100}%`;

const SOURCE_HAN =
  'var(--font-source-han-sans), "Source Han Sans SC", "Noto Sans SC", sans-serif';

const OPTION_SHADOW = "drop-shadow(0px 4px 4px rgba(0, 0, 0, 0.25))";

const OPTION_BOX_STYLE = {
  left: "23.92%",
  right: "21.63%",
  filter: OPTION_SHADOW,
} as const;

type OptionCardProps = {
  selected: boolean;
  title: string;
  subtitle: string;
  onSelect: () => void;
  style: CSSProperties;
};

function OptionCard({ selected, title, subtitle, onSelect, style }: OptionCardProps) {
  return (
    <button
      type="button"
      aria-pressed={selected}
      onClick={onSelect}
      className="absolute z-[4] flex items-center gap-2.5 rounded-2xl border border-[#7DB8FF] bg-white pl-[14px] pr-3 text-left transition-all active:scale-[0.99]"
      style={{ ...style, fontFamily: SOURCE_HAN }}
    >
      <span
        className={`box-border flex h-[21px] w-[21px] shrink-0 items-center justify-center rounded-full border border-[#7DB8FF] transition-colors ${
          selected ? "bg-[#7DB8FF]" : "bg-white"
        }`}
        aria-hidden
      >
        {selected ? (
          <span className="h-[7px] w-[7px] rounded-full bg-white" />
        ) : null}
      </span>
      <span className="min-w-0 flex-1">
        <span className="block text-[15px] font-semibold leading-tight text-[#2C5282]">
          {title}
        </span>
        <span className="mt-0.5 block text-[11px] leading-snug text-[#4A90C4]/75">
          {subtitle}
        </span>
      </span>
    </button>
  );
}

/**
 * 第 2 页 — 选择定制卡片类型
 * 图2 合成底图(格纹+黄纸+白卡) → 图7 页头 → HTML 标题/选项 → 图6 按钮
 */
export function ProductTypeStep({ onNext }: ProductTypeStepProps) {
  const [selected, setSelected] = useState<ProductType>("pet");

  return (
    <div className="absolute inset-0 overflow-hidden">
      {/* 图2：合成底图（格纹 + 黄色撕纸 + 白色卡纸） */}
      <div className="absolute inset-0 z-0" aria-hidden>
        <img
          src="/product-type-layers/layer-1-bg.png?v=ss"
          alt=""
          className="h-full w-full object-cover object-top"
          draggable={false}
        />
      </div>

      {/* page header (Source Han Sans) */}
      <div
        className="pointer-events-none absolute z-[2] w-full text-center text-[#81D5FA]"
        style={{ top: sy(96), fontFamily: SOURCE_HAN }}
      >
        <p className="text-[22px] font-medium leading-tight">定制宠物产品</p>
        <p className="mt-0.5 text-[13px] leading-snug">为您的宠物打造专属产品</p>
      </div>

      {/* card title: two lines tight; moderate gap to option boxes below */}
      <div
        className="pointer-events-none absolute z-[3] flex flex-col gap-1 text-left"
        style={{
          left: "23.92%",
          right: "21.63%",
          top: sy(327),
          fontFamily: SOURCE_HAN,
        }}
      >
        <p className="text-[17px] font-bold leading-snug text-[#2C5282]">
          选择定制卡片类型
        </p>
        <p className="text-[12px] leading-snug text-[#4A90C4]/85">
          请选择你想要定制的卡片类型
        </p>
      </div>

      {/* 图8：可交互选项（Figma Component 1 / 2） */}
      <OptionCard
        selected={selected === "pet"}
        title="宠物佩戴"
        subtitle="为宠物设计的定制产品"
        onSelect={() => setSelected("pet")}
        style={{
          ...OPTION_BOX_STYLE,
          top: "44.37%",
          bottom: "47.3%",
        }}
      />
      <OptionCard
        selected={selected === "owner"}
        title="主人饰品"
        subtitle="主人随身携带精致配饰"
        onSelect={() => setSelected("owner")}
        style={{
          ...OPTION_BOX_STYLE,
          top: "55.05%",
          bottom: "36.74%",
        }}
      />

      <Image
        src="/paw.png"
        alt=""
        width={26}
        height={26}
        className="pointer-events-none absolute z-[4] opacity-90"
        style={{ right: sx(58), top: sy(578) }}
      />

      {/* 图6：下一步（尺寸对齐参考 ss 图层 73/393 × 47/852） */}
      <button
        type="button"
        onClick={onNext}
        aria-label="下一步"
        className="absolute z-10 flex items-center justify-center rounded-full bg-[#81D5FA] text-[15px] font-medium text-white shadow-sm transition-opacity hover:opacity-90 active:scale-[0.99]"
        style={{
          left: sx(73),
          right: sx(73),
          top: sy(728),
          height: sy(47),
          fontFamily: SOURCE_HAN,
        }}
      >
        下一步
      </button>

      <p
        className="pointer-events-none absolute z-10 w-full text-center text-[12px] text-[#4A90C4]"
        style={{ bottom: sy(28), fontFamily: SOURCE_HAN }}
      >
        第1步 · 共4步
      </p>
    </div>
  );
}
