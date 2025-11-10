"use client";

import { gradentTextHighlight } from "../../ui";

type FAQItemData = {
  id: string;
  question: string;
  answer: string;
};

type FAQItemProps = {
  item: FAQItemData;
  isOpen: boolean;
  onToggle: () => void;
};

/**
 * 2025-11-10 19:40: FAQItem 支持点击切换展开/收起，保证可访问体验
 */
export default function FAQItem({ item, isOpen, onToggle }: FAQItemProps) {
  const answerId = `faq-answer-${item.id}`;

  return (
    <div className="rounded-2xl border border-[#2D2D2F] bg-[#1A1A1C] overflow-hidden">
      <button
        type="button"
        onClick={onToggle}
        aria-expanded={isOpen}
        aria-controls={answerId}
        className="w-full flex items-center justify-between p-6 text-left transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-[#72C0FF]/60"
      >
        {/* 2025-11-10 19:40: 标题区可点击，统一交互区域 */}
        <span className={`inline-block pr-8 text-lg font-semibold ${gradentTextHighlight}`}>
          {item.question}
        </span>
        <span className="text-2xl cursor-pointer text-white/60">{isOpen ? "×" : "+"}</span>
      </button>

      {isOpen ? (
        <div
          id={answerId}
          className="px-6 pb-6 text-base leading-relaxed text-white/70 whitespace-pre-line"
        >
          {/* 2025-11-10 19:40: 展开状态下显示答案正文 */}
          {item.answer}
        </div>
      ) : null}
    </div>
  );
}
