import { notFound } from "next/navigation";
import { allProjects } from "contentlayer/generated";
import { Redis } from "@upstash/redis";
import ClientPost from "./ClientPost";
import { Metadata } from "next";

const redis = Redis.fromEnv();
export async function generateMetadata({
  params,
}: {
  params: { slug: string };
}): Promise<Metadata> {
  const project = allProjects.find((p) => p.slug === params.slug);

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
  params: { slug: string };
}) {
  const project = allProjects.find((p) => p.slug === params.slug);

  if (!project) {
    notFound();
  }

  const views =
    (await redis.get<number>(`pageviews:projects:${params.slug}`)) ?? 0;

  return <ClientPost project={project} views={views} />;
}
