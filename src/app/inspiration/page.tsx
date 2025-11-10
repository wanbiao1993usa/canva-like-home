import Header from "../../components/common/Header";
import Footer from "../../components/common/Footer";

import HeroIntro from "../../components/inspiration/HeroIntro";
import GalleryGrid from "../../components/inspiration/GalleryGrid";

export default function InspirationPage() {
  return (
    <main className="mx-auto max-w-[1440px] px-4 sm:px-6 lg:px-8 2xl:max-w-[1680px] 2xl:px-0 font-[PingFang SC]">
      <Header />

      <HeroIntro />

      <GalleryGrid />

      <Footer />
    </main>
  );
}
