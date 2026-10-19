import { NextRequest, NextResponse } from "next/server";
import { getAdminSession } from "@/lib/auth";
import { convex } from "@/lib/convex-server";
import { api } from "../../../../../convex/_generated/api";
import { RequestError, withRequestLog } from "@/lib/http";
export async function POST(req: NextRequest) {
  return withRequestLog(req, async () => {
    if (
      req.headers.get("origin") &&
      req.headers.get("origin") !== req.nextUrl.origin
    )
      throw new RequestError(403, "Origem inválida.");
    if (!(await getAdminSession()))
      throw new RequestError(401, "Não autorizado.");
    if (!convex || !process.env.ADMIN_WRITE_SECRET)
      throw new RequestError(503, "Backend indisponível.");
    const url = await convex.mutation(api.content.generateUploadUrl, {
      secret: process.env.ADMIN_WRITE_SECRET,
    });
    return NextResponse.json({ url });
  });
}
