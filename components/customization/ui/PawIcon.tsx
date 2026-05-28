type PawIconProps = {
  className?: string;
  color?: string;
};

/** Chunky paw print matching brand illustration style */
export function PawIcon({
  className = "h-7 w-7",
  color = "var(--petity-yellow-bright)",
}: PawIconProps) {
  return (
    <svg
      viewBox="0 0 32 32"
      className={className}
      aria-hidden
      fill={color}
    >
      <ellipse cx="16" cy="20" rx="7" ry="6.5" />
      <circle cx="7.5" cy="11" r="4.2" />
      <circle cx="13" cy="7" r="4.2" />
      <circle cx="19.5" cy="7" r="4.2" />
      <circle cx="25" cy="11.5" r="4" />
    </svg>
  );
}
