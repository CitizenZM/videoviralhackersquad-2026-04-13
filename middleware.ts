import { NextRequest, NextResponse } from "next/server";

const protectedPrefixes = [
  "/project",
  "/dashboard",
  "/content",
  "/insights",
  "/competitors",
  "/creative",
  "/preview",
  "/exports",
  "/settings",
];

const publicPaths = ["/", "/login", "/api/auth/login", "/api/auth/logout", "/api/auth/me"];

export function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;

  if (publicPaths.includes(pathname) || pathname.startsWith("/_next")) {
    return NextResponse.next();
  }

  if (pathname.startsWith("/api")) {
    return NextResponse.next();
  }

  const isProtected = protectedPrefixes.some((prefix) => pathname.startsWith(prefix));
  if (!isProtected) {
    return NextResponse.next();
  }

  const sessionToken = request.cookies.get("vvhs_session")?.value;
  if (!sessionToken) {
    const url = request.nextUrl.clone();
    url.pathname = "/login";
    return NextResponse.redirect(url);
  }

  return NextResponse.next();
}

export const config = {
  matcher: [
    "/project/:path*",
    "/dashboard",
    "/content",
    "/insights",
    "/competitors",
    "/creative",
    "/preview",
    "/exports",
    "/settings/:path*",
  ],
};
