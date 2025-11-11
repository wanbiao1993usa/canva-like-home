import { redirect } from "next/navigation";
import { defaultLocale } from "./i18n";

/**
 * 2025-11-11 17:45: 根路由统一跳转至默认语言，避免 / 命中 404
 */
export default function RootRedirectPage() {
  redirect(`/${defaultLocale}`);
}
