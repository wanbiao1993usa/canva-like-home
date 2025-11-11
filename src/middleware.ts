import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { detectLocaleFromHeader, isLocale, locales, localeCookieName } from "./app/i18n";

/**
 * 2025-11-11 17:10: 判断路径是否已包含受支持的 locale 前缀，避免重复重写
 */
const hasLocalePrefix = (pathname: string) =>
  locales.some((locale) => pathname === `/${locale}` || pathname.startsWith(`/${locale}/`));

/**
 * 2025-11-11 17:10: 中间件在用户未显式指定语言时重写至默认语言，解决根路由 404 问题
 */
export function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;

  if (
    pathname.startsWith("/_next") ||
    pathname.startsWith("/api") ||
    pathname === "/favicon.ico" ||
    pathname === "/robots.txt" ||
    /\.\w+$/.test(pathname)
  ) {
    return NextResponse.next();
  }

  const matchingLocale = locales.find((locale) => pathname === `/${locale}` || pathname.startsWith(`/${locale}/`));
  const requestHeaders = new Headers(request.headers);

  if (matchingLocale) {
    requestHeaders.set("x-cande-locale", matchingLocale);
    const response = NextResponse.next({
      request: {
        headers: requestHeaders,
      },
    });
    response.cookies.set(localeCookieName, matchingLocale);
    return response;
  }

  const cookieLocale = request.cookies.get(localeCookieName)?.value;
  const preferredLocale = cookieLocale && isLocale(cookieLocale) ? cookieLocale : detectLocaleFromHeader(request.headers.get("accept-language"));

  const rewriteUrl = request.nextUrl.clone();
  rewriteUrl.pathname = pathname === "/" ? `/${preferredLocale}` : `/${preferredLocale}${pathname}`;
  requestHeaders.set("x-cande-locale", preferredLocale);
  const response = NextResponse.rewrite(rewriteUrl, {
    request: {
      headers: requestHeaders,
    },
  });
  response.cookies.set(localeCookieName, preferredLocale);
  return response;
}

export const config = {
  /**
   * 2025-11-11 17:10: 只拦截除静态资源外的所有路径，确保性能
   */
  matcher: ["/((?!_next|api|.*\\..*).*)"],
};
