'use client';

import { btnPrimary } from "../../ui";
import GlowEffect from "../common/GlowEffect";
import CapsuleTagGroup from "../common/CapsuleTagGroup";

/**
 * 2025-11-10 16:40: HeroIntro 参照 home/Hero 布局，聚焦标题、副文案与 CTA。
 */
export default function HeroIntro() {
  const handleStartClick = () => {
    if (typeof window !== "undefined") {
      window.open("https://editor.lycium.ai/create", "_blank", "noopener,noreferrer");
    }
  };

  return (
    <section id="inspiration-hero" className="relative py-20 overflow-visible">
      {/* 2025-11-07 21:40: 光影效果统一改用 GlowEffect 组件 */}
      <GlowEffect
        top="-40px"
        src="/assets/icons/insp-hero-eclipse.svg"
        width={1000}
        height={1000}
        alt="灵感光影"
        priority={false}
        className="left-1/2 -translate-x-1/2 z-[60]"
        imageClassName="rounded-[44px]"
      />

      <div className="mx-auto max-w-4xl text-center">

        {/* 2025-11-10 16:40: 顶部灵感标签 */}
        <CapsuleTagGroup
          primaryText="灵感"
          secondaryText="让每一张海报都富有灵魂"
          className="inline-flex rounded-full"
          primaryClassName="rounded-full text-[14px]"
        />

        <h1 className="pt-10 text-3xl font-semibold leading-tight text-white sm:text-4xl xl:text-[48px]">
          社区作品集
        </h1>
        <p className="pt-4 text-base leading-relaxed text-white/70 xl:text-lg">
          查看社区用户提交的作品集，感受他们的设计成功案例和 AI 工具的创意玩法
        </p>

        <div className="pt-10 flex items-center justify-center">
          <button
            type="button"
            className={`inline-flex items-center gap-2 px-8 py-3 text-base font-semibold ${btnPrimary}`}
            onClick={handleStartClick}
          >
            开始创作
            <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 20 20" fill="none">
              <path d="M14.1666 5.83337L5.83331 14.1667M14.1666 5.83337H6.66665M14.1666 5.83337V13.3334" stroke="#191919" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          </button>
        </div>
      </div>
    </section>
  );
}



