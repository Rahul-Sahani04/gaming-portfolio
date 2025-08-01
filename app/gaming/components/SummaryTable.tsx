"use client"
import { motion, useReducedMotion } from "framer-motion"
import GameIcon from "../utils/GameIcons"
import { Brain, Palette, Shield, Heart, Zap, Target } from "lucide-react"

const EnhancedTable = () => {
  const shouldReduceMotion = useReducedMotion()

  const tableData = [
    {
      game: "Call of Duty",
      lessons: "Teamwork, communication, adaptability, fast decision-making",
      icon: Target,
    },
    {
      game: "Minecraft",
      lessons: "Creativity, persistence, project management, planning",
      icon: Palette,
    },
    {
      game: "Sekiro",
      lessons: "Precision, resilience, learning from failure, patience",
      icon: Shield,
    },
    {
      game: "Elden Ring",
      lessons: "Exploration, resourcefulness, overcoming adversity",
      icon: Brain,
    },
    {
      game: "Marvel's Spider-Man",
      lessons: "Empathy, flow, responsibility, moral choices",
      icon: Heart,
    },
    {
      game: "Dying Light",
      lessons: "Adaptation, risk assessment, resourcefulness",
      icon: Zap,
    },
  ]

  return (
    <div className="max-w-6xl mx-auto px-4 sm:px-6">
      <motion.h2
        className="text-xl sm:text-2xl lg:text-3xl font-bold text-white mb-6 sm:mb-8 text-center"
        initial={shouldReduceMotion ? {} : { opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        viewport={{ once: true, margin: "-100px" }}
      >
        Skills Summary by Game
      </motion.h2>

      <motion.div
        initial={shouldReduceMotion ? {} : { opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.7, delay: 0.2 }}
        viewport={{ once: true, margin: "-100px" }}
        className="backdrop-blur-xl bg-white/[0.04] border border-neutral-700 rounded-xl sm:rounded-2xl overflow-hidden shadow-2xl"
      >
        {/* Mobile-first responsive table */}
        <div className="overflow-x-auto">
          <table className="w-full min-w-[500px]">
            <thead>
              <tr className="border-b border-neutral-700 bg-neutral-800/30">
                <th className="px-3 sm:px-4 lg:px-6 py-3 sm:py-4 text-left text-white font-semibold text-sm sm:text-base">
                  Game
                </th>
                <th className="px-3 sm:px-4 lg:px-6 py-3 sm:py-4 text-left text-white font-semibold text-sm sm:text-base">
                  Key Skills Developed
                </th>
              </tr>
            </thead>
            <tbody>
              {tableData.map((item, idx) => (
                <motion.tr
                  key={item.game}
                  initial={shouldReduceMotion ? {} : { opacity: 0, x: -20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.5, delay: idx * 0.1 }}
                  viewport={{ once: true }}
                  className="group border-b border-neutral-800 transition-all duration-300 hover:bg-white/[0.03] hover:border-neutral-600"
                >
                  <td className="px-3 sm:px-4 lg:px-6 py-3 sm:py-4">
                    <div className="flex items-center gap-2 sm:gap-3">
                      <div className="flex items-center gap-2 flex-shrink-0">
                        <item.icon className="w-4 h-4 sm:w-5 sm:h-5 text-neutral-400 group-hover:text-neutral-300 transition-colors" />
                        <GameIcon game={item.game} />
                      </div>
                      <span className="text-white font-medium text-sm sm:text-base group-hover:text-blue-100 transition-colors">
                        {item.game}
                      </span>
                    </div>
                  </td>
                  <td className="px-3 sm:px-4 lg:px-6 py-3 sm:py-4 text-neutral-400 group-hover:text-neutral-300 transition-colors text-sm sm:text-base leading-relaxed">
                    {item.lessons}
                  </td>
                </motion.tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Mobile scroll indicator */}
        <div className="sm:hidden p-3 text-center border-t border-neutral-800">
          <p className="text-xs text-neutral-500">← Scroll horizontally to see more →</p>
        </div>
      </motion.div>
    </div>
  )
}

export default EnhancedTable
