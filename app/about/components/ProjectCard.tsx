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
      className="rounded-xl overflow-hidden bg-zinc-900/30 border border-zinc-800 h-full flex flex-col"
      whileHover={{ y: -5, transition: { duration: 0.2 } }}
    >
      <div className="relative h-48 overflow-hidden">
        <Image
          src={project.image || "/placeholder.svg"}
          alt={project.title}
          fill
          className="object-cover transition-transform duration-500 hover:scale-110"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent" />
      </div>

      <div className="p-6 flex-grow flex flex-col">
        <h3 className="text-xl font-bold mb-2">{project.title}</h3>
        <p className="text-zinc-400 text-sm mb-4 flex-grow">{project.description}</p>

        <div className="mb-4 flex flex-wrap gap-2">
          {project.technologies.map((tech) => (
            <span
              key={tech}
              className="px-2 py-1 text-xs rounded-full bg-blue-900/30 text-blue-300 border border-blue-800/50"
            >
              {tech}
            </span>
          ))}
        </div>

        <div className="flex gap-3">
          <Link
            href={project.liveUrl}
            target="_blank"
            className="flex items-center gap-1 text-sm text-zinc-300 hover:text-white transition-colors"
          >
            <ArrowUpRight size={14} /> Live Demo
          </Link>
          <Link
            href={project.sourceUrl}
            target="_blank"
            className="flex items-center gap-1 text-sm text-zinc-300 hover:text-white transition-colors"
          >
            <Github size={14} /> Source
          </Link>
        </div>
      </div>
    </motion.div>
  )
}
