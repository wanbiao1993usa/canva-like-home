import Header from "../../components/common/Header";
import Footer from "../../components/common/Footer";

import Hero from "../../components/home/Hero";
import AppPreview from "../../components/home/AppPreview";
import DesignMagicBanner from "../../components/home/DesignMagicBanner";
import GenerationShowcase from "../../components/home/GenerationShowcase";
import CustomDesignPanel from "../../components/home/CustomDesignPanel";
import StartFromTemplates from "../../components/home/StartFromTemplates";
import CallDesignerCollab from "../../components/home/CallDesignerCollab";
import CTA from "../../components/common/CTA";

/**
 * 2025-11-11 16:10: 首页实现迁移至 [locale] 路由
 */
export default function HomePage() {
  return (
    <main className="mx-auto max-w-[1280px] xl:max-w-[1440px] 2xl:max-w-[1680px] px-6 sm:px-8 lg:px-12 xl:px-16 2xl:px-[48px] font-[PingFang SC]">
      <Header />

      <Hero />

      <AppPreview />

      <DesignMagicBanner />

      <GenerationShowcase />

      <CustomDesignPanel />

      <StartFromTemplates />

      <CallDesignerCollab />

      <CTA />

      <Footer />
    </main>
  );
}
