import { gradentText } from "../../ui";
import CapsuleTagGroup from "../common/CapsuleTagGroup";
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
        <CapsuleTagGroup primaryText="产品特色" secondaryText="智能成就每个细节" />

        {/* 2025-10-29: 核心文案标题 */}
        <h3 className={`text-[32px] font-medium leading-[1.3] ${gradentText}`}>
          幕后的魔法：AI如何让海报设计更简单
        </h3>
      </div>
    </section>
  );
}
