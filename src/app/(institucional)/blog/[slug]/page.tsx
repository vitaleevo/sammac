import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowLeft, CalendarDays } from "lucide-react";
import { getPost } from "@/lib/convex-server";
export default async function Page({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const p = await getPost(slug);
  if (!p) notFound();
  return (
    <article className="pb-20 pt-20">
      <header className="bg-[#07132f] py-20 text-white">
        <div className="container-x max-w-4xl">
          <Link
            href="/blog"
            className="inline-flex items-center gap-2 text-sm font-bold"
          >
            <ArrowLeft size={17} />
            Blog
          </Link>
          <p className="eyebrow mt-8 !text-red-300">
            {p.category || "Conteúdo técnico"}
          </p>
          <h1 className="mt-3 text-4xl font-black tracking-tight sm:text-6xl">
            {p.title}
          </h1>
          <p className="mt-5 text-lg leading-8 text-slate-200">{p.excerpt}</p>
          {p.publishedAt && (
            <p className="mt-5 flex items-center gap-2 text-sm text-slate-400">
              <CalendarDays size={16} />
              {new Date(p.publishedAt).toLocaleDateString("pt-AO")}
            </p>
          )}
        </div>
      </header>
      {p.image && (
        <div className="container-x relative -mt-8 aspect-[16/7] max-w-5xl overflow-hidden rounded-[30px] shadow-xl">
          <Image
            src={p.image}
            alt={p.title}
            fill
            priority
            className="object-cover"
          />
        </div>
      )}
      <div className="container-x mt-12 max-w-4xl">
        <div className="whitespace-pre-wrap text-base leading-8 text-slate-700">
          {p.content}
        </div>
      </div>
    </article>
  );
}
