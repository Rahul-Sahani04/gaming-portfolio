"use client";

import { ArrowLeft, Github, Calendar } from "lucide-react";
import Link from "next/link";
import React, { useEffect, useRef, useState } from "react";

type Props = {
    post: {
        title: string;
        description: string;
        date: string;
        tags?: string[];
        repository?: string;
    };
};

export const BlogHeader: React.FC<Props> = ({ post }) => {
    const ref = useRef<HTMLElement>(null);
    const [isIntersecting, setIntersecting] = useState(true);

    useEffect(() => {
        if (!ref.current) return;
        const observer = new IntersectionObserver(([entry]) =>
            setIntersecting(entry.isIntersecting),
        );
        observer.observe(ref.current);
        return () => observer.disconnect();
    }, []);

    return (
        <header
            ref={ref}
            className="relative isolate overflow-hidden bg-gradient-to-tl from-black via-zinc-900 to-black"
        >
            <div
                className={`fixed inset-x-0 top-0 z-50 backdrop-blur lg:backdrop-blur-none duration-200 border-b lg:bg-transparent ${
                    isIntersecting
                        ? "bg-zinc-900/0 border-transparent"
                        : "bg-white/10 border-zinc-200 lg:border-transparent"
                }`}
            >
                <div className="container flex flex-row-reverse items-center justify-between p-6 mx-auto">
                    <div className="flex justify-between gap-8">
                        {post.repository && (
                            <Link
                                target="_blank"
                                href={`https://github.com/${post.repository}`}
                                aria-label="View on GitHub"
                            >
                                <Github
                                    className={`w-6 h-6 duration-200 hover:font-medium ${
                                        isIntersecting
                                            ? "text-zinc-400 hover:text-zinc-100"
                                            : "text-zinc-600 hover:text-zinc-900"
                                    }`}
                                />
                            </Link>
                        )}
                    </div>

                    <Link
                        href="/blog"
                        className={`duration-200 hover:font-medium ${
                            isIntersecting
                                ? "text-zinc-400 hover:text-zinc-100"
                                : "text-zinc-600 hover:text-zinc-900"
                        }`}
                    >
                        <ArrowLeft className="w-6 h-6" />
                    </Link>
                </div>
            </div>

            <div className="container mx-auto relative isolate overflow-hidden py-24 sm:py-32">
                <div className="mx-auto max-w-3xl px-6 lg:px-8 text-center flex flex-col items-center">
                    {post.tags && post.tags.length > 0 && (
                        <div className="flex flex-wrap justify-center gap-2 mb-6">
                            {post.tags.map((tag) => (
                                <span
                                    key={tag}
                                    className="text-xs font-mono text-zinc-400 bg-zinc-800 px-2 py-1 rounded border border-zinc-700"
                                >
                                    {tag}
                                </span>
                            ))}
                        </div>
                    )}

                    <h1 className="text-3xl font-bold tracking-tight text-white sm:text-5xl font-display">
                        {post.title}
                    </h1>

                    <p className="mt-6 text-lg leading-8 text-zinc-300 max-w-2xl">
                        {post.description}
                    </p>

                    <div className="mt-6 flex items-center gap-2 text-sm text-zinc-500 font-mono">
                        <Calendar className="w-4 h-4" />
                        <time dateTime={new Date(post.date).toISOString()}>
                            {new Date(post.date).toLocaleDateString("en-US", {
                                year: "numeric",
                                month: "long",
                                day: "numeric",
                            })}
                        </time>
                    </div>
                </div>
            </div>
        </header>
    );
};
