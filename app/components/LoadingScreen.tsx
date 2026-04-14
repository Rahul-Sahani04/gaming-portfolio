"use client";

import React, { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useProgress } from "@react-three/drei";

const STAR_FIELD = [
  { top: "8%", left: "12%", size: 2, delay: 0.1, duration: 3.4 },
  { top: "16%", left: "74%", size: 2, delay: 0.8, duration: 2.8 },
  { top: "24%", left: "32%", size: 1, delay: 1.6, duration: 3.8 },
  { top: "30%", left: "88%", size: 2, delay: 1.1, duration: 3.1 },
  { top: "38%", left: "18%", size: 1, delay: 2.2, duration: 2.7 },
  { top: "44%", left: "66%", size: 2, delay: 0.6, duration: 3.3 },
  { top: "52%", left: "42%", size: 1, delay: 1.9, duration: 2.9 },
  { top: "60%", left: "82%", size: 1, delay: 2.8, duration: 3.6 },
  { top: "68%", left: "24%", size: 2, delay: 1.3, duration: 3.2 },
  { top: "76%", left: "56%", size: 1, delay: 0.4, duration: 2.6 },
  { top: "84%", left: "10%", size: 1, delay: 2.5, duration: 3.7 },
  { top: "90%", left: "72%", size: 2, delay: 1.7, duration: 2.9 },
];

const STATUS_LINES = [
  "Waking the starship core",
  "Syncing constellations",
  "Aligning jump coordinates",
];

export default function LoadingScreen({
  loading,
  setLoading = () => {},
  progress: externalProgress,
}: {
  loading: boolean;
  setLoading: (loading: boolean) => void;
  progress?: number;
}) {
  const [mounted, setMounted] = useState(false);
  const { active, progress: threeProgress } = useProgress();
  const [internalProgress, setInternalProgress] = useState(0);
  const [statusIndex, setStatusIndex] = useState(0);

  // Use external progress if provided, otherwise use Three.js progress if active, otherwise use internal simulated progress
  const displayProgress = externalProgress !== undefined
    ? externalProgress
    : active || threeProgress > 0 // If 3D stuff is happening/happened
      ? threeProgress
      : internalProgress;

  useEffect(() => {
    setMounted(true);
  }, []);

  // Completion effect
  useEffect(() => {
    if (!mounted) return;

    if (displayProgress >= 100) {
      // Small delay to ensure the 100% is seen briefly
      const timeout = setTimeout(() => {
        setLoading(false);
      }, 500);
      return () => clearTimeout(timeout);
    }
  }, [displayProgress, mounted, setLoading]);

  // Fast fallback loader for pages without 3D or external progress
  useEffect(() => {
    if (!mounted) return;
    if (externalProgress !== undefined) return; // Don't run if external progress is used
    if (active) return; // Don't run if 3D loader is active
    if (displayProgress >= 100) return; // Don't run if already done

    const timer = setInterval(() => {
      setInternalProgress((old) => {
        if (old >= 100) {
          clearInterval(timer);
          return 100;
        }
        // Very fast loading simulation
        return Math.min(old + 5, 100);
      });
    }, 20); // 5% every 20ms = 100% in 400ms

    return () => clearInterval(timer);
  }, [mounted, active, externalProgress, displayProgress]);

  useEffect(() => {
    if (!loading) return;

    const textTimer = setInterval(() => {
      setStatusIndex((old) => (old + 1) % STATUS_LINES.length);
    }, 1400);

    return () => clearInterval(textTimer);
  }, [loading]);

  if (!mounted) return null;

  return (
    <AnimatePresence>
      {loading && (
        <motion.div
          initial={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.45, ease: "easeOut" }}
          className="fixed inset-0 z-9999 flex items-center justify-center overflow-hidden bg-black"
        >
          <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_50%_28%,rgba(59,130,246,0.2),transparent_40%),radial-gradient(circle_at_20%_78%,rgba(15,118,110,0.24),transparent_42%),linear-gradient(to_bottom,#02040a,#000)]" />
          <div className="pointer-events-none absolute inset-0 bg-[repeating-linear-gradient(to_bottom,rgba(255,255,255,0.045),rgba(255,255,255,0.045)_1px,transparent_1px,transparent_3px)] opacity-20" />

          {STAR_FIELD.map((star, index) => (
            <motion.span
              key={`${star.left}-${star.top}-${index}`}
              className="pointer-events-none absolute rounded-full bg-white"
              style={{
                top: star.top,
                left: star.left,
                width: `${star.size}px`,
                height: `${star.size}px`,
                boxShadow: "0 0 14px rgba(255,255,255,0.55)",
              }}
              animate={{ opacity: [0.2, 1, 0.25] }}
              transition={{
                duration: star.duration,
                delay: star.delay,
                repeat: Infinity,
                ease: "easeInOut",
              }}
            />
          ))}

          <motion.section
            initial={{ opacity: 0, y: 16, scale: 0.98 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            transition={{ duration: 0.6, ease: "easeOut" }}
            className="relative flex w-[min(90vw,34rem)] flex-col items-center gap-8 overflow-hidden rounded-xl border border-cyan-200/35 bg-black/60 px-7 py-9 shadow-[0_0_70px_rgba(34,211,238,0.12)] backdrop-blur-md sm:px-10 sm:py-11"
          >
            <span className="absolute left-3 top-3 h-3 w-3 border-l border-t border-cyan-200/55" />
            <span className="absolute right-3 top-3 h-3 w-3 border-r border-t border-cyan-200/55" />
            <span className="absolute bottom-3 left-3 h-3 w-3 border-b border-l border-cyan-200/55" />
            <span className="absolute bottom-3 right-3 h-3 w-3 border-b border-r border-cyan-200/55" />

            <div className="relative grid h-28 w-28 place-items-center">
              <motion.div
                animate={{ rotate: 360 }}
                transition={{ duration: 12, repeat: Infinity, ease: "linear" }}
                className="absolute h-28 w-28 rounded-full border border-cyan-200/30"
              />
              <motion.div
                animate={{ rotate: -360 }}
                transition={{ duration: 6, repeat: Infinity, ease: "linear" }}
                className="absolute h-20 w-20 rounded-full border border-dashed border-cyan-100/35"
              />
              <motion.div
                animate={{ rotate: 360 }}
                transition={{ duration: 3.4, repeat: Infinity, ease: "linear" }}
                className="absolute left-1/2 top-1/2 h-2 w-2 rounded-full bg-cyan-200 shadow-[0_0_14px_rgba(165,243,252,0.9)]"
                style={{ transformOrigin: "0 -42px" }}
              />
              <motion.span
                animate={{ scale: [1, 1.12, 1], opacity: [0.65, 1, 0.65] }}
                transition={{ duration: 1.7, repeat: Infinity, ease: "easeInOut" }}
                className="h-8 w-8 rounded-full bg-linear-to-br from-cyan-100 via-cyan-300 to-blue-500 shadow-[0_0_45px_rgba(34,211,238,0.55)]"
              />
            </div>

            <motion.h2
              initial={{ opacity: 0, y: 6 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.14, duration: 0.45 }}
              className="press-start text-center text-[11px] uppercase tracking-[0.28em] text-cyan-100/90 sm:text-xs"
            >
              Rahul Sahani
            </motion.h2>

            <motion.p
              key={statusIndex}
              initial={{ opacity: 0.3, y: 5 }}
              animate={{ opacity: [0.45, 1, 0.45], y: 0 }}
              transition={{ duration: 0.7, ease: "easeOut" }}
              className="font-mono text-[10px] uppercase tracking-[0.28em] text-cyan-50/70 sm:text-[11px]"
            >
              {STATUS_LINES[statusIndex]}
            </motion.p>

            <div className="h-px w-28 bg-linear-to-r from-transparent via-cyan-100/60 to-transparent" />
          </motion.section>

          <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_center,transparent_30%,rgba(0,0,0,0.5)_100%)]" />
        </motion.div>
      )}
    </AnimatePresence>
  );
}
