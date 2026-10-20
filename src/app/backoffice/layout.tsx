export default function BackofficeLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <main id="conteudo" className="min-h-dvh">
      {children}
    </main>
  );
}
