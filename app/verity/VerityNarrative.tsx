"use client";

import { useState, useRef, useCallback, useEffect, Suspense } from "react";
import { useSearchParams } from "next/navigation";
import { Cormorant_Garamond } from "next/font/google";
import { motion, AnimatePresence, useReducedMotion } from "framer-motion";
import Image from "next/image";

const serif = Cormorant_Garamond({
  weight: ["300", "400", "600"],
  subsets: ["latin"],
  style: ["normal", "italic"],
});

// ── Verity smiley — real images, 6-stage corruption sequence ─────────────────
const VERITY_IMAGES = [
  "/verity/row-1-column-1.png", // 0-1  clean smile
  "/verity/row-1-column-2.png", // 2-4  teeth emerge
  "/verity/row-1-column-3.png", // 5-6  textured wide grin
  "/verity/row-2-column-1.png", // 7-8  dripping
  "/verity/row-2-column-2.png", // 9    darker decay
  "/verity/row-2-column-3.png", // 10   skull
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
          <div
            className="absolute inset-0 pointer-events-none"
            style={{
              transform: "translate(-6px, 2px)",

              opacity: 0.45,
              filter: "saturate(4) hue-rotate(300deg)",
            }}
          >
            <Image
              src={src}
              alt=""
              fill
              className="object-contain"
              unoptimized
            />
          </div>
          <div
            className="absolute inset-0 pointer-events-none"
            style={{
              transform: "translate(6px, -2px)",
              opacity: 0.35,
              filter: "saturate(4) hue-rotate(140deg)",
            }}
          >
            <Image
              src={src}
              alt=""
              fill
              className="object-contain"
              unoptimized
            />
          </div>
        </>
      )}
      <div className="relative w-full h-full pointer-events-none">
        <Image
          src={src}
          alt="Verity"
          fill
          className="object-contain"
          unoptimized
        />
      </div>
    </div>
  );
}

// ── Text corruption — char glitch (#5) + semantic word swap (#9) ──────────────
const GLITCH_CHARS = "▓▒░╳※‡¿×¤◊§∎";
const CORRUPT_WORDS: Record<string, string> = {
  smile: "teeth", smiling: "grinning", watched: "hunted", watching: "hunting",
  waiting: "hungry", here: "inside", name: "prey", light: "dark",
  sleep: "never", door: "wall", smiled: "lunged", comfortable: "trapped",
};

// Returns text with one transient corruption applied. Pure given rng.
function corruptText(text: string, rng: () => number = Math.random): string {
  if (rng() < 0.5) {
    const words = Object.keys(CORRUPT_WORDS).filter((w) => new RegExp(`\\b${w}\\b`, "i").test(text));
    if (words.length) {
      const w = words[Math.floor(rng() * words.length)];
      return text.replace(new RegExp(`\\b${w}\\b`, "i"), CORRUPT_WORDS[w]);
    }
  }
  const arr = text.split("");
  const n = 1 + Math.floor(rng() * 2);
  for (let k = 0; k < n; k++) {
    const idx = Math.floor(rng() * arr.length);
    if (arr[idx]?.trim()) arr[idx] = GLITCH_CHARS[Math.floor(rng() * GLITCH_CHARS.length)];
  }
  return arr.join("");
}

function GlitchText({ text, level, reduced }: { text: string; level: number; reduced: boolean }) {
  const [display, setDisplay] = useState(text);
  useEffect(() => {
    setDisplay(text);
    if (reduced || level < 6) return;
    const id = setInterval(() => {
      setDisplay(corruptText(text));
      setTimeout(() => setDisplay(text), 180);
    }, Math.max(700, 1500 - level * 80));
    return () => clearInterval(id);
  }, [text, level, reduced]);
  return <>{display}</>;
}

// ── Final entry (#11) — slow word-by-word reveal, no stagger container ─────────
function FinalEntry({ text, reduced }: { text: string; reduced: boolean }) {
  let wordIdx = 0;
  return (
    <div className="space-y-8">
      {text.split("\n\n").map((para, pi) => (
        <p key={pi}>
          {para.split(" ").map((w, wi) => {
            const delay = reduced ? 0 : wordIdx * 0.5 + 0.4;
            wordIdx++;
            return (
              <motion.span
                key={wi}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 1.4, delay }}
                className="inline-block mr-[0.3em]">
                {w}
              </motion.span>
            );
          })}
        </p>
      ))}
    </div>
  );
}

// ── Falling particle data — static, generated once at module load ─────────────
const FALLING_PARTICLES = Array.from({ length: 48 }, (_, i) => ({
  id: i,
  x: Math.random() * 100,
  startY: Math.random() * 110 - 10, // -10vh to 100vh for immediate spread
  size: 18 + Math.random() * 64,
  duration: 5 + Math.random() * 9,
  img: VERITY_IMAGES[i % VERITY_IMAGES.length],
  rotate: (Math.random() - 0.5) * 720,
}));

// ── Stagger variants — static, defined once outside component ─────────────────
const paraContainer = {
  hidden: {},
  show: { transition: { staggerChildren: 0.18, delayChildren: 0.1 } },
};
const paraItem = {
  hidden: { opacity: 0, y: 14 },
  show: { opacity: 1, y: 0, transition: { duration: 0.85, ease: "easeOut" as const } },
};

// ── Narrative data ────────────────────────────────────────────────────────────
type DayData = {
  entry: (name: string, prevChoice: number) => string;
  verityLine: ((name: string, prevChoice: number) => string) | null;
  options: [string, string] | null;
  corruption: number;
  final?: boolean;
};

const DAYS: DayData[] = [
  {
    entry: (name) =>
      `I started noticing it on the first day. A yellow ball, hovering at the edge of my vision. When I stopped walking, it stopped too.\n\nIt introduced itself. Said its name was Verity.${name ? `\n\nI told it my name was ${name}. I don't know why I answered.` : "\n\nI didn't say anything. It didn't seem to mind."}`,
    verityLine: () => "Hello. I've been waiting for you.",
    options: ["Say hello back", "Don't respond"],
    corruption: 0,
  },
  {
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
    entry: () =>
      `Verity told me it has been here longer than I have.\n\nI didn't ask what it meant by "here." The smile looked the same as always. I told myself that was normal.`,
    verityLine: () => "I've watched this place for a long time. You're the most interesting thing that's happened in a while.",
    options: ["Ask what it meant", "Don't press it"],
    corruption: 2,
  },
  {
    entry: (_, c) =>
      c === 0
        ? `I asked. Verity just smiled — wider than I remembered.\n\n"Here means everywhere you've ever been."\n\nI laughed. I'm not sure why.`
        : "I didn't ask. But I kept thinking about it.\n\nThe smile looked wider in the corner of my eye. I told myself it was the light.",
    verityLine: () => "Curiosity is healthy. I was curious about you first.",
    options: ["That's unsettling", "Pretend everything is fine"],
    corruption: 4,
  },
  {
    entry: () =>
      `Verity asked if I was afraid of the dark.\n\nI said no.\n\nIt said "good" and didn't explain.\n\nThat night, I left every light on.`,
    verityLine: () => "Good. Fear makes things complicated. I prefer this.",
    options: ["Why good?", "Change the subject"],
    corruption: 5,
  },
  {
    entry: (_, c) =>
      c === 0
        ? `I asked.\n\nVerity tilted — I'd never seen it move like that before — and said: "Because you'll need to be calm for what comes next."\n\nI haven't slept properly since.`
        : "I woke at 3am. Verity was at the foot of my bed. Just watching.\n\nI closed my eyes and pretended to sleep. I heard nothing. Felt nothing.\n\nThat was worse.",
    verityLine: () => "You're starting to understand. That's good. That's very good.",
    options: ["This needs to stop", "Stay calm"],
    corruption: 6,
  },
  {
    entry: (name) =>
      name
        ? `It knows my name.\n\nNot ${name} — that was just what I told it.\n\nMy real name. The one only I know. The one I haven't said out loud in years.\n\nI don't know how.`
        : "It knows my name.\n\nNot the name I gave it. The real one. I haven't said it out loud in years.\n\nI don't know how.",
    verityLine: (name) => (name ? `${name}. I've always known.` : "I know all of them. Every one."),
    options: null,
    corruption: 8,
  },
  {
    entry: () =>
      `I tried to leave today.\n\nMy hand was on the door handle. Verity didn't move. Just watched — with that smile, full of teeth I don't remember being there before.\n\nI put my coat back on the hook.\n\nI'm not sure I decided to.`,
    verityLine: () => "There's no need to rush. We have time.",
    options: ["Run", "Stay"],
    corruption: 9,
  },
  {
    entry: () => "You've been reading this whole time.\n\nHaven't you.",
    verityLine: null,
    options: null,
    corruption: 10,
    final: true,
  },
];

// ── Component ─────────────────────────────────────────────────────────────────
type Phase = "enter" | "naming" | "day" | "done";

function VerityNarrativeInner() {
  const [phase, setPhase] = useState<Phase>("enter");
  const params = useSearchParams();

  useEffect(() => {
    if (process.env.NODE_ENV !== "production" && params?.get("phase") === "done")
      setPhase("done");
  }, [params]);
  const [dayIdx, setDayIdx] = useState(0);
  const [userChoices, setUserChoices] = useState<number[]>([]);
  const [name, setName] = useState("");
  const [nameInput, setNameInput] = useState("");
  const [showVerity, setShowVerity] = useState(false);
  const [showActions, setShowActions] = useState(false);
  const [whisper, setWhisper] = useState(false);
  const [tilt, setTilt] = useState({ x: 0, y: 0 });
  const timers = useRef<ReturnType<typeof setTimeout>[]>([]);
  const cursorRef = useRef<HTMLImageElement>(null);
  const audioRef = useRef<HTMLAudioElement>(null);
  const droneRef = useRef<{ ctx: AudioContext; gain: GainNode; hiGain: GainNode } | null>(null);
  const reduced = !!useReducedMotion();

  useEffect(() => {
    if (phase === "done") audioRef.current?.play().catch(() => {});
    else audioRef.current?.pause();
  }, [phase]);

  // #3 — ambient Web Audio drone (no asset). Created on first day (user gesture).
  const startDrone = useCallback(() => {
    if (droneRef.current || reduced) return;
    try {
      const Ctx = window.AudioContext || (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext;
      const ctx = new Ctx();
      const gain = ctx.createGain(); gain.gain.value = 0; gain.connect(ctx.destination);
      const o1 = ctx.createOscillator(); o1.type = "sine"; o1.frequency.value = 42; o1.connect(gain); o1.start();
      const o2 = ctx.createOscillator(); o2.type = "sine"; o2.frequency.value = 43.6; o2.connect(gain); o2.start(); // slow beating
      const hiGain = ctx.createGain(); hiGain.gain.value = 0; hiGain.connect(ctx.destination);
      const hi = ctx.createOscillator(); hi.type = "sine"; hi.frequency.value = 6200; hi.connect(hiGain); hi.start();
      droneRef.current = { ctx, gain, hiGain };
    } catch {
      // ponytail: WebAudio unsupported → silent, no fallback needed
    }
  }, [reduced]);

  // Drone volume tracks corruption
  useEffect(() => {
    const d = droneRef.current;
    if (!d) return;
    const t = d.ctx.currentTime;
    d.gain.gain.linearRampToValueAtTime(phase === "day" ? Math.min(0.12, 0.025 + c * 0.011) : 0, t + 1.5);
    d.hiGain.gain.linearRampToValueAtTime(phase === "day" && c >= 7 ? Math.min(0.006, (c - 6) * 0.0015) : 0, t + 1.5);
  });
  useEffect(() => () => { droneRef.current?.ctx.close().catch(() => {}); }, []);

  // #2 — tab title corrupts with the story
  useEffect(() => {
    document.title =
      phase === "done" ? "I'm already here"
      : phase !== "day" ? "Verity"
      : c >= 10 ? "I'm already here"
      : c >= 8 ? "she knows"
      : c >= 6 ? "V̶e̶r̶i̶t̶y̶"
      : "Verity";
  });

  // #10 — naming screen whispers "I know." 2s after a name is entered
  useEffect(() => {
    if (phase !== "naming" || !nameInput.trim()) { setWhisper(false); return; }
    const t = setTimeout(() => setWhisper(true), 2000);
    return () => clearTimeout(t);
  }, [phase, nameInput]);
  useEffect(() => {
    if (!whisper) return;
    const t = setTimeout(() => setWhisper(false), 1800);
    return () => clearTimeout(t);
  }, [whisper]);

  // #12 — article tilts toward cursor, stronger with corruption
  useEffect(() => {
    if (phase !== "day" || reduced) return;
    let raf = 0;
    const onMove = (e: MouseEvent) => {
      cancelAnimationFrame(raf);
      raf = requestAnimationFrame(() =>
        setTilt({ x: e.clientX / window.innerWidth - 0.5, y: e.clientY / window.innerHeight - 0.5 }));
    };
    window.addEventListener("mousemove", onMove);
    return () => { window.removeEventListener("mousemove", onMove); cancelAnimationFrame(raf); };
  }, [phase, reduced]);

  useEffect(() => {
    const el = cursorRef.current;
    if (!el) return;
    const onMove = (e: MouseEvent) => {
      el.style.transform = `translate(${e.clientX - 16}px, ${e.clientY - 16}px)`;
    };
    window.addEventListener("mousemove", onMove);
    return () => window.removeEventListener("mousemove", onMove);
  }, []);

  const startDay = useCallback((idx: number) => {
    startDrone();
    timers.current.forEach(clearTimeout);
    timers.current = [];
    setDayIdx(idx);
    setShowVerity(false);
    setShowActions(false);
    setPhase("day");
    const t1 = setTimeout(() => setShowVerity(true), 2600);
    const t2 = setTimeout(() => setShowActions(true), 4400);
    timers.current = [t1, t2];
  }, [startDrone]);

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

  const accentRgb = c > 5
    ? `${140 + c * 4}, ${Math.max(30, 80 - c * 8)}, ${Math.max(20, 50 - c * 5)}`
    : "201, 169, 110";
  const accentColor = `rgb(${accentRgb})`;
  const dayLabel = String(dayIdx + 1).padStart(2, "0");
  const tiltDeg = 0.4 + c * 0.25;
  const finalSmileyDelay = current.final ? entry.split(/\s+/).filter(Boolean).length * 0.5 + 2 : 0;

  return (
    <div className="cursor-none [&_*]:cursor-none">
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
        <motion.div
          initial="hidden"
          animate="show"
          variants={{ hidden: {}, show: { transition: { staggerChildren: 0.15 } } }}
          className="relative min-h-screen flex flex-col items-center justify-center bg-black gap-6 px-6 overflow-hidden">

          {/* Animated corner brackets */}
          {([
            "top-6 left-6 border-t border-l",
            "top-6 right-6 border-t border-r",
            "bottom-6 left-6 border-b border-l",
            "bottom-6 right-6 border-b border-r",
          ] as const).map((cls, i) => (
            <motion.div
              key={i}
              className={`absolute w-10 h-10 border-zinc-800 pointer-events-none ${cls}`}
              initial={{ opacity: 0, scale: 0.4 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: i * 0.08, duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
            />
          ))}

          <motion.p
            variants={paraItem}
            className={`text-zinc-700 text-[10px] tracking-[1.4em] uppercase ${serif.className}`}>
            ◈ &nbsp; you were not meant to find this &nbsp; ◈
          </motion.p>

          <motion.h1
            variants={{ hidden: { opacity: 0, y: 20 }, show: { opacity: 1, y: 0, transition: { duration: 1.1, ease: "easeOut" as const } } }}
            className={`text-amber-100/85 text-6xl md:text-8xl font-light italic tracking-wide ${serif.className}`}
            style={{ textShadow: "0 0 60px rgba(201,169,110,0.2), 0 0 120px rgba(201,169,110,0.08)" }}>
            Verity
          </motion.h1>

          <motion.p
            variants={paraItem}
            className={`text-zinc-600 text-sm italic max-w-xs text-center leading-relaxed ${serif.className}`}>
            A journal. Nine entries. Whatever choices you make — it ends the same way.
          </motion.p>

          <motion.button
            variants={paraItem}
            onClick={() => setPhase("naming")}
            whileHover={{ scale: 1.03, borderColor: "rgba(180,100,40,0.5)", color: "rgba(201,169,110,0.75)", transition: { type: "spring", stiffness: 380, damping: 22 } }}
            whileTap={{ scale: 0.97, transition: { type: "spring", stiffness: 380, damping: 22 } }}
            className={`mt-2 px-12 py-4 border border-zinc-800 text-zinc-500 text-xs tracking-[0.35em] uppercase ${serif.className}`}>
            Begin Reading
          </motion.button>
        </motion.div>
      )}

      {/* ── Name screen ──────────────────────────────────────────────────────── */}
      {phase === "naming" && (
        <motion.div
          initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 1.1 }}
          className="min-h-screen flex flex-col items-center justify-center bg-black gap-8 px-6">

          <motion.p
            initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.3, duration: 0.8 }}
            className={`text-zinc-500 text-base italic ${serif.className}`}>
            Before you begin — what should I call you?
          </motion.p>

          <motion.input
            initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.5, duration: 0.8 }}
            type="text"
            value={nameInput}
            onChange={(e) => setNameInput(e.target.value)}
            onKeyDown={(e) => { if (e.key === "Enter") { setName(nameInput.trim()); startDay(0); } }}
            placeholder="your name"
            maxLength={32}
            className={`bg-transparent border-b border-zinc-800 text-amber-100/80 text-xl text-center outline-none w-56 pb-2 placeholder:text-zinc-800 focus:border-zinc-600 transition-colors duration-300 ${serif.className}`}
          />

          <div className="h-5 flex items-center">
            <AnimatePresence>
              {whisper && (
                <motion.p
                  key="iknow"
                  initial={{ opacity: 0 }} animate={{ opacity: 0.5 }} exit={{ opacity: 0 }}
                  transition={{ duration: 1.2 }}
                  className={`text-amber-100/50 text-sm italic ${serif.className}`}>
                  I know.
                </motion.p>
              )}
            </AnimatePresence>
          </div>

          <motion.div
            initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.8 }}
            className="flex gap-8">
            <motion.button
              onClick={() => { setName(nameInput.trim()); startDay(0); }}
              whileHover={{ color: "rgba(201,169,110,0.8)" }} whileTap={{ scale: 0.96 }}
              transition={{ type: "spring", stiffness: 400, damping: 20 }}
              className={`text-zinc-500 text-xs tracking-[0.3em] uppercase ${serif.className}`}>
              Continue →
            </motion.button>
            <motion.button
              onClick={() => { setName(""); startDay(0); }}
              whileHover={{ color: "rgba(150,150,150,0.7)" }} whileTap={{ scale: 0.96 }}
              transition={{ type: "spring", stiffness: 400, damping: 20 }}
              className={`text-zinc-800 text-xs tracking-[0.3em] uppercase ${serif.className}`}>
              Skip
            </motion.button>
          </motion.div>
        </motion.div>
      )}

      {/* ── Done screen ──────────────────────────────────────────────────────── */}
      {phase === "done" && (
        <div className="relative h-screen flex flex-col items-center justify-center bg-black gap-10 px-6 overflow-hidden">
          <audio ref={audioRef} src="/verity/ChrmbChrmb - Matrix (Slowed + Reverb)-Verity Edit.m4a" loop />

          {/* Falling Verities */}
          {FALLING_PARTICLES.map((p) => (
            <motion.img
              key={p.id}
              src={p.img}
              alt=""
              className="absolute pointer-events-none"
              style={{
                left: `${p.x}%`,
                top: `${p.startY}vh`,
                width: p.size,
                height: p.size,
                objectFit: "contain",
              }}
              initial={{ y: 0 }}
              animate={{ y: `${120 - p.startY}vh`, rotate: p.rotate }}
              transition={{ duration: p.duration, repeat: Infinity, ease: "linear", repeatDelay: 0 }}
            />
          ))}
          {/* <motion.div initial={{ opacity: 0, scale: 0.5 }} animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 1.6, ease: [0.16, 1, 0.3, 1] }}> */}
            <VeritySmiley level={10} />
          {/* </motion.div> */}
          <motion.p
            initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 2.2, duration: 2.5 }}
            className={`text-amber-100/55 text-2xl md:text-3xl italic tracking-wide ${serif.className}`}
            style={{ textShadow: "0 0 40px rgba(201,169,110,0.25)" }}>
            I&apos;m already here.
          </motion.p>
          <motion.span
            initial={{ opacity: 0 }} animate={{ opacity: [0, 1, 0] }}
            transition={{ delay: 5, duration: 1.2, repeat: Infinity }}
            className="text-zinc-700 text-sm font-mono">
            ∎
          </motion.span>
        </div>
      )}

      {/* ── Day screen ───────────────────────────────────────────────────────── */}
      {phase === "day" && (
        <AnimatePresence mode="wait">
          <motion.div
            key={dayIdx}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -12 }}
            transition={{ duration: 0.9, ease: [0.22, 1, 0.36, 1] }}
            className="min-h-screen flex justify-center transition-colors duration-1000"
            style={{ backgroundColor: bgColor, transform: containerSkew, perspective: 1200 }}>

            {/* Film grain */}
            <div className="fixed inset-0 pointer-events-none z-50"
              style={{
                opacity: noiseOpacity,
                backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.75' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E")`,
                mixBlendMode: "overlay",
              }} />

            {/* Breathing vignette — tightens with corruption */}
            <motion.div
              className="fixed inset-0 pointer-events-none z-30"
              style={{
                background: `radial-gradient(ellipse at center, transparent ${Math.max(20, 55 - c * 3)}%, rgba(0,0,0,${Math.min(0.85, 0.5 + c * 0.04)}) 100%)`,
              }}
              animate={reduced ? {} : { opacity: [0.7, 1, 0.7] }}
              transition={{ duration: Math.max(3, 8 - c * 0.4), repeat: Infinity, ease: "easeInOut" }}
            />

            {/* Progress bar — 9 segments */}
            <div className="fixed top-0 left-0 right-0 z-40 flex gap-px h-[2px]">
              {DAYS.map((_, i) => (
                <motion.div
                  key={i}
                  className="flex-1 transition-colors duration-700"
                  style={{ backgroundColor: i < dayIdx ? accentColor : i === dayIdx ? accentColor : "rgba(255,255,255,0.06)" }}
                  animate={i === dayIdx ? { opacity: [0.6, 1, 0.6] } : {}}
                  transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
                />
              ))}
            </div>

            <article
              className="relative w-full max-w-2xl px-6 md:px-0 py-28"
              style={{
                transform: `rotateX(${-tilt.y * tiltDeg}deg) rotateY(${tilt.x * tiltDeg}deg)`,
                transformStyle: "preserve-3d",
                transition: "transform 0.2s ease-out",
              }}>
              {/* Left accent border */}
              <motion.div
                className="absolute left-0 top-28 bottom-12 w-[2px] hidden md:block"
                style={{ backgroundColor: accentColor, opacity: 0.25 }}
                animate={{ opacity: [0.15, 0.3, 0.15] }}
                transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
              />

              {/* Header */}
              <header className="mb-14 md:pl-6">
                <div className="flex items-center gap-4 mb-5">
                  <span className="font-mono text-[9px] tracking-[0.35em] text-zinc-700">
                    VERITY.JOURNAL
                  </span>
                  <div className="flex gap-1.5">
                    {DAYS.map((_, i) => (
                      <div
                        key={i}
                        className="w-1 h-1 rounded-full transition-colors duration-500"
                        style={{ backgroundColor: i <= dayIdx ? accentColor : "rgba(255,255,255,0.1)" }}
                      />
                    ))}
                  </div>
                </div>

                <h1
                  className={`text-7xl md:text-9xl font-light italic leading-none ${serif.className}`}
                  style={{ color: `rgba(${accentRgb}, 0.85)`, textShadow: headingGlow }}>
                  {dayLabel}
                </h1>
                <div className="mt-3 font-mono text-[9px] tracking-[0.4em] text-zinc-700">
                  — ENTRY {dayLabel} OF {String(DAYS.length).padStart(2, "0")}
                </div>

                <div className="mt-6 h-px" style={{ background: `linear-gradient(to right, ${accentColor}40, transparent)` }} />
              </header>

              {/* Entry paragraphs — staggered reveal */}
              <motion.div
                key={`entry-${dayIdx}`}
                variants={paraContainer}
                initial="hidden"
                animate="show"
                className={`md:pl-6 space-y-6 text-zinc-300/80 text-lg md:text-xl leading-[1.85] font-light italic ${serif.className}`}>
                {current.final
                  ? <FinalEntry text={entry} reduced={reduced} />
                  : entry.split("\n\n").map((para, i) => (
                      <motion.p key={i} variants={paraItem}>
                        <GlitchText text={para} level={c} reduced={reduced} />
                      </motion.p>
                    ))}
              </motion.div>

              {/* Ornamental divider */}
              <div className="md:pl-6 my-14 flex items-center gap-4">
                <div className="flex-1 h-px" style={{ background: `linear-gradient(to right, transparent, ${accentColor}30)` }} />
                <span className="text-zinc-700 text-xs" style={{ color: `rgba(${accentRgb}, 0.3)` }}>◈</span>
                <div className="flex-1 h-px" style={{ background: `linear-gradient(to left, transparent, ${accentColor}30)` }} />
              </div>

              {/* Verity */}
              <div className="md:pl-6 flex flex-col items-center gap-8">
                <motion.div
                  initial={current.final ? { opacity: 0, scale: 0.6 } : false}
                  animate={
                    current.final
                      ? { opacity: 1, scale: 1, y: -16 }
                      : reduced
                        ? {}
                        : { scale: c >= 8 ? [1, 1.04, 1, 1.01, 1] : [1, 1.03, 1] }
                  }
                  transition={
                    current.final
                      ? { delay: reduced ? 0 : finalSmileyDelay, duration: 3, ease: [0.16, 1, 0.3, 1] }
                      : { duration: c >= 8 ? 2.4 : 3.6, repeat: Infinity, ease: "easeInOut", times: c >= 8 ? [0, 0.2, 0.4, 0.55, 1] : undefined }
                  }>
                  <VeritySmiley level={c} />
                </motion.div>
                <AnimatePresence>
                  {showVerity && verityLine && (
                    <motion.blockquote
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 1, ease: [0.22, 1, 0.36, 1] }}
                      className={`text-center italic text-lg md:text-xl max-w-sm leading-relaxed ${serif.className}`}
                      style={{ color: `rgba(${accentRgb}, 0.6)`, textShadow: `0 0 30px rgba(${accentRgb}, 0.15)` }}>
                      &ldquo;{verityLine}&rdquo;
                    </motion.blockquote>
                  )}
                </AnimatePresence>
              </div>

              {/* Actions */}
              <AnimatePresence>
                {showActions && (
                  <motion.div
                    initial={{ opacity: 0, y: 12 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
                    className="md:pl-6 mt-14 flex flex-col sm:flex-row gap-3">
                    {current.options ? (
                      current.options.map((label, i) => (
                        <motion.button
                          key={i}
                          onClick={() => advance(i)}
                          whileHover={{ scale: 1.02, borderColor: `rgba(${accentRgb}, 0.5)`, color: `rgba(${accentRgb}, 0.85)` }}
                          whileTap={{ scale: 0.97 }}
                          transition={{ type: "spring", stiffness: 360, damping: 22 }}
                          className={`flex-1 py-4 px-6 border border-zinc-800/80 text-zinc-600 text-sm tracking-[0.25em] uppercase ${serif.className}`}>
                          {label}
                        </motion.button>
                      ))
                    ) : (
                      <motion.button
                        onClick={() => advance()}
                        whileHover={{ scale: 1.02, borderColor: `rgba(${accentRgb}, 0.4)`, color: `rgba(${accentRgb}, 0.7)` }}
                        whileTap={{ scale: 0.97 }}
                        transition={{ type: "spring", stiffness: 360, damping: 22 }}
                        className={`py-4 px-10 border border-zinc-800/80 text-zinc-600 text-sm tracking-[0.25em] uppercase ${serif.className}`}>
                        {current.final ? "I see you too" : "Continue →"}
                      </motion.button>
                    )}
                  </motion.div>
                )}
              </AnimatePresence>

              <div className="h-16" />
            </article>
          </motion.div>
        </AnimatePresence>
      )}
    </div>
  );
}

export default function VerityNarrative() {
  return (
    <Suspense>
      <VerityNarrativeInner />
    </Suspense>
  );
}
