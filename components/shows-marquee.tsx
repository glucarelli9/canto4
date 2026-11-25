import Link from "next/link";
import { shortMonth, type DatedShow } from "@/lib/shows-core";

export function ShowsMarquee({ shows }: { shows: DatedShow[] }) {
  if (shows.length === 0) return null;
  const items = shows.slice(0, 8);
  const row = (hidden: boolean) => (
    <ul className="flex shrink-0 items-center gap-10 pr-10" aria-hidden={hidden || undefined}>
      {items.map((s) => (
        <li key={s.id} className="flex items-center gap-3 whitespace-nowrap">
          <span className="text-[#ff5a66]" aria-hidden>
            ✦
          </span>
          <span className="font-bold">
            {s.parsed ? `${String(s.parsed.day).padStart(2, "0")} ${shortMonth(s.parsed.month)}` : s.fecha}
          </span>
          <span className="text-white/75">{s.ciudad || s.lugar}</span>
        </li>
      ))}
    </ul>
  );

  return (
    <Link
      href="/shows"
      aria-label="Ver la agenda completa de shows"
      className="group/mq relative z-30 block -rotate-1 overflow-hidden bg-primary py-3 text-sm uppercase tracking-widest text-white shadow-xl sm:text-base"
    >
      <div className="marquee flex w-max group-hover/mq:[animation-play-state:paused]">
        {row(false)}
        {row(true)}
      </div>
    </Link>
  );
}
