import { ImageResponse } from "next/og";
import { readFile } from "node:fs/promises";
import { join } from "node:path";

export const alt = "SAMMAC — Todos os nossos contactos num só lugar";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default async function SocialCardImage() {
  const logo = await readFile(
    join(process.cwd(), "public/brand/sammac-logo-horizontal.png"),
  );
  return new ImageResponse(
    <div
      style={{
        width: "100%",
        height: "100%",
        display: "flex",
        flexDirection: "column",
        padding: 64,
        background: "#07132f",
        color: "white",
        borderBottom: "16px solid #d51f28",
      }}
    >
      <div
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          padding: 24,
          background: "white",
          borderRadius: 20,
          width: 380,
        }}
      >
        {/* eslint-disable-next-line @next/next/no-img-element -- ImageResponse requires a native image. */}
        <img
          src={`data:image/png;base64,${logo.toString("base64")}`}
          width={330}
          height={86}
          alt="SAMMAC"
        />
      </div>
      <div
        style={{
          display: "flex",
          marginTop: 48,
          fontSize: 64,
          fontWeight: 700,
          letterSpacing: "-2px",
        }}
      >
        Vamos conectar-nos.
      </div>
      <div
        style={{
          display: "flex",
          marginTop: 16,
          fontSize: 30,
          color: "#c3cfe6",
        }}
      >
        Todos os nossos contactos num só lugar.
      </div>
      <div
        style={{
          display: "flex",
          marginTop: "auto",
          fontSize: 28,
          color: "#fff",
        }}
      >
        links.sammac.ao
      </div>
    </div>,
    size,
  );
}
