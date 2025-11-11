"use client";

import { gradentText } from "../../ui";
import CapsuleTagGroup from "../common/CapsuleTagGroup";
import { useTranslator } from "../../hooks/useTranslator";
// 2025-10-29: 调整命名与配色，组件用于渲染设计魔法横幅
/**
 * 2025-10-29: 设计魔法条幅，凸显产品特色与序号信息。
 */
export default function DesignMagicBanner() {
  // 2025-11-11 20:45: 接入 useTranslator 支持中英文切换
  const t = useTranslator("home.designMagicBanner");
  const badgePrimary = t("badge.primary");
  const badgeSecondary = t("badge.secondary");
  const bannerTitle = t("title");

  return (
    <section className="pt-20">
      <div
        className="relative mx-auto flex w-full max-w-[1320px] flex-col items-center gap-8 pt-6 text-center"
      >
        {/* 2025-10-29: 顶部标签组 */}
        <CapsuleTagGroup primaryText={badgePrimary} secondaryText={badgeSecondary} />

        {/* 2025-10-29: 核心文案标题 */}
        <h3 className={`text-[32px] font-medium leading-[1.3] ${gradentText}`}>
          {bannerTitle}
        </h3>
      </div>
    </section>
  );
}
