"use client";

import Link from "next/link";
import React, { useEffect, useRef, useState } from "react";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { Github } from "@/components/Icons";
import { BookOpen } from "lucide-react";

type Props = {
    post: {
        title: string;
        description: string;
        date: string;
        tags?: string[];
        repository?: string;
    };
    readTime: number;
};

export const BlogHeader: React.FC<Props> = ({ post, readTime }) => {
    const headerRef = useRef<HTMLElement>(null);
    const [scrolled, setScrolled] = useState(false);

    useEffect(() => {
        const onScroll = () => setScrolled(window.scrollY > 60);
        window.addEventListener("scroll", onScroll, { passive: true });
        return () => window.removeEventListener("scroll", onScroll);
    }, []);

    useGSAP(() => {
        // Set from-states while header is still visibility:hidden — no flash
        gsap.set(".hero-tag", { y: -14, opacity: 0 });
        gsap.set(".hero-title-word", { y: "110%", opacity: 0 });
        gsap.set(".hero-divider", { scaleX: 0, transformOrigin: "left" });
        gsap.set(".hero-desc", { y: 16, opacity: 0 });
        gsap.set(".hero-meta", { y: 10, opacity: 0 });

        // Reveal container only after children are already in their from-state
        gsap.set(headerRef.current, { visibility: "visible" });

        gsap.timeline({ delay: 0.1 })
            .to(".hero-tag", {
                y: 0, opacity: 1,
                stagger: 0.06, duration: 0.4, ease: "power2.out",
            })
            .to(".hero-title-word", {
                y: "0%", opacity: 1,
                stagger: 0.04, duration: 0.65, ease: "power3.out",
            }, "-=0.15")
            .to(".hero-divider", {
                scaleX: 1, duration: 0.75, ease: "expo.inOut",
            }, "-=0.5")
            .to(".hero-desc", {
                y: 0, opacity: 1, duration: 0.6, ease: "power2.out",
            }, "-=0.45")
            .to(".hero-meta", {
                y: 0, opacity: 1, duration: 0.5, ease: "power2.out",
            }, "-=0.35");
    }, { scope: headerRef });

    const titleWords = post.title.split(" ");

    return (
        <header ref={headerRef} style={{ visibility: "hidden" }} className="relative overflow-hidden bg-black">

            {/* Subtle background texture */}
            <div className="absolute inset-0 bg-cyber-grid opacity-[0.04] pointer-events-none" />
            <div className="absolute inset-0 bg-[radial-gradient(ellipse_60%_50%_at_70%_0%,rgba(255,255,255,0.04),transparent)] pointer-events-none" />
            <div className="absolute inset-0 bg-[radial-gradient(ellipse_40%_60%_at_0%_100%,rgba(255,255,255,0.02),transparent)] pointer-events-none" />

            {/* Top accent line */}
            <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-white/15 to-transparent" />
            {/* Bottom fade */}
            <div className="absolute bottom-0 left-0 right-0 h-28 bg-gradient-to-b from-transparent to-black pointer-events-none" />
            <div className="absolute bottom-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-white/[0.08] to-transparent" />

            {/* Fixed top bar */}
            <div className={`fixed inset-x-0 top-0 transition-all duration-300 backdrop-blur-2xl z-[999] ${
                scrolled
                    ? "bg-black/90 backdrop-blur-md border-b border-white/[0.06]"
                    : "bg-transparent border-transparent"
            }`}>
                <div className="max-w-7xl mx-auto px-6 lg:px-8 flex items-center justify-between h-14">
                    <Link
                        href="/blog"
                        className="flex items-center gap-2 text-[11px] font-mono uppercase tracking-[0.2em] text-zinc-500 hover:text-zinc-200 transition-colors duration-200"
                    >
                        <span className="text-base leading-none">←</span>
                        <span className="hidden sm:inline">Back to Blogs</span>
                    </Link>
                    {post.repository && (
                        <Link
                            target="_blank"
                            href={`https://github.com/${post.repository}`}
                            className="text-zinc-500 hover:text-zinc-200 transition-colors duration-200"
                            aria-label="View on GitHub"
                        >
                            <Github className="w-5 h-5" />
                        </Link>
                    )}
                </div>
            </div>

            {/* Hero content */}
            <div className="max-w-7xl mx-auto px-6 lg:px-8 pt-28 pb-20 md:pt-36 md:pb-28 z-0">

                {/* Tags */}
                {post.tags && post.tags.length > 0 && (
                    <div className="flex flex-wrap items-center gap-2 mb-8">
                        {post.tags.map((tag) => (
                            <span
                                key={tag}
                                className="hero-tag text-[11px] font-mono text-zinc-500 bg-white/[0.04] border border-white/[0.08] px-3 py-1 rounded-full uppercase tracking-wider"
                            >
                                {tag}
                            </span>
                        ))}
                    </div>
                )}

                {/* Title — per-word reveal */}
                <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-[4.5rem] font-display font-bold uppercase tracking-tight leading-[1.05] text-white max-w-4xl">
                    {titleWords.map((word, i) => (
                        <span key={i} className="overflow-hidden inline-block mr-[0.22em] mb-1">
                            <span className="hero-title-word inline-block">{word}</span>
                        </span>
                    ))}
                </h1>

                {/* Divider */}
                <div className="hero-divider mt-10 h-px max-w-2xl bg-gradient-to-r from-white/30 via-white/10 to-transparent origin-left" />

                {/* Description */}
                <p className="hero-desc mt-8 text-base md:text-lg text-zinc-400 leading-relaxed max-w-2xl font-light">
                    {post.description}
                </p>

                {/* Meta */}
                <div className="hero-meta mt-8 flex flex-wrap items-center gap-5 text-[11px] font-mono text-zinc-500 uppercase tracking-widest">
                    <time dateTime={new Date(post.date).toISOString()}>
                        {new Date(post.date).toLocaleDateString("en-US", {
                            year: "numeric",
                            month: "long",
                            day: "numeric",
                        })}
                    </time>
                    <span className="w-1 h-1 rounded-full bg-zinc-700" aria-hidden />
                    <span className="flex items-center gap-1.5">
                        <BookOpen className="w-3 h-3 text-zinc-600" />
                        {readTime} min read
                    </span>
                </div>
            </div>
        </header>
    );
};
