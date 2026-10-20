import type { Metadata } from "next";
import { PageHero } from "@/components/page-hero";
import { LeadForm } from "@/components/forms";
import { CalendarCheck, MessageSquareText, Users } from "lucide-react";
export const metadata: Metadata = {
  title: "Agendar reunião",
  description: "Solicite uma reunião com a equipa SAMMAC.",
};
export default async function Page({
  searchParams,
}: {
  searchParams: Promise<{ tipo?: string; curso?: string }>;
}) {
  const params = await searchParams;
  return (
    <>
      <PageHero
        eyebrow="Atendimento"
        title="Marque uma conversa com a SAMMAC."
        text="Indique o assunto e a data preferida. A nossa equipa confirma a disponibilidade por telefone, WhatsApp ou e-mail."
        image="/images/factory-tech.jpg"
        cta={false}
      />
      <section className="section-pad bg-white">
        <div className="container-x grid gap-10 lg:grid-cols-[.8fr_1.2fr]">
          <div>
            <p className="eyebrow">Como funciona</p>
            <h2 className="mt-3 text-3xl font-black">
              Um pedido simples, uma resposta objetiva.
            </h2>
            <div className="mt-7 grid gap-4">
              {(
                [
                  [
                    CalendarCheck,
                    "Escolha uma data",
                    "Indique a data preferida. A reunião só fica confirmada após contacto da equipa.",
                  ],
                  [
                    MessageSquareText,
                    "Explique o objetivo",
                    "Formação, serviço técnico, parceria, proposta empresarial ou outro assunto.",
                  ],
                  [
                    Users,
                    "Receba confirmação",
                    "A equipa SAMMAC entra em contacto para alinhar horário, formato e participantes.",
                  ],
                ] as const
              ).map(([I, t, d]) => (
                <div
                  key={t}
                  className="flex gap-4 rounded-2xl bg-[#f5f7fb] p-5"
                >
                  <I className="shrink-0 text-[#d51f28]" />
                  <div>
                    <h3 className="font-black">{t}</h3>
                    <p className="mt-1 text-sm leading-6 text-slate-600">{d}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
          <LeadForm
            type={params.tipo === "formacao" ? "training" : "meeting"}
            initialInterest={params.curso?.slice(0, 180)}
          />
        </div>
      </section>
    </>
  );
}
