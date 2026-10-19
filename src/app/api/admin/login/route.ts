import { NextRequest, NextResponse } from "next/server";
import { z } from "zod";
import { adminCookie, createSession, verifyPassword } from "@/lib/auth";
import { readJson, withRequestLog } from "@/lib/http";
import { consumeLimit } from "@/lib/rate-limit";
const schema = z.object({
  email: z.string().trim().email().max(180),
  password: z.string().min(1).max(256),
});
export async function POST(req: NextRequest) {
  return withRequestLog(req, async () => {
    const parsed = schema.safeParse(await readJson(req, 4096));
    if (!parsed.success)
      return NextResponse.json(
        { error: "Credenciais inválidas" },
        { status: 400 },
      );
    const ip =
      req.headers.get("x-forwarded-for")?.split(",")[0]?.trim() || "local";
    if (!(await consumeLimit("login", ip, 8, 15 * 60_000)))
      return NextResponse.json(
        { error: "Demasiadas tentativas. Aguarde 15 minutos." },
        { status: 429 },
      );
    const expected = process.env.ADMIN_EMAIL?.toLowerCase();
    const valid = verifyPassword(parsed.data.password);
    if (!expected || parsed.data.email.toLowerCase() !== expected || !valid)
      return NextResponse.json(
        { error: "Credenciais inválidas" },
        { status: 401 },
      );
    const res = NextResponse.json({ ok: true });
    res.cookies.set(adminCookie.name, createSession(expected), {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "strict",
      path: "/",
      maxAge: adminCookie.maxAge,
    });
    return res;
  });
}
