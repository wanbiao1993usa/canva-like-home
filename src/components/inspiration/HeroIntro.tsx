'use client';

import { btnPrimary } from "../../ui";

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
    <section id="inspiration-hero" className="py-16 sm:py-20">
      <div className="mx-auto max-w-4xl text-center">
        {/* 2025-11-10 16:40: 顶部灵感标签 */}
        {/* <div className="inline-flex items-center gap-3 rounded-full border border-white/10 bg-white/5 px-4 py-2 shadow-[0_16px_40px_rgba(8,8,8,0.65)] backdrop-blur">
          <div className="flex items-center rounded-[100px] bg-[#AE89FF] px-3.5 py-2">
            <span className="text-sm font-medium text-[#191919]">灵感</span>
          </div>
          <span className="text-sm text-white/70">让每一张海报都富有灵魂</span>
        </div> */}
        <div className="inline-flex items-center overflow-hidden rounded-full border-t-2 border-[#3D3D3D] bg-[#191919] text-white">
          <div className="flex items-center rounded-full bg-[#AE89FF] px-3.5 py-2">
            <span className="text-sm font-medium text-secondary-900 text-[14px]">灵感</span>
          </div>
          <div className="px-4 text-base text-white">让每一张海报都富有灵魂</div>
        </div>

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
