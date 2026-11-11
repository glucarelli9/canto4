"use client";

import Image from "next/image";
import { useRef } from "react";
import { motion, useReducedMotion, useScroll, useTransform } from "motion/react";

const EASE = [0.22, 1, 0.36, 1] as const;

// La posición sale de --bar-start y --bar-gap (definidas por breakpoint en el contenedor) para que en celular no se superpongan.
const BARS = [
  { height: "30%", beat: 1.1 },
  { height: "40%", beat: 0.9 },
  { height: "50%", beat: 1.3 },
  { height: "36%", beat: 1 },
];

export function Hero() {
  const ref = useRef<HTMLDivElement>(null);
  const reduce = useReducedMotion();
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start start", "end start"] });
  const logoY = useTransform(scrollYProgress, [0, 1], ["0%", "35%"]);
  const bandY = useTransform(scrollYProgress, [0, 1], ["0%", "8%"]);

  return (
    <section aria-label="Canto 4" className="relative">
      <h1 className="sr-only">Canto 4 - Banda Oficial</h1>
      <div
        ref={ref}
        className="relative mx-auto max-w-4xl overflow-hidden px-4 pt-6 [--bar-gap:8%] [--bar-start:35%] sm:pt-10 sm:[--bar-gap:6%] sm:[--bar-start:38%] md:[--bar-gap:5%] md:[--bar-start:40%]"
      >
        <motion.div style={{ y: reduce ? 0 : logoY }}>
          <motion.div
            initial={{ opacity: 0, scale: 1.08, filter: "blur(8px)" }}
            animate={{ opacity: 1, scale: 1, filter: "blur(0px)" }}
            transition={{ duration: 1.1, ease: EASE }}
          >
            <Image
              src="/img/logo-c4.png"
              alt=""
              width={1080}
              height={504}
              priority
              sizes="(min-width: 896px) 640px, 72vw"
              className="mx-auto h-auto w-[72%]"
            />
          </motion.div>
        </motion.div>
        <motion.div className="relative z-[1] -mt-[22%]" style={{ y: reduce ? 0 : bandY }}>
          <motion.div
            initial={{ opacity: 0, y: 60 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, ease: EASE, delay: 0.25 }}
          >
            <Image
              src="/img/Foto_canto_4_2025.png"
              alt="Los cuatro integrantes de Canto 4"
              width={1404}
              height={1080}
              priority
              sizes="(min-width: 896px) 896px, 100vw"
              className="h-auto w-full"
            />
          </motion.div>
        </motion.div>
        {BARS.map((bar, i) => (
          <motion.span
            key={i}
            aria-hidden
            className="absolute bottom-0 z-[2] w-[18px] origin-bottom bg-primary/70 sm:w-6 md:w-8"
            style={{ left: `calc(var(--bar-start) + ${i} * var(--bar-gap))`, height: bar.height }}
            initial={{ y: "100%" }}
            animate={reduce ? { y: "0%" } : { y: "0%", scaleY: [1, 0.72, 1.06, 0.85, 1] }}
            transition={{
              y: { duration: 0.9, ease: EASE, delay: 0.6 + i * 0.12 },
              scaleY: { duration: bar.beat * 2.4, repeat: Infinity, ease: "easeInOut", delay: 1.6 + i * 0.12 },
            }}
          />
        ))}
      </div>
    </section>
  );
}
