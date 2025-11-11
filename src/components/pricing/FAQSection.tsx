"use client";

import { useState } from "react";
import FAQItem from "./FAQItem";
import GlowEffect from "../common/GlowEffect";
import { useTranslator } from "../../hooks/useTranslator";

type FAQEntry = {
  id: string;
  question: string;
  answer: string;
  defaultOpen?: boolean;
};

type FAQEntryConfig = {
  id: string;
  questionKey: string;
  answerKey: string;
  defaultOpen?: boolean;
};

const FAQ_ENTRIES: FAQEntryConfig[] = [
  {
    id: "faq-1",
    questionKey: "items.usageRights.question",
    answerKey: "items.usageRights.answer",
    // 2025-11-11 19:20: 详细记录商用版权范围，保持问答信息完整
    defaultOpen: true,
  },
  {
    id: "faq-2",
    questionKey: "items.turnaround.question",
    answerKey: "items.turnaround.answer",
  },
  {
    id: "faq-3",
    questionKey: "items.exportFormats.question",
    answerKey: "items.exportFormats.answer",
  },
  {
    id: "faq-4",
    questionKey: "items.cancel.question",
    answerKey: "items.cancel.answer",
  },
  {
    id: "faq-5",
    questionKey: "items.collaboration.question",
    answerKey: "items.collaboration.answer",
  },
  {
    id: "faq-6",
    questionKey: "items.support.question",
    answerKey: "items.support.answer",
  },
];

export default function FAQSection() {
  const [openMap, setOpenMap] = useState<Record<string, boolean>>(() =>
    FAQ_ENTRIES.reduce<Record<string, boolean>>((acc, item) => {
      acc[item.id] = Boolean(item.defaultOpen);
      return acc;
    }, {})
  );
  const t = useTranslator("pricing.faq");
  // 2025-11-12 10:45: FAQSection 接入字典，确保问答内容随 locale 切换
  const faqData: FAQEntry[] = FAQ_ENTRIES.map((entry) => ({
    id: entry.id,
    question: t(entry.questionKey),
    answer: t(entry.answerKey),
    defaultOpen: entry.defaultOpen,
  }));

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
        alt={t("glowAlt")}
        priority={false}
        className="flex w-full justify-center"
      />

      <div className="mb-12 text-center">
        <h2 className="mb-4 text-4xl lg:text-5xl font-bold text-white">{t("title")}</h2>
        <p className="mx-auto max-w-2xl text-lg text-white/70">{t("subtitle")}</p>
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
