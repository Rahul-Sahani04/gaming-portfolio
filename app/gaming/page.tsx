"use client"

import type { Metadata } from "next"
import { Navigation } from "../components/nav"
import { useState, useEffect, useRef } from "react"
import { Particles } from "../components/magicui/star_particles"
import { motion, useReducedMotion, useScroll, useSpring } from "framer-motion"
import CustomCursor from "../components/CustomCursor"
import NextTopLoader from "nextjs-toploader"
import LoadingScreen from "../components/LoadingScreen"
import SkillTree from "./components/SkillTree"
import GameCard from "./components/GameCard"
import SkillsGallery from "./components/SkillsGallery"
import WhyItMatters from "./components/WhyItMatters"
import { useKonamiCode } from "../hooks/useKonamiCode"
import { toast } from "sonner"
import { Gamepad2 } from "lucide-react"
import { recordEasterEggDiscovery } from "../actions"



const Spacer = ({ size = "md" }: { size?: "sm" | "md" | "lg" | "xl" }) => {
  const heights = {
    sm: "h-24 sm:h-32",
    md: "h-32 sm:h-48",
    lg: "h-48 sm:h-64",
    xl: "h-64 sm:h-96",
  }
  return <div className={`w-full ${heights[size]}`} aria-hidden="true" />
}

const NarrativeText = ({ children, className = "" }: { children: React.ReactNode, className?: string }) => {
  const shouldReduceMotion = useReducedMotion()
  return (
    <motion.div
      initial={shouldReduceMotion ? {} : { opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-10%" }}
      transition={{ duration: 0.8 }}
      className={`max-w-2xl mx-auto text-center px-4 relative z-10 ${className}`}
    >
      <div className="text-zinc-300 text-lg sm:text-xl leading-relaxed font-light drop-shadow-md">
        {children}
      </div>
    </motion.div>
  )
}

const ChapterTitle = ({ children }: { children: React.ReactNode }) => {
  const shouldReduceMotion = useReducedMotion()
  return (
    <motion.h2
      initial={shouldReduceMotion ? {} : { opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-10%" }}
      transition={{ duration: 0.8 }}
      className="text-3xl sm:text-4xl md:text-5xl font-display text-center text-white mb-12 sm:mb-16 relative z-10"
    >
      {children}
    </motion.h2>
  )
}

export default function GamingPage() {
  const shouldReduceMotion = useReducedMotion()
  const konamiSuccess = useKonamiCode()

  // Scroll progress for the timeline
  const containerRef = useRef<HTMLDivElement>(null)
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"]
  })

  const scaleY = useSpring(scrollYProgress, {
    stiffness: 100,
    damping: 30,
    restDelta: 0.001
  })

  useEffect(() => {
    if (konamiSuccess) {
      // Record discovery
      recordEasterEggDiscovery().then((res) => {
        if (res.success && typeof res.count === 'number') {
          console.log(`Easter egg discovered! Total discoverers: ${res.count}`);
        }
      });

      toast("Achievement Unlocked: Retro Gamer 🕹️", {
        description: "You found the hidden cheat code! +100 XP",
        icon: <Gamepad2 className="w-5 h-5 text-emerald-400" />,
        duration: 5000,
        style: {
          background: "rgba(0,0,0,0.8)",
          backdropFilter: "blur(10px)",
          border: "1px solid rgba(255,255,255,0.1)",
          color: "white"
        }
      })
    }
  }, [konamiSuccess])

  const games = [
    {
      title: "Elden Ring",
      lessons: [
        "Exploration: The vast open world rewards curiosity and encourages discovery beyond conventional paths.",
        "Resourcefulness: Managing health, items, and progression requires strategic thinking and consequence acceptance.",
        "Overcoming Adversity: Challenging bosses and hidden secrets test perseverance and creative problem-solving.",
      ],
      bgVideoUrl: "/game_videos/EldenRing_Edit.mp4",
      videoCreator: "RotoMatic",
      bgVideoId: "EldenRing_Edit_endnt0",
    },
    {
      title: "Sekiro",
      lessons: [
        "Precision & Timing: Combat systems demand exact timing, careful observation, and methodical execution.",
        "Resilience: Frequent defeats became valuable feedback loops, teaching analysis and strategic adaptation.",
        "Patience: These games reward thoughtful, measured approaches over impulsive reactions.",
      ],
      bgVideoUrl: "/game_videos/Sekiro_Edit.mp4",
      videoCreator: "RotoMatic",
      bgVideoId: "Sekiro_Edit_v3lgcs",
    },
    {
      title: "Call of Duty",
      lessons: [
        "Teamwork & Communication: Squad coordination improved my ability to share tactics and execute strategies under pressure.",
        "Quick Decision-Making: Fast-paced gameplay sharpened reflexes and taught smart choices in high-stakes situations.",
        "Adaptability: Every match demands constant learning and adaptation to opponents' evolving strategies.",
      ],
      bgVideoUrl: "/game_videos/Cod_Edit.mp4",
      videoCreator: "hmoodedits",
      bgVideoId: "Cod_Edit_fbgrv5",
    },
    {
      title: "Minecraft",
      lessons: [
        "Creativity & Imagination: Building complex worlds from scratch fostered experimental thinking and creative problem-solving.",
        "Project Management: Planning large builds and coordinating group projects mirrored real-world resource allocation.",
        "Perseverance: Survival mode and Redstone mechanics taught persistence through setbacks and iterative improvement.",
      ],
      bgVideoUrl: "/game_videos/Minecraft_Edit.mp4",
      videoCreator: "ayxshedits",
      bgVideoId: "Minecraft_Edit_lla0hs",
    },
    {
      title: "Marvel's Spider-Man",
      lessons: [
        'Flow State: Swinging through New York creates immersive presence, demonstrating the joy of being "lost" in focused activity.',
        "Empathy: Rich storytelling explores moral complexity and the human elements of heroic responsibility.",
        'Responsibility: The classic "great power" theme influences every gameplay choice and narrative decision.',
      ],
      bgVideoUrl: "/game_videos/SpiderMan_Edit.mp4",
      videoCreator: "kordaxgaming",
      bgVideoId: "SpiderMan_Edit_jqyusd",
    },
    {
      title: "Dying Light",
      lessons: [
        "Adaptation: Transitioning between day exploration and night survival taught preparation for unexpected challenges.",
        "Risk Assessment: Deciding when to venture out or play safe reflects real-life decision-making under uncertainty.",
        "Resourcefulness: Scavenging and crafting in hostile environments reinforced maximizing limited resources.",
      ],
      bgVideoUrl: "/game_videos/DyingLight_Edit.mp4",
      videoCreator: "Dying_Light.Edits",
      bgVideoId: "DyingLight_Edit_rlkv46",
    },
  ]

  const [loading, setLoading] = useState(true);

  return (
    <div ref={containerRef} className="min-h-screen bg-black text-white overflow-x-hidden selection:bg-white/20 selection:text-white">
      <Navigation />
      <CustomCursor />
      <NextTopLoader />

      {
        loading && (
          <div className="flex items-center justify-center w-screen h-screen bg-black fixed inset-0 z-[100]">
            <LoadingScreen loading={loading} setLoading={setLoading} />
          </div>
        )
      }

      <div className="relative w-full">
        {/* Thread/Timeline Line */}
        <div className="absolute left-1/2 top-[10vh] bottom-0 w-px -translate-x-1/2 bg-white/5 z-0 pointer-events-none hidden md:block" />
        <motion.div
          style={{ scaleY, originY: 0 }}
          className="absolute left-1/2 top-[10vh] bottom-0 w-px -translate-x-1/2 bg-gradient-to-b from-white/0 via-white/20 to-white/0 z-0 pointer-events-none hidden md:block"
        />

        {/* Enhanced Background */}
        <Particles
          className="fixed inset-0 z-0 animate-fade-in"
          quantity={200}
          staticity={30}
          ease={20}
        />

        {/* --- HERO SECTION --- */}
        <section className="relative z-10 min-h-[85vh] flex flex-col justify-center items-center px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={shouldReduceMotion ? {} : { opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, delay: 0.2, ease: [0.22, 1, 0.36, 1] }}
            className="text-center max-w-4xl mx-auto"
          >
            <h1 className="text-5xl sm:text-6xl md:text-7xl lg:text-9xl font-display tracking-tight text-white mb-8 sm:mb-12">
              Gaming <span className="opacity-40 font-light font-serif italic">&</span><br />
              <span className="text-white drop-shadow-[0_0_15px_rgba(255,255,255,0.3)]">
                Growth
              </span>
            </h1>

            <NarrativeText className="max-w-xl">
              More than just entertainment, games are a sandbox for the mind.
              They challenge us to solve problems, adapt to chaos, and persist
              through failure. These are the lessons I've carried from the
              virtual world into the real one.
            </NarrativeText>
          </motion.div>
        </section>

        {/* --- SKILL TREE CHAPTER --- */}
        <section className="relative z-10 px-4">
          <Spacer size="sm" />

          <NarrativeText>
            It starts with the fundamental skills. Like a character build in an RPG,
            my professional abilities have branched out from core competencies,
            each new skill unlocking further possibilities.
          </NarrativeText>

          <Spacer size="sm" />

          <div className="max-w-7xl mx-auto backdrop-blur-[2px]">
            <SkillTree />
          </div>
        </section>

        {/* --- GAME LESSONS CHAPTER --- */}
        <section className="relative z-10 px-4">
          <Spacer size="lg" />

          <ChapterTitle>The Source Material</ChapterTitle>

          <NarrativeText>
            Every difficult boss fight, every complex puzzle, and every cooperative mission
            left a mark. These aren't just games I played—they are experiences that shaped
            my perspective on resilience, leadership, and creativity.
          </NarrativeText>

          <Spacer size="md" />

          <motion.div
            initial={shouldReduceMotion ? {} : { opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="text-center text-zinc-500 italic mb-24 text-sm tracking-wider"
          >
            HOVER CARDS TO REVEAL
          </motion.div>

          {/* Cards Container - Aligned with thread */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 sm:gap-6 lg:gap-12 mx-auto max-w-6xl">
            {games.map((game, index) => (
              <div key={game.title} className={index % 2 === 0 ? "lg:translate-y-12" : "lg:-translate-y-12"}>
                <GameCard game={game} index={index} />
              </div>
            ))}
          </div>
        </section>

        {/* --- SKILLS GALLERY CHAPTER --- */}
        <section className="relative z-10 px-4">
          <Spacer size="xl" />

          <ChapterTitle>The Inventory</ChapterTitle>

          <NarrativeText>
            A visual collection of the tools and technologies I've mastered along the way.
          </NarrativeText>

          <Spacer size="sm" />

          <SkillsGallery />
        </section>

        {/* --- OUTRO CHAPTER --- */}
        <section className="relative z-10 px-4">
          <Spacer size="lg" />

          <div className="max-w-4xl mx-auto">
            <WhyItMatters />
          </div>

          <Spacer size="xl" />
        </section>

      </div>
    </div>
  );
}
