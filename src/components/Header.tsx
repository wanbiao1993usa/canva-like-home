import { transitionAll } from "../ui";

// 2025-10-30: 调整 Header 视觉与交互细节，匹配最新设计稿
export default function Header() {
  const navLinkBase =
    `rounded-full px-5 py-1.5 text-sm font-medium text-white/80 ${transitionAll} hover:text-white 2xl:px-6 2xl:text-base`;
  const navActiveClass =
    `rounded-full bg-[#0f1015] px-5 py-1.5 text-sm font-semibold text-white shadow-[0_8px_22px_rgba(0,0,0,0.4)] ${transitionAll} 2xl:px-6 2xl:text-base`;
  const languageBtnClass =
    `inline-flex cursor-pointer items-center gap-1.5 rounded-full px-4 py-1.5 text-sm font-medium text-white/85 ${transitionAll} hover:text-white 2xl:px-5 2xl:text-base`;
  const desktopCtaClass =
    `inline-flex cursor-pointer items-center gap-2 rounded-full bg-[#222329] px-5 py-1.5 text-sm font-semibold text-white ring-1 ring-white/15 shadow-[0_12px_24px_rgba(0,0,0,0.35)] ${transitionAll} hover:bg-[#2b2c32] 2xl:px-6 2xl:py-2 2xl:text-base`;
  const mobileCtaClass =
    `xl:hidden inline-flex items-center gap-2 rounded-full bg-[#222329] px-5 py-2 text-sm font-semibold text-white ring-1 ring-white/15 shadow-[0_12px_26px_rgba(0,0,0,0.35)] ${transitionAll} hover:bg-[#2b2c32]`;
  const actionsShellClass =
    "flex items-center gap-1.5 rounded-full bg-[#15161b] p-1.5 shadow-[0_10px_24px_rgba(0,0,0,0.42)] ring-1 ring-white/10";

  return (
    <header className="flex items-center justify-between py-4 xl:py-5 2xl:py-6">
      {/* 左侧：品牌标识 */}
      <a href="#" className="flex items-center gap-2.5">
        <img src="/assets/icons/brand-logo.svg" alt="CanDe" className="h-8 w-8" />
        <span className="hidden text-sm font-semibold text-white xl:inline 2xl:text-base">CanDe</span>
      </a>

      {/* 中间：居中胶囊式导航 */}
      <div className="hidden flex-1 items-center justify-center xl:flex">
        <nav
          aria-label="主导航"
          className="flex items-center gap-2 rounded-full bg-[#282828] px-2.5 py-1.5 shadow-[0_16px_34px_rgba(0,0,0,0.35)] ring-1 ring-white/15 backdrop-blur-[2px]"
        >
          <a href="#home" aria-current="page" className={navActiveClass}>
            主页
          </a>
          <a href="#ideas" className={navLinkBase}>
            灵感
          </a>
          <a href="#pricing" className={navLinkBase}>
            价格
          </a>
          <a href="#about" className={navLinkBase}>
            关于
          </a>
        </nav>
      </div>

      {/* 右侧：语言 + CTA 组合容器 */}
      <div className="hidden items-center xl:flex">
        <div>
          <button className={languageBtnClass} aria-label="切换语言">
            <span>简体中文</span>
            <img src="/assets/icons/chevron-down.svg" alt="" className="h-3.5 w-3.5 opacity-90" aria-hidden />
          </button>
          <button className={desktopCtaClass}>
            开始使用
            <img src="/assets/icons/chevron-right.svg" alt="" className="h-4 w-4" aria-hidden />
          </button>
        </div>
      </div>

      {/* 小屏：CTA */}
      <button className={mobileCtaClass}>
        开始使用
        <img src="/assets/icons/chevron-right.svg" alt="" className="h-4 w-4" aria-hidden />
      </button>
    </header>
  );
}
