import { Download, ExternalLink, ArrowLeft, MapPin, Mail } from "lucide-react";
import { Github, Linkedin } from "@/components/Icons";
import Link from "next/link";
import Image from "next/image";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Resume",
  description: "Rahul Sahani's resume — Full-Stack Developer & Creative Engineer",
};

const skills = ["React", "Next.js", "TypeScript", "Node.js", "Three.js", "PostgreSQL", "Python", "AI Tools"];

export default function ResumePage() {
  return (
    <div className="fixed inset-0 bg-black flex">

      {/* ══════════════════ SIDEBAR ══════════════════ */}
      <aside className="hidden md:flex flex-col w-60 shrink-0 border-r border-zinc-800/60 bg-zinc-950 overflow-hidden relative">

        {/* Decorative scan line */}
        <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-zinc-600/40 to-transparent" />

        {/* Header label */}
        <div className="px-6 pt-6 pb-4 border-b border-zinc-800/40">
          <span className="font-mono text-[9px] tracking-[0.3em] text-zinc-600 uppercase">
            // resume.sys
          </span>
          <div className="flex gap-1 mt-3">
            <div className="w-2 h-2 rounded-sm bg-zinc-800" />
            <div className="w-2 h-2 rounded-sm bg-zinc-800" />
            <div className="w-2 h-2 rounded-sm bg-zinc-700" />
          </div>
        </div>

        {/* Identity block */}
        <div className="px-6 py-6 border-b border-zinc-800/40">
          <p className="font-mono text-[9px] tracking-[0.25em] text-zinc-600 uppercase mb-3">
            // identity
          </p>
          <h1 className="text-zinc-100 text-lg font-bold tracking-tight leading-tight">
            Rahul<br />Sahani
          </h1>
          <p className="text-zinc-500 font-mono text-[10px] tracking-widest uppercase mt-2">
            Full Stack Dev
          </p>
          <div className="flex items-center gap-1.5 mt-3">
            <div className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
            <span className="font-mono text-[9px] text-zinc-500">Open to opportunities</span>
          </div>
          <div className="flex items-center gap-1.5 mt-1.5">
            <MapPin className="w-2.5 h-2.5 text-zinc-700" />
            <span className="font-mono text-[9px] text-zinc-600">New Delhi, India</span>
          </div>
        </div>

        {/* Skills */}
        <div className="px-6 py-5 border-b border-zinc-800/40">
          <p className="font-mono text-[9px] tracking-[0.25em] text-zinc-600 uppercase mb-3">
            // stack
          </p>
          <div className="flex flex-wrap gap-1.5">
            {skills.map((s) => (
              <span
                key={s}
                className="font-mono text-[9px] px-1.5 py-0.5 border border-zinc-800 text-zinc-500 hover:border-zinc-600 hover:text-zinc-300 transition-colors"
              >
                {s}
              </span>
            ))}
          </div>
        </div>

        {/* Links */}
        <div className="px-6 py-5 border-b border-zinc-800/40">
          <p className="font-mono text-[9px] tracking-[0.25em] text-zinc-600 uppercase mb-3">
            // network
          </p>
          <div className="flex flex-col gap-2">
            <a
              href="https://github.com/Rahul-Sahani04"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-2 text-zinc-500 hover:text-zinc-200 transition-colors group"
            >
              <Github className="w-3 h-3" />
              <span className="font-mono text-[9px] tracking-widest group-hover:underline underline-offset-2">
                Rahul-Sahani04
              </span>
            </a>
            <a
              href="https://linkedin.com/in/rahul1sahani"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-2 text-zinc-500 hover:text-zinc-200 transition-colors group"
            >
              <Linkedin className="w-3 h-3" />
              <span className="font-mono text-[9px] tracking-widest group-hover:underline underline-offset-2">
                rahul1sahani
              </span>
            </a>
            <a
              href="mailto:me.rsahani@gmail.com"
              className="flex items-center gap-2 text-zinc-500 hover:text-zinc-200 transition-colors group"
            >
              <Mail className="w-3 h-3" />
              <span className="font-mono text-[9px] tracking-widest group-hover:underline underline-offset-2">
                me.rsahani@gmail.com
              </span>
            </a>
          </div>
        </div>

        {/* Actions */}
        <div className="px-6 py-5 mt-auto flex flex-col gap-2">
          <a
            href="/Rahul_Resume.pdf"
            download="Rahul_Sahani_Resume.pdf"
            className="flex items-center justify-center gap-2 font-mono text-[10px] tracking-widest uppercase bg-zinc-100 hover:bg-white text-zinc-900 transition-colors py-2.5"
          >
            <Download className="w-3 h-3" />
            Download PDF
          </a>
          <a
            href="/Rahul_Resume.pdf"
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center justify-center gap-2 font-mono text-[10px] tracking-widest uppercase border border-zinc-800 hover:border-zinc-600 text-zinc-500 hover:text-zinc-200 transition-colors py-2.5"
          >
            <ExternalLink className="w-3 h-3" />
            Open in Tab
          </a>
          <Link
            href="/"
            className="flex items-center justify-center gap-2 font-mono text-[10px] tracking-widest uppercase text-zinc-700 hover:text-zinc-400 transition-colors py-1.5 group mt-1"
          >
            <ArrowLeft className="w-3 h-3 group-hover:-translate-x-0.5 transition-transform" />
            Back to Site
          </Link>
        </div>

        {/* Decorative bottom line */}
        <div className="absolute bottom-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-zinc-600/30 to-transparent" />
      </aside>

      {/* ══════════════════ MAIN PANE ══════════════════ */}
      <div className="flex-1 flex flex-col min-w-0">

        {/* Mobile top bar */}
        <div className="md:hidden flex items-center justify-between px-4 py-3 border-b border-zinc-800/60 bg-zinc-950/90 backdrop-blur-sm shrink-0">
          <Link
            href="/"
            className="text-zinc-500 hover:text-zinc-200 transition-colors flex items-center gap-2 font-mono text-[10px] tracking-widest uppercase group"
          >
            <ArrowLeft className="w-3.5 h-3.5 group-hover:-translate-x-0.5 transition-transform" />
            Back
          </Link>
          <div className="flex items-center gap-2">
            <a
              href="/Rahul_Resume.pdf"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-1.5 font-mono text-[10px] tracking-widest uppercase text-zinc-400 hover:text-zinc-200 transition-colors px-2.5 py-1.5 border border-zinc-800 hover:border-zinc-600"
            >
              <ExternalLink className="w-3 h-3" />
            </a>
            <a
              href="/Rahul_Resume.pdf"
              download="Rahul_Sahani_Resume.pdf"
              className="flex items-center gap-1.5 font-mono text-[10px] tracking-widest uppercase text-zinc-900 bg-zinc-100 hover:bg-white transition-colors px-2.5 py-1.5"
            >
              <Download className="w-3 h-3" />
              Download
            </a>
          </div>
        </div>

        {/* Resume image — works on all screen sizes */}
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

      </div>
    </div>
  );
}
