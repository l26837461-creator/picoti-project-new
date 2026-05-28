type StepNavigationProps = {
  onPrevious?: () => void;
  onNext: () => void;
  nextLabel?: string;
  showPrevious?: boolean;
};

export function StepNavigation({
  onPrevious,
  onNext,
  nextLabel = "下一步",
  showPrevious = true,
}: StepNavigationProps) {
  return (
    <div className="flex w-full gap-3">
      {showPrevious && onPrevious ? (
        <button
          type="button"
          onClick={onPrevious}
          className="flex-1 rounded-full border-2 border-[var(--petity-blue)] bg-white py-3 text-sm font-medium text-[var(--petity-blue)] transition-opacity hover:opacity-90"
        >
          上一步
        </button>
      ) : null}
      <button
        type="button"
        onClick={onNext}
        className={`rounded-full bg-[var(--petity-blue)] py-3 text-sm font-medium text-white transition-opacity hover:opacity-90 ${
          showPrevious && onPrevious ? "flex-1" : "w-full"
        }`}
      >
        {nextLabel}
      </button>
    </div>
  );
}
