"use client"

import type React from "react"

import { useRef, useState, useEffect, useCallback } from "react"
import { motion, AnimatePresence, useReducedMotion } from "framer-motion"
import { useInView } from "react-intersection-observer"
import { ChevronDown, ChevronRight } from "lucide-react"
import { skills } from "../utils/Skills"
import SkillDetailPanel from "./SkillDetailPanel"

const SkillTree = () => {
  const treeRef = useRef<HTMLDivElement>(null)
  const nodeRefs = useRef<Record<string, HTMLDivElement | null>>({})
  const [lines, setLines] = useState<{ from: string; to: string; x1: number; y1: number; x2: number; y2: number }[]>([])
  const [selectedSkill, setSelectedSkill] = useState<string | null>(null)
  const [inViewRef, inView] = useInView({
    triggerOnce: true,
    rootMargin: "-50px",
    threshold: 0.1,
  })

  // Separate observer for visibility-based closing
  const [visibilityRef, isVisible] = useInView({
    triggerOnce: false,
    rootMargin: "-20px",
    threshold: 0.3,
  })

  const [isMobile, setIsMobile] = useState(false)
  const shouldReduceMotion = useReducedMotion()

  // Mobile-specific state for expandable branches
  const [expandedBranches, setExpandedBranches] = useState<Set<string>>(new Set())

  // Detect mobile device
  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768)
    }

    checkMobile()
    window.addEventListener("resize", checkMobile)
    return () => window.removeEventListener("resize", checkMobile)
  }, [])

  // Close skill panel when skill tree is not visible
  useEffect(() => {
    if (!isVisible && selectedSkill) {
      setSelectedSkill(null)
    }
  }, [isVisible, selectedSkill])

  // Toggle branch expansion (mobile only)
 // Toggle branch expansion (only one active at a time)
const toggleBranch = useCallback(
  (branchId: string) => {
    if (!isMobile) return;

    setExpandedBranches((prev) => {
      const newSet = new Set<string>();

      if (!prev.has(branchId)) {
        // Collapse all others and expand only the current one
        newSet.add(branchId);
      }

      return newSet;
    });
  },
  [isMobile],
);

  // Check if a skill should be visible on mobile
  const isSkillVisibleOnMobile = useCallback(
    (skill: any) => {
      // Always show center node and branch roots
      if (skill.id === "me" || skill.isBranchRoot) return true

      // For child nodes, check if their branch is expanded
      if (skill.parent) {
        // Find the root branch for this skill
        let currentParent = skill.parent
        let rootBranch = currentParent

        // Traverse up to find the root branch
        while (currentParent) {
          const parentSkill = skills.find((s) => s.id === currentParent)
          if (parentSkill?.isBranchRoot) {
            rootBranch = currentParent
            break
          }
          currentParent = parentSkill?.parent
        }

        return expandedBranches.has(rootBranch)
      }

      return true
    },
    [expandedBranches],
  )

  // Get visible skills for mobile
  const getVisibleSkills = useCallback(() => {
    if (!isMobile) return skills

    return skills.filter(isSkillVisibleOnMobile)
  }, [isMobile, isSkillVisibleOnMobile])

  // Optimized line calculation with debouncing
  const measure = useCallback(() => {
    if (!treeRef.current) return

    const newLines: any[] = []
    const parentRect = treeRef.current.getBoundingClientRect()
    const visibleSkills = getVisibleSkills()

    visibleSkills.forEach((s) => {
      s.connections.forEach((toId) => {
        // Only draw lines to visible nodes
        const targetSkill = skills.find((skill) => skill.id === toId)
        if (!targetSkill || (isMobile && !isSkillVisibleOnMobile(targetSkill))) return

        const a = nodeRefs.current[s.id]
        const b = nodeRefs.current[toId]
        if (a && b) {
          const ra = a.getBoundingClientRect()
          const rb = b.getBoundingClientRect()

          newLines.push({
            from: s.id,
            to: toId,
            x1: ra.left + ra.width / 2 - parentRect.left,
            y1: ra.top + ra.height / 2 - parentRect.top,
            x2: rb.left + rb.width / 2 - parentRect.left,
            y2: rb.top + rb.height / 2 - parentRect.top,
          })
        }
      })
    })
    setLines(newLines)
  }, [getVisibleSkills, isMobile, isSkillVisibleOnMobile])

  // Debounced resize handler
  useEffect(() => {
    let timeoutId: NodeJS.Timeout

    const debouncedMeasure = () => {
      clearTimeout(timeoutId)
      timeoutId = setTimeout(measure, 100)
    }

    // Initial measure
    const initialTimeout = setTimeout(measure, 500)

    window.addEventListener("resize", debouncedMeasure)
    return () => {
      window.removeEventListener("resize", debouncedMeasure)
      clearTimeout(timeoutId)
      clearTimeout(initialTimeout)
    }
  }, [measure])

  // Re-measure when branches expand/collapse
  useEffect(() => {
    const timeout = setTimeout(measure, 300) // Allow time for animations
    return () => clearTimeout(timeout)
  }, [expandedBranches, measure])

  // Handle keyboard navigation
  const handleKeyDown = (e: React.KeyboardEvent, skillId: string) => {
    if (e.key === "Enter" || e.key === " ") {
      e.preventDefault()
      const skill = skills.find((s) => s.id === skillId)

      // On mobile, if it's a branch root, toggle expansion
      if (isMobile && skill?.isBranchRoot) {
        toggleBranch(skillId)
      } else {
        setSelectedSkill(selectedSkill === skillId ? null : skillId)
      }
    }
    if (e.key === "Escape") {
      setSelectedSkill(null)
    }
  }

  // Handle node click
  const handleNodeClick = (skillId: string) => {
    const skill = skills.find((s) => s.id === skillId)

    // On mobile, if it's a branch root, toggle expansion
    if (isMobile && skill?.isBranchRoot) {
      toggleBranch(skillId)
    } else {
      setSelectedSkill(selectedSkill === skillId ? null : skillId)
    }
  }

  const visibleSkills = getVisibleSkills()

  return (
    <div className="relative">
      {/* Title */}
      <motion.h2
        initial={shouldReduceMotion ? {} : { opacity: 0, y: 20 }}
        animate={inView ? { opacity: 1, y: 0 } : {}}
        transition={{ duration: 0.6 }}
        className="text-xl sm:text-2xl lg:text-3xl font-bold mb-4 sm:mb-6 lg:mb-8 z-50 text-center text-white"
      >
        Interactive Skill Tree
      </motion.h2>

      {/* Instructions for mobile */}
      {isMobile && (
        <motion.p
          initial={shouldReduceMotion ? {} : { opacity: 0 }}
          animate={inView ? { opacity: 1 } : {}}
          transition={{ delay: 0.3 }}
          className="text-center text-zinc-500 text-sm mb-6 px-4"
        >
          Tap on skill categories to expand • Tap individual skills to learn
          more
        </motion.p>
      )}

      {/* Main Skill Tree Container */}
      <div
        ref={(el) => {
          (treeRef as React.MutableRefObject<HTMLDivElement | null>).current =
            el;
          inViewRef(el);
          visibilityRef(el);
        }}
        className={`relative ${
          isMobile
            ? "min-h-[800px] sm:min-h-[900px]"
            : "min-h-[400px] sm:min-h-[500px] lg:min-h-[600px]"
        } p-4 sm:p-6 lg:p-10 mb-32 sm:mb-40 lg:mb-52 mt-16 sm:mt-20 lg:mt-28 overflow-visible`}
      >
        {/* SVG for connection lines */}
        <svg className="absolute inset-0 w-full h-full pointer-events-none">
          {lines.map((l, i) => (
            <motion.line
              key={`${l.from}-${l.to}`}
              x1={l.x1}
              y1={l.y1}
              x2={l.x2}
              y2={l.y2}
              stroke="#27272a"
              strokeWidth={isMobile ? 1.5 : 2}
              initial={
                shouldReduceMotion
                  ? { opacity: 1 }
                  : { pathLength: 0, opacity: 0 }
              }
              animate={inView ? { pathLength: 1, opacity: 1 } : {}}
              transition={{ duration: 1, delay: 0.3 + i * 0.05 }}
            />
          ))}
        </svg>

        {/* Skill Nodes */}
        <div className="absolute inset-0">
          <AnimatePresence mode="sync">
            {visibleSkills.map((skill, idx) => {
              const isSelected = selectedSkill === skill.id;
              const isCenterNode = skill.id === "me";
              const isBranchRoot = skill.isBranchRoot;
              const isExpanded = expandedBranches.has(skill.id);

              // Use mobile position if available and on mobile device
              const position =
                isMobile && skill.mobilePosition
                  ? skill.mobilePosition
                  : skill.position;

              return (
                <motion.div
                  key={skill.id}
                  ref={(el) => {
                    nodeRefs.current[skill.id] = el;
                  }}
                  initial={shouldReduceMotion ? {} : { opacity: 0, scale: 0.8 }}
                  animate={inView ? { opacity: 1, scale: 1 } : {}}
                  exit={shouldReduceMotion ? {} : { opacity: 0, scale: 0.8 }}
                  transition={{
                    duration: 0.5,
                    delay: idx * 0.08 + 0.2,
                    type: "spring",
                    stiffness: 100,
                    damping: 15,
                  }}
                  style={{
                    position: "absolute",
                    left: `${position.x}%`,
                    top: `${position.y}%`,
                    transform: "translate(-50%, -50%)",
                    zIndex: isSelected ? 20 : isCenterNode ? 15 : 10,
                  }}
                  className="group cursor-pointer focus:outline-none touch-manipulation"
                  onClick={() => handleNodeClick(skill.id)}
                  tabIndex={0}
                  aria-label={`${skill.name} - Level ${skill.level}/10. ${skill.description}`}
                  onKeyDown={(e) => handleKeyDown(e, skill.id)}
                  whileHover={shouldReduceMotion ? {} : { scale: 1.1 }}
                  whileTap={{ scale: 0.95 }}
                >
                  <div className="relative">
                    {/* Node circle */}
                    <motion.div
                      className={`relative ${
                        isMobile
                          ? "w-14 h-14"
                          : "w-12 h-12 sm:w-14 sm:h-14 lg:w-16 lg:h-16"
                      } ${
                        isCenterNode
                          ? "bg-gradient-to-br from-blue-600 to-purple-600 border-2 border-blue-400"
                          : isBranchRoot
                          ? "bg-gradient-to-br from-emerald-600 to-teal-600 border-2 border-emerald-400"
                          : "bg-neutral-900 border border-neutral-700"
                      } ${
                        isSelected
                          ? "border-blue-400 bg-blue-900/20"
                          : "group-hover:border-neutral-500"
                      } rounded-full flex items-center justify-center shadow-lg transition-all duration-300`}
                      animate={
                        isSelected
                          ? {
                              boxShadow: "0 0 20px rgba(59, 130, 246, 0.5)",
                            }
                          : {}
                      }
                    >
                      <skill.icon
                        className={`${
                          isMobile
                            ? "w-6 h-6"
                            : "w-5 h-5 sm:w-6 sm:h-6 lg:w-7 lg:h-7"
                        } ${
                          isCenterNode || isBranchRoot
                            ? "text-white"
                            : "text-neutral-400 group-hover:text-white"
                        } ${
                          isSelected ? "text-blue-300" : ""
                        } transition-all duration-300`}
                      />
                    </motion.div>

                    {/* Expand/Collapse indicator for branch roots on mobile */}
                    {isMobile && isBranchRoot && (
                      <motion.div
                        className="absolute -top-1 -right-1 w-6 h-6 bg-emerald-500 rounded-full flex items-center justify-center shadow-lg"
                        whileTap={{ scale: 0.9 }}
                      >
                        {isExpanded ? (
                          <ChevronDown className="w-3 h-3 text-white" />
                        ) : (
                          <ChevronRight className="w-3 h-3 text-white" />
                        )}
                      </motion.div>
                    )}

                    {/* Level indicator */}
                    <div
                      className={`absolute ${
                        isMobile ? "-bottom-3" : "-bottom-2 sm:-bottom-3"
                      } left-1/2 transform -translate-x-1/2 px-2 py-0.5 rounded-full ${
                        isMobile ? "text-xs" : "text-xs"
                      } bg-neutral-900 ${
                        isSelected
                          ? "text-blue-300 border-blue-500"
                          : "text-neutral-400 border-neutral-700"
                      } border font-mono shadow-sm transition-all duration-300`}
                    >
                      {skill.level}/10
                    </div>

                    {/* Skill name */}
                    <div
                      className={`absolute ${
                        isMobile ? "-bottom-9" : "-bottom-6 sm:-bottom-8"
                      } left-1/2 transform -translate-x-1/2 whitespace-nowrap select-none ${
                        isMobile ? "max-w-24" : "max-w-20 sm:max-w-none"
                      }`}
                    >
                      <span
                        className={`text-white ${
                          isMobile
                            ? "text-xs leading-tight"
                            : "text-xs sm:text-sm"
                        } font-medium tracking-wide ${
                          isSelected ? "text-blue-300" : ""
                        } ${
                          isBranchRoot ? "text-emerald-300" : ""
                        } transition-colors duration-300 ${
                          isMobile ? "text-center block" : ""
                        }`}
                      >
                        {skill.name}
                      </span>
                    </div>
                  </div>
                </motion.div>
              );
            })}
          </AnimatePresence>
        </div>
      </div>

      {/* Detail Panel */}
      <AnimatePresence mode="wait">
        {selectedSkill && isVisible && (
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
}

export default SkillTree
