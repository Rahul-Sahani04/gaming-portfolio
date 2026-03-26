import { Metadata } from "next";
import { Navigation } from "../components/nav";
import CustomCursor from "../components/CustomCursor";
import { allBlogs } from "contentlayer/generated";
import Link from "next/link";
import { Calendar, Tag } from "lucide-react";

export const metadata: Metadata = {
    title: "Blog | Rahul Sahani",
    description: "Read my latest thoughts on web development, design, and more.",
};

export default function BlogPage() {
    const posts = allBlogs
        .filter((p) => p.published)
        .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());

    return (
        <div className="relative min-h-screen bg-gradient-to-tl from-zinc-900 via-zinc-400/10 to-zinc-900">
            <Navigation />
            <CustomCursor />
            <div className="container px-4 py-24 mx-auto max-w-4xl">
                {/* Header */}
                <div className="max-w-2xl mb-12">
                    <h1 className="text-4xl font-bold tracking-tight text-zinc-100 sm:text-5xl font-display">
                        Blog
                    </h1>
                    <p className="mt-4 text-zinc-400">
                        Thoughts on building things — tools, apps, and the lessons learned along the way.
                    </p>
                </div>

                {/* Post list */}
                {posts.length === 0 ? (
                    <p className="text-zinc-500">No posts yet — check back soon.</p>
                ) : (
                    <ul className="flex flex-col divide-y divide-zinc-800">
                        {posts.map((post) => (
                            <li key={post.slug}>
                                <Link
                                    href={`/blog/${post.slug}`}
                                    className="group flex flex-col gap-2 py-8 hover:bg-zinc-800/30 -mx-4 px-4 rounded-lg transition-colors"
                                >
                                    <div className="flex items-center gap-3 text-xs text-zinc-500 font-mono">
                                        <Calendar className="w-3.5 h-3.5" />
                                        <time dateTime={new Date(post.date).toISOString()}>
                                            {new Date(post.date).toLocaleDateString("en-US", {
                                                year: "numeric",
                                                month: "long",
                                                day: "numeric",
                                            })}
                                        </time>
                                    </div>

                                    <h2 className="text-xl font-semibold text-zinc-100 group-hover:text-white transition-colors">
                                        {post.title}
                                    </h2>

                                    <p className="text-sm text-zinc-400 leading-relaxed line-clamp-2">
                                        {post.description}
                                    </p>

                                    {post.tags && post.tags.length > 0 && (
                                        <div className="flex flex-wrap items-center gap-2 mt-1">
                                            <Tag className="w-3 h-3 text-zinc-600" />
                                            {post.tags.map((tag) => (
                                                <span
                                                    key={tag}
                                                    className="text-xs font-mono text-zinc-500 bg-zinc-800 px-2 py-0.5 rounded"
                                                >
                                                    {tag}
                                                </span>
                                            ))}
                                        </div>
                                    )}

                                    <span className="mt-1 text-xs font-mono text-zinc-500 group-hover:text-zinc-300 transition-colors">
                                        Read more →
                                    </span>
                                </Link>
                            </li>
                        ))}
                    </ul>
                )}
            </div>
        </div>
    );
}

