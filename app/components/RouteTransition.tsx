"use client";

import React, { useEffect, useRef, useState } from "react";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import { usePathname } from "next/navigation";

export default function RouteTransition({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const shouldReduceMotion = useReducedMotion();
  const previousPath = useRef(pathname);
  const [isTransitioning, setIsTransitioning] = useState(false);

  useEffect(() => {
    if (previousPath.current === pathname) return;

    previousPath.current = pathname;
    setIsTransitioning(true);

    const timer = setTimeout(() => {
      setIsTransitioning(false);
    }, 540);

    return () => clearTimeout(timer);
  }, [pathname]);

  return (
    <>
      <AnimatePresence mode="sync" initial={false}>
        <motion.div
          key={pathname}
          initial={shouldReduceMotion ? { opacity: 1 } : { opacity: 0, y: 10, filter: "blur(4px)" }}
          animate={shouldReduceMotion ? { opacity: 1 } : { opacity: 1, y: 0, filter: "blur(0px)" }}
          exit={shouldReduceMotion ? { opacity: 1 } : { opacity: 0, y: -8, filter: "blur(3px)" }}
          transition={{ duration: shouldReduceMotion ? 0.08 : 0.45, ease: [0.22, 1, 0.36, 1] }}
        >
          {children}
        </motion.div>
      </AnimatePresence>

      <AnimatePresence>
        {isTransitioning && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.16 }}
            className="pointer-events-none fixed inset-0 z-120"
          >
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: [0, 0.85, 0] }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.52, ease: "easeOut" }}
              className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,rgba(80,120,180,0.14)_0%,rgba(4,8,20,0.35)_45%,rgba(0,0,0,0.68)_100%)]"
            />

            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: [0, 0.3, 0] }}
              transition={{ duration: 0.52, ease: "easeOut" }}
              className="absolute inset-0 bg-[radial-gradient(circle_at_center,transparent_35%,rgba(255,255,255,0.16)_62%,transparent_80%)]"
            />

            <div className="absolute inset-0 bg-[repeating-linear-gradient(to_bottom,rgba(255,255,255,0.03),rgba(255,255,255,0.03)_1px,transparent_1px,transparent_4px)] opacity-20" />

            <motion.div
              initial={{ x: "-55%", opacity: 0 }}
              animate={{ x: ["-55%", "55%"], opacity: [0, 0.45, 0] }}
              transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
              className="absolute inset-y-[-10%] left-[-25%] w-[42%] rotate-12 bg-linear-to-r from-transparent via-white/28 to-transparent blur-xl"
            />

            <motion.div
              initial={{ x: "-60%", opacity: 0 }}
              animate={{ x: ["-60%", "45%"], opacity: [0, 0.28, 0] }}
              transition={{ duration: 0.46, delay: 0.05, ease: [0.22, 1, 0.36, 1] }}
              className="absolute inset-y-[8%] left-[-30%] w-[36%] rotate-12 bg-linear-to-r from-transparent via-slate-200/26 to-transparent blur-md"
            />
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
