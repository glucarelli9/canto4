import Image from "next/image";
import { ArrowRight, BookOpen, CalendarDays, Headphones } from "lucide-react";
import { SiteHeader } from "@/components/site-header";
import { SiteFooter } from "@/components/site-footer";
import { ShowCard } from "@/components/show-card";
import { ShowsMarquee } from "@/components/shows-marquee";
import { Hero } from "@/components/hero";
import { LiteYouTube } from "@/components/lite-youtube";
import { ButtonLink } from "@/components/ui/button";
import { Reveal, RevealHeading, StaggerItem, StaggerList } from "@/components/motion/reveal";
import { getUpcomingShows } from "@/lib/shows";
import { SOCIAL, SPOTIFY_EMBED, YOUTUBE_VIDEO_ID, YOUTUBE_VIDEO_TITLE } from "@/lib/site";

export default async function Home() {
  const shows = await getUpcomingShows();
  const next = shows?.slice(0, 3) ?? [];

  return (
    <>
      <SiteHeader />
      <main className="flex-1">
        <Hero />

        <div className="slant-top relative z-10 -mt-[14vw] bg-primary pt-[16vw] text-primary-foreground md:-mt-[10vw] md:pt-[12vw]">
          <div aria-hidden className="pointer-events-none absolute inset-0 bg-[radial-gradient(60%_50%_at_80%_20%,rgb(255_255_255/0.12),transparent_70%)]" />
          <section id="miranos" className="relative mx-auto grid max-w-6xl items-center gap-8 px-4 py-12 sm:px-6 md:grid-cols-2 md:gap-12 md:py-16">
            <div className="text-center md:text-left">
              <RevealHeading lines={["Mira", "nos"]} className="display text-6xl sm:text-7xl lg:text-8xl" />
              <Reveal delay={0.2}>
                <p className="mx-auto mt-5 max-w-md text-lg text-white/90 md:mx-0">
                  Viví la energía de Canto 4 en cada presentación. Reviví los mejores momentos de nuestros shows.
                </p>
              </Reveal>
              <Reveal delay={0.3} className="mt-7 flex justify-center md:justify-start">
                <ButtonLink href={SOCIAL.youtube} variant="light" trailing={<ArrowRight aria-hidden />}>
                  Más videos en YouTube
                </ButtonLink>
              </Reveal>
            </div>
            <Reveal from="right" delay={0.1}>
              <div className="aspect-video overflow-hidden rounded-3xl bg-black/30 shadow-[0_30px_60px_-20px_rgb(0_0_0/0.6)] ring-1 ring-white/20 transition-transform duration-500 hover:-rotate-1 hover:scale-[1.02]">
                <LiteYouTube id={YOUTUBE_VIDEO_ID} title={YOUTUBE_VIDEO_TITLE} />
              </div>
            </Reveal>
          </section>

          <section id="escuchanos" className="relative mx-auto grid max-w-6xl items-center gap-8 px-4 pb-20 pt-4 sm:px-6 md:grid-cols-2 md:gap-12 md:pb-28">
            <div className="text-center md:order-2 md:text-right">
              <RevealHeading lines={["Escucha", "nos"]} className="display text-6xl sm:text-7xl lg:text-8xl" />
              <Reveal delay={0.2}>
                <p className="mx-auto mt-5 max-w-md text-lg text-white/90 md:mr-0">
                  Todos nuestros discos y singles, en todas las plataformas.
                </p>
              </Reveal>
              <Reveal delay={0.3} className="mt-7 flex justify-center md:justify-end">
                <ButtonLink href={SOCIAL.spotify} variant="light" icon={<Headphones aria-hidden />}>
                  Seguinos en Spotify
                </ButtonLink>
              </Reveal>
            </div>
            <Reveal from="left" delay={0.1} className="md:order-1">
              <div className="overflow-hidden rounded-3xl bg-black/30 shadow-[0_30px_60px_-20px_rgb(0_0_0/0.6)] ring-1 ring-white/20">
                <iframe
                  src={SPOTIFY_EMBED}
                  title="Canto 4 en Spotify"
                  loading="lazy"
                  allow="autoplay; clipboard-write; encrypted-media; fullscreen; picture-in-picture"
                  className="block h-[352px] w-full"
                />
              </div>
            </Reveal>
          </section>
        </div>

        <div className="slant-top relative z-20 -mt-[12vw] overflow-hidden bg-ink pt-[14vw] text-white md:-mt-[8vw] md:pt-[10vw]">
          <Image
            src="/img/muro-de-hormigon-de-colores-palidos.jpg"
            alt=""
            fill
            sizes="100vw"
            className="object-cover opacity-[0.07] mix-blend-screen"
          />
          <div aria-hidden className="pointer-events-none absolute -left-40 top-1/3 size-[30rem] rounded-full bg-primary/25 blur-[120px]" />

          {shows && <ShowsMarquee shows={shows} />}

          <div className="relative mx-auto max-w-6xl px-4 pb-24 pt-14 sm:px-6">
            <section aria-labelledby="proximos-shows">
              <div className="flex flex-col items-center gap-6 text-center sm:flex-row sm:items-end sm:justify-between sm:text-left">
                <RevealHeading
                  id="proximos-shows"
                  lines={["Próximos", "shows"]}
                  lineClassNames={["", "text-[#ff4655]"]}
                  className="display text-5xl sm:text-6xl lg:text-7xl"
                />
                <Reveal delay={0.2}>
                  <ButtonLink href="/shows" variant="light" icon={<CalendarDays aria-hidden />} trailing={<ArrowRight aria-hidden />}>
                    Ver todos los shows
                  </ButtonLink>
                </Reveal>
              </div>

              {next.length > 0 ? (
                <StaggerList className="mt-10 grid gap-5 md:grid-cols-3">
                  {next.map((show) => (
                    <StaggerItem key={show.id}>
                      <ShowCard show={show} compact />
                    </StaggerItem>
                  ))}
                </StaggerList>
              ) : (
                <p className="mt-10 rounded-3xl bg-white/5 p-6 text-center text-white/80 ring-1 ring-white/10">
                  {shows === null
                    ? "No pudimos cargar la agenda en este momento. Probá de nuevo en un rato."
                    : "Pronto anunciamos nuevas fechas. Seguinos en redes para enterarte primero."}
                </p>
              )}
            </section>

            <section
              aria-labelledby="nuestra-historia"
              className="mt-24 flex flex-col items-center gap-8 border-t border-white/10 pt-16 text-center md:flex-row md:justify-between md:text-left"
            >
              <div>
                <RevealHeading
                  id="nuestra-historia"
                  lines={["Nuestra", "historia"]}
                  lineClassNames={["text-[#ff4655]", ""]}
                  className="display text-5xl sm:text-6xl lg:text-7xl"
                />
                <Reveal delay={0.2}>
                  <p className="mt-5 max-w-xl text-lg text-white/80">
                    Más de 25 años de música popular argentina, desde Salta para todo el país.
                  </p>
                </Reveal>
              </div>
              <Reveal delay={0.3} className="shrink-0">
                <ButtonLink href="/bio" variant="primary" size="lg" icon={<BookOpen aria-hidden />} trailing={<ArrowRight aria-hidden />}>
                  Leer la historia
                </ButtonLink>
              </Reveal>
            </section>
          </div>
        </div>
      </main>
      <SiteFooter />
    </>
  );
}
