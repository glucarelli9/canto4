"use client";

import { motion, type Variants } from "motion/react";
import type { ReactNode } from "react";

const EASE = [0.22, 1, 0.36, 1] as const;

const fromDirection = {
  up: { y: 28, x: 0 },
  left: { x: -40, y: 0 },
  right: { x: 40, y: 0 },
  none: { x: 0, y: 0 },
};

type Direction = keyof typeof fromDirection;

export function Reveal({
  children,
  from = "up",
  delay = 0,
  className,
  as = "div",
}: {
  children: ReactNode;
  from?: Direction;
  delay?: number;
  className?: string;
  as?: "div" | "section" | "li" | "header" | "p";
}) {
  const Tag = motion[as];
  return (
    <Tag
      className={className}
      initial={{ opacity: 0, ...fromDirection[from] }}
      whileInView={{ opacity: 1, x: 0, y: 0 }}
      viewport={{ once: true, margin: "0px 0px -12% 0px" }}
      transition={{ duration: 0.8, ease: EASE, delay }}
    >
      {children}
    </Tag>
  );
}

const list: Variants = {
  hidden: {},
  show: { transition: { staggerChildren: 0.09, delayChildren: 0.1 } },
};

const item: Variants = {
  hidden: { opacity: 0, y: 24, scale: 0.98 },
  show: { opacity: 1, y: 0, scale: 1, transition: { duration: 0.6, ease: EASE } },
};

export function StaggerList({ children, className }: { children: ReactNode; className?: string }) {
  return (
    <motion.ul
      className={className}
      variants={list}
      initial="hidden"
      whileInView="show"
      viewport={{ once: true, margin: "0px 0px -10% 0px" }}
    >
      {children}
    </motion.ul>
  );
}

export function StaggerItem({ children, className }: { children: ReactNode; className?: string }) {
  return (
    <motion.li className={className} variants={item}>
      {children}
    </motion.li>
  );
}

// Cada renglón del título sube desde abajo, recortado por su contenedor.
export function RevealHeading({
  lines,
  className,
  lineClassNames = [],
  as = "h2",
  id,
}: {
  lines: string[];
  className?: string;
  lineClassNames?: string[];
  as?: "h1" | "h2";
  id?: string;
}) {
  const Tag = motion[as];
  return (
    <Tag
      id={id}
      className={className}
      initial="hidden"
      whileInView="show"
      viewport={{ once: true, margin: "0px 0px -10% 0px" }}
      variants={{ hidden: {}, show: { transition: { staggerChildren: 0.12 } } }}
      aria-label={lines.join(" ")}
    >
      {lines.map((line, i) => (
        // El padding superior evita que el recorte se coma los acentos de las mayúsculas (Ó de PRÓXIMOS).
        <span key={line} aria-hidden className="-mt-[0.2em] block overflow-hidden pb-[0.08em] pt-[0.2em]">
          <motion.span
            className={`block ${lineClassNames[i] ?? ""}`}
            variants={{
              hidden: { y: "105%" },
              show: { y: "0%", transition: { duration: 0.9, ease: EASE } },
            }}
          >
            {line}
          </motion.span>
        </span>
      ))}
    </Tag>
  );
}
