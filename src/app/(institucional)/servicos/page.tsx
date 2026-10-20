import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { PageHero } from "@/components/page-hero";
import { Reveal } from "@/components/reveal";
import { services } from "@/lib/site";
import { ArrowRight, Check } from "lucide-react";
export const metadata: Metadata = {
  title: "Serviços",
  description:
    "Serviços de automação industrial, electricidade e soldadura da SAMMAC.",
};
export default function Page() {
  return (
    <>
      <PageHero
        eyebrow="Serviços técnicos"
        title="Soluções práticas para instalações, manutenção e indústria."
        text="Da necessidade inicial ao diagnóstico e execução, trabalhamos com foco em segurança, qualidade e continuidade operacional."
        image="/images/control-panel.jpg"
      />
      <section className="section-pad bg-white">
        <div className="container-x space-y-8">
          {services.map((s, i) => (
            <Reveal key={s.title}>
              <article className="grid overflow-hidden rounded-[30px] border border-slate-200 bg-white lg:grid-cols-2">
                <div
                  className={`relative min-h-[300px] ${i % 2 ? "lg:order-2" : ""}`}
                >
                  <Image
                    src={s.image}
                    alt={s.title}
                    fill
                    className="object-cover"
                  />
                </div>
                <div className="p-7 md:p-10">
                  <p className="eyebrow">
                    Serviço {String(i + 1).padStart(2, "0")}
                  </p>
                  <h2 className="mt-3 text-3xl font-black tracking-tight text-[#07132f]">
                    {s.title}
                  </h2>
                  <p className="mt-4 leading-7 text-slate-600">{s.text}</p>
                  <div className="mt-6 grid gap-2 text-sm text-slate-700">
                    {[
                      "Avaliação da necessidade e diagnóstico técnico",
                      "Planeamento orientado para segurança e qualidade",
                      "Execução por etapas com comunicação clara",
                      "Possibilidade de capacitação da equipa do cliente",
                    ].map((x) => (
                      <span key={x} className="flex gap-2">
                        <Check size={17} className="mt-0.5 text-[#d51f28]" />
                        {x}
                      </span>
                    ))}
                  </div>
                  <Link
                    href="/agendar"
                    className="mt-7 inline-flex items-center gap-2 rounded-xl bg-[#07132f] px-5 py-3 font-black text-white"
                  >
                    Solicitar avaliação <ArrowRight size={17} />
                  </Link>
                </div>
              </article>
            </Reveal>
          ))}
        </div>
      </section>
    </>
  );
}
