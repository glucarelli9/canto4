import type { Metadata } from "next";
import { siSpotify, siYoutube } from "simple-icons";
import { Disc3, Music4, Sparkles, Trophy } from "lucide-react";
import { SiteHeader } from "@/components/site-header";
import { SiteFooter } from "@/components/site-footer";
import { BrandIcon } from "@/components/social-links";
import { Counter } from "@/components/motion/counter";
import { Reveal, RevealHeading, StaggerItem, StaggerList } from "@/components/motion/reveal";
import { AWARDS, FEATURED_SONGS } from "@/lib/site";

export const metadata: Metadata = {
  title: "Nuestra historia",
  description:
    "Canto 4: cuarteto salteño con más de 25 años de trayectoria, consagrado en Cosquín, Jesús María y la Serenata a Cafayate.",
};

const STATS = [
  { value: 25, prefix: "+", label: "años de historia" },
  { value: 7, prefix: "", label: "discos editados" },
  { value: 1999, from: 1950, prefix: "", label: "desde Salta" },
];

export default function BioPage() {
  return (
    <>
      <SiteHeader />
      <main className="flex-1 overflow-x-clip">
        <header className="relative px-4 pb-10 pt-14 text-center sm:pt-20">
          <div aria-hidden className="pointer-events-none absolute left-1/2 top-0 -z-10 h-72 w-[40rem] -translate-x-1/2 rounded-full bg-primary/15 blur-[100px]" />
          <RevealHeading
            as="h1"
            lines={["Nuestra", "historia"]}
            lineClassNames={["text-primary", ""]}
            className="display text-6xl sm:text-7xl lg:text-8xl"
          />
          <Reveal delay={0.3}>
            <div className="mx-auto mt-6 h-1 w-24 rounded-full bg-gradient-to-r from-primary to-[#e5333f]" />
          </Reveal>
        </header>

        <article className="mx-auto max-w-5xl px-4 pb-24 sm:px-6">
          <StaggerList className="grid grid-cols-3 gap-3 sm:gap-5">
            {STATS.map((s) => (
              <StaggerItem
                key={s.label}
                className="rounded-3xl bg-card p-4 text-center shadow-[0_10px_30px_-15px_rgb(0_0_0/0.3)] ring-1 ring-black/5 sm:p-6"
              >
                <p className="display text-4xl text-primary sm:text-6xl">
                  <Counter to={s.value} from={s.from ?? 0} prefix={s.prefix} />
                </p>
                <p className="mt-2 text-xs font-semibold uppercase tracking-wider text-muted-foreground sm:text-sm">{s.label}</p>
              </StaggerItem>
            ))}
          </StaggerList>

          <Reveal className="mx-auto mt-14 max-w-3xl">
            <p className="text-lg leading-relaxed sm:text-xl">
              Con <strong className="text-primary">25 años de historia</strong> y una trayectoria llena de éxitos, Canto 4
              se embarca en su gira <strong>&lsquo;PRESENTE – 25 AÑOS&rsquo;</strong>, recorriendo cada rincón del país y
              expandiendo su música hacia el exterior. Desde sus inicios en la ciudad de Salta en <strong>1999</strong>,
              este cuarteto salteño ha dejado su marca en la música popular argentina.
            </p>
          </Reveal>

          <section aria-labelledby="premios" className="mt-14">
            <Reveal>
              <h2 id="premios" className="flex items-center justify-center gap-3 text-2xl font-bold sm:text-3xl">
                <Trophy className="size-7 text-primary" aria-hidden /> Premios y reconocimientos
              </h2>
            </Reveal>
            <StaggerList className="mt-8 grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
              {AWARDS.map((a) => (
                <StaggerItem
                  key={a}
                  className="group/aw flex items-center gap-4 rounded-2xl bg-card p-4 ring-1 ring-black/5 transition-[transform,box-shadow] duration-300 hover:-translate-y-1 hover:shadow-lg"
                >
                  <span className="flex size-11 shrink-0 items-center justify-center rounded-xl bg-primary/10 text-primary transition-colors group-hover/aw:bg-primary group-hover/aw:text-white">
                    <Trophy className="size-5" aria-hidden />
                  </span>
                  <span className="font-semibold leading-snug">{a}</span>
                </StaggerItem>
              ))}
            </StaggerList>
          </section>

          <Reveal className="mt-14">
            <section
              aria-labelledby="album"
              className="relative mx-auto max-w-3xl overflow-hidden rounded-3xl bg-gradient-to-br from-primary to-[#6e1020] p-8 text-center text-white shadow-[0_30px_60px_-25px_rgb(164_30_50/0.7)] sm:p-10"
            >
              <Disc3
                className="pointer-events-none absolute -right-10 -top-10 size-48 text-white/10 motion-safe:animate-[spin_12s_linear_infinite]"
                aria-hidden
              />
              <p className="text-xs font-bold uppercase tracking-[0.3em] text-white/70">Último álbum</p>
              <h2 id="album" className="display mt-3 text-5xl sm:text-6xl">
                Presente
              </h2>
              <p className="mx-auto mt-4 max-w-xl text-white/90">
                Disponible en todas las plataformas digitales, tanto en formato de audio como de video. Presentado en
                agosto en la ciudad de Salta, actualmente recorre el país.
              </p>
            </section>
          </Reveal>

          <Reveal className="mx-auto mt-14 max-w-3xl">
            <p className="text-lg leading-relaxed sm:text-xl">
              La incorporación de <strong className="text-primary">Mauro Burgos en 2022</strong>, en lugar de Facundo
              Rufino, aportó una nueva energía sin perder la esencia que caracteriza a Canto 4, enriqueciendo sus
              interpretaciones y llevando su propuesta a nuevos niveles.
            </p>
          </Reveal>

          <section aria-labelledby="temas" className="mt-14 rounded-[2rem] bg-ink p-6 text-white sm:p-10">
            <Reveal>
              <h2 id="temas" className="flex items-center justify-center gap-3 text-2xl font-bold sm:text-3xl">
                <Music4 className="size-7 text-[#ff4655]" aria-hidden /> Temas destacados
              </h2>
            </Reveal>
            <StaggerList className="mt-8 grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
              {FEATURED_SONGS.map((song, i) => (
                <StaggerItem
                  key={song.title}
                  className="group/song flex items-center justify-between gap-3 rounded-2xl bg-white/5 px-4 py-3 ring-1 ring-white/10 transition-colors hover:bg-primary"
                >
                  <span className="flex items-center gap-3">
                    <span className="text-xs font-semibold tabular-nums text-white/40 group-hover/song:text-white/70">
                      {String(i + 1).padStart(2, "0")}
                    </span>
                    <span className="font-semibold">{song.title}</span>
                  </span>
                  <span className="flex gap-2">
                    <a
                      href={song.spotify}
                      target="_blank"
                      rel="noopener noreferrer"
                      aria-label={`Escuchar ${song.title} en Spotify`}
                      className="flex size-10 items-center justify-center rounded-full bg-[#1db954] text-black transition-transform duration-300 hover:scale-110 active:scale-95"
                    >
                      <BrandIcon icon={siSpotify} className="size-5" />
                    </a>
                    <a
                      href={song.youtube}
                      target="_blank"
                      rel="noopener noreferrer"
                      aria-label={`Ver ${song.title} en YouTube`}
                      className="flex size-10 items-center justify-center rounded-full bg-white text-[#ff0000] transition-transform duration-300 hover:scale-110 active:scale-95"
                    >
                      <BrandIcon icon={siYoutube} className="size-5" />
                    </a>
                  </span>
                </StaggerItem>
              ))}
            </StaggerList>
          </section>

          <Reveal className="mx-auto mt-14 max-w-2xl text-center">
            <Sparkles className="mx-auto size-6 text-primary" aria-hidden />
            <p className="mt-4 text-lg italic leading-relaxed text-muted-foreground sm:text-xl">
              Con <strong className="text-foreground">siete discos editados</strong> y una colección de singles, Canto 4
              sigue forjando su espacio en la música argentina, demostrando que su historia está más viva que nunca y que
              aún tiene muchos escenarios por conquistar.
            </p>
          </Reveal>
        </article>
      </main>
      <SiteFooter />
    </>
  );
}
