"use client";
import { useEffect, useState } from "react";
import { Download, ExternalLink, X } from "lucide-react";
import { AnimatePresence, motion } from "framer-motion";
import Image from "next/image";

export function ResumeModal() {
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const handleOpen = () => setOpen(true);
    document.addEventListener("open-resume", handleOpen);
    return () => document.removeEventListener("open-resume", handleOpen);
  }, []);

  useEffect(() => {
    if (!open) return;
    const handler = (e: KeyboardEvent) => {
      if (e.key === "Escape") setOpen(false);
    };
    document.addEventListener("keydown", handler);
    return () => document.removeEventListener("keydown", handler);
  }, [open]);

  return (
    <AnimatePresence>
      {open && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.2 }}
          className="fixed inset-0 z-[200] bg-black flex flex-col"
        >
          {/* ─── Toolbar ─── */}
          <div className="flex items-center justify-between px-4 md:px-6 py-3 border-b border-zinc-800/60 bg-zinc-950/90 backdrop-blur-sm">
            <span className="text-zinc-500 font-mono text-[9px] tracking-[0.25em] uppercase">
              // Rahul_Resume.pdf
            </span>
            <div className="flex items-center gap-2 md:gap-3">
              <a
                href="/Rahul_Resume.pdf"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-1.5 font-mono text-[10px] tracking-widest uppercase text-zinc-400 hover:text-zinc-200 transition-colors px-2.5 md:px-3 py-1.5 border border-zinc-800 hover:border-zinc-600"
              >
                <ExternalLink className="w-3 h-3" />
                <span className="hidden md:inline">Open</span>
              </a>
              <a
                href="/Rahul_Resume.pdf"
                download="Rahul_Sahani_Resume.pdf"
                className="flex items-center gap-1.5 font-mono text-[10px] tracking-widest uppercase text-zinc-900 bg-zinc-100 hover:bg-white transition-colors px-2.5 md:px-3 py-1.5"
              >
                <Download className="w-3 h-3" />
                Download
              </a>
              <button
                onClick={() => setOpen(false)}
                aria-label="Close resume"
                className="text-zinc-500 hover:text-zinc-200 transition-colors p-1.5 border border-zinc-800 hover:border-zinc-600 ml-1"
              >
                <X className="w-3.5 h-3.5" />
              </button>
            </div>
          </div>

          {/* ─── Resume image ─── */}
          <div className="flex-1 overflow-y-auto flex flex-col items-center bg-zinc-900/30 p-4 md:p-8 gap-3">
            <div className="relative w-full max-w-3xl shadow-2xl shadow-black/60 ring-1 ring-zinc-800/60">
              <Image
                src="/Rahul_Resume.webp"
                alt="Rahul Sahani — Resume"
                width={1240}
                height={1754}
                priority
                className="w-full h-auto"
                draggable={false}
              />
            </div>
            <p className="font-mono text-[9px] tracking-[0.2em] text-zinc-300 uppercase">
              // preview is an image — text not selectable.{" "}
              <a
                href="/Rahul_Resume.pdf"
                download="Rahul_Sahani_Resume.pdf"
                className="text-zinc-200 hover:text-zinc-100 underline underline-offset-2 transition-colors"
              >
                Download PDF
              </a>
              {" "}to copy text.
            </p>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}

/** Call from anywhere to open the resume modal. */
export function openResume() {
  document.dispatchEvent(new CustomEvent("open-resume"));
}
