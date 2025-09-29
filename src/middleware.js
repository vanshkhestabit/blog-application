import { NextResponse } from "next/server";
import { jwtVerify } from "jose";

const SECRET_KEY = new TextEncoder().encode(process.env.JWT_SECRET_KEY);

export async function middleware(req) {
  const { pathname } = req.nextUrl;
  const token = req.cookies.get("accessToken")?.value;

  const publicPaths = [
    "/",
    "/sign-in",
    "/sign-up",
    "/api/v1/user/sign-in",
    "/api/v1/user/sign-up",
    "/api/v1/post/all-post",
  ];

  if ((!token || token.trim() === "") && publicPaths.includes(pathname)) {
    return NextResponse.next();
  }

  if (!token) {
    const loginUrl = new URL("/sign-in", req.url);
    return NextResponse.redirect(loginUrl);
  }

  try {
    const { payload } = await jwtVerify(token, SECRET_KEY);

    if (pathname.startsWith("/admin") && !payload.isAdmin) {
      return NextResponse.json(
        { error: "Forbidden - Admins only" },
        { status: 403 }
      );
    }

    // if (payload.isAdmin) {
    //   return NextResponse.redirect(new URL("/admin", req.url));
    // }

    if (publicPaths.includes(pathname)) {
      return NextResponse.redirect(new URL("/dashboard", req.url));
    }

    const newReqHeaders = new Headers(req.headers);
    newReqHeaders.set("x-user-id", payload.userID.toString());
    newReqHeaders.set("x-user-isAdmin", String(payload.isAdmin));
    newReqHeaders.set("x-user-isActive", String(payload.isActive));
    return NextResponse.next({
      request: {
        headers: newReqHeaders,
      },
    });
  } catch (err) {
    console.error("JWT error:", err);
    return NextResponse.redirect(new URL("/sign-in", req.url));
  }
}

export const config = {
  // runtime: "nodejs",
  matcher: [
    "/",
    "/sign-in",
    "/sign-up",
    "/dashboard/:path*",
    "/admin/:path*",
    "/api/v1/post/:path*",
    "/api/v1/user/:path*",
    "/api/v1/admin/:path*",
  ],
};
