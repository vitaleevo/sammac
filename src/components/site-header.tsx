"use client";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Menu, X, Phone, CalendarDays } from "lucide-react";
import { useState } from "react";
import { navigation, site } from "@/lib/site";
export function SiteHeader() {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);
  if (pathname.startsWith("/backoffice")) return null;
  return (
    <header className="fixed inset-x-0 top-0 z-50 border-b border-white/10 bg-[#07132f]/95 text-white shadow-[0_8px_30px_rgba(0,0,0,.12)] backdrop-blur">
      <div className="mx-auto flex h-20 max-w-7xl items-center justify-between gap-5 px-4 md:px-8">
        <Link href="/" className="shrink-0 rounded-xl bg-white px-3 py-2">
          <Image
            src="/brand/sammac-logo-horizontal.png"
            alt="SAMMAC"
            sizes="184px"
            width={250}
            height={65}
            className="h-10 w-auto"
            priority
          />
        </Link>
        <nav
          aria-label="Navegação principal"
          className="hidden items-center gap-1 lg:flex"
        >
          {navigation.map((n) => (
            <Link
              key={n.href}
              href={n.href}
              aria-current={pathname === n.href ? "page" : undefined}
              className={`rounded-lg px-3 py-2 text-sm font-semibold transition ${pathname === n.href ? "bg-white/12 text-white" : "text-slate-200 hover:bg-white/8 hover:text-white"}`}
            >
              {n.label}
            </Link>
          ))}
        </nav>
        <div className="hidden items-center gap-2 lg:flex">
          <a
            href={site.phoneHref}
            className="grid h-10 w-10 place-items-center rounded-xl border border-white/15 bg-white/5"
            aria-label="Ligar"
          >
            <Phone size={17} />
          </a>
          <Link
            href="/agendar"
            className="flex items-center gap-2 rounded-xl bg-[#d51f28] px-4 py-2.5 text-sm font-bold"
          >
            <CalendarDays size={17} />
            Agendar
          </Link>
        </div>
        <button
          className="grid h-11 w-11 place-items-center rounded-xl bg-white/10 lg:hidden"
          onClick={() => setOpen(!open)}
          aria-label={open ? "Fechar menu" : "Abrir menu"}
          aria-expanded={open}
          aria-controls="mobile-menu"
        >
          {open ? <X /> : <Menu />}
        </button>
      </div>
      {open && (
        <div
          id="mobile-menu"
          className="max-h-[calc(100dvh-10rem)] overflow-y-auto border-t border-white/10 bg-[#07132f] px-4 pb-5 pt-3 lg:hidden"
        >
          <nav aria-label="Menu móvel" className="grid gap-1">
            {navigation.map((n) => (
              <Link
                key={n.href}
                href={n.href}
                onClick={() => setOpen(false)}
                aria-current={pathname === n.href ? "page" : undefined}
                className={`rounded-xl px-4 py-3 text-base font-semibold ${pathname === n.href ? "bg-[#d51f28]" : "bg-white/5"}`}
              >
                {n.label}
              </Link>
            ))}
            <Link
              href="/agendar"
              onClick={() => setOpen(false)}
              className="mt-2 rounded-xl bg-white px-4 py-3 text-center font-bold text-[#07132f]"
            >
              Agendar reunião
            </Link>
          </nav>
        </div>
      )}
    </header>
  );
}
