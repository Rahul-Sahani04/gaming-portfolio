"use client";

import React, { useRef, useState, useEffect } from "react";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import Image from "next/image";
import { Cormorant_Garamond } from "next/font/google";

const cormorant = Cormorant_Garamond({
  weight: ["300", "400", "600"],
  subsets: ["latin"],
  style: ["normal", "italic"],
});

const EYE_GIFS = ["/void/eyes.gif", "/void/eyes2.gif", "/void/eyes3.gif"];

interface Blob {
  id: number;
  x: number;
  y: number;
  size: number;
}

interface Eye {
  id: number;
  src: string;
  x: number;
  y: number;
  scale: number;
}

export default function HorrorExperience() {
  const containerRef = useRef<HTMLDivElement>(null);
  const fungusContainerRef = useRef<HTMLDivElement>(null);
  const eyesContainerRef = useRef<HTMLDivElement>(null);
  const customCursorRef = useRef<HTMLImageElement>(null);
  const audioRef = useRef<HTMLAudioElement | null>(null);

  const [started, setStarted] = useState(false);
  const [showEyes, setShowEyes] = useState(false);
  const [blobs, setBlobs] = useState<Blob[]>([]);
  const [eyes, setEyes] = useState<Eye[]>([]);
  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    const newBlobs: Blob[] = Array.from({ length: 44 }).map((_, i) => ({
      id: i,
      x: Math.random() * 100,
      y: Math.random() * 100,
      size: Math.random() * 22 + 8,
    }));

    const newEyes: Eye[] = Array.from({ length: 22 }).map((_, i) => ({
      id: i,
      src: EYE_GIFS[Math.floor(Math.random() * EYE_GIFS.length)],
      x: Math.random() * 80 + 10,
      y: Math.random() * 80 + 10,
      scale: Math.random() * 0.9 + 0.5,
    }));

    setBlobs(newBlobs);
    setEyes(newEyes);
    setIsClient(true);

    return () => {
      if (audioRef.current) {
        audioRef.current.pause();
        audioRef.current = null;
      }
    };
  }, []);

  // Custom cursor
  useGSAP(() => {
    if (!isClient || !customCursorRef.current) return;
    const xTo = gsap.quickTo(customCursorRef.current, "x", { duration: 0.1, ease: "power3" });
    const yTo = gsap.quickTo(customCursorRef.current, "y", { duration: 0.1, ease: "power3" });
    const onMove = (e: MouseEvent) => { xTo(e.clientX - 8); yTo(e.clientY - 8); };
    window.addEventListener("mousemove", onMove);
    return () => window.removeEventListener("mousemove", onMove);
  }, { scope: containerRef, dependencies: [isClient] });

  // Phase 1: text + fungus
  useGSAP(() => {
    if (!isClient || !containerRef.current || blobs.length === 0 || !started) return;

    const audio = new Audio("/void/horror-noise.mp3");
    audio.volume = 0.75;
    audioRef.current = audio;
    audio.play().catch(() => { });

    const tl = gsap.timeline({ onComplete: () => setShowEyes(true) });

    // Text: letters drift in softly from random — calm, warm, wrong
    gsap.set(".creepy-char", { opacity: 0, y: 6 });
    tl.to(".creepy-char", {
      opacity: 1,
      y: 0,
      duration: 2.8,
      stagger: { amount: 3, from: "random" },
      ease: "power2.out",
    })
      .add("textReady")
      .to(".creepy-text", {
        opacity: 0,
        y: -24,
        filter: "blur(14px)",
        duration: 3.5,
        ease: "power2.in",
      }, "+=5");

    // Fungus bleeds in
    gsap.set(".fungus-blob", { scale: 0, opacity: 0, xPercent: -50, yPercent: -50 });
    tl.to(".fungus-blob", {
      scale: () => gsap.utils.random(4, 9),
      opacity: () => gsap.utils.random(0.55, 1),
      duration: 7,
      stagger: { amount: 4.5, from: "random" },
      ease: "power1.inOut",
    }, "textReady");

    // Background bleeds crimson during fungus spread
    tl.to(containerRef.current, {
      backgroundColor: "#1a0000",
      duration: 5,
      ease: "power1.inOut",
    }, "textReady+=1");

    // Void collapses — everything goes black before eyes emerge
    tl.add("voidCollapse");
    tl.to(fungusContainerRef.current, {
      opacity: 0,
      duration: 3,
      ease: "power2.inOut",
    }, "voidCollapse");
    tl.to(containerRef.current, {
      backgroundColor: "#000000",
      duration: 3,
      ease: "power2.inOut",
    }, "voidCollapse");

    // Continuous slow blob creep while visible
    gsap.to(".fungus-blob", {
      x: "+=3vw",
      y: "+=2vh",
      duration: 12,
      repeat: -1,
      yoyo: true,
      ease: "sine.inOut",
      stagger: { amount: 3, from: "random" },
    });

    return () => {
      if (audioRef.current) {
        audioRef.current.pause();
        audioRef.current = null;
      }
    };
  }, { scope: containerRef, dependencies: [isClient, blobs, started] });

  // Phase 2: eyes
  useGSAP(() => {
    if (!showEyes || eyes.length === 0 || !containerRef.current) return;

    gsap.set(".horror-eye", { autoAlpha: 0, scale: 0, xPercent: -50, yPercent: -50 });

    gsap.utils.toArray<HTMLElement>(".horror-eye").forEach((eye) => {
      const hold = gsap.utils.random(2, 6);
      const delay = gsap.utils.random(0, 5);
      const targetScale = parseFloat(eye.dataset.scale ?? "1");

      gsap.timeline({ repeat: -1, delay })
        .to(eye, { autoAlpha: 1, scale: targetScale, duration: 0.9, ease: "elastic.out(1, 0.6)" })
        .to(eye, { autoAlpha: 0, scale: 0, duration: 0.9, ease: "power2.in" }, `+=${hold}`)
        .to(eye, { duration: gsap.utils.random(1, 5) });
    });

    // Jitter via repeatRefresh — re-randomises every cycle without Club GSAP
    gsap.to(".horror-eye", {
      x: () => gsap.utils.random(-7, 7),
      y: () => gsap.utils.random(-7, 7),
      rotation: () => gsap.utils.random(-4, 4),
      duration: 0.13,
      repeat: -1,
      yoyo: true,
      repeatRefresh: true,
      ease: "power1.inOut",
      stagger: { amount: 0.4, from: "random" },
    });

    // Barely-perceptible heartbeat — void breathing
    gsap.to(containerRef.current, {
      backgroundColor: "#060000",
      duration: 2.5,
      repeat: -1,
      yoyo: true,
      ease: "power2.inOut",
    });
  }, { scope: containerRef, dependencies: [showEyes, eyes] });

  if (!isClient) return <div className="w-full h-screen bg-black" />;

  return (
    <div
      ref={containerRef}
      className="relative w-full h-screen bg-black overflow-hidden cursor-none"
    >
      {/* Custom cursor */}
      <img
        ref={customCursorRef}
        src="/void/CreepyCursor.jpeg"
        alt=""
        aria-hidden="true"
        className="fixed top-0 left-0 pointer-events-none z-[99999] w-12 h-12 object-contain mix-blend-screen"
      />

      {/* Gooey SVG filter */}
      <svg className="absolute w-0 h-0" aria-hidden="true">
        <defs>
          <filter id="goo">
            <feGaussianBlur in="SourceGraphic" stdDeviation="14" result="blur" />
            <feColorMatrix
              in="blur"
              mode="matrix"
              values="1 0 0 0 0  0 1 0 0 0  0 0 1 0 0  0 0 0 28 -11"
              result="goo"
            />
            <feComposite in="SourceGraphic" in2="goo" operator="atop" />
          </filter>
        </defs>
      </svg>

      {/* ── Entry screen ── */}
      {!started && (
        <div
          className="absolute inset-0 z-50 flex flex-col items-center justify-center bg-black gap-6 select-none"
          onClick={() => setStarted(true)}
        >
          {/* Nested amber border frames */}
          <div className="absolute inset-6 border border-[#2a1f0e] opacity-60 pointer-events-none" />
          <div className="absolute inset-11 border border-[#2a1f0e] opacity-30 pointer-events-none" />

          <p className={`text-[#3d2a10] text-[10px] tracking-[1em] uppercase ${cormorant.className}`}>
            ◈ &nbsp; you were not meant to find this &nbsp; ◈
          </p>

          <button
            className={`cursor-none text-[#8a6a3a] text-xl md:text-3xl uppercase tracking-[0.5em] hover:text-[#c9a96e] transition-colors duration-700 animate-pulse ${cormorant.className}`}
            style={{ textShadow: "0 0 24px rgba(201,169,110,0.4), 0 0 60px rgba(201,169,110,0.1)" }}
          >
            [ Click to Descend ]
          </button>

          <p className={`text-[#1e1408] text-[9px] tracking-[0.6em] uppercase ${cormorant.className}`}>
            turn your sound on
          </p>
        </div>
      )}

      {/* ── Intro text ── */}
      <div className="absolute inset-0 flex flex-col items-center justify-center z-0 pointer-events-none gap-4 md:gap-6">
        <div
          className={`creepy-text mix-blend-screen text-center ${cormorant.className}`}
          style={{ textShadow: "0 0 40px rgba(201,169,110,0.7), 0 0 100px rgba(201,169,110,0.25)" }}
        >
          {/* WELCOME HOME */}
          <div className="text-[#c9a96e] font-light text-6xl md:text-8xl lg:text-[9rem] uppercase tracking-[0.35em] leading-none mb-4 md:mb-8">
            {"WELCOME".split("").map((char, i) => (
              <span key={`a${i}`} className="creepy-char inline-block" style={{ whiteSpace: "pre" }}>
                {char}
              </span>
            ))}
            <br />
            {"HOME".split("").map((char, i) => (
              <span key={`a${i}`} className="creepy-char inline-block" style={{ whiteSpace: "pre" }}>
                {char}
              </span>
            ))}
          </div>

          {/* WE MISSED YOU — italic, slightly smaller, dimmer */}
          <div
            className="text-[#9e7d4a] font-light italic text-3xl md:text-5xl lg:text-6xl uppercase tracking-[0.55em] leading-none"
            style={{ textShadow: "0 0 30px rgba(158,125,74,0.5), 0 0 70px rgba(158,125,74,0.15)" }}
          >
            {"WE MISSED YOU".split("").map((char, i) => (
              <span key={`b${i}`} className="creepy-char inline-block" style={{ whiteSpace: "pre" }}>
                {char}
              </span>
            ))}
          </div>
        </div>
      </div>

      {/* ── Phase 1: Fungus ── */}
      <div
        ref={fungusContainerRef}
        className="absolute inset-0 w-full h-full z-10"
        style={{ filter: "url(#goo)" }}
      >
        {blobs.map((blob) => (
          <div
            key={`blob-${blob.id}`}
            className="fungus-blob absolute rounded-full bg-[#3b0000]"
            style={{
              left: `${blob.x}vw`,
              top: `${blob.y}vh`,
              width: `${blob.size}vw`,
              height: `${blob.size}vw`,
              transformOrigin: "center center",
            }}
          />
        ))}
      </div>

      {/* ── Phase 2: Eyes ── */}
      {showEyes && (
        <div ref={eyesContainerRef} className="absolute inset-0 w-full h-full z-50 pointer-events-none">
          {eyes.map((eye) => (
            <div
              key={`eye-${eye.id}`}
              className="horror-eye absolute mix-blend-screen"
              data-scale={eye.scale}
              style={{ left: `${eye.x}vw`, top: `${eye.y}vh`, transformOrigin: "center center" }}
            >
              <Image
                src={eye.src}
                alt=""
                width={150}
                height={150}
                className="w-full h-full object-contain pointer-events-none"
                unoptimized
              />
            </div>
          ))}
        </div>
      )}

      {/* Vignette */}
      <div className="absolute inset-0 pointer-events-none z-30 shadow-[inset_0_0_220px_80px_rgba(0,0,0,0.95)] mix-blend-multiply" />

      {/* Film grain */}
      <div
        className="absolute inset-0 pointer-events-none z-40 opacity-[0.13] mix-blend-overlay"
        style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.65' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E")`,
        }}
      />
    </div>
  );
}
