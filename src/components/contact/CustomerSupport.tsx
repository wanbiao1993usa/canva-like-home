"use client";

import GlowEffect from "../common/GlowEffect";
import CapsuleTagGroup from "../common/CapsuleTagGroup";

/**
 * 2025-11-11 11:00: 客户支持模块改版——与 CTA 组件保持一致布局
 */
export default function CustomerSupport() {
  return (
    <section className="pt-20">
      <div className="relative overflow-visible rounded-[48px] border border-white/15 bg-[#181818] px-10 py-16 text-center">
        {/* 2025-11-11 11:00: 复用 CTA 的辉光背景以保持视觉统一 */}
        <GlowEffect
          top="0"
          left="0"
          src="/assets/icons/cat-eclipse.svg"
          width={900}
          height={900}
          alt="客户支持背景辉光"
          priority={false}
          className="flex w-full justify-center"
        />

        {/* 2025-11-11 11:00: 标签组沿用 CTA 样式，仅更新文字 */}
        <CapsuleTagGroup
          primaryText="开始吧！"
          secondaryText="陪伴您的每一步创作"
          className="mx-auto gap-[10px] pl-1 pr-4 py-1"
          primaryClassName="rounded-[23px] bg-[#AE89FF] px-3 py-1.5 text-[14px] text-[#191919]"
          secondaryClassName="text-[16px] text-white"
        />

        {/* 2025-11-11 11:00: 标题与文案强调客服服务 */}
        <div className="mx-auto mt-8 max-w-[980px]">
          <h2 className="text-[36px] leading-none text-white sm:text-[42px] xl:text-[48px]">客户支持</h2>
          <p className="mx-auto mt-4 max-w-[846px] text-[18px] text-white/50">
            我们的客户支持团队致力于为您提供最优质的服务。如果您遇到任何问题或对我们的平台有疑问，请随时与我们联系。
          </p>
        </div>

        {/* 2025-11-11 11:00: CTA 同款按钮，仅指向客服支持 */}
        <div className="mt-8 flex items-center justify-center">
          <a
            href="https://support.candeai.com"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 font-bold rounded-[58px] border border-[#A582FF]/60 bg-[#AE89FF] px-5 py-[14px] text-[18px] text-[#191919]"
          >
            联系客服
            <img src="/assets/icons/arrow-up-right-dark.svg" alt="go" className="h-4 w-4" />
          </a>
        </div>
      </div>
    </section>
  );
}
