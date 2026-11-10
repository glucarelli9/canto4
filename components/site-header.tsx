"use client";

import Image from "next/image";
import Link from "next/link";
import { useEffect, useRef, useState } from "react";
import { Menu, X } from "lucide-react";
import { SocialLinks } from "./social-links";

const NAV = [
  { label: "Miranos", href: "/#miranos" },
  { label: "Escuchanos", href: "/#escuchanos" },
  { label: "Shows", href: "/shows" },
  { label: "Nuestra historia", href: "/bio" },
  { label: "Contacto", href: "#contacto" },
];

export function SiteHeader() {
  const [open, setOpen] = useState(false);
  const closeRef = useRef<HTMLButtonElement>(null);
  const toggleRef = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    if (!open) return;
    const prev = document.documentElement.style.overflow;
    document.documentElement.style.overflow = "hidden";
    closeRef.current?.focus();
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && setOpen(false);
    window.addEventListener("keydown", onKey);
    const toggle = toggleRef.current;
    return () => {
      document.documentElement.style.overflow = prev;
      window.removeEventListener("keydown", onKey);
      toggle?.focus();
    };
  }, [open]);

  return (
    <>
    <header className="sticky top-0 z-40 border-b border-foreground/10 bg-background/90 backdrop-blur">
      <div className="mx-auto flex h-16 max-w-6xl items-center justify-between gap-4 px-4 sm:px-6">
        <Link href="/" aria-label="Canto 4 - inicio" className="shrink-0">
          <Image src="/img/logo-c4.png" alt="Canto 4" width={1080} height={504} priority className="h-9 w-auto" />
        </Link>

        <SocialLinks size="sm" className="hidden lg:flex" />

        <nav aria-label="Principal" className="hidden md:block">
          <ul className="flex items-center gap-5 text-sm font-semibold uppercase tracking-wide">
            {NAV.map((item) => (
              <li key={item.href}>
                <Link href={item.href} className="py-2 transition-colors hover:text-primary">
                  {item.label}
                </Link>
              </li>
            ))}
          </ul>
        </nav>

        <button
          ref={toggleRef}
          type="button"
          onClick={() => setOpen(true)}
          aria-expanded={open}
          aria-controls="menu-movil"
          className="flex size-11 items-center justify-center rounded-full hover:bg-primary/10 md:hidden"
        >
          <Menu className="size-6" aria-hidden />
          <span className="sr-only">Abrir menú</span>
        </button>
      </div>
    </header>

      {/* Fuera del <header>: su backdrop-blur convertiría al header en el contenedor de los elementos fixed. */}
      <div
        className={`fixed inset-0 z-50 overflow-hidden md:hidden ${open ? "visible" : "invisible"}`}
        aria-hidden={!open}
      >
        <div
          className={`absolute inset-0 bg-black/60 backdrop-blur-sm transition-opacity duration-300 ${open ? "opacity-100" : "opacity-0"}`}
          onClick={() => setOpen(false)}
        />
        <div
          id="menu-movil"
          role="dialog"
          aria-modal="true"
          aria-label="Menú"
          className={`absolute inset-y-0 right-0 flex w-[min(20rem,85vw)] flex-col bg-primary text-primary-foreground shadow-2xl transition-transform duration-300 ${open ? "translate-x-0" : "translate-x-full"}`}
        >
          <div className="flex h-16 items-center justify-end px-4">
            <button
              ref={closeRef}
              type="button"
              onClick={() => setOpen(false)}
              className="flex size-11 items-center justify-center rounded-full hover:bg-white/15"
            >
              <X className="size-6" aria-hidden />
              <span className="sr-only">Cerrar menú</span>
            </button>
          </div>
          <nav aria-label="Principal móvil" className="flex-1 overflow-y-auto px-6">
            <ul className="space-y-1">
              {NAV.map((item) => (
                <li key={item.href}>
                  <Link
                    href={item.href}
                    onClick={() => setOpen(false)}
                    className="block border-l-4 border-transparent py-3 pl-4 text-2xl font-extrabold uppercase transition-colors hover:border-white"
                  >
                    {item.label}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>
          <div className="p-6 [&_a]:bg-white/15 [&_a]:text-white">
            <SocialLinks size="sm" />
          </div>
        </div>
      </div>
    </>
  );
}
