export const STEP_COUNT = 5;

export type StepIndex = 0 | 1 | 2 | 3 | 4;

export type GinghamVariant = "blue" | "yellow";

/** solid = welcome sky-blue; gingham used on wizard steps */
export type BackgroundVariant = "solid" | GinghamVariant;

export const STEP_BACKGROUND: Record<StepIndex, BackgroundVariant> = {
  0: "solid",
  1: "solid",
  2: "yellow",
  3: "solid",
  4: "solid",
};

/** Steps 1–4 show the wizard step indicator (第 N 步 · 共 4 步) */
export const WIZARD_STEP_LABELS: Record<1 | 2 | 3 | 4, string> = {
  1: "第1步 · 共4步",
  2: "第2步 · 共4步",
  3: "第3步 · 共4步",
  4: "第4步 · 共4步",
};
