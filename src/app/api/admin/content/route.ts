import { revalidatePath } from "next/cache";
import { NextRequest, NextResponse } from "next/server";
import { z } from "zod";
import { getAdminSession } from "@/lib/auth";
import { convex } from "@/lib/convex-server";
import { api } from "../../../../../convex/_generated/api";
import type { Id } from "../../../../../convex/_generated/dataModel";
import { postSchema, projectSchema, courseSchema } from "@/lib/validation";
import { readJson, RequestError, withRequestLog } from "@/lib/http";
const envelope = z.object({
  entity: z.enum(["post", "project", "course", "inquiry"]),
  data: z.unknown(),
});
async function authorize() {
  if (!(await getAdminSession()))
    throw new RequestError(401, "Não autorizado.");
  if (!convex || !process.env.ADMIN_WRITE_SECRET)
    throw new RequestError(503, "Backend indisponível.");
  return { client: convex, secret: process.env.ADMIN_WRITE_SECRET };
}
function parse<T>(schema: z.ZodType<T>, data: unknown): T {
  const result = schema.safeParse(data);
  if (!result.success)
    throw new RequestError(
      422,
      result.error.issues[0]?.message || "Dados inválidos.",
    );
  return result.data;
}
export async function GET(req: NextRequest) {
  return withRequestLog(req, async () => {
    const { client, secret } = await authorize();
    return NextResponse.json(
      await client.query(api.content.adminDashboard, { secret }),
    );
  });
}
export async function POST(req: NextRequest) {
  return withRequestLog(req, async () => {
    const { client, secret } = await authorize();
    const { entity, data } = parse(envelope, await readJson(req));
    let id;
    if (entity === "post") {
      const d = parse(postSchema, data);
      id = await client.mutation(api.content.savePost, {
        ...d,
        id: d.id as Id<"posts"> | undefined,
        imageStorageId: d.imageStorageId as Id<"_storage"> | undefined,
        secret,
      });
    } else if (entity === "project") {
      const d = parse(projectSchema, data);
      id = await client.mutation(api.content.saveProject, {
        ...d,
        id: d.id as Id<"projects"> | undefined,
        imageStorageId: d.imageStorageId as Id<"_storage"> | undefined,
        secret,
      });
    } else if (entity === "course") {
      const d = parse(courseSchema, data);
      id = await client.mutation(api.content.saveCourse, {
        ...d,
        id: d.id as Id<"courses"> | undefined,
        imageStorageId: d.imageStorageId as Id<"_storage"> | undefined,
        startDate: d.startDate ? Date.parse(d.startDate) : undefined,
        endDate: d.endDate ? Date.parse(d.endDate) : undefined,
        secret,
      });
    } else {
      const d = parse(
        z.object({
          id: z.string().min(1).max(100),
          status: z.enum(["novo", "em contacto", "concluído"]),
        }),
        data,
      );
      id = await client.mutation(api.content.setInquiryStatus, {
        secret,
        id: d.id as Id<"inquiries">,
        status: d.status,
      });
    }
    if (entity !== "inquiry") {
      revalidatePath("/");
      revalidatePath(
        entity === "post"
          ? "/blog"
          : entity === "project"
            ? "/projetos"
            : "/formacoes",
        "layout",
      );
    }
    return NextResponse.json({ ok: true, id });
  });
}
export async function DELETE(req: NextRequest) {
  return withRequestLog(req, async () => {
    const { client, secret } = await authorize();
    const d = parse(
      z.object({
        entity: z.enum(["posts", "projects", "courses"]),
        id: z.string().min(1).max(100),
      }),
      await readJson(req, 4096),
    );
    await client.mutation(api.content.deleteItem, { secret, ...d });
    revalidatePath("/");
    revalidatePath(
      d.entity === "posts"
        ? "/blog"
        : d.entity === "projects"
          ? "/projetos"
          : "/formacoes",
      "layout",
    );
    return NextResponse.json({ ok: true });
  });
}
