import { randomUUID } from "node:crypto";
import { NextRequest, NextResponse } from "next/server";

export function validateRequest(req: NextRequest, maxBytes = 128_000) {
  const origin = req.headers.get("origin");
  if (origin && origin !== req.nextUrl.origin) {
    throw new RequestError(403, "Origem do pedido inválida.");
  }
  if (!req.headers.get("content-type")?.includes("application/json")) {
    throw new RequestError(415, "Envie os dados em formato JSON.");
  }
  if (Number(req.headers.get("content-length")) > maxBytes) {
    throw new RequestError(413, "Pedido demasiado grande.");
  }
}

export async function readJson(
  req: NextRequest,
  maxBytes = 128_000,
): Promise<unknown> {
  validateRequest(req, maxBytes);
  const text = await req.text();
  if (Buffer.byteLength(text) > maxBytes)
    throw new RequestError(413, "Pedido demasiado grande.");
  try {
    return JSON.parse(text);
  } catch {
    throw new RequestError(400, "Dados inválidos.");
  }
}

export class RequestError extends Error {
  constructor(
    public status: number,
    message: string,
  ) {
    super(message);
  }
}

export async function withRequestLog(
  req: NextRequest,
  run: () => Promise<NextResponse>,
) {
  const requestId = randomUUID();
  const start = Date.now();
  let response: NextResponse;
  try {
    response = await run();
  } catch (error) {
    const status = error instanceof RequestError ? error.status : 503;
    console.error(
      JSON.stringify({
        requestId,
        event: "request_failed",
        path: req.nextUrl.pathname,
        status,
        error:
          error instanceof RequestError ? error.message : "upstream_failure",
      }),
    );
    response = NextResponse.json(
      {
        error:
          error instanceof RequestError
            ? error.message
            : "Serviço temporariamente indisponível. Tente novamente.",
        requestId,
      },
      { status },
    );
  }
  response.headers.set("X-Request-Id", requestId);
  response.headers.set("Cache-Control", "no-store");
  console.info(
    JSON.stringify({
      requestId,
      method: req.method,
      path: req.nextUrl.pathname,
      status: response.status,
      latencyMs: Date.now() - start,
    }),
  );
  return response;
}
