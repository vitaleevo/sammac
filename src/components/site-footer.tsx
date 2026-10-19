"use client";
import { usePathname } from "next/navigation";
import Image from "next/image";
import Link from "next/link";
import { Mail, MapPin, Phone } from "lucide-react";
import { site } from "@/lib/site";

export function SiteFooter() {
  const path = usePathname();
  if (path.startsWith("/backoffice")) return null;
  return (
    <footer className="bg-[#06102a] pb-28 text-white lg:pb-0">
      <div className="mx-auto grid max-w-7xl gap-10 px-5 py-14 md:grid-cols-4 md:px-8">
        <div className="md:col-span-1">
          <div className="inline-block rounded-xl bg-white p-3">
            <Image
              src="/brand/sammac-logo-horizontal.png"
              alt="SAMMAC"
              sizes="176px"
              width={260}
              height={70}
              className="h-11 w-auto"
            />
          </div>
          <p className="mt-5 text-sm leading-6 text-slate-300">
            Formação Técnica & Soluções Industriais. Conhecimento técnico para
            transformar pessoas, empresas e indústrias.
          </p>
        </div>
        <div>
          <h3 className="font-bold">Navegação</h3>
          <div className="mt-4 grid gap-2 text-sm text-slate-300">
            <Link href="/sobre">Sobre a SAMMAC</Link>
            <Link href="/formacoes">Formações</Link>
            <Link href="/servicos">Serviços</Link>
            <Link href="/projetos">Projetos</Link>
            <Link href="/blog">Blog</Link>
          </div>
        </div>
        <div>
          <h3 className="font-bold">Contactos</h3>
          <div className="mt-4 grid gap-3 text-sm text-slate-300">
            <a href={site.phoneHref} className="flex gap-2">
              <Phone size={17} />
              {site.phone}
            </a>
            <a href={`mailto:${site.email}`} className="flex gap-2">
              <Mail size={17} />
              {site.email}
            </a>
            <span className="flex gap-2">
              <MapPin size={17} />
              Angola
            </span>
          </div>
        </div>
        <div>
          <h3 className="font-bold">Redes sociais</h3>
          <div className="mt-4 flex gap-3">
            <a
              aria-label="Facebook SAMMAC"
              href={site.facebook}
              target="_blank"
              rel="noreferrer"
              className="grid h-11 w-11 place-items-center rounded-xl bg-white/10"
            >
              <span aria-hidden="true" className="text-sm font-black">
                f
              </span>
            </a>
            <a
              aria-label="Instagram SAMMAC"
              href={site.instagram}
              target="_blank"
              rel="noreferrer"
              className="grid h-11 w-11 place-items-center rounded-xl bg-white/10"
            >
              <span aria-hidden="true" className="text-xs font-black">
                IG
              </span>
            </a>
            <a
              aria-label="TikTok SAMMAC"
              href={site.tiktok}
              target="_blank"
              rel="noreferrer"
              className="grid h-11 min-w-11 place-items-center rounded-xl bg-white/10 px-3 text-xs font-black"
            >
              <span aria-hidden="true">TT</span>
            </a>
          </div>
          <a
            href={site.whatsapp}
            target="_blank"
            rel="noreferrer"
            className="mt-5 inline-flex rounded-xl bg-[#25D366] px-4 py-3 text-sm font-black text-[#06250f]"
          >
            WhatsApp: {site.phone}
          </a>
        </div>
      </div>
      <div className="border-t border-white/10 px-5 py-5 text-center text-xs text-slate-400">
        <Link href="/privacidade" className="mr-4 underline">
          Privacidade
        </Link>
        © 2026 SAMMAC — Centro Técnico de Treinamento. Todos os direitos
        reservados.
      </div>
    </footer>
  );
}
