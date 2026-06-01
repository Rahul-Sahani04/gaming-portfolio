"use client";

import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

export default function VideoLoader({ onComplete }: { onComplete?: () => void }) {
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Keep the loader visible for a set duration (e.g., 3 seconds)
    // Adjust this based on how long you want the animation to play
    const timer = setTimeout(() => {
      setIsLoading(false);
      if (onComplete) {
        onComplete();
      }
    }, 3000);

    return () => clearTimeout(timer);
  }, []);

  return (
    <AnimatePresence>
      {isLoading && (
        <motion.div
          key="video-loader"
          initial={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.8, ease: "easeInOut" }}
          className="fixed inset-0 z-[99999] bg-black flex items-center justify-center pointer-events-none"
        >
          <video
            autoPlay
            muted
            playsInline
            loop
            className="w-full h-full object-contain opacity-95"
            src="/Lain.mp4"
          />
        </motion.div>
      )}
    </AnimatePresence>
  );
}
