import type { ReactNode } from "react";
import { ToastProvider } from "../../components/common/toast";
import BackToTopButton from "../../components/common/BackToTopButton";
import { LocaleProvider } from "../../components/providers/LocaleProvider";
import { defaultLocale, getDictionary, isLocale, locales } from "../i18n";

export const metadata = {
  title: "CanDe",
  description: "AI 设计创作更简单 | CanDe",
};

type LocaleLayoutProps = {
  children: ReactNode;
  params?: Promise<{
    locale?: string | string[];
  }>;
};

/**
 * 2025-11-11 15:40: 为所有受支持 locale 生成静态路径
 */
export function generateStaticParams() {
  return locales.map((locale) => ({ locale }));
}

/**
 * 2025-11-11 15:40: 根据 locale 加载字典并注入上下文
 */
export default async function LocaleLayout({ children, params }: LocaleLayoutProps) {
  /** 2025-11-12 00:20: Next.js 15 将 params 包裝为 Promise，此处统一解析并兜底 */
  const resolvedParams = (params ? await params : {}) as { locale?: string | string[] };
  const localeParam = Array.isArray(resolvedParams.locale) ? resolvedParams.locale[0] : resolvedParams.locale;
  const activeLocale = localeParam && isLocale(localeParam) ? localeParam : defaultLocale;
  const dictionary = await getDictionary(activeLocale);
  const layoutDictionary =
    (dictionary["layout"] as { backToTop?: string; backToTopAria?: string } | undefined) ?? {};

  return (
    <LocaleProvider locale={activeLocale} dictionary={dictionary}>
      {/* 2025-11-11 14:20: ToastProvider 注入全局提示能力 */}
      <ToastProvider>
        <div className="relative z-10">{children}</div>
        {/* 2025-11-11 23:25: 鍏ㄥ眬杩斿洖椤堕儴鎸夐挳浠ュ姞寮€甯﹁鍙嶅悜 */}
        <BackToTopButton
          label={layoutDictionary.backToTop}
          ariaLabel={layoutDictionary.backToTopAria}
        />
      </ToastProvider>
    </LocaleProvider>
  );
}
