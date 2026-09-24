import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

export function proxy(request: NextRequest) {
  const { pathname, searchParams } = request.nextUrl;

  const sessionToken =
    request.cookies.get("better-auth.session_token")?.value ||
    request.cookies.get("__Secure-better-auth.session_token")?.value ||
    request.cookies.get("__Host-better-auth.session_token")?.value;

  const isAuthenticated = Boolean(sessionToken);

  // 1. Authenticated user visiting /sign-in or /login -> bounce to /dashboard/overview
  if (isAuthenticated && (pathname === "/sign-in" || pathname === "/login" || pathname === "/signin")) {
    const rawCallbackUrl = searchParams.get("callbackUrl");
    let target = "/dashboard/overview";

    if (rawCallbackUrl && rawCallbackUrl.startsWith("/") && !rawCallbackUrl.startsWith("//")) {
      target = rawCallbackUrl;
    }

    return NextResponse.redirect(new URL(target, request.url));
  }

  // 2. Unauthenticated user accessing protected dashboard routes -> bounce to /sign-in
  if (!isAuthenticated && pathname.startsWith("/dashboard")) {
    const signInUrl = new URL("/sign-in", request.url);
    const callbackPath = pathname + (request.nextUrl.search || "");

    // Sanitize callback path against open redirect vulnerabilities
    if (callbackPath.startsWith("/") && !callbackPath.startsWith("//")) {
      signInUrl.searchParams.set("callbackUrl", callbackPath);
    } else {
      signInUrl.searchParams.set("callbackUrl", "/dashboard/overview");
    }

    return NextResponse.redirect(signInUrl);
  }

  return NextResponse.next();
}

export const config = {
  matcher: [
    "/dashboard/:path*",
    "/sign-in",
    "/signin",
    "/login",
  ],
};
