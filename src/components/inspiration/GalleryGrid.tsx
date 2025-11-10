'use client';

import { useEffect, useRef, useState } from "react";
import { cardHover, transitionAll, btnPrimary } from "../../ui";

type CardMeta = {
  title: string;
  creator: string;
  category: string;
  cover: string;
};

const cardLibrary: Record<string, CardMeta> = {
  "poster-01": { title: "We Will Become Better", creator: "CineStill Lab", category: "电影质感", cover: "/assets/images/template-bubble-01.png" },
  "poster-02": { title: "Built For Players", creator: "Storia Studio", category: "品牌主视觉", cover: "/assets/images/template-bubble-02.png" },
  "poster-03": { title: "BRAVE Noir", creator: "MonoFrame", category: "电影质感", cover: "/assets/images/template-bubble-03.png" },
  "poster-04": { title: "Running Through Life", creator: "Urban Motion", category: "动态/动画", cover: "/assets/images/template-bubble-04.png" },
  "poster-05": { title: "The Silent", creator: "Parallel Film", category: "悬疑惊悚", cover: "/assets/images/template-bubble-05.png" },
  "poster-06": { title: "Tell Me About The Mystery", creator: "Typeverse", category: "字体实验", cover: "/assets/images/template-bubble-06.png" },
  "poster-07": { title: "Caperealys", creator: "Neon Hands", category: "插画混剪", cover: "/assets/images/template-bubble-07.png" },
  "poster-08": { title: "Neon Retro", creator: "Flux Studio", category: "插画混剪", cover: "/assets/images/template-bubble-08.png" },
  "poster-09": { title: "Mock Bands Flyer", creator: "Layout Guild", category: "拼贴排版", cover: "/assets/images/template-bubble-09.png" },
  "poster-10": { title: "Objects and Power", creator: "Formless", category: "黑白人像", cover: "/assets/images/template-bubble-10.png" },
};

type CardKey = keyof typeof cardLibrary;

type ColumnItem = {
  key: CardKey;
  heightClass: string;
  liked?: boolean;
};

const galleryColumns: ColumnItem[][] = [
  [
    { key: "poster-01", heightClass: "h-[320px]", liked: true },
    { key: "poster-07", heightClass: "h-[240px]" },
    { key: "poster-06", heightClass: "h-[300px]" },
    { key: "poster-07", heightClass: "h-[240px]" },
    { key: "poster-06", heightClass: "h-[300px]" },
    { key: "poster-04", heightClass: "h-[260px]" },
  ],
  [
    { key: "poster-02", heightClass: "h-[260px]" },
    { key: "poster-04", heightClass: "h-[300px]" },
    { key: "poster-05", heightClass: "h-[260px]" },
    { key: "poster-02", heightClass: "h-[280px]" },
    { key: "poster-04", heightClass: "h-[260px]" },
    { key: "poster-09", heightClass: "h-[300px]" },
  ],
  [
    { key: "poster-03", heightClass: "h-[240px]" },
    { key: "poster-10", heightClass: "h-[260px]" },
    { key: "poster-08", heightClass: "h-[280px]" },
    { key: "poster-10", heightClass: "h-[260px]" },
    { key: "poster-08", heightClass: "h-[320px]" },
    { key: "poster-05", heightClass: "h-[260px]" },
  ],
  [
    { key: "poster-02", heightClass: "h-[260px]" },
    { key: "poster-04", heightClass: "h-[300px]" },
    { key: "poster-09", heightClass: "h-[300px]" },
    { key: "poster-01", heightClass: "h-[280px]" },
    { key: "poster-09", heightClass: "h-[300px]" },
    { key: "poster-04", heightClass: "h-[260px]" },
  ],
  [
    { key: "poster-07", heightClass: "h-[240px]" },
    { key: "poster-06", heightClass: "h-[300px]", liked: true },
    { key: "poster-09", heightClass: "h-[300px]" },
    { key: "poster-08", heightClass: "h-[280px]" },
    { key: "poster-06", heightClass: "h-[320px]" },
    { key: "poster-04", heightClass: "h-[280px]" },
  ],
];

const quickActions = [
  { id: "shuffle", icon: "/assets/icons/custom-design-refresh.svg", label: "随机灵感" },
  { id: "palette", icon: "/assets/icons/custom-design-sparkles.svg", label: "筛选主题" },
];

/**
 * 2025-11-10 15:45: GalleryGrid 静态占位，后续可替换为真实数据。
 */
export default function GalleryGrid() {
  const [isLoadReady, setIsLoadReady] = useState(false);
  const sentinelRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    if (!sentinelRef.current) return;
    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0]?.isIntersecting) {
          setIsLoadReady(true);
        }
      },
      { threshold: 0.35 }
    );
    observer.observe(sentinelRef.current);
    return () => observer.disconnect();
  }, []);

  return (
    <section id="gallery" className="w-full px-4 pb-24 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-[1440px]">
        <div className="mb-10 flex flex-col items-center gap-3 sm:flex-row sm:justify-center">
          <button
            type="button"
            className="inline-flex cursor-pointer h-[50px] items-center gap-2 rounded-full bg-[#171719] px-5 py-3 text-sm font-semibold text-white/85 shadow-[0_16px_34px_rgba(0,0,0,0.45)] hover:border-white/30 hover:text-white"
          >
            全部
            <img src="/assets/icons/chevron-down.svg" alt="" className="h-3.5 w-3.5" />
          </button>

          <div className="flex h-[50px] w-full max-w-[480px] items-center gap-3 rounded-full bg-[#181818] px-5 py-3">
            <svg xmlns="http://www.w3.org/2000/svg" width="15" height="16" viewBox="0 0 15 16" fill="none">
              <path d="M12.7588 11.8838C12.9503 12.5382 13.4618 13.0497 14.1162 13.2412L15 13.5L14.1162 13.7588C13.4618 13.9503 12.9503 14.4618 12.7588 15.1162L12.5 16L12.2412 15.1162C12.0497 14.4618 11.5382 13.9503 10.8838 13.7588L10 13.5L10.8838 13.2412C11.5382 13.0497 12.0497 12.5382 12.2412 11.8838L12.5 11L12.7588 11.8838ZM7.66309 4.97852C7.85457 5.6332 8.3668 6.14543 9.02148 6.33691L13 7.5L9.02148 8.66309C8.3668 8.85457 7.85457 9.3668 7.66309 10.0215L6.5 14L5.33691 10.0215C5.14543 9.3668 4.6332 8.85457 3.97852 8.66309L0 7.5L3.97852 6.33691C4.6332 6.14543 5.14543 5.6332 5.33691 4.97852L6.5 1L7.66309 4.97852ZM12.7588 0.883789C12.9503 1.53817 13.4618 2.04967 14.1162 2.24121L15 2.5L14.1162 2.75879C13.4618 2.95033 12.9503 3.46183 12.7588 4.11621L12.5 5L12.2412 4.11621C12.0497 3.46183 11.5382 2.95033 10.8838 2.75879L10 2.5L10.8838 2.24121C11.5382 2.04967 12.0497 1.53817 12.2412 0.883789L12.5 0L12.7588 0.883789Z" fill="#929292" />
            </svg>
            <input
              type="search"
              placeholder="试试搜索双十一"
              className="h-full flex-1 bg-transparent text-sm text-white placeholder:text-white/40 focus:outline-none"
            />
            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 16 16" fill="none">
              <path d="M4.33496 0.834961H3.83496C2.17811 0.834961 0.834961 2.17811 0.834961 3.83496V5.33496" stroke="#929292" strokeWidth="1.67" />
              <circle cx="7.83496" cy="8.33496" r="2.5" stroke="#929292" strokeWidth="1.67" />
              <path d="M11.335 0.834961H11.835C13.4918 0.834961 14.835 2.17811 14.835 3.83496V5.33496" stroke="#929292" strokeWidth="1.67" />
              <path d="M4.33496 14.835H3.83496C2.17811 14.835 0.834961 13.4918 0.834961 11.835V10.335" stroke="#929292" strokeWidth="1.67" />
              <path d="M11.335 14.835H11.835C13.4918 14.835 14.835 13.4918 14.835 11.835V10.335" stroke="#929292" strokeWidth="1.67" />
            </svg>
            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="17" viewBox="0 0 16 17" fill="none">
              <path d="M8 0C12.4183 0 16 3.58172 16 8C16 10.2879 12.5396 8.04191 11 9.5C9.56634 10.8577 12.5 16.5 8 16C3.58172 16 0 12.4183 0 8C0 3.58172 3.58172 0 8 0ZM6.75 11.5C6.05964 11.5 5.5 12.0596 5.5 12.75C5.5 13.4404 6.05964 14 6.75 14C7.44036 14 8 13.4404 8 12.75C8 12.0596 7.44036 11.5 6.75 11.5ZM3.75 8.5C3.05964 8.5 2.5 9.05964 2.5 9.75C2.5 10.4404 3.05964 11 3.75 11C4.44036 11 5 10.4404 5 9.75C5 9.05964 4.44036 8.5 3.75 8.5ZM3.75 4.5C3.05964 4.5 2.5 5.05964 2.5 5.75C2.5 6.44036 3.05964 7 3.75 7C4.44036 7 5 6.44036 5 5.75C5 5.05964 4.44036 4.5 3.75 4.5ZM10.75 3C10.0596 3 9.5 3.55964 9.5 4.25C9.5 4.94036 10.0596 5.5 10.75 5.5C11.4404 5.5 12 4.94036 12 4.25C12 3.55964 11.4404 3 10.75 3ZM6.75 2C6.05964 2 5.5 2.55964 5.5 3.25C5.5 3.94036 6.05964 4.5 6.75 4.5C7.44036 4.5 8 3.94036 8 3.25C8 2.55964 7.44036 2 6.75 2Z" fill="#929292" />
            </svg>
          </div>
        </div>

        <div className="flex flex-wrap justify-center gap-6">
          {galleryColumns.map((column, columnIndex) => (
            <div key={`gallery-column-${columnIndex}`} className="flex w-[220px] flex-col gap-6">
              {column.map((item, itemIndex) => {
                const meta = cardLibrary[item.key];
                const cardId = `${item.key}-${columnIndex}-${itemIndex}`;
                return (
                  <article
                    key={cardId}
                    className={`group relative overflow-hidden rounded-[28px] p-[3px] shadow-[0_25px_60px_rgba(0,0,0,0.55)] ${cardHover}`}
                  >
                    <div className={`relative flex w-full flex-col overflow-hidden rounded-[24px] ${item.heightClass}`}>
                      <img src={meta.cover} alt={meta.title} className="absolute inset-0 h-full w-full object-cover" loading="lazy" />
                      <div className="absolute inset-0 bg-gradient-to-b from-black/0 via-black/20 to-black/70 opacity-90 transition-opacity duration-200 ease-out group-hover:opacity-80" />

                      {/* <div className="relative flex h-full flex-col justify-between p-4">
                        <div className="flex items-center justify-between">
                          <span className="rounded-full bg-black/45 px-3 py-1 text-xs font-semibold text-white/80 backdrop-blur">
                            {meta.category}
                          </span>
                          <button
                            type="button"
                            aria-pressed={item.liked ?? false}
                            className={`rounded-full bg-black/45 p-2 text-white/80 ${transitionAll} hover:bg-black/65`}
                          >
                            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                              <path d="M12 21s-6.5-4.35-8.7-8.13c-1.47-2.49-.68-5.75 1.74-7.25a4.5 4.5 0 0 1 6.44 1.42c.19.33.35.67.52 1 .16-.33.32-.67.52-1a4.5 4.5 0 0 1 6.44-1.42c2.42 1.5 3.21 4.76 1.74 7.25C18.5 16.65 12 21 12 21Z" />
                            </svg>
                          </button>
                        </div>

                        <div className="mt-auto">
                          <p className="text-base font-semibold text-white">{meta.title}</p>
                          <p className="text-sm text-white/60">{meta.creator}</p>
                        </div>
                      </div> */}
                    </div>
                  </article>
                );
              })}
            </div>
          ))}
        </div>

        <div ref={sentinelRef} className="mt-12 flex flex-col items-center gap-3">
          <button
            type="button"
            className={`inline-flex items-center gap-2 px-8 py-3 text-base font-semibold ${btnPrimary}`}
          >
            加载更多
            <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 20 20" fill="none" aria-hidden="true">
              <path d="M10 5V15M10 15L6 11M10 15L14 11" stroke="#161616" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          </button>
        </div>
      </div>
    </section>
  );
}
