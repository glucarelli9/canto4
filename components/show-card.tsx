import { CalendarClock, ExternalLink, MapPin, Sparkles, Ticket } from "lucide-react";
import { hasCustomImage, shortMonth, type DatedShow } from "@/lib/shows-core";
import { ButtonLink } from "./ui/button";

function ticketLabel(url: string) {
  return /ticket|entrada|passline|eventbrite|alpogo|tuentrada|plateanet/i.test(url) ? "Comprar entradas" : "Más info";
}

export function ShowCard({ show, compact = false }: { show: DatedShow; compact?: boolean }) {
  const { parsed } = show;
  return (
    <article className="group/card relative flex h-full flex-col overflow-hidden rounded-3xl bg-card text-foreground shadow-[0_10px_30px_-15px_rgb(0_0_0/0.35)] ring-1 ring-black/5 transition-[transform,box-shadow] duration-500 ease-out hover:-translate-y-1.5 hover:shadow-[0_24px_50px_-20px_rgb(164_30_50/0.45)] hover:ring-primary/30">
      {hasCustomImage(show) && !compact && (
        <div className="overflow-hidden">
          {/* Las imágenes las carga el admin con cualquier URL externa; next/image exigiría declarar cada dominio. */}
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src={show.imagen!}
            alt=""
            loading="lazy"
            className="aspect-[2/1] w-full object-cover transition-transform duration-700 group-hover/card:scale-105"
          />
        </div>
      )}
      <div className="flex flex-1 gap-4 p-5">
        <div
          className="relative flex w-16 shrink-0 flex-col items-center justify-center self-start overflow-hidden rounded-2xl bg-gradient-to-br from-primary to-[#6e1020] py-2.5 text-primary-foreground shadow-lg shadow-primary/30 transition-transform duration-500 group-hover/card:-rotate-3 group-hover/card:scale-105"
          aria-hidden={!!parsed}
        >
          <span className="absolute inset-x-0 top-0 h-1/2 bg-white/10" />
          {parsed ? (
            <>
              <span className="relative text-2xl font-bold leading-none tabular-nums">{String(parsed.day).padStart(2, "0")}</span>
              <span className="relative mt-1 text-[11px] font-semibold tracking-[0.2em]">{shortMonth(parsed.month)}</span>
            </>
          ) : (
            <Ticket className="size-6" />
          )}
        </div>
        <div className="flex min-w-0 flex-1 flex-col gap-1.5">
          {show.destacado && (
            <span className="inline-flex w-fit items-center gap-1 rounded-full bg-gradient-to-r from-primary to-[#e5333f] px-2.5 py-0.5 text-[11px] font-bold uppercase tracking-wider text-white">
              <Sparkles className="size-3" aria-hidden /> Destacado
            </span>
          )}
          <h3 className="text-lg font-bold leading-snug text-balance break-words transition-colors group-hover/card:text-primary">
            {show.lugar}
          </h3>
          {show.ciudad && (
            <p className="flex items-start gap-1.5 text-sm text-muted-foreground">
              <MapPin className="mt-0.5 size-4 shrink-0 text-primary/70" aria-hidden />
              {show.ciudad}
            </p>
          )}
          <p className="flex items-start gap-1.5 text-sm text-muted-foreground">
            <CalendarClock className="mt-0.5 size-4 shrink-0 text-primary/70" aria-hidden />
            <span>
              {show.fecha}
              {show.hora ? ` · ${show.hora}` : ""}
            </span>
          </p>
          {show.descripcion && !compact && <p className="pt-1 text-sm">{show.descripcion}</p>}
        </div>
      </div>
      {show.link_tickets && (
        <div className="px-5 pb-5">
          <ButtonLink
            href={show.link_tickets}
            className="w-full rounded-2xl"
            icon={<Ticket aria-hidden />}
            trailing={<ExternalLink aria-hidden />}
          >
            {ticketLabel(show.link_tickets)}
          </ButtonLink>
        </div>
      )}
    </article>
  );
}
