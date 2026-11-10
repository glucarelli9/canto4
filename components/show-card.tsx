import { Clock, ExternalLink, MapPin, Star, Ticket } from "lucide-react";
import { hasCustomImage, shortMonth, type DatedShow } from "@/lib/shows-core";

function ticketLabel(url: string) {
  return /ticket|entrada|passline|eventbrite|alpogo|tuentrada|plateanet/i.test(url) ? "Comprar entradas" : "Más info";
}

export function ShowCard({ show, compact = false }: { show: DatedShow; compact?: boolean }) {
  const { parsed } = show;
  return (
    <article className="flex h-full flex-col overflow-hidden rounded-2xl bg-card text-foreground shadow-md ring-1 ring-black/5">
      {hasCustomImage(show) && !compact && (
        // Las imágenes las carga el admin con cualquier URL externa; next/image exigiría declarar cada dominio.
        // eslint-disable-next-line @next/next/no-img-element
        <img src={show.imagen!} alt="" loading="lazy" className="aspect-[2/1] w-full object-cover" />
      )}
      <div className="flex flex-1 gap-4 p-4 sm:p-5">
        <div
          className="flex w-16 shrink-0 flex-col items-center justify-center self-start rounded-xl bg-primary py-2 text-primary-foreground"
          aria-hidden={!!parsed}
        >
          {parsed ? (
            <>
              <span className="text-2xl font-bold leading-none tabular-nums">{String(parsed.day).padStart(2, "0")}</span>
              <span className="mt-1 text-xs font-semibold tracking-widest">{shortMonth(parsed.month)}</span>
            </>
          ) : (
            <Ticket className="size-6" />
          )}
        </div>
        <div className="flex min-w-0 flex-1 flex-col gap-1.5">
          {show.destacado && (
            <span className="inline-flex w-fit items-center gap-1 rounded-full bg-primary/10 px-2 py-0.5 text-xs font-bold uppercase text-primary">
              <Star className="size-3 fill-current" aria-hidden /> Destacado
            </span>
          )}
          <h3 className="text-lg font-bold leading-snug text-balance break-words">{show.lugar}</h3>
          {show.ciudad && (
            <p className="flex items-start gap-1.5 text-sm text-muted-foreground">
              <MapPin className="mt-0.5 size-4 shrink-0" aria-hidden />
              {show.ciudad}
            </p>
          )}
          <p className="flex items-start gap-1.5 text-sm text-muted-foreground">
            <Clock className="mt-0.5 size-4 shrink-0" aria-hidden />
            <span>
              {show.fecha}
              {show.hora ? ` · ${show.hora}` : ""}
            </span>
          </p>
          {show.descripcion && !compact && <p className="pt-1 text-sm">{show.descripcion}</p>}
        </div>
      </div>
      {show.link_tickets && (
        <div className="px-4 pb-4 sm:px-5 sm:pb-5">
          <a
            href={show.link_tickets}
            target="_blank"
            rel="noopener noreferrer"
            className="flex min-h-11 w-full items-center justify-center gap-2 rounded-lg bg-primary px-4 text-sm font-semibold text-primary-foreground transition-colors hover:bg-primary-strong"
          >
            <Ticket className="size-4" aria-hidden />
            {ticketLabel(show.link_tickets)}
            <ExternalLink className="size-3.5" aria-hidden />
            <span className="sr-only">(abre en otra pestaña)</span>
          </a>
        </div>
      )}
    </article>
  );
}
