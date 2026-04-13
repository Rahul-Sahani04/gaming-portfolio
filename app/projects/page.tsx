import Link from "next/link";
import React from "react";
import ProjectsClient from "./projects-client";
import { Project, allProjects } from "contentlayer/generated";
import { Metadata } from "next";
import AnimatedLine from "@/components/AnimatedLine";

export const metadata: Metadata = {
  title: "Full-Stack Projects Portfolio | Rahul Sahani",
  description:
    "Showcase of full-stack web projects using Next.js, React, TypeScript, Three.js, and modern tooling.",
};

import { Navigation } from "../components/nav";
import BlurText from "../components/BlurText";
import { Card } from "../components/card";
import Particles from "../components/particles";
import { Article } from "./article";
import { Redis } from "@upstash/redis";
import { Eye, Layers, ArrowUpRight } from "lucide-react";
import CustomCursor from "../components/CustomCursor";
import NextTopLoader from "nextjs-toploader";
import { CountUp } from "../components/CountUp";

const redis = Redis.fromEnv();

export const revalidate = 60;

export default async function ProjectsPage() {
  const views = (
    await redis.mget<number[]>(
      ...allProjects.map((p: Project) => ["pageviews", "projects", p.slug].join(":")),
    )
  ).reduce((acc, v, i) => {
    acc[allProjects[i].slug] = v ?? 0;
    return acc;
  }, {} as Record<string, number>);

  const featured = allProjects.find((project: Project) => project.slug === "V-Anime")!;
  const top2 = allProjects.find((project: Project) => project.slug === "FlexApp")!;
  const top3 = allProjects.find((project: Project) => project.slug === "rsahani")!;
  const sorted = allProjects
    .filter((p: Project) => p.published)
    .filter(
      (project: Project) =>
        project.slug !== featured.slug &&
        project.slug !== top3.slug &&
        project.slug !== top2.slug
    )
    .sort((a, b) => (b.date && a.date && a.date > b.date ? -1 : 1));

  const totalViews = Object.values(views).reduce((a, b) => a + b, 0);
  const totalProjects = allProjects.filter((p: Project) => p.published).length;

  return (
    <ProjectsClient>
      <div className="relative pb-16 min-h-screen bg-black overflow-hidden">
        {/* Layered cosmic backdrop */}
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_80%_50%_at_50%_-20%,rgba(120,119,198,0.08),transparent)]" />
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_60%_40%_at_80%_60%,rgba(255,255,255,0.02),transparent)]" />
        <Particles className="absolute inset-0 -z-10 animate-fade-in" quantity={200} staticity={30} />

        <Navigation />
        <CustomCursor />
        <NextTopLoader />

        <div className="px-6 mx-auto max-w-7xl lg:px-8 pt-24 md:pt-32 pb-16 relative z-10 flex flex-col gap-20">

          {/* Header + stats row */}
          <div className="flex flex-col lg:flex-row lg:items-end lg:justify-between gap-8">
            <div className="max-w-2xl">
              <BlurText
                text="Projects"
                className="text-6xl text-white sm:text-8xl font-display tracking-tight text-edge-outline drop-shadow-[0_0_30px_rgba(255,255,255,0.15)]"
                delay={100}
                animateBy="letters"
                direction="top"
              />
              <div className="flex-1 h-1 bg-gradient-to-r from-transparent via-white/[0.2] to-transparent" />

              <p className="mt-6 text-zinc-400 font-light text-base leading-relaxed max-w-lg">
                Full-stack experiments, creative engineering, and tools built to perform.
                Each project is a small universe of its own.
              </p>
            </div>
            <AnimatedLine />

            {/* Live stats */}
            <div className="flex gap-6 shrink-0">
              <div className="flex flex-col items-center gap-1 px-6 py-4 rounded-2xl bg-white/[0.02] border border-white/[0.06] backdrop-blur-sm">
                <CountUp value={totalProjects} className="text-3xl font-bold text-white font-display" />
                <span className="text-xs text-zinc-500 tracking-widest uppercase">Projects</span>
              </div>
              <div className="flex flex-col items-center gap-1 px-6 py-4 rounded-2xl bg-white/[0.02] border border-white/[0.06] backdrop-blur-sm">
                <CountUp value={totalViews} className="text-3xl font-bold text-white font-display" />
                <span className="text-xs text-zinc-500 tracking-widest uppercase">Views</span>
              </div>
            </div>
          </div>

          {/* Featured + sidebar */}
          <div className="grid grid-cols-1 gap-6 lg:grid-cols-5 lg:gap-8">
            {/* Featured — spans 3 cols */}
            <div className="lg:col-span-3 relative group">
              {/* Nebula glow behind featured card */}
              <div className="absolute -inset-8 bg-[radial-gradient(ellipse_60%_60%_at_50%_50%,rgba(120,119,198,0.06),transparent)] pointer-events-none rounded-3xl blur-2xl" />
              <Card>
                <Link href={`/projects/${featured.slug}`}>
                  <article className="relative w-full h-full p-8 md:p-12 flex flex-col justify-between rounded-2xl min-h-[380px] overflow-hidden">
                    {/* Decorative grid lines */}
                    <div className="absolute inset-0 opacity-[0.03]"
                      style={{ backgroundImage: "linear-gradient(rgba(255,255,255,.5) 1px,transparent 1px),linear-gradient(90deg,rgba(255,255,255,.5) 1px,transparent 1px)", backgroundSize: "40px 40px" }}
                    />

                    {/* Featured badge */}
                    <div className="flex items-center justify-between mb-auto">
                      <span className="inline-flex items-center gap-1.5 text-[10px] font-mono tracking-[0.2em] uppercase text-white/40 border border-white/10 px-3 py-1 rounded-full">
                        <span className="w-1 h-1 rounded-full bg-white/40 animate-pulse" />
                        Featured
                      </span>
                      <div className="flex items-center gap-2 text-xs text-zinc-600 font-mono">
                        <Eye className="w-3.5 h-3.5" />
                        <CountUp value={views[featured.slug] ?? 0} className="" />
                      </div>
                    </div>

                    <div className="mt-10">
                      <h2
                        id="featured-post"
                        className="text-4xl font-bold text-white group-hover:text-zinc-200 sm:text-5xl font-display tracking-tight transition-colors duration-300 leading-tight"
                      >
                        {featured.title}
                      </h2>
                      <p className="mt-4 text-zinc-400 group-hover:text-zinc-300 font-light max-w-lg text-sm sm:text-base leading-relaxed transition-colors duration-300">
                        {featured.description}
                      </p>
                    </div>

                    <div className="mt-8 pt-6 border-t border-white/[0.06] flex items-center justify-between">
                      <span className="text-xs text-zinc-600 font-mono">
                        {featured.date
                          ? new Date(featured.date).toLocaleDateString("en-US", { year: "numeric", month: "long" })
                          : ""}
                      </span>
                      <span className="flex items-center gap-2 text-sm font-medium text-zinc-400 group-hover:text-white transition-colors tracking-wide">
                        View project
                        <ArrowUpRight className="w-4 h-4 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
                      </span>
                    </div>
                  </article>
                </Link>
              </Card>
            </div>

            {/* Sidebar — 2 cols */}
            <div className="lg:col-span-2 flex flex-col gap-6">
              <Article key={top2.slug} project={top2} views={views[top2.slug] ?? 0} />
              <Article key={top3.slug} project={top3} views={views[top3.slug] ?? 0} />
            </div>
          </div>

          {/* Divider */}
          <div className="flex items-center gap-6">
            <div className="flex-1 h-px bg-gradient-to-r from-transparent via-white/[0.3] to-transparent" />
            <div className="flex items-center gap-2 text-zinc-600">
              <Layers className="w-3.5 h-3.5" />
              <span className="text-xs font-mono tracking-[0.25em] uppercase">All work</span>
            </div>
            <div className="flex-1 h-px bg-gradient-to-r from-transparent via-white/[0.3] to-transparent" />
          </div>

          {/* Masonry grid */}
          <div className="grid grid-cols-1 gap-5 md:grid-cols-3">
            {[0, 1, 2].map((col) => (
              <div key={col} className="flex flex-col gap-5">
                {sorted
                  .filter((_: any, i: number) => i % 3 === col)
                  .map((project: Project) => (
                    <Article key={project.slug} project={project} views={views[project.slug] ?? 0} />
                  ))}
              </div>
            ))}
          </div>
        </div>
      </div>
    </ProjectsClient>
  );
}
