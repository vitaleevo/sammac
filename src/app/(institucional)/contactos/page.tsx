import type { Metadata } from "next";
import { Mail, Phone, MessageCircle } from "lucide-react";
import { PageHero } from "@/components/page-hero";
import { LeadForm } from "@/components/forms";
import { site } from "@/lib/site";

export const metadata: Metadata = {
  title: "Contactos",
  description:
    "Contacte a SAMMAC para formações, serviços técnicos e parcerias.",
};

export default function Page() {
  return (
    <>
      <PageHero
        eyebrow="Contactos"
        title="Fale com a nossa equipa."
        text="Para formação, serviços técnicos, parcerias ou informações gerais, escolha o canal mais conveniente ou envie o formulário."
        image="/images/technician-black.jpg"
        cta={false}
      />
      <section className="section-pad bg-[#f5f7fb]">
        <div className="container-x grid gap-8 lg:grid-cols-[.8fr_1.2fr]">
          <div>
            <h2 className="text-3xl font-black text-[#07132f]">
              Canais diretos
            </h2>
            <div className="mt-6 grid gap-3">
              <a
                href={site.phoneHref}
                className="flex items-center gap-4 rounded-2xl bg-white p-5 shadow-sm"
              >
                <Phone className="text-[#d51f28]" />
                <div>
                  <p className="text-xs text-slate-500">Telefone</p>
                  <strong>{site.phone}</strong>
                </div>
              </a>
              <a
                href={site.whatsapp}
                target="_blank"
                rel="noreferrer"
                className="flex items-center gap-4 rounded-2xl bg-white p-5 shadow-sm"
              >
                <MessageCircle className="text-[#25D366]" />
                <div>
                  <p className="text-xs text-slate-500">WhatsApp</p>
                  <strong>{site.phone}</strong>
                </div>
              </a>
              <a
                href={`mailto:${site.email}`}
                className="flex items-center gap-4 rounded-2xl bg-white p-5 shadow-sm"
              >
                <Mail className="text-[#d51f28]" />
                <div>
                  <p className="text-xs text-slate-500">E-mail</p>
                  <strong>{site.email}</strong>
                </div>
              </a>
            </div>
            <div className="mt-6 flex gap-3">
              <a
                href={site.facebook}
                target="_blank"
                rel="noreferrer"
                className="grid h-12 w-12 place-items-center rounded-xl bg-[#07132f] text-white"
              >
                <span className="font-black">f</span>
              </a>
              <a
                href={site.instagram}
                target="_blank"
                rel="noreferrer"
                className="grid h-12 w-12 place-items-center rounded-xl bg-[#07132f] text-white"
              >
                <span className="text-xs font-black">IG</span>
              </a>
              <a
                href={site.tiktok}
                target="_blank"
                rel="noreferrer"
                className="grid h-12 min-w-12 place-items-center rounded-xl bg-[#07132f] px-3 text-sm font-black text-white"
              >
                TT
              </a>
            </div>
          </div>
          <LeadForm type="contact" />
        </div>
      </section>
    </>
  );
}
