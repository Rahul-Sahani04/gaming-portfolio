"use client";
import React, { useRef, useState, useEffect } from "react";
import { Navigation } from "../components/nav";
import { motion, useScroll, useTransform, useSpring, AnimatePresence } from "framer-motion";
import { X, Play } from "lucide-react";

const photos = [
    { src: "/photos/photo1.jpeg", caption: "Golden hour in the city." },
    { src: "/photos/photo2.jpeg", caption: "" },
    { src: "/photos/photo3.jpeg", caption: "Silence." }, // Intentional gap in data
    { src: "/photos/photo4.jpeg", caption: "" },
    { src: "/photos/photo5.jpeg", caption: "The texture of time." },
    { src: "/photos/photo6.jpeg", caption: "" },
    { src: "/photos/photo7.jpeg", caption: "Fading light." },
];

const videos = [
    "https://res.cloudinary.com/dezgrhc2p/video/upload/v1767875809/Video1_phjhvd.webm",
    "https://res.cloudinary.com/dezgrhc2p/video/upload/v1767875810/Video2_pvyjnf.webm",
    "https://res.cloudinary.com/dezgrhc2p/video/upload/v1767875810/Video3_m796he.webm",
];

const sketches = [
    "https://res.cloudinary.com/dezgrhc2p/image/upload/v1767876031/q7pdpuu1mo8jtgljkddv_u0t4to.webp",
    "https://res.cloudinary.com/dezgrhc2p/image/upload/v1767876029/velnid9wcpsdglztosqm_adqoe8.webp",
    "https://res.cloudinary.com/dezgrhc2p/image/upload/v1767876028/trrtumlt0s6nnx2fzpxn_bzjn20.webp",
    "https://res.cloudinary.com/dezgrhc2p/image/upload/v1767876027/vxgilaykn5izkaxizxtj_jg99qr.webp",
    "https://res.cloudinary.com/dezgrhc2p/image/upload/v1767876027/qnjjga6cv7ulgqxfx9k6_yahdph.webp",
];

export default function HobbiesPage() {
    const containerRef = useRef<HTMLDivElement>(null);
    const { scrollYProgress } = useScroll({
        target: containerRef,
        offset: ["start start", "end end"],
    });

    const scaleY = useSpring(scrollYProgress, {
        stiffness: 100,
        damping: 30,
        restDelta: 0.001,
    });

    const [selectedVideo, setSelectedVideo] = useState<string | null>(null);

    // Close on ESC
    useEffect(() => {
        const handleEsc = (e: KeyboardEvent) => {
            if (e.key === "Escape") setSelectedVideo(null);
        };
        window.addEventListener("keydown", handleEsc);
        return () => window.removeEventListener("keydown", handleEsc);
    }, []);

    return (
        <div className="bg-zinc-950 min-h-screen text-zinc-100 selection:bg-rose-500/30 selection:text-rose-200">
            <Navigation />

            {/* Video Modal */}
            <AnimatePresence>
                {selectedVideo && (
                    <VideoModal src={selectedVideo} onClose={() => setSelectedVideo(null)} />
                )}
            </AnimatePresence>

            {/* Progress Thread - The Constant */}
            <motion.div
                className="fixed left-6 md:left-12 top-0 bottom-0 w-[1px] bg-zinc-900 z-50 hidden md:block"
            >
                <motion.div
                    className="absolute top-0 w-full bg-rose-500/50 origin-top shadow-[0_0_10px_rgba(244,63,94,0.5)]"
                    style={{ scaleY, height: "100%" }}
                />
            </motion.div>

            <main ref={containerRef} className="relative z-10 flex flex-col items-center w-full overflow-hidden">

                {/* Intro - Minimal & Personal */}
                <section className="h-[80vh] flex flex-col items-center justify-center relative w-full px-6">
                    <motion.div
                        initial={{ opacity: 0, scale: 0.9 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{ duration: 1.5, ease: "easeOut" }}
                        className="relative"
                    >
                        <h1 className="text-5xl md:text-9xl font-display text-zinc-100 tracking-tighter text-center mix-blend-difference">
                            fragments
                        </h1>
                        <motion.span
                            initial={{ width: 0 }}
                            animate={{ width: "100%" }}
                            transition={{ delay: 1, duration: 1, ease: "easeInOut" }}
                            className="absolute -bottom-2 left-0 h-[2px] bg-rose-500 block"
                        />
                    </motion.div>

                    <motion.p
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.5, duration: 1 }}
                        className="mt-8 text-zinc-500 font-mono text-xs md:text-sm tracking-widest uppercase"
                    >
                        [ raw output ]
                    </motion.p>
                </section>

                {/* Photography - The "Throw" Interaction */}
                <section className="w-full max-w-6xl px-4 md:px-0 py-24 relative">
                    <ChapterMarker number="01" label="STILLS" className="md:absolute md:-left-8 md:top-0" />

                    <div className="flex flex-col space-y-32 md:space-y-0">
                        {photos.map((item, i) => (
                            <StreamItem key={i} index={i} src={item.src} caption={item.caption} />
                        ))}
                    </div>
                </section>

                {/* Videography - The "Surveillance" Interaction */}
                <section className="w-full py-48 bg-black relative border-t border-zinc-900 overflow-hidden">
                    <div className="absolute inset-0 opacity-[0.03] pointer-events-none mix-blend-overlay bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-zinc-800 via-black to-black"></div>
                    <ChapterMarker number="02" label="LOOPS" className="absolute top-12 md:left-[10%] z-20" />

                    <div className="max-w-[1800px] mx-auto px-6 overflow-x-auto no-scrollbar md:overflow-visible flex md:grid md:grid-cols-3 gap-12 pt-12 md:pt-32 snap-x snap-mandatory">
                        {videos.map((vid, i) => (
                            <VideoItem key={i} src={vid} index={i} onClick={() => setSelectedVideo(vid)} />
                        ))}
                    </div>

                    <div className="absolute bottom-12 right-12 text-zinc-800 font-mono text-[10px] hidden md:block">
                        REC ● {new Date().toLocaleTimeString()}
                    </div>
                </section>

                {/* Sketches - The "Ink" Interaction */}
                <section className="w-full max-w-5xl px-6 py-48 relative min-h-screen flex flex-col justify-center">
                    <ChapterMarker number="03" label="INK" className="mb-24 md:mb-0 md:absolute md:right-[10%] md:top-24 text-right" />

                    <div className="columns-1 md:columns-2 gap-12 md:gap-24 space-y-12 md:space-y-24">
                        {sketches.map((src, i) => (
                            <SketchItem key={i} src={src} index={i} />
                        ))}
                    </div>

                    <div className="mt-48 text-center">
                        <span className="font-serif italic text-2xl text-zinc-700">"Imperfection is the point."</span>
                    </div>
                </section>

                {/* Outro */}
                <section className="h-[40vh] flex items-center justify-center relative">
                    <div className="w-[1px] h-24 bg-gradient-to-b from-zinc-800 to-transparent" />
                </section>

            </main>
        </div>
    );
}

// Minimal Video Modal
function VideoModal({ src, onClose }: { src: string; onClose: () => void }) {
    return (
        <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.5 }}
            className="fixed inset-0 z-[100] flex items-center justify-center bg-zinc-950/90 backdrop-blur-md"
            onClick={onClose}
        >
            <motion.div
                initial={{ opacity: 0, scale: 0.9, y: 20 }}
                animate={{ opacity: 1, scale: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.9, y: 20 }}
                transition={{ duration: 0.5, delay: 0.1, type: "spring", damping: 20 }}
                className="relative w-full max-w-7xl max-h-screen p-4 md:p-8"
                onClick={(e) => e.stopPropagation()}
            >
                <button
                    onClick={onClose}
                    className="absolute top-4 right-4 md:-top-12 md:-right-4 text-white hover:text-rose-500 transition-colors z-50 p-2 rounded-full bg-black/50 md:bg-transparent"
                >
                    <X className="w-8 h-8" />
                </button>

                <video
                    src={src}
                    controls
                    autoPlay
                    preload="none"
                    className="w-full h-full max-h-[85vh] object-contain rounded-sm shadow-2xl shadow-black"
                />

                <div className="mt-4 flex justify-between items-center text-xs text-zinc-500 font-mono">
                    <span>PLAYING: {src.split('/').pop()}</span>
                    <span>ESC TO CLOSE</span>
                </div>
            </motion.div>
        </motion.div>
    )
}

// 1. Photography: Random "Throw" angles and asymmetric layout
function StreamItem({ src, index, caption }: { src: string; index: number; caption: string }) {
    // Intentional breaking of the grid
    const alignment = [
        "self-start md:ml-[10%]",           // 0
        "self-end md:mr-[15%] md:-mt-24",   // 1 (Overlap!)
        "self-center md:ml-32",             // 2
        "self-start md:ml-0 md:-ml-[10%] z-10", // 3: THE CONTROLLED BREAK (Pushed way out)
        "self-end md:mr-[5%]",              // 4
        "self-center",                      // 5
        "self-start md:ml-[20%] md:mb-32",  // 6
    ][index] || "self-center";

    const rotation = [2, -3, 1, -2, 3, -1, 2][index] || 0;

    return (
        <motion.div
            initial={{ opacity: 0, y: 100, rotate: rotation * 2 }}
            whileInView={{ opacity: 1, y: 0, rotate: rotation }}
            viewport={{ once: true, margin: "-15%" }}
            transition={{ duration: 1.4, ease: [0.16, 1, 0.3, 1] }}
            className={`${alignment} relative group md:w-[500px] w-full mb-12 md:mb-0`}
        >
            <div className="relative overflow-hidden grayscale-[0.2] transition-all duration-700 group-hover:grayscale-0">
                <img src={src} alt="" className="w-full h-auto object-cover shadow-2xl shadow-black/80" />
                {/* Micro-interaction: Glint on hover */}
                <div className="absolute inset-0 bg-gradient-to-tr from-white/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none" />
            </div>

            {/* Author Note */}
            {caption && (
                <motion.p
                    initial={{ opacity: 0, x: -10 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.5 }}
                    className="absolute -bottom-8 -right-8 font-serif italic text-zinc-500 text-sm md:text-base max-w-[200px] text-right"
                >
                    {caption}
                </motion.p>
            )}

            <div className="absolute -left-6 top-0 text-[10px] font-mono text-zinc-800 -rotate-90 origin-bottom-right">
                IMG_0{index + 1}
            </div>
        </motion.div>
    );
}

// 2. Video: Softened "Observational" Feel, now interactive
function VideoItem({ src, index, onClick }: { src: string; index: number; onClick: () => void }) {
    return (
        <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 1.5, delay: index * 0.2 }} // Slower, softer entry
            className="snap-center shrink-0 w-[85vw] md:w-auto aspect-video bg-zinc-900/50 relative group overflow-hidden cursor-pointer"
            onClick={onClick}
        >
            <video
                src={src}
                loop
                muted
                playsInline
                autoPlay
                preload="none"
                className="w-full h-full object-cover opacity-40 grayscale group-hover:grayscale-0 group-hover:opacity-80 transition-all duration-1000 ease-out"
            />

            {/* Minimal Play Hint */}
            <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-500">
                <div className="w-16 h-16 rounded-full border border-white/20 flex items-center justify-center backdrop-blur-sm bg-black/20">
                    <Play className="w-6 h-6 text-white ml-1 fill-white/50" />
                </div>
            </div>
        </motion.div>
    )
}

// 3. Sketches: Tactile "Paper" Feel
function SketchItem({ src, index }: { src: string; index: number }) {
    // Break the columns intentionally
    const margin = index % 2 === 0 ? "md:mt-0" : "md:mt-32";
    // Subtle rotation to feel like loose paper
    const paperRotation = index % 2 === 0 ? "rotate-1" : "-rotate-1";

    return (
        <motion.div
            initial={{ opacity: 0, scale: 0.98 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true, margin: "-10%" }}
            transition={{ duration: 1.2 }}
            className={`break-inside-avoid mb-16 ${margin} relative group ${paperRotation}`}
        >
            <div className="bg-[#111] p-6 md:p-8 shadow-xl shadow-black/50 border border-zinc-800/50 group-hover:border-zinc-700/50 transition-colors duration-500">
                {/* Paper texture feel via grain or just raw contrast */}
                <img src={src} alt="" className="w-full h-auto opacity-80 contrast-125 mix-blend-screen group-hover:opacity-100 transition-opacity duration-700" />
            </div>

            <div className="mt-4 flex justify-between items-center opacity-40 group-hover:opacity-100 transition-opacity duration-500">
                <span className="text-[14px] font-mono text-zinc-500 tracking-widest uppercase">Figure {index + 1}</span>
            </div>
        </motion.div>
    )
}

// 4. Recurring Motif: Chapter Marker
function ChapterMarker({ number, label, className }: { number: string; label: string; className?: string }) {
    return (
        <div className={`p-6 border-l md:border-l-0 border-zinc-800 md:border-none ${className}`}>
            <div className="text-zinc-700 font-display text-8xl md:text-9xl opacity-25 select-none absolute -top-8 -left-8 -z-10">
                {number}
            </div>
            <div className="flex flex-col">
                <span className="text-xs font-mono text-rose-500 tracking-widest mb-2">/// SECTION {number}</span>
                <span className="text-2xl font-bold tracking-tight text-zinc-100 uppercase">{label}</span>
            </div>
        </div>
    )
}
