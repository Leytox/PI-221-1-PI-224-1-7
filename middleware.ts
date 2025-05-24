import NextAuth from "next-auth";
import authConfig from "@/auth.config";
import { NextResponse } from "next/server";
import { Role } from "./generated/prisma";

export const { auth } = NextAuth(authConfig);

export default auth(async function middleware(req) {
  const isLoggedIn = !!req.auth;
  if (req.auth?.user?.role === Role.ADMIN) return NextResponse.next();
  console.log(req.auth?.user?.role);
  if (
    (req.nextUrl.pathname.includes("registration") ||
      req.nextUrl.pathname.includes("login")) &&
    isLoggedIn
  )
    return NextResponse.redirect(new URL("/", req.nextUrl.origin));

  if (req.nextUrl.pathname.includes("logout") && !isLoggedIn)
    return NextResponse.redirect(new URL("/", req.nextUrl.origin));

  if (req.nextUrl.pathname.includes("cart") && !isLoggedIn)
    return NextResponse.redirect(new URL("/login", req.nextUrl.origin));

  if (
    req.nextUrl.pathname.includes("manager") &&
    req.auth?.user?.role !== Role.MANAGER
  )
    return NextResponse.redirect(new URL("/login", req.nextUrl.origin));

  if (req.nextUrl.pathname.includes("admin"))
    return NextResponse.redirect(new URL("/login", req.nextUrl.origin));

  return NextResponse.next();
});

export const runtime = "experimental-edge";
export const dynamic = "force-dynamic";
export const regions = ["auto"];
