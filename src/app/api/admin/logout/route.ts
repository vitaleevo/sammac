import { NextResponse } from "next/server";
import { adminCookie } from "@/lib/auth";
export async function POST() {
  const r = NextResponse.json({ ok: true });
  r.cookies.set(adminCookie.name, "", {
    httpOnly: true,
    secure: true,
    sameSite: "strict",
    path: "/",
    maxAge: 0,
  });
  return r;
}
