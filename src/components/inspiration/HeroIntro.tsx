'use client';

import { btnPrimary } from "../../ui";
import GlowEffect from "../common/GlowEffect";
import CapsuleTagGroup from "../common/CapsuleTagGroup";
import { useFeatureToast } from "../common/toast";
import { useTranslator } from "../../hooks/useTranslator";

/**
 * 2025-11-10 16:40: HeroIntro 参照 home/Hero 布局，聚焦标题、副文案与 CTA。
 */
export default function HeroIntro() {
  const t = useTranslator("inspiration.hero");
  /**
   * 2025-11-11 15:10: CTA 暂未开放，点击后提示“功能开发中”
   */
  const notifyComingSoon = useFeatureToast(t("cta.toast"));

  return (
    <section id="inspiration-hero" className="relative py-20 overflow-visible">
      {/* 2025-11-07 21:40: 光影效果统一改用 GlowEffect 组件 */}
      <GlowEffect
        top="-40px"
        src="/assets/icons/insp-hero-eclipse.svg"
        width={1000}
        height={1000}
        alt={t("imageAlt")}
        priority={false}
        className="left-1/2 -translate-x-1/2 z-[60]"
        imageClassName="rounded-[44px]"
      />

      <div className="mx-auto max-w-4xl text-center">

        {/* 2025-11-10 16:40: 顶部灵感标签 */}
        <CapsuleTagGroup
          primaryText={t("badgePrimary")}
          secondaryText={t("badgeSecondary")}
          className="inline-flex rounded-full"
          primaryClassName="rounded-full text-[14px]"
        />

        <h1 className="pt-10 text-3xl font-semibold leading-tight text-white sm:text-4xl xl:text-[48px]">
          {t("title")}
        </h1>
        <p className="pt-4 text-base leading-relaxed text-white/70 xl:text-lg">
          {t("description")}
        </p>

        <div className="pt-10 flex items-center justify-center">
          <button
            type="button"
            className={`inline-flex items-center gap-2 px-8 py-3 text-base font-semibold ${btnPrimary}`}
            onClick={notifyComingSoon}
          >
            {t("cta.label")}
            <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 20 20" fill="none">
              <path d="M14.1666 5.83337L5.83331 14.1667M14.1666 5.83337H6.66665M14.1666 5.83337V13.3334" stroke="#191919" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          </button>
        </div>
      </div>
    </section>
  );
}



