"use client";

import { useRef, useEffect } from "react";
import Link from "next/link";
import { ArrowLeft, ArrowRight } from "lucide-react";
import { motion } from "framer-motion";

import { BlogHeader } from "./header";
import { Mdx } from "@/app/components/mdx";
import ReadingProgressBar from "@/app/components/ReadingProgressBar";
import TableOfContents, { type TocHeading } from "@/app/components/TableOfContents";
import type { Blog } from "contentlayer/generated";

type ClientBlogPostProps = {
    post: Blog;
    prevPost?: { slug: string; title: string } | null;
    nextPost?: { slug: string; title: string } | null;
    headings: TocHeading[];
};

export default function ClientBlogPost({ post, prevPost, nextPost, headings }: ClientBlogPostProps) {
    const articleRef = useRef<HTMLDivElement>(null);

    const wordCount = (post.body?.raw ?? '').split(/\s+/).length;
    const readTime = Math.max(1, Math.round(wordCount / 200));

    useEffect(() => {
        const article = articleRef.current;
        if (!article) return;

        const els = Array.from(
            article.querySelectorAll<HTMLElement>('.mdx h2, .mdx pre, .mdx blockquote, .mdx table')
        );

        els.forEach(el => {
            el.style.opacity = '0';
            el.style.transform = 'translateY(16px)';
            el.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
        });

        const observer = new IntersectionObserver(
            entries => {
                entries.forEach(entry => {
                    if (entry.isIntersecting) {
                        const el = entry.target as HTMLElement;
                        el.style.opacity = '1';
                        el.style.transform = 'none';
                        observer.unobserve(el);
                    }
                });
            },
            { rootMargin: '-8% 0px', threshold: 0.1 }
        );

        els.forEach(el => observer.observe(el));
        return () => observer.disconnect();
    }, []);

    return (
        <div className="bg-black min-h-screen">
            <ReadingProgressBar />

            <BlogHeader post={post} readTime={readTime} />

            {/* Body */}
            <div className="max-w-7xl mx-auto px-6 lg:px-8 py-16 relative z-10">
                <div className="flex gap-16 items-start">

                    {/* Main article */}
                    <div ref={articleRef} className="flex-1 min-w-0">
                        <div className="max-w-[720px]">
                            <Mdx code={post.body.code} />

                            {/* Footer divider */}
                            <div className="mt-20 pt-8">
                                <div className="h-px bg-gradient-to-r from-white/20 via-white/8 to-transparent" />
                                <p className="mt-6 font-mono text-[10px] text-zinc-700 uppercase tracking-[0.35em] text-center">
                                    // END_OF_TRANSMISSION
                                </p>
                            </div>

                            {/* Prev / Next */}
                            {(prevPost || nextPost) && (
                                <motion.nav
                                    initial={{ opacity: 0, y: 16 }}
                                    whileInView={{ opacity: 1, y: 0 }}
                                    viewport={{ once: true }}
                                    transition={{ duration: 0.6, delay: 0.15 }}
                                    className="mt-8 grid grid-cols-2 gap-4"
                                    aria-label="Post navigation"
                                >
                                    {prevPost ? (
                                        <Link
                                            href={`/blog/${prevPost.slug}`}
                                            className="group flex flex-col gap-1.5 p-4 border border-white/[0.06] rounded-xl bg-white/[0.015] hover:border-white/15 hover:bg-white/[0.03] transition-all duration-300"
                                        >
                                            <span className="flex items-center gap-1.5 text-[10px] font-mono text-zinc-600 group-hover:text-zinc-200 uppercase tracking-widest transition-colors">
                                                <ArrowLeft className="w-3 h-3" />
                                                Previous
                                            </span>
                                            <span className="text-sm text-zinc-400 group-hover:text-zinc-200 font-medium line-clamp-2 transition-colors leading-snug">
                                                {prevPost.title}
                                            </span>
                                        </Link>
                                    ) : <div />}

                                    {nextPost ? (
                                        <Link
                                            href={`/blog/${nextPost.slug}`}
                                            className="group flex flex-col gap-1.5 p-4 border border-white/[0.06] rounded-xl bg-white/[0.015] hover:border-white/15 hover:bg-white/[0.03] transition-all duration-300 text-right"
                                        >
                                            <span className="flex items-center justify-end gap-1.5 text-[10px] font-mono text-zinc-600 group-hover:text-zinc-200 uppercase tracking-widest transition-colors">
                                                Next
                                                <ArrowRight className="w-3 h-3" />
                                            </span>
                                            <span className="text-sm text-zinc-400 group-hover:text-zinc-200 font-medium line-clamp-2 transition-colors leading-snug">
                                                {nextPost.title}
                                            </span>
                                        </Link>
                                    ) : <div />}
                                </motion.nav>
                            )}
                        </div>
                    </div>

                    {/* ToC Sidebar — only on xl+ */}
                    {headings?.length > 1 && (
                        <aside className="hidden xl:block w-52 shrink-0 self-stretch">
                            <div className="sticky top-24">
                                <TableOfContents headings={headings} />
                            </div>
                        </aside>
                    )}
                </div>
            </div>
        </div>
    );
}
