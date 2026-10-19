"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  Home,
  GraduationCap,
  Wrench,
  BriefcaseBusiness,
  MessageCircle,
} from "lucide-react";
const items = [
  [/^\/$/, "/", "Início", Home],
  [/^\/formacoes/, "/formacoes", "Cursos", GraduationCap],
  [/^\/servicos/, "/servicos", "Serviços", Wrench],
  [/^\/projetos/, "/projetos", "Projetos", BriefcaseBusiness],
  [/^\/(contactos|agendar)/, "/contactos", "Contacto", MessageCircle],
] as const;
export function MobileDock() {
  const path = usePathname();
  if (path.startsWith("/backoffice")) return null;
  return (
    <nav
      aria-label="Navegação móvel"
      className="mobile-dock fixed inset-x-3 bottom-3 z-50 grid grid-cols-5 rounded-[22px] border border-white/10 bg-[#07132f]/96 p-1.5 text-white shadow-2xl backdrop-blur lg:hidden"
    >
      {items.map(([rx, href, label, Icon]) => {
        const active = rx.test(path);
        return (
          <Link
            key={href}
            href={href}
            aria-current={active ? "page" : undefined}
            className={`flex min-h-14 flex-col items-center justify-center gap-1 rounded-2xl text-[10px] font-bold ${active ? "bg-[#d51f28]" : "text-slate-300"}`}
          >
            <Icon size={19} />
            <span>{label}</span>
          </Link>
        );
      })}
    </nav>
  );
}
