'use client';

import { btnPrimary, gradentText } from "../../ui";
import GlowEffect from "../common/GlowEffect";
// 2025-10-30: Hero 区块视觉细节按设计稿优化（NEW 徽标、渐变文案、海报序列与底部光影）
export default function Hero() {
  const posters = [
    { src: "hero-poster-01", height: "h-[300px] sm:h-[360px] xl:h-[420px]" },
    { src: "hero-poster-02", height: "h-[270px] sm:h-[300px] xl:h-[340px]" },
    { src: "hero-poster-03", height: "h-[220px] sm:h-[240px] xl:h-[260px]" },
    { src: "hero-poster-04", height: "h-[270px] sm:h-[300px] xl:h-[340px]" },
    { src: "hero-poster-05", height: "h-[300px] sm:h-[360px] xl:h-[420px]" },
  ];

  const handleStartClick = () => {
    if (typeof window !== "undefined") {
      window.open("https://editor.lycium.ai", "_blank", "noopener,noreferrer");
    }
  };

  return (
    <section id="hero" className="py-20">
      <div className="mx-auto max-w-4xl text-center">
        {/* 顶部 NEW 提示条 */}
        <div className="mx-auto inline-flex items-center gap-3">
          <span className="inline-flex py-1 items-center justify-center rounded-[6px] bg-white/15 px-2">
            <span className="bg-gradient-to-r from-[#CDB5FF] via-[#B9BDFD] to-[#88C5FF] bg-clip-text text-[11px] font-semibold uppercase tracking-[0.08em] text-transparent">
              NEW
            </span>
          </span>
          <span className="text-sm font-medium text-transparent bg-clip-text bg-gradient-to-r from-[#B4B7FF] via-[#C9A5FF] to-[#8EC3FF]">
            AI 驱动的新一代海报设计
          </span>
        </div>
        {/* 2025-11-07: 主标题使用灰-白-灰渐变呈现金属质感 */}
        <h1 className={`pt-14 text-3xl font-semibold leading-tight sm:text-4xl xl:text-5xl 2xl:text-6xl ${gradentText}`}>
          灵感即海报，AI让创作更简单
        </h1>
        <p className="pt-4 text-base leading-relaxed text-white/70 xl:text-lg 2xl:text-xl">
          告别复杂设计，无需专业技能。我们的 AI 海报工具能精准捕捉你的创意，帮助你快速构建布局元素。
          轻松几步，即可将灵感转化为精美海报，精彩瞬间即刻呈现
        </p>
        <div className="pt-14 flex items-center justify-center">
          <button className={`inline-flex font-bold items-center gap-2 ${btnPrimary} 2xl:px-8 2xl:py-3 2xl:text-base`} onClick={handleStartClick}>
            免费试用
            <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 20 20" fill="none">
              <path d="M14.1666 5.83337L5.83331 14.1667M14.1666 5.83337H6.66665M14.1666 5.83337V13.3334" stroke="#191919" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          </button>
        </div>
      </div>

      {/* 海报卡片（横向 5 张） */}
      <div className="relative pt-10 grid grid-cols-2 items-end gap-4 sm:grid-cols-3 xl:grid-cols-5 xl:gap-5 2xl:gap-6">
        {/* 2025-11-07 21:30: 使用 GlowEffect 组件统一管理底部光影 */}
        <GlowEffect
          bottom="-5rem"
          src="/assets/icons/hero-eclipse.svg"
          width={1200}
          height={80}
          alt="Hero 底部光影"
          priority={false}
          className="flex w-full justify-center"
        />


        {posters.map(({ src, height }, index) => (
          <picture
            key={src}
            className="relative flex items-end justify-center rounded-[30px] p-[3px]"
          >
            <source srcSet={`/assets/images/${src}.png`} type="image/png" />
            <img
              src={`/assets/images/${src}.png`}
              alt={`海报 ${index + 1}`}
              className={`${height} w-full rounded-[24px] object-cover shadow-[0_14px_34px_rgba(0,0,0,0.38)] transition-transform duration-300 ease-out hover:-translate-y-1.5`}
              loading={index < 2 ? "eager" : "lazy"}
            />
          </picture>
        ))}
      </div>
    </section>
  );
}


