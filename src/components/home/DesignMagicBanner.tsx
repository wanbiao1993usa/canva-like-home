import { gradentText } from "../../ui";
// 2025-10-29: 调整命名与配色，组件用于渲染设计魔法横幅
/**
 * 2025-10-29: 设计魔法条幅，凸显产品特色与序号信息。
 */
export default function DesignMagicBanner() {
  return (
    <section className="pt-20">
      <div
        className="relative mx-auto flex w-full max-w-[1320px] flex-col items-center gap-8 pt-6 text-center"
      >
        {/* 2025-10-29: 顶部标签组 */}
        <div className="flex items-center overflow-hidden rounded-[100px] border-t-2 border-[#3D3D3D] bg-[#191919] text-white">
          <div className="flex items-center rounded-[100px] bg-[#AE89FF] px-3.5 py-2">
            <span className="text-sm font-medium text-[#191919]">产品特色</span>
          </div>
          <div className="px-4 text-base text-white">智能成就每个细节</div>
        </div>

        {/* 2025-10-29: 核心文案标题 */}
        <h3 className={`text-[32px] font-medium leading-[1.3] ${gradentText}`}>
          幕后的魔法：AI如何让海报设计更简单
        </h3>
      </div>
    </section>
  );
}
