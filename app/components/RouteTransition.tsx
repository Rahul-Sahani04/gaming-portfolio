"use client";

import React, { createContext, useContext, useEffect, useRef, useState } from "react";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import { usePathname } from "next/navigation";

const RouteTransitionContext = createContext<{ isTransitioning: boolean; timingMs: number }>({
  isTransitioning: false,
  timingMs: 480,
});

export function useRouteTransitionState() {
  return useContext(RouteTransitionContext);
}

export default function RouteTransition({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const shouldReduceMotion = useReducedMotion();
  const previousPath = useRef(pathname);
  const [isTransitioning, setIsTransitioning] = useState(false);

  const TRANSITION_DURATION = shouldReduceMotion ? 0.16 : 0.8;
  const OVERLAY_DURATION = shouldReduceMotion ? 0.08 : 1.4;

  const destinationLabel =
    pathname === null || pathname === "/"
      ? "Home"
      : (pathname || "")
          .split("/")
          .filter(Boolean)
          .pop()
          ?.replace(/-/g, " ")
          .replace(/\b\w/g, (char) => char.toUpperCase()) ?? "Next Sector";

  useEffect(() => {
    if (previousPath.current === pathname) return;

    previousPath.current = pathname;
    setIsTransitioning(true);

    // Dispatch event for nav synchronization
    window.dispatchEvent(
      new CustomEvent("route-transition-state", {
        detail: { 
          active: true, 
          path: (pathname || ""),
          startTime: Date.now(),
          duration: OVERLAY_DURATION * 1000,
        },
      }),
    );

    const timer = setTimeout(() => {
      setIsTransitioning(false);
      window.dispatchEvent(
        new CustomEvent("route-transition-state", {
          detail: { 
            active: false, 
            path: (pathname || ""),
          },
        }),
      );
    }, OVERLAY_DURATION * 1000);

    return () => {
      clearTimeout(timer);
      window.dispatchEvent(
        new CustomEvent("route-transition-state", {
          detail: { active: false, path: (pathname || "") },
        }),
      );
    };
  }, [pathname, OVERLAY_DURATION]);

  return (
    <RouteTransitionContext.Provider
      value={{
        isTransitioning,
        timingMs: OVERLAY_DURATION * 1000,
      }}
    >
      <AnimatePresence mode="sync" initial={false}>
        <motion.div
          key={pathname}
          initial={
            shouldReduceMotion
              ? { opacity: 1 }
              : { opacity: 0.8, y: 8, filter: "blur(6px)" }
          }
          animate={
            shouldReduceMotion
              ? { opacity: 1 }
              : { opacity: 1, y: 0, filter: "blur(0px)" }
          }
          exit={
            shouldReduceMotion
              ? { opacity: 1 }
              : { opacity: 0.8, y: -12, filter: "blur(5px)" }
          }
          transition={{
            duration: TRANSITION_DURATION,
            ease: [0.25, 0.46, 0.45, 0.94],
          }}

          style={{
            backgroundColor: "#2b2b2b"
          }}
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
            transition={{ duration: 0.2 }}
            className="pointer-events-none fixed inset-0 z-[120] bg-black"
          >
            {/* Upper radial glow */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: [0, 0.6, 0] }}
              exit={{ opacity: 0 }}
              transition={{ duration: OVERLAY_DURATION, ease: "easeOut" }}
              className="absolute inset-0 bg-[radial-gradient(ellipse_80%_60%_at_50%_20%,rgba(244,244,245,0.06)_0%,rgba(161,161,170,0.05)_30%,rgba(24,24,27,0.28)_60%,rgba(0,0,0,0.48)_100%)]"
            />

            {/* Lower ring shimmer */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: [0, 0.25, 0] }}
              transition={{ duration: OVERLAY_DURATION, ease: "easeOut" }}
              className="absolute inset-0 bg-[radial-gradient(circle_at_center,transparent_32%,rgba(228,228,231,0.07)_57%,transparent_85%)]"
            />

            {/* Scanline effect for texture */}
            <div className="absolute inset-0 bg-[repeating-linear-gradient(to_bottom,rgba(255,255,255,0.02),rgba(255,255,255,0.02)_1px,transparent_1px,transparent_3px)] opacity-30 pointer-events-none" />

            {/* Left-to-right sweep */}
            <motion.div
              initial={{ x: "-60%", opacity: 0 }}
              animate={{ x: ["-60%", "50%"], opacity: [0, 0.5, 0] }}
              transition={{
                duration: OVERLAY_DURATION - 0.08,
                ease: [0.25, 0.46, 0.45, 0.94],
              }}
              className="absolute inset-y-[-15%] left-[-20%] w-[50%] rotate-12 bg-linear-to-r from-transparent via-zinc-100/18 to-transparent blur-2xl"
            />

            {/* Secondary overlay sweep with delay */}
            <motion.div
              initial={{ x: "-70%", opacity: 0 }}
              animate={{ x: ["-70%", "40%"], opacity: [0, 0.2, 0] }}
              transition={{
                duration: OVERLAY_DURATION - 0.04,
                delay: 0.04,
                ease: [0.25, 0.46, 0.45, 0.94],
              }}
              className="absolute inset-y-[5%] left-[-25%] w-[45%] rotate-12 bg-linear-to-r from-transparent via-zinc-300/14 to-transparent blur-3xl"
            />

            {/* Typography animation */}
            <motion.div
              initial={{ opacity: 0, scale: 0.95, y: 8 }}
              animate={{
                opacity: [0, 1, 0],
                scale: [0.95, 1, 1.02],
                y: [8, 0, -4],
              }}
              exit={{ opacity: 0 }}
              transition={{
                duration: OVERLAY_DURATION,
                ease: [0.25, 0.46, 0.45, 0.94],
              }}
              className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 text-center pointer-events-none"
            >
              <motion.p className="font-mono text-[36px] uppercase tracking-[0.35em] text-zinc-400 sm:text-[18px]">
                // ROUTING: {destinationLabel.toUpperCase()}
              </motion.p>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </RouteTransitionContext.Provider>
  );
}
