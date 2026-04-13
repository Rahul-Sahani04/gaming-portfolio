"use client";

import { motion, Transition, Easing } from "motion/react";
import { useEffect, useRef, useState, useMemo } from "react";

type Segment = {
  text: string;
  className?: string;
  key?: string;
};

type BlurTextProps = {
  text?: string;
  segments?: Segment[];
  delay?: number;
  className?: string;
  animateBy?: "words" | "letters";
  direction?: "top" | "bottom";
  threshold?: number;
  rootMargin?: string;
  animationFrom?: Record<string, string | number>;
  animationTo?: Array<Record<string, string | number>>;
  easing?: Easing | Easing[];
  onAnimationComplete?: () => void;
  stepDuration?: number;
};

const buildKeyframes = (
  from: Record<string, string | number>,
  steps: Array<Record<string, string | number>>
): Record<string, Array<string | number>> => {
  const keys = new Set<string>([
    ...Object.keys(from),
    ...steps.flatMap((s) => Object.keys(s)),
  ]);

  const keyframes: Record<string, Array<string | number>> = {};

  keys.forEach((k) => {
    keyframes[k] = [from[k], ...steps.map((s) => s[k])];
  });

  return keyframes;
};

const BlurText: React.FC<BlurTextProps> = ({
  text = "",
  segments,
  delay = 200,
  className = "",
  animateBy = "words",
  direction = "top",
  threshold = 0.1,
  rootMargin = "0px",
  animationFrom,
  animationTo,
  easing = (t: number) => t,
  onAnimationComplete,
  stepDuration = 0.35,
}) => {
  const ref = useRef<HTMLParagraphElement>(null);
  const completedCount = useRef(0);

  const [inView, setInView] = useState(false);

  // 👇 Normalize input (single source of truth)
  const elements = useMemo<Segment[]>(() => {
    if (segments && segments.length > 0) return segments;

    const split =
      animateBy === "words" ? text.split(" ") : text.split("");

    return split.map((t) => ({ text: t }));
  }, [text, segments, animateBy]);

  useEffect(() => {
    if (!ref.current) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setInView(true);
          observer.unobserve(ref.current as Element);
        }
      },
      { threshold, rootMargin }
    );

    observer.observe(ref.current);
    return () => observer.disconnect();
  }, [threshold, rootMargin]);

  // Reset completion counter when animation starts
  useEffect(() => {
    if (inView) {
      completedCount.current = 0;
    }
  }, [inView]);

  const defaultFrom = useMemo(
    () =>
      direction === "top"
        ? { filter: "blur(10px)", opacity: 0, y: -50 }
        : { filter: "blur(10px)", opacity: 0, y: 50 },
    [direction]
  );

  const defaultTo = useMemo(
    () => [
      {
        filter: "blur(5px)",
        opacity: 0.5,
        y: direction === "top" ? 5 : -5,
      },
      { filter: "blur(0px)", opacity: 1, y: 0 },
    ],
    [direction]
  );

  const fromSnapshot = animationFrom ?? defaultFrom;
  const toSnapshots = animationTo ?? defaultTo;

  const stepCount = toSnapshots.length + 1;
  const totalDuration = stepDuration * (stepCount - 1);

  const times = Array.from({ length: stepCount }, (_, i) =>
    stepCount === 1 ? 0 : i / (stepCount - 1)
  );

  return (
    <p ref={ref} className={`blur-text ${className} flex flex-wrap`}>
      {elements.map((segmentObj, index) => {
        const segment = segmentObj.text;

        const animateKeyframes = buildKeyframes(
          fromSnapshot,
          toSnapshots
        );

        const spanTransition: Transition = {
          duration: totalDuration,
          times,
          delay: (index * delay) / 1000,
          ease: easing,
        };

        return (
          <motion.span
            key={segmentObj.key ?? index}
            className={segmentObj.className}
            initial={fromSnapshot}
            animate={inView ? animateKeyframes : fromSnapshot}
            transition={spanTransition}
            onAnimationComplete={() => {
              completedCount.current += 1;

              if (
                completedCount.current === elements.length &&
                onAnimationComplete
              ) {
                onAnimationComplete();
              }
            }}
            style={{
              display: "inline-block",
              willChange: "transform, filter, opacity",
            }}
          >
            {segment === " " ? "\u00A0" : segment}
            {animateBy === "words" &&
              index < elements.length - 1 &&
              "\u00A0"}
          </motion.span>
        );
      })}
    </p>
  );
};

export default BlurText;