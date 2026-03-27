import { Metadata } from "next";
import { Navigation } from "../components/nav";
import CustomCursor from "../components/CustomCursor";
import { allBlogs } from "contentlayer/generated";
import Link from "next/link";
import { Calendar, Tag, FileText } from "lucide-react";
import { Card } from "../components/card";
import NextTopLoader from "nextjs-toploader";

export const metadata: Metadata = {
    title: "Blog | Rahul Sahani",
    description: "Read my latest thoughts on web development, design, and more.",
};

export default function BlogPage() {
    const posts = allBlogs
        .filter((p) => p.published)
        .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());

    return (
        <div className="relative pb-16 min-h-screen bg-cyber-dark bg-cyber-grid bg-fixed">
            {/* Scanline overlay */}
            <div className="pointer-events-none fixed inset-0 z-50 h-full w-full bg-cyber-scanline opacity-20 mix-blend-overlay" />

            <Navigation />
            <CustomCursor />
            <NextTopLoader color="#00f0ff" />

            <div className="px-6 mx-auto max-w-7xl lg:px-8 pt-24 md:pt-32 pb-16 relative z-10 flex flex-col gap-16">
                {/* HUD Header */}
                <div className="max-w-3xl mx-auto lg:mx-0">
                    <h1 className="text-5xl tracking-[-0.05em] text-white sm:text-7xl font-display uppercase text-edge-outline animate-fade-in drop-shadow-[0_0_15px_rgba(0,240,255,0.5)]">
                        [ARCHIVE: <span className="text-cyber-cyan">BLOG</span>]
                    </h1>
                    <div className="mt-8 flex flex-col gap-2">
                        <div className="h-px w-full bg-gradient-to-r from-cyber-cyan via-cyber-pink to-transparent opacity-50" />
                        <p className="mt-4 text-zinc-400 font-mono text-sm leading-relaxed uppercase tracking-[0.2em] border-l-2 border-cyber-pink pl-6">
                            // SYS.LOG: Thoughts on building things — tools, apps, and lessons learned.<br />
                            // Entries archived in reverse chronological order.
                        </p>
                    </div>
                </div>

                {/* Post list */}
                {posts.length === 0 ? (
                    <div className="flex items-center gap-3 font-mono text-zinc-500 text-sm">
                        <FileText className="w-4 h-4 text-cyber-cyan" />
                        <span>// NO_RECORDS_FOUND — check back soon.</span>
                    </div>
                ) : (
                    <div className="grid grid-cols-1 gap-6 md:grid-cols-2 xl:grid-cols-3">
                        {posts.map((post, index) => (
                            <div key={post.slug} className="relative group">
                                {/* Corner accents */}
                                <div className="absolute -top-2 -left-2 w-4 h-4 border-t-2 border-l-2 border-cyber-cyan z-20 transition-all group-hover:-top-3 group-hover:-left-3 group-hover:border-cyber-pink duration-300 pointer-events-none" />
                                <div className="absolute -bottom-2 -right-2 w-4 h-4 border-b-2 border-r-2 border-cyber-cyan z-20 transition-all group-hover:-bottom-3 group-hover:-right-3 group-hover:border-cyber-pink duration-300 pointer-events-none" />

                                <Card>
                                    <Link href={`/blog/${post.slug}`}>
                                        <article className="p-6 md:p-8 relative w-full h-full flex flex-col justify-between group-hover:bg-cyber-dark/30 transition duration-500 min-h-[260px]">
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
                                                        {post.tags.map((tag) => (
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
                            </div>
                        ))}
                    </div>
                )}
            </div>
        </div>
    );
}
