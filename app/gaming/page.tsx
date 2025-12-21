"use client"

import type { Metadata } from "next"
import { Navigation } from "../components/nav"
import { useState, useEffect } from "react"
import { Particles } from "../components/magicui/star_particles"
import { motion, useReducedMotion } from "framer-motion"
import CustomCursor from "../components/CustomCursor"
import NextTopLoader from "nextjs-toploader"
import LoadingScreen from "../components/LoadingScreen"
import SkillTree from "./components/SkillTree"
import GameCard from "./components/GameCard"
import SubtleAnimatedDivider from "./components/SubtleAnimatedDivider"
import SkillsGallery from "./components/SkillsGallery"
import WhyItMatters from "./components/WhyItMatters"
import { useKonamiCode } from "../hooks/useKonamiCode"
import { toast } from "sonner"
import { Gamepad2 } from "lucide-react"
import { recordEasterEggDiscovery } from "../actions"

const AnimatedLine = ({ className }: { className?: string }) => {
  const shouldReduceMotion = useReducedMotion()

  return (
    <div className={"relative mt-2 " + className}>
      <div
        className={`absolute w-screen h-px ${shouldReduceMotion ? "" : "animate-glow"} md:block animate-fade-right bg-gradient-to-r from-zinc-300/0 via-zinc-300/50 to-zinc-300/0 mt-8 sm:mt-12 lg:mt-16`}
      />
      <div
        className={`absolute w-screen h-px ${shouldReduceMotion ? "" : "animate-glow"} md:block animate-fade-in bg-gradient-to-r from-zinc-300/0 via-zinc-300/50 to-zinc-300/0 mt-8 sm:mt-12 lg:mt-16`}
      />
    </div>
  )
}

export default function GamingPage() {
  const shouldReduceMotion = useReducedMotion()
  const konamiSuccess = useKonamiCode()

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

    <div className="min-h-screen bg-black text-white overflow-x-hidden">
      <Navigation />
      <CustomCursor />
      <NextTopLoader />

      {
        loading && (
          <div className="flex items-center justify-center w-screen h-screen bg-black">
            <LoadingScreen loading={loading} setLoading={setLoading} />
          </div>
        )
      }

      <div className="relative pb-8 sm:pb-16 mt-6">
        {/* Enhanced Background with Geometric Shapes */}
        <Particles
          className="absolute inset-0 z-[99] animate-fade-in"
          quantity={400}
        />

        <div className="px-4 sm:px-6 lg:px-8 pt-16 sm:pt-20 lg:pt-24 xl:pt-32 mx-auto space-y-6 sm:space-y-8 lg:space-y-16 max-w-7xl relative z-10">
          {/* Hero Section - Enhanced for mobile */}
          <div className="max-w-4xl mx-auto lg:mx-0 relative">
            <motion.h1
              initial={shouldReduceMotion ? {} : { opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="z-10 h-full pb-4 text-4xl sm:text-4xl md:text-5xl lg:text-7xl xl:text-8xl 2xl:text-9xl text-transparent duration-1000 bg-white cursor-default animate-title font-display bg-clip-text relative leading-tight"
              style={{
                WebkitTextStroke: "1px #FAF9F6",
              }}
            >
              Lessons Learned from <br className="hidden sm:block" />
              <span className="block sm:inline">My Favorite Games</span>
            </motion.h1>

            <motion.p
              initial={shouldReduceMotion ? {} : { opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.4 }}
              className="mt-4 sm:mt-6 text-zinc-400 relative z-10 text-sm sm:text-base lg:text-lg leading-relaxed max-w-2xl"
            >
              This page explores the key skills, insights, and personal growth
              inspired by some of my all-time favorite games. Each title has
              challenged me in unique ways, teaching me lessons that resonate
              beyond the screen.
            </motion.p>
          </div>

          <AnimatedLine />

          {/* Gaming Skills Tree */}
          <SkillTree />

          <SubtleAnimatedDivider />

          {/* Enhanced Game Cards */}
          <motion.div
            initial={shouldReduceMotion ? {} : { opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.6 }}
            className="text-center text-zinc-500 italic mb-4 sm:mb-6 text-sm sm:text-base"
          >
            Hover over the cards to see gameplay videos
            <span className="block sm:hidden mt-1 text-xs">
              (Tap on mobile)
            </span>
          </motion.div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 sm:gap-6 lg:gap-8 mx-auto max-w-6xl">
            {games.map((game, index) => (
              <GameCard key={game.title} game={game} index={index} />
            ))}
          </div>

          <SubtleAnimatedDivider />

          {/* Skills Gallery */}
          <SkillsGallery />

          <SubtleAnimatedDivider />

          {/* Why It Matters Section */}
          <WhyItMatters />
        </div>
      </div>
    </div>
  );
}
