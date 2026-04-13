"use client";

import { motion, useInView } from "framer-motion";
import Link from "next/link";
import { Tag, FileText, ArrowUpRight, BookOpen } from "lucide-react";
import { Card } from "../components/card";
import { Navigation } from "../components/nav";
import CustomCursor from "../components/CustomCursor";
import NextTopLoader from "nextjs-toploader";
import ThreeCanvas from "../components/ThreeCanvas";
import { BlurText } from "../components/BlurText";
import { useRef } from "react";
import AnimatedBeams from "@/components/AnimatedBeam";

function BlogCard({ post, index }: { post: any; index: number }) {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: "-5%" });

  // Estimate reading time from description word count (fallback)
  const wordCount = (post.description ?? "").split(/\s+/).length;
  const readTime = Math.max(1, Math.round(wordCount / 200));

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 28, filter: "blur(4px)" }}
      animate={inView ? { opacity: 1, y: 0, filter: "blur(0px)" } : {}}
      transition={{ duration: 0.55, delay: index * 0.07, ease: [0.21, 0.47, 0.32, 0.98] }}
      className="relative group"
    >
      <Card>
        <Link href={`/blog/${post.slug}`}>
          <article className="p-6 md:p-8 relative w-full h-full flex flex-col justify-between text-left min-h-[260px]">
            {/* Star coordinate label */}
            <div className="flex items-center justify-between gap-2 mb-6">
              <div className="flex items-center gap-2">
                {/* Coordinate number */}
                <span className="text-[9px] font-mono text-zinc-700 tabular-nums">
                  {String(index + 1).padStart(2, "0")}
                </span>
                <span className="w-3 h-px bg-white/10" />
                <span className="text-[10px] text-zinc-500 font-mono tracking-widest uppercase">
                  <time dateTime={new Date(post.date).toISOString()}>
                    {new Date(post.date).toLocaleDateString("en-US", { month: "short", year: "numeric" })}
                  </time>
                </span>
              </div>
              <span className="flex items-center gap-1 text-[10px] font-mono text-zinc-700 tracking-wider">
                <BookOpen className="w-3 h-3" />
                {readTime}m
              </span>
            </div>

            {/* Content */}
            <div className="flex-1">
              <h2 className="text-xl font-bold text-zinc-100 group-hover:text-white font-display tracking-tight leading-snug transition-colors duration-200">
                {post.title}
              </h2>
              <p className="mt-3 text-sm text-zinc-500 group-hover:text-zinc-400 font-light line-clamp-3 leading-relaxed transition-colors duration-200">
                {post.description}
              </p>
            </div>

            {/* Tags + CTA */}
            <div className="mt-6 pt-4 border-t border-white/[0.05] flex items-end justify-between gap-3">
              {post.tags && post.tags.length > 0 ? (
                <div className="flex flex-wrap items-center gap-1.5">
                  {post.tags.slice(0, 3).map((tag: string) => (
                    <span
                      key={tag}
                      className="text-[9px] font-mono text-zinc-600 bg-white/[0.04] border border-white/[0.07] px-2 py-0.5 rounded-full uppercase tracking-wider"
                    >
                      {tag}
                    </span>
                  ))}
                </div>
              ) : <div />}
              <span className="shrink-0 flex items-center gap-1 text-[10px] font-mono text-zinc-600 group-hover:text-zinc-300 transition-colors tracking-widest uppercase whitespace-nowrap">
                Read
                <ArrowUpRight className="w-3 h-3 group-hover:translate-x-px group-hover:-translate-y-px transition-transform" />
              </span>
            </div>
          </article>
        </Link>
      </Card>
    </motion.div>
  );
}

export default function ClientBlogArchive({ posts }: { posts: any[] }) {
  return (
    <div className="relative pb-16 min-h-screen bg-black overflow-hidden">
      {/* Cosmic atmosphere */}
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_70%_50%_at_30%_0%,rgba(255,255,255,0.025),transparent)]" />
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_50%_40%_at_80%_80%,rgba(120,100,200,0.04),transparent)]" />

      {/* 3D background */}
      <ThreeCanvas />

      <Navigation />
      <CustomCursor />
      <NextTopLoader />

      <AnimatedBeams />

      <div className="px-6 mx-auto max-w-7xl lg:px-8 pt-24 md:pt-32 pb-16 relative z-10 flex flex-col gap-20">

        {/* Header — editorial asymmetry */}
        <div className="grid grid-cols-1 lg:grid-cols-5 gap-8 items-end">
          <div className="lg:col-span-3">
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.4, delay: 0.1 }}
              className="mb-3 flex items-center gap-3"
            >
              <span className="h-px w-8 bg-white/20" />
              <span className="text-[10px] font-mono text-zinc-500 tracking-[0.3em] uppercase">Transmission log</span>
            </motion.div>
            <BlurText
              text="Blog Archive"
              className="text-5xl text-white sm:text-7xl font-display tracking-tight text-edge-outline drop-shadow-[0_0_20px_rgba(255,255,255,0.1)]"
              delay={2}
            />
          </div>
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.7, delay: 0.4 }}
            className="lg:col-span-2"
          >
            <motion.div
              initial={{ scaleX: 0 }}
              animate={{ scaleX: 1 }}
              transition={{ duration: 0.8, delay: 0.3 }}
              className="origin-left h-px w-full bg-gradient-to-r from-white/20 via-white/8 to-transparent mb-5"
            />
            <p className="text-zinc-400 text-sm font-light leading-relaxed">
              Thoughts on building things — tools, apps, and lessons learned.
              <br />
              <span className="text-zinc-600">{posts.length} entries in reverse chronological order.</span>
            </p>
          </motion.div>
        </div>

        {/* Post list */}
        {posts.length === 0 ? (
          <div className="flex items-center gap-3 text-zinc-600 text-sm font-mono">
            <FileText className="w-4 h-4" />
            <span>No transmissions yet — check back soon.</span>
          </div>
        ) : (
          <div className="grid grid-cols-1 gap-5 md:grid-cols-2 xl:grid-cols-3">
            {posts.map((post, index) => (
              <BlogCard key={post.slug} post={post} index={index} />
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
