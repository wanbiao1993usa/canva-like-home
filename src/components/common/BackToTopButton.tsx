"use client";

import { useCallback, useEffect, useState } from "react";
import { ArrowUp } from "lucide-react";
import clsx from "clsx";

type BackToTopButtonProps = {
  label?: string;
  ariaLabel?: string;
  threshold?: number;
  offsetPx?: number;
  bottomOffset?: number;
  className?: string;
};

/**
 * 2025-11-11 23:20: 全局返回顶部按钮，侦听滚动展示并兼顾无障碍体验
 */
export default function BackToTopButton({
  label = "Back to top",
  ariaLabel,
  threshold = 0.6,
  offsetPx = 0,
  bottomOffset = 32,
  className,
}: BackToTopButtonProps) {
  const [isVisible, setIsVisible] = useState(false);
  const [prefersReducedMotion, setPrefersReducedMotion] = useState(false);

  useEffect(() => {
    // 2025-11-11 23:20: 监听滚动高度并通过 rAF 节流以降低重渲染频率
    if (typeof window === "undefined") {
      return;
    }
    let ticking = false;

    const updateVisibility = () => {
      const scrollTop = window.scrollY || document.documentElement.scrollTop;
      const viewportHeight = window.innerHeight || document.documentElement.clientHeight || 0;
      const thresholdPx = viewportHeight * threshold + offsetPx;
      setIsVisible(scrollTop > thresholdPx);
    };

    const handleScroll = () => {
      if (ticking) {
        return;
      }
      ticking = true;
      window.requestAnimationFrame(() => {
        updateVisibility();
        ticking = false;
      });
    };

    updateVisibility();
    window.addEventListener("scroll", handleScroll, { passive: true });

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, [offsetPx, threshold]);

  useEffect(() => {
    // 2025-11-11 23:20: 侦测系统动画偏好，统一滚动行为体验
    if (typeof window === "undefined" || typeof window.matchMedia !== "function") {
      return;
    }

    const mediaQuery = window.matchMedia("(prefers-reduced-motion: reduce)");
    const handleChange = () => setPrefersReducedMotion(mediaQuery.matches);

    handleChange();

    if (typeof mediaQuery.addEventListener === "function") {
      mediaQuery.addEventListener("change", handleChange);
      return () => mediaQuery.removeEventListener("change", handleChange);
    }

    mediaQuery.addListener(handleChange);
    return () => mediaQuery.removeListener(handleChange);
  }, []);

  const handleScrollToTop = useCallback(() => {
    // 2025-11-11 23:20: 根据无动画偏好决定滚动行为
    if (typeof window === "undefined") {
      return;
    }
    window.scrollTo({
      top: 0,
      behavior: prefersReducedMotion ? "auto" : "smooth",
    });
  }, [prefersReducedMotion]);

  const computedAriaLabel = ariaLabel || label;

  return (
    <button
      type="button"
      aria-label={computedAriaLabel}
      onClick={handleScrollToTop}
      className={clsx(
        "fixed cursor-pointer right-[clamp(16px,4vw,40px)] z-[60] flex h-14 w-14 items-center justify-center rounded-full border border-white/15 bg-black/80 text-white shadow-[0_12px_32px_rgba(0,0,0,0.45)] transition-all duration-300 ease-out hover:bg-gradient-to-b hover:from-[#AE89FF] hover:to-[#6B4FF0] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#D0B3FF] focus-visible:ring-offset-2 focus-visible:ring-offset-transparent",
        isVisible ? "translate-y-0 opacity-100 pointer-events-auto" : "translate-y-4 opacity-0 pointer-events-none",
        className,
      )}
      style={{ bottom: bottomOffset }}
    >
      <ArrowUp className="h-5 w-5" aria-hidden="true" />
      <span className="sr-only">{label}</span>
    </button>
  );
}
