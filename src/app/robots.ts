import type { MetadataRoute } from "next";
export default function robots(): MetadataRoute.Robots {
  return {
    rules: [
      { userAgent: "*", allow: "/", disallow: ["/backoffice", "/api/admin"] },
    ],
    sitemap: "https://sammac.ao/sitemap.xml",
    host: "https://sammac.ao",
  };
}
