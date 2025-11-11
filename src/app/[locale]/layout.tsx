import type { ReactNode } from "react";
import { ToastProvider } from "../../components/common/toast";
import { LocaleProvider } from "../../components/providers/LocaleProvider";
import { defaultLocale, getDictionary, isLocale, locales } from "../i18n";

export const metadata = {
  title: "CanDe",
  description: "AI 设计创作更简单 | CanDe",
};

type LocaleLayoutProps = {
  children: ReactNode;
  params: {
    locale: string;
  };
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
  const activeLocale = isLocale(params.locale) ? params.locale : defaultLocale;
  const dictionary = await getDictionary(activeLocale);

  return (
    <LocaleProvider locale={activeLocale} dictionary={dictionary}>
      {/* 2025-11-11 14:20: ToastProvider 注入全局提示能力 */}
      <ToastProvider>
        <div className="relative z-10">{children}</div>
      </ToastProvider>
    </LocaleProvider>
  );
}
