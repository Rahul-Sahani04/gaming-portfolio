"use client";

import { useState } from "react";
import { X } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

export default function MemeImage({ url }: { url: string }) {
  const [open, setOpen] = useState(false);

  return (
    <>
      {/* Thumbnail */}
      <button
        type="button"
        onClick={() => setOpen(true)}
        className="mt-3 block rounded-lg overflow-hidden border border-white/[0.06] hover:border-amber-500/30 transition-colors group/meme"
        aria-label="View full image"
      >
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src={url}
          alt="Attached meme"
          className="h-28 w-full object-cover group-hover/meme:opacity-90 transition-opacity"
        />
      </button>

      {/* Lightbox */}
      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.18 }}
            className="fixed inset-0 z-[9999] flex items-center justify-center bg-black/85 backdrop-blur-sm p-4"
            onClick={() => setOpen(false)}
          >
            <motion.div
              initial={{ scale: 0.88, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.88, opacity: 0 }}
              transition={{ type: "spring", damping: 22, stiffness: 280 }}
              className="relative max-w-[90vw] max-h-[85vh]"
              onClick={(e) => e.stopPropagation()}
            >
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src={url}
                alt="Attached meme"
                className="max-w-full max-h-[85vh] object-contain rounded-xl border border-white/10 shadow-2xl"
              />
              <button
                onClick={() => setOpen(false)}
                className="absolute -top-3 -right-3 bg-zinc-900 border border-white/10 hover:border-amber-500/40 text-zinc-400 hover:text-amber-400 rounded-full p-1.5 transition-colors shadow-lg"
                aria-label="Close"
              >
                <X className="w-4 h-4" />
              </button>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
