"use client";

import { useEffect, useRef } from "react";
import { animate, useInView, useReducedMotion } from "motion/react";

export function Counter({ to, from = 0, prefix = "", suffix = "" }: { to: number; from?: number; prefix?: string; suffix?: string }) {
  const ref = useRef<HTMLSpanElement>(null);
  const inView = useInView(ref, { once: true, margin: "0px 0px -15% 0px" });
  const reduce = useReducedMotion();

  useEffect(() => {
    if (ref.current && !reduce) ref.current.textContent = `${prefix}${from}${suffix}`;
  }, [reduce, from, prefix, suffix]);

  useEffect(() => {
    const el = ref.current;
    if (!el || !inView || reduce) return;
    const controls = animate(from, to, {
      duration: 1.6,
      ease: [0.22, 1, 0.36, 1],
      onUpdate: (v) => {
        el.textContent = `${prefix}${Math.round(v)}${suffix}`;
      },
    });
    return () => controls.stop();
  }, [inView, reduce, from, to, prefix, suffix]);

  return (
    <span ref={ref} className="tabular-nums">
      {`${prefix}${to}${suffix}`}
    </span>
  );
}
