import { gradentText } from "../../ui";
import CapsuleTagGroup from "../common/CapsuleTagGroup";

/**
 * 2025-11-10 19:55: 定价页 Hero，静态展示标签+标题+副文案
 */
export default function PricingHero() {
  return (
    <section className="py-20 text-center">
      <CapsuleTagGroup primaryText="产品价格" secondaryText="让品质触手可及" />

      <h1 className={`mt-6 text-4xl lg:text-5xl xl:text-6xl font-bold ${gradentText}`}>
        选择你的创意之旅
      </h1>

      <p className="mt-4 text-base lg:text-lg text-white/70 max-w-2xl mx-auto leading-relaxed">
        从免费开始，根据需求灵活升级。定价清晰无差异，随时可以取消。
      </p>
    </section>
  );
}
