import type { Metadata } from "next";
import type { ReactNode } from "react";
import { cookies, headers } from "next/headers";
import "./globals.css";
import { fontSans } from "./fonts";
import { defaultLocale, getDictionary, isLocale, localeCookieName, type Locale } from "./i18n";

type LayoutMetadata = {
  title?: string;
  description?: string;
};

const FALLBACK_METADATA: Required<LayoutMetadata> = {
  title: "CanDe",
  description: "AI design made simple | CanDe",
};

type RootLayoutProps = {
  children: ReactNode;
};

/**
 * 2025-11-11 18:40: 根布局负责注入 html/body，并根据 cookie 同步 lang 属性
 */
const isValidLocale = (value?: string | null): value is Locale => {
  if (!value) return false;
  return isLocale(value);
};

const getLayoutMetadata = async (locale: Locale): Promise<LayoutMetadata> => {
  const dictionary = await getDictionary(locale);
  const layoutDictionary = (dictionary["layout"] as { metadata?: LayoutMetadata } | undefined) ?? {};
  return layoutDictionary.metadata ?? {};
};

const resolveLayoutMetadata = async (locale: Locale): Promise<Required<LayoutMetadata>> => {
  const metadata = await getLayoutMetadata(locale);
  if (metadata.title && metadata.description) {
    return metadata as Required<LayoutMetadata>;
  }

  if (locale !== defaultLocale) {
    const fallbackMetadata = await getLayoutMetadata(defaultLocale);
    return {
      title: metadata.title ?? fallbackMetadata.title ?? FALLBACK_METADATA.title,
      description: metadata.description ?? fallbackMetadata.description ?? FALLBACK_METADATA.description,
    };
  }

  return FALLBACK_METADATA;
};

const resolveActiveLocaleFromRequest = async (): Promise<Locale> => {
  const [headerStore, cookieStore] = await Promise.all([headers(), cookies()]);
  const headerLocale = headerStore?.get("x-cande-locale") ?? undefined;
  const cookieLocale = cookieStore?.get(localeCookieName)?.value;
  return [headerLocale, cookieLocale].find(isValidLocale) ?? defaultLocale;
};

// 2025-11-12 15:25: 根布局 metadata 支持多语言，依据当前请求 locale 注入
export async function generateMetadata(): Promise<Metadata> {
  const activeLocale = await resolveActiveLocaleFromRequest();
  const metadataCopy = await resolveLayoutMetadata(activeLocale);
  return {
    title: metadataCopy.title,
    description: metadataCopy.description,
  };
}

export default async function RootLayout({ children }: RootLayoutProps) {
  /** 2025-11-12 00:35: Next.js 15 开始 headers/cookies 返回 Promise，此处统一解析 */
  const activeLocale = await resolveActiveLocaleFromRequest();

  return (
    <html lang={activeLocale} className="overflow-x-hidden">
      <body
        className={`${fontSans.className} relative min-h-screen bg-[#111111] text-[#e5e5e5] antialiased before:absolute before:inset-0 before:-z-10 before:content-[''] before:pointer-events-none before:opacity-80 before:blur-[1px] before:bg-[radial-gradient(circle_at_center,_rgba(200,200,200,0.1)_1px,_transparent_1px)] before:bg-[size:6px_6px]`}
      >
        {children}
      </body>
    </html>
  );
}
