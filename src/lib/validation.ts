import { z } from "zod";
import { publicationSlug } from "./slug";
export const inquirySchema = z
  .object({
    type: z.enum(["contact", "service", "training", "meeting"]),
    name: z.string().trim().min(2).max(120),
    email: z.string().trim().email().max(180),
    phone: z.string().trim().min(7).max(40),
    organization: z.string().trim().max(160).optional().default(""),
    subject: z.string().trim().max(160).optional().default(""),
    interest: z.string().trim().max(200).optional().default(""),
    preferredDate: z
      .string()
      .trim()
      .refine(
        (value) =>
          !value ||
          (/^\d{4}-\d{2}-\d{2}$/.test(value) &&
            Number.isFinite(Date.parse(value)) &&
            value >=
              new Intl.DateTimeFormat("en-CA", {
                timeZone: "Africa/Luanda",
              }).format(new Date())),
        "Escolha uma data válida a partir de hoje.",
      )
      .optional()
      .default(""),
    message: z.string().trim().min(5).max(4000),
    website: z.string().max(0).optional().default(""),
  })
  .refine(
    (data) =>
      data.type !== "meeting" || Boolean(data.preferredDate && data.interest),
    "Indique uma data e o assunto da reunião.",
  );

const imageUrl = z
  .string()
  .max(2048)
  .refine(
    (value) =>
      !value ||
      /^\/images\/[a-zA-Z0-9._/-]+$/.test(value) ||
      /^https:\/\/amiable-rabbit-725\.convex\.(cloud|site)\//.test(value),
    "Use uma imagem da biblioteca ou carregue um ficheiro do computador.",
  )
  .optional();
const common = {
  id: z.string().max(100).optional(),
  title: z.string().trim().min(3).max(180),
  category: z.string().trim().max(100).optional(),
  imageUrl,
  imageStorageId: z.string().max(100).optional(),
};
const publication = {
  ...common,
  slug: z
    .string()
    .min(1, "Indique um título ou endereço com letras ou números.")
    .max(180)
    .regex(
      /^[a-z0-9]+(?:-[a-z0-9]+)*$/,
      "Use letras, números e hífenes no endereço da publicação.",
    ),
  content: z.string().trim().min(5).max(60_000),
  status: z.enum(["draft", "published"]),
};
function normalizePublication(input: unknown) {
  if (!input || typeof input !== "object" || Array.isArray(input)) return input;
  const data = input as Record<string, unknown>;
  if (
    typeof data.title !== "string" ||
    (data.slug !== undefined && typeof data.slug !== "string")
  )
    return input;
  return { ...data, slug: publicationSlug(data.slug ?? "", data.title) };
}

export const postSchema = z.preprocess(
  normalizePublication,
  z.object({
    ...publication,
    excerpt: z.string().trim().min(5).max(1000),
  }),
);
export const projectSchema = z.preprocess(
  normalizePublication,
  z.object({
    ...publication,
    summary: z.string().trim().min(5).max(1000),
    featured: z.boolean().optional(),
  }),
);
const date = z.string().date().or(z.literal("")).optional();
export const courseSchema = z
  .object({
    ...common,
    category: z.string().trim().min(1).max(100),
    summary: z.string().trim().min(5).max(1000),
    description: z.string().max(10_000).optional(),
    duration: z.string().min(1).max(100),
    modality: z.string().min(1).max(100),
    startDate: date,
    endDate: date,
    status: z.enum(["Inscrições abertas", "Planeado", "Em curso", "Encerrado"]),
  })
  .refine(
    (data) =>
      !data.startDate || !data.endDate || data.endDate >= data.startDate,
    "A data final deve ser posterior ao início.",
  );
