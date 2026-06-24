"use client";

import { motion } from "framer-motion";
import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Link from "next/link";
import { FileText, ArrowUpRight, BookOpen, ExternalLink } from "lucide-react";
import { Card } from "../components/card";
import { Navigation } from "../components/nav";
import CustomCursor from "../components/CustomCursor";
import NextTopLoader from "nextjs-toploader";
import ThreeCanvas from "../components/ThreeCanvas";
import BlurText from "../components/BlurText";

gsap.registerPlugin(ScrollTrigger);

function BlogCard({ post, index }: { post: any; index: number }) {
  const isSubstack = post.source === "substack";
  const wordCount = (post.body?.raw ?? post.description ?? "").split(/\s+/).length;
  const readTime = Math.max(1, Math.round(wordCount / 200));

  const href = isSubstack ? post.url : `/blog/${post.slug}`;
  const linkProps = isSubstack
    ? { target: "_blank", rel: "noopener noreferrer" }
    : {};

  return (
    <div className="blog-card relative group" style={{ opacity: 0, transform: "translateY(28px)" }}>
      <Card>
        <Link href={href} {...linkProps}>
          <article className="p-6 md:p-8 relative w-full h-full flex flex-col justify-between text-left min-h-[260px]">

            {/* Header row: index · date · source badge */}
            <div className="flex items-center justify-between gap-2 mb-6">
              <div className="flex items-center gap-2">
                <span className="text-[11px] font-mono text-zinc-700 tabular-nums group-hover:text-zinc-500 transition-colors duration-300">
                  {String(index + 1).padStart(2, "0")}
                </span>
                <span className="w-3 h-px bg-white/10" />
                <span className="text-[11px] text-zinc-500 font-mono tracking-widest uppercase">
                  <time dateTime={new Date(post.date).toISOString()}>
                    {new Date(post.date).toLocaleDateString("en-US", { month: "short", year: "numeric" })}
                  </time>
                </span>
              </div>

              <div className="flex items-center gap-2">
                {isSubstack && (
                  <span className="text-[10px] font-mono text-zinc-600 bg-white/[0.04] border border-white/[0.08] px-2 py-0.5 rounded-full uppercase tracking-wider">
                    Substack
                  </span>
                )}
                <span className="flex items-center gap-1 text-[11px] font-mono text-zinc-600 group-hover:text-zinc-400 tracking-wider transition-colors duration-300">
                  <BookOpen className="w-3 h-3" />
                  {readTime}m
                </span>
              </div>
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
            <div className="mt-6 pt-4 border-t border-white/[0.05] group-hover:border-white/10 transition-colors duration-300 flex items-end justify-between gap-3">
              {post.tags && post.tags.length > 0 ? (
                <div className="flex flex-wrap items-center gap-1.5">
                  {post.tags.slice(0, 3).map((tag: string) => (
                    <span
                      key={tag}
                      className="text-[11px] font-mono text-zinc-600 bg-white/[0.04] border border-white/[0.07] group-hover:border-white/[0.12] group-hover:text-zinc-400 px-2 py-0.5 rounded-full uppercase tracking-wider transition-colors duration-300"
                    >
                      {tag}
                    </span>
                  ))}
                </div>
              ) : <div />}

              <span className="shrink-0 flex items-center gap-1 text-[11px] font-mono text-zinc-600 group-hover:text-zinc-200 transition-colors tracking-widest uppercase whitespace-nowrap">
                {isSubstack ? "Open" : "Read"}
                {isSubstack
                  ? <ExternalLink className="w-3 h-3 group-hover:translate-x-px group-hover:-translate-y-px transition-transform" />
                  : <ArrowUpRight className="w-3 h-3 group-hover:translate-x-px group-hover:-translate-y-px transition-transform" />
                }
              </span>
            </div>
          </article>
        </Link>
      </Card>
    </div>
  );
}

export default function ClientBlogArchive({ posts }: { posts: any[] }) {
  const gridRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.set(".blog-card", { opacity: 0, y: 20 });
      ScrollTrigger.batch(".blog-card", {
        onEnter: (batch) =>
          gsap.to(batch, {
            opacity: 1,
            y: 0,
            stagger: 0.07,
            duration: 0.6,
            ease: "power3.out",
            overwrite: true,
          }),
        start: "top 92%",
      });
    }, gridRef);

    return () => ctx.revert();
  }, [posts]);

  const substackCount = posts.filter((p) => p.source === "substack").length;
  const localCount = posts.length - substackCount;

  return (
    <div className="relative pb-16 min-h-screen bg-black overflow-hidden">
      {/* Atmosphere */}
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_70%_50%_at_30%_0%,rgba(255,255,255,0.025),transparent)]" />
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_50%_40%_at_80%_80%,rgba(255,255,255,0.015),transparent)]" />

      <ThreeCanvas />
      <Navigation />
      <CustomCursor />
      <NextTopLoader color="#e4e4e7" />

      <div className="px-6 mx-auto max-w-7xl lg:px-8 pt-24 md:pt-32 pb-16 relative z-10 flex flex-col gap-20">

        {/* Header */}
        <div className="grid grid-cols-1 lg:grid-cols-5 gap-8 items-end">
          <div className="lg:col-span-3">
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.4, delay: 0.1 }}
              className="mb-3 flex items-center gap-3"
            >
              <span className="h-px w-8 bg-white/20" />
              <span className="text-[11px] font-mono text-zinc-500 tracking-[0.3em] uppercase">Writing</span>
            </motion.div>
            <BlurText
              text="Blog Archive"
              className="text-5xl text-white sm:text-7xl font-display tracking-tight text-edge-outline"
              delay={100}
              animateBy="letters"
              direction="top"
            />
            <div className="flex-1 h-1 w-2/3 bg-gradient-to-r from-transparent via-white/[0.2] to-transparent" />
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
              className="origin-left h-px w-full bg-gradient-to-r from-white/25 via-white/8 to-transparent mb-5"
            />
            <p className="text-zinc-400 text-sm font-light leading-relaxed">
              Thoughts on building things — tools, apps, and lessons learned.
              <br />
              <span className="text-zinc-600 font-mono text-xs">
                {localCount} article{localCount !== 1 ? "s" : ""} · {substackCount} from{" "}
                <a
                  href="https://rsahani.substack.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="underline underline-offset-2 hover:text-zinc-400 transition-colors"
                >
                  Substack
                </a>
              </span>
            </p>
          </motion.div>
        </div>

        {/* Post grid */}
        {posts.length === 0 ? (
          <div className="flex items-center gap-3 text-zinc-600 text-sm font-mono">
            <FileText className="w-4 h-4" />
            <span>No entries yet — check back soon.</span>
          </div>
        ) : (
          <div ref={gridRef} className="grid grid-cols-1 gap-5 md:grid-cols-2 xl:grid-cols-3">
            {posts.map((post, index) => (
              <BlogCard key={post.slug ?? post.url} post={post} index={index} />
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
