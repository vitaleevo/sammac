import type { MetadataRoute } from "next";
export default function sitemap(): MetadataRoute.Sitemap {
  const base = "https://sammac.ao";
  const paths = [
    "",
    "/sobre",
    "/formacoes",
    "/servicos",
    "/projetos",
    "/blog",
    "/contactos",
    "/agendar",
    "/privacidade",
  ];
  return paths.map((path, i) => ({
    url: `${base}${path}`,
    lastModified: new Date("2026-10-19"),
    changeFrequency: (path === "/blog" || path === "/projetos"
      ? "weekly"
      : "monthly") as "weekly" | "monthly",
    priority:
      i === 0 ? 1 : path === "/formacoes" || path === "/servicos" ? 0.9 : 0.7,
  }));
}
