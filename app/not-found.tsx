import Link from "next/link";
import { SiteHeader } from "@/components/site-header";
import { SiteFooter } from "@/components/site-footer";

export default function NotFound() {
  return (
    <>
      <SiteHeader />
      <main className="flex flex-1 flex-col items-center justify-center px-4 py-24 text-center">
        <p className="display text-8xl text-primary">404</p>
        <h1 className="mt-4 text-2xl font-bold">Esta página no existe</h1>
        <p className="mt-2 text-muted-foreground">Puede que el link esté mal escrito o que la página se haya movido.</p>
        <Link
          href="/"
          className="mt-8 inline-flex min-h-11 items-center rounded-full bg-primary px-6 font-semibold text-primary-foreground hover:bg-primary-strong"
        >
          Volver al inicio
        </Link>
      </main>
      <SiteFooter />
    </>
  );
}
