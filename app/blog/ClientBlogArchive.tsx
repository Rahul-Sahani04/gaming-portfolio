"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { Calendar, Tag, FileText } from "lucide-react";
import { Card } from "../components/card";
import { Navigation } from "../components/nav";
import CustomCursor from "../components/CustomCursor";
import NextTopLoader from "nextjs-toploader";
import ThreeCanvas from "../components/ThreeCanvas";

export default function ClientBlogArchive({ posts }: { posts: any[] }) {
    const container = {
        hidden: { opacity: 0 },
        show: {
            opacity: 1,
            transition: { staggerChildren: 0.1 }
        }
    };

    const item = {
        hidden: { opacity: 0, y: 20 },
        show: { opacity: 1, y: 0, transition: { type: "spring" as const, stiffness: 100 } }
    };

    return (
        <div className="relative pb-16 min-h-screen bg-cyber-dark bg-cyber-grid bg-fixed overflow-hidden">
            {/* 3D background */}
            <ThreeCanvas />

            {/* Scanline overlay */}
            <div className="pointer-events-none fixed inset-0 z-40 h-full w-full bg-cyber-scanline opacity-20 mix-blend-overlay" />

            <Navigation />
            <CustomCursor />
            <NextTopLoader color="#00f0ff" />

            <div className="px-6 mx-auto max-w-7xl lg:px-8 pt-24 md:pt-32 pb-16 relative z-10 flex flex-col gap-16">
                {/* HUD Header */}
                <motion.div 
                    initial={{ opacity: 0, x: -50 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.8, ease: "easeOut" }}
                    className="max-w-3xl mx-auto lg:mx-0"
                >
                    <h1 className="text-5xl tracking-[-0.05em] text-white sm:text-7xl font-display uppercase text-edge-outline drop-shadow-[0_0_15px_rgba(0,240,255,0.5)] flex items-center gap-4">
                        [ARCHIVE: 
                        <motion.span 
                            animate={{ opacity: [1, 0.5, 1, 1, 0.8, 1] }} 
                            transition={{ duration: 2, repeat: Infinity, repeatDelay: 3 }}
                            className="text-cyber-cyan glitch-effect"
                        >
                            BLOG
                        </motion.span>]
                    </h1>
                    <div className="mt-8 flex flex-col gap-2">
                        <motion.div 
                            initial={{ scaleX: 0 }} 
                            animate={{ scaleX: 1 }} 
                            transition={{ duration: 1, delay: 0.2 }}
                            className="origin-left h-px w-full bg-gradient-to-r from-cyber-cyan via-cyber-pink to-transparent opacity-50" 
                        />
                        <p className="mt-4 text-zinc-400 font-mono text-sm leading-relaxed uppercase tracking-[0.2em] border-l-2 border-cyber-pink pl-6">
                            // SYS.LOG: Thoughts on building things — tools, apps, and lessons learned.<br />
                            // Entries archived in reverse chronological order.
                        </p>
                    </div>
                </motion.div>

                {/* Post list */}
                {posts.length === 0 ? (
                    <div className="flex items-center gap-3 font-mono text-zinc-500 text-sm">
                        <FileText className="w-4 h-4 text-cyber-cyan" />
                        <span>// NO_RECORDS_FOUND — check back soon.</span>
                    </div>
                ) : (
                    <motion.div 
                        variants={container}
                        initial="hidden"
                        animate="show"
                        className="grid grid-cols-1 gap-6 md:grid-cols-2 xl:grid-cols-3"
                    >
                        {posts.map((post, index) => (
                            <motion.div key={post.slug} variants={item} className="relative group perspective">
                                <motion.div 
                                    whileHover={{ scale: 1.02, rotateX: 2, rotateY: -2 }}
                                    transition={{ type: "spring", stiffness: 300 }}
                                    className="h-full"
                                >
                                    {/* Corner accents */}
                                    <div className="absolute -top-2 -left-2 w-4 h-4 border-t-2 border-l-2 border-cyber-cyan z-20 transition-all group-hover:-top-3 group-hover:-left-3 group-hover:border-cyber-pink duration-300 pointer-events-none" />
                                    <div className="absolute -bottom-2 -right-2 w-4 h-4 border-b-2 border-r-2 border-cyber-cyan z-20 transition-all group-hover:-bottom-3 group-hover:-right-3 group-hover:border-cyber-pink duration-300 pointer-events-none" />

                                    <Card>
                                        <Link href={`/blog/${post.slug}`}>
                                            <article className="p-6 md:p-8 relative w-full h-full flex flex-col justify-between group-hover:bg-cyber-dark/30 transition duration-500 min-h-[260px] bg-black/40 backdrop-blur-sm border border-white/5">
                                                {/* Neon left border accent */}
                                                <div className="absolute left-0 top-0 bottom-0 w-[2px] bg-cyber-cyan/0 group-hover:bg-cyber-cyan transition-all duration-300 shadow-[0_0_10px_rgba(0,240,255,0)] group-hover:shadow-[0_0_10px_rgba(0,240,255,0.8)]" />

                                                <div>
                                                    {/* Date + entry ID */}
                                                    <div className="flex items-center justify-between gap-2 mb-6">
                                                        <span className="text-xs text-cyber-cyan font-mono tracking-widest bg-cyber-cyan/10 px-2 py-1 chamfered-sm border border-cyber-cyan/30">
                                                            <time dateTime={new Date(post.date).toISOString()}>
                                                                LOG:{new Date(post.date).getFullYear()}/{String(new Date(post.date).getMonth() + 1).padStart(2, "0")}
                                                            </time>
                                                        </span>
                                                        <span className="text-xs font-mono text-zinc-600">
                                                            ENTRY_{String(index + 1).padStart(3, "0")}
                                                        </span>
                                                    </div>

                                                    {/* Title */}
                                                    <h2 className="z-20 text-xl font-bold duration-500 lg:text-2xl text-zinc-100 group-hover:text-cyber-cyan font-display uppercase tracking-tight leading-snug">
                                                        {post.title}
                                                    </h2>

                                                    {/* Description */}
                                                    <p className="z-20 mt-4 text-sm duration-500 text-zinc-300 group-hover:text-white font-light line-clamp-3 leading-relaxed">
                                                        {post.description}
                                                    </p>
                                                </div>

                                                {/* Tags + CTA */}
                                                <div className="mt-8 pt-4 border-t border-cyber-gray/50 flex flex-col gap-3">
                                                    {post.tags && post.tags.length > 0 && (
                                                        <div className="flex flex-wrap items-center gap-2">
                                                            <Tag className="w-3 h-3 text-cyber-pink shrink-0" />
                                                            {post.tags.map((tag: string) => (
                                                                <span
                                                                    key={tag}
                                                                    className="text-[10px] font-mono text-cyber-pink bg-cyber-pink/10 border border-cyber-pink/30 px-2 py-0.5 chamfered-sm uppercase tracking-wider"
                                                                >
                                                                    {tag}
                                                                </span>
                                                            ))}
                                                        </div>
                                                    )}
                                                    <div className="flex justify-end">
                                                        <span className="text-xs font-mono text-zinc-500 group-hover:text-cyber-cyan transition-colors uppercase tracking-widest flex items-center gap-1">
                                                            [READ LOG] <span aria-hidden="true" className="group-hover:translate-x-1 transition-transform">&rarr;</span>
                                                        </span>
                                                    </div>
                                                </div>
                                            </article>
                                        </Link>
                                    </Card>
                                </motion.div>
                            </motion.div>
                        ))}
                    </motion.div>
                )}
            </div>
        </div>
    );
}
