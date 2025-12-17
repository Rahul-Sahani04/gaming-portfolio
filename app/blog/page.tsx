import { Metadata } from "next";
import { Navigation } from "../components/nav";
import CustomCursor from "../components/CustomCursor";

export const metadata: Metadata = {
    title: "Blog | Rahul Sahani",
    description: "Read my latest thoughts on web development, design, and more.",
};

export default function BlogPage() {
    return (
        <div className="relative min-h-screen bg-gradient-to-tl from-zinc-900 via-zinc-400/10 to-zinc-900">
            <Navigation />
            <CustomCursor />
            <div className="container flex flex-col items-center justify-center min-h-screen px-4 mx-auto">
                <div className="max-w-2xl mx-auto lg:mx-0">
                    <h2 className="text-3xl font-bold tracking-tight text-zinc-100 sm:text-4xl">
                        Blog
                    </h2>
                    <p className="mt-4 text-zinc-400">
                        Read my latest thoughts on web development, design, and more.
                    </p>
                </div>
                <div className="mt-8 text-zinc-500">
                    Coming soon...
                </div>
            </div>
        </div>
    );
}
