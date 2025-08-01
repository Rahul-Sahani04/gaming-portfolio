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
        initial={shouldReduceMotion ? {} : { opacity: 0, y: 30, scale: 0.95 }}
        animate={{ opacity: 1, y: 0, scale: 1 }}
        exit={shouldReduceMotion ? {} : { opacity: 0, y: 40, scale: 0.95 }}
        transition={{
          duration: 0.3,
          type: "spring",
          stiffness: 120,
          damping: 20,
        }}
        className="fixed bottom-4 left-4 right-4 sm:bottom-6 sm:left-6 sm:right-6 z-50 max-w-2xl mx-auto"
        tabIndex={-1}
        role="dialog"
        aria-labelledby="skill-title"
        aria-describedby="skill-description"
        onMouseEnter={resetAutoCloseTimer}
        onTouchStart={resetAutoCloseTimer}
      >
        <div className="p-4 sm:p-5 lg:p-6 rounded-xl sm:rounded-2xl bg-neutral-900/95 border border-neutral-700 shadow-2xl backdrop-blur-lg">
          {/* Auto-close progress indicator */}
          <motion.div
            className="absolute top-0 left-0 h-1 bg-gradient-to-r from-[#0f0c29] via-[#302b63] to-[#24243e] rounded-t-xl shadow-inner"

            initial={{ width: "100%" }}
            animate={{ width: "0%" }}
            transition={{
              duration: window.innerWidth < 768 ? 8 : 12,
              ease: "linear",
            }}
          />

          <div className="flex gap-3 sm:gap-4 items-start">
            {/* Skill icon */}
            <div className="w-10 h-10 sm:w-12 sm:h-12 lg:w-14 lg:w-14 rounded-lg flex items-center justify-center bg-gradient-to-br from-neutral-800 to-neutral-700 border border-neutral-600 flex-shrink-0 shadow-inner">
              <skill.icon className="w-5 h-5 sm:w-6 sm:h-6 lg:w-7 lg:h-7 text-white" />
            </div>

            <div className="flex-1 min-w-0">
              {/* Header with close button */}
              <div className="flex items-start justify-between gap-2 mb-2 sm:mb-3">
                <h3 id="skill-title" className="text-white font-semibold text-base sm:text-lg lg:text-xl leading-tight">
                  {skill.name}
                </h3>
                <button
                  onClick={() => setSelectedSkill(null)}
                  className="text-neutral-400 hover:text-white transition-colors p-1 -m-1 flex-shrink-0 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
                  aria-label="Close skill details"
                >
                  <X className="w-4 h-4 sm:w-5 sm:h-5" />
                </button>
              </div>

              {/* Description */}
              <p id="skill-description" className="text-neutral-300 text-sm sm:text-base leading-relaxed mb-3 sm:mb-4">
                {skill.description}
              </p>

              {/* Skill level indicator */}
              <div className="flex flex-col sm:flex-row sm:items-center gap-2 sm:gap-3">
                <span className="text-xs sm:text-sm text-neutral-500 flex-shrink-0 font-medium">Skill Level:</span>
                <div className="flex items-center gap-2">
                  <div className="flex gap-1">
                    {[...Array(10)].map((_, idx) => (
                      <motion.div
                        key={idx}
                        initial={shouldReduceMotion ? {} : { scale: 0 }}
                        animate={{ scale: 1 }}
                        transition={{ delay: idx * 0.05 }}
                        className={`w-2 h-2 sm:w-2.5 sm:h-2.5 rounded-full transition-all duration-300 ${
                          idx < skill.level
                            ? "bg-gradient-to-r from-blue-400 to-purple-400 shadow-sm"
                            : "bg-neutral-700"
                        }`}
                      />
                    ))}
                  </div>
                  <span className="text-xs sm:text-sm text-neutral-400 font-mono">{skill.level}/10</span>
                </div>
              </div>

              {/* Auto-close hint */}
              <div className="mt-3 sm:mt-4 pt-3 sm:pt-4 border-t border-neutral-700">
                <p className="text-xs text-neutral-500 italic">
                  Auto-closes in {window.innerWidth < 768 ? "8" : "12"} seconds • Tap to keep open
                </p>
              </div>

              {/* Additional info for center node */}
              {skill.id === "me" && (
                <div className="mt-3 sm:mt-4 pt-3 sm:pt-4 border-t border-neutral-700">
                  <p className="text-xs sm:text-sm text-neutral-400 italic">
                    This represents the core of all gaming-derived skills, connecting cognitive abilities, social
                    skills, resilience, and focus.
                  </p>
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Mobile swipe indicator */}
        <div className="sm:hidden mt-2 flex justify-center">
          <div className="w-8 h-1 bg-neutral-600 rounded-full" />
        </div>
      </motion.div>
    </AnimatePresence>
  )
}

export default SkillDetailPanel
