"use client";
import { useState } from "react";
import Link from "next/link";
import {
  CalendarDays,
  ChevronLeft,
  ChevronRight,
  Clock3,
  GraduationCap,
  MapPin,
} from "lucide-react";

export type SchoolCourse = {
  title: string;
  category: string;
  summary: string;
  duration: string;
  modality: string;
  status?: string;
  startDate?: number;
  endDate?: number;
};
const dateLabel = (value: number) =>
  new Intl.DateTimeFormat("pt-AO", {
    day: "numeric",
    month: "long",
    year: "numeric",
    timeZone: "Africa/Luanda",
  }).format(value);
export function CourseCalendar({
  courses,
  initialMonth,
}: {
  courses: SchoolCourse[];
  initialMonth: string;
}) {
  const [month, setMonth] = useState(initialMonth);
  const [category, setCategory] = useState("Todas");
  const [year, monthNumber] = month.split("-").map(Number);
  const first = new Date(Date.UTC(year, monthNumber - 1, 1));
  const offset = (first.getUTCDay() + 6) % 7;
  const days = new Date(Date.UTC(year, monthNumber, 0)).getUTCDate();
  const categories = ["Todas", ...new Set(courses.map((c) => c.category))];
  const filtered = courses.filter(
    (c) => category === "Todas" || c.category === category,
  );
  const dated = filtered.filter(
    (c) => c.startDate && new Date(c.startDate).toISOString().startsWith(month),
  );
  function move(delta: number) {
    const date = new Date(Date.UTC(year, monthNumber - 1 + delta, 1));
    setMonth(date.toISOString().slice(0, 7));
  }
  return (
    <div className="mt-8">
      <div
        className="mb-8 flex flex-wrap gap-2"
        role="group"
        aria-label="Filtrar formações"
      >
        {categories.map((value) => (
          <button
            key={value}
            onClick={() => setCategory(value)}
            aria-pressed={value === category}
            className={`min-h-11 rounded-full border px-5 py-2 text-sm font-bold transition ${value === category ? "border-[#07132f] bg-[#07132f] text-white" : "border-slate-200 bg-white text-slate-700 hover:border-slate-400"}`}
          >
            {value}
          </button>
        ))}
      </div>
      <div className="grid items-start gap-8 xl:grid-cols-[360px_1fr]">
        <aside className="rounded-3xl border border-slate-200 bg-white p-5 sm:p-6 xl:sticky xl:top-28">
          <div className="flex items-center justify-between gap-2">
            <button
              onClick={() => move(-1)}
              aria-label="Mês anterior"
              className="grid h-11 w-11 shrink-0 place-items-center rounded-xl bg-slate-100"
            >
              <ChevronLeft size={18} />
            </button>
            <h3 aria-live="polite" className="text-center font-bold capitalize">
              {new Intl.DateTimeFormat("pt-AO", {
                month: "long",
                year: "numeric",
                timeZone: "UTC",
              }).format(first)}
            </h3>
            <button
              onClick={() => move(1)}
              aria-label="Mês seguinte"
              className="grid h-11 w-11 shrink-0 place-items-center rounded-xl bg-slate-100"
            >
              <ChevronRight size={18} />
            </button>
          </div>
          <div className="mt-5 grid grid-cols-7 text-center text-xs text-slate-500">
            {["S", "T", "Q", "Q", "S", "S", "D"].map((day, i) => (
              <span key={i} className="py-2">
                {day}
              </span>
            ))}
          </div>
          <div className="grid grid-cols-7 gap-1">
            {Array.from({ length: offset }, (_, i) => (
              <span key={"empty" + i} />
            ))}
            {Array.from({ length: days }, (_, i) => {
              const day = i + 1;
              const events = dated.filter(
                (c) => new Date(c.startDate!).getUTCDate() === day,
              );
              return (
                <span
                  key={day}
                  title={events.map((c) => c.title).join(", ")}
                  className={`grid aspect-square place-items-center rounded-lg text-sm ${events.length ? "bg-[#d51f28] font-bold text-white" : "text-slate-600"}`}
                >
                  {day}
                </span>
              );
            })}
          </div>
          <p className="mt-5 flex items-center gap-2 border-t border-slate-100 pt-4 text-xs text-slate-600">
            <span className="h-2 w-2 rounded-full bg-[#d51f28]" />
            Início de uma turma
          </p>
          <div className="mt-4 space-y-3" aria-live="polite">
            {dated.length ? (
              dated.map((c) => (
                <div key={c.title} className="rounded-xl bg-red-50 p-3 text-sm">
                  <strong>{c.title}</strong>
                  <p className="mt-1 text-xs text-slate-600">
                    {dateLabel(c.startDate!)}
                  </p>
                </div>
              ))
            ) : (
              <p className="text-sm leading-6 text-slate-600">
                Ainda não há datas publicadas para este mês. Manifeste interesse
                numa formação para receber informações sobre a próxima turma.
              </p>
            )}
          </div>
        </aside>
        <div className="grid gap-5 md:grid-cols-2">
          {filtered.map((c) => (
            <article
              key={c.title}
              className="flex flex-col rounded-3xl border border-slate-200 bg-white p-6 shadow-sm"
            >
              <div className="flex items-start justify-between gap-3">
                <GraduationCap size={32} className="text-[#d51f28]" />
                <span className="rounded-full bg-slate-100 px-3 py-2 text-xs font-bold text-slate-700">
                  {c.status || "Consultar"}
                </span>
              </div>
              <p className="mt-6 text-xs font-bold uppercase tracking-wider text-[#d51f28]">
                {c.category}
              </p>
              <h3 className="mt-2 text-2xl font-bold tracking-tight text-[#07132f]">
                {c.title}
              </h3>
              <p className="mt-3 flex-1 text-sm leading-6 text-slate-600">
                {c.summary}
              </p>
              <div className="mt-5 grid gap-3 border-t border-slate-100 pt-5 text-sm text-slate-600">
                <span className="flex items-center gap-2">
                  <CalendarDays size={16} />
                  {c.startDate ? dateLabel(c.startDate) : "Data a confirmar"}
                </span>
                {c.endDate && (
                  <span className="text-xs">Até {dateLabel(c.endDate)}</span>
                )}
                <span className="flex items-center gap-2">
                  <Clock3 size={16} />
                  {c.duration}
                </span>
                <span className="flex items-center gap-2">
                  <MapPin size={16} />
                  {c.modality}
                </span>
              </div>
              <Link
                href={`/agendar?tipo=formacao&curso=${encodeURIComponent(c.title)}`}
                className="mt-6 rounded-xl bg-[#d51f28] px-4 py-3 text-center font-bold text-white hover:bg-[#b61921]"
              >
                {c.status === "Encerrado"
                  ? "Consultar próxima turma"
                  : "Tenho interesse"}
              </Link>
            </article>
          ))}
          {!filtered.length && (
            <p role="status" className="p-8 text-slate-600">
              Não há formações nesta categoria.
            </p>
          )}
        </div>
      </div>
    </div>
  );
}
