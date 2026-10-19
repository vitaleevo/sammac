"use client";
import { useEffect, useRef, useState, type FormEvent } from "react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import {
  BookOpen,
  BriefcaseBusiness,
  CalendarDays,
  Inbox,
  LayoutDashboard,
  LogOut,
  Plus,
  RefreshCw,
  Trash2,
  X,
} from "lucide-react";
import type { LucideIcon } from "lucide-react";
type Tab = "dashboard" | "posts" | "projects" | "courses" | "inquiries";
type AnyItem = {
  _id?: string;
  title?: string;
  category?: string;
  status?: string;
  imageStorageId?: string;
  imageUrl?: string;
  image?: string | null;
  slug?: string;
  content?: string;
  excerpt?: string;
  summary?: string;
  description?: string;
  duration?: string;
  modality?: string;
  startDate?: number;
  endDate?: number;
  featured?: boolean;
  name?: string;
  type?: string;
  phone?: string;
  email?: string;
  message?: string;
  interest?: string;
  preferredDate?: string;
};
type DashboardData = {
  posts: AnyItem[];
  projects: AnyItem[];
  courses: AnyItem[];
  inquiries: AnyItem[];
};
export function AdminDashboard({
  initialData,
}: {
  initialData: DashboardData;
}) {
  const router = useRouter();
  const [tab, setTab] = useState<Tab>("dashboard");
  const [data, setData] = useState<DashboardData>(initialData);
  const [loading, setLoading] = useState(false);
  const [editor, setEditor] = useState<{
    entity: "post" | "project" | "course";
    item: AnyItem;
  } | null>(null);
  const [error, setError] = useState("");
  async function load() {
    try {
      const r = await fetch("/api/admin/content", { cache: "no-store" });
      setError("");
      if (r.status === 401) {
        router.push("/backoffice/login");
        return;
      }
      if (!r.ok) throw new Error("Não foi possível carregar os dados.");
      setData(await r.json());
    } catch {
      setError("Não foi possível carregar os dados. Tente atualizar.");
    } finally {
      setLoading(false);
    }
  }
  async function logout() {
    await fetch("/api/admin/logout", { method: "POST" });
    router.push("/backoffice/login");
    router.refresh();
  }
  async function remove(entity: string, id: string | undefined) {
    if (!confirm("Eliminar definitivamente este registo?")) return;
    const response = await fetch("/api/admin/content", {
      method: "DELETE",
      headers: { "content-type": "application/json" },
      body: JSON.stringify({ entity, id }),
    });
    if (!response.ok) {
      setError("Não foi possível eliminar este registo.");
      return;
    }
    load();
  }
  const menu: Array<[Tab, string, LucideIcon]> = [
    ["dashboard", "Resumo", LayoutDashboard],
    ["posts", "Blog", BookOpen],
    ["projects", "Projetos", BriefcaseBusiness],
    ["courses", "Cursos", CalendarDays],
    ["inquiries", "Pedidos", Inbox],
  ];
  return (
    <div className="min-h-dvh lg:grid lg:grid-cols-[250px_1fr]">
      <aside className="bg-[#07132f] p-5 text-white lg:min-h-dvh">
        <div className="rounded-xl bg-white p-2">
          <Image
            src="/brand/sammac-logo-horizontal.png"
            alt="SAMMAC"
            width={230}
            height={60}
            className="h-10 w-auto"
          />
        </div>
        <nav className="mt-7 grid grid-cols-5 gap-1 lg:grid-cols-1">
          {menu.map(([id, label, Icon]) => (
            <button
              key={id}
              onClick={() => setTab(id)}
              className={`flex flex-col items-center gap-1 rounded-xl px-3 py-3 text-xs font-bold lg:flex-row lg:gap-3 lg:text-sm ${tab === id ? "bg-[#d51f28]" : "text-slate-300 hover:bg-white/8"}`}
            >
              <Icon size={18} />
              <span>{label}</span>
            </button>
          ))}
        </nav>
        <button
          onClick={logout}
          className="mt-7 flex w-full items-center gap-3 rounded-xl border border-white/10 px-3 py-3 text-sm font-bold text-slate-300 lg:flex"
        >
          <LogOut size={18} />
          Terminar sessão
        </button>
      </aside>
      <main className="p-4 pb-24 md:p-7 lg:p-9">
        <div className="mx-auto max-w-6xl">
          <div className="mb-7 flex items-center justify-between">
            <div>
              <p className="text-xs font-black uppercase tracking-[.2em] text-[#d51f28]">
                Backoffice
              </p>
              <h1 className="mt-1 text-3xl font-black text-[#07132f]">
                {menu.find((x) => x[0] === tab)?.[1]}
              </h1>
            </div>
            <button
              aria-label="Atualizar dados"
              onClick={() => {
                setLoading(true);
                void load();
              }}
              className="grid h-11 w-11 place-items-center rounded-xl bg-white shadow-sm"
            >
              <RefreshCw size={18} className={loading ? "animate-spin" : ""} />
            </button>
          </div>
          {error && (
            <p
              role="alert"
              className="mb-5 rounded-xl bg-red-50 p-4 text-red-700"
            >
              {error}
            </p>
          )}
          {loading && (
            <p role="status" className="mb-5 text-slate-600">
              A carregar dados...
            </p>
          )}
          {tab === "dashboard" && <Dashboard data={data} />}{" "}
          {tab === "posts" && (
            <List
              title="Publicações"
              items={data.posts}
              onNew={() =>
                setEditor({ entity: "post", item: { status: "draft" } })
              }
              onEdit={(x) => setEditor({ entity: "post", item: x })}
              onDelete={(x) => remove("posts", x._id)}
            />
          )}{" "}
          {tab === "projects" && (
            <List
              title="Projetos"
              items={data.projects}
              onNew={() =>
                setEditor({ entity: "project", item: { status: "draft" } })
              }
              onEdit={(x) => setEditor({ entity: "project", item: x })}
              onDelete={(x) => remove("projects", x._id)}
            />
          )}{" "}
          {tab === "courses" && (
            <List
              title="Cursos / calendário"
              items={data.courses}
              onNew={() =>
                setEditor({
                  entity: "course",
                  item: {
                    status: "Inscrições abertas",
                    modality: "Presencial",
                  },
                })
              }
              onEdit={(x) => setEditor({ entity: "course", item: x })}
              onDelete={(x) => remove("courses", x._id)}
            />
          )}{" "}
          {tab === "inquiries" && (
            <Inquiries items={data.inquiries} reload={load} />
          )}
        </div>
      </main>
      {editor && (
        <Editor
          {...editor}
          close={() => setEditor(null)}
          saved={() => {
            setEditor(null);
            load();
          }}
        />
      )}
    </div>
  );
}
function Dashboard({ data }: { data: DashboardData }) {
  const cards = [
    ["Blog", data.posts.length, BookOpen],
    ["Projetos", data.projects.length, BriefcaseBusiness],
    ["Cursos", data.courses.length, CalendarDays],
    ["Pedidos", data.inquiries.length, Inbox],
  ] as const;
  return (
    <div>
      <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
        {cards.map(([t, n, I]) => (
          <div key={t} className="rounded-2xl bg-white p-5 shadow-sm">
            <I className="text-[#d51f28]" />
            <p className="mt-5 text-3xl font-black">{n}</p>
            <p className="text-sm font-bold text-slate-500">{t}</p>
          </div>
        ))}
      </div>
      <div className="mt-6 rounded-2xl bg-white p-6 shadow-sm">
        <h2 className="text-xl font-black">Pedidos recentes</h2>
        <div className="mt-4 grid gap-2">
          {data.inquiries.slice(0, 6).map((x) => (
            <div
              key={x._id}
              className="flex items-center justify-between gap-3 rounded-xl bg-slate-50 p-3"
            >
              <div>
                <strong className="text-sm">{x.name}</strong>
                <p className="text-xs text-slate-500">
                  {x.type} · {x.phone}
                </p>
              </div>
              <span className="rounded-full bg-red-50 px-3 py-1 text-xs font-bold text-red-600">
                {x.status}
              </span>
            </div>
          ))}
          {!data.inquiries.length && (
            <p className="text-sm text-slate-500">Ainda não existem pedidos.</p>
          )}
        </div>
      </div>
    </div>
  );
}
function List({
  title,
  items,
  onNew,
  onEdit,
  onDelete,
}: {
  title: string;
  items: AnyItem[];
  onNew: () => void;
  onEdit: (x: AnyItem) => void;
  onDelete: (x: AnyItem) => void;
}) {
  return (
    <div className="rounded-2xl bg-white p-5 shadow-sm">
      <div className="flex items-center justify-between">
        <h2 className="font-black">{title}</h2>
        <button
          onClick={onNew}
          className="flex items-center gap-2 rounded-xl bg-[#d51f28] px-4 py-2.5 text-sm font-black text-white"
        >
          <Plus size={17} />
          Novo
        </button>
      </div>
      <div className="mt-5 grid gap-2">
        {items.map((x) => (
          <div
            key={x._id}
            className="flex items-center justify-between gap-3 rounded-xl border border-slate-100 p-4"
          >
            <button
              onClick={() => onEdit(x)}
              className="min-w-0 flex-1 text-left"
            >
              <p className="truncate font-black">{x.title}</p>
              <p className="mt-1 text-xs text-slate-500">
                {x.category || x.status} · {x.status}
              </p>
            </button>
            <button
              aria-label={"Eliminar " + x.title}
              onClick={() => onDelete(x)}
              className="grid h-9 w-9 place-items-center rounded-lg bg-red-50 text-red-600"
            >
              <Trash2 size={16} />
            </button>
          </div>
        ))}
        {!items.length && (
          <p className="py-8 text-center text-sm text-slate-500">
            Nenhum registo.
          </p>
        )}
      </div>
    </div>
  );
}
function Editor({
  entity,
  item,
  close,
  saved,
}: {
  entity: "post" | "project" | "course";
  item: AnyItem;
  close: () => void;
  saved: () => void;
}) {
  const dialogRef = useRef<HTMLDialogElement>(null);
  useEffect(() => {
    dialogRef.current?.showModal();
  }, []);
  const [busy, setBusy] = useState(false);
  const [storageId, setStorageId] = useState(item.imageStorageId || "");
  const [preview, setPreview] = useState(item.image || item.imageUrl || "");
  async function upload(file: File) {
    if (
      !["image/jpeg", "image/png", "image/webp"].includes(file.type) ||
      file.size > 5 * 1024 * 1024
    ) {
      alert("Escolha JPG, PNG ou WebP até 5 MB.");
      return;
    }
    setBusy(true);
    try {
      const r = await fetch("/api/admin/upload-url", { method: "POST" });
      if (!r.ok) throw new Error("upload");
      const { url } = await r.json();
      const up = await fetch(url, {
        method: "POST",
        headers: { "Content-Type": file.type },
        body: file,
      });
      if (!up.ok) throw new Error("upload");
      const res = await up.json();
      setStorageId(res.storageId);
      setPreview(URL.createObjectURL(file));
    } catch {
      alert("Não foi possível carregar a imagem.");
    } finally {
      setBusy(false);
    }
  }
  async function submit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setBusy(true);
    const f = Object.fromEntries(new FormData(e.currentTarget).entries());
    const data: Record<string, FormDataEntryValue | boolean | undefined> = {
      ...f,
      id: item._id || undefined,
      imageStorageId: storageId || undefined,
      imageUrl: String(f.imageUrl || "") || undefined,
    };
    if (entity !== "course") {
      data.slug = String(data.slug || slugify(String(data.title)));
    }
    if (entity === "project") data.featured = f.featured === "on";
    try {
      const r = await fetch("/api/admin/content", {
        method: "POST",
        headers: { "content-type": "application/json" },
        body: JSON.stringify({ entity, data }),
      });
      if (r.ok) saved();
      else {
        const result = await r.json();
        alert(result.error || "Não foi possível guardar.");
      }
    } catch {
      alert("Falha de ligação. O conteúdo não foi guardado. Tente novamente.");
    } finally {
      setBusy(false);
    }
  }
  return (
    <dialog
      ref={dialogRef}
      onCancel={close}
      role="dialog"
      aria-modal="true"
      aria-label="Editor de conteúdo"
      className="fixed inset-0 z-[100] m-0 h-dvh max-h-none w-screen max-w-none overflow-auto border-0 bg-black/55 p-3 backdrop-blur-sm md:p-8"
    >
      <form
        onSubmit={submit}
        className="mx-auto max-w-3xl rounded-[28px] bg-white p-5 shadow-2xl md:p-8"
      >
        <div className="flex items-center justify-between">
          <h2 className="text-2xl font-black">
            {item._id ? "Editar" : "Novo"}{" "}
            {entity === "post"
              ? "artigo"
              : entity === "project"
                ? "projeto"
                : "curso"}
          </h2>
          <button
            type="button"
            aria-label="Fechar editor"
            onClick={close}
            className="grid h-10 w-10 place-items-center rounded-xl bg-slate-100"
          >
            <X />
          </button>
        </div>
        <div className="mt-6 grid gap-4">
          <Field name="title" label="Título" value={item.title} required />
          {entity !== "course" && (
            <Field name="slug" label="Slug (opcional)" value={item.slug} />
          )}
          <Field
            name="category"
            label="Categoria"
            value={item.category}
            required={entity === "course"}
          />
          {entity === "post" && (
            <Field
              name="excerpt"
              label="Resumo / excerpt"
              value={item.excerpt}
              required
            />
          )}
          {entity === "project" && (
            <Field
              name="summary"
              label="Resumo"
              value={item.summary}
              required
            />
          )}
          {entity === "course" && (
            <Field
              name="summary"
              label="Resumo"
              value={item.summary}
              required
            />
          )}
          {entity !== "course" && (
            <Area
              name="content"
              label="Conteúdo"
              value={item.content}
              required
            />
          )}
          {entity === "course" && (
            <>
              <Area
                name="description"
                label="Descrição"
                value={item.description}
              />
              <div className="grid gap-4 sm:grid-cols-2">
                <Field
                  name="duration"
                  label="Duração"
                  value={item.duration || "Consultar calendário"}
                  required
                />
                <Field
                  name="modality"
                  label="Modalidade"
                  value={item.modality || "Presencial"}
                  required
                />
                <Field
                  name="startDate"
                  type="date"
                  label="Data de início"
                  value={toDate(item.startDate)}
                />
                <Field
                  name="endDate"
                  type="date"
                  label="Data de fim"
                  value={toDate(item.endDate)}
                />
              </div>
            </>
          )}
          <div className="grid gap-4 sm:grid-cols-2">
            <label className="grid gap-2 text-sm font-bold">
              Estado
              <select
                name="status"
                defaultValue={item.status || "draft"}
                className="rounded-xl border border-slate-300 px-4 py-3 font-normal"
              >
                {entity === "course" ? (
                  <>
                    <option>Inscrições abertas</option>
                    <option>Planeado</option>
                    <option>Em curso</option>
                    <option>Encerrado</option>
                  </>
                ) : (
                  <>
                    <option value="draft">Rascunho</option>
                    <option value="published">Publicado</option>
                  </>
                )}
              </select>
            </label>
            <Field
              name="imageUrl"
              label="URL de imagem (opcional)"
              value={item.imageUrl}
            />
          </div>
          {entity === "project" && (
            <label className="flex items-center gap-2 text-sm font-bold">
              <input
                type="checkbox"
                name="featured"
                defaultChecked={item.featured}
              />
              Projeto em destaque
            </label>
          )}
          <label className="grid gap-2 text-sm font-bold">
            Imagem do computador
            <input
              type="file"
              accept="image/jpeg,image/png,image/webp"
              onChange={(e) => e.target.files?.[0] && upload(e.target.files[0])}
              className="rounded-xl border border-dashed border-slate-300 p-3 font-normal"
            />
          </label>
          {preview && (
            <div className="relative aspect-[16/7] overflow-hidden rounded-2xl">
              <Image
                src={preview}
                alt="Pré-visualização"
                fill
                className="object-cover"
                unoptimized={preview.startsWith("blob:")}
              />
            </div>
          )}
          <button
            disabled={busy}
            className="rounded-xl bg-[#07132f] px-5 py-3.5 font-black text-white disabled:opacity-50"
          >
            {busy ? "A processar..." : "Guardar"}
          </button>
        </div>
      </form>
    </dialog>
  );
}
function Inquiries({
  items,
  reload,
}: {
  items: AnyItem[];
  reload: () => void;
}) {
  async function status(id: string | undefined, value: string) {
    await fetch("/api/admin/content", {
      method: "POST",
      headers: { "content-type": "application/json" },
      body: JSON.stringify({ entity: "inquiry", data: { id, status: value } }),
    });
    reload();
  }
  return (
    <div className="grid gap-4">
      {items.map((x) => (
        <article key={x._id} className="rounded-2xl bg-white p-5 shadow-sm">
          <div className="flex flex-wrap items-start justify-between gap-3">
            <div>
              <p className="text-xs font-black uppercase text-[#d51f28]">
                {x.type}
              </p>
              <h3 className="mt-1 text-lg font-black">{x.name}</h3>
              <p className="text-sm text-slate-500">
                {x.phone} · {x.email}
              </p>
            </div>
            <select
              aria-label="Estado do pedido"
              value={x.status}
              onChange={(e) => status(x._id, e.target.value)}
              className="rounded-lg border border-slate-200 px-3 py-2 text-sm"
            >
              <option value="novo">Novo</option>
              <option value="em contacto">Em contacto</option>
              <option value="concluído">Concluído</option>
            </select>
          </div>
          {x.interest && (
            <p className="mt-3 text-sm">
              <b>Interesse:</b> {x.interest}
            </p>
          )}
          {x.preferredDate && (
            <p className="mt-1 text-sm">
              <b>Data:</b> {x.preferredDate}
            </p>
          )}
          <p className="mt-3 whitespace-pre-wrap rounded-xl bg-slate-50 p-4 text-sm leading-6">
            {x.message}
          </p>
        </article>
      ))}
      {!items.length && (
        <div className="rounded-2xl bg-white p-10 text-center text-slate-500">
          Ainda não há pedidos.
        </div>
      )}
    </div>
  );
}
function Field({
  name,
  label,
  value,
  type = "text",
  required = false,
}: {
  name: string;
  label: string;
  value?: string | number;
  type?: string;
  required?: boolean;
}) {
  return (
    <label className="grid gap-2 text-sm font-bold">
      {label}
      <input
        name={name}
        type={type}
        defaultValue={value || ""}
        required={required}
        className="rounded-xl border border-slate-300 px-4 py-3 font-normal outline-none focus:border-[#d51f28]"
      />
    </label>
  );
}
function Area({
  name,
  label,
  value,
  required = false,
}: {
  name: string;
  label: string;
  value?: string | number;
  required?: boolean;
}) {
  return (
    <label className="grid gap-2 text-sm font-bold">
      {label}
      <textarea
        name={name}
        defaultValue={value || ""}
        required={required}
        rows={8}
        className="rounded-xl border border-slate-300 px-4 py-3 font-normal leading-6 outline-none focus:border-[#d51f28]"
      />
    </label>
  );
}
function slugify(s: string) {
  return s
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-|-$/g, "");
}
function toDate(v?: number) {
  return v ? new Date(v).toISOString().slice(0, 10) : "";
}
