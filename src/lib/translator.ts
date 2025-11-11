export type Dictionary = Record<string, unknown>;

/**
 * 2025-11-11 17:10: 递归读取嵌套字典的工具函数
 */
export function translate(dictionary: Dictionary, path: string, fallback?: string): string {
  const segments = path.split(".");
  let value: unknown = dictionary;

  for (const segment of segments) {
    if (typeof value !== "object" || value === null) {
      return fallback ?? path;
    }
    value = (value as Record<string, unknown>)[segment];
  }

  if (typeof value === "string") {
    return value;
  }
  return fallback ?? path;
}

export function createTranslator(dictionary: Dictionary) {
  return (path: string, fallback?: string) => translate(dictionary, path, fallback);
}
