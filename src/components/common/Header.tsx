'use client';

import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { transitionAll } from "../../ui";
import { useFeatureToast } from "./toast";
import { useLocaleContext } from "../providers/LocaleProvider";
import { locales, type Locale } from "../../app/i18n";
import { useTranslator } from "../../hooks/useTranslator";
type NavItem = {
  id: string;
  href: string;
  labelKey: string;
  matchPath?: string;
  comingSoon?: boolean;
};

const navItems: NavItem[] = [
  { id: "home", href: "/", labelKey: "header.nav.home", matchPath: "/" },
  { id: "ideas", href: "/inspiration", labelKey: "header.nav.ideas", matchPath: "/inspiration" },
  { id: "pricing", href: "/pricing", labelKey: "header.nav.pricing", matchPath: "/pricing" },
  { id: "contact", href: "/contact", labelKey: "header.nav.contact", matchPath: "/contact" },
  // 2025-02-15 11:00 替换原“关于”导航为“教程”，保持即将上线提示
  { id: "tutorial", href: "/tutorials", labelKey: "header.nav.tutorial", matchPath: "/tutorials", comingSoon: true },
];

export default function Header() {
  const router = useRouter();
  const pathname = usePathname() ?? "/";
  const { locale } = useLocaleContext();
  const t = useTranslator();
  const notifyNavFeature = useFeatureToast(t("common.comingSoon"));
  const [languageMenuOpen, setLanguageMenuOpen] = useState(false);
  const languageMenuContainerRef = useRef<HTMLDivElement | null>(null);

  const focusStyles = "focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white/80";
  // 2025-02-14 将 Link 设为 inline-flex 以扩大可点击区域
  const navLinkBase =
    `inline-flex items-center justify-center rounded-full px-4 py-2.5 text-[14px] font-medium text-white/90 ${transitionAll} hover:bg-white/5 hover:text-white whitespace-nowrap ${focusStyles}`;
  const navActiveClass =
    `inline-flex items-center justify-center rounded-full bg-[#171719] px-4 py-2.5 text-[14px] font-semibold text-white ${transitionAll} shadow-[0_8px_22px_rgba(0,0,0,0.4)] ${focusStyles}`;
  const languageBtnClass =
    `inline-flex w-[120px] h-[32px] mr-4 cursor-pointer items-center gap-1 rounded-[8px] px-3 text-[14px] font-medium text-white ${transitionAll} hover:border-white/30 ${focusStyles}`;
  const desktopCtaClass =
    `inline-flex min-w-[140px] cursor-pointer items-center gap-2 rounded-full border-t-2 border-[#3D3D3D] bg-[#191919] px-6 py-[14px] text-[18px] font-semibold leading-none text-white shadow-[0_12px_24px_rgba(0,0,0,0.35)] whitespace-nowrap ${transitionAll} hover:bg-[#1f1f1f] ${focusStyles}`;
  const mobileCtaClass =
    `xl:hidden inline-flex items-center gap-2 rounded-full bg-[#191919] px-5 py-3 text-[16px] font-semibold text-white shadow-[0_12px_26px_rgba(0,0,0,0.35)] whitespace-nowrap ${transitionAll} hover:bg-[#1f1f1f] ${focusStyles}`;

  const stripLocaleFromPath = () => {
    if (!pathname) return "/";
    const segments = pathname.split("/").filter(Boolean);
    if (segments.length > 0 && locales.includes(segments[0] as Locale)) {
      segments.shift();
    }
    return segments.length ? `/${segments.join("/")}` : "/";
  };
  const normalizedPathname = stripLocaleFromPath();

  const isRouteActive = (item: NavItem) => {
    if (!item.matchPath) return false;
    if (item.matchPath === "/") return normalizedPathname === "/";
    return normalizedPathname.startsWith(item.matchPath);
  };

  const localePrefix = locale === locales[0] ? "" : `/${locale}`;
  // 2025-02-15 15:20 根据当前语言展示按钮文案，方便用户识别
  const languageButtonLabel = locale === "zh-CN" ? "简体中文" : "English";

  /**
   * 2025-11-11 18:05: 依据当前路径拼接目标 locale，保持原有层级结构
   */
  const buildLocalePath = (targetLocale: Locale) => {
    const segments = pathname.split("/").filter(Boolean);
    if (segments.length === 0) {
      return `/${targetLocale}`;
    }
    if (locales.includes(segments[0] as Locale)) {
      segments[0] = targetLocale;
    } else {
      segments.unshift(targetLocale);
    }
    return `/${segments.join("/")}`;
  };

  /**
   * 2025-11-11 18:05: 点击菜单项切换 locale 并跳转到对应路径
   */
  const handleLocaleChange = (targetLocale: Locale) => {
    if (targetLocale === locale) {
      return;
    }
    const nextPath = buildLocalePath(targetLocale);
    const search = typeof window !== "undefined" ? window.location.search : "";
    const hash = typeof window !== "undefined" ? window.location.hash : "";
    router.push(`${nextPath}${search}${hash}`);
  };

  const handleStartClick = () => {
    if (typeof window !== "undefined") {
      window.open("https://editor.lycium.ai", "_blank", "noopener,noreferrer");
    }
  };
  const closeLanguageMenu = () => setLanguageMenuOpen(false);

  useEffect(() => {
    if (!languageMenuOpen) return;
    const handleClickOutside = (event: MouseEvent) => {
      if (!languageMenuContainerRef.current) return;
      if (!languageMenuContainerRef.current.contains(event.target as Node)) {
        closeLanguageMenu();
      }
    };
    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        closeLanguageMenu();
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    document.addEventListener("keydown", handleKeyDown);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
      document.removeEventListener("keydown", handleKeyDown);
    };
  }, [languageMenuOpen]);

  const toggleLanguageMenu = () => {
    setLanguageMenuOpen((prev) => !prev);
  };

  const handleLocaleSelect = (targetLocale: Locale) => {
    closeLanguageMenu();
    handleLocaleChange(targetLocale);
  };

  return (
    <header className="box-border sticky top-0 z-10 flex items-center justify-between py-6">
      <div className="flex w-[180px] items-center gap-3 sm:w-[220px] 2xl:w-[250px]">
        <Link href="/" className="flex items-center gap-3">
          <img src="/assets/icons/brand-logo.svg" alt="CanDe" className="h-[25.136px] w-[28px]" loading="lazy" />
          <span className="hidden text-2xl font-semibold leading-none tracking-[-0.48px] text-white md:inline">
            CanDe
          </span>
        </Link>
      </div>

      <div className="hidden flex-1 items-center justify-center xl:flex">
        <nav
          aria-label={t("header.nav.ariaLabel")}
          className="flex items-center gap-1 rounded-[32px] border border-[#414141] bg-white/10 p-[5px] shadow-[0_16px_34px_rgba(0,0,0,0.35)] backdrop-blur-[2px]"
        >
          {navItems.map((item) => {
            const active = isRouteActive(item);
            const href = `${localePrefix}${item.href}`.replace(/\/+$/, item.href === "/" ? "/" : "");
            return (
              <Link
                key={item.id}
                href={href}
                aria-current={active ? "page" : undefined}
                aria-disabled={item.comingSoon}
                onClick={item.comingSoon ? notifyNavFeature : undefined}
                className={`${active ? navActiveClass : navLinkBase} ${item.comingSoon ? "cursor-not-allowed opacity-70" : ""}`}
              >
                {t(item.labelKey)}
              </Link>
            );
          })}
        </nav>
      </div>

      <div className="hidden w-auto items-center justify-end gap-2 xl:flex">
        <div className="flex items-center gap-2">
          <div className="relative" ref={languageMenuContainerRef}>
            <button
              className={languageBtnClass}
              aria-label={t("header.language.label")}
              aria-haspopup="listbox"
              aria-expanded={languageMenuOpen}
              type="button"
              onClick={toggleLanguageMenu}
            >
              <span className="whitespace-nowrap text-white">{languageButtonLabel}</span>
              <img src="/assets/icons/chevron-down.svg" alt="" aria-hidden />
            </button>

            {languageMenuOpen ? (
              <div
                role="menu"
                className="absolute right-0 top-full mt-2 w-[200px] rounded-2xl border border-white/10 bg-[#161616] p-2 text-white shadow-[0_18px_34px_rgba(0,0,0,0.5)] backdrop-blur-md"
              >
                <ul className="flex flex-col gap-1" role="presentation">
                  {locales.map((candidate) => {
                    const active = candidate === locale;
                    return (
                      <li key={candidate}>
                        <button
                          type="button"
                          role="menuitemradio"
                          aria-checked={active}
                          className={`flex w-full cursor-pointer items-center justify-between gap-2 rounded-xl px-4 py-2 text-sm transition-colors ${active ? "bg-white/10 text-white" : "text-white/80 hover:bg-white/10"
                            }`}
                          onClick={() => handleLocaleSelect(candidate)}
                        >
                          <span>{t(`header.language.options.${candidate}`)}</span>
                          <span className="text-xs uppercase text-white/40">{candidate}</span>
                        </button>
                      </li>
                    );
                  })}
                </ul>
              </div>
            ) : null}
          </div>

          <button className={desktopCtaClass} type="button" aria-label={t("header.cta.primary")} onClick={handleStartClick}>
            <span>{t("header.cta.primary")}</span>
            <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 20 20" fill="#ffffff" aria-hidden="true">
              <path d="M14.1667 5.83337L5.83333 14.1667M14.1667 5.83337H6.66666M14.1667 5.83337V13.3334" fill="#ffffff" stroke="white" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          </button>
        </div>
      </div>

      <button className={mobileCtaClass} type="button" aria-label={t("header.cta.primary")} onClick={handleStartClick}>
        {t("header.cta.primary")}
        <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 20 20" fill="#ffffff" aria-hidden="true">
          <path d="M14.1667 5.83337L5.83333 14.1667M14.1667 5.83337H6.66666M14.1667 5.83337V13.3334" fill="#ffffff" stroke="white" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
      </button>
    </header>
  );
}
