"use client";

import { useRef, useState } from "react";
import { sendContactEmail } from "../actions";
import { motion, AnimatePresence } from "framer-motion";
import { Loader2, Send, CheckCircle2, Zap } from "lucide-react";

export default function ContactForm() {
  const formRef = useRef<HTMLFormElement>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [status, setStatus] = useState<{
    type: "success" | "error";
    message: string;
  } | null>(null);

  async function action(formData: FormData) {
    setIsSubmitting(true);
    setStatus(null);

    const result = await sendContactEmail(formData);

    if (result?.error) {
      setStatus({
        type: "error",
        message:
          typeof result.error === "string"
            ? result.error
            : "Transmission failed. Try again.",
      });
    } else {
      formRef.current?.reset();
      setStatus({
        type: "success",
        message: "Message transmitted. I'll respond within 24 hours.",
      });
    }

    setIsSubmitting(false);
  }

  const inputClass =
    "w-full px-4 py-3.5 rounded-xl bg-white/[0.03] border border-white/[0.08] text-zinc-100 placeholder-zinc-600 text-sm " +
    "focus:outline-none focus:ring-1 focus:ring-white/25 focus:border-white/25 transition-all duration-200";

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: 0.15 }}
      className="w-full p-6 sm:p-8 rounded-2xl bg-white/[0.02] border border-white/[0.07] backdrop-blur-md shadow-2xl"
    >
      {/* Header */}
      <div className="flex items-center gap-3 mb-8">
        <div className="flex items-center justify-center w-8 h-8 rounded-lg bg-white/[0.05] border border-white/[0.08]">
          <Zap className="w-4 h-4 text-zinc-400" />
        </div>
        <div>
          <h3 className="text-base font-semibold text-zinc-100 font-display tracking-tight">
            Send a transmission
          </h3>
          <p className="text-xs text-zinc-600 font-light">All fields marked required are mandatory</p>
        </div>
      </div>

      <form ref={formRef} action={action} className="space-y-4">
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div>
            <label htmlFor="name" className="block text-[10px] font-mono text-zinc-600 mb-1.5 tracking-[0.15em] uppercase">
              Your name
            </label>
            <input
              type="text"
              name="name"
              id="name"
              placeholder="What should I call you?"
              className={inputClass}
            />
          </div>
          <div>
            <label htmlFor="email" className="block text-[10px] font-mono text-zinc-600 mb-1.5 tracking-[0.15em] uppercase">
              Email <span className="text-zinc-700">*</span>
            </label>
            <input
              type="email"
              name="email"
              id="email"
              placeholder="your@email.com"
              required
              className={inputClass}
            />
          </div>
        </div>

        <div>
          <label htmlFor="subject" className="block text-[10px] font-mono text-zinc-600 mb-1.5 tracking-[0.15em] uppercase">
            Subject <span className="text-zinc-700">*</span>
          </label>
          <input
            type="text"
            name="subject"
            id="subject"
            placeholder="Project collab, idea, or just saying hi"
            required
            className={inputClass}
          />
        </div>

        <div>
          <label htmlFor="message" className="block text-[10px] font-mono text-zinc-600 mb-1.5 tracking-[0.15em] uppercase">
            Message <span className="text-zinc-700">*</span>
          </label>
          <textarea
            name="message"
            id="message"
            placeholder="Tell me what you're building or how I can help..."
            required
            rows={5}
            className={`${inputClass} resize-none`}
          />
        </div>

        <AnimatePresence>
          {status && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: "auto" }}
              exit={{ opacity: 0, height: 0 }}
              className={`flex items-center gap-2.5 text-sm rounded-xl px-4 py-3 ${
                status.type === "success"
                  ? "text-emerald-400 bg-emerald-950/40 border border-emerald-800/40"
                  : "text-red-400 bg-red-950/30 border border-red-900/40"
              }`}
            >
              {status.type === "success" && <CheckCircle2 className="w-4 h-4 shrink-0" />}
              {status.message}
            </motion.div>
          )}
        </AnimatePresence>

        <div className="flex justify-end pt-1">
          <button
            type="submit"
            disabled={isSubmitting}
            className="flex items-center gap-2 px-5 py-2.5 rounded-xl bg-white hover:bg-zinc-100 text-black text-sm font-medium transition-all disabled:opacity-40 disabled:cursor-not-allowed hover:-translate-y-0.5 shadow-md hover:shadow-xl"
          >
            {isSubmitting ? (
              <>
                <Loader2 className="w-3.5 h-3.5 animate-spin" />
                Sending...
              </>
            ) : (
              <>
                <Send className="w-3.5 h-3.5" />
                Send message
              </>
            )}
          </button>
        </div>
      </form>
    </motion.div>
  );
}