import type { ReactNode } from "react";
import { cookies, headers } from "next/headers";
import "./globals.css";
import { fontSans } from "./fonts";
import { defaultLocale, isLocale, localeCookieName, type Locale } from "./i18n";

export const metadata = {
  title: "CanDe",
  description: "AI 设计创作更简单 | CanDe",
};

type RootLayoutProps = {
  children: ReactNode;
};

/**
 * 2025-11-11 18:40: 根布局负责注入 html/body，并根据 cookie 同步 lang 属性
 */
const isValidLocale = (value?: string): value is Locale => {
  if (!value) return false;
  return isLocale(value);
};

export default async function RootLayout({ children }: RootLayoutProps) {
  /** 2025-11-12 00:35: Next.js 15 开始 headers/cookies 返回 Promise，需先 await */
  const [headerStore, cookieStore] = await Promise.all([headers(), cookies()]);
  const headerLocale = headerStore?.get("x-cande-locale") ?? undefined;
  const cookieLocale = cookieStore?.get(localeCookieName)?.value;
  const activeLocale = [headerLocale, cookieLocale].find(isValidLocale) ?? defaultLocale;

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
