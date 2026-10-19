import Image from "next/image";
import Link from "next/link";
export function PageHero({
  eyebrow,
  title,
  text,
  image,
  cta = true,
}: {
  eyebrow: string;
  title: string;
  text: string;
  image: string;
  cta?: boolean;
}) {
  return (
    <section className="relative isolate min-h-[52vh] overflow-hidden bg-[#0b1736] text-white md:min-h-[58vh]">
      <Image
        src={image}
        alt=""
        fill
        priority
        fetchPriority="high"
        className="object-cover object-center opacity-55"
        sizes="100vw"
      />
      <div className="absolute inset-0 bg-[linear-gradient(90deg,rgba(6,16,43,.96)_0%,rgba(6,16,43,.72)_48%,rgba(6,16,43,.32)_100%)]" />
      <div className="relative mx-auto flex min-h-[52vh] max-w-7xl items-end px-5 pb-12 pt-32 md:min-h-[58vh] md:px-8 md:pb-16">
        <div className="max-w-3xl">
          <p className="mb-4 text-xs font-bold uppercase tracking-[.28em] text-red-400">
            {eyebrow}
          </p>
          <h1 className="text-4xl font-black leading-[1.02] tracking-tight sm:text-5xl lg:text-6xl">
            {title}
          </h1>
          <p className="mt-5 max-w-2xl text-base leading-7 text-slate-200 sm:text-lg">
            {text}
          </p>
          {cta && (
            <div className="mt-7 flex flex-wrap gap-3">
              <Link
                href="/agendar"
                className="rounded-xl bg-[#d51f28] px-5 py-3 font-bold text-white transition hover:bg-[#b61921]"
              >
                Falar com a SAMMAC
              </Link>
              <Link
                href="/formacoes"
                className="rounded-xl border border-white/30 bg-white/10 px-5 py-3 font-bold text-white backdrop-blur transition hover:bg-white/15"
              >
                Ver formações
              </Link>
            </div>
          )}
        </div>
      </div>
    </section>
  );
}
