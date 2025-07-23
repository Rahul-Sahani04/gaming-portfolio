"use client"

import type { Metadata } from "next"
import { Navigation } from "../components/nav"
import { useRef, useState, useEffect } from "react"
import { Particles } from "../components/magicui/star_particles"
import { motion, useInView } from "framer-motion"
import CustomCursor from "../components/CustomCursor"
import NextTopLoader from "nextjs-toploader"
import { ArrowUpRight, Sparkles } from "lucide-react"
import SkillTree from "./components/SkillTree"
import GameCard from "./components/GameCard"
import GameIcon from "./utils/GameIcons"

import SubtleAnimatedDivider from "./components/SubtleAnimatedDivider"

import EnhancedTable from "./components/SummaryTable"

const metadata: Metadata = {
  title: "Lessons from Gaming | Rahul Sahani",
  description:
    "Exploring the key skills, insights, and personal growth inspired by some of my all-time favorite games.",
}

// Glassmorphic Final Section
const WhyItMattersSection = () => {
  const sectionRef = useRef<HTMLDivElement>(null)
  const isInView = useInView(sectionRef, { once: true })



  const points = [
    {
      icon: ArrowUpRight,
      title: "Transferable Skills",
      description:
        "Gaming abilities translate directly to real-world problem-solving, leadership, and collaborative success.",
    },
    {
      icon: Sparkles,
      title: "Growth Mindset",
      description:
        "Overcoming digital challenges builds resilience and comfort with uncertainty, failure, and continuous learning.",
    },
  ]

  return (
    <motion.div
      ref={sectionRef}
      initial={{ opacity: 0, y: 50 }}
      animate={isInView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.8 }}
      className="max-w-4xl mx-auto relative"
    >

      {/* Main glassmorphic container */}
      <div className="relative backdrop-blur-2xl bg-white/[0.02] border border-white/10 rounded-3xl p-8 shadow-2xl">
        {/* Animated accent ring */}
        <div className="absolute inset-0 rounded-3xl bg-gradient-to-r from-blue-500/10 via-purple-500/10 to-teal-500/10 animate-pulse" />

        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ delay: 0.2 }}
          className="text-3xl font-bold text-white mb-8 text-center"
        >
          Why These Lessons Matter
        </motion.h2>

        <div className="relative space-y-6">
          {points.map((point, index) => (
            <motion.div
              key={point.title}
              initial={{ opacity: 0, x: -30 }}
              animate={isInView ? { opacity: 1, x: 0 } : {}}
              transition={{ delay: 0.4 + index * 0.2 }}
              whileHover={{ scale: 1.02, transition: { duration: 0.2 } }}
              className="flex items-start gap-4 p-6 rounded-2xl bg-white/[0.02] border border-white/5 hover:border-blue-500/20 transition-all duration-300 group"
            >
              <div className="w-12 h-12 rounded-full bg-gradient-to-br from-blue-500/20 to-purple-500/20 flex items-center justify-center flex-shrink-0 group-hover:from-blue-500/30 group-hover:to-purple-500/30 transition-all duration-300">
                <point.icon className="w-6 h-6 text-blue-400 group-hover:text-blue-300 transition-colors" />
              </div>
              <div>
                <h3 className="font-bold text-white mb-2 group-hover:text-blue-100 transition-colors">
                  {point.title}
                </h3>
                <p className="text-zinc-400 group-hover:text-zinc-300 transition-colors leading-relaxed">
                  {point.description}
                </p>
              </div>
            </motion.div>
          ))}
        </div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ delay: 0.8 }}
          className="mt-8 pt-6 border-t border-white/10 text-center"
        >
          <p className="text-zinc-400 italic">
            This page celebrates the games that have shaped my approach to
            challenges, creativity, and collaboration— lessons that continue to
            influence my work and personal growth.
          </p>
        </motion.div>
      </div>
    </motion.div>
  );
}

const AnimatedLine = ({ className }: { className?: string }) => {
  return (
    <div className={"relative mt-2 " + className}>
      <div className="absolute w-screen h-px animate-glow md:block animate-fade-right bg-gradient-to-r from-zinc-300/0 via-zinc-300/50 to-zinc-300/0 mt-16" />
      <div className="absolute w-screen h-px animate-glow md:block animate-fade-in bg-gradient-to-r from-zinc-300/0 via-zinc-300/50 to-zinc-300/0 mt-16" />
    </div>
  )
}

export default function GamingPage() {
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
      bgVideoId: "EldenRing_Edit_endnt0"
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
      bgVideoId: "Sekiro_Edit_v3lgcs"
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
      bgVideoId: "SpiderMan_Edit_jqyusd"
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
      bgVideoId: "DyingLight_Edit_rlkv46"
    },
  ]

  return (
    <div className="min-h-screen bg-black text-white overflow-x-hidden">
      <Navigation />
      <CustomCursor />
      <NextTopLoader />
      <div className="relative pb-16">
        {/* Enhanced Background with Geometric Shapes */}
        {/* <GeometricBackground /> */}
        <Particles
          className="absolute inset-0 z-[99] animate-fade-in "
          quantity={400}
        />

        <div className="px-6 pt-20 mx-auto space-y-8 max-w-7xl lg:px-8 md:space-y-16 md:pt-24 lg:pt-32 relative z-10">
          {/* Hero Section - With Enhanced Background */}
          <div className="max-w-2xl mx-auto lg:mx-0 relative">
            <motion.h1
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="z-10 h-full pb-4 text-3xl  sm:text-5xl md:text-7xl lg:text-9xl text-transparent duration-1000 bg-white cursor-default animate-title font-display whitespace-nowrap bg-clip-text relative"
              style={{
                WebkitTextStroke: "2px #FAF9F6",
              }}
            >
              Lessons Learned from <br /> My Favorite Games
            </motion.h1>
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.4 }}
              className="mt-4 text-zinc-400 relative z-10"
            >
              This page explores the key skills, insights, and personal growth
              inspired by some of my all-time favorite games. Each title has
              challenged me in unique ways, teaching me lessons that resonate
              beyond the screen.
            </motion.p>
          </div>

          <AnimatedLine />

          {/* <div className="my-16 text-center animate-fade-in">
            <h2 className="text-sm text-zinc-500">
              <a className="duration-500 hover:text-zinc-300 no-underline press-start sm:text-xl md:text-3xl z-20">
                Press Start
              </a>
            </h2>
          </div> */}

          {/* Gaming Skills Tree */}
          <SkillTree />

          <SubtleAnimatedDivider />

          {/* Enhanced Game Cards */}
          {/* Hint the user to hover for videos */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.6 }}
            className="text-center text-zinc-500 italic mb-4"
          >
            Keep Hovering over the cards to see gameplay videos
          </motion.div>
          <div className="grid grid-cols-1 gap-8 mx-auto lg:grid-cols-2 max-w-6xl">
            {games.map((game, index) => (
              <GameCard key={game.title} game={game} index={index} />
            ))}
          </div>

          <SubtleAnimatedDivider />

          {/* Enhanced Table */}
          <EnhancedTable />

          <SubtleAnimatedDivider />

          {/* Enhanced Why It Matters Section */}
          <WhyItMattersSection />
        </div>
      </div>
    </div>
  );
}
