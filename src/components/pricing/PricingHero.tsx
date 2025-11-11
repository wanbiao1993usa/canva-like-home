'use client';

import { gradentText } from "../../ui";
import CapsuleTagGroup from "../common/CapsuleTagGroup";
import { useTranslator } from "../../hooks/useTranslator";

/**
 * 2025-11-10 19:55: 定价页 Hero，静态展示标签+标题+副文案
 */
export default function PricingHero() {
  const t = useTranslator("pricing.hero");
  // 2025-11-12 10:20: 接入 pricing.hero 字典，统一管理定价页 Hero 文案

  return (
    <section className="py-20 text-center">
      <CapsuleTagGroup primaryText={t("badgePrimary")} secondaryText={t("badgeSecondary")} />

      <h1 className={`mt-6 text-4xl lg:text-5xl xl:text-6xl font-bold ${gradentText}`}>
        {t("title")}
      </h1>

      <p className="mt-4 text-base lg:text-lg text-white/70 max-w-2xl mx-auto leading-relaxed">
        {t("description")}
      </p>
    </section>
  );
}
