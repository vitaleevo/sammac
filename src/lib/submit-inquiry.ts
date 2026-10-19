import { Resend } from "resend";
import { convex } from "@/lib/convex-server";
import { api } from "../../convex/_generated/api";
import { inquirySchema } from "@/lib/validation";
import { consumeLimit } from "./rate-limit";
export async function submitInquiry(body: unknown, ip: string) {
  const parsed = inquirySchema.safeParse(body);
  if (!parsed.success)
    return {
      ok: false,
      status: 400,
      error: "Verifique os dados do formulário.",
    };
  if (!(await consumeLimit("inquiry", ip, 5, 10 * 60_000)))
    return {
      ok: false,
      status: 429,
      error: "Muitos pedidos. Tente novamente mais tarde.",
    };
  const secret = process.env.ADMIN_WRITE_SECRET;
  if (!secret || !convex)
    return {
      ok: false,
      status: 503,
      error: "Serviço temporariamente indisponível.",
    };
  const d = parsed.data;
  const id = await convex.mutation(api.content.createInquiry, {
    secret,
    type: d.type,
    name: d.name,
    email: d.email,
    phone: d.phone,
    organization: d.organization || undefined,
    subject: d.subject || undefined,
    interest: d.interest || undefined,
    preferredDate: d.preferredDate || undefined,
    message: d.message,
  });
  const key = process.env.RESEND_API_KEY;
  if (key) {
    const resend = new Resend(key);
    try {
      const { error } = await resend.emails.send(
        {
          from: process.env.EMAIL_FROM || "SAMMAC <info@sammac.ao>",
          to: [process.env.EMAIL_TO || "info@sammac.ao"],
          replyTo: d.email,
          subject: "SAMMAC — novo pedido: " + d.type + " — " + d.name,
          text: [
            "Nome: " + d.name,
            "E-mail: " + d.email,
            "Telefone: " + d.phone,
            "Empresa: " + d.organization,
            "Interesse: " + d.interest,
            "Data preferida: " + d.preferredDate,
            "Mensagem:",
            d.message,
            "Consultar pedidos: https://sammac.ao/backoffice",
          ].join("\n"),
        },
        { idempotencyKey: "inquiry/" + id },
      );
      if (error)
        console.error(
          JSON.stringify({
            event: "notification_failed",
            inquiryId: id,
            code: error.name,
          }),
        );
    } catch {
      console.error(
        JSON.stringify({
          event: "notification_failed",
          inquiryId: id,
          code: "network",
        }),
      );
    }
  }
  return { ok: true, status: 201 };
}
