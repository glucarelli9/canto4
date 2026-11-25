"use client";

import { useCallback, useEffect, useMemo, useState, useSyncExternalStore, useTransition } from "react";
import Link from "next/link";
import { BarChart3, Loader2, LogOut, Pencil, Plus, RefreshCw, Trash2 } from "lucide-react";
import { AdminError, createShow, deleteShow, listAllShows, updateShow, verifyPassword } from "@/lib/admin-api";
import { getAnalytics, type AnalyticsStats } from "@/lib/analytics-api";
import { sortShows, todayKeyAR, type Show, type ShowInput } from "@/lib/shows-core";
import { refreshPublicShows } from "./actions";
import { ShowForm } from "./show-form";

const SESSION_KEY = "canto4_admin_session";
type Filter = "proximos" | "pasados" | "todos";

// La sesión vive solo mientras la pestaña está abierta (sessionStorage), con copia en memoria por si el navegador lo bloquea.
let session: string | null | undefined;
const listeners = new Set<() => void>();

function readSession() {
  if (session === undefined) {
    try {
      // El panel viejo dejaba la clave en localStorage en texto plano y para siempre.
      localStorage.removeItem("canto4_admin_password");
      localStorage.removeItem("canto4_admin_auth");
      session = sessionStorage.getItem(SESSION_KEY);
    } catch {
      session = null;
    }
  }
  return session;
}

function writeSession(pw: string | null) {
  session = pw;
  try {
    if (pw) sessionStorage.setItem(SESSION_KEY, pw);
    else sessionStorage.removeItem(SESSION_KEY);
  } catch {}
  listeners.forEach((l) => l());
}

function subscribe(listener: () => void) {
  listeners.add(listener);
  return () => listeners.delete(listener);
}

export function AdminPanel() {
  const password = useSyncExternalStore(subscribe, readSession, () => undefined);

  if (password === undefined) return null;
  if (!password) return <Login onSuccess={writeSession} />;
  return <Dashboard password={password} onLogout={() => writeSession(null)} />;
}

function Login({ onSuccess }: { onSuccess: (pw: string) => void }) {
  const [value, setValue] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [pending, startTransition] = useTransition();

  return (
    <main className="flex flex-1 items-center justify-center px-4 py-16">
      <form
        className="w-full max-w-sm rounded-2xl bg-card p-6 shadow-lg sm:p-8"
        onSubmit={(e) => {
          e.preventDefault();
          if (!value.trim()) return;
          setError(null);
          startTransition(async () => {
            try {
              if (await verifyPassword(value)) onSuccess(value);
              else setError("Contraseña incorrecta.");
            } catch {
              setError("No se pudo conectar con la base de datos. Probá de nuevo.");
            }
          });
        }}
      >
        <h1 className="text-2xl font-bold">Panel de administración</h1>
        <p className="mt-1 text-sm text-muted-foreground">Gestión de shows de Canto 4</p>
        <label htmlFor="pw" className="mt-6 block text-sm font-semibold">
          Contraseña
        </label>
        <input
          id="pw"
          type="password"
          autoComplete="current-password"
          autoFocus
          value={value}
          onChange={(e) => setValue(e.target.value)}
          className="mt-2 w-full rounded-lg border border-border bg-background px-4 py-3 text-base"
        />
        {error && (
          <p role="alert" className="mt-3 text-sm font-semibold text-primary">
            {error}
          </p>
        )}
        <button
          type="submit"
          disabled={pending || !value.trim()}
          className="mt-5 flex min-h-11 w-full items-center justify-center gap-2 rounded-lg bg-primary font-semibold text-primary-foreground hover:bg-primary-strong disabled:opacity-60"
        >
          {pending && <Loader2 className="size-4 animate-spin" aria-hidden />}
          Ingresar
        </button>
        <Link href="/" className="mt-4 block text-center text-sm text-muted-foreground underline">
          Volver al sitio
        </Link>
      </form>
    </main>
  );
}

function Dashboard({ password, onLogout }: { password: string; onLogout: () => void }) {
  const [shows, setShows] = useState<Show[] | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [notice, setNotice] = useState<string | null>(null);
  const [filter, setFilter] = useState<Filter>("proximos");
  const [editing, setEditing] = useState<Show | "new" | null>(null);
  const [busyId, setBusyId] = useState<number | null>(null);

  const load = useCallback(async () => {
    setError(null);
    try {
      setShows(await listAllShows(password));
    } catch (e) {
      setError(e instanceof Error ? e.message : "No se pudieron cargar los shows.");
    }
  }, [password]);

  useEffect(() => {
    let cancelled = false;
    listAllShows(password)
      .then((rows) => !cancelled && setShows(rows))
      .catch((e) => !cancelled && setError(e instanceof Error ? e.message : "No se pudieron cargar los shows."));
    return () => {
      cancelled = true;
    };
  }, [password]);

  useEffect(() => {
    if (!notice) return;
    const t = setTimeout(() => setNotice(null), 4000);
    return () => clearTimeout(t);
  }, [notice]);

  const visible = useMemo(() => {
    if (!shows) return [];
    const { key } = todayKeyAR();
    const sorted = sortShows(shows);
    if (filter === "todos") return sorted;
    const isPast = (s: (typeof sorted)[number]) => !!s.parsed && s.parsed.end < key;
    return filter === "pasados" ? sorted.filter(isPast).reverse() : sorted.filter((s) => !isPast(s));
  }, [shows, filter]);

  async function afterChange(message: string) {
    setNotice(message);
    await Promise.all([load(), refreshPublicShows()]);
  }

  async function save(input: ShowInput) {
    if (editing === "new") await createShow(password, input);
    else if (editing) await updateShow(password, editing.id, input);
    setEditing(null);
    await afterChange(editing === "new" ? "Show creado." : "Cambios guardados.");
  }

  async function toggle(show: Show, field: "activo" | "destacado") {
    setBusyId(show.id);
    try {
      await updateShow(password, show.id, { [field]: !show[field] });
      await afterChange("Show actualizado.");
    } catch (e) {
      setError(e instanceof AdminError ? e.message : "No se pudo actualizar.");
    } finally {
      setBusyId(null);
    }
  }

  async function remove(show: Show) {
    if (!confirm(`¿Borrar definitivamente "${show.lugar}" (${show.fecha})?`)) return;
    setBusyId(show.id);
    try {
      await deleteShow(password, show.id);
      await afterChange("Show borrado.");
    } catch (e) {
      setError(e instanceof AdminError ? e.message : "No se pudo borrar.");
    } finally {
      setBusyId(null);
    }
  }

  return (
    <main className="mx-auto w-full max-w-5xl flex-1 px-4 py-8 sm:px-6">
      <div className="flex flex-wrap items-center justify-between gap-3">
        <div>
          <h1 className="text-2xl font-bold sm:text-3xl">Gestión de shows</h1>
          <Link href="/shows" target="_blank" className="text-sm text-primary underline">
            Ver agenda pública
          </Link>
        </div>
        <div className="flex flex-wrap gap-2">
          <button
            type="button"
            onClick={() => setEditing("new")}
            className="inline-flex min-h-11 items-center gap-2 rounded-lg bg-primary px-4 font-semibold text-primary-foreground hover:bg-primary-strong"
          >
            <Plus className="size-4" aria-hidden /> Nuevo show
          </button>
          <button
            type="button"
            onClick={load}
            className="inline-flex min-h-11 items-center gap-2 rounded-lg bg-card px-4 font-semibold ring-1 ring-border hover:bg-white"
          >
            <RefreshCw className="size-4" aria-hidden /> Actualizar
          </button>
          <button
            type="button"
            onClick={onLogout}
            className="inline-flex min-h-11 items-center gap-2 rounded-lg px-4 font-semibold hover:bg-primary/10"
          >
            <LogOut className="size-4" aria-hidden /> Salir
          </button>
        </div>
      </div>

      <div role="status" aria-live="polite" className="min-h-6">
        {notice && <p className="mt-4 rounded-lg bg-green-100 px-4 py-2 text-sm font-semibold text-green-900">{notice}</p>}
      </div>
      {error && (
        <p role="alert" className="mt-2 rounded-lg bg-primary/10 px-4 py-2 text-sm font-semibold text-primary">
          {error}
        </p>
      )}

      <div className="mt-4 inline-flex rounded-lg bg-card p-1 ring-1 ring-border" role="group" aria-label="Filtrar shows">
        {(["proximos", "pasados", "todos"] as const).map((f) => (
          <button
            key={f}
            type="button"
            aria-pressed={filter === f}
            onClick={() => setFilter(f)}
            className={`min-h-10 rounded-md px-4 text-sm font-semibold capitalize ${filter === f ? "bg-primary text-primary-foreground" : "hover:bg-primary/10"}`}
          >
            {f === "proximos" ? "Próximos" : f}
          </button>
        ))}
      </div>

      {!shows ? (
        <p className="mt-10 flex items-center gap-2 text-muted-foreground">
          <Loader2 className="size-4 animate-spin" aria-hidden /> Cargando shows…
        </p>
      ) : visible.length === 0 ? (
        <p className="mt-10 text-muted-foreground">No hay shows en esta lista.</p>
      ) : (
        <ul className="mt-6 space-y-3">
          {visible.map((s) => (
            <li
              key={s.id}
              className={`flex flex-col gap-3 rounded-xl bg-card p-4 shadow-sm ring-1 ring-black/5 sm:flex-row sm:items-center ${s.activo ? "" : "opacity-60"}`}
            >
              <div className="min-w-0 flex-1">
                <p className="font-bold break-words">{s.lugar}</p>
                <p className="text-sm text-muted-foreground">
                  {s.fecha}
                  {s.hora ? ` · ${s.hora}` : ""}
                  {s.ciudad ? ` · ${s.ciudad}` : ""}
                </p>
                {!s.parsed && (
                  <p className="mt-1 text-xs font-semibold text-primary">
                    No se reconoce la fecha: este show aparece al final de la agenda.
                  </p>
                )}
              </div>
              <div className="flex flex-wrap items-center gap-2">
                <label className="flex min-h-10 items-center gap-2 rounded-lg px-2 text-sm">
                  <input
                    type="checkbox"
                    checked={s.activo}
                    disabled={busyId === s.id}
                    onChange={() => toggle(s, "activo")}
                    className="size-4 accent-[var(--primary)]"
                  />
                  Visible
                </label>
                <label className="flex min-h-10 items-center gap-2 rounded-lg px-2 text-sm">
                  <input
                    type="checkbox"
                    checked={s.destacado}
                    disabled={busyId === s.id}
                    onChange={() => toggle(s, "destacado")}
                    className="size-4 accent-[var(--primary)]"
                  />
                  Destacado
                </label>
                <button
                  type="button"
                  onClick={() => setEditing(s)}
                  className="inline-flex size-10 items-center justify-center rounded-lg hover:bg-primary/10"
                >
                  <Pencil className="size-4" aria-hidden />
                  <span className="sr-only">Editar {s.lugar}</span>
                </button>
                <button
                  type="button"
                  onClick={() => remove(s)}
                  disabled={busyId === s.id}
                  className="inline-flex size-10 items-center justify-center rounded-lg text-primary hover:bg-primary/10"
                >
                  <Trash2 className="size-4" aria-hidden />
                  <span className="sr-only">Borrar {s.lugar}</span>
                </button>
              </div>
            </li>
          ))}
        </ul>
      )}

      {editing && (
        <ShowForm
          show={editing === "new" ? null : editing}
          onCancel={() => setEditing(null)}
          onSave={save}
        />
      )}

      <AnalyticsSection password={password} />
    </main>
  );
}

function AnalyticsSection({ password }: { password: string }) {
  const [stats, setStats] = useState<AnalyticsStats | null>(null);
  const [open, setOpen] = useState(false);
  const [loading, setLoading] = useState(false);

  async function load() {
    setLoading(true);
    try {
      setStats(await getAnalytics(password));
    } catch {}
    setLoading(false);
  }

  useEffect(() => {
    if (open && !stats) load();
  }, [open]);

  return (
    <section className="mt-10 border-t border-border pt-8">
      <button
        type="button"
        onClick={() => setOpen((v) => !v)}
        className="flex items-center gap-2 text-xl font-bold"
      >
        <BarChart3 className="size-5" aria-hidden />
        Analytics
        <span className="text-sm font-normal text-muted-foreground">{open ? "▲" : "▼"}</span>
      </button>

      {open && (
        <div className="mt-4">
          {loading && !stats ? (
            <p className="flex items-center gap-2 text-muted-foreground">
              <Loader2 className="size-4 animate-spin" aria-hidden /> Cargando…
            </p>
          ) : stats ? (
            <>
              <div className="grid grid-cols-3 gap-3">
                <StatCard label="Hoy" value={stats.today} />
                <StatCard label="Últimos 7 días" value={stats.week} />
                <StatCard label="Últimos 30 días" value={stats.month} />
              </div>
              {stats.topPages.length > 0 && (
                <div className="mt-4">
                  <h3 className="text-sm font-semibold text-muted-foreground">Páginas más visitadas (30 días)</h3>
                  <ul className="mt-2 space-y-1">
                    {stats.topPages.map((p) => (
                      <li key={p.path} className="flex items-center justify-between rounded-lg bg-card px-3 py-2 text-sm ring-1 ring-black/5">
                        <span className="truncate font-medium">{p.path}</span>
                        <span className="ml-2 shrink-0 font-bold">{p.count}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              )}
              <button
                type="button"
                onClick={load}
                disabled={loading}
                className="mt-3 text-sm text-primary underline"
              >
                {loading ? "Actualizando…" : "Actualizar"}
              </button>
            </>
          ) : (
            <p className="text-sm text-muted-foreground">No se pudieron cargar los analytics.</p>
          )}
        </div>
      )}
    </section>
  );
}

function StatCard({ label, value }: { label: string; value: number }) {
  return (
    <div className="rounded-xl bg-card p-4 text-center shadow-sm ring-1 ring-black/5">
      <p className="text-2xl font-bold">{value.toLocaleString("es-AR")}</p>
      <p className="mt-1 text-xs text-muted-foreground">{label}</p>
    </div>
  );
}
