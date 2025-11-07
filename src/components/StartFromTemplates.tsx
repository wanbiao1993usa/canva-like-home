// 2025-10-29: 从模版开始创建分区（Figma node 345:4758）
// 说明：左侧为标题与要点说明，右侧为圆形卡片信息图；
// 图标与图片均使用占位路径，后续请在 public/assets 下补齐资源文件（UTF-8）。
import type { CSSProperties } from "react";

export default function StartFromTemplates() {
  // 背景发光大环（使用径向渐变模拟 Figma Ellipse 312）
  const glowRing: CSSProperties = {
    background:
      "radial-gradient(50% 50% at 50% 50%, rgba(255,255,255,0.18) 0%, rgba(255,255,255,0.10) 22%, rgba(255,255,255,0.05) 38%, rgba(255,255,255,0.00) 60%)",
  };

  // 右侧信息图所用图片占位名称（请在 public/assets/images 下补齐）：
  const bubbles = [
    "/assets/images/template-bubble-01.png",
    "/assets/images/template-bubble-02.png",
    "/assets/images/template-bubble-03.png",
    "/assets/images/template-bubble-04.png",
    "/assets/images/template-bubble-05.png",
    "/assets/images/template-bubble-06.png",
    "/assets/images/template-bubble-07.png",
    "/assets/images/template-bubble-08.png",
    "/assets/images/template-bubble-09.png",
    "/assets/images/template-bubble-10.png",
  ];

  return (
    <section className="py-16 xl:py-24 2xl:py-28">
      <div className="relative mx-auto flex w-full max-w-[1280px] items-center gap-12">
        {/* 左侧：标题与说明（宽 500） */}
        <div className="flex w-[500px] flex-col gap-6">
          {/* 数字胶囊标题 */}
          <div className="inline-flex items-center gap-4 rounded-[100px] border border-white/15 bg-[#181818] px-2 py-2 pr-6">
            <span className="flex h-[46.15px] w-[46.15px] items-center justify-center rounded-[38.46px] bg-[#AE89FF] text-[17.3px] text-[#191919]">3</span>
            <span className="text-[17.3px] text-white">从模版开始创建</span>
          </div>

          {/* 说明卡组（两条） */}
          <div className="rounded-2xl border border-white/15 bg-[#181818] p-[23px]">
            <div className="mb-[23px] flex items-center gap-3">
              {/* 占位图标：请提供 /assets/icons/gen-showcase-camera.svg */}
              <img src="/assets/icons/gen-showcase-camera.svg" alt="camera" className="h-[23px] w-[23px]" />
              <span className="text-[17.3px] text-white">精选模板库，精准匹配需求</span>
            </div>
            <p className="text-[15.4px] text-white/60">精准分类让你快速找到心仪设计，无需从零开始</p>
          </div>

          <div className="rounded-2xl border border-white/15 bg-[#181818] p-[23px]">
            <div className="mb-[23px] flex items-center gap-3">
              {/* 占位图标：请提供 /assets/icons/gen-showcase-upload.svg */}
              <img src="/assets/icons/gen-showcase-upload.svg" alt="upload" className="h-[23px] w-[23px]" />
              <span className="text-[17.3px] text-white">专业级设计，开箱即用</span>
            </div>
            <p className="text-[15.4px] text-white/60">每款模板都经专业设计师打磨，确保视觉品质与体验</p>
          </div>
        </div>

        {/* 右侧：信息图（720×672） */}
        <div className="relative h-[672.08px] w-[720px] rounded-[37.4px]">
          {/* 背景淡色块（参考 Figma 多个半透明方块） */}
          <div className="absolute left-[219.74px] top-[67.79px] h-[100.52px] w-[100.52px] rounded-[18.7px] bg-white/10" />
          <div className="absolute left-[566.88px] top-[158.96px] h-[102.86px] w-[102.86px] rounded-[18.7px] bg-white/10" />
          <div className="absolute left-[445.32px] top-[425.45px] h-[155.45px] w-[155.45px] rounded-[18.7px] bg-white/10" />
          <div className="absolute left-[254.81px] top-[278.18px] h-[163.64px] w-[163.64px] rounded-[18.7px] bg-white/10" />
          <div className="absolute left-[258.31px] top-[184.68px] h-[66.62px] w-[66.62px] rounded-[18.7px] bg-white/10" />
          <div className="absolute left-[492.08px] top-[301.56px] h-[66.62px] w-[66.62px] rounded-[18.7px] bg-white/10" />
          <div className="absolute left-[386.88px] top-[86.49px] h-[118.05px] w-[118.05px] rounded-[18.7px] bg-white/10" />
          <div className="absolute left-[218.57px] top-[472.21px] h-[137.92px] w-[137.92px] rounded-[18.7px] bg-white/10" />
          <div className="absolute left-[82.99px] top-[180px] h-[140.26px] w-[140.26px] rounded-[18.7px] bg-white/10" />
          <div className="absolute left-[120.39px] top-[333.12px] h-[80.65px] w-[80.65px] rounded-[18.7px] bg-white/10" />

          {/* 中央发光环（615.97×615.97） */}
          <div
            className="absolute left-1/2 top-1/2 size-[615.97px] -translate-x-1/2 -translate-y-1/2 rounded-full"
            style={glowRing}
          />

          {/* 带边框的图片卡片（参考 Figma 具体尺寸与位置） */}
          <div className="absolute left-[59.61px] top-[168.31px] h-[140.26px] w-[140.26px] overflow-hidden rounded-[18.7px] border border-white/50">
            <img src={bubbles[0]} alt="template-01" className="h-full w-full object-cover" />
          </div>
          <div className="absolute left-[196.36px] top-[44.42px] h-[100.52px] w-[100.52px] overflow-hidden rounded-[18.7px] border border-white/50">
            <img src={bubbles[1]} alt="template-02" className="h-full w-full object-cover" />
          </div>
          <div className="absolute left-[543.51px] top-[182.34px] h-[102.86px] w-[102.86px] overflow-hidden rounded-[18.7px] border border-white/50">
            <img src={bubbles[2]} alt="template-03" className="h-full w-full object-cover" />
          </div>
          <div className="absolute left-[421.95px] top-[448.83px] h-[155.45px] w-[155.45px] overflow-hidden rounded-[18.7px] border border-white/50">
            <img src={bubbles[3]} alt="template-04" className="h-full w-full object-cover" />
          </div>
          <div className="absolute left-[95.84px] top-[350.65px] h-[80.65px] w-[80.65px] overflow-hidden rounded-[18.7px] border border-white/50">
            <img src={bubbles[4]} alt="template-05" className="h-full w-full object-cover" />
          </div>
          <div className="absolute left-1/2 top-[calc(50%+0.58px)] h-[163.64px] w-[163.64px] -translate-x-1/2 -translate-y-1/2 overflow-hidden rounded-[18.7px] border border-white/50">
            <img src={bubbles[5]} alt="template-06" className="h-full w-full object-cover" />
          </div>
          <div className="absolute left-[281.69px] top-[161.30px] h-[66.62px] w-[66.62px] overflow-hidden rounded-[18.7px] border border-white/50">
            <img src={bubbles[6]} alt="template-07" className="h-full w-full object-cover" />
          </div>
          <div className="absolute left-[468.70px] top-[278.18px] h-[66.62px] w-[66.62px] overflow-hidden rounded-[18.7px] border border-white/50">
            <img src={bubbles[7]} alt="template-08" className="h-full w-full object-cover" />
          </div>
          <div className="absolute left-[410.26px] top-[109.87px] h-[118.05px] w-[118.05px] overflow-hidden rounded-[18.7px] border border-white/50">
            <img src={bubbles[8]} alt="template-09" className="h-full w-full object-cover" />
          </div>
          <div className="absolute left-[195.19px] top-[448.83px] h-[137.92px] w-[137.92px] overflow-hidden rounded-[18.7px] border border-white/50">
            <img src={bubbles[9]} alt="template-10" className="h-full w-full object-cover" />
          </div>
        </div>
      </div>
    </section>
  );
}


