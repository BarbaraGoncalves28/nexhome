import { NextRequest } from "next/server";
import { NextResponse } from "next/server";

export function middleware(
  request: NextRequest
) {
  const token =
    request.cookies.get("token");

  const isAuthPage =
    request.nextUrl.pathname.startsWith(
      "/login"
    ) ||
    request.nextUrl.pathname.startsWith(
      "/register"
    );

  if (
    !token &&
    !isAuthPage
  ) {
    return NextResponse.redirect(
      new URL(
        "/login",
        request.url
      )
    );
  }

  return NextResponse.next();
}

export const config = {
  matcher: [
    "/dashboard/:path*",
  ],
};