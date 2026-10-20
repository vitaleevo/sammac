import type { Metadata } from "next";
import { PageHero } from "@/components/page-hero";
import { CourseCalendar } from "@/components/course-calendar";
import { getCourses } from "@/lib/convex-server";
import { defaultCourses } from "@/lib/site";
export const revalidate = 60;
export const metadata: Metadata = {
  title: "Formações e Calendário",
  description:
    "Consulte as formações técnicas e o calendário de cursos da SAMMAC.",
};
export default async function Page() {
  const remote = await getCourses();
  const courses = remote.length ? remote : defaultCourses;
  const month = new Intl.DateTimeFormat("en-CA", {
    year: "numeric",
    month: "2-digit",
    timeZone: "Africa/Luanda",
  }).format(new Date());
  return (
    <>
      <PageHero
        eyebrow="SAMMAC Escola Técnica"
        title="O seu próximo passo começa na prática."
        text="Automação, electricidade e soldadura. Explore as formações e acompanhe as próximas turmas da nossa escola técnica."
        image="/images/technician-black.jpg"
      />
      <section className="section-pad bg-[#f5f7fb]">
        <div className="container-x">
          <p className="eyebrow">Calendário da escola</p>
          <h2 className="section-title mt-3">Encontre a sua formação.</h2>
          <p className="mt-4 max-w-2xl leading-7 text-slate-600">
            Escolha uma área e consulte as datas. A equipa confirma a
            disponibilidade e os detalhes da inscrição após receber o seu
            pedido.
          </p>
          <CourseCalendar courses={courses} initialMonth={month} />
        </div>
      </section>
    </>
  );
}
