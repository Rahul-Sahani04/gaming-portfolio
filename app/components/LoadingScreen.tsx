"use client";

import React, { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useProgress } from "@react-three/drei";

export default function LoadingScreen({
  loading,
  setLoading = () => { },
  progress: externalProgress,
}: {
  loading: boolean;
  setLoading: (loading: boolean) => void;
  progress?: number;
}) {
  const [mounted, setMounted] = useState(false);
  const { active, progress: threeProgress } = useProgress();
  const [internalProgress, setInternalProgress] = useState(0);

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

  if (!mounted) return null;

  return (
    <AnimatePresence>
      {loading && (
        <motion.div
          initial={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 bg-black flex flex-col items-center justify-center z-[9999]"
        >
          <img
            src="https://i.pinimg.com/1200x/13/a4/31/13a431ed022b6a7f37180153f8e1db44.jpg"
            alt="Loading Background"
            draggable={false}
            className="absolute w-[15%] top-[90%] left-1/2 -translate-x-1/2 -translate-y-1/2"
            style={{ zIndex: -1 }}
          />

          <motion.div
            initial={{ scale: 0.5, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ duration: 0.5 }}
            className="text-white text-4xl font-bold mb-8 backdrop-blur-md"
          >
            Rahul Sahani
          </motion.div>

          <div className="w-64 h-1 bg-gray-800 rounded-full overflow-hidden">
            <motion.div
              className="h-full bg-white"
              initial={{ width: 0 }}
              animate={{ width: `${displayProgress}%` }}
              transition={{ ease: "linear" }}
            />
          </div>

          <div className="mt-4 text-gray-500 text-sm font-mono">
            {Math.round(displayProgress)}%
          </div>

          <motion.div
            animate={{ opacity: [1, 0] }}
            transition={{ repeat: Infinity, duration: 1, repeatType: "reverse" }}
            className="mt-8 text-white text-xl font-mono"
          >
            Entering Warp Drive...
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
