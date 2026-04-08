import { withAuth } from "next-auth/middleware";
import { NextResponse } from "next/server";

export default withAuth(
  function middleware(req) {
    const token = req.nextauth.token;
    const isLoginPage = req.nextUrl.pathname === "/admin/login";

    // If already logged in and trying to access login page, redirect to admin dashboard
    if (isLoginPage && token) {
      return NextResponse.redirect(new URL("/admin", req.url));
    }

    // If the user is accessing an admin route and is not an ADMIN, redirect them
    // (excluding login page which is already handled by authorized callback)
    if (
      req.nextUrl.pathname.startsWith("/admin") &&
      !isLoginPage &&
      token?.role !== "ADMIN"
    ) {
      return NextResponse.redirect(new URL("/", req.url)); // Redirect non-admins to home
    }
  },
  {
    callbacks: {
      authorized: ({ token, req }) => {
        // If it's the login page, allow access
        if (req.nextUrl.pathname === "/admin/login") {
          return true;
        }
        // For other admin pages, require token
        return !!token;
      },
    },
  }
);

export const config = {
  matcher: ["/admin/:path*"],
};
