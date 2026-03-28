import { Metadata } from "next";
import { allBlogs } from "contentlayer/generated";
import ClientBlogArchive from "./ClientBlogArchive";

export const metadata: Metadata = {
    title: "Blog | Rahul Sahani",
    description: "Read my latest thoughts on web development, design, and more.",
};

export default function BlogPage() {
    const posts = allBlogs
        .filter((p) => p.published)
        .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());

    return <ClientBlogArchive posts={posts} />;
}
