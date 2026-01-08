"use client";

import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { ArrowUpRight } from "lucide-react";
import Link from "next/link";
import TechCard from "./components/TechCard";
import ProjectCard from "./components/ProjectCard";
import { Navigation } from "../components/nav";
import CustomCursor from "../components/CustomCursor";
import NextTopLoader from "nextjs-toploader";
import ParticleFooter from "./components/ParticleFooter";
import LoadingScreen from "../components/LoadingScreen";
import "./page.css";
// import PhotographyGrid from "./components/PhotographyGrid";
// import Spotify from "../components/Spotify";

export default function AboutPage() {
  const AnimatedLine = ({ className }: { className?: string }) => {
    return (
      <div className={"relative mt-2 " + className}>
        <div className="absolute w-screen h-px animate-glow md:block animate-fade-right bg-gradient-to-r from-zinc-800/0 via-zinc-800 to-zinc-800/0 mt-16" />
        <div className="absolute w-screen h-px animate-glow md:block animate-fade-in bg-gradient-to-r from-zinc-800/0 via-zinc-800 to-zinc-800/0 mt-16" />
      </div>
    );
  };

  const [isLoaded, setIsLoaded] = useState(false);
  const [loading, setLoading] = useState(true);
  const [imageProgress, setImageProgress] = useState(0);

  // Function to preload images
  const preloadImage = (src: string) => {
    return new Promise((resolve, reject) => {
      const img = new Image();
      img.onload = resolve;
      img.onerror = reject;
      img.src = src;
    });
  };

  useEffect(() => {
    const loadImages = async () => {
      const imagesToLoad = [
        // Tech icons
        "/icons/tech/figma.svg",
        "/icons/tech/javascript.svg",
        "/icons/tech/typescript.svg",
        "/icons/tech/react.svg",
        "/icons/tech/tailwind.svg",
        "/icons/tech/nextjs.svg",
        "/icons/tech/nodejs.svg",
        "/icons/tech/supabase.svg",
        "/icons/tech/mongodb.svg",
        "/icons/tech/postgresql.svg",
        "/icons/tech/prisma.svg",
        "/icons/tech/git.svg",
        // Game images
        "/icons/games/dmc.png",
        "/icons/games/sekiro.png",
        "/icons/games/rdr2.png",
        "/icons/games/spiderman.png",
        // Photo gallery images
        "/photos/photo1.jpeg",
        "/photos/photo2.jpeg",
        "/photos/photo3.jpeg",
        "/photos/photo4.jpeg",
        "/photos/photo5.jpeg",
        "/photos/photo6.jpeg",
        "/photos/photo7.jpeg",
        // Project screenshots
        "/screenshots/v-anime.png",
        "/screenshots/StellarConflict1.png",
        "/screenshots/FlexAPp.png",
      ];

      let loadedCount = 0;
      const updateProgress = () => {
        loadedCount++;
        setImageProgress((loadedCount / imagesToLoad.length) * 100);
      };

      try {
        await Promise.all(
          imagesToLoad.map((src) =>
            preloadImage(src).then(updateProgress).catch(updateProgress)
          )
        );
        setIsLoaded(true);
      } catch (error) {
        console.error("Error preloading images:", error);
        setIsLoaded(true);
      }
    };

    loadImages();
  }, []);

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

  const photos = [
    {
      id: 1,
      title: "Snow, sky, and quiet hills",
      image: "/photos/photo1.jpeg",
      className: "col-span-1 md:col-span-1 md:row-span-2",
    },
    {
      id: 2,
      title: "Green woods under blue sky",
      image: "/photos/photo2.jpeg",
      className: "col-span-1 md:col-span-2 md:row-span-1",
    },
    {
      id: 3,
      title: "Birds flying in blue light",
      image: "/photos/photo3.jpeg",
      className: "col-span-1 md:col-span-1 md:row-span-1",
    },
    {
      id: 4,
      title: "Sunset over calm mountains",
      image: "/photos/photo4.jpeg",
      className: "col-span-1 md:col-span-1 md:row-span-2",
    },
    {
      id: 5,
      title: "Pink clouds in soft sky",
      image: "/photos/photo5.jpeg",
      className: "col-span-1 md:col-span-2 md:row-span-1",
    },
    {
      id: 6,
      title: "Leaves under orange sky",
      image: "/photos/photo6.jpeg",
      className: "col-span-1 md:col-span-1 md:row-span-2",

    },
    {
      id: 7,
      title: "Tree in golden sunset",
      image: "/photos/photo7.jpeg",
      className: "col-span-1 md:col-span-1 md:row-span-2",
    },
  ];

  return (
    <div className="min-h-screen max-w-screen overflow-x-clip bg-black text-white">
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

      {/* Hero Section */}
      <section className="relative py-32 overflow-hidden min-h-[50vh]">
        <div className="absolute inset-0 -z-10">
          <div className="absolute inset-0 bg-gradient-to-b from-black via-zinc-950 to-black" />
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] bg-rose-900/10 rounded-full blur-[120px] opacity-50" />
        </div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: isLoaded ? 1 : 0, y: isLoaded ? 0 : 20 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="container mx-auto px-4 text-center"
        >
          <h1 className="text-6xl md:text-8xl font-bold mb-8 text-zinc-100 tracking-tight">
            About Me
          </h1>
          <p className="text-lg md:text-xl text-zinc-400 max-w-2xl mx-auto leading-relaxed text-justify md:text-center">
            I&apos;m Rahul Sahani. By day, I write code and build things that work
            like they should. By Heart, I&apos;m a gamer. I chase what sparks my
            curiosity, both on the screen and off. When I&apos;m facing off against
            a tough bug or a tough boss, I work fast and think on my feet.
            There&apos;s always something new to learn, and I&apos;m always pushing for
            the next level.
            <br />{" "}
            <span className="mt-8 block italic text-zinc-600 text-base md:text-lg">
              "Falling twice or getting stuck? Nah, I just respawn and keep
              going."
            </span>
          </p>
        </motion.div>

        <AnimatedLine />
      </section>

      {/* Technologies Section */}
      <section className="py-24 relative">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: isLoaded ? 1 : 0, y: isLoaded ? 0 : 20 }}
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
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-6 mb-24 max-w-6xl mx-auto">
            {coreStack.map((tech, index) => (
              <motion.div
                key={tech.name}
                initial={{ opacity: 0, y: 10 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
              >
                <TechCard tech={tech} />
              </motion.div>
            ))}
          </div>

          {/* Extended Toolkit */}
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ delay: 0.5 }}
            className="text-center max-w-2xl mx-auto"
          >
            <h3 className="text-xs font-mono text-zinc-600 uppercase tracking-widest mb-8">
                /// Extended Toolkit & Libraries
            </h3>
            <div className="flex flex-wrap justify-center gap-x-6 gap-y-3">
              {toolkit.map((item) => (
                <span key={item} className="text-sm text-zinc-500 hover:text-zinc-300 transition-colors cursor-default">
                  {item}
                </span>
              ))}
            </div>
          </motion.div>

        </div>

        <AnimatedLine />
      </section>

      {/* "Calibration Pause" - Transition to Hobbies */}
      <section className="min-h-[50vh] py-32 flex flex-col items-center justify-center relative">
        {/* Visual Anchor - Top */}
        <div className="w-[1px] h-24 bg-gradient-to-b from-zinc-800 to-transparent absolute top-0 left-1/2 -translate-x-1/2" />

        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 1.2 }}
          className="text-center z-10 px-4"
        >
          <p className="font-serif italic text-2xl md:text-3xl text-zinc-600 leading-relaxed max-w-2xl mx-auto">
            "Outside of the grid,<br />
            I collect <span className="text-zinc-400">fragments</span>."
          </p>

          <Link
            href="/hobbies"
            className="mt-12 inline-block text-[16px] font-mono text-zinc-600 tracking-[0.2em] hover:text-rose-500 transition-colors uppercase group"
          >
            Enter Stream <span className="inline-block transition-transform group-hover:translate-x-1">-&gt;</span>
          </Link>
        </motion.div>

        {/* Visual Anchor - Bottom */}
        <div className="w-[1px] h-24 bg-gradient-to-t from-zinc-800 to-transparent absolute bottom-0 left-1/2 -translate-x-1/2" />
      </section>

      {/* Featured Projects */}
      <section className="py-32 relative">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: isLoaded ? 1 : 0, y: isLoaded ? 0 : 20 }}
            transition={{ duration: 0.8, delay: 0.6 }}
            className="mb-24 text-center"
          >
            <h2 className="text-3xl md:text-4xl font-semibold mb-6 text-zinc-200">
              Featured Projects
            </h2>
            <p className="text-zinc-500 max-w-2xl mx-auto">
              A selection of my recent work. Each project represents a unique
              challenge and solution.
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {projects.map((project, index) => (
              <motion.div
                key={project.title}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: isLoaded ? 1 : 0, y: isLoaded ? 0 : 20 }}
                transition={{ duration: 0.8, delay: 0.6 + index * 0.1 }}
              >
                <ProjectCard project={project} />
              </motion.div>
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

      {/* <div className="fixed bottom-4 right-4">
          <Spotify />
        </div> */}

      {/* Footer */}
      <ParticleFooter />
    </div>
  );
}
