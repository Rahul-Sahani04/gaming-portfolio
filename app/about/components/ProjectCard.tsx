"use client"

import Image from "next/image"
import Link from "next/link"
import { ArrowUpRight } from "lucide-react"
import { Github } from "@/components/Icons";
import { useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger, useGSAP);
}

interface ProjectCardProps {
  project: {
    title: string
    description: string
    image: string
    technologies: string[]
    liveUrl: string
    sourceUrl: string
  }
}

export default function ProjectCard({ project }: ProjectCardProps) {
  const cardRef = useRef<HTMLDivElement>(null);

  useGSAP(() => {
    // Inner image parallax
    gsap.to(".project-inner-image", {
      yPercent: 15,
      ease: "none",
      scrollTrigger: {
        trigger: cardRef.current,
        start: "top bottom",
        end: "bottom top",
        scrub: true,
      }
    });
  }, { scope: cardRef });

  return (
    <div
      ref={cardRef}
      className="group rounded-xl overflow-hidden bg-zinc-900/20 border border-zinc-800/60 hover:border-zinc-700/60 transition-colors duration-500 h-full flex flex-col shadow-sm"
    >
      <div className="relative h-56 overflow-hidden">
        <div className="project-inner-image absolute -top-[10%] -bottom-[10%] -left-0 -right-0 h-[120%] w-full">
          <Image
            src={project.image || "/placeholder.svg"}
            alt={project.title}
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
            fill
            className="object-cover transition-transform duration-700 ease-out group-hover:scale-105 opacity-80 group-hover:opacity-100"
            loading="eager"
          />
        </div>
        <div className="absolute inset-0 bg-black/40 group-hover:bg-transparent transition-colors duration-500 z-10" />
      </div>

      <div className="p-8 flex-grow flex flex-col relative z-20">
        <div className="flex justify-between items-start mb-6">
          <h3 className="text-lg font-medium text-zinc-200 group-hover:text-white transition-colors">{project.title}</h3>
          <div className="flex gap-4">
            <Link
              href={project.liveUrl}
              target="_blank"
              className="text-zinc-600 hover:text-rose-500 transition-colors"
              aria-label="Live Demo"
            >
              <ArrowUpRight size={18} />
            </Link>
            <Link
              href={project.sourceUrl}
              target="_blank"
              className="text-zinc-600 hover:text-zinc-300 transition-colors"
              aria-label="Source Code"
            >
              <Github size={18} />
            </Link>
          </div>
        </div>

        <p className="text-zinc-400 text-sm leading-8 mb-8 flex-grow max-w-sm font-light">{project.description}</p>

        <div className="pt-6 border-t border-zinc-800/50 flex flex-wrap gap-x-4 gap-y-2">
          {project.technologies.map((tech) => (
            <span
              key={tech}
              className="text-[10px] text-zinc-500 font-mono uppercase tracking-widest opacity-70 group-hover:opacity-100 transition-opacity"
            >
              {tech}
            </span>
          ))}
        </div>
      </div>
    </div>
  )
}
