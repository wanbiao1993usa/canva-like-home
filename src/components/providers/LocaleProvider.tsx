"use client";

import { createContext, useContext, type ReactNode } from "react";
import { defaultLocale, type Locale } from "../../app/i18n";

type LocaleContextValue = {
  locale: Locale;
  dictionary: Record<string, unknown>;
};

/**
 * 2025-11-11 16:20: Locale 上下文，供 Header/Footer 等消费
 */
export const LocaleContext = createContext<LocaleContextValue>({
  locale: defaultLocale,
  dictionary: {},
});

type LocaleProviderProps = LocaleContextValue & {
  children: ReactNode;
};

export function LocaleProvider({ locale, dictionary, children }: LocaleProviderProps) {
  return (
    <LocaleContext.Provider value={{ locale, dictionary }}>
      {children}
    </LocaleContext.Provider>
  );
}

export const useLocaleContext = () => useContext(LocaleContext);
