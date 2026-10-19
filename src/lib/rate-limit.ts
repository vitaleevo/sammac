import { createHmac } from "node:crypto";
import { convex } from "./convex-server";
import { api } from "../../convex/_generated/api";

export async function consumeLimit(
  scope: string,
  ip: string,
  limit: number,
  windowMs: number,
) {
  const secret = process.env.ADMIN_WRITE_SECRET;
  if (!convex || !secret) throw new Error("Backend not configured");
  const key =
    scope + ":" + createHmac("sha256", secret).update(ip).digest("hex");
  return convex.mutation(api.rateLimits.consume, {
    secret,
    key,
    limit,
    windowMs,
  });
}
