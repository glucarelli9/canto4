import Image from "next/image";
import { Mail, Phone } from "lucide-react";
import { BOOKING_EMAIL, BOOKING_PHONE_DISPLAY, BOOKING_PHONE_TEL } from "@/lib/site";
import { SocialLinks } from "./social-links";

export function SiteFooter() {
  return (
    <footer id="contacto" className="border-t border-foreground/10 bg-background px-4 py-14 text-center">
      <div className="mx-auto flex max-w-2xl flex-col items-center gap-6">
        <SocialLinks />
        <Image src="/img/logo-c4.png" alt="Canto 4" width={1080} height={504} className="h-20 w-auto sm:h-24" />
        <div className="space-y-3">
          <h2 className="text-sm font-bold uppercase tracking-widest text-primary">Management / Booking</h2>
          <div className="flex flex-col items-center gap-2 sm:flex-row sm:justify-center">
            <a
              href={`tel:${BOOKING_PHONE_TEL}`}
              className="inline-flex min-h-11 items-center gap-2 whitespace-nowrap rounded-full px-4 font-semibold hover:bg-primary/10"
            >
              <Phone className="size-4 text-primary" aria-hidden />
              {BOOKING_PHONE_DISPLAY}
            </a>
            <a
              href={`mailto:${BOOKING_EMAIL}`}
              className="inline-flex min-h-11 items-center gap-2 whitespace-nowrap rounded-full px-4 font-semibold hover:bg-primary/10"
            >
              <Mail className="size-4 text-primary" aria-hidden />
              {BOOKING_EMAIL}
            </a>
          </div>
        </div>
        <p className="display text-2xl normal-case text-primary">Yo Febrero y ella Carnaval.</p>
        <p className="text-xs text-muted-foreground">© Canto 4 · Salta, Argentina</p>
      </div>
    </footer>
  );
}
