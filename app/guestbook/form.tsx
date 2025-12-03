"use client";

import { useRef, useState } from "react";
// import { saveGuestbookEntry } from "../actions"; // We'll import this after creating it, or pass it as a prop if needed, but direct import is fine in Next.js 14
import { saveGuestbookEntry } from "../actions";
import { motion } from "framer-motion";
import { Loader2, Send } from "lucide-react";

export default function GuestbookForm() {
  const formRef = useRef<HTMLFormElement>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [errors, setErrors] = useState<{ name?: string[]; message?: string[] } | string | null>(null);

  async function action(formData: FormData) {
    setIsSubmitting(true);
    setErrors(null);

    const result = await saveGuestbookEntry(formData);

    if (result?.error) {
      setErrors(result.error as any);
    } else {
      formRef.current?.reset();
    }

    setIsSubmitting(false);
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="w-full max-w-2xl mx-auto mb-12 p-6 rounded-2xl bg-zinc-900/50 border border-zinc-800 backdrop-blur-sm"
    >
      <h3 className="text-xl font-bold text-zinc-100 mb-4">Sign the Guestbook</h3>
      <form
        ref={formRef}
        action={action}
        className="space-y-4"
      >
        <div>
          <label htmlFor="name" className="block text-sm font-medium text-zinc-400 mb-1">
            Name
          </label>
          <input
            type="text"
            name="name"
            id="name"
            placeholder="Your name"
            required
            className="w-full px-4 py-2 rounded-lg bg-zinc-950 border border-zinc-800 text-zinc-100 placeholder-zinc-600 focus:outline-none focus:ring-2 focus:ring-zinc-500/50 focus:border-transparent transition-all"
          />
          {typeof errors === 'object' && errors?.name && (
            <p className="mt-1 text-sm text-red-400">{errors.name[0]}</p>
          )}
        </div>

        <div>
          <label htmlFor="message" className="block text-sm font-medium text-zinc-400 mb-1">
            Message
          </label>
          <textarea
            name="message"
            id="message"
            placeholder="Leave a nice message..."
            required
            rows={3}
            className="w-full px-4 py-2 rounded-lg bg-zinc-950 border border-zinc-800 text-zinc-100 placeholder-zinc-600 focus:outline-none focus:ring-2 focus:ring-zinc-500/50 focus:border-transparent transition-all resize-none"
          />
          {typeof errors === 'object' && errors?.message && (
            <p className="mt-1 text-sm text-red-400">{errors.message[0]}</p>
          )}
        </div>

        {typeof errors === 'string' && (
          <p className="text-sm text-red-400">{errors}</p>
        )}

        <div className="flex justify-end">
          <button
            type="submit"
            disabled={isSubmitting}
            className="flex items-center gap-2 px-6 py-2 rounded-lg bg-zinc-100 hover:bg-zinc-200 text-zinc-900 font-medium transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {isSubmitting ? (
              <>
                <Loader2 className="w-4 h-4 animate-spin" />
                Signing...
              </>
            ) : (
              <>
                <Send className="w-4 h-4" />
                Sign
              </>
            )}
          </button>
        </div>
      </form>
    </motion.div>
  );
}
