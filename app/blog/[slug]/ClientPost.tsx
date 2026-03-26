"use client";

import NextTopLoader from "nextjs-toploader";
import { BlogHeader } from "./header";
import { Mdx } from "@/app/components/mdx";
import type { Blog } from "contentlayer/generated";

type ClientBlogPostProps = {
    post: Blog;
};

export default function ClientBlogPost({ post }: ClientBlogPostProps) {
    return (
        <div className="bg-zinc-50 min-h-screen">
            <NextTopLoader />
            <BlogHeader post={post} />
            <article className="px-4 py-12 mx-auto prose prose-zinc prose-quoteless">
                <Mdx code={post.body.code} />
            </article>
        </div>
    );
}
