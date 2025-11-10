"use client";

import { useState } from "react";
import FAQItem from "./FAQItem";
import GlowEffect from "../common/GlowEffect";

type FAQEntry = {
  id: string;
  question: string;
  answer: string;
  defaultOpen?: boolean;
};

const faqData: FAQEntry[] = [
  {
    id: "faq-1",
    question: "生成的海报可以商用吗？版权归谁？",
    // 2025-11-11 19:20: FAQ-1 详细说明商用权限、版权归属和使用范围
    answer: [
      "是的，您可以将生成的海报用于商业用途。使用我们平台生成的所有设计作品，版权完全归您所有。这意味着：",
      "无需商业授权 - 可用于广告、营销、印刷品等任何商业场景",
      "独家所有权 - 生成后的设计专属于您，我们不会再次使用或出售",
      "无需额外付费 - 不收取版权费或授权费",
      "自由修改分发 - 您可以随意编辑、转售或分享您的设计",
    ].join("\n"),
    defaultOpen: true,
  },
  {
    id: "faq-2",
    question: "AI 生成的海报设计需要多长时间？",
    answer: "通常在几秒内即可生成初稿，随后可继续编辑和微调，整个过程一般不超过 5 分钟。",
  },
  {
    id: "faq-3",
    question: "支持哪些文件格式导出？",
    answer: "支持 PNG、JPG、PDF、SVG 等多种格式。专业版及以上可启用高分辨率导出。",
  },
  {
    id: "faq-4",
    question: "可以随时取消订阅吗？",
    answer: "当然可以。您可随时在账户设置中取消订阅，不会产生额外费用，并可继续使用至当前计费周期结束。",
  },
  {
    id: "faq-5",
    question: "是否支持团队协作？",
    answer: "专业版和企业版均支持团队协作，允许邀请成员共同编辑，实时同步修改内容。",
  },
  {
    id: "faq-6",
    question: "如何联系技术支持？",
    answer: "免费版用户可通过社区获得帮助，专业版享有优先邮件支持，企业版提供 7x24 电话支持。",
  },
];

export default function FAQSection() {
  const [openMap, setOpenMap] = useState<Record<string, boolean>>(() =>
    faqData.reduce<Record<string, boolean>>((acc, item) => {
      acc[item.id] = Boolean(item.defaultOpen);
      return acc;
    }, {})
  );

  /**
   * 2025-11-10 19:40: FAQSection 统一管理每个问题的展开状态
   */
  const handleToggle = (id: string) => {
    setOpenMap((prev) => ({
      ...prev,
      [id]: !prev[id],
    }));
  };

  return (
    <section className="py-20 relative">
      {/* 光影效果 */}
      <GlowEffect
        bottom="0"
        left="0"
        src="/assets/icons/hero-eclipse.svg"
        width={900}
        height={80}
        alt="生成演示光影"
        priority={false}
        className="flex w-full justify-center"
      />

      <div className="mb-12 text-center">
        <h2 className="mb-4 text-4xl lg:text-5xl font-bold text-white">常见问题解答</h2>
        <p className="mx-auto max-w-2xl text-lg text-white/70">
          这里汇集了关于 CanDe、AI 技术以及如何助您设计海报的常见问题解答
        </p>
      </div>

      <div className="mx-auto w-[900px] space-y-4">
        {faqData.map((item) => (
          <FAQItem
            key={item.id}
            item={item}
            isOpen={Boolean(openMap[item.id])}
            onToggle={() => handleToggle(item.id)}
          />
        ))}
      </div>
    </section>
  );
}
