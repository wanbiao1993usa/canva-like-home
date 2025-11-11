import Header from "../../../components/common/Header";
import Footer from "../../../components/common/Footer";
import PricingHero from "../../../components/pricing/PricingHero";
import PricingCards from "../../../components/pricing/PricingCards";
import FAQSection from "../../../components/pricing/FAQSection";
import CTA from "../../../components/common/CTA";

/**
 * 2025-11-10 19:50: 定价页骨架
 * 2025-11-11 16:50: 迁移至 [locale] 路由
 */
export default function PricingPage() {
  return (
    <main className="mx-auto max-w-[1280px] xl:max-w-[1440px] 2xl:max-w-[1680px] px-6 sm:px-8 lg:px-12 xl:px-16 2xl:px-[48px] font-[PingFang SC]">
      <Header />

      <PricingHero />

      <PricingCards />

      <FAQSection />

      <CTA />

      <Footer />
    </main>
  );
}
