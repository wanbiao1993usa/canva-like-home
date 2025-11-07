// 2025-10-29: CTA 重构（Figma node 345:4992）
// 说明：深色圆角卡片 + 顶部发光漩涡（CSSProperties 渐变实现）+ 胶囊标签 + 大标题/副标题 + 主按钮
// 图标占位：请在 public/assets 下补齐实际资源（UTF-8）
import type { CSSProperties } from "react";

export default function CTA() {
  return (
    <section id="cta" className="py-16 2xl:py-20">
      <div className="relative overflow-hidden rounded-[48px] border border-white/15 bg-[#181818] px-10 py-16 text-center xl:px-16 xl:py-20">
        {/* 顶部发光漩涡：CSSProperties 实现（481×220，向上溢出） */}
        {(() => {
          // 基础白色光晕（黑白风格）
          const swirlBase: CSSProperties = {
            background:
              "radial-gradient(60% 70% at 50% 50%, rgba(255,255,255,0.20) 0%, rgba(255,255,255,0.12) 28%, rgba(255,255,255,0.06) 48%, rgba(255,255,255,0) 68%)",
            filter: "blur(4px)",
            borderRadius: "9999px",
            mixBlendMode: "screen",
          };
          // 同心环纹，增强‘漩涡’层次（黑白）
          const swirlRings: CSSProperties = {
            backgroundImage:
              "repeating-radial-gradient(circle at 50% 50%, rgba(255,255,255,0.08) 0px, rgba(255,255,255,0.08) 1px, rgba(255,255,255,0) 8px, rgba(255,255,255,0) 14px)",
            opacity: 0.25,
            borderRadius: "9999px",
            mixBlendMode: "screen",
          };
          return (
            <div className="pointer-events-none absolute left-1/2 top-[-60px] h-[220px] w-[481px] -translate-x-1/2">
              <div aria-hidden className="absolute inset-0" style={swirlBase} />
              <div aria-hidden className="absolute inset-0" style={swirlRings} />
            </div>
          );
        })()}

        {/* 顶部胶囊标签：左紫色小胶囊 + 右侧文案 */}
        <div className="mx-auto inline-flex items-center gap-[10px] rounded-[100px] border border-white/20 bg-[#191919] pl-1 pr-4 py-1">
          <span className="rounded-[23px] bg-[#AE89FF] px-3 py-1.5 text-[14px] text-[#191919]">开始吧！</span>
          <span className="text-[16px] text-white">加入创意革命！</span>
        </div>

        {/* 文案区域 */}
        <div className="mx-auto mt-8 max-w-[980px]">
          <h2 className="text-[36px] leading-none text-white sm:text-[42px] xl:text-[48px]">准备好释放你的构想了吗？</h2>
          <p className="mx-auto mt-4 max-w-[846px] text-[18px] text-white/50">分享你的想法，看着AI将它转化为惊艳海报！</p>
        </div>

        {/* 主按钮：紫色圆角 58 */}
        <div className="mt-8 flex items-center justify-center">
          <a
            href="#"
            className="inline-flex items-center gap-2 rounded-[58px] border border-[#A582FF]/60 bg-[#AE89FF] px-5 py-[14px] text-[18px] text-[#191919]"
          >
            开始使用
            <img src="/assets/icons/arrow-up-right-dark.svg" alt="go" className="h-4 w-4" />
          </a>
        </div>
      </div>
    </section>
  );
}


