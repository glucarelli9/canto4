import { ArrowLeft } from "lucide-react";
import { ButtonLink } from "@/components/ui/button";

export default function NotFound() {
  return (
    <>
      <main className="flex flex-1 flex-col items-center justify-center px-4 py-24 text-center">
        <p className="display text-8xl text-primary sm:text-9xl">404</p>
        <h1 className="mt-4 text-2xl font-bold">Esta página no existe</h1>
        <p className="mt-2 text-muted-foreground">Puede que el link esté mal escrito o que la página se haya movido.</p>
        <ButtonLink href="/" size="lg" className="mt-8" icon={<ArrowLeft aria-hidden />}>
          Volver al inicio
        </ButtonLink>
      </main>
    </>
  );
}
