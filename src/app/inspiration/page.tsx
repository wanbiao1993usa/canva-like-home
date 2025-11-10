import Header from "../../components/common/Header";
import Footer from "../../components/common/Footer";

import HeroIntro from "../../components/inspiration/HeroIntro";
import GalleryGrid from "../../components/inspiration/GalleryGrid";

export default function InspirationPage() {
  return (
    <main className="mx-auto max-w-[1280px] xl:max-w-[1440px] 2xl:max-w-[1680px] px-6 sm:px-8 lg:px-12 xl:px-16 2xl:px-[48px] font-[PingFang SC]">
      <Header />

      <HeroIntro />

      <GalleryGrid />

      <Footer />
    </main>
  );
}
