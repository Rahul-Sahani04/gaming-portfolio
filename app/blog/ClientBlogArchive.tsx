"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { Calendar, Tag, FileText } from "lucide-react";
import { Card } from "../components/card";
import { Navigation } from "../components/nav";
import CustomCursor from "../components/CustomCursor";
import NextTopLoader from "nextjs-toploader";
import ThreeCanvas from "../components/ThreeCanvas";
import { BlurText } from "../components/BlurText";

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
        <div className="relative pb-16 min-h-screen bg-black bg-gradient-to-bl from-black via-zinc-950 to-black overflow-hidden">
            {/* 3D background */}
            <ThreeCanvas />

            <Navigation />
            <CustomCursor />
            <NextTopLoader color="#00f0ff" />

            <div className="px-6 mx-auto max-w-7xl lg:px-8 pt-24 md:pt-32 pb-16 relative z-10 flex flex-col gap-16">
                {/* Header */}
                <motion.div
                    initial={{ opacity: 0, x: -50 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.8, ease: "easeOut" }}
                    className="max-w-3xl mx-auto lg:mx-0"
                >
                    <BlurText text="Blog Archive" className="text-5xl text-white sm:text-7xl font-display tracking-tight text-edge-outline drop-shadow-[0_0_15px_rgba(255,255,255,0.2)] flex items-center gap-4" delay={2} />
                    <div className="mt-8 flex flex-col gap-2">
                        <motion.div
                            initial={{ scaleX: 0 }}
                            animate={{ scaleX: 1 }}
                            transition={{ duration: 1, delay: 0.2 }}
                            className="origin-left h-px w-full bg-gradient-to-r from-zinc-800 via-zinc-400 to-transparent opacity-50"
                        />
                        <p className="mt-4 text-zinc-400 text-sm font-light leading-relaxed tracking-wider border-l-2 border-zinc-700 pl-6">
                            Thoughts on building things — tools, apps, and lessons learned.<br />
                            Entries archived in reverse chronological order.
                        </p>
                    </div>
                </motion.div>

                {/* Post list */}
                {posts.length === 0 ? (
                    <div className="flex items-center gap-3 font-mono text-zinc-500 text-sm">
                        <FileText className="w-4 h-4 text-zinc-500" />
                        <span>No records found — check back soon.</span>
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
                                    <Card>
                                        <Link href={`/blog/${post.slug}`}>
                                            <article className="p-6 md:p-8 relative w-full h-full flex flex-col justify-between text-left transition-all duration-500 min-h-[260px] rounded-lg">

                                                <div>
                                                    <div className="flex items-center justify-between gap-2 mb-6 relative z-20">
                                                        <span className="text-xs text-zinc-400 font-mono tracking-widest uppercase">
                                                            <time dateTime={new Date(post.date).toISOString()}>
                                                                {new Date(post.date).getFullYear()}/{String(new Date(post.date).getMonth() + 1).padStart(2, "0")}
                                                            </time>
                                                        </span>
                                                        <span className="text-xs font-mono text-zinc-600">
                                                            ENTRY_{String(index + 1).padStart(3, "0")}
                                                        </span>
                                                    </div>

                                                    <h2 className="z-20 text-xl font-bold duration-500 lg:text-2xl text-zinc-100 group-hover:text-zinc-300 font-display tracking-tight leading-snug relative">
                                                        {post.title}
                                                    </h2>

                                                    <p className="z-20 mt-4 text-sm duration-500 text-zinc-400 group-hover:text-zinc-200 font-light line-clamp-3 leading-relaxed relative">
                                                        {post.description}
                                                    </p>
                                                </div>

                                                <div className="mt-8 pt-4 border-t border-white/10 flex flex-col gap-3 relative z-20">
                                                    {post.tags && post.tags.length > 0 && (
                                                        <div className="flex flex-wrap items-center gap-2">
                                                            <Tag className="w-3 h-3 text-zinc-500 shrink-0" />
                                                            {post.tags.map((tag: string) => (
                                                                <span
                                                                    key={tag}
                                                                    className="text-[10px] font-mono text-zinc-400 bg-white/5 border border-white/10 px-2 py-0.5 rounded uppercase tracking-wider"
                                                                >
                                                                    {tag}
                                                                </span>
                                                            ))}
                                                        </div>
                                                    )}
                                                    <div className="flex justify-end">
                                                        <span className="text-xs font-light text-zinc-500 group-hover:text-zinc-300 transition-colors uppercase tracking-widest flex items-center gap-1">
                                                            Read Post <span aria-hidden="true" className="group-hover:translate-x-1 transition-transform">&rarr;</span>
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
