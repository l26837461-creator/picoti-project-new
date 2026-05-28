import type { BackgroundVariant } from "./types";

type StepBackgroundProps = {
  variant: BackgroundVariant;
  children: React.ReactNode;
};

export function GinghamBackground({ variant, children }: StepBackgroundProps) {
  const className =
    variant === "solid"
      ? "overflow-hidden bg-[#A3D9FF]"
      : variant === "yellow"
        ? "gingham-yellow overflow-y-auto"
        : "gingham-blue overflow-y-auto";

  return (
    <div className={`flex h-full min-h-0 w-full flex-col ${className}`}>
      {children}
    </div>
  );
}
