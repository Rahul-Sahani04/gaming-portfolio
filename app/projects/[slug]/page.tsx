"use client";

import { notFound } from "next/navigation";
import { allProjects } from "contentlayer/generated";
import { Mdx } from "@/app/components/mdx";
import { Header } from "./header";
import "./mdx.css";
import { ReportView } from "./view";
import { Redis } from "@upstash/redis";
import NextTopLoader from "nextjs-toploader";
import LoadingScreen from "@/app/components/LoadingScreen";
import { useState, useEffect } from "react";


type Props = {
  params: Promise<{ slug: string }>;
};

// Print env
console.log(process.env.UPSTASH_REDIS_REST_URL);
console.log(process.env.UPSTASH_REDIS_REST_TOKEN);

const redis = Redis.fromEnv();


export default function PostPage({ params }: Props) {
  const [loading, setLoading] = useState(true);
  const [project, setProject] = useState<any>(null);
  const [views, setViews] = useState<number>(0);

  useEffect(() => {
    const fetchData = async () => {
      const resolvedParams = await params;
      const slug = resolvedParams?.slug;
      const foundProject = allProjects.find((project) => project.slug === slug);

      if (!foundProject) {
        notFound();
        return;
      }

      const viewCount =
        (await redis.get<number>(["pageviews", "projects", slug].join(":"))) ?? 0;

      setProject(foundProject);
      setViews(viewCount);
    };

    fetchData().catch(console.error);
  }, []);

  if (loading) {
    return <LoadingScreen loading={loading} setLoading={setLoading} />;
  }

  if (!project) {
    return null;
  }

  return (
    <div className="bg-zinc-50 min-h-screen">
      <NextTopLoader />
      <Header project={project} views={views} />
      <ReportView slug={project.slug} />

      <article className="px-4 py-12 mx-auto prose prose-zinc prose-quoteless">
        <Mdx code={project.body.code} />
      </article>
    </div>
  );
}
