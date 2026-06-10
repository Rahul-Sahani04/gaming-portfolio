"use client";

import { useRef, useState } from "react";
import { saveGuestbookEntry } from "../actions";
import { motion, AnimatePresence } from "framer-motion";
import { Loader2, Send } from "lucide-react";
import { playStampThud } from "./audio";

export default function GuestbookForm() {
  const formRef = useRef<HTMLFormElement>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [errors, setErrors] = useState<{ name?: string[]; message?: string[] } | string | null>(null);

  async function action(formData: FormData) {
    setIsSubmitting(true);
    setErrors(null);

    const result = await saveGuestbookEntry(formData);

    if (result?.error) {
      setErrors(result.error as any);
    } else {
      formRef.current?.reset();
      playStampThud();
      setSubmitted(true);
      setTimeout(() => setSubmitted(false), 3000);
    }

    setIsSubmitting(false);
  }

  const inputClass =
    "w-full px-4 py-3 rounded-xl bg-white/[0.03] border border-white/[0.08] text-zinc-100 placeholder-zinc-600 text-sm " +
    "focus:outline-none focus:ring-1 focus:ring-white/20 focus:border-white/20 transition-all duration-200";

  return (
    <motion.div
      initial={{ opacity: 0, y: 16 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: 0.1 }}
      className="relative overflow-hidden w-full mb-10 p-6 md:p-8 rounded-2xl bg-white/[0.02] border border-white/[0.06] backdrop-blur-md"
    >
      <div className="flex items-center justify-between mb-6">
        <h3 className="text-lg font-semibold tracking-tight text-zinc-100 font-display">
          Leave a message
        </h3>
        <span className="text-[9px] font-mono text-zinc-700 tracking-[0.2em] uppercase border border-white/[0.05] px-2.5 py-0.5 rounded-full">
          Public
        </span>
      </div>

      <AnimatePresence>
        {submitted && (
          <motion.div
            initial={{ opacity: 0, scale: 2, rotate: -15 }}
            animate={{ opacity: 1, scale: 1, rotate: -5 }}
            exit={{ opacity: 0, scale: 0.8 }}
            transition={{ type: "spring", bounce: 0.6, duration: 0.5 }}
            className="absolute inset-0 z-50 flex items-center justify-center pointer-events-none"
          >
            <div className="border-4 border-amber-600 text-amber-600 font-black text-5xl md:text-6xl tracking-[0.2em] px-8 py-4 uppercase bg-amber-950/40 backdrop-blur-sm rounded-sm shadow-[0_0_50px_rgba(217,119,6,0.5)] mix-blend-screen">
              LOGGED
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      <form ref={formRef} action={action} className="space-y-3.5">
        <div>
          <label htmlFor="name" className="block text-xs font-mono text-zinc-600 mb-1.5 tracking-wider uppercase">
            Name
          </label>
          <input
            type="text"
            name="name"
            id="name"
            placeholder="Your name"
            required
            className={inputClass}
          />
          {typeof errors === "object" && errors?.name && (
            <p className="mt-1 text-xs text-red-400">{errors.name[0]}</p>
          )}
        </div>

        <div>
          <label htmlFor="message" className="block text-xs font-mono text-zinc-600 mb-1.5 tracking-wider uppercase">
            Message
          </label>
          <textarea
            name="message"
            id="message"
            placeholder="Leave a message for future visitors..."
            required
            rows={3}
            className={`${inputClass} resize-none`}
          />
          {typeof errors === "object" && errors?.message && (
            <p className="mt-1 text-xs text-red-400">{errors.message[0]}</p>
          )}
        </div>

        {typeof errors === "string" && (
          <p className="text-xs text-red-400">{errors}</p>
        )}

        <div className="flex justify-end pt-1">
          <button
            type="submit"
            disabled={isSubmitting}
            className="flex items-center gap-2 px-5 py-2.5 rounded-xl bg-white hover:bg-zinc-100 text-black text-sm font-medium transition-all disabled:opacity-40 disabled:cursor-not-allowed hover:-translate-y-0.5 shadow-md hover:shadow-lg"
          >
            {isSubmitting ? (
              <>
                <Loader2 className="w-3.5 h-3.5 animate-spin" />
                Transmitting...
              </>
            ) : (
              <>
                <Send className="w-3.5 h-3.5" />
                Sign
              </>
            )}
          </button>
        </div>
      </form>
    </motion.div>
  );
}
