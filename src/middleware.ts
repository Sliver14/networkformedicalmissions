import { withAuth } from "next-auth/middleware";
import { NextResponse } from "next/server";

export default withAuth(
  function middleware(req) {
    const token = req.nextauth.token;

    // This function only runs for routes that match the config below.
    // If we reach here, we know it's an /admin route that IS NOT /admin/login.
    if (token?.role !== "ADMIN") {
      return NextResponse.redirect(new URL("/", req.url));
    }
  },
  {
    callbacks: {
      authorized: ({ token }) => !!token,
    },
  }
);

export const config = {
  // Use a negative lookahead to exclude /admin/login from the middleware
  matcher: ["/admin/((?!login).*)"],
};
