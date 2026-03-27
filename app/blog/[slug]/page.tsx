import { notFound } from "next/navigation";
import { allBlogs } from "contentlayer/generated";
import { Metadata } from "next";
import { Suspense } from "react";
import ClientBlogPost from "./ClientPost";

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

    if (!post) {
        return {};
    }

    return {
        title: `${post.title} | Blog`,
        description: post.description,
    };
}

export default async function BlogPostPage({
    params,
}: {
    params: Promise<{ slug: string }>;
}) {
    const { slug } = await params;
    const post = allBlogs.find((p) => p.slug === slug);

    if (!post) {
        notFound();
    }

    return (
        <Suspense
            fallback={
                <div className="flex items-center justify-center w-screen h-screen bg-black" />
            }
        >
            <ClientBlogPost post={post} />
        </Suspense>
    );
}
