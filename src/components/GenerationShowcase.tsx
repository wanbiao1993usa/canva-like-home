// 2025-10-29: 新增生成流程演示组件（依据 Figma node 345:4563）
// 说明：左侧步骤与要点卡片，右侧生成结果面板与气泡提示，尽量还原尺寸与配色
import type { CSSProperties } from "react";
import GlowEffect from "./GlowEffect";
import { gradentTextXs } from "../ui";

export default function GenerationShowcase() {
  // 背景高光椭圆
  const glowStyle: CSSProperties = {
    background:
      "radial-gradient(50% 50% at 50% 50%, rgba(255,255,255,0.12) 0%, rgba(255,255,255,0.06) 35%, rgba(255,255,255,0) 70%)",
  };

  return (
    <section className="pt-20">
      <div className="relative mx-auto flex w-full max-w-[1280px] items-center gap-12">
        {/* 光影效果 */}
        <GlowEffect
          top="-10rem"
          right="-12rem"
          src="/assets/icons/showcase-eclipse.svg"
          width={800}
          height={800}
          alt="生成演示光影"
          priority={false}
          className="flex w-full justify-center"
        />

        {/* 2025-10-29: 左侧内容块 500×~260 */}
        <div className="w-full max-w-[500px]">
          {/* 顶部数字标签 */}
          <div className="inline-flex items-center gap-4 rounded-[96px] border border-white/15 bg-[#181818] pl-2 pr-4 py-2">
            <span className="flex h-[46px] w-[46px] items-center justify-center rounded-full bg-[#AE89FF] text-[17px] font-medium leading-none text-[#191919]">1</span>
            <span className={`text-[18px] ${gradentTextXs}`}>在聊天中传达灵感</span>
          </div>

          {/* 要点卡片 */}
          <div className="mt-6 space-y-6 rounded-2xl border border-white/15 bg-[#181818] p-6">
            <div>
              <div className="flex items-center gap-3">
                {/* 2025-10-29: 图标占位（相机） -> 请将 SVG 放在 public/assets/icons/gen-showcase-camera.svg */}
                <span className="inline-flex h-[23px] w-[23px] items-center justify-center rounded-full ring-1 ring-[#AE89FF]/60">
                  <img src="/assets/icons/gen-showcase-camera.svg" alt="camera" className="h-[14px] w-[14px]" />
                </span>
                <span className="text-[18px] text-white">精准捕捉设计Vibe</span>
              </div>
              <p className="mt-2 text-[16px] text-white/60">AI深度理解你的创意方向，匹配最适合的视觉风格</p>
            </div>
            <div>
              <div className="flex items-center gap-3">
                {/* 2025-10-29: 图标占位（上传） -> 请将 SVG 放在 public/assets/icons/gen-showcase-upload.svg */}
                <span className="inline-flex h-[23px] w-[23px] items-center justify-center rounded-full ring-1 ring-[#AE89FF]/60">
                  <img src="/assets/icons/gen-showcase-upload.svg" alt="upload" className="h-[14px] w-[14px]" />
                </span>
                <span className="text-[18px] text-white">创意自动成型</span>
              </div>
              <p className="mt-2 text-[16px] text-white/60">无需手动调整，设计方案即刻生成，创作零门槛</p>
            </div>
          </div>
        </div>

        {/* 2025-10-29: 右侧信息图 712×620 */}
        <div className="relative h-[620px] w-[712px]">
          {/* 海报网格容器 480×600 */}
          <div className="absolute right-[-20px] top-[1px] h-[600px] w-[480px] rounded-2xl border border-white/10 bg-[#111111] p-8 overflow-hidden">
            <div className="mb-4 flex items-center justify-between">
              {/* 2025-11-07 21:55: 标题文字使用灰-白-灰渐变以还原设计稿 */}
              <span className={`text-[18px] ${gradentTextXs}`}>图片已生成！</span>
              {/* 2025-10-29: 右上角关闭图标占位 -> 请将 SVG 放在 public/assets/icons/gen-showcase-close.svg */}
              <span className="inline-flex h-6 w-6 items-center justify-center">
                <img src="/assets/icons/gen-showcase-close.svg" alt="close" className="h-full w-full" />
              </span>
            </div>
            <div className="grid grid-cols-2 gap-4">
              {[
                "/assets/images/gen-showcase-01.png",
                "/assets/images/gen-showcase-02.png",
                "/assets/images/gen-showcase-03.png",
                "/assets/images/gen-showcase-04.png",
                "/assets/images/gen-showcase-05.png",
                "/assets/images/gen-showcase-06.png",
              ].map((src, i) => (
                <div
                  key={i}
                  className={`${i >= 4 ? "h-[11.25rem]" : "h-[232px]"} overflow-hidden rounded-[16px] bg-white/5`}
                >
                  <img src={src} alt="" className="h-full w-full object-cover" />
                </div>
              ))}
            </div>
          </div>

          {/* 2025-01-XX: 左下角提示气泡 - 依据 Figma node 345:4621 样式规范 */}
          {/* 主容器：24px 圆角，12% 白色边框，24px 内边距 */}
          <div className="absolute bottom-[55px] left-0 w-[414px] rounded-[24px] border border-[rgba(255,255,255,0.12)] bg-[#111111] p-[24px] flex flex-col gap-[24px]">
            {/* 顶部区域：图标 + 文字标签（pill 形状） */}
            <div className="flex items-center gap-3">
              {/* 图标：48×48px，紫蓝渐变背景，带星形图案 */}
              <span className="inline-flex h-[48px] w-[48px] shrink-0 items-center justify-center rounded-full bg-gradient-to-br from-[#AE89FF] to-[#A0A2FF]">
                <img src="/assets/icons/gen-showcase-badge.svg" alt="badge" className="h-full w-full" />
              </span>
              {/* 文字标签：pill 形状容器 */}
              <span className="rounded-[20px] bg-[rgba(255,255,255,0.05)] px-4 py-2 text-[16px] leading-[24px] text-white">
                设计一张剧院演出的极简主义海报
              </span>
            </div>
            {/* 底部详细描述：毛玻璃效果，内阴影，20px 圆角，1.269px 边框 */}
            <div className="relative rounded-[20px] border-[1.269px] border-[rgba(160,162,255,0.1)] bg-[rgba(255,255,255,0.05)] p-[20.312px] backdrop-blur-[30.467px]">
              <p className="text-[16px] leading-[24px] text-white whitespace-pre-wrap">
                黑色背景，营造戏剧性氛围，使用单张舞台现场照片作为主视觉，照片采用自然光影，突出表演者的情绪和动作，暗调为主，局部强光（舞台灯光效果）
              </p>
              {/* 内阴影效果 */}
              <div className="pointer-events-none absolute inset-[-0.635px] rounded-[20px] shadow-[inset_0px_0px_20.312px_0px_rgba(255,255,255,0.1)]" />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

