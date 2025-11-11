"use client";

import { cardHover, transitionAll } from "../../ui";
import GlowEffect from "../common/GlowEffect";
import CapsuleTagGroup from "../common/CapsuleTagGroup";
import { useTranslator } from "../../hooks/useTranslator";

const posterKeys = [
  "sportsBrand",
  "musicWall",
  "eventStickers",
  "realistic",
  "maineArt",
  "naiArchitecture",
  "retroHalftone",
  "comicHalftone",
] as const;

const sidebarTopNavItems = [
  { icon: "nav-home.svg", labelKey: "home", active: true },
  { icon: "nav-explore.svg", labelKey: "explore", active: false },
  { icon: "nav-projects.svg", labelKey: "projects", active: false },
] as const;

const sidebarBottomNavItems = [
  { icon: "nav-trash.svg", labelKey: "trash" },
  { icon: "settings.svg", labelKey: "settings" },
  { icon: "nav-help.svg", labelKey: "help" },
] as const;
// 2025-10-30: AppPreview 外层壳体与主体结构优化
export default function AppPreview() {
  // 2025-11-11 20:05: 接入 useTranslator 支持中英文切换
  const t = useTranslator("home.appPreviewSection");
  const badgePrimary = t("badge.primary");
  const badgeSecondary = t("badge.secondary");
  const sectionTitle = t("title");
  const glowAltTopRight = t("glowAlt.topRight");
  const glowAltBottomRight = t("glowAlt.bottomRight");
  const glowAltBottomLeft = t("glowAlt.bottomLeft");
  const searchPlaceholder = t("toolbar.searchPlaceholder");
  const notificationsAlt = t("toolbar.notificationsAlt");
  const settingsAlt = t("toolbar.settingsAlt");
  const userAlt = t("toolbar.userAlt");
  const sidebarProjectTitle = t("sidebar.projectCard.title");
  const sidebarResetNote = t("sidebar.projectCard.resetNote");
  const sidebarManagePlan = t("sidebar.projectCard.managePlan");
  const sidebarUpgrade = t("sidebar.projectCard.upgrade");
  const bannerTitle = t("banner.title");
  const bannerDescription = t("banner.description");
  const exploreTitle = t("explore.title");
  const playAlt = t("explore.playAlt");
  const recentTitle = t("recent.title");
  const recentHeaders = {
    name: t("recent.headers.name"),
    size: t("recent.headers.size"),
    updated: t("recent.headers.updated"),
    actions: t("recent.headers.actions"),
  };
  const recentMoreAlt = t("recent.moreAlt");
  const posterCards = posterKeys.map((posterKey, index) => ({
    posterKey,
    title: t(`featuredPosters.${posterKey}`),
    imageSrc: `/assets/images/app-card-${String(index + 1).padStart(2, "0")}.png`,
  }));

  const recentFiles = [
    { name: "BNB Corporation App", size: "4.76 MB", time: "5 days ago", imageSrc: "/assets/images/recent-file-thumb-01.png" },
    { name: "FreshApp", size: "1.7 MB", time: "5 days ago", imageSrc: "/assets/images/recent-file-thumb-02.png" },
  ];

  return (
    <section id="app-preview" className="pt-30 bg-[linear-gradient(146deg, rgba(255, 255, 255, 0.05) 2.47%, rgba(255, 255, 255, 0.01) 95.54%)]">

      <div className="relative flex justify-center">
        {/* 2025-11-10 12:30: 修正容器背景类名，避免无效的 bg-[bg[...] 语法 */}
        <div className="relative w-full max-w-[1280px] rounded-[44px] p-[6px] pb-10 ring-1 ring-white/10 bg-[#1D1D1D] shadow-[0_20px_60px_rgba(0,0,0,0.6)]">
          {/* 2025-10-30: 指示灯 */}
          <div
            className="pointer-events-none absolute left-10 top-[26px] flex h-[10px] w-[10px] items-center justify-center rounded-full bg-white/18 ring-[1.5px] ring-white/10 shadow-[0_3px_6px_rgba(0,0,0,0.25)]"
            aria-hidden
          >
            <span className="h-[6px] w-[6px] rounded-full bg-white/35 shadow-[0_0_4px_rgba(255,255,255,0.3)]" />
          </div>
          <div
            className="pointer-events-none absolute right-10 top-[26px] flex h-[10px] w-[10px] items-center justify-center rounded-full bg-white/18 ring-[1.5px] ring-white/10 shadow-[0_3px_6px_rgba(0,0,0,0.25)]"
            aria-hidden
          >
            <span className="h-[6px] w-[6px] rounded-full bg-white/35 shadow-[0_0_4px_rgba(255,255,255,0.3)]" />
          </div>
          {/* 2025-11-07 21:40: 光影效果统一改用 GlowEffect 组件 */}
          <GlowEffect
            top="0"
            right="0"
            src="/assets/icons/apppreview-eclipse-rt.svg"
            width={490}
            height={490}
            alt={glowAltTopRight}
            priority={false}
            imageClassName="rounded-[44px]"
          />
          <GlowEffect
            bottom="0"
            right="0"
            src="/assets/icons/apppreview-eclipse-rb.svg"
            width={490}
            height={490}
            alt={glowAltBottomRight}
            priority={false}
            imageClassName="rounded-[44px]"
          />
          <GlowEffect
            bottom="0"
            left="0"
            src="/assets/icons/apppreview-eclipse-lb.svg"
            width={490}
            height={490}
            alt={glowAltBottomLeft}
            priority={false}
            imageClassName="rounded-[44px]"
          />

          {/* 外框内部：上部标签+标题、下部预览窗口卡片 */}
          <div className="px-4 pt-10 xl:px-6 2xl:px-8">
            {/* 上半区：标签与标题（独立于预览卡片） */}
            <div className="text-center">
              <CapsuleTagGroup primaryText={badgePrimary} secondaryText={badgeSecondary} />
              <h2 className="mt-4 text-2xl font-medium text-white sm:text-3xl xl:text-4xl 2xl:text-5xl">
                {sectionTitle}
              </h2>
            </div>

            {/* 下半区：预览窗口卡片 */}
            {/* 2025-11-10 12:30: 去掉 bg 与 shadow 之间的多余斜杠，避免编译报错 */}
            <div className="mt-6 rounded-[24px] bg-[linear-gradient(146deg, rgba(255, 255, 255, 0.05) 2.47%, rgba(255, 255, 255, 0.01) 95.54%)] shadow-[inset_0_1px_0_rgba(255,255,255,0.06),inset_0_-1px_0_rgba(0,0,0,0.3)] ring-1 ring-white/12 xl:py-6 2xl:py-8">

              {/* 2025-10-30: 顶部工具栏重构 ——  上：三色圆点；下：搜索与图标，并与内容区用分割线隔开 */}
              <div className="px-6 border-b border-white/10 pb-4">
                {/* 三色圆点（独立一行） */}
                <div className="flex items-center gap-2 ">
                  <span className="h-2 w-2 rounded-full bg-[#FF5656] " />
                  <span className="h-2 w-2 rounded-full bg-[#FFDA79] " />
                  <span className="h-2 w-2 rounded-full bg-[#24E37C] " />
                </div>
              </div>

              {/* 2025-10-30: 主工具栏（Logo+品牌 | 搜索 | 图标） 独立一行 */}
              <div className="mt-3 px-6 flex items-center">
                {/* 左侧：Logo + 品牌名称 */}
                <div className="flex items-center gap-2 text-white/80">
                  <img src="/assets/icons/brand-logo.svg" alt="CanDe" className="h-5 w-5" />
                  <span className="text-sm">CanDe</span>
                </div>

                {/* 中间偏右：搜索框 */}
                <div className="hidden min-w-0 items-center gap-2 rounded-full bg-[rgba(36, 36, 36, 0.50)] px-3 py-1.5 ml-auto mr-4 sm:flex">
                  <img src="/assets/icons/search.svg" alt="" className="h-4 w-4 opacity-80" aria-hidden />
                  <input
                    className="min-w-0 flex-1 bg-transparent text-xs text-white placeholder:text-white focus:outline-none"
                    placeholder={searchPlaceholder}
                    readOnly
                  />
                </div>

                {/* 最右侧：三个图标 */}
                <div className="flex items-center gap-2">
                  <img src="/assets/icons/bell.svg" alt={notificationsAlt} className="h-4 w-4 opacity-80" />
                  <img src="/assets/icons/settings.svg" alt={settingsAlt} className="h-4 w-4 opacity-80" />
                  <img
                    src="/assets/images/avatar-default.png"
                    alt={userAlt}
                    className="h-7 w-7 rounded-full object-cover ring-1 ring-white/15"
                  />
                </div>
              </div>

              {/* 主体区：侧边栏 + 内容 - 左右布局 */}
              <div className="mt-5 px-6 flex gap-[13.156px]">
                {/* 侧边栏 */}
                <aside className="hidden w-[240px] shrink-0 rounded-[13.156px] bg-transparent xl:flex flex-col justify-between h-[800px]">
                  {/* 导航菜单区域（顶部） */}
                  <nav className="flex flex-col gap-[19.733px]">
                    {/* 顶部导航组 */}
                    <div className="flex flex-col gap-[6.578px]">
                      {sidebarTopNavItems.map((item) => (
                        <div
                          key={item.labelKey}
                          className={`flex items-center gap-[11.511px] rounded-[9.867px] px-[13.156px] py-[9.867px] ${transitionAll} ${item.active
                            ? "bg-[#292929] text-white"
                            : "text-white hover:bg-white/10"
                            }`}
                        >
                          <img src={`/assets/icons/${item.icon}`} alt="" className="h-[23px] w-[23px]" aria-hidden />
                          <span className="text-[14.8px] leading-[19.733px]">{t(`sidebar.navTop.${item.labelKey}`)}</span>
                        </div>
                      ))}
                    </div>

                    {/* 分隔线 */}
                    <div className="h-px w-full border-t border-white/10" />

                    {/* 底部导航组 */}
                    <div className="flex flex-col gap-[6.578px]">
                      {sidebarBottomNavItems.map((item) => (
                        <div
                          key={item.labelKey}
                          className={`flex items-center gap-[11.511px] rounded-[9.867px] px-[13.156px] py-[9.867px] text-white ${transitionAll} hover:bg-white/10`}
                        >
                          <img src={`/assets/icons/${item.icon}`} alt="" className="h-[23px] w-[23px]" aria-hidden />
                          <span className="text-[14.8px] leading-[19.733px]">{t(`sidebar.navBottom.${item.labelKey}`)}</span>
                        </div>
                      ))}
                    </div>
                  </nav>

                  {/* 侧边信息卡：项目与升级（底部） */}
                  <div className="rounded-[13.156px] bg-[rgba(36,36,36,0.5)] p-[13.156px] flex flex-col gap-[13.156px]">
                    {/* 项目信息区域 */}
                    <div className="flex flex-col gap-[7.4px]">
                      {/* 标题和进度分数 */}
                      <div className="flex items-center justify-between">
                        <span className="text-[14.8px] leading-[19.733px] font-semibold text-white">{sidebarProjectTitle}</span>
                        <span className="text-[13.156px] leading-[18.089px] font-medium text-white">6/20</span>
                      </div>

                      {/* 进度条 */}
                      <div className="h-[4.933px] w-full rounded-[25.489px] bg-[rgba(255,255,255,0.06)] relative">
                        <div className="absolute h-full w-[57.556px] rounded-[25.489px] bg-[#b08cf2]" />
                      </div>

                      {/* 重置提示 */}
                      <p className="text-[13.156px] leading-[19.733px] text-white/50">{sidebarResetNote}</p>
                    </div>

                    {/* 管理计划和升级按钮 */}
                    <div className="flex flex-col gap-[9.867px]">
                      <div
                        className={`text-[11.511px] leading-[19.733px] font-medium text-white uppercase text-left ${transitionAll} hover:text-white/80`}
                      >
                        {sidebarManagePlan}
                      </div>
                      <button
                        className={`w-full rounded-[8.222px] border-[rgba(255,255,255,0.08)] border-[1.233px] px-[40.289px] py-[9.044px] text-[13.156px] leading-[18.089px] font-medium text-white ${transitionAll} hover:bg-white/10`}
                      >
                        {sidebarUpgrade}
                      </button>
                    </div>
                  </div>
                </aside>

                {/* 内容 */}
                <div className="min-w-0 flex-1 bg-[rgba(36,36,36,0.5)] rounded-[13.156px] p-[26.311px] flex flex-col gap-[26.311px] h-[800px] overflow-hidden">
                  {/* 2025-10-31: 顶部横幅卡片重写 ——  深色主题、右侧玻璃背景 */}
                  <div className="relative overflow-hidden rounded-[13.156px] px-[26.311px] py-[42.756px] flex flex-col gap-[8.222px]">
                    {/* 背景图片：右侧玻璃纹理 */}
                    <img
                      src="/assets/images/app-banner-swirl-updated.png"
                      alt=""
                      className="pointer-events-none absolute inset-0 h-full w-full object-cover object-right rounded-[13.156px] opacity-85"
                      aria-hidden
                    />

                    {/* 内容区域 */}
                    <div className="relative flex items-center gap-[19.733px] w-full">
                      {/* 左侧圆形图标（带微光与描边） */}
                      <div className="relative ml-5 shrink-0 w-16 h-16 rounded-full bg-[hsla(0,0%,100%,0.5)] flex items-center justify-center">
                        <div className="relative w-12 h-12 bg-[hsla(0,0%,100%,1)] rounded-full flex items-center justify-center">
                          {/* [2025-11-05 01:55:00] 修正 SVG 属性命名以适配 JSX，避免 `stroke-width` 等 DOM 命名警告。 */}
                          <svg xmlns="http://www.w3.org/2000/svg" width="33" height="33" viewBox="0 0 33 33" fill="none">
                            <g clipPath="url(#clip0_345_2004)">
                              <path
                                d="M21.9259 24.6666C22.6528 24.6666 23.3499 24.9554 23.8639 25.4694C24.3779 25.9834 24.6666 26.6805 24.6666 27.4074C24.6666 26.6805 24.9554 25.9834 25.4694 25.4694C25.9834 24.9554 26.6805 24.6666 27.4074 24.6666C26.6805 24.6666 25.9834 24.3779 25.4694 23.8639C24.9554 23.3499 24.6666 22.6528 24.6666 21.9259C24.6666 22.6528 24.3779 23.3499 23.8639 23.8639C23.3499 24.3779 22.6528 24.6666 21.9259 24.6666ZM21.9259 8.22219C22.6528 8.22219 23.3499 8.51094 23.8639 9.02493C24.3779 9.53892 24.6666 10.236 24.6666 10.9629C24.6666 10.236 24.9554 9.53892 25.4694 9.02493C25.9834 8.51094 26.6805 8.22219 27.4074 8.22219C26.6805 8.22219 25.9834 7.93343 25.4694 7.41944C24.9554 6.90545 24.6666 6.20833 24.6666 5.48145C24.6666 6.20833 24.3779 6.90545 23.8639 7.41944C23.3499 7.93343 22.6528 8.22219 21.9259 8.22219ZM12.3333 24.6666C12.3333 22.486 13.1996 20.3946 14.7415 18.8526C16.2835 17.3107 18.3749 16.4444 20.5555 16.4444C18.3749 16.4444 16.2835 15.5781 14.7415 14.0362C13.1996 12.4942 12.3333 10.4029 12.3333 8.22219C12.3333 10.4029 11.467 12.4942 9.92507 14.0362C8.38311 15.5781 6.29175 16.4444 4.11108 16.4444C6.29175 16.4444 8.38311 17.3107 9.92507 18.8526C11.467 20.3946 12.3333 22.486 12.3333 24.6666Z"
                                fill="black"
                                stroke="black"
                                strokeWidth="1.64444"
                                strokeLinecap="round"
                                strokeLinejoin="round"
                              />
                            </g>
                            <defs>
                              <clipPath id="clip0_345_2004">
                                <rect width="32.8889" height="32.8889" fill="white" />
                              </clipPath>
                            </defs>
                          </svg>
                        </div>
                      </div>

                      {/* 文本内容 */}
                      <div className="flex-1 flex flex-col gap-[6.578px]">
                        <p className="text-[26.311px] leading-[36.178px] font-semibold text-[#111111] tracking-tight">
                          {bannerTitle}
                        </p>
                        <p className="text-[13.156px] leading-[18.089px] font-medium text-[#707175]">
                          {bannerDescription}
                        </p>
                      </div>
                    </div>
                  </div>

                  {/* 探索区域 */}
                  <div className="flex flex-col gap-[13.156px]">
                    {/* 区块标题 */}
                    <div className="text-[14.8px] leading-[19.733px] font-semibold text-white">{exploreTitle}</div>

                    {/* 海报网格：2行4列 */}
                    <div className="flex flex-col gap-[9.867px]">
                      {/* 第一行 */}
                      <div className="flex gap-[19.733px] h-[162.8px]">
                        {posterCards.slice(0, 4).map((card, index) => (
                          <div key={card.posterKey} className="flex-1 flex flex-col overflow-hidden relative">
                            <div className="flex-1 relative rounded-[9.867px] overflow-hidden">
                              <img
                                src={card.imageSrc}
                                alt={card.title}
                                className="absolute inset-0 object-cover w-full h-full pointer-events-none rounded-[9.867px]"
                              />
                              {/* 播放按钮：在第一行第二张（index=1，音乐海报墙）上显示，位置往左下 */}
                              {index === 1 && (
                                <div className="absolute bottom-[10px] left-[10px] pointer-events-none">
                                  <img src="/assets/icons/play.svg" alt={playAlt} className="w-[46px] h-[46px]" />
                                </div>
                              )}
                            </div>
                            <div className="backdrop-blur-[12.333px] py-[6.578px]">
                              <p className="text-[13.156px] leading-[18.089px] font-medium text-white">
                                {card.title}
                              </p>
                            </div>
                          </div>
                        ))}
                      </div>

                      {/* 第二行 */}
                      <div className="flex gap-[19.733px] h-[162.8px]">
                        {posterCards.slice(4, 8).map((card) => (
                          <div key={card.posterKey} className="flex-1 flex flex-col overflow-hidden relative">
                            <div className="flex-1 relative rounded-[9.867px] overflow-hidden">
                              <img
                                src={card.imageSrc}
                                alt={card.title}
                                className="absolute inset-0 object-cover w-full h-full pointer-events-none rounded-[9.867px]"
                              />
                            </div>
                            <div className="backdrop-blur-[12.333px] py-[6.578px]">
                              <p className="text-[13.156px] leading-[18.089px] font-medium text-white">
                                {card.title}
                              </p>
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>

                  {/* 最近的文件 列表 */}
                  <div className="flex flex-col gap-[13.156px]">
                    {/* 标题 */}
                    <p className="text-[14.8px] leading-[19.733px] font-semibold text-white">{recentTitle}</p>

                    {/* 文件列表容器 */}
                    <div className="flex flex-col gap-[13.156px]">
                      {/* 2025-11-07 21:21: 统一使用 grid 规格保证表头与内容列对齐 */}
                      <div className="grid grid-cols-[1.6fr_0.65fr_0.85fr_auto] gap-[19.733px] items-center opacity-50">
                        <div className="flex items-center gap-[19.733px]">
                          <span className="text-[11.511px] leading-[14.8px] font-medium text-white">{recentHeaders.name}</span>
                        </div>
                        <span className="text-[11.511px] leading-[14.8px] font-medium text-white">{recentHeaders.size}</span>
                        <span className="text-[11.511px] leading-[14.8px] font-medium text-white text-center">{recentHeaders.updated}</span>
                        <span className="text-[11.511px] leading-[14.8px] font-medium text-white text-right">{recentHeaders.actions}</span>
                      </div>

                      {/* 文件行列表：只显示1.5个item */}
                      <div className="flex flex-col gap-[16.444px] overflow-hidden">
                        {recentFiles.map((row) => (
                          <div key={row.name} className="grid grid-cols-[1.6fr_0.65fr_0.85fr_auto] gap-[19.733px] items-center">
                            {/* 左侧：缩略图 + 文件名 */}
                            <div className="flex items-center gap-[19.733px]">
                              <div className="relative rounded-[8px] p-[14.8px] shrink-0 overflow-hidden">
                                <img
                                  src={row.imageSrc}
                                  alt=""
                                  className="absolute inset-0 object-cover w-full h-full pointer-events-none rounded-[8px]"
                                />
                                <div className="w-[23.022px] h-[23.022px] bg-transparent" />
                              </div>
                              <p className="flex-1 text-[13.156px] leading-[18.089px] font-medium text-white">
                                {row.name}
                              </p>
                            </div>

                            {/* 中间：文件大小和更新时间 */}
                            <p className="text-[13.156px] leading-[18.089px] font-medium text-white h-[19.556px]">{row.size}</p>
                            <p className="text-[13.156px] leading-[18.089px] font-medium text-white h-[19.556px] text-center">
                              {row.time}
                            </p>

                            {/* 右侧：更多操作按钮 */}
                            <div className="w-[19.733px] h-[19.733px] flex items-center justify-center ml-auto">
                              <img src="/assets/icons/more.svg" alt={recentMoreAlt} className="w-full h-full" />
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}


