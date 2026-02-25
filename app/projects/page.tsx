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
import { Card } from "../components/card";
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
      <div className="relative pb-16 min-h-screen bg-cyber-dark bg-cyber-grid bg-fixed">
        <div className="pointer-events-none fixed inset-0 z-50 h-full w-full bg-cyber-scanline opacity-20 mix-blend-overlay"></div>
        <Navigation />
        <CustomCursor />
        <NextTopLoader />


        <div className="px-6 mx-auto max-w-7xl lg:px-8 pt-24 md:pt-32 pb-16 relative z-10 flex flex-col gap-16">
          <div className="max-w-3xl mx-auto lg:mx-0">
            <h2 className="text-5xl tracking-[-0.05em] text-white sm:text-7xl font-display uppercase text-edge-outline animate-fade-in drop-shadow-[0_0_15px_rgba(0,240,255,0.5)]">
              [ARCHIVE: <span className="text-cyber-cyan">PROJECTS</span>]
            </h2>
            <div className="mt-8 flex flex-col gap-2">
              <div className="h-px w-full bg-gradient-to-r from-cyber-cyan via-cyber-pink to-transparent opacity-50" />
              <p className="mt-4 text-zinc-400 font-mono text-sm leading-relaxed uppercase tracking-[0.2em] border-l-2 border-cyber-pink pl-6">
                // SYS.DAT: Accessing designated project records.<br />
                // Some records are restricted work files, others exist in personal databanks.
              </p>
            </div>
          </div>

          {/* Featured Grid Asymmetry */}
          <div className="grid grid-cols-1 gap-8 mx-auto lg:grid-cols-3 lg:gap-12">
            <div className="lg:col-span-2 relative group">
              {/* Decorative corner accents */}
              <div className="absolute -top-2 -left-2 w-4 h-4 border-t-2 border-l-2 border-cyber-cyan z-20 transition-all group-hover:-top-3 group-hover:-left-3 group-hover:border-cyber-pink duration-300"></div>
              <div className="absolute -bottom-2 -right-2 w-4 h-4 border-b-2 border-r-2 border-cyber-cyan z-20 transition-all group-hover:-bottom-3 group-hover:-right-3 group-hover:border-cyber-pink duration-300"></div>

              <Card>
                <Link href={`/projects/${featured.slug}`}>
                  <article className="relative w-full h-full p-6 md:p-12 flex flex-col justify-between">
                    <div className="absolute inset-0 bg-cyber-cyan/5 mix-blend-overlay opacity-0 group-hover:opacity-100 transition-opacity duration-700 pointer-events-none z-0"></div>

                    <div>
                      <div className="flex items-center justify-between gap-2 z-20 relative">
                        <div className="text-xs text-cyber-cyan font-mono tracking-widest bg-cyber-cyan/10 px-3 py-1 chamfered-sm border border-cyber-cyan/30">
                          {featured.date ? (
                            <time dateTime={new Date(featured.date).toISOString()}>
                              ID:{new Date(featured.date).getFullYear()}/{String(new Date(featured.date).getMonth() + 1).padStart(2, '0')}
                            </time>
                          ) : (
                            <span>ID:UNDEF</span>
                          )}
                        </div>
                        <span className="flex items-center gap-2 text-xs text-cyber-pink font-mono tracking-widest">
                          <Eye className="w-4 h-4 animate-pulse" />{" "}
                          {Intl.NumberFormat("en-US", { notation: "compact" }).format(
                            views[featured.slug] ?? 0
                          )}
                        </span>
                      </div>

                      <h2
                        id="featured-post"
                        className="mt-8 text-4xl font-bold text-white group-hover:text-cyber-cyan sm:text-6xl font-display uppercase tracking-tighter z-20 relative transition-colors duration-500 drop-shadow-[0_0_10px_rgba(0,240,255,0)] group-hover:drop-shadow-[0_0_10px_rgba(0,240,255,0.8)]"
                      >
                        {featured.title}
                      </h2>
                      <p className="mt-4 leading-relaxed duration-150 text-zinc-300 group-hover:text-white font-light z-20 relative max-w-2xl text-sm sm:text-base">
                        {featured.description}
                      </p>
                    </div>

                    <div className="mt-12 pt-6 border-t border-cyber-gray/50 flex justify-end z-20 relative">
                      <span className="text-sm font-mono text-zinc-500 group-hover:text-cyber-cyan transition-colors uppercase tracking-widest flex items-center gap-2">
                        [INITIALIZE PROTOCOL] <span aria-hidden="true" className="group-hover:translate-x-1 transition-transform">&rarr;</span>
                      </span>
                    </div>
                  </article>
                </Link>
              </Card>
            </div>

            <div className="flex flex-col w-full gap-8 mx-auto lg:col-span-1 border-t border-cyber-gray lg:border-t-0 pt-8 lg:pt-0">
              {[top2, top3].map((project: Project) => (
                <Card key={project.slug}>
                  <Article project={project} views={views[project.slug] ?? 0} />
                </Card>
              ))}
            </div>
          </div>

          <div className="w-full flex items-center gap-4 py-8">
            <div className="flex-1 h-px bg-cyber-cyan/30"></div>
            <span className="font-mono text-cyber-cyan text-sm font-bold uppercase tracking-[0.3em] px-6 py-2 chamfered-sm bg-cyber-dark border border-cyber-cyan/50 shadow-[0_0_15px_rgba(0,240,255,0.2)]">
              Standard Records
            </span>
            <div className="flex-1 h-px bg-cyber-cyan/30"></div>
          </div>

          <div className="grid grid-cols-1 gap-6 mx-auto lg:mx-0 md:grid-cols-3">
            <div className="grid grid-cols-1 gap-6">
              {sorted
                .filter((_: any, i: number) => i % 3 === 0)
                .map((project: Project) => (
                  <Card key={project.slug}>
                    <Article project={project} views={views[project.slug] ?? 0} />
                  </Card>
                ))}
            </div>
            <div className="grid grid-cols-1 gap-6">
              {sorted
                .filter((_: any, i: number) => i % 3 === 1)
                .map((project: Project) => (
                  <Card key={project.slug}>
                    <Article project={project} views={views[project.slug] ?? 0} />
                  </Card>
                ))}
            </div>
            <div className="grid grid-cols-1 gap-6">
              {sorted
                .filter((_: any, i: number) => i % 3 === 2)
                .map((project: Project) => (
                  <Card key={project.slug}>
                    <Article project={project} views={views[project.slug] ?? 0} />
                  </Card>
                ))}
            </div>
          </div>
        </div>
      </div>
    </ProjectsClient>
  );
}
