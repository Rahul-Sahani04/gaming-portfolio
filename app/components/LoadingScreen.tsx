"use client";
import React, { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";



export default function LoadingScreen({ loading, setLoading }: { loading: boolean; setLoading: (loading: boolean) => void }) {
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setProgress((oldProgress) => {
        if (oldProgress === 100) {
          clearInterval(timer);
          setTimeout(() => setLoading(false), 500); // Delay to show 100% briefly
          return 100;
        }
        const diff = Math.random() * 10;
        return Math.min(oldProgress + diff, 100);
      });
    }, 200);

    return () => clearInterval(timer);
  }, []);

  return (
    <AnimatePresence>
      {loading && (
        <motion.div
          initial={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 bg-black flex flex-col items-center justify-center"
        >
          <img
            className="absolute w-[15%] top-[90%] left-1/2 transform -translate-x-1/2 -translate-y-1/2 text-zinc-500 text-sm font-mono"
            alt="Loading Background"
            src="https://i.pinimg.com/1200x/13/a4/31/13a431ed022b6a7f37180153f8e1db44.jpg"
            style={{
              zIndex: -1,
            }}
          ></img>
          <motion.div
            initial={{ scale: 0.5, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ duration: 0.5 }}
            style={{
              backdropFilter: "blur(10px)",
            }}
            className="text-white text-4xl font-bold mb-8"
          >
            Rahul Sahani
          </motion.div>
          <div className="w-64 h-1 bg-gray-800 rounded-full overflow-hidden">
            <motion.div
              className="h-full bg-white"
              initial={{ width: 0 }}
              animate={{ width: `${progress}%` }}
            />
          </div>
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.5 }}
            className="mt-4 text-gray-500 text-sm font-mono"
          >
            {progress.toFixed(0)}%
          </motion.div>
          <motion.div
            animate={{ opacity: [1, 0] }}
            transition={{
              repeat: Infinity,
              duration: 1,
              repeatType: "reverse",
            }}
            className="mt-8 text-white text-xl font-mono"
          >
            Entering Warp Drive...
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
