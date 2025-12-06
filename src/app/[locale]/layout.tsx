import type { Metadata } from "next";
import { cache, type ReactNode } from "react";
import { ToastProvider } from "../../components/common/toast";
import BackToTopButton from "../../components/common/BackToTopButton";
import { LocaleProvider } from "../../components/providers/LocaleProvider";
import { defaultLocale, getDictionary, isLocale, locales, type Locale } from "../i18n";

type LocaleLayoutProps = {
  children: ReactNode;
  params: Promise<{
    locale: string;
  }>;
};

type LayoutDictionary = {
  backToTop?: string;
  backToTopAria?: string;
  metadata?: {
    title?: string;
    description?: string;
  };
};

/**
 * 2025-11-11 15:40: 为所有受支持 locale 生成静态路径
 */
export function generateStaticParams() {
  return locales.map((locale) => ({ locale }));
}

// 2025-11-12 15:05: 解析路由参数中的 locale，兼容 Promise 包装
const resolveLocaleFromParams = async (paramsPromise: LocaleLayoutProps["params"]): Promise<Locale> => {
  const resolvedParams = await paramsPromise;
  const localeParam = resolvedParams.locale;
  // Check if valid locale
  return isLocale(localeParam) ? (localeParam as Locale) : defaultLocale;
};

// 2025-11-12 15:05: 缓存 locale 字典，避免 generateMetadata 与布局重复加载
const getLocaleDictionary = cache(async (locale: Locale) => getDictionary(locale));

const FALLBACK_METADATA = {
  title: "CanDe",
  description: "AI design made simple | CanDe",
};

const resolveLayoutMetadata = async (locale: Locale) => {
  const dictionary = await getLocaleDictionary(locale);
  const layoutDictionary = (dictionary["layout"] as LayoutDictionary | undefined) ?? {};
  let metadata = layoutDictionary.metadata;

  if ((!metadata?.title || !metadata?.description) && locale !== defaultLocale) {
    const fallbackDictionary = await getLocaleDictionary(defaultLocale);
    const fallbackLayoutDictionary = (fallbackDictionary["layout"] as LayoutDictionary | undefined) ?? {};
    metadata = {
      title: metadata?.title ?? fallbackLayoutDictionary.metadata?.title,
      description: metadata?.description ?? fallbackLayoutDictionary.metadata?.description,
    };
  }

  return {
    title: metadata?.title ?? FALLBACK_METADATA.title,
    description: metadata?.description ?? FALLBACK_METADATA.description,
  };
};

// 2025-11-12 15:05: 多语言注入 layout metadata，保持 locale 切换一致
export async function generateMetadata({
  params,
}: {
  params: LocaleLayoutProps["params"];
}): Promise<Metadata> {
  const locale = await resolveLocaleFromParams(params);
  const metadataCopy = await resolveLayoutMetadata(locale);
  return {
    title: metadataCopy.title,
    description: metadataCopy.description,
  };
}

/**
 * 2025-11-11 15:40: 根据 locale 加载字典并注入上下文
 */
export default async function LocaleLayout({ children, params }: LocaleLayoutProps) {
  /** 2025-11-12 15:05: Next.js 15 params 可能是 Promise，这里统一解析 */
  const activeLocale = await resolveLocaleFromParams(params);
  const dictionary = await getLocaleDictionary(activeLocale);
  const layoutDictionary = (dictionary["layout"] as LayoutDictionary | undefined) ?? {};

  return (
    <LocaleProvider locale={activeLocale} dictionary={dictionary}>
      {/* 2025-11-11 14:20: ToastProvider 注入全局提示能力 */}
      <ToastProvider>
        <div className="relative z-10">{children}</div>
        {/* 2025-11-11 23:25: 全局返回顶部按钮，保持滚动提示可访问 */}
        <BackToTopButton
          label={layoutDictionary.backToTop}
          ariaLabel={layoutDictionary.backToTopAria}
        />
      </ToastProvider>
    </LocaleProvider>
  );
}
