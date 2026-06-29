import { notFound } from "next/navigation";
import { allBlogs } from "contentlayer/generated";
import { Metadata } from "next";
import { Suspense } from "react";
import ClientBlogPost from "./ClientPost";
import type { TocHeading } from "@/app/components/TableOfContents";

export async function generateStaticParams() {
    return allBlogs
        .filter((p) => p.published)
        .map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({
    params,
}: {
    params: Promise<{ slug: string }>;
}): Promise<Metadata> {
    const { slug } = await params;
    const post = allBlogs.find((p) => p.slug === slug);
    if (!post) return {};
    return {
        title: `${post.title} | Blog`,
        description: post.description,
        alternates: { canonical: `https://www.rsahani.space/blog/${slug}` },
        openGraph: {
            title: `${post.title} | Blog`,
            description: post.description,
            url: `https://www.rsahani.space/blog/${slug}`,
            images: [{ url: `/blog/${slug}/opengraph-image`, width: 1200, height: 630, alt: post.title }],
            type: "article",
            publishedTime: post.date,
        },
        twitter: {
            card: "summary_large_image",
            title: `${post.title} | Blog`,
            description: post.description,
            images: [`/blog/${slug}/opengraph-image`],
        },
    };
}

function extractHeadings(raw: string): TocHeading[] {
    const regex = /^(#{2,3})\s+(.+)$/gm;
    const results: TocHeading[] = [];
    let match: RegExpExecArray | null;
    while ((match = regex.exec(raw)) !== null) {
        const text = match[2].trim();
        const id = text
            .toLowerCase()
            .replace(/[^\w\s-]/g, '')
            .replace(/\s+/g, '-')
            .replace(/^-+|-+$/g, '');
        results.push({ level: match[1].length, text, id });
    }
    return results;
}

export default async function BlogPostPage({
    params,
}: {
    params: Promise<{ slug: string }>;
}) {
    const { slug } = await params;

    const posts = allBlogs
        .filter((p) => p.published)
        .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());

    const idx = posts.findIndex((p) => p.slug === slug);
    const post = posts[idx];

    if (!post) notFound();

    const prevPost = idx < posts.length - 1
        ? { slug: posts[idx + 1].slug, title: posts[idx + 1].title }
        : null;
    const nextPost = idx > 0
        ? { slug: posts[idx - 1].slug, title: posts[idx - 1].title }
        : null;

    const headings = extractHeadings(post.body.raw);

    return (
        <Suspense fallback={<div className="flex items-center justify-center w-screen h-screen bg-cyber-dark" />}>
            <ClientBlogPost
                post={post}
                prevPost={prevPost}
                nextPost={nextPost}
                headings={headings}
            />
        </Suspense>
    );
}
