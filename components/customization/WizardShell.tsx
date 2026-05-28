import { WIZARD_STEP_LABELS, type StepIndex } from "./types";

type WizardShellProps = {
  step: 1 | 2 | 3 | 4;
  children: React.ReactNode;
  footer: React.ReactNode;
};

export function WizardShell({ step, children, footer }: WizardShellProps) {
  return (
    <div className="flex min-h-full flex-col px-4 pb-6 pt-10">
      <header className="mb-6 text-center">
        <h1 className="text-xl font-bold text-[var(--petity-blue)]">
          定制宠物产品
        </h1>
        <p className="mt-1 text-sm text-[var(--petity-blue)]/80">
          为您的爱宠打造专属定制产品
        </p>
      </header>

      <main className="flex flex-1 flex-col items-center">
        <div className="relative w-full">
          {/* Washi tape decoration */}
          <div
            className="absolute left-1/2 top-0 z-10 h-6 w-16 -translate-x-1/2 -translate-y-1/2 rounded-sm bg-[var(--petity-cream)] opacity-90 shadow-sm"
            aria-hidden
          />
          <div className="rounded-lg bg-white px-5 pb-6 pt-8 shadow-md">
            {children}
          </div>
        </div>
      </main>

      <footer className="mt-8 flex flex-col items-center gap-4">
        {footer}
        <p className="text-xs text-[var(--petity-blue)]/70">
          {WIZARD_STEP_LABELS[step]}
        </p>
      </footer>
    </div>
  );
}
