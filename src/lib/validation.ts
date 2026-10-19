import { z } from "zod";
export const inquirySchema = z.object({
  type: z.enum(["contact", "service", "training", "meeting"]),
  name: z.string().trim().min(2).max(120),
  email: z.string().trim().email().max(180),
  phone: z.string().trim().min(7).max(40),
  organization: z.string().trim().max(160).optional().default(""),
  subject: z.string().trim().max(160).optional().default(""),
  interest: z.string().trim().max(200).optional().default(""),
  preferredDate: z.string().trim().max(40).optional().default(""),
  message: z.string().trim().min(5).max(4000),
  website: z.string().max(0).optional().default(""),
});
