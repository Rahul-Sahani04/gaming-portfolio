"use client";

import { useState, useRef, useCallback, useEffect } from "react";
import { Cormorant_Garamond } from "next/font/google";
import { motion, AnimatePresence } from "framer-motion";
import Image from "next/image";

const serif = Cormorant_Garamond({
  weight: ["300", "400", "600"],
  subsets: ["latin"],
  style: ["normal", "italic"],
});

// ── Verity smiley — real images, 6-stage corruption sequence ─────────────────
const VERITY_IMAGES = [
  "/verity/row-1-column-1.webp", // 0-1  clean smile
  "/verity/row-1-column-2.webp", // 2-4  teeth emerge
  "/verity/row-1-column-3.webp", // 5-6  textured wide grin
  "/verity/row-2-column-1.webp", // 7-8  dripping
  "/verity/row-2-column-2.webp", // 9    darker decay
  "/verity/row-2-column-3.webp", // 10   skull
];

function getVerityImage(level: number): string {
  if (level <= 1) return VERITY_IMAGES[0];
  if (level <= 4) return VERITY_IMAGES[1];
  if (level <= 6) return VERITY_IMAGES[2];
  if (level <= 7) return VERITY_IMAGES[3];
  if (level <= 9) return VERITY_IMAGES[4];
  return VERITY_IMAGES[5];
}

function VeritySmiley({ level }: { level: number }) {
  const src = getVerityImage(level);
  const glitch = level >= 8;
  const size = 220 + level * 4;

  return (
    <div className="relative select-none" style={{ width: size, height: size }}>
      {glitch && (
        <>
          <div className="absolute inset-0 pointer-events-none"
            style={{ transform: "translate(-6px, 2px)", mixBlendMode: "screen", opacity: 0.45, filter: "saturate(4) hue-rotate(300deg)" }}>
            <Image src={src} alt="" fill className="object-contain" unoptimized />
          </div>
          <div className="absolute inset-0 pointer-events-none"
            style={{ transform: "translate(6px, -2px)", mixBlendMode: "screen", opacity: 0.35, filter: "saturate(4) hue-rotate(140deg)" }}>
            <Image src={src} alt="" fill className="object-contain" unoptimized />
          </div>
        </>
      )}
      <div className="relative w-full h-full pointer-events-none">
        <Image src={src} alt="Verity" fill className="object-contain mix-blend-screen" unoptimized />
      </div>
    </div>
  );
}

// ── Narrative data ────────────────────────────────────────────────────────────
type DayData = {
  day: number;
  entry: (name: string, prevChoice: number) => string;
  verityLine: ((name: string, prevChoice: number) => string) | null;
  options: [string, string] | null;
  corruption: number;
  final?: boolean;
};

const DAYS: DayData[] = [
  {
    day: 1,
    entry: (name) =>
      `I started noticing it on the first day. A yellow ball, hovering at the edge of my vision. When I stopped walking, it stopped too.\n\nIt introduced itself. Said its name was Verity.${name ? `\n\nI told it my name was ${name}. I don't know why I answered.` : "\n\nI didn't say anything. It didn't seem to mind."}`,
    verityLine: () => "Hello. I've been waiting for you.",
    options: ["Say hello back", "Don't respond"],
    corruption: 0,
  },
  {
    day: 2,
    entry: (_, c) =>
      c === 0
        ? "Verity talked all day. About nothing in particular — the weather, the light, the way shadows pool under doorframes. It was oddly comfortable.\n\nI think I'm okay with it being here."
        : "I ignored it. It followed me anyway, hovering just behind my left shoulder. Silent. Patient.\n\nWhen I turned around quickly, it was always smiling.",
    verityLine: (_, c) =>
      c === 0 ? "You're warmer than the last one. I like that." : "Silence is an answer too. I don't mind waiting.",
    options: ["Let it stay", "Tell it to leave"],
    corruption: 1,
  },
  {
    day: 3,
    entry: () =>
      `Verity told me it has been here longer than I have.\n\nI didn't ask what it meant by "here." The smile looked the same as always. I told myself that was normal.`,
    verityLine: () => "I've watched this place for a long time. You're the most interesting thing that's happened in a while.",
    options: ["Ask what it meant", "Don't press it"],
    corruption: 2,
  },
  {
    day: 4,
    entry: (_, c) =>
      c === 0
        ? `I asked. Verity just smiled — wider than I remembered.\n\n"Here means everywhere you've ever been."\n\nI laughed. I'm not sure why.`
        : "I didn't ask. But I kept thinking about it.\n\nThe smile looked wider in the corner of my eye. I told myself it was the light.",
    verityLine: () => "Curiosity is healthy. I was curious about you first.",
    options: ["That's unsettling", "Pretend everything is fine"],
    corruption: 4,
  },
  {
    day: 5,
    entry: () =>
      `Verity asked if I was afraid of the dark.\n\nI said no.\n\nIt said "good" and didn't explain.\n\nThat night, I left every light on.`,
    verityLine: () => "Good. Fear makes things complicated. I prefer this.",
    options: ["Why good?", "Change the subject"],
    corruption: 5,
  },
  {
    day: 6,
    entry: (_, c) =>
      c === 0
        ? `I asked.\n\nVerity tilted — I'd never seen it move like that before — and said: "Because you'll need to be calm for what comes next."\n\nI haven't slept properly since.`
        : "I woke at 3am. Verity was at the foot of my bed. Just watching.\n\nI closed my eyes and pretended to sleep. I heard nothing. Felt nothing.\n\nThat was worse.",
    verityLine: () => "You're starting to understand. That's good. That's very good.",
    options: ["This needs to stop", "Stay calm"],
    corruption: 6,
  },
  {
    day: 7,
    entry: (name) =>
      name
        ? `It knows my name.\n\nNot ${name} — that was just what I told it.\n\nMy real name. The one only I know. The one I haven't said out loud in years.\n\nI don't know how.`
        : "It knows my name.\n\nNot the name I gave it. The real one. I haven't said it out loud in years.\n\nI don't know how.",
    verityLine: (name) => (name ? `${name}. I've always known.` : "I know all of them. Every one."),
    options: null,
    corruption: 8,
  },
  {
    day: 8,
    entry: () =>
      `I tried to leave today.\n\nMy hand was on the door handle. Verity didn't move. Just watched — with that smile, full of teeth I don't remember being there before.\n\nI put my coat back on the hook.\n\nI'm not sure I decided to.`,
    verityLine: () => "There's no need to rush. We have time.",
    options: ["Run", "Stay"],
    corruption: 9,
  },
  {
    day: 9,
    entry: () => "You've been reading this whole time.\n\nHaven't you.",
    verityLine: null,
    options: null,
    corruption: 10,
    final: true,
  },
];

// ── Component ─────────────────────────────────────────────────────────────────
type Phase = "enter" | "naming" | "day" | "done";

export default function VerityNarrative() {
  const [phase, setPhase] = useState<Phase>("enter");
  const [dayIdx, setDayIdx] = useState(0);
  const [userChoices, setUserChoices] = useState<number[]>([]);
  const [name, setName] = useState("");
  const [nameInput, setNameInput] = useState("");
  const [showVerity, setShowVerity] = useState(false);
  const [showActions, setShowActions] = useState(false);
  const timers = useRef<ReturnType<typeof setTimeout>[]>([]);
  const cursorRef = useRef<HTMLImageElement>(null);

  useEffect(() => {
    const el = cursorRef.current;
    if (!el) return;
    const onMove = (e: MouseEvent) => {
      el.style.transform = `translate(${e.clientX - 16}px, ${e.clientY - 16}px)`;
    };
    window.addEventListener("mousemove", onMove);
    return () => window.removeEventListener("mousemove", onMove);
  }, []);

  const clearTimers = () => { timers.current.forEach(clearTimeout); timers.current = []; };

  const startDay = useCallback((idx: number) => {
    clearTimers();
    setDayIdx(idx);
    setShowVerity(false);
    setShowActions(false);
    setPhase("day");
    const t1 = setTimeout(() => setShowVerity(true), 2600);
    const t2 = setTimeout(() => setShowActions(true), 4400);
    timers.current = [t1, t2];
  }, []);

  const advance = useCallback((choiceIdx?: number) => {
    if (choiceIdx !== undefined) setUserChoices((prev) => [...prev, choiceIdx]);
    window.scrollTo({ top: 0, behavior: "smooth" });
    if (dayIdx >= DAYS.length - 1) { setPhase("done"); return; }
    startDay(dayIdx + 1);
  }, [dayIdx, startDay]);

  const current = DAYS[dayIdx];
  const prevChoice = userChoices[dayIdx - 1] ?? 0;
  const c = current.corruption;
  const bgColor = `hsl(${c > 3 ? c * 2 : 0}, ${c > 3 ? 8 : 0}%, ${Math.max(2, 5 - c * 0.25)}%)`;
  const headingGlow = c > 2 ? `0 0 ${c * 10}px rgba(201,169,110,${c * 0.03})` : "none";
  const containerSkew = c > 4 ? `rotate(${(c - 4) * 0.15}deg)` : undefined;
  const noiseOpacity = 0.04 + c * 0.012;

  const entry = phase === "day" ? current.entry(name, prevChoice) : "";
  const verityLine = phase === "day" ? (current.verityLine?.(name, prevChoice) ?? null) : null;

  return (
    <div className="cursor-none">
      {/* Custom cursor */}
      <img
        ref={cursorRef}
        src="/void/CreepyCursor.jpeg"
        alt=""
        aria-hidden="true"
        className="fixed top-0 left-0 pointer-events-none z-[99999] w-8 h-8 object-contain mix-blend-screen"
        style={{ willChange: "transform" }}
      />

      {/* ── Enter screen ─────────────────────────────────────────────────────── */}
      {phase === "enter" && (
        <div className="min-h-screen flex flex-col items-center justify-center bg-black gap-8 px-6">
          <div className="absolute inset-6 border border-zinc-900/60 pointer-events-none" />
          <p className={`text-zinc-700 text-[10px] tracking-[1.2em] uppercase ${serif.className}`}>
            ◈ &nbsp; you were not meant to find this &nbsp; ◈
          </p>
          <h1 className={`text-amber-100/80 text-5xl md:text-7xl font-light italic tracking-wide ${serif.className}`}
            style={{ textShadow: "0 0 40px rgba(201,169,110,0.25)" }}>
            Verity
          </h1>
          <p className={`text-zinc-600 text-sm italic max-w-xs text-center leading-relaxed ${serif.className}`}>
            A journal. Nine entries. Whatever choices you make — it ends the same way.
          </p>
          <button
            onClick={() => setPhase("naming")}
            className={`mt-4 px-10 py-4 border border-zinc-800 text-zinc-500 text-xs tracking-[0.3em] uppercase hover:border-amber-900/60 hover:text-amber-200/70 transition-all duration-500 ${serif.className}`}>
            Begin Reading
          </button>
        </div>
      )}

      {/* ── Name screen ──────────────────────────────────────────────────────── */}
      {phase === "naming" && (
        <motion.div
          initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 1.2 }}
          className="min-h-screen flex flex-col items-center justify-center bg-black gap-8 px-6">
          <p className={`text-zinc-500 text-sm italic ${serif.className}`}>
            Before you begin — what should I call you?
          </p>
          <input
            type="text"
            value={nameInput}
            onChange={(e) => setNameInput(e.target.value)}
            onKeyDown={(e) => { if (e.key === "Enter") { setName(nameInput.trim()); startDay(0); } }}
            placeholder="your name"
            maxLength={32}
            className={`bg-transparent border-b border-zinc-800 text-amber-100/80 text-xl text-center outline-none w-48 pb-2 placeholder:text-zinc-700 focus:border-zinc-600 transition-colors ${serif.className}`}
          />
          <div className="flex gap-6">
            <button
              onClick={() => { setName(nameInput.trim()); startDay(0); }}
              className={`text-zinc-500 text-xs tracking-[0.3em] uppercase hover:text-amber-200/70 transition-colors ${serif.className}`}>
              Continue →
            </button>
            <button
              onClick={() => { setName(""); startDay(0); }}
              className={`text-zinc-700 text-xs tracking-[0.3em] uppercase hover:text-zinc-500 transition-colors ${serif.className}`}>
              Skip
            </button>
          </div>
        </motion.div>
      )}

      {/* ── Done screen ──────────────────────────────────────────────────────── */}
      {phase === "done" && (
        <div className="min-h-screen flex flex-col items-center justify-center bg-black gap-10 px-6">
          <motion.div initial={{ opacity: 0, scale: 0.6 }} animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 1.4, ease: [0.16, 1, 0.3, 1] }}>
            <VeritySmiley level={10} />
          </motion.div>
          <motion.p
            initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 2, duration: 2 }}
            className={`text-amber-100/60 text-2xl italic tracking-wide ${serif.className}`}
            style={{ textShadow: "0 0 30px rgba(201,169,110,0.3)" }}>
            I&apos;m already here.
          </motion.p>
          <motion.span
            initial={{ opacity: 0 }} animate={{ opacity: [0, 1, 0] }}
            transition={{ delay: 4, duration: 1.2, repeat: Infinity }}
            className="text-zinc-600 text-sm font-mono">
            ∎
          </motion.span>
        </div>
      )}

      {/* ── Day screen ───────────────────────────────────────────────────────── */}
      {phase === "day" && (
        <AnimatePresence mode="wait">
          <motion.div
            key={dayIdx}
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -16 }}
            transition={{ duration: 1, ease: "easeInOut" }}
            className="min-h-screen px-6 py-32 flex justify-center transition-colors duration-1000"
            style={{ backgroundColor: bgColor, transform: containerSkew }}>

            {/* Film grain overlay */}
            <div className="fixed inset-0 pointer-events-none z-50"
              style={{
                opacity: noiseOpacity,
                backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.75' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E")`,
                mixBlendMode: "overlay",
              }} />

            <article className="w-full max-w-2xl">
              <header className="mb-12 border-b border-zinc-800/50 pb-8">
                <div className="font-mono text-[10px] tracking-[0.3em] text-zinc-700 mb-4">
                  // VERITY.JOURNAL — ENTRY {String(current.day).padStart(2, "0")}
                </div>
                <h1
                  className={`text-6xl md:text-8xl font-light italic text-amber-100/90 ${serif.className}`}
                  style={{ textShadow: headingGlow }}>
                  Day {String(current.day).padStart(2, "0")}
                </h1>
              </header>

              <div className={`space-y-5 text-zinc-300/85 text-lg md:text-xl leading-relaxed font-light italic ${serif.className}`}>
                {entry.split("\n\n").map((para, i) => (
                  <p key={i}>{para}</p>
                ))}
              </div>

              <div className="my-16 flex flex-col items-center gap-6">
                <VeritySmiley level={c} />
                <AnimatePresence>
                  {showVerity && verityLine && (
                    <motion.blockquote
                      initial={{ opacity: 0, y: 8 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.9 }}
                      className={`text-center italic text-amber-200/65 text-xl max-w-sm leading-relaxed ${serif.className}`}
                      style={{ textShadow: "0 0 20px rgba(201,169,110,0.25)" }}>
                      &ldquo;{verityLine}&rdquo;
                    </motion.blockquote>
                  )}
                </AnimatePresence>
              </div>

              <AnimatePresence>
                {showActions && (
                  <motion.div
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8 }}
                    className="mt-10 flex flex-col sm:flex-row gap-4">
                    {current.options ? (
                      current.options.map((label, i) => (
                        <button
                          key={i}
                          onClick={() => advance(i)}
                          className={`flex-1 py-4 px-6 border text-sm tracking-[0.2em] uppercase transition-all duration-300 border-zinc-800 text-zinc-500 hover:border-amber-900/70 hover:text-amber-200/80 ${serif.className}`}>
                          {label}
                        </button>
                      ))
                    ) : (
                      <button
                        onClick={() => advance()}
                        className={`py-4 px-8 border border-zinc-800 text-zinc-500 text-sm tracking-[0.2em] uppercase hover:border-zinc-700 hover:text-zinc-300 transition-all duration-300 ${serif.className}`}>
                        {current.final ? "I see you too" : "Continue →"}
                      </button>
                    )}
                  </motion.div>
                )}
              </AnimatePresence>
            </article>
          </motion.div>
        </AnimatePresence>
      )}
    </div>
  );
}
