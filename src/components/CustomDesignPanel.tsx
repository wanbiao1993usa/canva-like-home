// 2025-10-29: 自由定制设计分区（Figma node 345:4674）
// 说明：左侧编辑器面板 + 右侧说明卡片 + 底部动作栏 + 浮动提示卡
// 图标/图片使用占位文件，请按命名在 public/assets 下补充资源
import type { CSSProperties } from "react";

export default function CustomDesignPanel() {
  const glow: CSSProperties = {
    background:
      "radial-gradient(50% 50% at 50% 50%, rgba(255,255,255,0.12) 0%, rgba(255,255,255,0.06) 35%, rgba(255,255,255,0) 70%)",
  };

  const thumbs = [
    "/assets/images/custom-design-thumb-01.png",
    "/assets/images/custom-design-thumb-02.png",
    "/assets/images/custom-design-thumb-03.png",
    "/assets/images/custom-design-thumb-04.png",
    "/assets/images/custom-design-thumb-05.png",
    "/assets/images/custom-design-thumb-06.png",
    "/assets/images/custom-design-thumb-07.png",
    "/assets/images/custom-design-thumb-08.png",
  ];

  return (
    <section className="py-16 xl:py-24 2xl:py-28">
      <div className="relative mx-auto flex w-full max-w-[1280px] items-center gap-12">
        {/* 左侧：编辑器面板 720×598 */}
        <div className="relative h-[598px] w-[720px] rounded-[32px]">
          {/* 背景高光椭圆 */}
          <div className="pointer-events-none absolute left-[calc(50%+20px)] top-[calc(50%-31px)] h-[760px] w-[760px] -translate-x-1/2 -translate-y-1/2" style={glow} />

          {/* 顶部主画布卡片 620×498 */}
          <div className="absolute left-0 top-0 h-[498px] w-[620px] rounded-2xl border border-white/10 bg-[#111111] p-6">
            <div className="flex h-full gap-2.5 rounded-xl">
              {/* 侧边 Layer 列表 ~120 宽 */}
              <aside className="flex h-full w-[120px] flex-col rounded-lg border-r border-white/10 bg-[#242424] p-2.5">
                <span className="mb-2 text-[8.7px] text-white/90">Layer</span>
                <div className="space-y-1.5">
                  {thumbs.slice(0, 2).map((src, i) => (
                    <div key={i} className="flex items-center gap-1.5">
                      <img src="/assets/icons/custom-design-chevron-right.svg" alt="open" className="h-2.5 w-2.5 opacity-80" />
                      <div className="h-[50px] w-[93px] overflow-hidden rounded-[10px] bg-[#1C1C1C] p-1.5">
                        <img src={src} alt="" className="h-full w-full object-contain" />
                      </div>
                    </div>
                  ))}

                  {/* 展开分组 */}
                  <div className="mt-1.5 flex items-start gap-1.5">
                    <img src="/assets/icons/custom-design-chevron-down.svg" alt="down" className="h-2.5 w-2.5 opacity-80" />
                    <div className="flex-1">
                      <div className="ml-2 border-l border-white/10 pl-2">
                        {thumbs.slice(2, 8).map((src, i) => (
                          <div key={i} className="mb-1.5 h-8 w-17.5 overflow-hidden rounded-[10px] bg-[#1C1C1C] p-1">
                            <img src={src} alt="" className="h-full w-full object-contain" />
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>

                  <div className="flex items-center gap-1.5">
                    <img src="/assets/icons/custom-design-chevron-right.svg" alt="open" className="h-2.5 w-2.5 opacity-80" />
                    <div className="h-[50px] w-[93px] overflow-hidden rounded-[10px] bg-[#1C1C1C] p-1.5">
                      <img src="/assets/images/custom-design-thumb-09.png" alt="" className="h-full w-full object-contain" />
                    </div>
                  </div>
                </div>
              </aside>

              {/* 中部主画布 */}
              <div className="flex flex-1 items-center justify-center bg-[#1C1C1C] px-15 py-16">
                <div className="h-[312.95px] w-[329.38px] overflow-hidden rounded-[9.66px]">
                  <img src="/assets/images/custom-design-canvas.png" alt="canvas" className="h-full w-full rounded-[9.66px] object-cover" />
                </div>
              </div>
            </div>
          </div>

          {/* 底部动作栏 620×100 */}
          <div className="absolute left-0 top-[498px] h-[100px] w-[620px] rounded-2xl border border-white/10 bg-[#111111] px-8 py-6">
            <div className="grid grid-cols-3 gap-6">
              {[
                { icon: "/assets/icons/custom-design-sparkles.svg", title: "局部修改", desc: "只改需要的地方" },
                { icon: "/assets/icons/custom-design-refresh.svg", title: "完整重绘", desc: "换个思路试试看" },
                { icon: "/assets/icons/custom-design-resize.svg", title: "细节优化", desc: "让画面更完美" },
              ].map((item, i) => (
                <div key={i} className="flex items-center gap-3">
                  <img src={item.icon} alt="" className="h-5 w-5" />
                  <div>
                    <div className="text-[18px] text-white">{item.title}</div>
                    <div className="text-[16px] text-white/60">{item.desc}</div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* 浮动提示卡 240×160 */}
          <div className="absolute bottom-[158px] right-0 w-[240px] rounded-2xl border border-white/10 bg-[#111111] p-6">
            <div className="text-[16px] text-white">
              不喜欢这个结果吗？
              <br />
              立即重新生成！
            </div>
            <button className="mt-6 inline-flex w-full items-center justify-center gap-2 rounded-full border border-[#A582FF]/60 bg-[#AE89FF] px-5 py-2.5 text-[14px] text-[#191919]">
              重新生成
              <img src="/assets/icons/custom-design-refresh-dark.svg" alt="refresh" className="h-4 w-4" />
            </button>
          </div>
        </div>

        {/* 右侧：标题与说明卡 */}
        <div className="flex flex-1 flex-col gap-6">
          {/* 数字胶囊标题 */}
          <div className="inline-flex items-center gap-4 rounded-[100px] border border-white/15 bg-[#181818] px-2 py-2 pr-6">
            <span className="flex h-12 w-12 items-center justify-center rounded-[40px] bg-[#AE89FF] text-[18px] text-[#191919]">2</span>
            <span className="text-[18px] text-white">随心所欲的自由定制设计</span>
          </div>

          {/* 两张说明卡 */}
          <div className="rounded-2xl border border-white/15 bg-[#181818] p-6">
            <div className="flex items-center gap-3">
              <img src="/assets/icons/custom-design-sparkles-accent.svg" alt="sparkles" className="h-6 w-6" />
              <span className="text-[18px] text-white">每个图层都是智能体</span>
            </div>
            <p className="mt-3 text-[16px] text-white/60">每个图层独立识别内容，精准响应局部编辑指令</p>
          </div>

          <div className="rounded-2xl border border-white/15 bg-[#181818] p-6">
            <div className="flex items-center gap-3">
              <img src="/assets/icons/custom-design-robot.svg" alt="robot" className="h-6 w-6" />
              <span className="text-[18px] text-white">想改就改，想绘就绘</span>
            </div>
            <p className="mt-3 text-[16px] text-white/60">说出编辑想法，AI智能判断并执行：局部修改、完整重绘或细节优化</p>
          </div>
        </div>
      </div>
    </section>
  );
}


