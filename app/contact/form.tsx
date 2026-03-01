"use client";

import { useRef, useState } from "react";
import { sendContactEmail } from "../actions";
import { motion } from "framer-motion";
import { Loader2, Send } from "lucide-react";

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
            : "Failed to send message",
      });
    } else {
      formRef.current?.reset();
      setStatus({
        type: "success",
        message: "Message sent successfully. I’ll get back to you soon.",
      });
    }

    setIsSubmitting(false);
  }

  const inputStyles =
    "w-full px-4 py-3.5 rounded-xl bg-black/50 border border-white/10 text-zinc-100 placeholder-zinc-500 text-base " +
    "focus:outline-none focus:ring-2 focus:ring-white/30 focus:border-white/30 transition-all";

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.45, delay: 0.15 }}
      className="w-full max-w-2xl mx-auto p-6 sm:p-8 rounded-2xl bg-white/[0.02] border border-white/[0.1] shadow-2xl backdrop-blur-md"
    >
      <h3 className="text-2xl font-bold text-zinc-100 mb-8 font-display">
        Send me a message
      </h3>

      <form ref={formRef} action={action} className="space-y-5">
        {/* Name (optional) */}
        <div className="space-y-1.5">
          <label
            htmlFor="name"
            className="block text-sm font-medium text-zinc-400"
          >
            Name <span className="text-zinc-600">(optional)</span>
          </label>
          <input
            type="text"
            name="name"
            id="name"
            placeholder="What should I call you?"
            className={inputStyles}
          />
        </div>

        {/* Email */}
        <div className="space-y-1.5">
          <label
            htmlFor="email"
            className="block text-sm font-medium text-zinc-400"
          >
            Email
          </label>
          <input
            type="email"
            name="email"
            id="email"
            placeholder="your@email.com"
            required
            className={inputStyles}
          />
        </div>

        {/* Subject */}
        <div className="space-y-1.5">
          <label
            htmlFor="subject"
            className="block text-sm font-medium text-zinc-400"
          >
            Subject
          </label>
          <input
            type="text"
            name="subject"
            id="subject"
            placeholder="Project idea, collaboration, or just saying hi?"
            required
            className={inputStyles}
          />
        </div>

        {/* Message */}
        <div className="space-y-1.5">
          <label
            htmlFor="message"
            className="block text-sm font-medium text-zinc-400"
          >
            Message
          </label>
          <textarea
            name="message"
            id="message"
            placeholder="Tell me what you're building or how I can help..."
            required
            rows={5}
            className={`${inputStyles} resize-none`}
          />
        </div>

        {/* Status message */}
        {status && (
          <motion.p
            initial={{ opacity: 0, y: 4 }}
            animate={{ opacity: 1, y: 0 }}
            className={`text-sm ${status.type === "success"
              ? "text-green-400"
              : "text-red-400"
              }`}
          >
            {status.message}
          </motion.p>
        )}

        {/* CTA */}
        <div className="flex justify-stretch sm:justify-end">
          <button
            type="submit"
            disabled={isSubmitting}
            className="w-full sm:w-auto flex items-center justify-center gap-2 px-6 py-3 min-h-[48px] rounded-xl bg-white hover:bg-zinc-200 text-black font-medium transition-all disabled:opacity-50 disabled:cursor-not-allowed shadow-lg hover:shadow-xl hover:-translate-y-0.5"
          >
            {isSubmitting ? (
              <>
                <Loader2 className="w-4 h-4 animate-spin" />
                Sending...
              </>
            ) : (
              <>
                <Send className="w-4 h-4" />
                Send Message
              </>
            )}
          </button>
        </div>
      </form>
    </motion.div>
  );
}