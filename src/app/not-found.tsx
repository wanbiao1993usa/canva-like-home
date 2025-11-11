import Link from "next/link";
import { cookies, headers } from "next/headers";
import Header from "@/components/common/Header";
import Footer from "@/components/common/Footer";
import { btnPrimary } from "@/ui";
import GlowEffect from "@/components/common/GlowEffect";
import { ToastProvider } from "@/components/common/toast";
import { LocaleProvider } from "@/components/providers/LocaleProvider";
import { defaultLocale, getDictionary, isLocale, localeCookieName, type Locale } from "./i18n";
/**
 * 404 页面
 * 创建时间：2025-11-11 17:45
 * 说明：复用 Header/Footer 并居中展示 404 主视觉与回到主页 CTA。
 */
const isValidLocale = (value?: string | null): value is Locale => {
  if (!value) return false;
  return isLocale(value);
};

export default async function NotFoundPage() {
  const [headerStore, cookieStore] = await Promise.all([headers(), cookies()]);
  const headerLocale = headerStore?.get("x-cande-locale") ?? undefined;
  const cookieLocale = cookieStore?.get(localeCookieName)?.value;
  const activeLocale = [headerLocale, cookieLocale].find(isValidLocale) ?? defaultLocale;
  const dictionary = await getDictionary(activeLocale);

  return (
    <LocaleProvider locale={activeLocale} dictionary={dictionary}>
      <ToastProvider>
        <div className="min-h-screen relative w-full flex flex-col">
          <div className="w-full mx-auto px-4 md:px-6 lg:px-12 pt-6">
            <Header />
          </div>

          <GlowEffect
            top="-2rem"
            src="/assets/icons/404-eclipse.svg"
            width={1100}
            height={1100}
            alt="灵感光影"
            priority={false}
            className="left-1/2 -translate-x-1/2 z-[60] w-[1100px] h-[1100px]"
            imageClassName="rounded-[44px]"
          />

          <main
            className="flex-1 flex items-center justify-center px-4"
            role="main"
            aria-label="404 错误页面"
          >
            <div className="text-center">
              <h1 className="sr-only">页面未找到 - 404</h1>

              {/* 2025-11-11 18:05: 404 主视觉数字与星形图案 */}
              <div className="flex items-center justify-center gap-2 md:gap-4">
                <svg xmlns="http://www.w3.org/2000/svg" width="484" height="200" viewBox="0 0 484 200" fill="none">
                  <g clipPath="url(#paint0_diamond_672_7178_clip_path)" data-figma-skip-parse="true"><g transform="matrix(0.690276 0.09 -0.217552 1.66856 241.724 100)"><rect x="0" y="0" width="364.293" height="78.0771" fill="url(#paint0_diamond_672_7178)" opacity="1" shapeRendering="crispEdges" /><rect x="0" y="0" width="364.293" height="78.0771" transform="scale(1 -1)" fill="url(#paint0_diamond_672_7178)" opacity="1" shapeRendering="crispEdges" /><rect x="0" y="0" width="364.293" height="78.0771" transform="scale(-1 1)" fill="url(#paint0_diamond_672_7178)" opacity="1" shapeRendering="crispEdges" /><rect x="0" y="0" width="364.293" height="78.0771" transform="scale(-1)" fill="url(#paint0_diamond_672_7178)" opacity="1" shapeRendering="crispEdges" /></g></g><path d="M78.3448 179.31V137.379L79.2276 132.965V42.2621L87.6138 44.6897L21.4069 134.29L12.3586 125.683H121.379V144.883H0V127.007L79.2276 20.4138H102.4V179.31H78.3448Z" data-figma-gradient-fill="{&quot;type&quot;:&quot;GRADIENT_DIAMOND&quot;,&quot;stops&quot;:[{&quot;color&quot;:{&quot;r&quot;:1.0,&quot;g&quot;:1.0,&quot;b&quot;:1.0,&quot;a&quot;:1.0},&quot;position&quot;:0.0},{&quot;color&quot;:{&quot;r&quot;:1.0,&quot;g&quot;:1.0,&quot;b&quot;:1.0,&quot;a&quot;:0.0},&quot;position&quot;:1.0}],&quot;stopsVar&quot;:[{&quot;color&quot;:{&quot;r&quot;:1.0,&quot;g&quot;:1.0,&quot;b&quot;:1.0,&quot;a&quot;:1.0},&quot;position&quot;:0.0},{&quot;color&quot;:{&quot;r&quot;:1.0,&quot;g&quot;:1.0,&quot;b&quot;:1.0,&quot;a&quot;:0.0},&quot;position&quot;:1.0}],&quot;transform&quot;:{&quot;m00&quot;:1380.5510253906250,&quot;m01&quot;:-435.10317993164062,&quot;m02&quot;:-230.99946594238281,&quot;m10&quot;:179.99990844726562,&quot;m11&quot;:3337.125488281250,&quot;m12&quot;:-1658.56250},&quot;opacity&quot;:1.0,&quot;blendMode&quot;:&quot;NORMAL&quot;,&quot;visible&quot;:true}" />
                  <g clipPath="url(#paint1_diamond_672_7178_clip_path)" data-figma-skip-parse="true"><g transform="matrix(0.690276 0.09 -0.217552 1.66856 241.724 100)"><rect x="0" y="0" width="364.293" height="78.0771" fill="url(#paint1_diamond_672_7178)" opacity="1" shapeRendering="crispEdges" /><rect x="0" y="0" width="364.293" height="78.0771" transform="scale(1 -1)" fill="url(#paint1_diamond_672_7178)" opacity="1" shapeRendering="crispEdges" /><rect x="0" y="0" width="364.293" height="78.0771" transform="scale(-1 1)" fill="url(#paint1_diamond_672_7178)" opacity="1" shapeRendering="crispEdges" /><rect x="0" y="0" width="364.293" height="78.0771" transform="scale(-1)" fill="url(#paint1_diamond_672_7178)" opacity="1" shapeRendering="crispEdges" /></g></g><path d="M261.188 9.25966L244.557 96.5627L292.359 23.2136L312.873 30.6346L320.294 51.1491L251.61 97.8532L332.175 80.8644L341.434 100.617L332.175 120.371L247.799 104.298L320.293 151.541L312.873 172.055L292.357 179.476L246.078 111.418L261.188 190.74L241.434 200L221.681 190.74L238.481 111.071L191.967 179.476L171.452 172.055L164.032 151.541L237.125 103.905L150.694 120.371L141.434 100.617L150.694 80.8644L233.369 98.2986L164.031 51.1491L171.451 30.6346L191.966 23.2136L240.247 97.3018L221.681 9.25966L241.434 0L261.188 9.25966Z" data-figma-gradient-fill="{&quot;type&quot;:&quot;GRADIENT_DIAMOND&quot;,&quot;stops&quot;:[{&quot;color&quot;:{&quot;r&quot;:1.0,&quot;g&quot;:1.0,&quot;b&quot;:1.0,&quot;a&quot;:1.0},&quot;position&quot;:0.0},{&quot;color&quot;:{&quot;r&quot;:1.0,&quot;g&quot;:1.0,&quot;b&quot;:1.0,&quot;a&quot;:0.0},&quot;position&quot;:1.0}],&quot;stopsVar&quot;:[{&quot;color&quot;:{&quot;r&quot;:1.0,&quot;g&quot;:1.0,&quot;b&quot;:1.0,&quot;a&quot;:1.0},&quot;position&quot;:0.0},{&quot;color&quot;:{&quot;r&quot;:1.0,&quot;g&quot;:1.0,&quot;b&quot;:1.0,&quot;a&quot;:0.0},&quot;position&quot;:1.0}],&quot;transform&quot;:{&quot;m00&quot;:1380.5510253906250,&quot;m01&quot;:-435.10317993164062,&quot;m02&quot;:-230.99946594238281,&quot;m10&quot;:179.99990844726562,&quot;m11&quot;:3337.125488281250,&quot;m12&quot;:-1658.56250},&quot;opacity&quot;:1.0,&quot;blendMode&quot;:&quot;NORMAL&quot;,&quot;visible&quot;:true}" />
                  <g clipPath="url(#paint2_diamond_672_7178_clip_path)" data-figma-skip-parse="true"><g transform="matrix(0.690276 0.09 -0.217552 1.66856 241.724 100)"><rect x="0" y="0" width="364.293" height="78.0771" fill="url(#paint2_diamond_672_7178)" opacity="1" shapeRendering="crispEdges" /><rect x="0" y="0" width="364.293" height="78.0771" transform="scale(1 -1)" fill="url(#paint2_diamond_672_7178)" opacity="1" shapeRendering="crispEdges" /><rect x="0" y="0" width="364.293" height="78.0771" transform="scale(-1 1)" fill="url(#paint2_diamond_672_7178)" opacity="1" shapeRendering="crispEdges" /><rect x="0" y="0" width="364.293" height="78.0771" transform="scale(-1)" fill="url(#paint2_diamond_672_7178)" opacity="1" shapeRendering="crispEdges" /></g></g><path d="M440.414 179.31V137.379L441.297 132.965V42.2621L449.683 44.6897L383.476 134.29L374.428 125.683H483.448V144.883H362.069V127.007L441.297 20.4138H464.469V179.31H440.414Z" data-figma-gradient-fill="{&quot;type&quot;:&quot;GRADIENT_DIAMOND&quot;,&quot;stops&quot;:[{&quot;color&quot;:{&quot;r&quot;:1.0,&quot;g&quot;:1.0,&quot;b&quot;:1.0,&quot;a&quot;:1.0},&quot;position&quot;:0.0},{&quot;color&quot;:{&quot;r&quot;:1.0,&quot;g&quot;:1.0,&quot;b&quot;:1.0,&quot;a&quot;:0.0},&quot;position&quot;:1.0}],&quot;stopsVar&quot;:[{&quot;color&quot;:{&quot;r&quot;:1.0,&quot;g&quot;:1.0,&quot;b&quot;:1.0,&quot;a&quot;:1.0},&quot;position&quot;:0.0},{&quot;color&quot;:{&quot;r&quot;:1.0,&quot;g&quot;:1.0,&quot;b&quot;:1.0,&quot;a&quot;:0.0},&quot;position&quot;:1.0}],&quot;transform&quot;:{&quot;m00&quot;:1380.5510253906250,&quot;m01&quot;:-435.10317993164062,&quot;m02&quot;:-230.99946594238281,&quot;m10&quot;:179.99990844726562,&quot;m11&quot;:3337.125488281250,&quot;m12&quot;:-1658.56250},&quot;opacity&quot;:1.0,&quot;blendMode&quot;:&quot;NORMAL&quot;,&quot;visible&quot;:true}" />
                  <defs>
                    <clipPath id="paint0_diamond_672_7178_clip_path"><path d="M78.3448 179.31V137.379L79.2276 132.965V42.2621L87.6138 44.6897L21.4069 134.29L12.3586 125.683H121.379V144.883H0V127.007L79.2276 20.4138H102.4V179.31H78.3448Z" /></clipPath><clipPath id="paint1_diamond_672_7178_clip_path"><path d="M261.188 9.25966L244.557 96.5627L292.359 23.2136L312.873 30.6346L320.294 51.1491L251.61 97.8532L332.175 80.8644L341.434 100.617L332.175 120.371L247.799 104.298L320.293 151.541L312.873 172.055L292.357 179.476L246.078 111.418L261.188 190.74L241.434 200L221.681 190.74L238.481 111.071L191.967 179.476L171.452 172.055L164.032 151.541L237.125 103.905L150.694 120.371L141.434 100.617L150.694 80.8644L233.369 98.2986L164.031 51.1491L171.451 30.6346L191.966 23.2136L240.247 97.3018L221.681 9.25966L241.434 0L261.188 9.25966Z" /></clipPath><clipPath id="paint2_diamond_672_7178_clip_path"><path d="M440.414 179.31V137.379L441.297 132.965V42.2621L449.683 44.6897L383.476 134.29L374.428 125.683H483.448V144.883H362.069V127.007L441.297 20.4138H464.469V179.31H440.414Z" /></clipPath><linearGradient id="paint0_diamond_672_7178" x1="0" y1="0" x2="500" y2="500" gradientUnits="userSpaceOnUse">
                      <stop stopColor="white" />
                      <stop offset="1" stopColor="white" stopOpacity="0" />
                    </linearGradient>
                    <linearGradient id="paint1_diamond_672_7178" x1="0" y1="0" x2="500" y2="500" gradientUnits="userSpaceOnUse">
                      <stop stopColor="white" />
                      <stop offset="1" stopColor="white" stopOpacity="0" />
                    </linearGradient>
                    <linearGradient id="paint2_diamond_672_7178" x1="0" y1="0" x2="500" y2="500" gradientUnits="userSpaceOnUse">
                      <stop stopColor="white" />
                      <stop offset="1" stopColor="white" stopOpacity="0" />
                    </linearGradient>
                  </defs>
                </svg>
              </div>

              {/* 2025-11-11 18:05: 错误提示文案 */}
              <p className="mt-6 md:mt-8 text-white text-base md:text-lg lg:text-xl font-medium">
                抱歉，您要找的页面跑丢了
              </p>

              {/* 2025-11-11 18:20: 回到主页 CTA，补充 focus 样式保证键盘可见 */}
              <Link
                href="/"
                className={`${btnPrimary} mt-8 md:mt-10 inline-flex font-bold items-center gap-2 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white/80`}
                aria-label="返回网站主页"
              >
                回到主页
              </Link>
            </div>
          </main>

          <div className="w-full max-w-[1400px] mx-auto px-4 md:px-6 lg:px-12 pb-10">
            <Footer />
          </div>
        </div>
      </ToastProvider>
    </LocaleProvider>
  );
}
