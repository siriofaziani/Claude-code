import { NextResponse } from "next/server";
import { locales, defaultLocale } from "@/data/content";

// Sends every address without a language (including the old Wix URLs such as
// /casale-san-carlo) to the visitor's language: Italian when the browser prefers it.
function pickLocale(request) {
  const header = request.headers.get("accept-language") || "";
  const first = header.split(",")[0]?.trim().toLowerCase() || "";
  return first.startsWith("it") ? "it" : defaultLocale;
}

export function proxy(request) {
  const { pathname } = request.nextUrl;
  const hasLocale = locales.some((l) => pathname === `/${l}` || pathname.startsWith(`/${l}/`));
  if (hasLocale) return;
  request.nextUrl.pathname = `/${pickLocale(request)}${pathname === "/" ? "" : pathname}`;
  return NextResponse.redirect(request.nextUrl);
}

export const config = {
  matcher: ["/((?!_next|images|logo-weathervane.svg|icon.svg|favicon.ico|robots.txt|sitemap.xml).*)"],
};
