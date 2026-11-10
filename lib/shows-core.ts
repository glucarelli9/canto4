export type Show = {
  id: number;
  fecha: string;
  hora: string | null;
  lugar: string;
  ciudad: string | null;
  descripcion: string | null;
  link_tickets: string | null;
  imagen: string | null;
  destacado: boolean;
  activo: boolean;
  created_at: string;
};

export type ShowInput = Omit<Show, "id" | "created_at">;

export const MONTHS = [
  "Enero", "Febrero", "Marzo", "Abril", "Mayo", "Junio",
  "Julio", "Agosto", "Septiembre", "Octubre", "Noviembre", "Diciembre",
] as const;

const MONTH_LOOKUP: Record<string, number> = Object.fromEntries([
  ...MONTHS.map((m, i) => [normalize(m), i]),
  ["setiembre", 8],
  ...MONTHS.map((m, i) => [normalize(m).slice(0, 3), i]),
]);

function normalize(s: string) {
  return s.normalize("NFD").replace(/[̀-ͯ]/g, "").toLowerCase();
}

export type ParsedDate = { start: number; end: number; day: number; month: number; year: number };

// La columna `fecha` es texto libre ("15 Noviembre 2026", "20 y 21 Noviembre 2026"); las claves son yyyymmdd.
export function parseFecha(fecha: string, fallbackYear: number): ParsedDate | null {
  const tokens = normalize(fecha).split(/[^a-z0-9]+/).filter(Boolean);
  let pending: number[] = [];
  const groups: { month: number; days: number[]; year: number | null }[] = [];

  for (const t of tokens) {
    if (/^\d{4}$/.test(t)) {
      for (const g of groups) g.year ??= Number(t);
    } else if (/^\d{1,2}$/.test(t) && Number(t) >= 1 && Number(t) <= 31) pending.push(Number(t));
    else if (t in MONTH_LOOKUP && pending.length) {
      groups.push({ month: MONTH_LOOKUP[t], days: pending, year: null });
      pending = [];
    }
  }
  if (!groups.length) return null;

  const first = groups[0];
  const last = groups[groups.length - 1];
  const firstYear = first.year ?? last.year ?? fallbackYear;
  const startDay = Math.min(...first.days);
  return {
    start: dateKey(firstYear, first.month, startDay),
    end: dateKey(last.year ?? firstYear, last.month, Math.max(...last.days)),
    day: startDay,
    month: first.month,
    year: firstYear,
  };
}

function dateKey(y: number, monthIndex: number, d: number) {
  return y * 10000 + (monthIndex + 1) * 100 + d;
}

export function todayKeyAR(now = new Date()) {
  const [y, m, d] = new Intl.DateTimeFormat("en-CA", { timeZone: "America/Argentina/Buenos_Aires" })
    .format(now)
    .split("-")
    .map(Number);
  return { key: y * 10000 + m * 100 + d, year: y };
}

function horaMinutes(hora: string | null) {
  const m = hora?.match(/(\d{1,2})[:.](\d{2})/);
  return m ? Number(m[1]) * 60 + Number(m[2]) : 0;
}

export type DatedShow = Show & { parsed: ParsedDate | null };

export function sortShows(shows: Show[], now = new Date()): DatedShow[] {
  const { year } = todayKeyAR(now);
  return shows
    .map((s) => ({ ...s, parsed: parseFecha(s.fecha, year) }))
    .sort((a, b) => {
      if (!a.parsed || !b.parsed) return a.parsed ? -1 : b.parsed ? 1 : a.id - b.id;
      return a.parsed.start - b.parsed.start || horaMinutes(a.hora) - horaMinutes(b.hora);
    });
}

export function upcomingShows(shows: Show[], now = new Date()): DatedShow[] {
  const { key } = todayKeyAR(now);
  return sortShows(shows, now).filter((s) => !s.parsed || s.parsed.end >= key);
}

export function shortMonth(monthIndex: number) {
  return MONTHS[monthIndex].slice(0, 3).toUpperCase();
}

// El logo de la banda se cargaba como imagen por defecto de cada show; no aporta nada en la tarjeta.
export function hasCustomImage(show: Show) {
  return !!show.imagen && !/logo/i.test(decodeURIComponent(show.imagen));
}
