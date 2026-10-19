import { NextRequest, NextResponse } from "next/server";
import { submitInquiry } from "@/lib/submit-inquiry";
import { readJson, withRequestLog } from "@/lib/http";
export async function POST(req: NextRequest) {
  return withRequestLog(req, async () => {
    const result = await submitInquiry(
      await readJson(req, 16_384),
      req.headers.get("x-forwarded-for")?.split(",")[0]?.trim() || "local",
    );
    return NextResponse.json(result, { status: result.status });
  });
}
