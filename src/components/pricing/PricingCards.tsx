import PricingCard from "./PricingCard";

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

const pricingData: PricingTier[] = [
  {
    id: "free",
    icon: RainbowArcIcon,
    name: "免费",
    price: 0,
    period: "月",
    description: "非常适合入门，零基础也能立即使用",
    features: ["每日5次AI生成", "基础模版", "1GB存储空间", "社区支持"],
    ctaText: "开始使用",
    ctaVariant: "secondary",
  },
  {
    id: "professional",
    icon: LightningIcon,
    name: "专业版",
    price: 29,
    period: "月",
    description: "最适合专业人士，解锁全部高级功能",
    features: ["无限次AI生成", "高级模版", "50GB存储空间", "优先支持", "团队协作", "高级编辑工具"],
    highlighted: true,
    ctaText: "开始使用",
    ctaVariant: "primary",
  },
  {
    id: "enterprise",
    icon: EnterpriseIcon,
    name: "企业版",
    price: 99,
    period: "月",
    description: "适合大型团队，统一管理，高效协同",
    features: ["专业版全功能", "自定义AI模型", "无限存储空间", "全天候电话支持", "高级分析", "白标选项"],
    ctaText: "开始使用",
    ctaVariant: "secondary",
  },
];

/**
 * 2025-11-10 20:00: 定价卡片容器，负责数据声明与栅格布局
 */
export default function PricingCards() {
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
