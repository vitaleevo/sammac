export const revalidate = 60;
import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { PageHero } from "@/components/page-hero";
import { getProjects } from "@/lib/convex-server";
import { ArrowUpRight } from "lucide-react";
export const metadata: Metadata = {
  title: "Projetos",
  description: "Projetos e trabalhos técnicos publicados pela SAMMAC.",
};
export default async function Page() {
  const projects = await getProjects(60);
  return (
    <>
      <PageHero
        eyebrow="Portfólio"
        title="Projetos, intervenções e soluções técnicas."
        text="Conheça trabalhos publicados pela equipa SAMMAC nas áreas de automação, electricidade, manutenção, soldadura e capacitação técnica."
        image="/images/control-panel.jpg"
      />
      <section className="section-pad bg-white">
        <div className="container-x">
          {projects.length ? (
            <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
              {projects.map((p) => (
                <Link
                  key={p._id}
                  href={`/projetos/${p.slug}`}
                  className="group overflow-hidden rounded-[26px] border border-slate-200 bg-white"
                >
                  <div className="relative aspect-[4/3] overflow-hidden">
                    <Image
                      src={p.image || "/images/factory-tech.jpg"}
                      alt={p.title}
                      fill
                      className="object-cover transition duration-500 group-hover:scale-105"
                    />
                  </div>
                  <div className="p-6">
                    <div className="flex items-center justify-between gap-3">
                      <p className="text-xs font-black uppercase tracking-wider text-[#d51f28]">
                        {p.category || "Projeto"}
                      </p>
                      <ArrowUpRight size={18} />
                    </div>
                    <h2 className="mt-2 text-2xl font-black">{p.title}</h2>
                    <p className="mt-3 line-clamp-3 text-sm leading-6 text-slate-600">
                      {p.summary}
                    </p>
                  </div>
                </Link>
              ))}
            </div>
          ) : (
            <div className="rounded-3xl bg-[#f5f7fb] p-10 text-center">
              <h2 className="text-2xl font-black">Projetos em preparação</h2>
              <p className="mt-2 text-slate-600">
                A equipa está a organizar o portfólio. Novos projetos serão
                publicados aqui pelo backoffice.
              </p>
            </div>
          )}
        </div>
      </section>
    </>
  );
}
