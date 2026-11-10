import type { Metadata } from "next";
import { siSpotify, siYoutube } from "simple-icons";
import { Award } from "lucide-react";
import { SiteHeader } from "@/components/site-header";
import { SiteFooter } from "@/components/site-footer";
import { BrandIcon } from "@/components/social-links";
import { AWARDS, FEATURED_SONGS } from "@/lib/site";

export const metadata: Metadata = {
  title: "Nuestra historia",
  description:
    "Canto 4: cuarteto salteño con más de 25 años de trayectoria, consagrado en Cosquín, Jesús María y la Serenata a Cafayate.",
};

export default function BioPage() {
  return (
    <>
      <SiteHeader />
      <main className="flex-1 px-4 pb-20 pt-12 sm:px-6 sm:pt-16">
        <article className="mx-auto max-w-4xl">
          <header className="text-center">
            <h1 className="display text-6xl text-primary sm:text-7xl">
              Nuestra <span className="block text-foreground">historia</span>
            </h1>
            <div className="mx-auto mt-6 h-1 w-24 rounded-full bg-primary" />
          </header>

          <p className="mt-10 text-lg leading-relaxed">
            Con <strong className="text-primary">25 años de historia</strong> y una trayectoria llena de éxitos, Canto 4
            se embarca en su gira <strong>&lsquo;PRESENTE – 25 AÑOS&rsquo;</strong>, recorriendo cada rincón del país y
            expandiendo su música hacia el exterior. Desde sus inicios en la ciudad de Salta en <strong>1999</strong>,
            este cuarteto salteño ha dejado su marca en la música popular argentina.
          </p>

          <section aria-labelledby="premios" className="mt-10 rounded-2xl bg-primary/5 p-6 ring-1 ring-primary/10 sm:p-8">
            <h2 id="premios" className="flex items-center gap-2 text-2xl font-bold text-primary">
              <Award className="size-6" aria-hidden /> Premios y reconocimientos
            </h2>
            <ul className="mt-5 grid gap-3 sm:grid-cols-2">
              {AWARDS.map((a) => (
                <li key={a} className="flex gap-3">
                  <span className="mt-2 size-2 shrink-0 rounded-full bg-primary" aria-hidden />
                  {a}
                </li>
              ))}
            </ul>
          </section>

          <section aria-labelledby="album" className="mx-auto mt-10 max-w-2xl rounded-2xl bg-primary/10 p-6 text-center sm:p-8">
            <h2 id="album" className="text-3xl font-bold">
              Álbum <span className="text-primary">&lsquo;PRESENTE&rsquo;</span>
            </h2>
            <p className="mt-3 text-muted-foreground">
              Disponible en todas las plataformas digitales, tanto en formato de audio como de video. Presentado en agosto
              en la ciudad de Salta, actualmente recorre el país.
            </p>
          </section>

          <p className="mt-10 text-lg leading-relaxed">
            La incorporación de <strong className="text-primary">Mauro Burgos en 2022</strong>, en lugar de Facundo
            Rufino, aportó una nueva energía sin perder la esencia que caracteriza a Canto 4, enriqueciendo sus
            interpretaciones y llevando su propuesta a nuevos niveles.
          </p>

          <section aria-labelledby="temas" className="mt-10 rounded-2xl bg-ink p-6 text-white sm:p-8">
            <h2 id="temas" className="text-center text-2xl font-bold">
              Temas destacados
            </h2>
            <ul className="mt-6 grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
              {FEATURED_SONGS.map((song) => (
                <li key={song.title} className="flex items-center justify-between gap-3 rounded-xl bg-primary px-4 py-3">
                  <span className="font-semibold">{song.title}</span>
                  <span className="flex gap-2">
                    <a
                      href={song.spotify}
                      target="_blank"
                      rel="noopener noreferrer"
                      aria-label={`Escuchar ${song.title} en Spotify`}
                      className="flex size-10 items-center justify-center rounded-full bg-[#1db954] text-black transition-transform hover:scale-110"
                    >
                      <BrandIcon icon={siSpotify} className="size-5" />
                    </a>
                    <a
                      href={song.youtube}
                      target="_blank"
                      rel="noopener noreferrer"
                      aria-label={`Ver ${song.title} en YouTube`}
                      className="flex size-10 items-center justify-center rounded-full bg-white text-[#ff0000] transition-transform hover:scale-110"
                    >
                      <BrandIcon icon={siYoutube} className="size-5" />
                    </a>
                  </span>
                </li>
              ))}
            </ul>
          </section>

          <p className="mx-auto mt-10 max-w-2xl text-center text-lg italic leading-relaxed text-muted-foreground">
            Con <strong className="text-foreground">siete discos editados</strong> y una colección de singles, Canto 4
            sigue forjando su espacio en la música argentina, demostrando que su historia está más viva que nunca y que
            aún tiene muchos escenarios por conquistar.
          </p>
        </article>
      </main>
      <SiteFooter />
    </>
  );
}
