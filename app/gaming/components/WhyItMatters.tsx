"use client"
import { motion, useInView, useReducedMotion } from "framer-motion"
import { useRef } from "react"
import { ArrowUpRight, Sparkles, Terminal } from "lucide-react"

const WhyItMatters = () => {
    const sectionRef = useRef<HTMLDivElement>(null)
    const isInView = useInView(sectionRef, { once: true, margin: "-100px" })
    const shouldReduceMotion = useReducedMotion()

    const points = [
        {
            icon: ArrowUpRight,
            title: "SYSTEM.SKILL_TRANSFER",
            subtitle: "Transferable Skills",
            description: "Gaming abilities translate directly to real-world problem-solving, leadership, and collaborative success.",
            id: "01",
            color: "text-blue-400",
            border: "border-blue-500/30",
            bg: "bg-blue-500/5"
        },
        {
            icon: Sparkles,
            title: "SYSTEM.MINDSET_GROWTH",
            subtitle: "Growth Mindset",
            description: "Overcoming digital challenges builds resilience and comfort with uncertainty, failure, and continuous learning.",
            id: "02",
            color: "text-emerald-400",
            border: "border-emerald-500/30",
            bg: "bg-emerald-500/5"
        },
    ]

    return (
        <section ref={sectionRef} className="max-w-5xl mx-auto px-4 sm:px-6 relative py-16 lg:py-24">
            <div className="relative">
                {/* Section Header */}
                <motion.div
                    initial={shouldReduceMotion ? {} : { opacity: 0, y: 30 }}
                    animate={isInView ? { opacity: 1, y: 0 } : {}}
                    transition={{ duration: 0.8 }}
                    className="text-center mb-16"
                >
                    <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-zinc-800 bg-black/50 backdrop-blur-sm text-xs text-zinc-500 font-mono mb-6">
                        <span className="w-1.5 h-1.5 rounded-full bg-blue-500 animate-pulse" />
                        SYSTEM_LOG_FINAL_ENTRY
                    </div>
                    <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-white mb-4 tracking-tight font-display">
                        Why These Lessons <span className="text-transparent bg-clip-text bg-gradient-to-r from-zinc-600 to-zinc-400
                        ">Matter</span>
                    </h2>
                    <p className="text-zinc-500 text-sm sm:text-base max-w-lg mx-auto">
                        Decoding the impact of virtual experiences on reality.
                    </p>
                </motion.div>

                {/* HUD Grid */}
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 lg:gap-8 mb-12">
                    {points.map((point, index) => (
                        <motion.div
                            key={point.title}
                            initial={shouldReduceMotion ? {} : { opacity: 0, x: index === 0 ? -30 : 30 }}
                            animate={isInView ? { opacity: 1, x: 0 } : {}}
                            transition={{ delay: 0.2 + (index * 0.2), duration: 0.6 }}
                            className={`group relative overflow-hidden`}
                        >
                            <div className={`absolute inset-0 border ${point.border} opacity-50 bg-black/40 backdrop-blur-sm`} />
                            {/* Corner Accents */}
                            <div className={`absolute top-0 left-0 w-2 h-2 border-t border-l ${point.border}`} />
                            <div className={`absolute top-0 right-0 w-2 h-2 border-t border-r ${point.border}`} />
                            <div className={`absolute bottom-0 left-0 w-2 h-2 border-b border-l ${point.border}`} />
                            <div className={`absolute bottom-0 right-0 w-2 h-2 border-b border-r ${point.border}`} />

                            <div className={`relative p-8 h-full flex flex-col ${point.bg} transition-colors duration-500 group-hover:bg-opacity-20`}>
                                <div className="flex items-center justify-between mb-6">
                                    <div className="flex items-center gap-3">
                                        <point.icon className={`w-5 h-5 ${point.color}`} />
                                        <span className={`text-xs font-mono tracking-widest ${point.color}`}>{point.title}</span>
                                    </div>
                                    <span className="text-xs font-mono text-zinc-600">ID_::{point.id}</span>
                                </div>

                                <h3 className="text-xl font-bold text-white mb-4 group-hover:text-blue-200 transition-colors">
                                    {point.subtitle}
                                </h3>

                                <p className="text-zinc-400 leading-relaxed text-sm sm:text-base">
                                    {point.description}
                                </p>

                                {/* Scanline effect */}
                                <div className="absolute inset-0 pointer-events-none opacity-[0.03] bg-[linear-gradient(transparent_50%,rgba(0,0,0,1)_50%)] bg-[length:100%_4px]" />
                            </div>
                        </motion.div>
                    ))}
                </div>

                {/* Terminal Quote */}
                <motion.div
                    initial={shouldReduceMotion ? {} : { opacity: 0, y: 20 }}
                    animate={isInView ? { opacity: 1, y: 0 } : {}}
                    transition={{ delay: 0.6, duration: 0.8 }}
                    className="relative max-w-3xl mx-auto"
                >
                    <div className="border border-zinc-800 bg-black/60 backdrop-blur-xl rounded-lg overflow-hidden">
                        {/* Fake Terminal Header */}
                        <div className="flex items-center gap-2 px-4 py-2 border-b border-zinc-800 bg-zinc-900/50">
                            <Terminal size={12} className="text-zinc-500" />
                            <span className="text-[10px] uppercase tracking-widest text-zinc-500 font-mono">user@portfolio:~/gaming/reflections</span>
                        </div>

                        <div className="p-6 font-mono text-sm sm:text-base leading-relaxed text-zinc-300">
                            <p>
                                <span className="text-green-500 mr-2">➜</span>
                                <span className="text-blue-400">cat</span> summary.txt
                            </p>
                            <p className="mt-4 text-zinc-400 italic">
                                "This page celebrates the games that have shaped my approach to challenges, creativity, and collaboration—lessons that continue to influence my work and personal growth."
                            </p>

                            {/* Hidden Hint */}
                            <div className="mt-6 opacity-30 text-xs border-t border-zinc-800 pt-4 text-zinc-600 select-none">
                                <span className="text-zinc-700"># TODO: remove secret code logic</span><br />
                                <span className="text-zinc-700"># sequence: </span>
                                <span className="font-bold">↑ ↑ ↓ ↓ ← → ← → B A</span>
                            </div>

                            <motion.span
                                animate={{ opacity: [0, 1] }}
                                transition={{ repeat: Infinity, duration: 0.8 }}
                                className="inline-block w-2 h-4 bg-green-500 mt-2 align-middle ml-1"
                            />
                        </div>
                    </div>
                </motion.div>
            </div>
        </section>
    )
}

export default WhyItMatters
