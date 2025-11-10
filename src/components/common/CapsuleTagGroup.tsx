type CapsuleTagGroupProps = {
  primaryText: string;
  secondaryText: string;
  className?: string;
  primaryClassName?: string;
  secondaryClassName?: string;
};

/**
 * 2025-11-10 20:35: CapsuleTagGroup — 统一的胶囊标签组合
 */
export default function CapsuleTagGroup({
  primaryText,
  secondaryText,
  className,
  primaryClassName,
  secondaryClassName,
}: CapsuleTagGroupProps) {
  const containerClassName = [
    "inline-flex items-center overflow-hidden rounded-[100px] border-t-2 border-[#3D3D3D] bg-[#191919] text-white",
    className,
  ]
    .filter(Boolean)
    .join(" ");

  const primaryLabelClassName = [
    "flex items-center rounded-[100px] bg-[#AE89FF] px-3.5 py-2 text-sm font-medium text-[#191919]",
    primaryClassName,
  ]
    .filter(Boolean)
    .join(" ");

  const secondaryLabelClassName = ["px-4 text-base text-white", secondaryClassName].filter(Boolean).join(" ");

  return (
    <div className={containerClassName}>
      <span className={primaryLabelClassName}>{primaryText}</span>
      <span className={secondaryLabelClassName}>{secondaryText}</span>
    </div>
  );
}
