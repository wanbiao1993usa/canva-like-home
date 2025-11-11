'use client';

import { useEffect, useRef, useState } from "react";
import { cardHover, btnPrimary } from "../../ui";
import { useFeatureToast, useGlobalToast } from "../common/toast";
import { useTranslator } from "../../hooks/useTranslator";

const cardLibrary = {
  "poster-01": { dictionaryKey: "poster01", cover: "/assets/images/poster01.png" },
  "poster-02": { dictionaryKey: "poster02", cover: "/assets/images/poster02.png" },
  "poster-03": { dictionaryKey: "poster03", cover: "/assets/images/poster03.png" },
  "poster-04": { dictionaryKey: "poster04", cover: "/assets/images/poster04.png" },
  "poster-05": { dictionaryKey: "poster05", cover: "/assets/images/poster05.png" },
  "poster-06": { dictionaryKey: "poster06", cover: "/assets/images/poster06.png" },
  "poster-07": { dictionaryKey: "poster07", cover: "/assets/images/poster07.png" },
  "poster-08": { dictionaryKey: "poster08", cover: "/assets/images/poster08.png" },
  "poster-09": { dictionaryKey: "poster09", cover: "/assets/images/poster09.png" },
  "poster-10": { dictionaryKey: "poster10", cover: "/assets/images/poster10.png" },
  "poster-11": { dictionaryKey: "poster11", cover: "/assets/images/poster11.png" },
  "poster-12": { dictionaryKey: "poster12", cover: "/assets/images/poster12.png" },
  "poster-13": { dictionaryKey: "poster13", cover: "/assets/images/poster13.png" },
  "poster-14": { dictionaryKey: "poster14", cover: "/assets/images/poster14.png" },
  "poster-15": { dictionaryKey: "poster15", cover: "/assets/images/poster15.png" },
  "poster-16": { dictionaryKey: "poster16", cover: "/assets/images/poster16.png" },
  "poster-17": { dictionaryKey: "poster17", cover: "/assets/images/poster17.png" },
} as const;

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
    { key: "poster-11", heightClass: "h-[280px]" },
    { key: "poster-07", heightClass: "h-[240px]" },
    { key: "poster-06", heightClass: "h-[300px]" },
    { key: "poster-04", heightClass: "h-[260px]" },
  ],
  [
    { key: "poster-02", heightClass: "h-[260px]" },
    { key: "poster-04", heightClass: "h-[300px]" },
    { key: "poster-12", heightClass: "h-[280px]" },
    { key: "poster-05", heightClass: "h-[260px]" },
    { key: "poster-02", heightClass: "h-[280px]" },
    { key: "poster-15", heightClass: "h-[300px]" },
    { key: "poster-04", heightClass: "h-[260px]" },
    { key: "poster-09", heightClass: "h-[300px]" },
  ],
  [
    { key: "poster-03", heightClass: "h-[240px]" },
    { key: "poster-10", heightClass: "h-[260px]" },
    { key: "poster-13", heightClass: "h-[280px]" },
    { key: "poster-08", heightClass: "h-[280px]" },
    { key: "poster-10", heightClass: "h-[260px]" },
    { key: "poster-08", heightClass: "h-[320px]" },
    { key: "poster-05", heightClass: "h-[260px]" },
  ],
  [
    { key: "poster-02", heightClass: "h-[260px]" },
    { key: "poster-14", heightClass: "h-[300px]" },
    { key: "poster-04", heightClass: "h-[300px]" },
    { key: "poster-09", heightClass: "h-[300px]" },
    { key: "poster-16", heightClass: "h-[280px]" },
    { key: "poster-01", heightClass: "h-[280px]" },
    { key: "poster-09", heightClass: "h-[300px]" },
    { key: "poster-04", heightClass: "h-[260px]" },
  ],
  [
    { key: "poster-07", heightClass: "h-[240px]" },
    { key: "poster-06", heightClass: "h-[300px]", liked: true },
    { key: "poster-17", heightClass: "h-[280px]" },
    { key: "poster-09", heightClass: "h-[300px]" },
    { key: "poster-08", heightClass: "h-[280px]" },
    { key: "poster-06", heightClass: "h-[320px]" },
    { key: "poster-04", heightClass: "h-[280px]" },
  ],
];

/**
 * 2025-11-10 15:45: GalleryGrid 静态占位，后续可替换为真实数据。
 */
export default function GalleryGrid() {
  const [, setIsLoadReady] = useState(false);
  const sentinelRef = useRef<HTMLDivElement | null>(null);
  const { showToast } = useGlobalToast();
  const galleryT = useTranslator("inspiration.gallery");
  const cardsT = useTranslator("inspiration.gallery.cards");
  const notifyComingSoon = useFeatureToast(galleryT("comingSoonToast"));
  const filterAllLabel = galleryT("filterAll");
  const searchPlaceholder = galleryT("searchPlaceholder");
  const searchToastMessage = galleryT("searchToast");
  const loadMoreLabel = galleryT("loadMore");

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
    <section id="gallery" className="w-full px-4 pb-20 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-[1440px]">
        <div className="py-20 flex flex-col items-center gap-3 sm:flex-row sm:justify-center">
          <button
            type="button"
            className="inline-flex cursor-pointer h-[50px] items-center gap-2 rounded-full bg-[#171719] px-5 py-3 text-sm font-semibold text-white/85 shadow-[0_16px_34px_rgba(0,0,0,0.45)] hover:border-white/30 hover:text-white"
            onClick={notifyComingSoon}
          >
            {filterAllLabel}
            <img src="/assets/icons/chevron-down.svg" alt="" className="h-3.5 w-3.5" />
          </button>

          <div className="flex h-[50px] w-full max-w-[480px] items-center gap-3 rounded-full bg-[#181818] px-5 py-3">
            <svg xmlns="http://www.w3.org/2000/svg" width="15" height="16" viewBox="0 0 15 16" fill="none">
              <path d="M12.7588 11.8838C12.9503 12.5382 13.4618 13.0497 14.1162 13.2412L15 13.5L14.1162 13.7588C13.4618 13.9503 12.9503 14.4618 12.7588 15.1162L12.5 16L12.2412 15.1162C12.0497 14.4618 11.5382 13.9503 10.8838 13.7588L10 13.5L10.8838 13.2412C11.5382 13.0497 12.0497 12.5382 12.2412 11.8838L12.5 11L12.7588 11.8838ZM7.66309 4.97852C7.85457 5.6332 8.3668 6.14543 9.02148 6.33691L13 7.5L9.02148 8.66309C8.3668 8.85457 7.85457 9.3668 7.66309 10.0215L6.5 14L5.33691 10.0215C5.14543 9.3668 4.6332 8.85457 3.97852 8.66309L0 7.5L3.97852 6.33691C4.6332 6.14543 5.14543 5.6332 5.33691 4.97852L6.5 1L7.66309 4.97852ZM12.7588 0.883789C12.9503 1.53817 13.4618 2.04967 14.1162 2.24121L15 2.5L14.1162 2.75879C13.4618 2.95033 12.9503 3.46183 12.7588 4.11621L12.5 5L12.2412 4.11621C12.0497 3.46183 11.5382 2.95033 10.8838 2.75879L10 2.5L10.8838 2.24121C11.5382 2.04967 12.0497 1.53817 12.2412 0.883789L12.5 0L12.7588 0.883789Z" fill="#929292" />
            </svg>
            <input
              type="search"
              placeholder={searchPlaceholder}
              className="h-full flex-1 bg-transparent text-sm text-white placeholder:text-white/40 focus:outline-none"
              onKeyDown={(e) => {
                if (e.key === 'Enter') {
                  e.preventDefault();
                  showToast(searchToastMessage);
                }
              }}
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
                const dictionaryKey = meta.dictionaryKey;
                const title = cardsT(`${dictionaryKey}.title`);
                const cardId = `${item.key}-${columnIndex}-${itemIndex}`;
                return (
                  <article
                    key={cardId}
                    className={`group relative overflow-hidden rounded-[28px] p-[3px] shadow-[0_25px_60px_rgba(0,0,0,0.55)] ${cardHover}`}
                  >
                    <div className={`relative flex w-full flex-col overflow-hidden rounded-[24px] ${item.heightClass}`}>
                      <img src={meta.cover} alt={title} className="absolute inset-0 h-full w-full object-cover" loading="lazy" />
                      <div className="absolute inset-0 bg-gradient-to-b from-black/0 via-black/20 to-black/70 opacity-90 transition-opacity duration-200 ease-out group-hover:opacity-80" />
                    </div>
                  </article>
                );
              })}
            </div>
          ))}
        </div>

        <div ref={sentinelRef} className="pt-10 flex flex-col items-center gap-3">
          <button
            type="button"
            className={`inline-flex items-center gap-2 px-8 py-3 text-base font-semibold ${btnPrimary}`}
            onClick={notifyComingSoon}
          >
            {loadMoreLabel}
            <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 20 20" fill="none" aria-hidden="true">
              <path d="M10 5V15M10 15L6 11M10 15L14 11" stroke="#161616" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          </button>
        </div>
      </div>
    </section>
  );
}
