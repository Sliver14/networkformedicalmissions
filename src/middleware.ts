import { withAuth } from "next-auth/middleware";
import { NextResponse } from "next/server";

export default withAuth(
  function middleware(req) {
    const token = req.nextauth.token;
    const path = req.nextUrl.pathname;

    // Admin paths require ADMIN role
    if (path.startsWith("/admin") && token?.role !== "ADMIN") {
      if (path !== "/admin/login") {
        return NextResponse.redirect(new URL("/", req.url));
      }
    }

    // Profile path requires a logged-in user (any role)
    if (path.startsWith("/profile") && !token) {
      return NextResponse.redirect(new URL("/login", req.url));
    }
  },
  {
    callbacks: {
      authorized: ({ token, req }) => {
        const path = req.nextUrl.pathname;
        if (path === "/admin/login" || path === "/login") {
          return true;
        }
        return !!token;
      },
    },
  }
);

export const config = {
  matcher: ["/admin/:path*", "/profile/:path*"],
};
