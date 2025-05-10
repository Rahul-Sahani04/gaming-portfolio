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
import {
  DraggableCardBody,
  DraggableCardContainer,
} from "../components/aceternity-ui/draggable-card";

export default function AboutPage() {
  const AnimatedLine = ({ className }: { className?: string }) => {
    return (
      <div className={"relative mt-2 " + className}>
        <div className="absolute w-screen h-px animate-glow md:block animate-fade-right bg-gradient-to-r from-zinc-300/0 via-zinc-300/50 to-zinc-300/0 mt-16" />
        <div className="absolute w-screen h-px animate-glow md:block animate-fade-in bg-gradient-to-r from-zinc-300/0 via-zinc-300/50 to-zinc-300/0 mt-16" />
      </div>
    );
  };
  
  const [isLoaded, setIsLoaded] = useState(false);
  const [loading, setLoading] = useState(true);

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
      try {
        const imagesToLoad = [
          // Tech icons
          "/icons/tech/figma.svg",
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
          "/screenshots/notesync.png",
          "/screenshots/portfolio.png",
        ];

        // Preload all images concurrently
        await Promise.all(imagesToLoad.map(preloadImage));
        
        setIsLoaded(true);
      } catch (error) {
        console.error("Error preloading images:", error);
        // Still set loading to false even if some images fail to load
        setIsLoaded(true);
        setLoading(false);
      }
    };

    loadImages();
  }, []);

  const technologies = [
    {
      category: "Design",
      items: [
        {
          name: "Figma",
          description: "Design Tool",
          icon: "/icons/tech/figma.svg",
        },
      ],
    },
    {
      category: "Frontend",
      items: [
        {
          name: "TypeScript",
          description: "JavaScript but better",
          icon: "/icons/tech/typescript.svg",
        },
        {
          name: "React",
          description: "JavaScript Library",
          icon: "/icons/tech/react.svg",
        },
        {
          name: "Tailwind",
          description: "CSS framework",
          icon: "/icons/tech/tailwind.svg",
        },
        {
          name: "NextJS",
          description: "React framework",
          icon: "/icons/tech/nextjs.svg",
        },
      ],
    },
    {
      category: "Backend",
      items: [
        {
          name: "NodeJS",
          description: "Backend",
          icon: "/icons/tech/nodejs.svg",
        },
        {
          name: "Supabase",
          description: "Backend tool",
          icon: "/icons/tech/supabase.svg",
        },
        {
          name: "MongoDB",
          description: "NoSQL database",
          icon: "/icons/tech/mongodb.svg",
        },
        {
          name: "PostgreSQL",
          description: "OR database system",
          icon: "/icons/tech/postgresql.svg",
        },
        {
          name: "Prisma",
          description: "ORM",
          icon: "/icons/tech/prisma.svg",
        },
      ],
    },
    {
      category: "Development",
      items: [
        {
          name: "Git",
          description: "Version control",
          icon: "/icons/tech/git.svg",
        },
      ],
    },
    {
      category: "Favorite Games",
      items: [
        // Best Story Games
        // {
        //   name: "God of War",
        //   description: "Action-adventure game",
        //   icon: "/icons/games/god-of-war.png",
        // },
        {
          name: "DmC: Devil May Cry",
          description: "Action-adventure hack and slash",
          icon: "/icons/games/dmc.png",
        },
        {
          name: "Sekiro: Shadows Die Twice",
          description: "Action-adventure game with RPG elements",
          icon: "/icons/games/sekiro.png",
        },
        {
          name: "Red Dead Redemption 2",
          description: "Action-adventure game",
          icon: "/icons/games/rdr2.png",
        },
        {
          name: "Marvels Spiderman",
          description: "Action-adventure game",
          icon: "/icons/games/spiderman.png",
        },
      ],
    },
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
      title: "NoteSync",
      description:
        "Real-time collaborative note-taking application with markdown support.",
      image: "/screenshots/notesync.png",
      technologies: ["TypeScript", "React", "MongoDB", "NodeJS", "Gemini AI"],
      liveUrl: "https://note-sync-rs.vercel.app/about",
      sourceUrl: "https://github.com/Rahul-Sahani04/NoteSync-AI",
    },
    {
      title: "Portfolio",
      description: "Personal portfolio website showcasing projects and skills.",
      image: "/screenshots/portfolio.png",
      technologies: ["NextJS", "Tailwind", "Framer Motion", "ThreeJS"],
      liveUrl: "https://rsahani.tech",
      sourceUrl: "https://github.com/rahul-sahani04/gaming-portfolio",
    },
  ];

  const photos = [
    {
      title: "Snow, sky, and quiet hills",
      image: "/photos/photo1.jpeg",
      className: "absolute top-10 left-[20%] rotate-[-5deg]",
    },
    {
      title: "Green woods under blue sky",
      image: "/photos/photo2.jpeg",
      className: "absolute top-40 left-[10%] rotate-[-7deg]",
    },
    {
      title: "Birds flying in blue light",
      image: "/photos/photo3.jpeg",
      className: "absolute top-5 left-[5%] rotate-[8deg]",
    },
    {
      title: "Sunset over calm mountains",
      image: "/photos/photo4.jpeg",
      className: "absolute top-32 left-[70%] rotate-[10deg]",
    },
    {
      title: "Pink clouds in soft sky",
      image: "/photos/photo5.jpeg",
      className: "absolute top-20 right-[35%] rotate-[2deg]",
    },
    {
      title: "Leaves under orange sky",
      image: "/photos/photo6.jpeg",
      className: "absolute top-24 left-[65%] rotate-[-7deg]",
    },
    {
      title: "Tree in golden sunset",
      image: "/photos/photo7.jpeg",
      className: "absolute top-48 left-[35%] rotate-[4deg]",
    },
  ];
  if (loading)
    return <LoadingScreen loading={loading} setLoading={setLoading} />;
  else {
    return (
      <div className="min-h-screen max-w-screen overflow-x-clip bg-black text-white">
        <Navigation />
        <CustomCursor />
        <NextTopLoader />

        {/* Hero Section */}
        <section className="relative py-24 md:py-32 overflow-hidden min-h-[50vh]">
          <div className="absolute inset-0 -z-10">
            <div className="absolute inset-0 bg-gradient-to-b from-black via-zinc-900/20 to-black" />
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] bg-blue-500/20 rounded-full blur-[120px]" />
          </div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: isLoaded ? 1 : 0, y: isLoaded ? 0 : 20 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="container mx-auto px-4 text-center"
          >
            <h1 className="text-6xl md:text-8xl font-bold mb-6 bg-clip-text text-transparent bg-gradient-to-r from-white to-gray-400">
              About Me
            </h1>
            <p className="text-lg md:text-xl text-zinc-400 max-w-3xl mx-auto text-justify">
              I’m Rahul Sahani — a dev by day, gamer by instinct. I blend
              curiosity with code to build smooth, responsive experiences that
              feel right. Whether I’m in a boss fight or a bug hunt, I move
              fast, think sharp, and never stop leveling up. <br />{" "}
              <p className="mt-4 text-nowrap italic text-zinc-500 text-base md:text-lg">
                Falling twice or getting stuck? Nah, I just respawn and keep
                going.
              </p>
            </p>
          </motion.div>

          <AnimatedLine />
        </section>

        {/* Technologies Section */}
        <section className="py-20 relative">
          <div className="container mx-auto px-4">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: isLoaded ? 1 : 0, y: isLoaded ? 0 : 20 }}
              transition={{ duration: 0.8, delay: 0.4 }}
              className="mb-16 text-center"
            >
              <h2 className="text-4xl md:text-5xl font-bold mb-6">
                Current Technologies
              </h2>
              <p className="text-zinc-400 max-w-3xl mx-auto">
                I&apos;m proficient in a range of modern technologies that
                empower me to build highly functional solutions. These are some
                of my main technologies.
              </p>
            </motion.div>

            <div className="space-y-12">
              {technologies.map((category, index) => (
                <motion.div
                  key={category.category}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: isLoaded ? 1 : 0, y: isLoaded ? 0 : 20 }}
                  transition={{ duration: 0.8, delay: 0.4 + index * 0.1 }}
                >
                  <h3 className="text-2xl font-semibold mb-6 text-zinc-200">
                    {category.category}
                  </h3>
                  <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
                    {category.items.map((tech) => (
                      <TechCard key={tech.name} tech={tech} />
                    ))}
                  </div>
                </motion.div>
              ))}
            </div>
          </div>

          <AnimatedLine />
        </section>

        {/* Photography Hobby Section */}
        <section className="py-20 relative">
          <div className="container mx-auto px-4">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: isLoaded ? 1 : 0, y: isLoaded ? 0 : 20 }}
              transition={{ duration: 0.8, delay: 0.6 }}
              className="mb-16 text-center"
            >
              <h2 className="text-4xl md:text-5xl font-bold mb-6">
                Photography Hobby
              </h2>
              <p className="text-zinc-400 max-w-3xl mx-auto">
                I love capturing moments through my lens. Here are some of my
                favorite shots.
              </p>
            </motion.div>

            <DraggableCardContainer className="relative flex min-h-screen w-full items-center justify-center overflow-clip">
              <p className="absolute top-1/2 mx-auto max-w-sm -translate-y-3/4 text-center text-2xl font-black text-neutral-400 md:text-4xl dark:text-neutral-800">
                "Photography is the story I fail to put into words."
              </p>
              {photos.map((pic) => (
                <DraggableCardBody className={pic.className}>
                  <img
                    src={pic.image}
                    alt={pic.title}
                    className="pointer-events-none relative z-10 h-80 w-80 object-cover"
                  />
                  <h3 className="mt-6 text-center text-xl font-bold text-neutral-700 dark:text-neutral-300 font-display">
                    {pic.title}
                  </h3>
                </DraggableCardBody>
              ))}
            </DraggableCardContainer>
          </div>

          <AnimatedLine />
        </section>

        {/* Featured Projects */}
        <section className="py-20 relative">
          <div className="container mx-auto px-4">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: isLoaded ? 1 : 0, y: isLoaded ? 0 : 20 }}
              transition={{ duration: 0.8, delay: 0.6 }}
              className="mb-16 text-center"
            >
              <h2 className="text-4xl md:text-5xl font-bold mb-6">
                Featured Projects
              </h2>
              <p className="text-zinc-400 max-w-3xl mx-auto">
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
                className="inline-flex items-center gap-2 text-blue-400 hover:text-blue-300 transition-colors"
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
  }
