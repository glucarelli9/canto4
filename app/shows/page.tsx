import type { Metadata } from "next";
import { CalendarX2, Mail, Phone } from "lucide-react";
import { siInstagram } from "simple-icons";
import { BrandIcon } from "@/components/social-links";
import { SiteHeader } from "@/components/site-header";
import { SiteFooter } from "@/components/site-footer";
import { ShowCard } from "@/components/show-card";
import { ButtonLink } from "@/components/ui/button";
import { Reveal, RevealHeading, StaggerItem, StaggerList } from "@/components/motion/reveal";
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
      <main className="flex-1 overflow-x-clip">
        <section className="relative px-4 pb-10 pt-14 text-center sm:pt-20">
          <div aria-hidden className="pointer-events-none absolute left-1/2 top-0 -z-10 h-72 w-[40rem] -translate-x-1/2 rounded-full bg-primary/20 blur-[100px]" />
          <RevealHeading
            as="h1"
            lines={["Próximos", "shows"]}
            lineClassNames={["text-primary", ""]}
            className="display text-6xl sm:text-7xl lg:text-8xl"
          />
          <Reveal delay={0.25}>
            <p className="mx-auto mt-6 max-w-xl text-lg text-muted-foreground">
              No te pierdas la oportunidad de ver a Canto 4 en vivo. Viví la magia de la música en cada presentación.
            </p>
            {shows && shows.length > 0 && (
              <p className="mt-4 inline-flex items-center gap-2 rounded-full bg-card px-4 py-1.5 text-sm font-semibold shadow-sm ring-1 ring-black/5">
                <span className="relative flex size-2">
                  <span className="absolute inline-flex size-full animate-ping rounded-full bg-primary/60 motion-reduce:hidden" />
                  <span className="relative inline-flex size-2 rounded-full bg-primary" />
                </span>
                {shows.length} {shows.length === 1 ? "fecha confirmada" : "fechas confirmadas"}
              </p>
            )}
          </Reveal>
        </section>

        <section aria-label="Agenda" className="mx-auto max-w-6xl px-4 pb-24 sm:px-6">
          {shows && shows.length > 0 ? (
            <StaggerList className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
              {shows.map((show) => (
                <StaggerItem key={show.id}>
                  <ShowCard show={show} />
                </StaggerItem>
              ))}
            </StaggerList>
          ) : (
            <Reveal className="mx-auto max-w-xl rounded-3xl bg-card p-10 text-center shadow-lg">
              <CalendarX2 className="mx-auto size-10 text-primary" aria-hidden />
              <h2 className="mt-4 text-xl font-bold">
                {shows === null ? "No pudimos cargar la agenda" : "Próximamente anunciaremos nuevos shows"}
              </h2>
              <p className="mt-2 text-muted-foreground">
                {shows === null
                  ? "Probá de nuevo en unos minutos."
                  : "Estamos trabajando en la próxima gira. Seguinos en redes para enterarte primero."}
              </p>
              <ButtonLink href={SOCIAL.instagram} className="mt-6" icon={<BrandIcon icon={siInstagram} />}>
                Seguinos en Instagram
              </ButtonLink>
            </Reveal>
          )}
        </section>

        <section className="relative overflow-hidden bg-gradient-to-br from-primary to-[#6e1020] px-4 py-20 text-center text-primary-foreground">
          <div aria-hidden className="pointer-events-none absolute -right-20 -top-20 size-80 rounded-full bg-white/10 blur-3xl" />
          <RevealHeading
            lines={["¿Querés que Canto 4", "toque en tu ciudad?"]}
            className="relative mx-auto max-w-3xl text-3xl font-bold sm:text-5xl"
          />
          <Reveal delay={0.2}>
            <p className="mx-auto mt-5 max-w-xl text-lg text-white/90">
              Contactá a nuestro equipo de management para propuestas y contrataciones.
            </p>
          </Reveal>
          <Reveal delay={0.3} className="mt-9 flex flex-col items-center justify-center gap-3 sm:flex-row">
            <ButtonLink href={`tel:${BOOKING_PHONE_TEL}`} variant="dark" size="lg" icon={<Phone aria-hidden />} className="w-full max-w-xs sm:w-auto">
              Llamar {BOOKING_PHONE_DISPLAY}
            </ButtonLink>
            <ButtonLink href={`mailto:${BOOKING_EMAIL}`} variant="light" size="lg" icon={<Mail aria-hidden />} className="w-full max-w-xs sm:w-auto">
              Enviar email
            </ButtonLink>
          </Reveal>
        </section>
      </main>
      <SiteFooter />
    </>
  );
}
