"use client";

import React, { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useProgress } from "@react-three/drei";

export default function HomeLoader() {
  const { active, progress, total, loaded } = useProgress();
  const [show, setShow] = useState(true);
  const [displayProgress, setDisplayProgress] = useState(0);

  // Smooth out the progress value visually
  useEffect(() => {
    const target = progress || 0;
    let current = displayProgress;
    
    if (current === target) return;

    const interval = setInterval(() => {
      if (current < target) {
        current += 1;
        setDisplayProgress(current);
      } else {
        clearInterval(interval);
      }
    }, 10);

    return () => clearInterval(interval);
  }, [progress, displayProgress]);

  useEffect(() => {
    // Determine when to hide. If it's loaded 100%, hold for a sec, then disappear.
    if (progress === 100 && !active) {
      const t = setTimeout(() => setShow(false), 600);
      return () => clearTimeout(t);
    }
    // Failsafe in case nothing is loading (e.g. mobile where ThreeScene isn't rendered)
    if (!active && progress === 0) {
       const t2 = setTimeout(() => setShow(false), 1500); 
       return () => clearTimeout(t2);
    }
  }, [progress, active]);

  return (
    <AnimatePresence>
      {show && (
        <motion.div
          key="home-loader"
          initial={{ opacity: 1 }}
          exit={{ 
            opacity: 0, 
            y: -20, 
            filter: "blur(10px)" 
          }}
          transition={{ duration: 0.8, ease: [0.25, 0.46, 0.45, 0.94] }}
          className="fixed inset-0 z-[150] flex flex-col items-center justify-center bg-black"
        >
          {/* Ambient Glow */}
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(24,24,27,0.4)_0%,transparent_60%)]" />

          <div className="relative flex flex-col items-center gap-6 w-full max-w-xs px-8">
            
            {/* Spinning/Processing Indicator (Subtle) */}
            <motion.div 
               animate={{ rotate: 360 }}
               transition={{ repeat: Infinity, duration: 4, ease: "linear" }}
               className="w-12 h-12 border border-zinc-800/80 rounded-full flex items-center justify-center relative"
            >
               <div className="absolute top-0 right-1/2 w-1.5 h-1.5 bg-zinc-400 rounded-full shadow-[0_0_10px_rgba(161,161,170,0.8)]" />
               <div className="w-1.5 h-1.5 bg-zinc-700 rounded-full" />
            </motion.div>

            {/* Data Output */}
            <div className="flex flex-col items-center gap-1.5 w-full text-center">
              <span className="font-mono text-[9px] uppercase tracking-[0.4em] text-zinc-500">
                INITIALIZING SPATIAL MODELS
              </span>
              <span className="font-mono text-2xl tracking-widest text-zinc-200">
                {displayProgress.toString().padStart(3, "0")}%
              </span>
            </div>

            {/* Architectural Rail Loader */}
            <div className="w-full h-px bg-zinc-900 overflow-hidden relative">
              <motion.div
                className="absolute top-0 left-0 bottom-0 bg-zinc-300"
                animate={{ width: `${displayProgress}%` }}
                transition={{ duration: 0.1, ease: "linear" }}
              />
              {/* Leader glow point */}
              <motion.div 
                 className="absolute top-1/2 -translate-y-1/2 w-8 h-px bg-white blur-[2px]"
                 animate={{ left: `calc(${displayProgress}% - 32px)` }}
                 transition={{ duration: 0.1, ease: "linear" }}
              />
            </div>
            
            <div className="flex justify-between w-full font-mono text-[8px] uppercase tracking-[0.3em] text-zinc-600">
               <span>SYS.RDY</span>
               <span>{loaded} / {Math.max(total, 1)} ASSETS</span>
            </div>

          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
