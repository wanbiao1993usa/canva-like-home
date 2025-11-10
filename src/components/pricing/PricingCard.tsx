import type { PricingTier } from "./PricingCards";
import { gradentTextHighlight } from "../../ui";

type PricingCardProps = {
  tier: PricingTier;
};

const checkIcon = (
  <svg xmlns="http://www.w3.org/2000/svg" className="w-5 h-5 text-[#AE89FF] flex-shrink-0 mt-0.5" viewBox="0 0 20 20" fill="none">
    <path d="M16.6667 5.83331L8.33333 14.1666L3.33333 9.16665" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
  </svg>
);

/**
 * 2025-11-10 20:05: PricingCard 展示视觉实现
 */
export default function PricingCard({ tier }: PricingCardProps) {
  const {
    icon,
    name,
    price,
    period,
    description,
    features,
    highlighted,
    ctaText,
    ctaVariant,
  } = tier;
  const isProfessional = tier.id === "professional";

  // 2025-11-10 17:45: 为卡片增加绝对定位 image 以确保视觉效果
  const highlightedBackground = highlighted ? (
    <img
      src="/assets/images/price-highlighted-card.png"
      alt=""
      aria-hidden="true"
      className="absolute inset-0 z-0 h-full w-full pointer-events-none"
    />
  ) : null;

  const cardClass = [
    "relative overflow-hidden rounded-3xl border border-[#2D2D2F] bg-[#181818] p-8 h-full flex flex-col justify-between",
    "transition-all duration-300 hover:border-[#AE89FF]/30",
    highlighted ? "border-2 border-[#AE89FF]/50 shadow-[0_0_40px_rgba(174,137,255,0.15)]" : "",
  ]
    .filter(Boolean)
    .join(" ");

  const buttonBase = "w-full py-2 cursor-pointer border border-white/20 rounded-full font-semibold text-base transition-all duration-200";
  const buttonClass =
    ctaVariant === "primary"
      ? `${buttonBase} bg-[#AE89FF] hover:bg-[#9B76E4] text-[#191919]`
      : `${buttonBase} bg-[#181818] hover:bg-[#3D3D3F] text-white`;

  return (
    <div className={cardClass}>
      {highlightedBackground}
      <div className="relative z-10">
        {/* 2025-11-10: 套餐图标展示 */}
        <div className="mb-6">
          {icon}
        </div>

        <div className="mb-6 flex items-center">
          <span
            className={[
              "text-2xl font-bold",
              isProfessional ? gradentTextHighlight : "text-white",
            ].join(" ")}
          >
            {name}
          </span>
          {highlighted ? (
            <span className="ml-2 inline-block rounded-full bg-[#312942] px-3 py-1 text-xs font-semibold text-primary">
              热门推荐
            </span>
          ) : null}
        </div>

        <div className="mb-6 flex items-baseline gap-1">
          <span className={`text-5xl font-bold ${gradentTextHighlight}`}>${price}</span>
          <span className="text-xl text-white/60">/{period}</span>
        </div>

        <p className="mb-6 text-sm text-[#929292]">{description}</p>
        {/* 2025-11-10: 增加分割线 */}
        <div className="mb-6 h-px bg-white/15" />

        <ul className="mb-8 space-y-3">
          {features.map((feature) => (
            <li key={feature} className="flex items-start gap-3">
              {checkIcon}
              <span className="text-sm text-white">{feature}</span>
            </li>
          ))}
        </ul>
      </div>

      <button type="button" className={`${buttonClass} relative z-10`}>
        {ctaText}
      </button>
    </div>
  );
}
