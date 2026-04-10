import Link from "next/link";
import React from "react";
import ProjectsClient from "./projects-client";
import { Project, allProjects } from "contentlayer/generated";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Full-Stack Projects Portfolio | Rahul Sahani",
  description:
    "Showcase of full-stack web projects using Next.js, React, TypeScript, Three.js, and modern tooling.",
};

import { Navigation } from "../components/nav";
import { BlurText } from "../components/BlurText";
import { Card } from "../components/card";
import Particles from "../components/particles";
import { Article } from "./article";
import { Redis } from "@upstash/redis";
import { Eye } from "lucide-react";
import CustomCursor from "../components/CustomCursor";
import NextTopLoader from "nextjs-toploader";
// import LoadingScreen from "../components/LoadingScreen";

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


  return (
    <ProjectsClient>
      <div className="relative pb-16 min-h-screen bg-black overflow-hidden bg-gradient-to-tl from-black via-zinc-900/20 to-black">
        <Particles className="absolute inset-0 -z-10 animate-fade-in" quantity={150} />
        <Navigation />
        <CustomCursor />
        <NextTopLoader />


        <div className="px-6 mx-auto max-w-7xl lg:px-8 pt-24 md:pt-32 pb-16 relative z-10 flex flex-col gap-16">
          <div className="max-w-3xl mx-auto lg:mx-0">
            <BlurText text="Projects" className="text-5xl text-white sm:text-7xl font-display tracking-tight text-edge-outline drop-shadow-[0_0_15px_rgba(255,255,255,0.2)]" delay={2} />
            <div className="mt-8 flex flex-col gap-2">
              <div className="h-px w-full bg-gradient-to-r from-zinc-800 via-zinc-400 to-transparent opacity-50" />
              <p className="mt-4 text-zinc-400 font-light text-base leading-relaxed tracking-wide border-l-2 border-zinc-800 pl-6">
                A collection of full-stack projects, experimental interfaces, and creative engineering works.<br />
                Designed with precision and built to perform.
              </p>
            </div>
          </div>

          {/* Featured Grid Asymmetry */}
          <div className="grid grid-cols-1 gap-8 mx-auto lg:grid-cols-3 lg:gap-12">
            <div className="lg:col-span-2 relative group">
              <Card>
                <Link href={`/projects/${featured.slug}`}>
                  <article className="relative w-full h-full p-6 md:p-12 flex flex-col justify-between rounded-lg">

                    <div>
                      <div className="flex items-center justify-between gap-2 z-20 relative">
                        <div className="text-xs text-zinc-400 font-mono tracking-widest uppercase">
                          {featured.date ? (
                            <time dateTime={new Date(featured.date).toISOString()}>
                              {new Date(featured.date).getFullYear()}/{String(new Date(featured.date).getMonth() + 1).padStart(2, '0')}
                            </time>
                          ) : (
                            <span>UNDEF</span>
                          )}
                        </div>
                        <span className="flex items-center gap-2 text-xs text-zinc-500 font-mono tracking-widest">
                          <Eye className="w-4 h-4" />{" "}
                          {Intl.NumberFormat("en-US", { notation: "compact" }).format(
                            views[featured.slug] ?? 0
                          )}
                        </span>
                      </div>

                      <h2
                        id="featured-post"
                        className="mt-8 text-4xl font-bold text-white group-hover:text-zinc-300 sm:text-6xl font-display tracking-tight z-20 relative transition-colors duration-500 drop-shadow-md group-hover:drop-shadow-xl"
                      >
                        {featured.title}
                      </h2>
                      <p className="mt-4 leading-relaxed duration-150 text-zinc-400 group-hover:text-zinc-200 font-light z-20 relative max-w-2xl text-sm sm:text-base">
                        {featured.description}
                      </p>
                    </div>

                    <div className="mt-12 pt-6 border-t border-white/10 flex justify-end z-20 relative">
                      <span className="text-sm font-light text-zinc-500 group-hover:text-zinc-300 transition-colors tracking-widest flex items-center gap-2">
                        View Project <span aria-hidden="true" className="group-hover:translate-x-1 transition-transform">&rarr;</span>
                      </span>
                    </div>
                  </article>
                </Link>
              </Card>
            </div>

            <div className="flex flex-col w-full gap-8 mx-auto lg:col-span-1 pt-8 lg:pt-0">
              {[top2, top3].map((project: Project) => (
                  <Article key={project.slug} project={project} views={views[project.slug] ?? 0} />
              ))}
            </div>
          </div>

          <div className="w-full flex items-center gap-4 py-8">
            <div className="flex-1 h-px bg-gradient-to-r from-transparent via-white/10 to-transparent"></div>
            <span className="font-serif italic text-zinc-500 text-lg px-6 py-2">
              All Projects
            </span>
            <div className="flex-1 h-px bg-gradient-to-r from-transparent via-white/10 to-transparent"></div>
          </div>

          <div className="grid grid-cols-1 gap-6 mx-auto lg:mx-0 md:grid-cols-3">
            <div className="grid grid-cols-1 gap-6">
              {sorted
                .filter((_: any, i: number) => i % 3 === 0)
                .map((project: Project) => (
                    <Article key={project.slug} project={project} views={views[project.slug] ?? 0} />
                ))}
            </div>
            <div className="grid grid-cols-1 gap-6">
              {sorted
                .filter((_: any, i: number) => i % 3 === 1)
                .map((project: Project) => (
                    <Article key={project.slug} project={project} views={views[project.slug] ?? 0} />
                ))}
            </div>
            <div className="grid grid-cols-1 gap-6">
              {sorted
                .filter((_: any, i: number) => i % 3 === 2)
                .map((project: Project) => (
                    <Article key={project.slug} project={project} views={views[project.slug] ?? 0} />
                ))}
            </div>
          </div>
        </div>
      </div>
    </ProjectsClient>
  );
}
