# Gaming Skills Portfolio Section

A dynamic, interactive section showcasing gaming experiences and their real-world skill applications using Next.js and React.

## Overview

This section explores how gaming experiences contribute to personal and professional development through an interactive interface featuring:
- A dynamic skill tree visualization
- Game-specific cards with video previews
- Comprehensive skill summaries
- Interactive UI elements with smooth animations

## File Structure and Code

### Main Page Component (page.tsx)
```tsx
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

```

### Skills Definition (utils/Skills.ts)
```typescript
import {
  Brain,
  Users,
  ShieldCheck,
  Eye,
  HeartPulse,
  Palette,
  Zap,
  Watch,
  Clock,
  Shield,
  Target,
  LayoutGrid,
  LucideIcon,
} from "lucide-react";


type SkillNode = {
  id: string;
  name: string;
  icon: LucideIcon;
  level: number;
  position: { x: number; y: number };
  connections: string[];
  description?: string;
};

export const skills: SkillNode[] = [
  // 🔵 Center Node
  {
    id: "me",
    name: "ME",
    icon: Brain,
    level: 10,
    position: { x: 50, y: 50 },
    connections: [
      "cognitive-root",
      "social-root",
      "resilience-root",
      "focus-root",
    ],
    description: "The central core from which all skills grow.",
  },

  // 🧠 Cognitive Branch
  {
    id: "cognitive-root",
    name: "Cognitive Skills",
    icon: Brain,
    level: 1,
    position: { x: 50, y: 25 },
    connections: ["problem-solving", "strategic-planning", "critical-thinking"],
    description: "Your ability to think, analyze, and plan.",
  },
  {
    id: "problem-solving",
    name: "Problem Solving",
    icon: Brain,
    level: 9,
    position: { x: 50, y: 5 },
    connections: ["creativity", "adaptability"],
    description: "Solve problems using logical, adaptive strategies.",
  },
  {
    id: "critical-thinking",
    name: "Critical Thinking",
    icon: Watch,
    level: 8,
    position: { x: 40, y: 18 },
    connections: [],
    description: "Assess, evaluate and make rational decisions.",
  },
  {
    id: "strategic-planning",
    name: "Strategic Planning",
    icon: Target,
    level: 8,
    position: { x: 60, y: 18 },
    connections: [],
    description: "Plan ahead, manage time and goals effectively.",
  },
  {
    id: "creativity",
    name: "Creativity",
    icon: Palette,
    level: 8,
    position: { x: 30, y: 5 },
    connections: ["spatial-awareness"],
    description: "Think outside the box, innovate new approaches.",
  },
  {
    id: "adaptability",
    name: "Adaptability",
    icon: Zap,
    level: 8,
    position: { x: 70, y: 5 },
    connections: ["risk-assessment"],
    description: "Quickly shift strategies in changing environments.",
  },
  {
    id: "spatial-awareness",
    name: "Spatial Awareness",
    icon: Eye,
    level: 7,
    position: { x: 20, y: 0 },
    connections: [],
    description: "Understand and visualize space and structure.",
  },
  {
    id: "risk-assessment",
    name: "Risk Assessment",
    icon: ShieldCheck,
    level: 8,
    position: { x: 80, y: 0 },
    connections: [],
    description: "Judge options and predict potential outcomes.",
  },

  // 🤝 Social Skills Branch
  {
    id: "social-root",
    name: "Social Skills",
    icon: Users,
    level: 1,
    position: { x: 30, y: 50 },
    connections: ["teamwork", "communication", "leadership"],
    description: "Interact and cooperate with others.",
  },
  {
    id: "teamwork",
    name: "Teamwork",
    icon: Users,
    level: 8,
    position: { x: 15, y: 30 },
    connections: [],
    description: "Collaborate and sync with teammates effectively.",
  },
  {
    id: "communication",
    name: "Communication",
    icon: Users,
    level: 8,
    position: { x: 15, y: 50 },
    connections: [],
    description: "Convey thoughts clearly and receive feedback.",
  },
  {
    id: "leadership",
    name: "Leadership",
    icon: Users,
    level: 7,
    position: { x: 15, y: 70 },
    connections: [],
    description: "Direct, organize, and inspire teams.",
  },

  // ⚔️ Resilience Branch
  {
    id: "resilience-root",
    name: "Resilience & Growth",
    icon: Shield,
    level: 1,
    position: { x: 70, y: 50 },
    connections: [
      "resilience",
      "emotional-regulation",
      "learning-from-failure",
      "patience-persistence",
    ],
    description: "Mental toughness and personal growth.",
  },
  {
    id: "resilience",
    name: "Resilience",
    icon: Shield,
    level: 9,
    position: { x: 85, y: 20 },
    connections: [],
    description: "Recover from setbacks with a growth mindset.",
  },
  {
    id: "emotional-regulation",
    name: "Emotional Regulation",
    icon: HeartPulse,
    level: 8,
    position: { x: 85, y: 40 },
    connections: [],
    description: "Stay composed under pressure.",
  },
  {
    id: "learning-from-failure",
    name: "Learning from Failure",
    icon: Shield,
    level: 9,
    position: { x: 85, y: 65 },
    connections: [],
    description: "Reflect on mistakes to improve.",
  },
  {
    id: "patience-persistence",
    name: "Patience & Persistence",
    icon: Shield,
    level: 8,
    position: { x: 85, y: 85 },
    connections: [],
    description: "Stay committed through difficult challenges.",
  },

  // 🔴 Focus Branch
  {
    id: "focus-root",
    name: "Focus & Execution",
    icon: Eye,
    level: 1,
    position: { x: 50, y: 75 },
    connections: ["focus", "multitasking"],
    description: "Attention control and task handling.",
  },
  {
    id: "focus",
    name: "Focus & Concentration",
    icon: Eye,
    level: 8,
    position: { x: 40, y: 90 },
    connections: [],
    description: "Maintain attention on tasks over time.",
  },
  {
    id: "multitasking",
    name: "Multitasking",
    icon: Clock,
    level: 7,
    position: { x: 60, y: 90 },
    connections: [],
    description: "Handle multiple demands simultaneously.",
  },
];


```

### Skill Tree Component (components/SkillTree.tsx)
```typescript
import { useRef, useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useInView } from "react-intersection-observer";

import { skills } from "../utils/Skills";
import SkillDetailPanel from "./SkillDetailPanel";



const SkillTree = () => {
  const treeRef = useRef<HTMLDivElement>(null);
  const nodeRefs = useRef<Record<string, HTMLDivElement | null>>({});
  const [lines, setLines] = useState<
    { from: string; to: string; x1: number; y1: number; x2: number; y2: number }[]
  >([]);
  const [selectedSkill, setSelectedSkill] = useState<string | null>(null);
  const [inViewRef, inView] = useInView({ triggerOnce: true, rootMargin: "-100px" });

  // Recalculate lines on layout
  const measure = () => {
    const newLines: any[] = [];
    skills.forEach((s) => {
      s.connections.forEach((toId) => {
        const a = nodeRefs.current[s.id];
        const b = nodeRefs.current[toId];
        if (a && b) {
          const ra = a.getBoundingClientRect();
          const rb = b.getBoundingClientRect();
          const parentRect = treeRef.current!.getBoundingClientRect();
          newLines.push({
            from: s.id,
            to: toId,
            x1: ra.left + ra.width / 2 - parentRect.left,
            y1: ra.top + ra.height / 2 - parentRect.top,
            x2: rb.left + rb.width / 2 - parentRect.left,
            y2: rb.top + rb.height / 2 - parentRect.top,
          });
        }
      });
    });
    setLines(newLines);
  };

  useEffect(() => {
    measure();
    window.addEventListener("resize", measure);
    return () => window.removeEventListener("resize", measure);
  }, []);

  return (
    <div className="relative">
      {/* Title */}
      <h2 className="text-2xl font-bold mb-4 z-50 text-center w-[88vw]">Skill Tree</h2>
      {/* Main Skill Tree Container */}
      <div
        ref={(el) => {
          (treeRef as React.MutableRefObject<HTMLDivElement | null>).current =
          el;
          inViewRef(el);
        }}
        className="relative min-h-[560px] p-6 sm:p-10 mb-52 mt-28"
      >
        {/* SVG for connection lines */}
        <svg className="absolute inset-0 w-full h-full pointer-events-none">
          {lines.map((l, i) => (
            <motion.line
              key={i}
              x1={l.x1}
              y1={l.y1}
              x2={l.x2}
              y2={l.y2}
              stroke="#27272a" // zinc-800
              strokeWidth={2}
              initial={{ pathLength: 0, opacity: 0 }}
              animate={inView ? { pathLength: 1, opacity: 1 } : {}}
              transition={{ duration: 1, delay: 0.3 + i * 0.08 }}
            />
          ))}
        </svg>

        {/* Skill Nodes */}
        <div className="absolute inset-0">
          {skills.map((skill, idx) => (
            <motion.div
              key={skill.id}
              ref={(el) => {
                nodeRefs.current[skill.id] = el;
              }}
              initial={{ opacity: 0, scale: 0.92 }}
              animate={inView ? { opacity: 1, scale: 1 } : {}}
              transition={{ duration: 0.55, delay: idx * 0.095 + 0.24 }}
              style={{
                position: "absolute",
                left: `${skill.position.x}%`,
                top: `${skill.position.y}%`,
                transform: "translate(-50%, -50%)",
                zIndex: 2,
              }}
              className="group cursor-pointer focus:outline-none"
              onClick={() =>
                setSelectedSkill(selectedSkill === skill.id ? null : skill.id)
              }
              tabIndex={0}
              aria-label={skill.name}
              onKeyDown={(e) => {
                if (e.key === "Enter" || e.key === " ")
                  setSelectedSkill(
                    selectedSkill === skill.id ? null : skill.id
                  );
              }}
              onLayoutAnimationComplete={measure}
            >
              <div className="relative">
                <div className="relative w-12 h-12 sm:w-16 sm:h-16 bg-neutral-900 border border-neutral-700 group-hover:border-neutral-500 rounded-full flex items-center justify-center shadow-none transition-all">
                  <skill.icon className="w-5 h-5 sm:w-7 sm:h-7 text-neutral-400 group-hover:text-white transition-all" />
                </div>
                <div className="absolute -bottom-2 sm:-bottom-3 left-1/2 transform -translate-x-1/2 px-1.5 sm:px-2 py-0.5 rounded-full text-xs bg-neutral-900 text-neutral-400 border border-neutral-700 font-mono shadow-sm">
                  {skill.level}/10
                </div>
                <div className="absolute -bottom-6 sm:-bottom-8 left-1/2 transform -translate-x-1/2 whitespace-nowrap select-none">
                  <span className="text-white text-xs sm:text-sm font-medium tracking-wide">
                    {skill.name}
                  </span>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>

      {/* Detail Panel */}
      <AnimatePresence>
        {selectedSkill && (
          <SkillDetailPanel
            selectedSkill={selectedSkill}
            setSelectedSkill={setSelectedSkill}
            inView={inView}
            treeRef={treeRef}
          />
        )}
      </AnimatePresence>
    </div>
  );
};

export default SkillTree;

```

### Game Card Component (components/GameCard.tsx)
```typescript
import { memo, useState, useEffect, useRef } from "react";
import { motion, Variants } from "framer-motion";
import { useInView } from "react-intersection-observer";
import GameIcon from "../utils/GameIcons";
import "../page.css"; // Import global styles

// Cloudinary settings
const CLOUDINARY_CLOUD_NAME = "dezgrhc2p";

const cardVariants: Variants = {
  off: { opacity: 0, y: 50 },
  on: { opacity: 1, y: 0 },
};

interface GameCardProps {
  game: Game;
  index: number;
}
interface Game {
  title: string;
  lessons: string[];
  bgVideoId?: string; // Use publicId instead of url
  videoCreator?: string;
}

const getCloudinaryUrl = (publicId: string) =>
  `https://res.cloudinary.com/${CLOUDINARY_CLOUD_NAME}/video/upload/q_auto,f_auto/${publicId}.mp4`;

const GameCard = memo(({ game, index }: GameCardProps) => {
  const { ref, inView } = useInView({
    triggerOnce: true,
    rootMargin: "-100px",
  });
  const [hovered, setHovered] = useState(false);
  const [showVideo, setShowVideo] = useState(false);

  const videoRef = useRef<HTMLVideoElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);

  const videoSrc = game.bgVideoId
    ? getCloudinaryUrl(game.bgVideoId)
    : undefined;

  useEffect(() => {
    if (!hovered) {
      setShowVideo(false);
      return;
    }
    const timer = setTimeout(() => setShowVideo(true), 3500); // Shorten to 1.5s for better UX
    return () => clearTimeout(timer);
  }, [hovered]);

   // once showVideo flips on, wire up draw-loop
  useEffect(() => {
    if (!showVideo) return;
    const video = videoRef.current;
    const canvas = canvasRef.current;
    if (!video || !canvas) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    // low-res buffer
    canvas.width = 120;
    canvas.height = 60;

    let frameId: number;

    function render() {
      if (!video || video.paused || video.ended || !ctx || !canvas) return;
      ctx.drawImage(video, 0, 0, canvas.width, canvas.height);
      frameId = requestAnimationFrame(render);
    }

    // start rendering when video starts playing
    video.addEventListener("play", render);
    // if it’s already autoplaying, kick it off immediately
    if (!video.paused) render();

    return () => {
      video.removeEventListener("play", render);
      cancelAnimationFrame(frameId);
    };
  }, [showVideo]);

  return (
    <motion.div
      ref={ref}
      variants={cardVariants}
      initial="off"
      animate={inView ? "on" : "off"}
      transition={{
        duration: 0.7,
        delay: index * 0.1,
        type: "spring",
        stiffness: 120,
      }}
      className="relative group"
      style={{ perspective: 1000 }}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
    >
      {/* --- Ambient Glow Canvas --- */}

      {showVideo && videoSrc && (
        <>
          <canvas
            ref={canvasRef}
            className="ambience-canvas z-[9]"
            aria-hidden="true"
          />
          <video
            src={videoSrc}
            ref={videoRef}
            autoPlay
            controls={false}
            loop
            playsInline
            preload="auto"
            className="absolute inset-0 w-full h-full object-cover rounded-2xl z-10"
            poster={`https://res.cloudinary.com/${CLOUDINARY_CLOUD_NAME}/video/upload/${game.bgVideoId}.jpg`} // optional: video poster
          />
          <div className="absolute bottom-3 right-4 z-20 bg-black/40 text-neutral-200 text-xs px-2 py-1 rounded pointer-events-none opacity-80">
            Credits: @{game.videoCreator || "original_creator"}
          </div>
        </>
      )}

      {!showVideo && (
        <motion.div
          className={`relative p-6 rounded-2xl z-20 border border-neutral-700
            shadow-xl transition-all duration-200 
            bg-gradient-to-br from-white/5 via-white/2 to-white/0
            backdrop-blur-xl
            ${hovered ? "border-neutral-400 bg-white/5" : ""}
          `}
        >
          {/* Card glass shine effect (subtle overlay) */}
          <div
            className={`pointer-events-none absolute inset-0 rounded-2xl transition-opacity duration-500 
            ${hovered ? "opacity-20" : "opacity-10"} 
            bg-gradient-to-tr from-white/30 via-transparent to-transparent`}
          />

          <div className="relative z-10">
            <div className="flex items-center gap-3 mb-6">
              <GameIcon
                game={game.title}
                className="w-7 h-7 text-neutral-400"
              />
              <h3 className="text-xl font-bold text-white">{game.title}</h3>
            </div>
            <ul className="space-y-3 text-neutral-400">
              {game.lessons.map((lesson: string, i: number) => (
                <li key={i} className="flex items-start gap-3">
                  <div className="w-1.5 h-1.5 bg-neutral-600 rounded-full mt-2.5" />
                  <span className="text-sm">{lesson}</span>
                </li>
              ))}
            </ul>
          </div>
        </motion.div>
      )}

      {/* Preload video */}
      {videoSrc && (
        <video
          src={videoSrc}
          preload="auto"
          className="absolute inset-0 w-full h-full object-cover rounded-2xl z-10"
          style={{ display: "none" }} // Hide the preloaded video
        />
      )}
    </motion.div>
  );
});

export default GameCard;

```

### Summary Table Component (components/SummaryTable.tsx)
```typescript
import { useRef } from "react";
import { motion } from "framer-motion";
import GameIcon from "../utils/GameIcons";
import { Brain, Palette, Shield, Heart, Zap, Target } from "lucide-react";

const EnhancedTable = () => {
  const tableData = [
    { game: "Call of Duty", lessons: "Teamwork, communication, adaptability, fast decision-making", icon: Target },
    { game: "Minecraft", lessons: "Creativity, persistence, project management, planning", icon: Palette },
    { game: "Sekiro", lessons: "Precision, resilience, learning from failure, patience", icon: Shield },
    { game: "Elden Ring", lessons: "Exploration, resourcefulness, overcoming adversity", icon: Brain },
    { game: "Marvel's Spider-Man", lessons: "Empathy, flow, responsibility, moral choices", icon: Heart },
    { game: "Dying Light", lessons: "Adaptation, risk assessment, resourcefulness", icon: Zap },
  ];

  return (
    <div className="max-w-6xl mx-auto">
      <motion.h2
        className="text-3xl font-bold text-white mb-8 text-center"
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.7 }}
      >
        Skills Summary by Game
      </motion.h2>
      <div className="backdrop-blur-xl bg-white/[0.04] border border-neutral-700 rounded-2xl overflow-hidden shadow">
        <div className="overflow-x-auto">
          <table className="w-full min-w-[400px]">
            <thead>
              <tr className="border-b border-neutral-700">
                <th className="px-6 py-4 text-left text-white font-semibold">Game</th>
                <th className="px-6 py-4 text-left text-white font-semibold">Key Skills Developed</th>
              </tr>
            </thead>
            <tbody>
              {tableData.map((item, idx) => (
                <tr key={item.game} className="group border-b border-neutral-800 transition-all hover:bg-white/5">
                  <td className="px-6 py-4">
                    <div className="flex items-center gap-3">
                      <item.icon className="w-5 h-5 text-neutral-400" />
                      <GameIcon game={item.game} />
                      <span className="text-white font-medium">{item.game}</span>
                    </div>
                  </td>
                  <td className="px-6 py-4 text-neutral-400">{item.lessons}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};
export default EnhancedTable;
```

### Game Icons Utility (utils/GameIcons.tsx)
```typescript

import Image from "next/image";
// Game Icon Component
const GameIcon = ({ game, className }: { game: string, className?: string }) => {
  const icons = {
    "Call of Duty": (
      <div className={`w-8 h-8 bg-gradient-to-br from-blue-500/20 to-blue-700/20 border border-blue-500/30 rounded-lg flex items-center justify-center text-blue-400 font-bold text-xs ${className}`}>
        <Image
          src="/icons/games/COD.webp"
          alt="Call of Duty Icon"
          width={24}
          height={24}
          className="w-5 h-5"
        />
      </div>
    ),
    Minecraft: (
      <div className={`w-8 h-8 bg-gradient-to-br from-teal-500/20 to-teal-700/20 border border-teal-500/30 rounded-lg flex items-center justify-center ${className}`}>
        <Image
          src="/icons/games/Minecraft.webp"
          alt="Minecraft Icon"
          width={24}
          height={24}
          className="w-5 h-5"
        />
      </div>
    ),
    "Sekiro": (
      <div className={`w-8 h-8 bg-gradient-to-br from-purple-500/20 to-purple-700/20 border border-purple-500/30 rounded-lg flex items-center justify-center text-purple-400 font-bold text-xs ${className}`}>
        <Image
          src="/icons/games/Sekiro.webp"
          alt="Sekiro Icon"
          width={24}
          height={24}
          className="w-5 h-5"
        />
      </div>
    ),
    "Elden Ring": (
      <div className={`w-8 h-8 bg-gradient-to-br from-blue-500/20 to-purple-500/20 border border-blue-500/30 rounded-lg flex items-center justify-center text-blue-400 font-bold text-xs ${className}`}>
        <Image
          src="/icons/games/EldenRing.webp"
          alt="Elden Ring Icon"
          width={24}
          height={24}
          className="w-5 h-5"
        />
      </div>
    ),
    "Marvel's Spider-Man": (
      <div className={`w-8 h-8 bg-gradient-to-br from-blue-600/20 to-purple-600/20 border border-blue-500/30 rounded-lg flex items-center justify-center text-blue-400 font-bold text-xs ${className}`}>
        <Image
          src="/icons/games/SpiderMan.webp"
          alt="Marvel's Spider-Man Icon"
          width={24}
          height={24}
          className="w-5 h-5"
        />
      </div>
    ),
    "Dying Light": (
      <div className={`w-8 h-8 bg-gradient-to-br from-purple-500/20 to-teal-500/20 border border-purple-500/30 rounded-lg flex items-center justify-center text-purple-400 font-bold text-xs ${className}`}>
        <Image
          src="/icons/games/DyingLight.webp"
          alt="Dying Light Icon"
          width={24}
          height={24}
          className="w-5 h-5"
        />
      </div>
    ),
  };

  return (
    icons[game as keyof typeof icons] || (
      <div className={`w-8 h-8 bg-zinc-600/20 border border-zinc-500/30 rounded-lg ${className}`}></div>
    )
  );
}

export default GameIcon;

```


### Skill Detail Panel Component (components/SkillDetailPanel.tsx)
```typescript
import { useRef } from "react"
import { useInView, AnimatePresence, motion } from "framer-motion"
import { skills } from "../utils/Skills";

type SkillDetailPanelProps = {
  selectedSkill: string | null;
  setSelectedSkill: React.Dispatch<React.SetStateAction<string | null>>;
  inView?: boolean; 
  treeRef?: React.RefObject<HTMLDivElement>;
};

const SkillDetailPanel = ({
  selectedSkill,
  setSelectedSkill,
}: SkillDetailPanelProps) => {
  const treeRef = useRef(null);
  const inView = useInView(treeRef, { margin: "-30% 0px -30% 0px" }) // tweak if needed

  const s = skills.find((sk) => sk.id === selectedSkill)
  if (!s) return null

  return (
    <>
      <div ref={treeRef} className="absolute top-[40%] left-0 h-0 w-full" />
      <AnimatePresence>
        <motion.div
          key={s.id}
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: 40 }}
          className={`${
            !inView
              ? "absolute -bottom-48"
              : "fixed bottom-4 px-6mx-auto space-y-8 max-w-7xl lg:px-24 md:space-y-16"
          } w-full z-50 px-4 sm:px-8`}
          transition={{
            duration: 0.4,
            type: "spring",
            stiffness: 80,
            damping: 20,
          }}
        >
          <div className="p-4 sm:p-5 rounded-xl bg-neutral-900/95 border border-neutral-700 shadow-2xl backdrop-blur-sm">
            <div className="flex gap-3 sm:gap-4 items-start">
              <div className="w-10 h-10 sm:w-12 sm:h-12 rounded-lg flex items-center justify-center bg-neutral-800 border border-neutral-600 flex-shrink-0">
                <s.icon className="w-5 h-5 sm:w-6 sm:h-6 text-white" />
              </div>
              <div className="flex-1 min-w-0">
                <div className="flex items-start justify-between gap-2 mb-2">
                  <h3 className="text-white font-semibold text-base sm:text-lg leading-tight">
                    {s.name}
                  </h3>
                  <button
                    onClick={() => setSelectedSkill(null)}
                    className="text-neutral-400 hover:text-white transition-colors p-1 -m-1 flex-shrink-0"
                    aria-label="Close"
                  >
                    <svg
                      className="w-4 h-4"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M6 18L18 6M6 6l12 12"
                      />
                    </svg>
                  </button>
                </div>
                <p className="text-neutral-300 text-sm sm:text-[15px] leading-relaxed mb-3">
                  {s.description}
                </p>
                <div className="flex flex-col sm:flex-row sm:items-center gap-2">
                  <span className="text-xs text-neutral-500 flex-shrink-0">
                    Skill Level:
                  </span>
                  <div className="flex gap-1">
                    {[...Array(10)].map((_, idx) => (
                      <div
                        key={idx}
                        className={`w-2 h-2 rounded-full transition-colors ${
                          idx < s.level ? "bg-neutral-300" : "bg-neutral-700"
                        }`}
                      />
                    ))}
                  </div>
                  <span className="text-xs text-neutral-400 ml-2">
                    {s.level}/10
                  </span>
                </div>
              </div>
            </div>
          </div>
        </motion.div>
      </AnimatePresence>
    </>
  );
}

export default SkillDetailPanel;
```

### Page.css
```css
.ambience-canvas {
  position: absolute;
  inset: 0;
  width: 100%;
  height: 100%;
  filter: blur(24px) opacity(0.75) saturate(180%);
  z-index: 10;
  pointer-events: none;
  border-radius: 1rem; /* match the video for rounded edges */
  transform: scale(1.13); /* slightly expands the blur glow beyond the video */
}
```



## Technologies Used

- **Framework**: Next.js with React
- **Animation**: Framer Motion
- **Styling**: Tailwind CSS
- **Media**: Cloudinary for video hosting
- **Icons**: Lucide React

## Features

1. **Interactive Skill Tree**
   - Visual skill progression system
   - Animated connections between related skills
   - Detailed skill information on interaction

2. **Dynamic Game Cards**
   - Smooth hover animations
   - Video preview integration
   - Responsive design
   - Glass-morphic UI effects

3. **Skill Summary**
   - Organized tabulation of gaming experiences
   - Clear connection between games and skills
   - Mobile-responsive layout

4. **Visual Effects**
   - Smooth animations
   - Particle effects
   - Glass-morphic UI
   - Responsive design elements

## Dependencies

```json
{
  "dependencies": {
    "framer-motion": "latest",
    "lucide-react": "latest",
    "react-intersection-observer": "latest",
    "tailwindcss": "latest",
    "nextjs-toploader": "latest"
  }
}
```

## Technical Highlights

- Efficient video loading with preload mechanism
- Optimized animations using Framer Motion
- Responsive design with mobile-first approach
- Interactive UI elements with accessibility support
- Glass-morphic design system
- Component-based architecture for maintainability

## Full Code Access

For complete implementation details, refer to the individual files in the project structure. Each component is thoroughly documented with TypeScript types and includes necessary imports and dependencies.