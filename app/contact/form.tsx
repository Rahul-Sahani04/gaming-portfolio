"use client";

import { useRef, useState } from "react";
import { sendContactEmail } from "../actions";
import { motion } from "framer-motion";
import { Loader2, Send } from "lucide-react";

export default function ContactForm() {
  const formRef = useRef<HTMLFormElement>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [status, setStatus] = useState<{ type: 'success' | 'error'; message: string } | null>(null);

  async function action(formData: FormData) {
    setIsSubmitting(true);
    setStatus(null);

    const result = await sendContactEmail(formData);

    if (result?.error) {
      setStatus({ type: 'error', message: typeof result.error === 'string' ? result.error : "Failed to send message" });
    } else {
      formRef.current?.reset();
      setStatus({ type: 'success', message: "Message sent successfully! I'll get back to you soon." });
    }

    setIsSubmitting(false);
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: 0.2 }}
      className="w-full max-w-xl mx-auto p-6 rounded-2xl bg-zinc-900/50 border border-zinc-800 backdrop-blur-sm"
    >
      <h3 className="text-xl font-bold text-zinc-100 mb-6">Send me a message</h3>
      <form
        ref={formRef}
        action={action}
        className="space-y-4"
      >
        <div>
          <label htmlFor="email" className="block text-sm font-medium text-zinc-400 mb-1">
            Email
          </label>
          <input
            type="email"
            name="email"
            id="email"
            placeholder="your@email.com"
            required
            className="w-full px-4 py-2 rounded-lg bg-zinc-950 border border-zinc-800 text-zinc-100 placeholder-zinc-600 focus:outline-none focus:ring-2 focus:ring-blue-500/50 focus:border-transparent transition-all"
          />
        </div>

        <div>
          <label htmlFor="subject" className="block text-sm font-medium text-zinc-400 mb-1">
            Subject
          </label>
          <input
            type="text"
            name="subject"
            id="subject"
            placeholder="What's this about?"
            required
            className="w-full px-4 py-2 rounded-lg bg-zinc-950 border border-zinc-800 text-zinc-100 placeholder-zinc-600 focus:outline-none focus:ring-2 focus:ring-blue-500/50 focus:border-transparent transition-all"
          />
        </div>

        <div>
          <label htmlFor="message" className="block text-sm font-medium text-zinc-400 mb-1">
            Message
          </label>
          <textarea
            name="message"
            id="message"
            placeholder="Your message..."
            required
            rows={4}
            className="w-full px-4 py-2 rounded-lg bg-zinc-950 border border-zinc-800 text-zinc-100 placeholder-zinc-600 focus:outline-none focus:ring-2 focus:ring-blue-500/50 focus:border-transparent transition-all resize-none"
          />
        </div>

        {status && (
          <p className={`text-sm ${status.type === 'success' ? 'text-green-400' : 'text-red-400'}`}>
            {status.message}
          </p>
        )}

        <div className="flex justify-end">
          <button
            type="submit"
            disabled={isSubmitting}
            className="flex items-center gap-2 px-6 py-2 rounded-lg text-white font-medium transition-colors disabled:opacity-50 disabled:cursor-not-allowed bg-zinc-800 border border-zinc-700 hover:bg-zinc-700"
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
