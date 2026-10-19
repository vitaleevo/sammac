import { cookies } from "next/headers";
import { createHmac, scryptSync, timingSafeEqual } from "node:crypto";

const COOKIE = "sammac_admin";

type Payload = { email: string; exp: number };

function b64(input: string) {
  return Buffer.from(input).toString("base64url");
}
function unb64(input: string) {
  return Buffer.from(input, "base64url").toString("utf8");
}
function secret() {
  const value = process.env.ADMIN_SESSION_SECRET;
  if (!value) throw new Error("ADMIN_SESSION_SECRET não configurado");
  return value;
}

export function verifyPassword(password: string) {
  const stored = process.env.ADMIN_PASSWORD_HASH;
  if (!stored) return false;
  const [salt, hash] = stored.split(":");
  if (!salt || !hash) return false;
  const calculated = scryptSync(password, salt, 64);
  const expected = Buffer.from(hash, "hex");
  return (
    calculated.length === expected.length &&
    timingSafeEqual(calculated, expected)
  );
}

export function createSession(email: string) {
  const payload: Payload = { email, exp: Date.now() + 8 * 60 * 60 * 1000 };
  const body = b64(JSON.stringify(payload));
  const sig = createHmac("sha256", secret()).update(body).digest("base64url");
  return `${body}.${sig}`;
}

export function verifySession(token?: string | null): Payload | null {
  if (!token) return null;
  const [body, signature] = token.split(".");
  if (!body || !signature) return null;
  const expected = createHmac("sha256", secret())
    .update(body)
    .digest("base64url");
  const a = Buffer.from(signature);
  const b = Buffer.from(expected);
  if (a.length !== b.length || !timingSafeEqual(a, b)) return null;
  try {
    const payload = JSON.parse(unb64(body)) as Payload;
    if (
      payload.email !== process.env.ADMIN_EMAIL?.toLowerCase() ||
      !Number.isFinite(payload.exp) ||
      payload.exp < Date.now()
    )
      return null;
    return payload;
  } catch {
    return null;
  }
}

export async function getAdminSession() {
  const store = await cookies();
  return verifySession(store.get(COOKIE)?.value);
}

export const adminCookie = { name: COOKIE, maxAge: 8 * 60 * 60 };
