"use client";

import { usePathname } from "next/navigation";
import { useEffect, useRef } from "react";

// Next lleva la página nueva "a la vista" respetando el scroll-padding del header sticky, y queda unos px abajo.
// Se fuerza el tope, salvo en atrás/adelante (el navegador restaura la posición) y en links a una sección (#id).
export function ScrollToTop() {
  const pathname = usePathname();
  const isFirst = useRef(true);
  const fromHistory = useRef(false);

  useEffect(() => {
    const onPop = () => {
      fromHistory.current = true;
    };
    window.addEventListener("popstate", onPop);
    return () => window.removeEventListener("popstate", onPop);
  }, []);

  useEffect(() => {
    if (isFirst.current) {
      isFirst.current = false;
      return;
    }
    if (fromHistory.current) {
      fromHistory.current = false;
      return;
    }
    if (window.location.hash) return;
    window.scrollTo({ top: 0, behavior: "instant" });
  }, [pathname]);

  return null;
}
