"use client";

import { ArrowLeft, Github, Calendar, Tag } from "lucide-react";
import Link from "next/link";
import React, { useEffect, useRef, useState } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import Hero3D from "../../components/Hero3D";

type Props = {
    post: {
        title: string;
        description: string;
        date: string;
        tags?: string[];
        repository?: string;
        hero3d?: string;
    };
};

export const BlogHeader: React.FC<Props> = ({ post }) => {
    const ref = useRef<HTMLElement>(null);
    const [isIntersecting, setIntersecting] = useState(true);
    
    // Parallax scroll effects
    const { scrollYProgress } = useScroll({
        target: ref,
        offset: ["start start", "end start"]
    });
    const yValue = useTransform(scrollYProgress, [0, 1], [0, 100]);
    const opacityValue = useTransform(scrollYProgress, [0, 0.8], [1, 0]);

    useEffect(() => {
        if (!ref.current) return;
        const observer = new IntersectionObserver(([entry]) =>
            setIntersecting(entry.isIntersecting),
        );
        observer.observe(ref.current);
        return () => observer.disconnect();
    }, []);

    return (
        <header
            ref={ref}
            className="relative isolate overflow-hidden bg-cyber-dark"
        >
            <motion.div style={{ y: yValue, opacity: opacityValue }} className="absolute inset-0 z-0">
                {/* Embedded 3D Hero Element with variants */}
                <Hero3D variant={post.hero3d} className="w-full h-full opacity-60 mix-blend-screen" />
            </motion.div>

            {/* Cyber grid background on the header */}
            <div className="absolute inset-0 bg-cyber-grid opacity-20 pointer-events-none" />
            
            {/* Scanline overlay */}
            <div className="absolute inset-0 bg-cyber-scanline opacity-10 mix-blend-overlay pointer-events-none" />
            
            {/* Neon gradient accent at bottom */}
            <div className="absolute bottom-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-cyber-cyan to-transparent opacity-60" />

            {/* Sticky nav bar */}
            <div
                className={`fixed inset-x-0 top-0 z-50 backdrop-blur duration-200 border-b ${
                    isIntersecting
                        ? "bg-cyber-dark/0 border-transparent"
                        : "bg-cyber-dark/80 border-cyber-cyan/30 shadow-[0_4px_30px_rgba(0,240,255,0.1)]"
                }`}
            >
                <div className="container flex flex-row-reverse items-center justify-between p-6 mx-auto">
                    <div className="flex justify-between gap-6">
                        {post.repository && (
                            <Link
                                target="_blank"
                                href={`https://github.com/${post.repository}`}
                                aria-label="View on GitHub"
                                className={`duration-200 ${
                                    isIntersecting
                                        ? "text-zinc-400 hover:text-cyber-cyan"
                                        : "text-zinc-500 hover:text-cyber-cyan"
                                }`}
                            >
                                <Github className="w-5 h-5" />
                            </Link>
                        )}
                    </div>

                    <Link
                        href="/blog"
                        className={`duration-200 flex items-center gap-2 font-mono text-xs uppercase tracking-widest ${
                            isIntersecting
                                ? "text-white hover:text-cyber-cyan drop-shadow-[0_0_8px_rgba(255,255,255,0.5)]"
                                : "text-zinc-400 hover:text-cyber-cyan"
                        }`}
                    >
                        <ArrowLeft className="w-4 h-4" />
                        <span className="hidden sm:inline">[BACK TO ARCHIVE]</span>
                    </Link>
                </div>
            </div>

            {/* Hero content */}
            <div className="container mx-auto relative z-10 py-32 sm:py-40 px-6 lg:px-8">
                <motion.div 
                    initial={{ opacity: 0, y: 30 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 1, delay: 0.2 }}
                    className="mx-auto max-w-3xl text-center flex flex-col items-center backdrop-blur-sm bg-black/20 p-8 rounded border border-white/5"
                >
                    {/* Tags */}
                    {post.tags && post.tags.length > 0 && (
                        <div className="flex flex-wrap justify-center gap-2 mb-8">
                            <Tag className="w-3 h-3 text-cyber-pink self-center shrink-0" />
                            {post.tags.map((tag) => (
                                <span
                                    key={tag}
                                    className="text-[10px] font-mono text-cyber-pink bg-cyber-pink/10 border border-cyber-pink/30 px-3 py-1 chamfered-sm uppercase tracking-widest"
                                >
                                    {tag}
                                </span>
                            ))}
                        </div>
                    )}

                    {/* Title */}
                    <h1 className="text-3xl font-bold tracking-tight text-white sm:text-5xl font-display uppercase drop-shadow-[0_0_15px_rgba(0,240,255,0.5)] text-edge-outline">
                        {post.title}
                    </h1>

                    {/* Divider */}
                    <div className="mt-8 w-full max-w-xl h-px bg-gradient-to-r from-transparent via-cyber-cyan to-transparent opacity-80" />

                    {/* Description */}
                    <p className="mt-8 text-base leading-relaxed text-zinc-300 max-w-2xl border-l-2 border-cyber-cyan/50 pl-4 text-left">
                        {post.description}
                    </p>

                    {/* Date */}
                    <div className="mt-6 flex items-center gap-2 text-xs text-zinc-400 font-mono tracking-widest bg-cyber-cyan/10 border border-cyber-cyan/20 px-4 py-2 chamfered-sm shadow-[0_0_10px_rgba(0,240,255,0.1)]">
                        <Calendar className="w-3.5 h-3.5 text-cyber-cyan" />
                        <time dateTime={new Date(post.date).toISOString()} className="text-cyber-cyan drop-shadow-[0_0_8px_rgba(0,240,255,0.8)]">
                            SYS.DATE ::&nbsp;
                        </time>
                        <span className="text-zinc-200">
                            {new Date(post.date).toLocaleDateString("en-US", {
                                year: "numeric",
                                month: "long",
                                day: "numeric",
                            })}
                        </span>
                    </div>
                </motion.div>
            </div>
        </header>
    );
};
