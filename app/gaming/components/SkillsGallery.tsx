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
        },
        {
            game: "Minecraft",
            skills: ["Creativity", "Persistence", "Project Management", "Planning"],
            icon: Palette,
        },
        {
            game: "Sekiro",
            skills: ["Precision", "Resilience", "Learning from Failure", "Patience"],
            icon: Shield,
        },
        {
            game: "Elden Ring",
            skills: ["Exploration", "Resourcefulness", "Overcoming Adversity"],
            icon: Brain,
        },
        {
            game: "Marvel's Spider-Man",
            skills: ["Empathy", "Flow", "Responsibility", "Moral Choices"],
            icon: Heart,
        },
        {
            game: "Dying Light",
            skills: ["Adaptation", "Risk Assessment", "Resourcefulness"],
            icon: Zap,
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
            <motion.div
                variants={container}
                initial={shouldReduceMotion ? "show" : "hidden"}
                whileInView="show"
                viewport={{ once: true, margin: "-50px" }}
                className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8"
            >
                {skillsData.map((data, idx) => (
                    <motion.div
                        key={data.game}
                        variants={item}
                        className={`group relative overflow-hidden bg-black/40 border border-zinc-900 hover:border-zinc-700 p-6 transition-all duration-300`}
                    >
                        <div className="relative z-10">
                            <div className="flex items-start justify-between mb-6">
                                <div className="flex items-center gap-3">
                                    <div className={`p-2 bg-black border border-zinc-800 text-zinc-500 group-hover:text-white transition-colors`}>
                                        <data.icon size={18} strokeWidth={1.5} />
                                    </div>
                                    <h3 className="text-sm font-medium tracking-widest uppercase text-zinc-400 group-hover:text-white transition-colors">
                                        {data.game}
                                    </h3>
                                </div>
                            </div>

                            <div className="flex flex-wrap gap-2">
                                {data.skills.map((skill) => (
                                    <span
                                        key={skill}
                                        className="px-2 py-1 text-[10px] uppercase tracking-wider font-medium text-zinc-600 bg-zinc-900/50 border border-zinc-800/50 group-hover:border-zinc-700 group-hover:text-zinc-300 transition-colors"
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
