// 2025-10-29: CTA 重构（Figma node 345:4992）
// 说明：深色圆角卡片 + 顶部发光漩涡（CSSProperties 渐变实现）+ 胶囊标签 + 大标题/副标题 + 主按钮
// 图标占位：请在 public/assets 下补齐实际资源（UTF-8）
import GlowEffect from "./GlowEffect";

export default function CTA() {
  return (
    <section id="cta" className="pt-20">
      <div className="relative overflow-hidden rounded-[48px] border border-white/15 bg-[#181818] px-10 py-16 text-center">
        {/* 光影效果 */}
        <GlowEffect
          top="0"
          left="0"
          src="/assets/icons/cat-eclipse.svg"
          width={900}
          height={900}
          alt="生成演示光影"
          priority={false}
          className="flex w-full justify-center"
        />

        {/* 顶部胶囊标签：左紫色小胶囊 + 右侧文案 */}
        <div className="mx-auto inline-flex items-center gap-[10px] rounded-[100px] border-t-2 border-[#3D3D3D] bg-[#191919] pl-1 pr-4 py-1">
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


