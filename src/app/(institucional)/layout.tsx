import { SiteHeader } from "@/components/site-header";
import { SiteFooter } from "@/components/site-footer";
import { MobileDock } from "@/components/mobile-dock";

export default function InstitutionalLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      <SiteHeader />
      <main id="conteudo" className="min-h-dvh">
        {children}
      </main>
      <SiteFooter />
      <MobileDock />
    </>
  );
}
