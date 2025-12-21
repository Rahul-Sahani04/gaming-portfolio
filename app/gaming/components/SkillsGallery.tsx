"use client"
import { motion, useReducedMotion } from "framer-motion"
import GameIcon from "../utils/GameIcons"
import { Brain, Palette, Shield, Heart, Zap, Target } from "lucide-react"

const SkillsGallery = () => {
    const shouldReduceMotion = useReducedMotion()

    const skillsData = [
        {
            game: "Call of Duty",
            skills: ["Teamwork", "Communication", "Adaptability", "Fast Decision-Making"],
            icon: Target,
            color: "from-green-500/20 to-emerald-500/20",
            accent: "text-green-400",
            border: "hover:border-green-500/30"
        },
        {
            game: "Minecraft",
            skills: ["Creativity", "Persistence", "Project Management", "Planning"],
            icon: Palette,
            color: "from-blue-500/20 to-cyan-500/20",
            accent: "text-blue-400",
            border: "hover:border-blue-500/30"
        },
        {
            game: "Sekiro",
            skills: ["Precision", "Resilience", "Learning from Failure", "Patience"],
            icon: Shield,
            color: "from-orange-500/20 to-red-500/20",
            accent: "text-orange-400",
            border: "hover:border-orange-500/30"
        },
        {
            game: "Elden Ring",
            skills: ["Exploration", "Resourcefulness", "Overcoming Adversity"],
            icon: Brain,
            color: "from-yellow-500/20 to-amber-500/20",
            accent: "text-yellow-400",
            border: "hover:border-yellow-500/30"
        },
        {
            game: "Marvel's Spider-Man",
            skills: ["Empathy", "Flow", "Responsibility", "Moral Choices"],
            icon: Heart,
            color: "from-red-500/20 to-rose-500/20",
            accent: "text-red-400",
            border: "hover:border-red-500/30"
        },
        {
            game: "Dying Light",
            skills: ["Adaptation", "Risk Assessment", "Resourcefulness"],
            icon: Zap,
            color: "from-purple-500/20 to-pink-500/20",
            accent: "text-purple-400",
            border: "hover:border-purple-500/30"
        },
    ]

    const container = {
        hidden: { opacity: 0 },
        show: {
            opacity: 1,
            transition: {
                staggerChildren: 0.1
            }
        }
    }

    const item = {
        hidden: { opacity: 0, y: 20 },
        show: { opacity: 1, y: 0 }
    }

    return (
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
            <motion.h2
                className="text-2xl sm:text-3xl lg:text-4xl font-bold text-white mb-8 sm:mb-12 text-center"
                initial={shouldReduceMotion ? {} : { opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6 }}
                viewport={{ once: true, margin: "-100px" }}
            >
                Skills Summary by Game
            </motion.h2>

            <motion.div
                variants={container}
                initial={shouldReduceMotion ? "show" : "hidden"}
                whileInView="show"
                viewport={{ once: true, margin: "-50px" }}
                className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6"
            >
                {skillsData.map((data, idx) => (
                    <motion.div
                        key={data.game}
                        variants={item}
                        className={`group relative overflow-hidden rounded-2xl bg-white/[0.03] border border-white/5 p-6 transition-all duration-300 ${data.border} hover:bg-white/[0.05]`}
                    >
                        {/* Gradient Blob Background */}
                        <div className={`absolute -right-10 -top-10 w-32 h-32 bg-gradient-to-br ${data.color} blur-[50px] rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-500`} />

                        <div className="relative z-10">
                            <div className="flex items-start justify-between mb-4">
                                <div className="flex items-center gap-3">
                                    <div className={`p-2 rounded-lg bg-white/5 ${data.accent} border border-white/5`}>
                                        <data.icon size={20} />
                                    </div>
                                    <h3 className="text-lg font-bold text-white group-hover:text-blue-100 transition-colors">
                                        {data.game}
                                    </h3>
                                </div>
                            </div>

                            <div className="flex flex-wrap gap-2">
                                {data.skills.map((skill) => (
                                    <span
                                        key={skill}
                                        className="px-2.5 py-1 text-xs sm:text-sm font-medium rounded-full bg-white/5 text-zinc-300 border border-white/5 group-hover:border-white/10 transition-colors"
                                    >
                                        {skill}
                                    </span>
                                ))}
                            </div>
                        </div>
                    </motion.div>
                ))}
            </motion.div>
        </div>
    )
}

export default SkillsGallery
