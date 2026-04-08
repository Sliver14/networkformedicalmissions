import { withAuth } from "next-auth/middleware";
import { NextResponse } from "next/server";

export default withAuth(
  function middleware(req) {
    const token = req.nextauth.token;
    const isLoginPage = req.nextUrl.pathname === "/admin/login";

    // If it's NOT the login page and the user doesn't have ADMIN role, redirect to home
    if (!isLoginPage && token?.role !== "ADMIN") {
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
    // Explicitly define the sign-in page for the middleware
    pages: {
      signIn: "/admin/login",
    },
  }
);

export const config = {
  // Match all /admin routes, including the base /admin
  matcher: ["/admin", "/admin/:path*"],
};
