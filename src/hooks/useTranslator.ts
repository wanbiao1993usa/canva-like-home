"use client";

import { useMemo } from "react";
import { useLocaleContext } from "../components/providers/LocaleProvider";
import { createTranslator } from "../lib/translator";

/**
 * 2025-11-11 17:10: 返回 t(key) helper，可选 prefix 便于分模块调用
 */
export function useTranslator(prefix?: string) {
  const { dictionary } = useLocaleContext();

  return useMemo(() => {
    const translator = createTranslator(dictionary);
    if (!prefix) {
      return translator;
    }
    return (key: string, fallback?: string) => translator(`${prefix}.${key}`, fallback);
  }, [dictionary, prefix]);
}
