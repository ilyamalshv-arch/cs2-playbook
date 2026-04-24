import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

const SUPPORTED = ["en", "ru", "es"];
const DEFAULT = "en";

function pickLang(req: NextRequest): string {
  // cookie wins
  const cookie = req.cookies.get("lang")?.value;
  if (cookie && SUPPORTED.includes(cookie)) return cookie;
  // accept-language
  const header = req.headers.get("accept-language") || "";
  for (const part of header.split(",")) {
    const code = part.split(";")[0].trim().slice(0, 2).toLowerCase();
    if (SUPPORTED.includes(code)) return code;
  }
  return DEFAULT;
}

export function middleware(req: NextRequest) {
  const { pathname } = req.nextUrl;

  // skip next internals, api, public files
  if (
    pathname.startsWith("/_next") ||
    pathname.startsWith("/api") ||
    pathname.includes(".")
  ) {
    return NextResponse.next();
  }

  const segs = pathname.split("/").filter(Boolean);
  const first = segs[0];
  if (first && SUPPORTED.includes(first)) {
    // already has lang prefix
    const res = NextResponse.next();
    res.cookies.set("lang", first, { maxAge: 60 * 60 * 24 * 365, path: "/" });
    return res;
  }

  // redirect to /<lang>/<rest>
  const lang = pickLang(req);
  const url = req.nextUrl.clone();
  url.pathname = `/${lang}${pathname}`;
  return NextResponse.redirect(url);
}

export const config = {
  matcher: ["/((?!_next|api|.*\\..*).*)"],
};
