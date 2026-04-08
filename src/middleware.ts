import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { locales, defaultLocale } from "./i18n/config";

export function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;
  
  // 1. Language Redirect Logic
  const pathnameHasLocale = locales.some((locale) => pathname.startsWith(`/${locale}/`) || pathname === `/${locale}`);
  
  // 2. Admin Protection Logic (Cookie based instead of Basic Auth)
  const isAdminPath = pathname.includes("/admin");
  if (isAdminPath) {
    const isAdmin = request.cookies.get("is_admin")?.value === "true";
    if (!isAdmin) {
      // Find current locale or fallback
      const locale = locales.find((l) => pathname.startsWith(`/${l}`)) || defaultLocale;
      return NextResponse.redirect(new URL(`/${locale}/login`, request.url));
    }
  }

  if (pathnameHasLocale) return;
  
  request.nextUrl.pathname = `/${defaultLocale}${pathname}`;
  return NextResponse.redirect(request.nextUrl);
}

export const config = { matcher: ["/((?!_next|api|favicon.ico|.*\\..*).*)"] };
