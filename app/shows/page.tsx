import type { Metadata } from "next";
import { Mail, Phone } from "lucide-react";
import { SiteHeader } from "@/components/site-header";
import { SiteFooter } from "@/components/site-footer";
import { ShowCard } from "@/components/show-card";
import { getUpcomingShows } from "@/lib/shows";
import { BOOKING_EMAIL, BOOKING_PHONE_DISPLAY, BOOKING_PHONE_TEL, SOCIAL } from "@/lib/site";

export const metadata: Metadata = {
  title: "Próximos shows",
  description: "Agenda de shows de Canto 4: fechas, lugares y entradas.",
};

export default async function ShowsPage() {
  const shows = await getUpcomingShows();

  return (
    <>
      <SiteHeader />
      <main className="flex-1">
        <section className="bg-gradient-to-b from-primary/15 to-transparent px-4 pb-8 pt-12 text-center sm:pt-16">
          <h1 className="display text-6xl text-primary sm:text-7xl">
            Próximos <span className="block text-foreground">shows</span>
          </h1>
          <p className="mx-auto mt-5 max-w-xl text-lg text-muted-foreground">
            No te pierdas la oportunidad de ver a Canto 4 en vivo. Viví la magia de la música en cada presentación.
          </p>
          <div className="mx-auto mt-6 h-1 w-24 rounded-full bg-primary" />
        </section>

        <section aria-label="Agenda" className="mx-auto max-w-6xl px-4 pb-20 sm:px-6">
          {shows && shows.length > 0 ? (
            <ul className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
              {shows.map((show) => (
                <li key={show.id}>
                  <ShowCard show={show} />
                </li>
              ))}
            </ul>
          ) : (
            <div className="mx-auto max-w-xl rounded-2xl bg-card p-8 text-center shadow-md">
              <h2 className="text-xl font-bold">
                {shows === null ? "No pudimos cargar la agenda" : "Próximamente anunciaremos nuevos shows"}
              </h2>
              <p className="mt-2 text-muted-foreground">
                {shows === null
                  ? "Probá de nuevo en unos minutos."
                  : "Estamos trabajando en la próxima gira. Seguinos en redes para enterarte primero."}
              </p>
              <a
                href={SOCIAL.instagram}
                target="_blank"
                rel="noopener noreferrer"
                className="mt-5 inline-flex min-h-11 items-center rounded-full bg-primary px-5 font-semibold text-primary-foreground hover:bg-primary-strong"
              >
                Seguinos en Instagram
              </a>
            </div>
          )}
        </section>

        <section className="bg-primary px-4 py-16 text-center text-primary-foreground">
          <h2 className="mx-auto max-w-2xl text-3xl font-bold text-balance sm:text-4xl">
            ¿Querés que Canto 4 toque en tu ciudad?
          </h2>
          <p className="mx-auto mt-4 max-w-xl text-lg text-white/90">
            Contactá a nuestro equipo de management para propuestas y contrataciones.
          </p>
          <div className="mt-8 flex flex-col items-center justify-center gap-3 sm:flex-row">
            <a
              href={`tel:${BOOKING_PHONE_TEL}`}
              className="inline-flex min-h-12 w-full max-w-xs items-center justify-center gap-2 rounded-lg bg-ink px-6 font-semibold text-white hover:bg-black sm:w-auto"
            >
              <Phone className="size-4" aria-hidden /> Llamar {BOOKING_PHONE_DISPLAY}
            </a>
            <a
              href={`mailto:${BOOKING_EMAIL}`}
              className="inline-flex min-h-12 w-full max-w-xs items-center justify-center gap-2 rounded-lg bg-background px-6 font-semibold text-primary hover:bg-white sm:w-auto"
            >
              <Mail className="size-4" aria-hidden /> Enviar email
            </a>
          </div>
        </section>
      </main>
      <SiteFooter />
    </>
  );
}
