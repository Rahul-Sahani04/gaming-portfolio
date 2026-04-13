"use client";

import { BlogHeader } from "./header";
import { Mdx } from "@/app/components/mdx";
import type { Blog } from "contentlayer/generated";
import { motion } from "framer-motion";

type ClientBlogPostProps = {
    post: Blog;
};

export default function ClientBlogPost({ post }: ClientBlogPostProps) {
    return (
        <div className="bg-cyber-dark min-h-screen relative">
            {/* Scanline overlay */}
            <div className="pointer-events-none fixed inset-0 z-50 h-full w-full bg-cyber-scanline opacity-10 mix-blend-overlay" />

            <BlogHeader post={post} />

            {/* MDX body — dark-themed prose */}
            <div className="relative z-10">
                <motion.article
                    initial={{ opacity: 0, y: 50 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true, margin: "-100px" }}
                    transition={{ duration: 0.8, delay: 0.2 }}
                    className="px-6 py-16 mx-auto max-w-3xl prose prose-invert prose-quoteless
                    prose-headings:font-display prose-headings:uppercase prose-headings:tracking-tight
                    prose-headings:text-white
                    prose-h1:drop-shadow-[0_0_8px_rgba(0,240,255,0.4)]
                    prose-h2:border-b prose-h2:border-cyber-cyan/20 prose-h2:pb-2
                    prose-h2:text-cyber-cyan
                    prose-a:text-cyber-cyan prose-a:no-underline hover:prose-a:underline
                    prose-strong:text-zinc-100
                    prose-code:text-cyber-cyan prose-code:bg-cyber-gray/50 prose-code:rounded prose-code:border prose-code:border-cyber-cyan/20
                    prose-pre:bg-cyber-gray prose-pre:border prose-pre:border-cyber-cyan/20
                    prose-blockquote:border-l-cyber-cyan prose-blockquote:text-zinc-300
                    prose-th:text-cyber-cyan prose-th:border-cyber-cyan/30
                    prose-td:border-zinc-700
                    prose-hr:border-cyber-cyan/20
                    prose-li:text-zinc-300
                    prose-p:text-zinc-300
                ">
                    <Mdx code={post.body.code} />
                </motion.article>

                {/* Bottom divider */}
                <motion.div
                    initial={{ opacity: 0 }}
                    whileInView={{ opacity: 1 }}
                    viewport={{ once: true }}
                    transition={{ duration: 1, delay: 0.5 }}
                    className="max-w-3xl mx-auto px-6 pb-16"
                >
                    <div className="h-px bg-gradient-to-r from-transparent via-cyber-cyan to-transparent opacity-30" />
                    <p className="mt-6 font-mono text-xs text-zinc-600 uppercase tracking-widest text-center">
                        // END_OF_TRANSMISSION
                    </p>
                </motion.div>
            </div>
        </div>
    );
}
