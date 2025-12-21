import { notFound } from "next/navigation";
import { allProjects } from "contentlayer/generated";
import { Redis } from "@upstash/redis";
import ClientPost from "./ClientPost";
import { Metadata } from "next";
import { Suspense } from 'react';

const redis = Redis.fromEnv();

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const project = allProjects.find((p) => p.slug === slug);

  if (!project) {
    return {};
  }

  return {
    title: project.title,
    description: project.description || "Showcase of full-stack web projects using Next.js, React, TypeScript, Three.js, and modern tooling.",
  };
}

export default async function PostPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const project = allProjects.find((p) => p.slug === slug);

  if (!project) {
    notFound();
  }

  const views =
    (await redis.get<number>(`pageviews:projects:${slug}`)) ?? 0;

  const loading = true;

  return (
    <Suspense fallback={
      <div className="flex items-center justify-center w-screen h-screen bg-black">

      </div>
    }>
      <ClientPost project={project} views={views} />
    </Suspense>
  );
}
