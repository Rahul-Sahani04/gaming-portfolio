"use client"

import type React from "react"

import { useRef, useEffect, useCallback } from "react"
import { motion, AnimatePresence, useReducedMotion } from "framer-motion"
import { skills } from "../utils/Skills"
import { X } from "lucide-react"

type SkillDetailPanelProps = {
  selectedSkill: string | null
  setSelectedSkill: React.Dispatch<React.SetStateAction<string | null>>
  inView?: boolean
  treeRef?: React.RefObject<HTMLDivElement>
}

const SkillDetailPanel = ({ selectedSkill, setSelectedSkill }: SkillDetailPanelProps) => {
  const panelRef = useRef<HTMLDivElement>(null)
  const shouldReduceMotion = useReducedMotion()
  const autoCloseTimeoutRef = useRef<NodeJS.Timeout>()

  const skill = skills.find((sk) => sk.id === selectedSkill)

  // Auto-close after 8 seconds on mobile, 12 seconds on desktop
  useEffect(() => {
    if (!selectedSkill) return

    const isMobile = window.innerWidth < 768
    const autoCloseDelay = isMobile ? 8000 : 12000

    autoCloseTimeoutRef.current = setTimeout(() => {
      setSelectedSkill(null)
    }, autoCloseDelay)

    return () => {
      if (autoCloseTimeoutRef.current) {
        clearTimeout(autoCloseTimeoutRef.current)
      }
    }
  }, [selectedSkill, setSelectedSkill])

  // Handle escape key
  useEffect(() => {
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        setSelectedSkill(null)
      }
    }

    document.addEventListener("keydown", handleEscape)
    return () => document.removeEventListener("keydown", handleEscape)
  }, [setSelectedSkill])

  // Focus management
  useEffect(() => {
    if (selectedSkill && panelRef.current) {
      panelRef.current.focus()
    }
  }, [selectedSkill])

  // Reset auto-close timer on user interaction
  const resetAutoCloseTimer = useCallback(() => {
    if (autoCloseTimeoutRef.current) {
      clearTimeout(autoCloseTimeoutRef.current)
    }

    const isMobile = window.innerWidth < 768
    const autoCloseDelay = isMobile ? 8000 : 12000

    autoCloseTimeoutRef.current = setTimeout(() => {
      setSelectedSkill(null);
    }, autoCloseDelay);
  }, [setSelectedSkill])

  if (!skill) return null

  return (
    <AnimatePresence mode="wait">
      <motion.div
        ref={panelRef}
        key={skill.id}
        initial={shouldReduceMotion ? {} : { opacity: 0, y: 20, scale: 0.98 }}
        animate={{ opacity: 1, y: 0, scale: 1 }}
        exit={shouldReduceMotion ? {} : { opacity: 0, y: 20, scale: 0.98 }}
        transition={{
          duration: 0.4,
          type: "spring",
          stiffness: 100,
          damping: 18,
        }}
        className="fixed bottom-6 left-6 right-6 sm:bottom-10 sm:left-auto sm:right-10 sm:w-96 z-50 mx-auto sm:mx-0"
        tabIndex={-1}
        role="dialog"
        aria-labelledby="skill-title"
        aria-describedby="skill-description"
        onMouseEnter={resetAutoCloseTimer}
        onTouchStart={resetAutoCloseTimer}
      >
        <div className="relative p-6 rounded-2xl bg-zinc-950/95 border border-zinc-800 shadow-[0_20px_60px_-15px_rgba(0,0,0,0.8)] backdrop-blur-xl overflow-hidden group">

          {/* Subtle Glow Background */}
          <div className="absolute top-0 right-0 p-12 bg-white/5 blur-[60px] rounded-full pointer-events-none -translate-y-1/2 translate-x-1/2" />


          {/* Auto-close progress indicator - Minimalist Line */}
          <motion.div
            className="absolute top-0 left-0 h-[2px] bg-zinc-600 shadow-[0_0_10px_rgba(255,255,255,0.2)]"
            initial={{ width: "100%" }}
            animate={{ width: "0%" }}
            transition={{
              duration: window.innerWidth < 768 ? 8 : 12,
              ease: "linear",
            }}
          />

          <div className="relative flex flex-col gap-4">

            {/* Header Area */}
            <div className="flex items-start justify-between gap-4">
              <div className="flex items-center gap-3">
                {/* Icon */}
                <div className="w-10 h-10 rounded-md bg-zinc-900 border border-zinc-800 flex items-center justify-center text-white shadow-inner">
                  <skill.icon className="w-5 h-5" strokeWidth={1.5} />
                </div>

                {/* Title */}
                <div>
                  <h3 id="skill-title" className="text-white font-medium tracking-wide text-lg leading-none font-display uppercase">
                    {skill.name}
                  </h3>
                </div>
              </div>

              {/* Close Button */}
              <button
                onClick={() => setSelectedSkill(null)}
                className="text-zinc-500 hover:text-white transition-colors p-1 rounded-full hover:bg-zinc-800"
                aria-label="Close skill details"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Content */}
            <div className="space-y-4">
              <p id="skill-description" className="text-zinc-400 text-sm leading-relaxed">
                {skill.description}
              </p>

              {/* Skill Level & Dots */}
              <div className="space-y-2 pt-2">
                <div className="flex justify-between text-[10px] uppercase tracking-wider font-medium text-zinc-500">
                  <span>Proficiency</span>
                  <span>{skill.level} / 10</span>
                </div>

                <div className="flex gap-1 h-1">
                  {[...Array(10)].map((_, idx) => (
                    <motion.div
                      key={idx}
                      className={`flex-1 rounded-full transition-all duration-500 ${idx < skill.level
                          ? "bg-white shadow-[0_0_8px_rgba(255,255,255,0.3)]"
                          : "bg-zinc-800"
                        }`}
                      initial={{ opacity: 0, scaleX: 0 }}
                      animate={{ opacity: 1, scaleX: 1 }}
                      transition={{ delay: idx * 0.03, duration: 0.3 }}
                    />
                  ))}
                </div>
              </div>

              {/* Additional info for center node */}
              {skill.id === "me" && (
                <div className="pt-3 border-t border-zinc-900">
                  <p className="text-xs text-zinc-500 italic">
                    Core nexus of all derived capabilities.
                  </p>
                </div>
              )}
            </div>

          </div>
        </div>
      </motion.div>
    </AnimatePresence>
  )
}

export default SkillDetailPanel
