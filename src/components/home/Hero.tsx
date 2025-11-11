'use client';

import { btnPrimary, gradentText } from "../../ui";
import GlowEffect from "../common/GlowEffect";
import { useTranslator } from "../../hooks/useTranslator";

// 2025-11-11 17:25: Hero 模块接入多语言文案与 CTA
const posters = [
  { src: "hero-poster-01", height: "h-[300px] sm:h-[360px] xl:h-[420px]" },
  { src: "hero-poster-02", height: "h-[270px] sm:h-[300px] xl:h-[340px]" },
  { src: "hero-poster-03", height: "h-[220px] sm:h-[240px] xl:h-[260px]" },
  { src: "hero-poster-04", height: "h-[270px] sm:h-[300px] xl:h-[340px]" },
  { src: "hero-poster-05", height: "h-[300px] sm:h-[360px] xl:h-[420px]" },
];

export default function Hero() {
  const t = useTranslator("home.hero");

  const handleStartClick = () => {
    if (typeof window !== "undefined") {
      window.open("https://editor.lycium.ai", "_blank", "noopener,noreferrer");
    }
  };

  return (
    <section id="hero" className="py-20">
      <div className="mx-auto max-w-4xl text-center">
        <div className="mx-auto inline-flex items-center gap-3">
          <span className="inline-flex items-center justify-center rounded-[6px] bg-white/15 px-2 py-1">
            <span className="bg-gradient-to-r from-[#CDB5FF] via-[#B9BDFD] to-[#88C5FF] bg-clip-text text-[11px] font-semibold uppercase tracking-[0.08em] text-transparent">
              NEW
            </span>
          </span>
          <span className="text-sm font-medium text-transparent bg-clip-text bg-gradient-to-r from-[#B4B7FF] via-[#C9A5FF] to-[#8EC3FF]">
            {t("badge")}
          </span>
        </div>

        <h1 className={`pt-14 text-3xl font-semibold leading-tight sm:text-4xl xl:text-5xl 2xl:text-6xl ${gradentText}`}>
          {t("title")}
        </h1>
        <p className="pt-4 text-base leading-relaxed text-white/70 xl:text-lg 2xl:text-xl">
          {t("description")}
        </p>

        <div className="pt-14 flex items-center justify-center">
          <button className={`inline-flex items-center gap-2 font-bold ${btnPrimary} 2xl:px-8 2xl:py-3 2xl:text-base`} onClick={handleStartClick}>
            {t("primaryCta")}
            <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 20 20" fill="none" aria-hidden="true">
              <path d="M14.1666 5.83337L5.83331 14.1667M14.1666 5.83337H6.66665M14.1666 5.83337V13.3334" stroke="#191919" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          </button>
        </div>
      </div>

      <div className="relative grid grid-cols-2 items-end gap-4 pt-10 sm:grid-cols-3 xl:grid-cols-5 xl:gap-5 2xl:gap-6">
        <GlowEffect
          bottom="-5rem"
          src="/assets/icons/hero-eclipse.svg"
          width={1200}
          height={80}
          alt="Hero gradient glow"
          priority={false}
          className="flex w-full justify-center"
        />

        {posters.map(({ src, height }, index) => (
          <picture key={src} className="relative flex items-end justify-center rounded-[30px] p-[3px]">
            <source srcSet={`/assets/images/${src}.png`} type="image/png" />
            <img
              src={`/assets/images/${src}.png`}
              alt={`Hero poster ${index + 1}`}
              className={`${height} w-full rounded-[24px] object-cover shadow-[0_14px_34px_rgba(0,0,0,0.38)] transition-transform duration-300 ease-out hover:-translate-y-1.5`}
              loading={index < 2 ? "eager" : "lazy"}
            />
          </picture>
        ))}
      </div>
    </section>
  );
}
