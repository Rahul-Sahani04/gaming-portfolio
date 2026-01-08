"use client"

import { motion } from "framer-motion"
import Image from "next/image"
import Link from "next/link"
import { ArrowUpRight, Github } from "lucide-react"

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
  return (
    <motion.div
      className="group rounded-xl overflow-hidden bg-zinc-900/20 border border-zinc-800/60 hover:border-zinc-700/60 transition-colors duration-500 h-full flex flex-col shadow-sm"
      whileHover={{ y: -2, transition: { duration: 0.3 } }}
    >
      <div className="relative h-56 overflow-hidden">
        <Image
          src={project.image || "/placeholder.svg"}
          alt={project.title}
          fill
          className="object-cover transition-transform duration-700 ease-out group-hover:scale-105 opacity-80 group-hover:opacity-100"
        />
        <div className="absolute inset-0 bg-black/40 group-hover:bg-transparent transition-colors duration-500" />
      </div>

      <div className="p-8 flex-grow flex flex-col">
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
    </motion.div>
  )
}
