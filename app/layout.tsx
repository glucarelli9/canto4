import type { Metadata, Viewport } from "next";
import localFont from "next/font/local";
import { SITE_URL } from "@/lib/site";
import { MotionProviders, ScrollProgress } from "@/components/motion/providers";
import { SiteHeader } from "@/components/site-header";
import { SiteFooter } from "@/components/site-footer";
import { ScrollToTop } from "@/components/scroll-to-top";
import { Analytics } from "@vercel/analytics/next";
import "./globals.css";

const avigea = localFont({ src: "./fonts/Avigea.ttf", variable: "--font-avigea", display: "swap" });
const bahnschrift = localFont({ src: "./fonts/bahnschrift.ttf", variable: "--font-bahnschrift", display: "swap" });

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: { default: "Canto 4 - Banda Oficial", template: "%s | Canto 4" },
  description:
    "Sitio oficial de Canto 4, cuarteto salteño de música popular argentina. Próximos shows, videos, música y contrataciones.",
  openGraph: {
    type: "website",
    locale: "es_AR",
    siteName: "Canto 4",
    images: [{ url: "/img/Foto_canto_4_2025.png", alt: "Canto 4" }],
  },
};

export const viewport: Viewport = {
  themeColor: "#a41e32",
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    // data-scroll-behavior: Next 16 solo desactiva el scroll suave al cambiar de página si se declara acá; sin esto la página nueva abre a mitad de camino.
    <html lang="es-AR" data-scroll-behavior="smooth" className={`${avigea.variable} ${bahnschrift.variable}`}>
      <body className="flex min-h-dvh flex-col">
        <MotionProviders>
          <ScrollProgress />
          <ScrollToTop />
          <SiteHeader />
          {children}
          <SiteFooter />
        </MotionProviders>
        <Analytics />
      </body>
    </html>
  );
}
