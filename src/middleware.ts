"use server";

import { NextRequest, NextResponse } from "next/server";
import { BASE_URL } from "./services/api-base-url";

/**
 *
 * @description Middleware function to handle user roles
 *
 * @param {Request} req
 * @returns {NextResponse<unknown>}
 */

export async function middleware(
  req: NextRequest
): Promise<NextResponse<unknown>> {
  const { pathname } = req.nextUrl;
  const url = req.nextUrl.clone();
  const host = req.nextUrl.host;
  const protocol = req.nextUrl.protocol;

  const accessToken = req.cookies.get("accessToken")?.value;

  if (pathname === "/") {
    return NextResponse.redirect(
      new URL(`${protocol}//${host}/login`, req.url)
    );
  }

  const loggedInUser = await validateToken(accessToken as string);

  if (!loggedInUser) {
    if (url.pathname.includes("login")) {
      return NextResponse.next();
    } else {
      return NextResponse.redirect(
        new URL(`${protocol}//${host}/login`, req.url)
      );
    }
  } else {
    if (url.pathname.includes("login")) {
      return NextResponse.redirect(
        new URL(`${protocol}//${host}/dashboard`, req.url)
      );
    } else {
      return NextResponse.next();
    }
  }
}

export const config = {
  matcher: [
    /*
     * Match all request paths except for the ones starting with:
     * - api (API routes)
     * - _next/static (static files)
     * - _next/image (image optimization files)
     * - favicon.ico (favicon file)
     */
    "/((?!api|_next/static|_next/image|favicon.ico).*)",
  ],
};

async function validateToken(token: string) {
  try {
    const res = await fetch(BASE_URL + "/admin/me", {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    if (!res.ok) return null;
    return res.json();
  } catch (error) {
    console.log("error in validateToken", error);
    return null;
  }
}
