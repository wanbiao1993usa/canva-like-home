/**
 * 2025-11-11 11:55: 集中管理多语言相关常量与工具函数
 */
export const locales = ["zh-CN", "en-US"] as const;

export type Locale = (typeof locales)[number];

export const defaultLocale: Locale = locales[0];

export const localeCookieName = "cande-locale";

/**
 * 2025-11-11 22:10: 根据 Accept-Language 解析优先 locale，若无匹配则回退默认
 */
export function detectLocaleFromHeader(headerValue: string | null | undefined): Locale {
  if (!headerValue) {
    return defaultLocale;
  }
  const candidates = headerValue
    .split(",")
    .map((part) => part.split(";")[0]?.trim().toLowerCase())
    .filter(Boolean) as string[];

  const normalizedLocales = locales.map((locale) => locale.toLowerCase());

  for (const candidate of candidates) {
    const exactIndex = normalizedLocales.indexOf(candidate);
    if (exactIndex >= 0) {
      return locales[exactIndex];
    }
    const base = candidate.split("-")[0];
    const baseMatchIndex = normalizedLocales.findIndex((locale) => locale.split("-")[0] === base);
    if (baseMatchIndex >= 0) {
      return locales[baseMatchIndex];
    }
  }

  return defaultLocale;
}

/**
 * 2025-11-11 11:55: 判定字符串是否为受支持的 locale
 */
export const isLocale = (value: string): value is Locale =>
  locales.includes(value as Locale);

type Dictionary = Record<string, unknown>;

/**
 * 2025-11-11 11:55: 动态加载 locale 字典，若失败则回退到默认语言
 */
export async function getDictionary(locale: Locale): Promise<Dictionary> {
  try {
    const dictionary = await import(`../../messages/${locale}.json`);
    return dictionary.default as Dictionary;
  } catch (error) {
    console.warn(`[i18n] Missing dictionary for ${locale}, fallback to ${defaultLocale}`, error);
    const fallback = await import(`../../messages/${defaultLocale}.json`);
    return fallback.default as Dictionary;
  }
}
