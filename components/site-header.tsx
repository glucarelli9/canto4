"use client";

import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useRef, useState } from "react";
import { AnimatePresence, motion, useMotionValueEvent, useScroll } from "motion/react";
import { ArrowUpRight, Menu, X } from "lucide-react";
import { SocialLinks } from "./social-links";

const NAV = [
  { label: "Miranos", href: "/#miranos" },
  { label: "Escuchanos", href: "/#escuchanos" },
  { label: "Shows", href: "/shows" },
  { label: "Nuestra historia", href: "/bio" },
  { label: "Contacto", href: "#contacto" },
];

const EASE = [0.22, 1, 0.36, 1] as const;

export function SiteHeader() {
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const pathname = usePathname();
  const closeRef = useRef<HTMLButtonElement>(null);
  const toggleRef = useRef<HTMLButtonElement>(null);
  const { scrollY } = useScroll();

  useMotionValueEvent(scrollY, "change", (y) => setScrolled(y > 24));

  useEffect(() => {
    if (!open) return;
    const prev = document.documentElement.style.overflow;
    document.documentElement.style.overflow = "hidden";
    // Sin preventScroll, enfocar el botón mientras el panel entra desplazaría la vista y cortaría la animación.
    closeRef.current?.focus({ preventScroll: true });
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && setOpen(false);
    window.addEventListener("keydown", onKey);
    const toggle = toggleRef.current;
    return () => {
      document.documentElement.style.overflow = prev;
      window.removeEventListener("keydown", onKey);
      toggle?.focus({ preventScroll: true });
    };
  }, [open]);

  return (
    <>
      <header
        className={`sticky top-0 z-40 border-b backdrop-blur-md transition-[background-color,box-shadow,border-color] duration-300 ${
          scrolled ? "border-foreground/10 bg-background/85 shadow-[0_8px_30px_-12px_rgb(0_0_0/0.25)]" : "border-transparent bg-background/60"
        }`}
      >
        <div
          className={`mx-auto flex max-w-6xl items-center justify-between gap-4 px-4 transition-[height] duration-300 sm:px-6 ${scrolled ? "h-14" : "h-16 sm:h-18"}`}
        >
          <Link href="/" aria-label="Canto 4 - inicio" className="shrink-0 transition-transform duration-300 hover:scale-105">
            <Image
              src="/img/logo-c4.png"
              alt="Canto 4"
              width={1080}
              height={504}
              priority
              className={`w-auto transition-[height] duration-300 ${scrolled ? "h-8" : "h-9 sm:h-10"}`}
            />
          </Link>

          <SocialLinks size="sm" className="hidden lg:flex" />

          <nav aria-label="Principal" className="hidden md:block">
            <ul className="flex items-center gap-1 text-sm font-semibold uppercase tracking-wide">
              {NAV.map((item) => {
                const active = item.href === pathname;
                return (
                  <li key={item.href}>
                    <Link
                      href={item.href}
                      aria-current={active ? "page" : undefined}
                      className={`group/nav relative block px-3 py-2 transition-colors hover:text-primary ${active ? "text-primary" : ""}`}
                    >
                      {item.label}
                      <span
                        className={`absolute inset-x-3 -bottom-0.5 h-0.5 origin-left rounded-full bg-primary transition-transform duration-300 ease-out ${
                          active ? "scale-x-100" : "scale-x-0 group-hover/nav:scale-x-100"
                        }`}
                      />
                    </Link>
                  </li>
                );
              })}
            </ul>
          </nav>

          <button
            ref={toggleRef}
            type="button"
            onClick={() => setOpen(true)}
            aria-expanded={open}
            aria-controls="menu-movil"
            className="flex size-11 items-center justify-center rounded-full transition-colors hover:bg-primary/10 active:scale-95 md:hidden"
          >
            <Menu className="size-6" aria-hidden />
            <span className="sr-only">Abrir menú</span>
          </button>
        </div>
      </header>

      {/* Fuera del <header>: su backdrop-blur convertiría al header en el contenedor de los elementos fixed. */}
      <AnimatePresence>
        {open && (
          <div className="fixed inset-0 z-50 overflow-clip md:hidden">
            <motion.div
              className="absolute inset-0 bg-black/60 backdrop-blur-sm"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.3 }}
              onClick={() => setOpen(false)}
            />
            <motion.div
              id="menu-movil"
              role="dialog"
              aria-modal="true"
              aria-label="Menú"
              className="absolute inset-y-0 right-0 flex w-[min(21rem,88vw)] flex-col overflow-hidden rounded-l-3xl bg-primary text-primary-foreground shadow-2xl"
              initial={{ x: "100%" }}
              animate={{ x: 0 }}
              exit={{ x: "100%" }}
              transition={{ type: "spring", stiffness: 320, damping: 34 }}
            >
              <Image
                src="/img/logo-c4.png"
                alt=""
                width={1080}
                height={504}
                className="pointer-events-none absolute -bottom-6 -right-16 w-80 rotate-[-8deg] opacity-[0.08] brightness-0 invert"
              />
              <div className="flex h-16 items-center justify-between pl-6 pr-4">
                <span className="text-xs font-bold uppercase tracking-[0.3em] text-white/70">Menú</span>
                <button
                  ref={closeRef}
                  type="button"
                  onClick={() => setOpen(false)}
                  className="flex size-11 items-center justify-center rounded-full transition-colors hover:bg-white/15 active:scale-95"
                >
                  <X className="size-6" aria-hidden />
                  <span className="sr-only">Cerrar menú</span>
                </button>
              </div>
              <nav aria-label="Principal móvil" className="relative flex-1 overflow-y-auto px-4">
                <motion.ul
                  className="space-y-1"
                  initial="hidden"
                  animate="show"
                  variants={{ hidden: {}, show: { transition: { staggerChildren: 0.06, delayChildren: 0.12 } } }}
                >
                  {NAV.map((item, i) => (
                    <motion.li
                      key={item.href}
                      variants={{ hidden: { opacity: 0, x: 32 }, show: { opacity: 1, x: 0, transition: { duration: 0.5, ease: EASE } } }}
                    >
                      <Link
                        href={item.href}
                        onClick={() => setOpen(false)}
                        aria-current={item.href === pathname ? "page" : undefined}
                        className="group/m flex items-center justify-between rounded-2xl px-3 py-3 text-2xl font-extrabold uppercase transition-colors hover:bg-white/10 aria-[current=page]:bg-white/15"
                      >
                        <span className="flex items-baseline gap-3">
                          <span className="text-xs font-semibold tabular-nums text-white/50">0{i + 1}</span>
                          {item.label}
                        </span>
                        <ArrowUpRight
                          className="size-5 opacity-0 transition-all duration-300 group-hover/m:translate-x-0.5 group-hover/m:opacity-100"
                          aria-hidden
                        />
                      </Link>
                    </motion.li>
                  ))}
                </motion.ul>
              </nav>
              <motion.div
                className="relative p-6 [&_a]:bg-white/15 [&_a]:text-white [&_a:hover]:bg-white [&_a:hover]:text-primary"
                initial={{ opacity: 0, y: 16 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.4, duration: 0.5, ease: EASE }}
              >
                <SocialLinks size="sm" />
              </motion.div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </>
  );
}
