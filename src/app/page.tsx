import Header from "../components/common/Header";
import Footer from "../components/common/Footer";

import Hero from "../components/home/Hero";
import AppPreview from "../components/home/AppPreview";
import DesignMagicBanner from "../components/home/DesignMagicBanner"; // 2025-10-29: 引入设计魔法条幅组件
import GenerationShowcase from "../components/home/GenerationShowcase"; // 2025-10-29: 引入生成流程演示组件（Figma 345:4563）
import CustomDesignPanel from "../components/home/CustomDesignPanel"; // 2025-10-29: 引入自由定制设计分区（Figma 345:4674）
import StartFromTemplates from "../components/home/StartFromTemplates"; // 2025-10-29: 引入从模版开始创建分区（Figma 345:4758）
import CallDesignerCollab from "../components/home/CallDesignerCollab"; // 2025-10-29: 引入呼叫设计大师分区（Figma 345:4797）
import CTA from "../components/common/CTA";

export default function Page() {
  return (
    <main className="mx-auto max-w-[1280px] xl:max-w-[1440px] 2xl:max-w-[1680px] px-6 sm:px-8 lg:px-12 xl:px-16 2xl:px-[48px] font-[PingFang SC]">
      <Header />

      <Hero />

      <AppPreview />

      {/* 2025-10-29: 新增设计魔法展示区块 */}
      <DesignMagicBanner />

      {/* 2025-10-29: 新增生成流程演示区块 */}
      <GenerationShowcase />

      {/* 2025-10-29: 新增自由定制设计分区 */}
      <CustomDesignPanel />

      {/* 2025-10-29: 新增从模版开始创建分区 */}
      <StartFromTemplates />

      {/* 2025-10-29: 新增呼叫设计大师，同屏共创分区 */}
      <CallDesignerCollab />

      <CTA />

      <Footer />
    </main>
  );
}
