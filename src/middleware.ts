import { withAuth } from "next-auth/middleware";
import { NextResponse } from "next/server";

export default withAuth(
  function middleware(req) {
    const token = req.nextauth.token;
    const isLoginPage = req.nextUrl.pathname === "/admin/login";

    // If accessing any admin route (except login) and role is not ADMIN, redirect to home
    if (
      req.nextUrl.pathname.startsWith("/admin") &&
      !isLoginPage &&
      token?.role !== "ADMIN"
    ) {
      return NextResponse.redirect(new URL("/", req.url));
    }
  },
  {
    callbacks: {
      authorized: ({ token, req }) => {
        // Always allow access to the login page
        if (req.nextUrl.pathname === "/admin/login") {
          return true;
        }
        // Require a token for all other matched routes
        return !!token;
      },
    },
  }
);

export const config = {
  matcher: ["/admin/:path*"],
};
