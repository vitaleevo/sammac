"use client";
import { useState, type FormEvent } from "react";
import { useRouter } from "next/navigation";
import Image from "next/image";
import { LockKeyhole } from "lucide-react";
export function AdminLogin() {
  const router = useRouter();
  const [error, setError] = useState("");
  const [busy, setBusy] = useState(false);
  async function submit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setBusy(true);
    setError("");
    const f = new FormData(e.currentTarget);
    try {
      const res = await fetch("/api/admin/login", {
        method: "POST",
        headers: { "content-type": "application/json" },
        body: JSON.stringify({
          email: f.get("email"),
          password: f.get("password"),
        }),
      });
      if (res.ok) {
        router.push("/backoffice");
        router.refresh();
      } else {
        const result = await res.json();
        setError(result.error || "Não foi possível iniciar sessão.");
      }
    } catch {
      setError(
        "Não foi possível ligar. Verifique a ligação e tente novamente.",
      );
    } finally {
      setBusy(false);
    }
  }
  return (
    <div className="fixed inset-0 z-[90] grid min-h-dvh overflow-y-auto bg-[#07132f] p-5">
      <form
        onSubmit={submit}
        className="m-auto w-full max-w-md rounded-[28px] bg-white p-7 shadow-2xl"
      >
        <div className="mb-7 flex justify-center">
          <Image
            src="/brand/sammac-logo-horizontal.png"
            alt="SAMMAC"
            width={280}
            height={80}
            className="h-14 w-auto"
          />
        </div>
        <div className="mb-6 text-center">
          <div className="mx-auto grid h-12 w-12 place-items-center rounded-2xl bg-red-50 text-[#d51f28]">
            <LockKeyhole />
          </div>
          <h1 className="mt-3 text-2xl font-black">Backoffice SAMMAC</h1>
          <p className="mt-1 text-sm text-slate-500">
            Acesso administrativo protegido.
          </p>
        </div>
        <label className="grid gap-2 text-sm font-bold">
          E-mail
          <input
            name="email"
            type="email"
            autoComplete="username"
            required
            className="rounded-xl border border-slate-300 px-4 py-3 font-normal outline-none focus:border-[#d51f28]"
          />
        </label>
        <label className="mt-4 grid gap-2 text-sm font-bold">
          Palavra-passe
          <input
            name="password"
            type="password"
            autoComplete="current-password"
            required
            className="rounded-xl border border-slate-300 px-4 py-3 font-normal outline-none focus:border-[#d51f28]"
          />
        </label>
        {error && (
          <p className="mt-4 text-sm font-semibold text-red-600">{error}</p>
        )}
        <button
          disabled={busy}
          className="mt-6 w-full rounded-xl bg-[#d51f28] px-5 py-3.5 font-black text-white disabled:opacity-50"
        >
          {busy ? "A validar..." : "Entrar"}
        </button>
      </form>
    </div>
  );
}
