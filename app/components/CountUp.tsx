"use client";
import { motion, useInView } from "framer-motion";
import { useRef, useEffect, useState } from "react";

interface CountUpProps {
  value: number;
  duration?: number;
  className?: string;
  formatter?: (n: number) => string;
}

export const CountUp = ({ value, duration = 1.2, className = "", formatter }: CountUpProps) => {
  const ref = useRef<HTMLSpanElement>(null);
  const inView = useInView(ref, { once: true, margin: "-20%" });
  const [displayed, setDisplayed] = useState(0);

  useEffect(() => {
    if (!inView) return;
    let start = 0;
    const startTime = performance.now();
    const tick = (now: number) => {
      const elapsed = (now - startTime) / 1000;
      const progress = Math.min(elapsed / duration, 1);
      // ease out expo
      const eased = progress === 1 ? 1 : 1 - Math.pow(2, -10 * progress);
      const current = Math.round(eased * value);
      setDisplayed(current);
      if (progress < 1) requestAnimationFrame(tick);
    };
    requestAnimationFrame(tick);
  }, [inView, value, duration]);

  const f = formatter ?? Intl.NumberFormat("en-US", { notation: "compact" }).format;
  return (
    <span ref={ref} className={className}>
      {f(displayed)}
    </span>
  );
};
