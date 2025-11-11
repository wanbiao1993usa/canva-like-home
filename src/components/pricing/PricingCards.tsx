'use client';

import PricingCard from "./PricingCard";
import { useTranslator } from "../../hooks/useTranslator";

export type PricingTier = {
  id: string;
  icon: React.ReactNode; // 2025-11-10: 添加图标字段
  name: string;
  price: number;
  period: string;
  description: string;
  features: string[];
  highlighted?: boolean;
  ctaText: string;
  ctaVariant: "primary" | "secondary";
  badgeText?: string;
};

type PricingTierConfig = {
  id: string;
  icon: React.ReactNode;
  price: number;
  translationKey: "free" | "professional" | "enterprise";
  featureKeys: string[];
  highlighted?: boolean;
  ctaVariant: "primary" | "secondary";
  badgeKey?: string;
};

// 2025-11-10: 定价卡片图标占位符
const RainbowArcIcon = (
  <div className="w-10 h-10 rounded-full bg-primary flex items-center justify-center">
    <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 18 18" fill="none">
      <path d="M16.5 12.75C16.5 8.60775 13.1422 5.25 9 5.25C4.85775 5.25 1.5 8.60775 1.5 12.75M13.5 12.75C13.5 11.5565 13.0259 10.4119 12.182 9.56802C11.3381 8.72411 10.1935 8.25 9 8.25C7.80653 8.25 6.66193 8.72411 5.81802 9.56802C4.97411 10.4119 4.5 11.5565 4.5 12.75M10.5 12.75C10.5 12.3522 10.342 11.9706 10.0607 11.6893C9.77936 11.408 9.39782 11.25 9 11.25C8.60218 11.25 8.22064 11.408 7.93934 11.6893C7.65804 11.9706 7.5 12.3522 7.5 12.75" stroke="#191919" strokeWidth="1.125" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  </div>
);

const LightningIcon = (
  <div className="w-10 h-10 rounded-full bg-primary flex items-center justify-center">
    <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 18 18" fill="none">
      <path d="M9.75 2.25V7.5H14.25L8.25 15.75V10.5H3.75L9.75 2.25Z" stroke="#191919" strokeWidth="1.125" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  </div>
);

const EnterpriseIcon = (
  <div className="w-10 h-10 rounded-full bg-primary flex items-center justify-center">
    <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 18 18" fill="none">
      <path d="M10.125 5.25L12 13.5L9 16.5L6 13.5L7.875 5.25M10.125 5.25L10.8698 3.26325C10.9123 3.1498 10.9267 3.02775 10.9117 2.90752C10.8968 2.78729 10.853 2.67247 10.784 2.57288C10.715 2.47329 10.6229 2.3919 10.5156 2.33567C10.4082 2.27944 10.2889 2.25005 10.1678 2.25H7.83225C7.7111 2.25005 7.59176 2.27944 7.48444 2.33567C7.37713 2.3919 7.28503 2.47329 7.21604 2.57288C7.14704 2.67247 7.1032 2.78729 7.08826 2.90752C7.07332 3.02775 7.08772 3.1498 7.13025 3.26325L7.875 5.25M10.125 5.25H7.875M10.125 5.25L13.875 9.375" stroke="#191919" strokeWidth="1.125" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  </div>
);

const PRICING_TIER_CONFIGS: PricingTierConfig[] = [
  {
    id: "free",
    icon: RainbowArcIcon,
    price: 0,
    translationKey: "free",
    featureKeys: ["dailyCredits", "templates", "storage", "support"],
    ctaVariant: "secondary",
  },
  {
    id: "professional",
    icon: LightningIcon,
    price: 29,
    translationKey: "professional",
    featureKeys: ["unlimitedGenerations", "templates", "storage", "prioritySupport", "advancedEditing"],
    highlighted: true,
    ctaVariant: "primary",
    badgeKey: "pricing.cards.popularBadge",
  },
  {
    id: "enterprise",
    icon: EnterpriseIcon,
    price: 99,
    translationKey: "enterprise",
    featureKeys: ["allFeatures", "customModels", "unlimitedStorage", "expertSupport", "analytics"],
    ctaVariant: "secondary",
  },
];

/**
 * 2025-11-10 20:00: 定价卡片容器，负责数据声明与栅格布局
 */
export default function PricingCards() {
  const t = useTranslator();
  // 2025-11-12 10:36: 结合字典动态生成定价内容，保持多语言一致
  const pricingData: PricingTier[] = PRICING_TIER_CONFIGS.map((config) => {
    const baseKey = `pricing.cards.${config.translationKey}`;
    return {
      id: config.id,
      icon: config.icon,
      price: config.price,
      name: t(`${baseKey}.name`),
      period: t(`${baseKey}.period`),
      description: t(`${baseKey}.description`),
      features: config.featureKeys.map((featureKey) => t(`${baseKey}.features.${featureKey}`)),
      highlighted: config.highlighted,
      ctaText: t(`${baseKey}.cta`),
      ctaVariant: config.ctaVariant,
      badgeText: config.badgeKey ? t(config.badgeKey) : undefined,
    };
  });

  return (
    <section className="pb-20">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8">
        {pricingData.map((tier) => (
          <PricingCard key={tier.id} tier={tier} />
        ))}
      </div>
    </section>
  );
}
