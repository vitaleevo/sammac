import Image from "next/image";
import {
  ArrowRight,
  Bot,
  Building2,
  CheckCircle2,
  CircuitBoard,
  Factory,
  Flame,
  Gauge,
  GraduationCap,
  HardHat,
  Lightbulb,
  ShieldCheck,
  Sparkles,
  Target,
  Users,
  Wrench,
  Zap,
} from "lucide-react";

const trainings = [
  {
    icon: Bot,
    title: "Automação Industrial",
    description:
      "Formação orientada para os fundamentos, operação e aplicação prática de sistemas de automação no ambiente industrial.",
    topics: ["Comandos e controlo", "Sensores e atuadores", "Lógica de automação"],
  },
  {
    icon: Zap,
    title: "Electricidade Residencial",
    description:
      "Capacitação prática para instalações eléctricas residenciais com foco em execução correcta, diagnóstico e segurança.",
    topics: ["Instalações eléctricas", "Quadros e protecções", "Diagnóstico básico"],
  },
  {
    icon: CircuitBoard,
    title: "Electricidade Industrial",
    description:
      "Competências técnicas aplicadas a instalações, circuitos, equipamentos e ambientes eléctricos industriais.",
    topics: ["Circuitos industriais", "Motores e comandos", "Segurança eléctrica"],
  },
  {
    icon: Flame,
    title: "Soldadura Industrial",
    description:
      "Treinamento técnico com ênfase em preparação, execução, boas práticas e segurança nos processos de soldadura.",
    topics: ["Preparação de materiais", "Técnicas de soldadura", "Segurança operacional"],
  },
];

const services = [
  {
    icon: Factory,
    title: "Soluções de Automação",
    text: "Apoio técnico e execução de soluções de automação industrial de acordo com as necessidades operacionais de cada contexto.",
  },
  {
    icon: Wrench,
    title: "Serviços Eléctricos",
    text: "Serviços técnicos nas áreas de electricidade residencial e industrial, com abordagem organizada e foco na segurança.",
  },
  {
    icon: HardHat,
    title: "Serviços de Soldadura",
    text: "Execução de trabalhos de soldadura industrial e serviços técnicos relacionados, conforme o escopo de cada projecto.",
  },
];

const values = [
  [ShieldCheck, "Segurança", "Trabalhamos com disciplina e respeito pelas boas práticas técnicas."],
  [Target, "Competência", "Transformamos conhecimento em capacidade prática de execução."],
  [Sparkles, "Inovação", "Acompanhamos a evolução das tecnologias e processos industriais."],
  [CheckCircle2, "Qualidade", "Procuramos consistência e elevado padrão técnico em cada entrega."],
  [Users, "Desenvolvimento Humano", "A formação é uma ferramenta para criar oportunidades e elevar competências."],
  [Lightbulb, "Ética e Responsabilidade", "Construímos relações baseadas em respeito, transparência e compromisso."],
] as const;

export default function Home() {
  return (
    <main className="overflow-hidden bg-white text-slate-950">
      <a
        href="#conteudo"
        className="sr-only fixed left-4 top-4 z-[100] rounded-md bg-white px-4 py-2 text-sm font-semibold text-slate-950 focus:not-sr-only"
      >
        Ir para o conteúdo
      </a>

      <div className="bg-[#1f3266] px-4 py-2.5 text-center text-xs font-semibold uppercase tracking-[0.18em] text-white sm:text-sm">
        SAMMAC · Formação Técnica &amp; Soluções Industriais
      </div>

      <header className="sticky top-0 z-50 border-b border-slate-200/80 bg-white/95 backdrop-blur">
        <div className="mx-auto flex min-h-20 max-w-7xl items-center justify-between gap-6 px-5 sm:px-8 lg:px-10">
          <a href="#inicio" aria-label="SAMMAC - Página inicial" className="shrink-0">
            <Image
              src="/brand/sammac-logo-horizontal.png"
              alt="SAMMAC Centro Técnico de Treinamento"
              width={948}
              height={238}
              priority
              className="h-auto w-[180px] sm:w-[230px]"
            />
          </a>
          <nav aria-label="Navegação principal" className="hidden items-center gap-7 text-sm font-semibold text-slate-700 lg:flex">
            <a className="transition hover:text-[#ef3135]" href="#formacoes">Formações</a>
            <a className="transition hover:text-[#ef3135]" href="#servicos">Serviços</a>
            <a className="transition hover:text-[#ef3135]" href="#institucional">Sobre a SAMMAC</a>
            <a className="transition hover:text-[#ef3135]" href="#valores">Valores</a>
          </nav>
          <a
            href="#formacoes"
            className="inline-flex min-h-11 items-center justify-center rounded-full bg-[#ef3135] px-5 text-sm font-bold text-white transition hover:bg-[#d9282d] focus:outline-none focus:ring-2 focus:ring-[#ef3135] focus:ring-offset-2"
          >
            Ver formações
          </a>
        </div>
      </header>

      <div id="conteudo">
        <section id="inicio" className="relative isolate bg-[#f7f8fb]">
          <div className="absolute inset-y-0 right-0 -z-10 hidden w-[42%] bg-[#1f3266] lg:block" />
          <div className="absolute left-[58%] top-0 -z-10 hidden h-full w-24 -skew-x-6 bg-[#ef3135] lg:block" />
          <div className="mx-auto grid min-h-[680px] max-w-7xl items-center gap-12 px-5 py-16 sm:px-8 lg:grid-cols-[1.08fr_.92fr] lg:px-10 lg:py-24">
            <div className="max-w-3xl">
              <div className="mb-6 inline-flex items-center gap-2 rounded-full border border-[#1f3266]/15 bg-white px-4 py-2 text-xs font-bold uppercase tracking-[0.16em] text-[#1f3266] shadow-sm">
                <Gauge className="h-4 w-4 text-[#ef3135]" aria-hidden="true" />
                Aprenda. Pratique. Profissionalize-se.
              </div>
              <h1 className="text-balance text-5xl font-black leading-[1.02] tracking-[-0.04em] text-[#1f3266] sm:text-6xl lg:text-7xl">
                Formação técnica para transformar conhecimento em
                <span className="text-[#ef3135]"> competência.</span>
              </h1>
              <p className="mt-7 max-w-2xl text-lg leading-8 text-slate-600 sm:text-xl">
                Capacitação prática e soluções técnicas nas áreas de automação industrial, electricidade residencial e industrial, soldadura industrial e áreas afins.
              </p>
              <div className="mt-9 flex flex-col gap-3 sm:flex-row">
                <a
                  href="#formacoes"
                  className="inline-flex min-h-12 items-center justify-center gap-2 rounded-full bg-[#ef3135] px-6 font-bold text-white transition hover:bg-[#d9282d] focus:outline-none focus:ring-2 focus:ring-[#ef3135] focus:ring-offset-2"
                >
                  Conhecer as formações <ArrowRight className="h-4 w-4" aria-hidden="true" />
                </a>
                <a
                  href="#servicos"
                  className="inline-flex min-h-12 items-center justify-center rounded-full border-2 border-[#1f3266] px-6 font-bold text-[#1f3266] transition hover:bg-[#1f3266] hover:text-white focus:outline-none focus:ring-2 focus:ring-[#1f3266] focus:ring-offset-2"
                >
                  Soluções para empresas
                </a>
              </div>
              <div className="mt-10 grid max-w-2xl grid-cols-3 gap-4 border-t border-slate-200 pt-7">
                <div><strong className="block text-2xl font-black text-[#1f3266]">4+</strong><span className="text-sm text-slate-600">áreas técnicas</span></div>
                <div><strong className="block text-2xl font-black text-[#1f3266]">Prática</strong><span className="text-sm text-slate-600">foco aplicado</span></div>
                <div><strong className="block text-2xl font-black text-[#1f3266]">2 frentes</strong><span className="text-sm text-slate-600">formação + serviços</span></div>
              </div>
            </div>

            <div className="relative mx-auto w-full max-w-xl lg:mx-0">
              <div className="rounded-[2rem] border border-white/15 bg-[#182750] p-6 text-white shadow-2xl sm:p-8">
                <div className="mb-7 flex items-center justify-between gap-4">
                  <div>
                    <p className="text-xs font-bold uppercase tracking-[0.2em] text-red-300">Centro Técnico</p>
                    <p className="mt-1 text-2xl font-black">Treinamento + Soluções</p>
                  </div>
                  <div className="rounded-2xl bg-white p-3">
                    <Image src="/brand/sammac-mark.png" alt="Símbolo SAMMAC" width={923} height={900} className="h-16 w-16 object-contain" />
                  </div>
                </div>
                <div className="grid gap-3 sm:grid-cols-2">
                  {[ [Bot, "Automação", "Industrial"], [Zap, "Electricidade", "Residencial e industrial"], [Flame, "Soldadura", "Industrial"], [GraduationCap, "Treinamento", "Capacitação prática"] ].map(([Icon, title, label]) => {
                    const ItemIcon = Icon as typeof Bot;
                    return (
                      <div key={String(title)} className="rounded-2xl border border-white/10 bg-white/[0.07] p-5">
                        <ItemIcon className="h-7 w-7 text-[#ef3135]" aria-hidden="true" />
                        <p className="mt-4 font-extrabold">{String(title)}</p>
                        <p className="mt-1 text-sm text-slate-300">{String(label)}</p>
                      </div>
                    );
                  })}
                </div>
                <div className="mt-6 rounded-2xl bg-[#ef3135] px-5 py-4">
                  <p className="text-sm font-bold">Conhecimento técnico para pessoas, profissionais e empresas.</p>
                </div>
              </div>
            </div>
          </div>
        </section>

        <section className="border-y border-slate-200 bg-white">
          <div className="mx-auto grid max-w-7xl gap-6 px-5 py-8 sm:grid-cols-3 sm:px-8 lg:px-10">
            <div className="flex items-center gap-3"><GraduationCap className="h-6 w-6 text-[#ef3135]" /><span className="font-bold text-[#1f3266]">Formação orientada à prática</span></div>
            <div className="flex items-center gap-3"><ShieldCheck className="h-6 w-6 text-[#ef3135]" /><span className="font-bold text-[#1f3266]">Segurança como princípio</span></div>
            <div className="flex items-center gap-3"><Building2 className="h-6 w-6 text-[#ef3135]" /><span className="font-bold text-[#1f3266]">Soluções para pessoas e empresas</span></div>
          </div>
        </section>

        <section id="formacoes" className="mx-auto max-w-7xl px-5 py-20 sm:px-8 lg:px-10 lg:py-28">
          <div className="max-w-3xl">
            <p className="text-sm font-black uppercase tracking-[0.2em] text-[#ef3135]">Formações técnicas</p>
            <h2 className="mt-3 text-4xl font-black tracking-[-0.03em] text-[#1f3266] sm:text-5xl">Competências para ambientes reais de trabalho.</h2>
            <p className="mt-5 text-lg leading-8 text-slate-600">Programas concebidos para desenvolver fundamentos sólidos, prática técnica, segurança e capacidade de execução.</p>
          </div>
          <div className="mt-12 grid gap-5 md:grid-cols-2">
            {trainings.map(({ icon: Icon, title, description, topics }, index) => (
              <article key={title} className="group rounded-3xl border border-slate-200 bg-white p-7 shadow-sm transition hover:-translate-y-1 hover:border-[#ef3135]/30 hover:shadow-xl sm:p-8">
                <div className="flex items-start justify-between gap-5">
                  <div className="rounded-2xl bg-[#1f3266] p-3 text-white"><Icon className="h-7 w-7" aria-hidden="true" /></div>
                  <span className="text-5xl font-black text-slate-100">0{index + 1}</span>
                </div>
                <h3 className="mt-7 text-2xl font-black text-[#1f3266]">{title}</h3>
                <p className="mt-3 leading-7 text-slate-600">{description}</p>
                <ul className="mt-6 grid gap-2 text-sm font-semibold text-slate-700 sm:grid-cols-3">
                  {topics.map((topic) => <li key={topic} className="flex items-center gap-2"><CheckCircle2 className="h-4 w-4 shrink-0 text-[#ef3135]" />{topic}</li>)}
                </ul>
              </article>
            ))}
          </div>
        </section>

        <section id="servicos" className="bg-[#1f3266] text-white">
          <div className="mx-auto max-w-7xl px-5 py-20 sm:px-8 lg:px-10 lg:py-28">
            <div className="grid gap-10 lg:grid-cols-[.85fr_1.15fr] lg:items-end">
              <div>
                <p className="text-sm font-black uppercase tracking-[0.2em] text-red-300">Soluções industriais</p>
                <h2 className="mt-3 text-4xl font-black tracking-[-0.03em] sm:text-5xl">Da formação à execução técnica.</h2>
              </div>
              <p className="max-w-2xl text-lg leading-8 text-slate-300 lg:justify-self-end">A SAMMAC também presta serviços técnicos em áreas relacionadas com automação, electricidade e soldadura, adaptando o trabalho às necessidades de cada projecto.</p>
            </div>
            <div className="mt-12 grid gap-5 md:grid-cols-3">
              {services.map(({ icon: Icon, title, text }) => (
                <article key={title} className="rounded-3xl border border-white/10 bg-white/[0.06] p-7">
                  <div className="inline-flex rounded-2xl bg-[#ef3135] p-3"><Icon className="h-7 w-7" aria-hidden="true" /></div>
                  <h3 className="mt-6 text-xl font-black">{title}</h3>
                  <p className="mt-3 leading-7 text-slate-300">{text}</p>
                </article>
              ))}
            </div>
          </div>
        </section>

        <section id="institucional" className="bg-[#f7f8fb]">
          <div className="mx-auto max-w-7xl px-5 py-20 sm:px-8 lg:px-10 lg:py-28">
            <div className="grid gap-8 lg:grid-cols-3">
              <article className="rounded-3xl bg-white p-8 shadow-sm lg:col-span-2">
                <p className="text-sm font-black uppercase tracking-[0.2em] text-[#ef3135]">Missão</p>
                <h2 className="mt-4 text-3xl font-black leading-tight text-[#1f3266] sm:text-4xl">Capacitar pessoas e empresas com conhecimento técnico e soluções práticas.</h2>
                <p className="mt-5 max-w-3xl text-lg leading-8 text-slate-600">Actuamos nas áreas de automação industrial, electricidade residencial e industrial, soldadura industrial e áreas afins, contribuindo para a formação de profissionais competentes, seguros e preparados para as exigências do mercado de trabalho.</p>
              </article>
              <article className="rounded-3xl bg-[#ef3135] p-8 text-white shadow-sm">
                <p className="text-sm font-black uppercase tracking-[0.2em] text-red-100">Visão</p>
                <h2 className="mt-4 text-3xl font-black leading-tight">Ser uma referência em formação técnica e serviços industriais.</h2>
                <p className="mt-5 leading-7 text-red-50">Reconhecida pela qualidade do ensino, competência técnica, inovação e contribuição para o desenvolvimento de profissionais e empresas.</p>
              </article>
            </div>
          </div>
        </section>

        <section id="valores" className="mx-auto max-w-7xl px-5 py-20 sm:px-8 lg:px-10 lg:py-28">
          <div className="max-w-3xl">
            <p className="text-sm font-black uppercase tracking-[0.2em] text-[#ef3135]">Os nossos valores</p>
            <h2 className="mt-3 text-4xl font-black tracking-[-0.03em] text-[#1f3266] sm:text-5xl">A base de cada formação e de cada projecto.</h2>
          </div>
          <div className="mt-12 grid gap-x-10 gap-y-8 md:grid-cols-2 lg:grid-cols-3">
            {values.map(([Icon, title, text]) => (
              <div key={title} className="flex gap-4 border-t border-slate-200 pt-6">
                <Icon className="mt-1 h-6 w-6 shrink-0 text-[#ef3135]" aria-hidden="true" />
                <div><h3 className="font-black text-[#1f3266]">{title}</h3><p className="mt-2 text-sm leading-6 text-slate-600">{text}</p></div>
              </div>
            ))}
          </div>
        </section>

        <section className="mx-auto max-w-7xl px-5 pb-20 sm:px-8 lg:px-10 lg:pb-28">
          <div className="relative overflow-hidden rounded-[2rem] bg-[#eef1f7] px-6 py-12 sm:px-10 lg:px-14">
            <div className="absolute -right-16 -top-20 h-72 w-72 rounded-full border-[38px] border-[#ef3135]/10" />
            <div className="relative grid gap-10 lg:grid-cols-[1.1fr_.9fr] lg:items-center">
              <div>
                <p className="text-sm font-black uppercase tracking-[0.2em] text-[#ef3135]">Para quem é a SAMMAC?</p>
                <h2 className="mt-3 text-4xl font-black tracking-[-0.03em] text-[#1f3266]">Formação acessível ao público em geral, com visão profissional.</h2>
              </div>
              <div className="grid gap-3 sm:grid-cols-2">
                {["Quem procura uma profissão técnica", "Profissionais que querem actualizar competências", "Empresas que procuram capacitação", "Equipas com necessidades técnicas específicas"].map((item) => (
                  <div key={item} className="flex items-start gap-3 rounded-2xl bg-white p-4 font-semibold text-slate-700 shadow-sm"><CheckCircle2 className="mt-0.5 h-5 w-5 shrink-0 text-[#ef3135]" />{item}</div>
                ))}
              </div>
            </div>
          </div>
        </section>

        <section className="bg-[#ef3135]">
          <div className="mx-auto flex max-w-7xl flex-col gap-7 px-5 py-16 text-white sm:px-8 lg:flex-row lg:items-center lg:justify-between lg:px-10">
            <div className="max-w-3xl">
              <p className="text-sm font-black uppercase tracking-[0.2em] text-red-100">SAMMAC</p>
              <h2 className="mt-2 text-3xl font-black sm:text-4xl">Conhecimento técnico para transformar pessoas, empresas e indústrias.</h2>
            </div>
            <a href="#formacoes" className="inline-flex min-h-12 shrink-0 items-center justify-center gap-2 rounded-full bg-white px-6 font-black text-[#1f3266] transition hover:bg-slate-100">Explorar formações <ArrowRight className="h-4 w-4" /></a>
          </div>
        </section>
      </div>

      <footer className="bg-[#101a36] text-white">
        <div className="mx-auto grid max-w-7xl gap-10 px-5 py-12 sm:px-8 md:grid-cols-2 lg:px-10">
          <div>
            <Image src="/brand/sammac-logo-horizontal.png" alt="SAMMAC" width={948} height={238} className="h-auto w-[220px] rounded-sm bg-white p-2" />
            <p className="mt-5 max-w-md text-sm leading-6 text-slate-300">Centro Técnico de Treinamento dedicado à formação prática e a soluções nas áreas de automação industrial, electricidade, soldadura e áreas afins.</p>
          </div>
          <div className="grid grid-cols-2 gap-6 md:justify-self-end">
            <div><p className="text-sm font-black uppercase tracking-wider text-red-300">Navegação</p><div className="mt-4 grid gap-2 text-sm text-slate-300"><a href="#formacoes">Formações</a><a href="#servicos">Serviços</a><a href="#institucional">Sobre nós</a></div></div>
            <div><p className="text-sm font-black uppercase tracking-wider text-red-300">Áreas</p><div className="mt-4 grid gap-2 text-sm text-slate-300"><span>Automação</span><span>Electricidade</span><span>Soldadura</span></div></div>
          </div>
        </div>
        <div className="border-t border-white/10 px-5 py-5 text-center text-xs text-slate-400">© SAMMAC — Centro Técnico de Treinamento. Todos os direitos reservados.</div>
      </footer>
    </main>
  );
}
