"use client"

import { motion } from "framer-motion"
import Image from "next/image"
import { useState } from "react"

interface TechCardProps {
  tech: {
    name: string
    description: string
    icon: string
  }
}

export default function TechCard({ tech }: TechCardProps) {
  const [isHovered, setIsHovered] = useState(false)

  return (
    <motion.div
      className="relative py-6 px-2 rounded-xl backdrop-blur-sm border border-zinc-800 bg-zinc-900/30 overflow-hidden group"
      whileHover={{ y: -5, transition: { duration: 0.2 } }}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <div className="absolute inset-0 bg-gradient-to-br from-blue-500/5 to-purple-500/5 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />

      <div className="relative z-10 flex flex-col items-center text-center">
        <div className="w-8 h-8 mb-4 relative">
          <Image
            src={tech.icon || "/placeholder.svg"}
            alt={tech.name}
            width={48}
            height={48}
            className="object-contain shadow-md transition-transform duration-300 group-hover:scale-125"
          />
        </div>
        <h3 className="text-base font-semibold mb-1 text-white">{tech.name}</h3>
        <p className="text-xs text-zinc-400">{tech.description}</p>
      </div>

      {/* <motion.div
        className="absolute bottom-0 left-0 right-0 h-1 bg-gradient-to-r from-blue-500 to-purple-500"
        initial={{ scaleX: 0 }}
        animate={{ scaleX: isHovered ? 1 : 0 }}
        transition={{ duration: 0.3 }}
        style={{ transformOrigin: "left" }}
      /> */}
    </motion.div>
  );
}
