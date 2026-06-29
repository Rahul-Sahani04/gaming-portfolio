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
    alternates: { canonical: `https://www.rsahani.space/projects/${slug}` },
    openGraph: {
      title: project.title,
      description: project.description || "Showcase of full-stack web projects using Next.js, React, TypeScript, Three.js, and modern tooling.",
      url: `https://www.rsahani.space/projects/${slug}`,
      images: [{ url: `/projects/${slug}/opengraph-image`, width: 1200, height: 630, alt: project.title }],
      type: "article",
    },
    twitter: {
      card: "summary_large_image",
      title: project.title,
      description: project.description || "Showcase of full-stack web projects using Next.js, React, TypeScript, Three.js, and modern tooling.",
      images: [`/projects/${slug}/opengraph-image`],
    },
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
