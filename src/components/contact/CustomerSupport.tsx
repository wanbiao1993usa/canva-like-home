"use client";

import GlowEffect from "../common/GlowEffect";
import CapsuleTagGroup from "../common/CapsuleTagGroup";
import { useTranslator } from "../../hooks/useTranslator";

/**
 * 2025-11-11 11:00: 客户支持模块改版——与 CTA 组件保持一致布局
 */
export default function CustomerSupport() {
  const t = useTranslator("contact.support");
  // 2025-02-15 12:45: 复用 ContactHero 常规咨询邮箱
  const heroT = useTranslator("contact.hero");
  const generalEmail = heroT("emailSection.generalEmail");

  return (
    <section className="pt-20">
      <div className="relative overflow-visible rounded-[48px] border border-white/15 bg-[#181818] px-10 py-16 text-center">
        <GlowEffect
          top="0"
          left="0"
          src="/assets/icons/cat-eclipse.svg"
          width={900}
          height={900}
          priority={false}
          className="flex w-full justify-center"
        />

        <CapsuleTagGroup
          primaryText={t("badgePrimary")}
          secondaryText={t("badgeSecondary")}
          className="mx-auto gap-[10px] pl-1 pr-4 py-1"
          primaryClassName="rounded-[23px] bg-[#AE89FF] px-3 py-1.5 text-[14px] text-[#191919]"
          secondaryClassName="text-[16px] text-white"
        />

        <div className="mx-auto mt-8 max-w-[980px]">
          <h2 className="text-[36px] leading-none text-white sm:text-[42px] xl:text-[48px]">{t("title")}</h2>
          <p className="mx-auto mt-4 max-w-[846px] text-[18px] text-white/50">{t("description")}</p>
        </div>

        <div className="mt-8 flex items-center justify-center">
          <a
            href={`mailto:${generalEmail}`}
            className="inline-flex items-center gap-2 rounded-[58px] border border-[#A582FF]/60 bg-[#AE89FF] px-5 py-[14px] text-[18px] font-bold text-[#191919]"
          >
            {t("cta")}
            <img src="/assets/icons/arrow-up-right-dark.svg" alt="" className="h-4 w-4" aria-hidden="true" />
          </a>
        </div>
      </div>
    </section>
  );
}
