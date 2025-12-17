"use client";

import React, { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

export default function LoadingScreen({
  loading,
  setLoading,
}: {
  loading: boolean;
  setLoading: (loading: boolean) => void;
}) {
  const [mounted, setMounted] = useState(false);
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    setMounted(true);
  }, []);

  useEffect(() => {
    if (!mounted) return;

    const timer = setInterval(() => {
      setProgress((old) => {
        if (old >= 100) {
          clearInterval(timer);
          setTimeout(() => setLoading(false), 500);
          return 100;
        }
        return Math.min(old + Math.random() * 10, 100);
      });
    }, 200);

    return () => clearInterval(timer);
  }, [mounted, setLoading]);

  if (!mounted) return null;

  return (
    <AnimatePresence>
      {loading && (
        <motion.div
          initial={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 bg-black flex flex-col items-center justify-center"
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
              animate={{ width: `${progress}%` }}
            />
          </div>

          <div className="mt-4 text-gray-500 text-sm font-mono">
            {Math.round(progress)}%
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
