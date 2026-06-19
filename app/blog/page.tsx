import { Metadata } from "next";
import { allBlogs } from "contentlayer/generated";
import ClientBlogArchive from "./ClientBlogArchive";
import { fetchSubstackPosts } from "@/lib/substack";

export const metadata: Metadata = {
    title: "Blog | Rahul Sahani",
    description: "Read my latest thoughts on web development, design, and more.",
    alternates: { canonical: "https://www.rsahani.space/blog" },
    openGraph: {
        title: "Blog | Rahul Sahani",
        description: "Read my latest thoughts on web development, design, and more.",
        url: "https://www.rsahani.space/blog",
        images: [{ url: "/og.png", width: 1920, height: 1080, alt: "Rahul Sahani — Blog" }],
        type: "website",
    },
    twitter: {
        card: "summary_large_image",
        title: "Blog | Rahul Sahani",
        description: "Read my latest thoughts on web development, design, and more.",
        images: ["/og.png"],
    },
};

export default async function BlogPage() {
    const localPosts = allBlogs
        .filter((p) => p.published)
        .map((p) => ({ ...p, source: "local" as const }));

    const substackPosts = await fetchSubstackPosts();

    const allPosts = [...localPosts, ...substackPosts].sort(
        (a, b) => new Date(b.date).getTime() - new Date(a.date).getTime()
    );

    return <ClientBlogArchive posts={allPosts} />;
}
