"use client";

import { useState, useRef } from "react";
import { submitEndorsement } from "./actions";
import { useUploadThing } from "../../utils/uploadthing";
import { motion, AnimatePresence } from "framer-motion";
import { Loader2, Send, ImagePlus, X, CheckCircle2, User } from "lucide-react";

const inputClass =
  "w-full px-4 py-3 rounded-xl bg-white/[0.03] border border-white/[0.08] text-zinc-100 placeholder-zinc-600 text-sm " +
  "focus:outline-none focus:ring-1 focus:ring-amber-500/40 focus:border-amber-500/30 transition-all duration-200";

type UploadState = { url: string | null; preview: string | null; uploading: boolean; error: string | null };

function useImageUpload(routeKey: "avatarUploader" | "memeUploader") {
  const [state, setState] = useState<UploadState>({ url: null, preview: null, uploading: false, error: null });
  const { startUpload } = useUploadThing(routeKey);
  const inputRef = useRef<HTMLInputElement>(null);

  const handleFile = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    setState({ url: null, preview: URL.createObjectURL(file), uploading: true, error: null });
    const res = await startUpload([file]);
    if (res?.[0]?.url) {
      setState((s) => ({ ...s, url: res[0].url, uploading: false }));
    } else {
      setState({ url: null, preview: null, uploading: false, error: "Upload failed — try again" });
    }
  };

  const clear = () => {
    setState({ url: null, preview: null, uploading: false, error: null });
    if (inputRef.current) inputRef.current.value = "";
  };

  return { state, handleFile, clear, inputRef };
}

export default function InviteForm({ token, label }: { token: string; label: string }) {
  const [submitted, setSubmitted] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [errors, setErrors] = useState<Record<string, string[]> | string | null>(null);

  const avatar = useImageUpload("avatarUploader");
  const meme = useImageUpload("memeUploader");

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (avatar.state.uploading || meme.state.uploading) return;
    setIsSubmitting(true);
    setErrors(null);

    const fd = new FormData(e.currentTarget);
    const raw: Record<string, string> = {};
    fd.forEach((val, key) => { if (typeof val === "string") raw[key] = val; });

    if (avatar.state.url) raw.avatarUrl = avatar.state.url;
    if (meme.state.url) raw.memeUrl = meme.state.url;

    const res = await submitEndorsement(token, raw);
    if (res?.error) {
      setErrors(res.error as any);
    } else {
      setSubmitted(true);
    }
    setIsSubmitting(false);
  };

  if (submitted) {
    return (
      <div className="min-h-screen bg-black flex items-center justify-center px-4">
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ type: "spring", damping: 20 }}
          className="text-center"
        >
          <div className="text-[10px] font-mono text-amber-500/70 tracking-[0.25em] uppercase mb-4 flex items-center justify-center gap-2">
            <span className="w-1 h-1 rounded-sm bg-amber-500/50" />
            TRANSMISSION RECEIVED
          </div>
          <h1 className="text-4xl font-black tracking-tighter text-zinc-100 uppercase mb-4">
            You&apos;re on the Blacklist 🫡
          </h1>
          <p className="text-zinc-500 text-sm max-w-xs mx-auto">
            Your entry will show up in the Signals From My Peers section on the guestbook.
          </p>
        </motion.div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-black px-4 pt-16 pb-24">
      {/* Atmosphere */}
      <div className="fixed inset-0 bg-[radial-gradient(ellipse_80%_60%_at_50%_-10%,rgba(255,160,0,0.04),transparent)] pointer-events-none" />

      <div className="max-w-xl mx-auto">
        <div className="text-center mb-10">
          <div className="text-[10px] font-mono text-amber-500/70 tracking-[0.25em] uppercase mb-4 flex items-center justify-center gap-2">
            <span className="w-1 h-1 rounded-sm bg-amber-500/50" />
            PERSONAL INVITE
          </div>
          <h1 className="text-4xl font-black tracking-tighter text-zinc-100 uppercase mb-3">
            Join the Blacklist
          </h1>
          <p className="text-zinc-500 text-sm">
            Rahul sent you this link. Fill it out and you&apos;ll appear on his guestbook forever.
          </p>
          {label && (
            <span className="inline-block mt-3 text-[10px] font-mono text-amber-500/60 border border-amber-500/20 px-3 py-1 rounded-sm tracking-widest uppercase">
              For: {label}
            </span>
          )}
        </div>

        <form onSubmit={handleSubmit} className="space-y-4 p-6 md:p-8 rounded-2xl bg-white/[0.02] border border-white/[0.06] backdrop-blur-md">

          {/* Avatar upload */}
          <div>
            <label className="block text-xs font-mono text-zinc-600 mb-2 tracking-wider uppercase">
              Profile Photo <span className="text-zinc-700 normal-case tracking-normal font-sans">(optional)</span>
            </label>
            {!avatar.state.preview ? (
              <button
                type="button"
                onClick={() => avatar.inputRef.current?.click()}
                className="flex items-center gap-2 w-full justify-center px-4 py-3 rounded-xl border border-dashed border-white/[0.08] bg-white/[0.02] text-zinc-500 hover:text-amber-400 hover:border-amber-500/30 text-sm transition-colors"
              >
                <User className="w-4 h-4" />
                Upload your photo
              </button>
            ) : (
              <div className="flex items-center gap-3">
                <div className="relative w-14 h-14 rounded-full overflow-hidden border border-white/[0.08] shrink-0">
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img src={avatar.state.preview} alt="Avatar preview" className="w-full h-full object-cover" />
                  {avatar.state.uploading && (
                    <div className="absolute inset-0 bg-black/60 flex items-center justify-center">
                      <Loader2 className="w-4 h-4 animate-spin text-amber-400" />
                    </div>
                  )}
                </div>
                <div className="flex-1 min-w-0">
                  {avatar.state.uploading && <p className="text-xs text-amber-400 font-mono">Uploading…</p>}
                  {avatar.state.url && (
                    <p className="text-xs text-zinc-400 flex items-center gap-1">
                      <CheckCircle2 className="w-3.5 h-3.5 text-amber-400" /> Photo uploaded
                    </p>
                  )}
                </div>
                <button type="button" onClick={avatar.clear} className="text-zinc-600 hover:text-red-400 transition-colors">
                  <X className="w-4 h-4" />
                </button>
              </div>
            )}
            {avatar.state.error && <p className="mt-1 text-xs text-red-400">{avatar.state.error}</p>}
            <input ref={avatar.inputRef} type="file" accept="image/*" className="hidden" onChange={avatar.handleFile} />
          </div>

          {/* Name */}
          <div>
            <label htmlFor="name" className="block text-xs font-mono text-zinc-600 mb-1.5 tracking-wider uppercase">Name</label>
            <input type="text" name="name" id="name" placeholder="Your name" required className={inputClass} />
            {typeof errors === "object" && errors?.name && <p className="mt-1 text-xs text-red-400">{errors.name[0]}</p>}
          </div>

          {/* Role */}
          <div>
            <label htmlFor="role" className="block text-xs font-mono text-zinc-600 mb-1.5 tracking-wider uppercase">Role / Title</label>
            <input type="text" name="role" id="role" placeholder="e.g. Software Engineer · Gamer · Human" required className={inputClass} />
            {typeof errors === "object" && errors?.role && <p className="mt-1 text-xs text-red-400">{errors.role[0]}</p>}
          </div>

          {/* Message */}
          <div>
            <label htmlFor="message" className="block text-xs font-mono text-zinc-600 mb-1.5 tracking-wider uppercase">Message</label>
            <textarea name="message" id="message" placeholder="Say something about Rahul…" required rows={4} className={`${inputClass} resize-none`} />
            {typeof errors === "object" && errors?.message && <p className="mt-1 text-xs text-red-400">{errors.message[0]}</p>}
          </div>

          {/* Social links */}
          <div className="space-y-2.5">
            <p className="text-xs font-mono text-zinc-600 tracking-wider uppercase">
              Socials <span className="text-zinc-700 normal-case tracking-normal font-sans">(all optional)</span>
            </p>
            {[
              { name: "linkedin", placeholder: "LinkedIn URL" },
              { name: "github", placeholder: "GitHub URL" },
              { name: "instagram", placeholder: "Instagram URL" },
              { name: "youtube", placeholder: "YouTube URL" },
              { name: "twitter", placeholder: "Twitter / X URL" },
              { name: "pinterest", placeholder: "Pinterest URL" },
            ].map(({ name, placeholder }) => (
              <input key={name} type="url" name={name} placeholder={placeholder} className={inputClass} />
            ))}
          </div>

          {/* Meme upload */}
          <div>
            <label className="block text-xs font-mono text-zinc-600 mb-2 tracking-wider uppercase">
              Meme / Image <span className="text-zinc-700 normal-case tracking-normal font-sans">(optional)</span>
            </label>
            {!meme.state.preview ? (
              <button
                type="button"
                onClick={() => meme.inputRef.current?.click()}
                className="flex items-center gap-2 w-full justify-center px-4 py-3 rounded-xl border border-dashed border-white/[0.08] bg-white/[0.02] text-zinc-500 hover:text-amber-400 hover:border-amber-500/30 text-sm transition-colors"
              >
                <ImagePlus className="w-4 h-4" />
                Drop a meme
              </button>
            ) : (
              <div className="relative inline-flex rounded-xl overflow-hidden border border-white/[0.08]">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img src={meme.state.preview} alt="Meme preview" className="h-32 w-auto object-cover" />
                {meme.state.uploading && (
                  <div className="absolute inset-0 bg-black/60 flex items-center justify-center gap-2 text-xs text-amber-400 font-mono">
                    <Loader2 className="w-4 h-4 animate-spin" /> Uploading…
                  </div>
                )}
                {!meme.state.uploading && meme.state.url && (
                  <div className="absolute top-2 left-2 bg-black/60 rounded-full p-0.5">
                    <CheckCircle2 className="w-4 h-4 text-amber-400" />
                  </div>
                )}
                <button
                  type="button"
                  onClick={meme.clear}
                  className="absolute top-2 right-2 bg-black/60 hover:bg-black/90 text-white rounded-full p-0.5 transition-colors"
                  aria-label="Remove image"
                >
                  <X className="w-3.5 h-3.5" />
                </button>
              </div>
            )}
            {meme.state.error && <p className="mt-1 text-xs text-red-400">{meme.state.error}</p>}
            <input ref={meme.inputRef} type="file" accept="image/*" className="hidden" onChange={meme.handleFile} />
          </div>

          {typeof errors === "string" && <p className="text-xs text-red-400">{errors}</p>}

          <div className="flex justify-end pt-2">
            <button
              type="submit"
              disabled={isSubmitting || avatar.state.uploading || meme.state.uploading}
              className="flex items-center gap-2 px-6 py-2.5 rounded-xl bg-amber-500 hover:bg-amber-400 text-black text-sm font-bold transition-colors disabled:opacity-40 disabled:cursor-not-allowed"
            >
              {isSubmitting ? <Loader2 className="w-4 h-4 animate-spin" /> : <Send className="w-4 h-4" />}
              {isSubmitting ? "Transmitting…" : "Submit to Blacklist"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
