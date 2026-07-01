"use client";

import { useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";
import { motion } from "framer-motion";
import { ArrowUpRight } from "lucide-react";
import Link from "next/link";
import TechCard from "./components/TechCard";
import ProjectCard from "./components/ProjectCard";
import { Navigation } from "../components/nav";
import ParticleFooter from "./components/ParticleFooter";
import "./page.css";
// import PhotographyGrid from "./components/PhotographyGrid";
// import Spotify from "../components/Spotify";
import AnimatedLine from "@/components/AnimatedLine";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger, useGSAP);
}

export default function AboutPage() {
  const containerRef = useRef<HTMLDivElement>(null);

  useGSAP(() => {
    // Refresh ScrollTrigger after a slight delay to account for Next.js client-side routing layout shifts
    const timeout = setTimeout(() => {
      ScrollTrigger.refresh();
    }, 500);

    // Parallax hero orb
    gsap.to(".glowing-orb", {
      y: 200,
      scale: 1.1,
      ease: "none",
      scrollTrigger: {
        trigger: ".hero-section",
        start: "top top",
        end: "bottom top",
        scrub: true,
      },
    });

    // Animate visual anchor lines
    gsap.fromTo(".visual-anchor-top",
      { scaleY: 0, transformOrigin: "top" },
      {
        scaleY: 1,
        duration: 1.2,
        ease: "power3.inOut",
        scrollTrigger: {
          trigger: ".calibration-section",
          start: "top 80%",
        }
      }
    );

    gsap.fromTo(".visual-anchor-bottom",
      { scaleY: 0, transformOrigin: "bottom" },
      {
        scaleY: 1,
        duration: 1.2,
        ease: "power3.inOut",
        scrollTrigger: {
          trigger: ".calibration-section",
          start: "top 40%",
        }
      }
    );

    // Hero Text Stagger
    const tl = gsap.timeline();
    tl.from(".hero-char", {
      y: 100,
      opacity: 0,
      duration: 0.8,
      stagger: 0.05,
      ease: "back.out(1.7)",
      delay: 0.2
    })
      .from(".hero-line", {
        y: 20,
        opacity: 0,
        filter: "blur(8px)",
        duration: 0.7,
        stagger: 0.12,
        ease: "power2.out"
      }, "-=0.3")
      .from(".hero-quote", {
        opacity: 0,
        scale: 0.9,
        duration: 0.8,
        ease: "power2.out"
      }, "-=0.2");

    // Technologies Grid Reveal
    gsap.fromTo(".tech-card-wrapper",
      { y: 50, opacity: 0 },
      {
        y: 0, opacity: 1,
        duration: 0.8,
        stagger: 0.1,
        ease: "power3.out",
        scrollTrigger: {
          trigger: ".tech-grid",
          start: "top 85%",
          // Remove 'reverse' to prevent it from disappearing if layout shifts push it down
          toggleActions: "play none none none"
        }
      }
    );

    // Dual-direction Toolkit marquee: scroll-velocity reactive speed, hover-to-scrub with cursor
    const marqueeRows = Array.from(
      containerRef.current?.querySelectorAll<HTMLElement>(".marquee-row") ?? []
    ).map((row, i) => ({
      content: row.querySelector<HTMLElement>(".marquee-content")!,
      dir: i === 0 ? -1 : 1,
      x: 0,
      hovering: false,
      dragging: false,
      lastClientX: 0,
    }));

    const marqueeCleanups: Array<() => void> = [];
    marqueeRows.forEach((row, i) => {
      const el = containerRef.current!.querySelectorAll<HTMLElement>(".marquee-row")[i];
      const onEnter = () => { row.hovering = true; };
      const onLeave = () => { row.hovering = false; row.dragging = false; };
      const onDown = (e: PointerEvent) => {
        e.preventDefault();
        row.dragging = true;
        row.lastClientX = e.clientX;
        el.setPointerCapture(e.pointerId);
      };
      const onUp = () => { row.dragging = false; };
      const onMove = (e: PointerEvent) => {
        if (!row.dragging) return;
        row.x += (e.clientX - row.lastClientX) * 1.5;
        row.lastClientX = e.clientX;
      };
      el.addEventListener("pointerenter", onEnter);
      el.addEventListener("pointerleave", onLeave);
      el.addEventListener("pointerdown", onDown);
      el.addEventListener("pointerup", onUp);
      el.addEventListener("pointercancel", onUp);
      el.addEventListener("pointermove", onMove);
      marqueeCleanups.push(() => {
        el.removeEventListener("pointerenter", onEnter);
        el.removeEventListener("pointerleave", onLeave);
        el.removeEventListener("pointerdown", onDown);
        el.removeEventListener("pointerup", onUp);
        el.removeEventListener("pointercancel", onUp);
        el.removeEventListener("pointermove", onMove);
      });
    });

    const MARQUEE_BASE_SPEED = 40; // px/sec
    let lastScrollY = window.scrollY;
    const marqueeTick = (_time: number, deltaMs: number) => {
      const dt = deltaMs > 0 ? deltaMs / 1000 : 1 / 60;
      const scrollVelocity = (window.scrollY - lastScrollY) / dt;
      lastScrollY = window.scrollY;
      const speedMultiplier = gsap.utils.clamp(-3, 4, 1 + scrollVelocity / 800);

      marqueeRows.forEach((row) => {
        if (!row.hovering) {
          row.x += row.dir * MARQUEE_BASE_SPEED * speedMultiplier * dt;
        }
        const width = row.content.scrollWidth / 2;
        if (!width) return;
        // Content is duplicated, so any multiple of `width` looks identical - wrap into [-width, 0)
        const wrapped = ((row.x % width) + width) % width - width;
        gsap.set(row.content, { x: wrapped });
      });
    };
    gsap.ticker.add(marqueeTick);
    marqueeCleanups.push(() => gsap.ticker.remove(marqueeTick));

    // Project Cards Reveal
    gsap.fromTo(".project-card-wrapper",
      { y: 50, opacity: 0, scale: 0.95, filter: "blur(10px)" },
      {
        y: 0, opacity: 1, scale: 1, filter: "blur(0px)",
        duration: 0.8,
        stagger: 0.15,
        ease: "power3.out",
        scrollTrigger: {
          trigger: ".projects-grid",
          start: "top 85%",
          toggleActions: "play none none none"
        }
      }
    );

    // Calibration Section Reveal
    const calTl = gsap.timeline({
      scrollTrigger: {
        trigger: ".calibration-section",
        start: "top 80%",
        toggleActions: "play none none none"
      }
    });

    calTl.fromTo(".visual-anchor-top",
      { scaleY: 0, transformOrigin: "top" },
      { scaleY: 1, duration: 1, ease: "power2.inOut" }
    )
      .fromTo(".calibration-text",
        { opacity: 0, y: 30, filter: "blur(10px)" },
        { opacity: 1, y: 0, filter: "blur(0px)", duration: 1.5, ease: "power3.out" },
        "-=0.5"
      )
      .fromTo(".calibration-link",
        { opacity: 0, x: -20 },
        { opacity: 1, x: 0, duration: 0.8, ease: "back.out(1.5)" },
        "-=1"
      )
      .fromTo(".visual-anchor-bottom",
        { scaleY: 0, transformOrigin: "bottom" },
        { scaleY: 1, duration: 1, ease: "power2.inOut" },
        "-=0.5"
      );

    // Featured Projects Header Reveal
    const projHeadTl = gsap.timeline({
      scrollTrigger: {
        trigger: ".projects-header",
        start: "top 80%",
        toggleActions: "play none none none"
      }
    });

    projHeadTl.fromTo(".projects-title",
      { opacity: 0, y: 40, letterSpacing: "0.2em", filter: "blur(8px)" },
      { opacity: 1, y: 0, letterSpacing: "normal", filter: "blur(0px)", duration: 1.2, ease: "power3.out" }
    ).fromTo(".projects-subtitle",
      { opacity: 0, y: 20 },
      { opacity: 1, y: 0, duration: 0.8, ease: "power2.out" },
      "-=0.8"
    );

    // Robust observer for Next.js layout shifts
    const ro = new ResizeObserver(() => {
      ScrollTrigger.refresh();
    });
    if (typeof document !== "undefined") {
      // Observe the body to catch any changes in total page height (e.g. old pages unmounting)
      ro.observe(document.body);
    }

    // Fallback refreshes to catch late image loads or delayed framer-motion unmounts
    const t1 = setTimeout(() => ScrollTrigger.refresh(), 100);
    const t2 = setTimeout(() => ScrollTrigger.refresh(), 500);
    const t3 = setTimeout(() => ScrollTrigger.refresh(), 1000);
    const t4 = setTimeout(() => ScrollTrigger.refresh(), 2500);

    return () => {
      clearTimeout(timeout);
      clearTimeout(t1);
      clearTimeout(t2);
      clearTimeout(t3);
      clearTimeout(t4);
      ro.disconnect();
      marqueeCleanups.forEach((fn) => fn());
    };
  }, { scope: containerRef });

  const coreStack = [
    { name: "Next.js", description: "Framework", icon: "/icons/tech/nextjs.svg" },
    { name: "React", description: "UI Library", icon: "/icons/tech/react.svg" },
    { name: "TypeScript", description: "Type Safety", icon: "/icons/tech/typescript.svg" },
    { name: "Tailwind CSS", description: "Styling", icon: "/icons/tech/tailwind.svg" },
    { name: "Node.js", description: "Runtime", icon: "/icons/tech/nodejs.svg" },
    { name: "Supabase", description: "Backend", icon: "/icons/tech/supabase.svg" },
  ];

  const toolkit = [
    "PostgreSQL", "MongoDB", "Prisma", "GraphQL", "Express.js",
    "Figma", "Git", "AWS", "Vercel", "Python", "OpenAI/Gemini"
  ];

  const favoriteGames = [
    "Elden Ring", "Sekiro", "Call of Duty", "Minecraft", "Marvel's Spider-Man", "Dying Light", "Devil May Cry", "Need for Speed", 
  ];

  const projects = [
    {
      title: "V-Anime",
      description:
        "A modern anime streaming platform with a clean UI and advanced search features.",
      image: "/screenshots/v-anime.png",
      technologies: [
        "React",
        "NextJS",
        "Tailwind",
        "MongoDB",
        "NodeJS",
        "Socket.io",
      ],
      liveUrl: "https://v-anime.vercel.app/",
      sourceUrl: "https://github.com/Rahul-Sahani04/V-Anime-App",
    },
    {
      title: "Stellar Conflict",
      description:
        "A modern space shooter game built with JavaScript and HTML5 Canvas. Features optimized performance and modular architecture.",
      image: "/screenshots/StellarConflict1.png",
      technologies: ["JavaScript", "HTML5 Canvas", "Vite", "TailwindCSS"],
      liveUrl: "https://stellar-conlict.vercel.app/",
      sourceUrl: "https://github.com/Rahul-Sahani04/Mini-Space-Shooter",
    },
    {
      title: "FlexApp",
      description: "A comprehensive, AI-powered content management system with flexible schema definitions.",
      image: "/screenshots/FlexAPp.png",
      technologies: ["NextJS", "TypeScript", "Spring Boot", "PostgreSQL", "Tailwind"],
      liveUrl: "https://github.com/Rahul-Sahani04/FlexApp",
      sourceUrl: "https://github.com/Rahul-Sahani04/FlexApp",
    },
  ];

  return (
    <div ref={containerRef} className="min-h-screen max-w-screen overflow-x-clip bg-black text-white">
      <Navigation />

      {/* Hero Section */}
      <section className="hero-section relative py-32 overflow-hidden min-h-[50vh]">
        <div className="absolute inset-0 -z-10">
          <div className="absolute inset-0 bg-gradient-to-b from-black via-zinc-950 to-black" />
          <div className="glowing-orb absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] bg-rose-900/10 rounded-full blur-[120px] opacity-50" />
        </div>

        <div className="container mx-auto px-4 text-center hero-text-container">
          <h1 className="text-6xl md:text-8xl font-bold mb-8 text-zinc-100 tracking-tight overflow-hidden">
            {"About Me".split("").map((char, i) => (
              <span key={i} className="hero-char inline-block">{char === " " ? "\u00A0" : char}</span>
            ))}
          </h1>
          <div className="max-w-2xl mx-auto">
            {[
              "I'm Rahul Sahani. By day, I write code and build things that work like they should.",
              "By Heart, I'm a gamer. I chase what sparks my curiosity, both on the screen and off.",
              "When I'm facing off against a tough bug or a tough boss, I work fast and think on my feet. There's always something new to learn, and I'm always pushing for the next level.",
            ].map((line, i) => (
              <p
                key={i}
                className="hero-line text-lg md:text-xl text-zinc-400 leading-relaxed text-center text-balance mb-3 last:mb-0"
              >
                {line}
              </p>
            ))}
            <p className="hero-quote mt-8 italic text-zinc-600 text-base md:text-lg">
              &ldquo;Falling twice or getting stuck? Nah, I just respawn and keep going.&rdquo;
            </p>
          </div>
        </div>

        <AnimatedLine />
      </section>

      {/* Technologies Section */}
      <section className="py-24 relative">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
            className="mb-16 text-center"
          >
            <h2 className="text-3xl md:text-4xl font-semibold mb-6 text-zinc-200">
              Technologies
            </h2>
            <p className="text-zinc-500 max-w-2xl mx-auto">
              My core stack for building scalable applications.
            </p>
          </motion.div>

          {/* Core Stack Grid */}
          <div className="tech-grid grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-6 mb-24 max-w-6xl mx-auto" style={{ perspective: "1000px" }}>
            {coreStack.map((tech) => (
              <div key={tech.name} className="tech-card-wrapper">
                <TechCard tech={tech} />
              </div>
            ))}
          </div>

          {/* Extended Toolkit */}
          <div className="text-center max-w-full overflow-hidden mx-auto py-8">
            <h3 className="text-xs font-mono text-zinc-600 uppercase tracking-widest mb-12">
                {"|"} Extended Toolkit & Libraries {"|"} 
            </h3>
            <div className="marquee-row relative flex whitespace-nowrap mask-image-linear-edges cursor-grab active:cursor-grabbing select-none">
              <div className="marquee-content flex gap-12 text-2xl font-serif text-zinc-500 uppercase tracking-widest min-w-max">
                {/* Duplicate the array to create seamless loop */}
                {[...toolkit, ...toolkit].map((item, index) => (
                  <span key={`row1-${item}-${index}`} className="hover:text-zinc-200 transition-colors duration-300">
                    {item}
                  </span>
                ))}
              </div>
            </div>
            <p className="text-[10px] font-mono text-zinc-700 uppercase tracking-widest mt-8 mb-3">
                Games I love to play, in no particular order
            </p>
            <div className="marquee-row relative flex whitespace-nowrap mask-image-linear-edges cursor-grab active:cursor-grabbing select-none">
              <div className="marquee-content flex gap-8 text-xs font-mono text-zinc-700 uppercase tracking-[0.3em] min-w-max">
                {[...favoriteGames, ...favoriteGames].map((item, index) => (
                  <span key={`row2-${item}-${index}`} className="hover:text-rose-500/70 transition-colors duration-300">
                    {item}
                  </span>
                ))}
              </div>
            </div>
          </div>

        </div>

        <AnimatedLine />
      </section>

      {/* "Calibration Pause" - Transition to Hobbies */}
      <section className="calibration-section min-h-[50vh] py-32 flex flex-col items-center justify-center relative">
        {/* Visual Anchor - Top */}
        <div className="visual-anchor-top w-[1px] h-24 bg-gradient-to-b from-zinc-800 to-transparent absolute top-0 left-1/2 -translate-x-1/2" />

        <div className="text-center z-10 px-4">
          <p className="calibration-text font-serif italic text-2xl md:text-3xl text-zinc-600 leading-relaxed max-w-2xl mx-auto">
            "Outside of the grid,<br />
            I collect <span className="text-zinc-400">fragments</span>."
          </p>

          <Link
            href="/hobbies"
            className="calibration-link mt-12 inline-block text-[16px] font-mono text-zinc-600 tracking-[0.2em] hover:text-rose-500 transition-colors uppercase group"
          >
            Enter Stream <span className="inline-block transition-transform group-hover:translate-x-1">-&gt;</span>
          </Link>
        </div>

        {/* Visual Anchor - Bottom */}
        <div className="visual-anchor-bottom w-[1px] h-24 bg-gradient-to-t from-zinc-800 to-transparent absolute bottom-0 left-1/2 -translate-x-1/2" />
      </section>



      {/* Featured Projects */}
      <section className="py-32 relative">
        <div className="container mx-auto px-4">
          <div className="projects-header mb-24 text-center">
            <h2 className="projects-title text-3xl md:text-4xl font-semibold mb-6 text-zinc-200">
              Featured Projects
            </h2>
            <p className="projects-subtitle text-zinc-500 max-w-2xl mx-auto">
              A selection of my recent work. Each project represents a unique
              challenge and solution.
            </p>
          </div>

          <div className="projects-grid grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {projects.map((project) => (
              <div key={project.title} className="project-card-wrapper h-full">
                <ProjectCard project={project} />
              </div>
            ))}
          </div>

          <div className="mt-12 text-center">
            <Link
              href="/projects"
              className="inline-flex items-center gap-2 text-zinc-500 hover:text-zinc-300 transition-colors text-sm uppercase tracking-widest"
            >
              View all projects <ArrowUpRight size={16} />
            </Link>
          </div>
        </div>
        <AnimatedLine />
      </section>



      {/* Footer */}
      <ParticleFooter />
    </div>
  );
}
