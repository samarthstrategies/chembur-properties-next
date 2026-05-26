import { NextResponse } from "next/server";
import { verifyToken } from "@/lib/auth";

export async function middleware(request) {
  const { pathname } = request.nextUrl;
  const token = request.cookies.get("admin_token")?.value;

  // ── Protect /api/admin/* routes ──────────────────────────────────────────
  if (pathname.startsWith("/api/admin/")) {
    // Allow login endpoint through without auth
    if (pathname === "/api/admin/auth/login") {
      return NextResponse.next();
    }

    const decoded = token ? await verifyToken(token) : null;
    if (!decoded) {
      return NextResponse.json(
        { success: false, message: "Unauthorized" },
        { status: 401 }
      );
    }
    return NextResponse.next();
  }

  // ── Protect /admin/* pages ───────────────────────────────────────────────
  if (pathname.startsWith("/admin")) {
    // Allow login page through
    if (pathname === "/admin/login") {
      return NextResponse.next();
    }

    const decoded = token ? await verifyToken(token) : null;
    if (!decoded) {
      const loginUrl = new URL("/admin/login", request.url);
      loginUrl.searchParams.set("redirect", pathname);
      return NextResponse.redirect(loginUrl);
    }
    return NextResponse.next();
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/admin/:path*", "/api/admin/:path*"],
};
