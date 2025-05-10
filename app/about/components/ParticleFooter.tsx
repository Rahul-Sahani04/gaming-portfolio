"use client"

import { useEffect, useRef, useState } from "react"
import { motion } from "framer-motion"
import Link from "next/link"
import { Github, Linkedin, Mail, Twitter } from "lucide-react"
import { Meteors } from "@/app/components/magicui/meteors"

export default function ParticleFooter() {
  const [isLoaded, setIsLoaded] = useState(false)

  useEffect(() => {
    setIsLoaded(true)
  }, [])

  return (
    <footer className="relative py-20 overflow-hidden">
      <div className="absolute inset-0 w-full z-10">
        <Meteors
          number={50}
          minDuration={8}
          maxDuration={12}
          minDelay={0.2}
          maxDelay={1.2}
          angle={215}
          
        />
      </div>

      <div className="relative container mx-auto px-4 z-20">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: isLoaded ? 1 : 0, y: isLoaded ? 0 : 20 }}
          transition={{ duration: 0.8 }}
          className="text-center mb-12"
        >
          <h2 className="text-3xl md:text-4xl font-bold mb-6">Let&apos;s Connect</h2>
          <p className="text-zinc-400 max-w-xl mx-auto">
            Feel free to reach out for collaborations or just a friendly chat.
          </p>
        </motion.div>

       <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: isLoaded ? 1 : 0, y: isLoaded ? 0 : 20 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="relative flex justify-center gap-6 mb-12 z-50" 
        >
          <Link
            href="https://github.com/rahul-sahani04"
            target="_blank"
            className="w-12 h-12 flex items-center justify-center rounded-full bg-zinc-800 hover:bg-zinc-700 transition-colors"
          >
            <Github size={20} />
          </Link>
          <Link
            href="https://twitter.com/PoetOfHerAlgos"
            target="_blank"
            className="w-12 h-12 flex items-center justify-center rounded-full bg-zinc-800 hover:bg-zinc-700 transition-colors"
          >
            <Twitter size={20} />
          </Link>
          <Link
            href="https://linkedin.in/in/rahul1sahani"
            target="_blank"
            className="w-12 h-12 flex items-center justify-center rounded-full bg-zinc-800 hover:bg-zinc-700 transition-colors"
          >
            <Linkedin size={20} />
          </Link>
          <Link
            href="mailto:me.rsahani@gmail.com"
            className="w-12 h-12 flex items-center justify-center rounded-full bg-zinc-800 hover:bg-zinc-700 transition-colors"
          >
            <Mail size={20} />
          </Link>
        </motion.div>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: isLoaded ? 1 : 0 }}
          transition={{ duration: 0.8, delay: 0.4 }}
          className="text-center text-zinc-500 text-sm"
        >
          <p>© {new Date().getFullYear()} Rahul Sahani. All rights reserved.</p>
        </motion.div>
      </div>
    </footer>
  )
}
