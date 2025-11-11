'use client';

import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useRef,
  useState,
  type MouseEventHandler,
  type ReactNode,
} from "react";
import { useTranslator } from "../../../hooks/useTranslator";

type ToastContextValue = {
  showToast: (message?: string) => void;
  hideToast: () => void;
};

const DEFAULT_TOAST_MESSAGE_KEY = "common.featureToast";
const TOAST_DURATION = 3200;

const ToastContext = createContext<ToastContextValue | null>(null);

/**
 * 2025-11-11 14:20: 提供全局 Toast 上下文，集中管理提示文案与显隐
 */
export function ToastProvider({ children }: { children: ReactNode }) {
  const t = useTranslator();
  const defaultToastMessage = t(DEFAULT_TOAST_MESSAGE_KEY);
  // 2025-11-12 11:05: 通过字典读取默认提示，locale 切换时保持同步
  const [toastState, setToastState] = useState({
    visible: false,
    message: defaultToastMessage,
  });
  const timerRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  const hideToast = useCallback(() => {
    setToastState((prev) => ({
      ...prev,
      visible: false,
    }));
  }, []);

  const showToast = useCallback(
    (message?: string) => {
      const text = message?.trim() || defaultToastMessage;
      setToastState({ visible: true, message: text });

      if (timerRef.current) {
        clearTimeout(timerRef.current);
      }
      timerRef.current = setTimeout(() => {
        hideToast();
      }, TOAST_DURATION);
    },
    [defaultToastMessage, hideToast],
  );

  useEffect(() => {
    setToastState((prev) => ({
      ...prev,
      message: prev.visible ? prev.message : defaultToastMessage,
    }));
  }, [defaultToastMessage]);

  useEffect(() => {
    return () => {
      if (timerRef.current) {
        clearTimeout(timerRef.current);
      }
    };
  }, []);

  const contextValue = useMemo(
    () => ({
      showToast,
      hideToast,
    }),
    [showToast, hideToast],
  );

  return (
    <ToastContext.Provider value={contextValue}>
      {children}

      {/* 2025-11-11 14:20: 全局 Toast 展示层，固定在视口底部 */}
      <div className="pointer-events-none fixed inset-x-0 top-10 z-[1200] flex justify-center px-4">
        <div
          role="status"
          aria-live="polite"
          aria-atomic="true"
          className={`pointer-events-auto flex max-w-[420px] items-center gap-3 rounded-2xl border border-[#FB9B24] bg-[#1f1f1f]/95 px-5 py-3 text-sm text-white shadow-[0_18px_38px_rgba(0,0,0,0.45)] backdrop-blur-md transition-all duration-200 ${toastState.visible ? "translate-y-0 opacity-100" : "translate-y-4 opacity-0"
            }`}
        >
          <span className="inline-flex h-8 w-8 items-center justify-center rounded-full bg-[#AE89FF]/20 text-[#AE89FF]">
            !
          </span>
          <p className="flex-1 text-[15px] leading-6">{toastState.message}</p>
          <button
            type="button"
            onClick={hideToast}
            className="text-white/70 cursor-pointer transition-colors hover:text-white"
          >
            ✕
          </button>
        </div>
      </div>
    </ToastContext.Provider>
  );
}

/**
 * 2025-11-11 14:20: 提供 Toast 调用入口，便于在任意客户端组件中触发提示
 */
export function useGlobalToast() {
  const context = useContext(ToastContext);
  if (!context) {
    throw new Error("useGlobalToast must be used within ToastProvider");
  }
  return context;
}

/**
 * 2025-11-11 14:20: 返回预置"功能开发中"提示的点击处理器
 */
export function useFeatureToast(message?: string) {
  const { showToast } = useGlobalToast();

  return useCallback<MouseEventHandler<HTMLElement>>(
    (event) => {
      event?.preventDefault();
      event?.stopPropagation();
      showToast(message);
    },
    [message, showToast],
  );
}
