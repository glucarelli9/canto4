import Image from "next/image";
import Link from "next/link";
import { ArrowRight, BookOpen, CalendarDays } from "lucide-react";
import { SiteHeader } from "@/components/site-header";
import { SiteFooter } from "@/components/site-footer";
import { ShowCard } from "@/components/show-card";
import { getUpcomingShows } from "@/lib/shows";
import { SPOTIFY_EMBED, YOUTUBE_VIDEO_ID } from "@/lib/site";

export default async function Home() {
  const shows = await getUpcomingShows();
  const next = shows?.slice(0, 3) ?? [];

  return (
    <>
      <SiteHeader />
      <main className="flex-1">
        <section aria-label="Canto 4" className="relative">
          <h1 className="sr-only">Canto 4 - Banda Oficial</h1>
          <div className="mx-auto max-w-4xl px-4 pt-6 sm:pt-10">
            <Image
              src="/img/logo-c4.png"
              alt=""
              width={1080}
              height={504}
              priority
              sizes="(min-width: 896px) 640px, 72vw"
              className="mx-auto h-auto w-[72%]"
            />
            <Image
              src="/img/Foto_canto_4_2025.png"
              alt="Los cuatro integrantes de Canto 4"
              width={1404}
              height={1080}
              priority
              sizes="(min-width: 896px) 896px, 100vw"
              className="relative -mt-[22%] h-auto w-full"
            />
          </div>
        </section>

        <div className="slant-top -mt-[14vw] bg-primary pt-[16vw] text-primary-foreground md:-mt-[10vw] md:pt-[12vw]">
          <section id="miranos" className="mx-auto grid max-w-6xl items-center gap-8 px-4 py-12 sm:px-6 md:grid-cols-2 md:gap-12 md:py-16">
            <div className="text-center md:text-left">
              <h2 className="display text-6xl sm:text-7xl lg:text-8xl">
                Mira<br />nos
              </h2>
              <p className="mx-auto mt-5 max-w-md text-lg text-white/90 md:mx-0">
                Viví la energía de Canto 4 en cada presentación. Reviví los mejores momentos de nuestros shows.
              </p>
            </div>
            <div className="aspect-video overflow-hidden rounded-2xl bg-black/30 shadow-2xl ring-1 ring-white/20">
              <iframe
                src={`https://www.youtube-nocookie.com/embed/${YOUTUBE_VIDEO_ID}`}
                title="Canto 4 en YouTube"
                loading="lazy"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                referrerPolicy="strict-origin-when-cross-origin"
                allowFullScreen
                className="size-full"
              />
            </div>
          </section>

          <section id="escuchanos" className="mx-auto grid max-w-6xl items-center gap-8 px-4 pb-16 pt-4 sm:px-6 md:grid-cols-2 md:gap-12 md:pb-24">
            <div className="text-center md:order-2 md:text-right">
              <h2 className="display text-6xl sm:text-7xl lg:text-8xl">
                Escucha<br />nos
              </h2>
              <p className="mx-auto mt-5 max-w-md text-lg text-white/90 md:mr-0">
                Todos nuestros discos y singles, en todas las plataformas.
              </p>
            </div>
            <div className="overflow-hidden rounded-2xl bg-black/30 shadow-2xl md:order-1">
              <iframe
                src={SPOTIFY_EMBED}
                title="Canto 4 en Spotify"
                loading="lazy"
                allow="autoplay; clipboard-write; encrypted-media; fullscreen; picture-in-picture"
                className="h-[352px] w-full"
              />
            </div>
          </section>
        </div>

        <div className="slant-top relative -mt-[12vw] overflow-hidden bg-ink pt-[14vw] text-white md:-mt-[8vw] md:pt-[10vw]">
          <Image
            src="/img/muro-de-hormigon-de-colores-palidos.jpg"
            alt=""
            fill
            sizes="100vw"
            className="object-cover opacity-[0.07] mix-blend-screen"
          />
          <div className="relative mx-auto max-w-6xl px-4 pb-20 pt-8 sm:px-6">
            <section aria-labelledby="proximos-shows">
              <div className="flex flex-col items-center gap-6 text-center sm:flex-row sm:items-end sm:justify-between sm:text-left">
                <h2 id="proximos-shows" className="display text-5xl sm:text-6xl lg:text-7xl">
                  Próximos <span className="block text-[#e5333f]">shows</span>
                </h2>
                <Link
                  href="/shows"
                  className="inline-flex min-h-11 items-center gap-2 rounded-full bg-background px-5 font-semibold text-primary transition-colors hover:bg-white"
                >
                  <CalendarDays className="size-4" aria-hidden />
                  Ver todos los shows
                </Link>
              </div>

              {next.length > 0 ? (
                <ul className="mt-10 grid gap-5 md:grid-cols-3">
                  {next.map((show) => (
                    <li key={show.id}>
                      <ShowCard show={show} compact />
                    </li>
                  ))}
                </ul>
              ) : (
                <p className="mt-10 rounded-2xl bg-white/5 p-6 text-center text-white/80">
                  {shows === null
                    ? "No pudimos cargar la agenda en este momento. Probá de nuevo en un rato."
                    : "Pronto anunciamos nuevas fechas. Seguinos en redes para enterarte primero."}
                </p>
              )}
            </section>

            <section
              aria-labelledby="nuestra-historia"
              className="mt-20 flex flex-col items-center gap-6 border-t border-white/10 pt-16 text-center md:flex-row md:justify-between md:text-left"
            >
              <div>
                <h2 id="nuestra-historia" className="display text-5xl sm:text-6xl lg:text-7xl">
                  <span className="text-[#e5333f]">Nuestra</span> historia
                </h2>
                <p className="mt-4 max-w-xl text-lg text-white/80">
                  Más de 25 años de música popular argentina, desde Salta para todo el país.
                </p>
              </div>
              <Link
                href="/bio"
                className="inline-flex min-h-11 shrink-0 items-center gap-2 rounded-full bg-background px-5 font-semibold text-primary transition-colors hover:bg-white"
              >
                <BookOpen className="size-4" aria-hidden />
                Leer la historia
                <ArrowRight className="size-4" aria-hidden />
              </Link>
            </section>
          </div>
        </div>
      </main>
      <SiteFooter />
    </>
  );
}
