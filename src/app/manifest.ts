import type { MetadataRoute } from "next";

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: "SAMMAC - Centro Técnico de Treinamento",
    short_name: "SAMMAC",
    description:
      "Formação técnica e soluções industriais em automação, electricidade e soldadura.",
    start_url: "/",
    display: "standalone",
    background_color: "#ffffff",
    theme_color: "#1f3266",
    icons: [
      {
        src: "/brand/sammac-mark.png",
        sizes: "923x900",
        type: "image/png",
      },
    ],
  };
}
