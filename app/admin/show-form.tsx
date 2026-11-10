"use client";

import { useEffect, useRef, useState } from "react";
import { Loader2, X } from "lucide-react";
import { LEGACY_DEFAULT_IMAGE } from "@/lib/admin-api";
import { MONTHS, parseFecha, todayKeyAR, type Show, type ShowInput } from "@/lib/shows-core";

function keyToIso(key: number) {
  const s = String(key);
  return `${s.slice(0, 4)}-${s.slice(4, 6)}-${s.slice(6, 8)}`;
}

function pad(n: number) {
  return String(n).padStart(2, "0");
}

export function formatFecha(start: string, end: string) {
  const [y1, m1, d1] = start.split("-").map(Number);
  if (!end || end <= start) return `${pad(d1)} ${MONTHS[m1 - 1]} ${y1}`;
  const [y2, m2, d2] = end.split("-").map(Number);
  if (y1 === y2 && m1 === m2) return `${pad(d1)} ${d2 - d1 === 1 ? "y" : "al"} ${pad(d2)} ${MONTHS[m1 - 1]} ${y1}`;
  if (y1 === y2) return `${pad(d1)} ${MONTHS[m1 - 1]} al ${pad(d2)} ${MONTHS[m2 - 1]} ${y1}`;
  return `${pad(d1)} ${MONTHS[m1 - 1]} ${y1} al ${pad(d2)} ${MONTHS[m2 - 1]} ${y2}`;
}

function isHttpUrl(v: string) {
  try {
    return ["http:", "https:"].includes(new URL(v).protocol);
  } catch {
    return false;
  }
}

type Props = { show: Show | null; onCancel: () => void; onSave: (input: ShowInput) => Promise<void> };

export function ShowForm({ show, onCancel, onSave }: Props) {
  const dialogRef = useRef<HTMLDialogElement>(null);
  const parsed = show ? parseFecha(show.fecha, todayKeyAR().year) : null;

  const [lugar, setLugar] = useState(show?.lugar ?? "");
  const [ciudad, setCiudad] = useState(show?.ciudad ?? "");
  const [desde, setDesde] = useState(parsed ? keyToIso(parsed.start) : "");
  const [hasta, setHasta] = useState(parsed && parsed.end !== parsed.start ? keyToIso(parsed.end) : "");
  const [fecha, setFecha] = useState(show?.fecha ?? "");
  const [hora, setHora] = useState(show?.hora?.match(/\d{1,2}[:.]\d{2}/)?.[0].replace(".", ":").padStart(5, "0") ?? "21:00");
  const [link, setLink] = useState(show?.link_tickets ?? "");
  const [descripcion, setDescripcion] = useState(show?.descripcion ?? "");
  const [imagen, setImagen] = useState(show?.imagen && show.imagen !== LEGACY_DEFAULT_IMAGE ? show.imagen : "");
  const [destacado, setDestacado] = useState(show?.destacado ?? false);
  const [activo, setActivo] = useState(show?.activo ?? true);
  const [error, setError] = useState<string | null>(null);
  const [saving, setSaving] = useState(false);

  useEffect(() => {
    dialogRef.current?.showModal();
  }, []);

  function updateDates(d: string, h: string) {
    setDesde(d);
    setHasta(h);
    if (d) setFecha(formatFecha(d, h));
  }

  const preview = fecha.trim() ? parseFecha(fecha, todayKeyAR().year) : null;

  async function submit(e: React.FormEvent) {
    e.preventDefault();
    setError(null);
    if (!lugar.trim() || !fecha.trim()) return setError("Completá el lugar y la fecha.");
    if (link && !isHttpUrl(link)) return setError("El link de entradas tiene que empezar con https://");
    if (imagen && !isHttpUrl(imagen)) return setError("La URL de la imagen tiene que empezar con https://");
    setSaving(true);
    try {
      await onSave({
        lugar: lugar.trim(),
        ciudad: ciudad.trim(),
        fecha: fecha.trim(),
        hora: hora ? `${hora} hs` : "",
        link_tickets: link.trim(),
        descripcion: descripcion.trim(),
        imagen: imagen.trim(),
        destacado,
        activo,
      });
    } catch (err) {
      setError(err instanceof Error ? err.message : "No se pudo guardar.");
      setSaving(false);
    }
  }

  const input = "mt-1.5 w-full rounded-lg border border-border bg-background px-3 py-2.5 text-base";
  const label = "block text-sm font-semibold";

  return (
    <dialog
      ref={dialogRef}
      onCancel={(e) => {
        e.preventDefault();
        if (!saving) onCancel();
      }}
      aria-labelledby="form-title"
      className="m-auto w-[min(40rem,calc(100vw-1.5rem))] max-h-[calc(100dvh-1.5rem)] rounded-2xl bg-card p-0 text-foreground shadow-2xl backdrop:bg-black/60"
    >
      <form onSubmit={submit} className="flex max-h-[calc(100dvh-1.5rem)] flex-col">
        <div className="flex items-center justify-between border-b border-border px-5 py-4">
          <h2 id="form-title" className="text-xl font-bold">
            {show ? "Editar show" : "Nuevo show"}
          </h2>
          <button
            type="button"
            onClick={onCancel}
            disabled={saving}
            className="flex size-10 items-center justify-center rounded-full hover:bg-primary/10"
          >
            <X className="size-5" aria-hidden />
            <span className="sr-only">Cerrar</span>
          </button>
        </div>

        <div className="grid gap-4 overflow-y-auto px-5 py-5 sm:grid-cols-2">
          <div className="sm:col-span-2">
            <label htmlFor="lugar" className={label}>Lugar / evento *</label>
            <input id="lugar" required value={lugar} onChange={(e) => setLugar(e.target.value)} placeholder="Ej: Teatro Provincial" className={input} />
          </div>
          <div className="sm:col-span-2">
            <label htmlFor="ciudad" className={label}>Ciudad</label>
            <input id="ciudad" value={ciudad} onChange={(e) => setCiudad(e.target.value)} placeholder="Ej: Salta, Argentina" className={input} />
          </div>
          <div>
            <label htmlFor="desde" className={label}>Fecha *</label>
            <input id="desde" type="date" value={desde} onChange={(e) => updateDates(e.target.value, hasta)} className={input} />
          </div>
          <div>
            <label htmlFor="hasta" className={label}>Hasta (si dura varios días)</label>
            <input id="hasta" type="date" min={desde || undefined} value={hasta} onChange={(e) => updateDates(desde, e.target.value)} className={input} />
          </div>
          <div className="sm:col-span-2">
            <label htmlFor="fecha" className={label}>Texto de la fecha que se muestra *</label>
            <input id="fecha" required value={fecha} onChange={(e) => setFecha(e.target.value)} placeholder="Ej: 15 Noviembre 2026" className={input} aria-describedby="fecha-ayuda" />
            <p id="fecha-ayuda" className={`mt-1 text-xs ${fecha && !preview ? "font-semibold text-primary" : "text-muted-foreground"}`}>
              {!fecha
                ? "Se completa solo al elegir la fecha. Podés retocarlo."
                : preview
                  ? `Se ordena como ${keyToIso(preview.start).split("-").reverse().join("/")}.`
                  : "No reconozco esta fecha: el show va a quedar al final de la agenda."}
            </p>
          </div>
          <div>
            <label htmlFor="hora" className={label}>Hora</label>
            <input id="hora" type="time" value={hora} onChange={(e) => setHora(e.target.value)} className={input} />
          </div>
          <div>
            <label htmlFor="link" className={label}>Link de entradas o info</label>
            <input id="link" type="url" inputMode="url" value={link} onChange={(e) => setLink(e.target.value)} placeholder="https://..." className={input} />
          </div>
          <div className="sm:col-span-2">
            <label htmlFor="descripcion" className={label}>Descripción</label>
            <textarea id="descripcion" rows={3} value={descripcion} onChange={(e) => setDescripcion(e.target.value)} className={input} />
          </div>
          <div className="sm:col-span-2">
            <label htmlFor="imagen" className={label}>Imagen (opcional, URL)</label>
            <input id="imagen" type="url" inputMode="url" value={imagen} onChange={(e) => setImagen(e.target.value)} placeholder="https://..." className={input} />
            <p className="mt-1 text-xs text-muted-foreground">Formato horizontal 2:1, por ejemplo 1200×600.</p>
          </div>
          <label className="flex min-h-11 items-center gap-3">
            <input type="checkbox" checked={activo} onChange={(e) => setActivo(e.target.checked)} className="size-5 accent-[var(--primary)]" />
            Visible en el sitio
          </label>
          <label className="flex min-h-11 items-center gap-3">
            <input type="checkbox" checked={destacado} onChange={(e) => setDestacado(e.target.checked)} className="size-5 accent-[var(--primary)]" />
            Destacado
          </label>
        </div>

        {error && (
          <p role="alert" className="mx-5 rounded-lg bg-primary/10 px-4 py-2 text-sm font-semibold text-primary">
            {error}
          </p>
        )}

        <div className="flex flex-col-reverse gap-2 border-t border-border px-5 py-4 sm:flex-row sm:justify-end">
          <button type="button" onClick={onCancel} disabled={saving} className="min-h-11 rounded-lg px-5 font-semibold hover:bg-primary/10">
            Cancelar
          </button>
          <button
            type="submit"
            disabled={saving}
            className="flex min-h-11 items-center justify-center gap-2 rounded-lg bg-primary px-5 font-semibold text-primary-foreground hover:bg-primary-strong disabled:opacity-60"
          >
            {saving && <Loader2 className="size-4 animate-spin" aria-hidden />}
            {show ? "Guardar cambios" : "Crear show"}
          </button>
        </div>
      </form>
    </dialog>
  );
}
