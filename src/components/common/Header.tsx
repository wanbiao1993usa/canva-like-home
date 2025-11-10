'use client';

import Link from "next/link";
import { usePathname } from "next/navigation";
import { transitionAll } from "../../ui";

type NavItem = {
  id: string;
  href: string;
  label: string;
  matchPath?: string;
};

const navItems: NavItem[] = [
  { id: "home", href: "/", label: "主页", matchPath: "/" },
  { id: "ideas", href: "/inspiration", label: "灵感", matchPath: "/inspiration" },
  { id: "pricing", href: "/#pricing", label: "定价", matchPath: "/pricing" },
  { id: "about", href: "/#about", label: "关于", matchPath: "/about" },
];

// 2025-10-30: Header 视觉与交互细节，匹配品牌基调
export default function Header() {
  const pathname = usePathname() ?? "/";

  const handleStartClick = () => {
    if (typeof window !== "undefined") {
      window.open("https://editor.lycium.ai", "_blank", "noopener,noreferrer");
    }
  };

  const focusStyles = "focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white/80";
  const navLinkBase =
    `rounded-full px-4 py-2.5 text-[14px] font-medium text-white/90 ${transitionAll} hover:bg-white/5 hover:text-white whitespace-nowrap ${focusStyles}`;
  const navActiveClass =
    `rounded-full bg-[#171719] px-4 py-2.5 text-[14px] font-semibold text-white ${transitionAll} shadow-[0_8px_22px_rgba(0,0,0,0.4)] ${focusStyles}`;
  const languageBtnClass =
    `inline-flex w-[80px] h-[28px] mr-4 cursor-pointer items-center gap-1 rounded-[8px] px-2 text-[16px] font-normal text-white ${transitionAll} hover:border-white/30 ${focusStyles}`;
  const desktopCtaClass =
    `inline-flex w-[140px] cursor-pointer items-center gap-2 rounded-full border-t-2 border-[#3D3D3D] bg-[#191919] px-5 py-[14px] text-[18px] font-semibold leading-none text-white shadow-[0_12px_24px_rgba(0,0,0,0.35)] ${transitionAll} hover:bg-[#1f1f1f] ${focusStyles}`;
  const mobileCtaClass =
    `xl:hidden inline-flex items-center gap-2 rounded-full bg-[#191919] px-5 py-3 text-[16px] font-semibold text-white shadow-[0_12px_26px_rgba(0,0,0,0.35)] ${transitionAll} hover:bg-[#1f1f1f] ${focusStyles}`;

  const isRouteActive = (item: NavItem) => {
    if (!item.matchPath) return false;
    if (item.matchPath === "/") return pathname === "/";
    return pathname.startsWith(item.matchPath);
  };

  return (
    <header className="box-border flex items-center justify-between py-6">
      {/* 2025-11-08: 品牌标识与 LOGO 基准尺寸 */}
      <div className="flex w-[180px] items-center gap-3 sm:w-[220px] 2xl:w-[250px]">
        <Link href="/" className="flex items-center gap-3">
          <img
            src="/assets/icons/brand-logo.svg"
            alt="CanDe"
            className="h-[25.136px] w-[28px]"
            loading="lazy"
          />
          <span className="hidden text-2xl font-semibold leading-none tracking-[-0.48px] text-white md:inline">
            CanDe
          </span>
        </Link>
      </div>

      {/* 2025-11-08: 中部导航样式，匹配半透明边框与圆角 */}
      <div className="hidden flex-1 items-center justify-center xl:flex">
        <nav
          aria-label="主导航"
          className="flex items-center gap-1 rounded-[32px] border border-[#414141] bg-white/10 p-[5px] shadow-[0_16px_34px_rgba(0,0,0,0.35)] backdrop-blur-[2px]"
        >
          {navItems.map((item) => {
            const active = isRouteActive(item);
            return (
              <Link
                key={item.id}
                href={item.href}
                aria-current={active ? "page" : undefined}
                className={active ? navActiveClass : navLinkBase}
              >
                {item.label}
              </Link>
            );
          })}
        </nav>
      </div>

      {/* 2025-11-08: 右侧工具栏，包含语言切换与 CTA */}
      <div className="hidden w-auto items-center justify-end gap-2 xl:flex">
        <div className="flex items-center gap-2">
          <button className={languageBtnClass} aria-label="切换语言" type="button">
            <span className="whitespace-nowrap text-white">简体中文</span>
            <img src="/assets/icons/chevron-down.svg" alt="" aria-hidden />
          </button>

          <button className={desktopCtaClass} type="button" aria-label="开始使用" onClick={handleStartClick}>
            <span>开始使用</span>
            <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 20 20" fill="#ffffff">
              <path d="M14.1667 5.83337L5.83333 14.1667M14.1667 5.83337H6.66666M14.1667 5.83337V13.3334" fill="#ffffff" stroke="white" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          </button>
        </div>
      </div>

      {/* 2025-11-08: 手机版 CTA 保持独立显隐 */}
      <button className={mobileCtaClass} type="button" aria-label="开始使用" onClick={handleStartClick}>
        开始使用
        <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 20 20" fill="#ffffff">
          <path d="M14.1667 5.83337L5.83333 14.1667M14.1667 5.83337H6.66666M14.1667 5.83337V13.3334" fill="#ffffff" stroke="white" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
      </button>
    </header>
  );
}
