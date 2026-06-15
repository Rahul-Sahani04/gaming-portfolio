"use client";

import React, { useRef, useState, useEffect } from "react";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import Image from "next/image";
import { Cinzel } from "next/font/google";

const cinzel = Cinzel({
  weight: ["400", "700"],
  subsets: ["latin"],
});

const EYE_GIFS = [
  "/void/eyes.gif",
  "/void/eyes2.gif",
  "/void/eyes3.gif",
];

export default function HorrorExperience() {
  const containerRef = useRef<HTMLDivElement>(null);
  const fungusContainerRef = useRef<HTMLDivElement>(null);
  const eyesContainerRef = useRef<HTMLDivElement>(null);
  const customCursorRef = useRef<HTMLImageElement>(null);

  const [started, setStarted] = useState(false);
  const [showEyes, setShowEyes] = useState(false);
  const [blobs, setBlobs] = useState<any[]>([]);
  const [eyes, setEyes] = useState<any[]>([]);
  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    // Generate random blobs for the fungus
    const newBlobs = Array.from({ length: 40 }).map((_, i) => ({
      id: i,
      x: Math.random() * 100,
      y: Math.random() * 100,
      size: Math.random() * 20 + 10, // 10vw to 30vw
    }));

    // Generate random eyes
    const newEyes = Array.from({ length: 35 }).map((_, i) => {
      const gif = EYE_GIFS[Math.floor(Math.random() * EYE_GIFS.length)];
      return {
        id: i,
        src: gif,
        x: Math.random() * 90 + 5, // 5% to 95%
        y: Math.random() * 90 + 5,
        scale: Math.random() * 0.8 + 0.4, // 0.4 to 1.2
        rotation: Math.random() * 360,
      };
    });

    setBlobs(newBlobs);
    setEyes(newEyes);
    setIsClient(true);
  }, []);

  useGSAP(() => {
    if (!isClient || !customCursorRef.current) return;
    const xTo = gsap.quickTo(customCursorRef.current, "x", { duration: 0.1, ease: "power3" });
    const yTo = gsap.quickTo(customCursorRef.current, "y", { duration: 0.1, ease: "power3" });

    const moveCursor = (e: MouseEvent) => {
      // Offset by 8px to account for transparent padding in the image so the tip aligns with actual clicks
      xTo(e.clientX - 8);
      yTo(e.clientY - 8);
    };

    window.addEventListener("mousemove", moveCursor);
    return () => window.removeEventListener("mousemove", moveCursor);
  }, { scope: containerRef, dependencies: [isClient] });

  useGSAP(() => {
    if (!isClient || !containerRef.current || !fungusContainerRef.current || blobs.length === 0 || !started) return;

    // Play horror noise
    const audio = new Audio("/void/horror-noise.mp3");
    audio.volume = 0.8;
    audio.play().catch(e => console.warn("Audio autoplay blocked:", e));

    const tl = gsap.timeline({
      onComplete: () => {
        setShowEyes(true);
      }
    });

    // Intro Message
    gsap.set(".creepy-char", { opacity: 0 });

    // Smoothly fade in letters randomly
    tl.to(".creepy-char", {
      opacity: 1,
      duration: 2,
      stagger: {
        amount: 2,
        from: "random"
      },
      ease: "power2.inOut"
    })
      .add("textComplete")
      .to(".creepy-text", {
        opacity: 0,
        scale: 1.1,
        filter: "blur(10px)",
        duration: 4,
        ease: "power2.in"
      }, "+=4"); // Keep text on screen for 4 more seconds

    // Phase 1: The Fungus / Corruption
    // Animate the blobs growing from 0 to massive, taking over the screen
    gsap.set(".fungus-blob", { scale: 0, opacity: 0, xPercent: -50, yPercent: -50 });

    tl.to(".fungus-blob", {
      scale: (i) => Math.random() * 5 + 5, // Grow massive to cover screen
      opacity: 1,
      duration: 6, // Spread slower so it creeps over the text
      stagger: {
        amount: 4,
        from: "random"
      },
      ease: "power2.inOut"
    }, "textComplete"); // Start fungus right as the text finishes fading in

    // Add a slight creeping movement to the blobs (INDEPENDENT of the timeline)
    gsap.to(".fungus-blob", {
      x: "+=2vw",
      y: "+=2vh",
      duration: 10,
      repeat: -1,
      yoyo: true,
      ease: "sine.inOut",
      stagger: {
        amount: 2,
        from: "random"
      }
    });

  }, { scope: containerRef, dependencies: [isClient, blobs, started] });

  useGSAP(() => {
    if (!showEyes || !eyesContainerRef.current || eyes.length === 0) return;

    // Phase 2: The Awakening (Eyes)
    gsap.set(".horror-eye", { autoAlpha: 0, scale: 0, xPercent: -50, yPercent: -50 });

    const MIN_EYE_DURATION = 2; // minimum seconds eye stays on screen
    const MAX_EYE_DURATION = 6; // maximum seconds eye stays on screen

    gsap.utils.toArray(".horror-eye").forEach((eye: any) => {
      const duration = gsap.utils.random(MIN_EYE_DURATION, MAX_EYE_DURATION);
      const delay = gsap.utils.random(0, 4); // Initial random spawn delay

      const eyeTl = gsap.timeline({ repeat: -1, delay });
      const targetScale = parseFloat(eye.dataset.scale || "1");

      // Spawn
      eyeTl.to(eye, {
        autoAlpha: 1,
        scale: targetScale,
        duration: 1,
        ease: "elastic.out(1, 0.5)"
      })
        // Despawn after `duration`
        .to(eye, {
          autoAlpha: 0,
          scale: 0,
          duration: 1,
          ease: "power2.inOut"
        }, `+=${duration}`);

      // Random pause before spawning again
      eyeTl.to(eye, { duration: gsap.utils.random(1, 4) });
    });

    // Add jitter/wobble to eyes to make them unsettling
    gsap.to(".horror-eye", {
      x: "random(-5, 5)",
      y: "random(-5, 5)",
      rotation: "random(-2, 2)",
      duration: 0.1,
      repeat: -1,
      yoyo: true,
      ease: "rough({ template: none.out, strength: 1, points: 20, taper: none, randomize: true, clamp: false })"
    });

  }, { scope: containerRef, dependencies: [showEyes, eyes] });

  if (!isClient) return <div className="w-full h-screen bg-[#0a0a0a]"></div>;

  return (
    <div
      ref={containerRef}
      className="relative w-full h-screen bg-[#0a0a0a] overflow-hidden cursor-none"
    >
      {/* Custom Cursor Overlay */}
      <img
        ref={customCursorRef}
        src="/void/CreepyCursor.jpeg"
        alt="cursor"
        className="fixed top-0 left-0 pointer-events-none z-[99999] w-12 h-12 object-contain mix-blend-screen"
      />

      {/* SVG Gooey Filter Definition */}
      <svg className="hidden absolute w-0 h-0 -z-10">
        <defs>
          <filter id="goo">
            <feGaussianBlur in="SourceGraphic" stdDeviation="15" result="blur" />
            <feColorMatrix in="blur" mode="matrix" values="1 0 0 0 0  0 1 0 0 0  0 0 1 0 0  0 0 0 25 -10" result="goo" />
            <feComposite in="SourceGraphic" in2="goo" operator="atop" />
          </filter>
        </defs>
      </svg>

      {/* Start Overlay to bypass autoplay restrictions */}
      {!started && (
        <div
          className="absolute inset-0 z-50 flex items-center justify-center bg-[#0a0a0a]"
          onClick={() => setStarted(true)}
        >
          <button
            className={`cursor-none text-[#810214] text-xl md:text-3xl uppercase tracking-[0.5em] hover:text-[#8b0000] hover:scale-105 transition-all duration-1000 animate-pulse ${cinzel.className}`}
          >
            [ Click to Descend ]
          </button>
        </div>
      )}

      {/* Intro Creepy Message */}
      <div className="absolute inset-0 flex flex-col items-center justify-center z-0 pointer-events-none">
        <div className={`creepy-text text-[#8b0000] font-bold text-6xl md:text-8xl lg:text-[9rem] uppercase mix-blend-screen text-center leading-none tracking-[0.2em] ${cinzel.className}`} style={{ textShadow: "0 0 40px rgba(139,0,0,0.6)" }}>
          <div className="overflow-hidden mb-2 md:mb-6">
            {"THERE IS".split("").map((char, i) => <span key={`w1-${i}`} className="creepy-char inline-block" style={{ whiteSpace: "pre" }}>{char}</span>)}
          </div>
          <div className="overflow-hidden mb-2 md:mb-6">
            {"NO".split("").map((char, i) => <span key={`w2-${i}`} className="creepy-char inline-block" style={{ whiteSpace: "pre" }}>{char}</span>)}
          </div>
          <div className="overflow-hidden">
            {"ESCAPE".split("").map((char, i) => <span key={`w3-${i}`} className="creepy-char inline-block" style={{ whiteSpace: "pre" }}>{char}</span>)}
          </div>
        </div>
      </div>

      {/* Phase 1: Fungus Container */}
      <div
        ref={fungusContainerRef}
        className="absolute inset-0 w-full h-full z-10"
        style={{ filter: "url(#goo)" }}
      >
        {blobs.map((blob) => (
          <div
            key={`blob-${blob.id}`}
            className="fungus-blob absolute bg-black rounded-full"
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

      {/* Phase 2: Eyes Container */}
      {showEyes && (
        <div ref={eyesContainerRef} className="absolute inset-0 w-full h-full z-50 pointer-events-none">
          {eyes.map((eye) => (
            <div
              key={`eye-${eye.id}`}
              className="horror-eye absolute mix-blend-screen"
              data-scale={eye.scale}
              style={{
                left: `${eye.x}vw`,
                top: `${eye.y}vh`,
                transformOrigin: "center center",
                // Initial state handled by GSAP
              }}
            >
              <Image
                src={eye.src}
                alt="void"
                width={150}
                height={150}
                className="w-full h-full object-contain pointer-events-none opacity-100 z-50"
                unoptimized // Keep GIF animating
              />
            </div>
          ))}
        </div>
      )}

      {/* Overlay vignette to make the edges dark */}
      <div className="absolute inset-0 pointer-events-none z-30 shadow-[inset_0_0_150px_rgba(0,0,0,1)] mix-blend-multiply" />

      {/* Scanline overlay for that retro/grimy feel */}
      <div className="absolute inset-0 pointer-events-none z-40 opacity-20 bg-[url('data:image/svg+xml,%3Csvg viewBox=%220 0 200 200%22 xmlns=%22http://www.w3.org/2000/svg%22%3E%3Cfilter id=%22noiseFilter%22%3E%3CfeTurbulence type=%22fractalNoise%22 baseFrequency=%220.65%22 numOctaves=%223%22 stitchTiles=%22stitch%22/%3E%3C/filter%3E%3Crect width=%22100%25%22 height=%22100%25%22 filter=%22url(%23noiseFilter)%22/%3E%3C/svg%3E')] mix-blend-overlay" />
    </div>
  );
}
